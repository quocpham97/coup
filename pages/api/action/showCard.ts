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
        const { roomId } = req.body as { roomId: string; playerId: string };

        const room = (await Room.findOne({ roomId })) as RoomDTO;

        await Room.updateOne(
          { roomId },
          {
            $set: {
              players: room.players.map((player) =>
                player.playerId === room.currentTurn
                  ? { ...player, health: player.health - 1 }
                  : player,
              ),
              currentAction: null,
            } as RoomUpdatePlayers,
          },
        ).exec();

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
