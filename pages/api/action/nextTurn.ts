import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from 'libs/dbConnect';
import Room from 'models/room';
import { ActionType, Room as RoomDTO } from 'types';

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

        const nextPlayerId =
          room.players[
            (room.players.findIndex((player) => player.playerId === room.currentTurn) + 1) %
              room.players.length
          ].playerId;

        const updatedPlayers = room.players.filter((pl) => pl.health !== 0);

        await Room.updateOne(
          { roomId },
          {
            $set: {
              endTimeTurn: endTime.toUTCString(),
              currentTurn: nextPlayerId,
              currentAction: null,
              players: updatedPlayers,
            } as RoomDTO,
          },
        ).exec();

        res.status(200).json({ action: ActionType.Next });
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
