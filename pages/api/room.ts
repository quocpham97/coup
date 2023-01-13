import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import dbConnect from 'libs/dbConnect';
import Room from 'models/room';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'PUT':
      try {
        const { roomId, playerId, action } = req.body as {
          roomId: string;
          playerId: string;
          action: string;
        };

        const room = (await Room.findOne({ roomId })) as {
          _id: mongoose.Schema.Types.ObjectId;
          cards: string[];
          players: string[];
        };

        const players =
          action === 'JOIN'
            ? [...room.players, playerId]
            : room.players.filter((pl) => pl !== playerId);

        await Room.updateOne({ roomId }, { $set: { players } }).exec();

        res.status(200).json({ success: true, cards: room?.cards || [] });
      } catch (error) {
        res.status(400).json(null);
      }
      break;

    case 'POST':
      try {
        const { roomId } = req.body as { roomId: string };
        const room = (await Room.findOne({ roomId })) as {
          _id: mongoose.Schema.Types.ObjectId;
          roomId: string;
          cards: string[];
          players: string[];
        };

        res.status(200).json({ success: true, room });
      } catch (error) {
        res.status(400).json(null);
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT']);
      res.status(405).end(`Method ${method || ''} Not Allowed`);
      break;
  }
}
