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
        const { roomId, playerId } = req.body as { roomId: string; playerId: string };
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
                        coins: player.coins + 2,
                      };
                    if (player.playerId === playerId)
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

          default:
            break;
        }

        res.status(200).json({});
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
