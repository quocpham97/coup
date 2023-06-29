import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from 'libs/dbConnect';
import Room from 'models/room';
import { Room as RoomDTO, RoomStatusType } from 'types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        await dbConnect();
        const { roomId } = req.body as { roomId: string };

        const room = (await Room.findOne({ roomId })) as RoomDTO;

        const endTime = new Date();
        endTime.setSeconds(endTime.getSeconds() + 30);
        await Room.updateOne(
          { roomId },
          {
            $set: {
              status: RoomStatusType.STARTED,
              currentTurn: room.players[Math.floor(Math.random() * room.players.length)].playerId,
              endTimeTurn: endTime.toUTCString(),
              currentAction: null,
            } as RoomDTO,
          },
        ).exec();

        const roomAfterAction = (await Room.findOne({ roomId })) as RoomDTO;

        res.status(200).json({ status: roomAfterAction.status });
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
