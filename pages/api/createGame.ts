import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import dbConnect from 'libs/dbConnect';
import Room from 'models/room';
import { generateCards } from 'utils/gameGenerator';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const cards = generateCards();
        const room = new Room({
          _id: new mongoose.Types.ObjectId(),
          roomId: Math.random().toString().slice(2),
          cards,
          players: [],
        }) as mongoose.Document & { roomId: string; cards: string[]; players: string[] };

        await room.save();

        res.status(200).json({ success: true, cards: room?.cards || [] });
      } catch (error) {
        res.status(400).json(null);
      }
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method || ''} Not Allowed`);
      break;
  }
}
