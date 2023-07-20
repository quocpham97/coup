import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from 'libs/dbConnect';
import Room from 'models/room';
import { Room as RoomDTO, RoomUpdatePlayers } from 'types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        await dbConnect();
        const { roomId, playerId, targetId } = req.body as {
          roomId: string;
          playerId: string;
          targetId: string;
        };

        const room = (await Room.findOne({ roomId })) as RoomDTO;

        if (room.currentAction === null && room.currentTurn === playerId) {
          const endTime = new Date();
          endTime.setSeconds(endTime.getSeconds() + 30);
          await Room.updateOne(
            { roomId },
            {
              $set: {
                players: room.players.map((player) => {
                  if (player.playerId === targetId) return { ...player, health: player.health - 1 };
                  if (player.playerId === playerId) return { ...player, coins: player.coins - 7 };
                  return player;
                }),
                currentAction: null,
              } as RoomUpdatePlayers,
            },
          ).exec();
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
