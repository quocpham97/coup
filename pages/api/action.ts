import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from 'libs/dbConnect';
import Room from 'models/room';
import { ActionType, Room as RoomDTO } from 'types';

const listActionNeedApprove = [ActionType.TakeForeignAid, ActionType.ExchangeCard];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        await dbConnect();
        const { roomId, playerId, action } = req.body as {
          roomId: string;
          playerId: string;
          targetId: string;
          action: ActionType;
        };

        const room = (await Room.findOne({ roomId })) as RoomDTO;

        switch (action) {
          case ActionType.MakeCoup:
            await Room.updateOne(
              { roomId },
              {
                $set: {
                  players: room.players.map((player) =>
                    player.playerId === playerId ? { ...player, coins: player.coins - 7 } : player,
                  ),
                },
              },
            ).exec();
            break;
          case ActionType.Kill:
            await Room.updateOne(
              { roomId },
              {
                $set: {
                  players: room.players.map((player) =>
                    player.playerId === playerId ? { ...player, coins: player.coins - 3 } : player,
                  ),
                },
              },
            ).exec();
            break;
          case ActionType.BlockSteal:
            await Room.updateOne(
              { roomId },
              {
                $set: {
                  players: room.players,
                },
              },
            ).exec();
            break;

          case ActionType.BlockKill:
            await Room.updateOne(
              { roomId },
              {
                $set: {
                  players: room.players,
                },
              },
            ).exec();
            break;

          case ActionType.DrawCard:
            await Room.updateOne(
              { roomId },
              {
                $set: {
                  players: room.players,
                },
              },
            ).exec();
            break;

          default:
            break;
        }

        const roomAfterAction = (await Room.findOne({ roomId })) as RoomDTO;

        res.status(200).json({
          success: true,
          info: { roomId, playerId, action },
          isApproved:
            listActionNeedApprove.includes(room.currentAction?.mainAction as ActionType) &&
            roomAfterAction.players.filter((pl) => pl.health > 0 && pl.playerId !== playerId)
              .length === roomAfterAction.currentAction?.approvedPlayers.length,
          players: roomAfterAction.players,
          currentTurn: roomAfterAction.currentTurn,
        });
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
