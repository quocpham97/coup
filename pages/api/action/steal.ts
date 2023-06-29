import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from 'libs/dbConnect';
import Room from 'models/room';
import { ActionType, RoomUpdateCurrentAction } from 'types';

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

        const endTime = new Date();
        endTime.setSeconds(endTime.getSeconds() + 30);
        await Room.updateOne(
          { roomId },
          {
            $set: {
              currentAction: {
                playerId,
                mainAction: ActionType.Steal,
                isWaiting: true,
                targetId,
              },
              endTimeTurn: endTime.toUTCString(),
            } as RoomUpdateCurrentAction,
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
