import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from 'libs/dbConnect';
import Room from 'models/room';
import {
  ActionType,
  Room as RoomDTO,
  RoomUpdateCurrentAction,
  RoomUpdatePlayers,
  listActionNeedApprove,
} from 'types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        await dbConnect();
        const { roomId, playerId } = req.body as { roomId: string; playerId: string };

        const room = (await Room.findOne({ roomId })) as RoomDTO;

        await Room.updateOne(
          { roomId },
          {
            $set: {
              currentAction: {
                ...room.currentAction,
                approvedPlayers: room.currentAction && [
                  ...room.currentAction.approvedPlayers,
                  playerId,
                ],
              },
            } as RoomUpdateCurrentAction,
          },
        ).exec();

        const roomAfterAction = (await Room.findOne({ roomId })) as RoomDTO;

        const isApproved =
          listActionNeedApprove.includes(room.currentAction?.mainAction as ActionType) &&
          roomAfterAction.players.filter((pl) => pl.health > 0 && pl.playerId !== playerId)
            .length === roomAfterAction.currentAction?.approvedPlayers.length;

        if (isApproved) {
          switch (room.currentAction?.mainAction) {
            case ActionType.TakeForeignAid: {
              await Room.updateOne(
                { roomId },
                {
                  $set: {
                    players: room.players.map((player) =>
                      player.playerId === room.currentTurn
                        ? { ...player, coins: player.coins + 2 }
                        : player,
                    ),
                    currentAction: null,
                  } as RoomUpdatePlayers,
                },
              ).exec();
              break;
            }

            case ActionType.TakeThreeCoins: {
              await Room.updateOne(
                { roomId },
                {
                  $set: {
                    players: room.players.map((player) =>
                      player.playerId === room.currentTurn
                        ? { ...player, coins: player.coins + 3 }
                        : player,
                    ),
                    currentAction: null,
                  } as RoomUpdatePlayers,
                },
              ).exec();
              break;
            }

            default:
              break;
          }
        }

        res.status(200).json({ isApproved });
      } catch (error) {
        res.status(400).json(null);
      }
      break;

    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method || ''} Not Allowed`);
      break;
  }
}
