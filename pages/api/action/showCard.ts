import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from 'libs/dbConnect';
import Room from 'models/room';
import { ActionType, Room as RoomDTO, RoomUpdatePlayers } from 'types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        await dbConnect();
        const { roomId } = req.body as { roomId: string; playerId: string };
        const room = (await Room.findOne({ roomId })) as RoomDTO;

        switch (room.currentAction?.mainAction) {
          case ActionType.TakeForeignAid: {
            await Room.updateOne(
              { roomId },
              {
                $set: {
                  players: room.players.map((player) => {
                    if (player.playerId === room.currentAction?.playerId)
                      return {
                        ...player,
                        health: player.health - 1,
                      };
                    return player;
                  }),
                } as RoomUpdatePlayers,
              },
            ).exec();
            break;
          }

          case ActionType.Steal: {
            let updatedPlayers;
            if (!room.currentAction.isOpposing && room.currentAction.isChallenging) {
              const targetPlayer = room.players.find(
                (pl) => pl.playerId === room.currentAction?.targetId,
              );
              const earnedCoin = targetPlayer && targetPlayer.coins > 1 ? 2 : targetPlayer?.coins;
              updatedPlayers = room.players.map((player) => {
                if (player.playerId === room.currentAction?.targetId) {
                  return {
                    ...player,
                    coins: player.coins - Number(earnedCoin),
                    health: player.health - 1,
                  };
                }
                if (player.playerId === room.currentAction?.playerId)
                  return { ...player, coins: player.coins + Number(earnedCoin) };
                return player;
              });
            } else if (room.currentAction.isOpposing && room.currentAction.isChallenging) {
              updatedPlayers = room.players.map((player) => {
                if (player.playerId === room.currentAction?.playerId) {
                  return {
                    ...player,
                    health: player.health - 1,
                  };
                }
                return player;
              });
            }

            await Room.updateOne(
              { roomId },
              {
                $set: {
                  players: updatedPlayers,
                  currentAction: null,
                } as RoomUpdatePlayers,
              },
            ).exec();
            break;
          }

          case ActionType.Kill: {
            await Room.updateOne(
              { roomId },
              {
                $set: {
                  players: room.players.map((player) => {
                    if (player.playerId === room.currentAction?.targetId)
                      return {
                        ...player,
                        health: !room.currentAction.isOpposing ? player.health - 2 : player.health,
                      };
                    if (player.playerId === room.currentAction?.playerId)
                      return {
                        ...player,
                        coins: player.coins - 3,
                        health: room.currentAction.isOpposing ? player.health - 1 : player.health,
                      };
                    return player;
                  }),
                  currentAction: null,
                } as RoomUpdatePlayers,
              },
            ).exec();
            break;
          }

          default:
            break;
        }

        res.status(200).json({
          action: room.currentAction?.mainAction as ActionType,
          playerId: room.currentAction?.playerId,
          targetId: room.currentAction?.targetId,
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
