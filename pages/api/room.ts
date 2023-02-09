import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import dbConnect from 'libs/dbConnect';
import Room from 'models/room';
import { Player } from 'types';

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
          host: string;
          players: Player[];
        };

        const players =
          action === 'JOIN'
            ? [...room.players, { playerId, coins: 0 } as Player]
            : room.players.filter((pl) => pl.playerId !== playerId);
        const host = players.length === 1 ? players[0].playerId : null;
        await Room.updateOne({ roomId }, { $set: { players, host } }).exec();

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
