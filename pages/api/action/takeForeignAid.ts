import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from 'libs/dbConnect';
import Room from 'models/room';
import { ActionType, Room as RoomDTO } from 'types';

type RoomUpdateCurrentAction = Pick<RoomDTO, 'currentAction' | 'endTimeTurn'>;
type RoomUpdatePlayers = Pick<RoomDTO, 'players' | 'currentAction'>;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        await dbConnect();
        const { roomId, playerId } = req.body as { roomId: string; playerId: string };

        const room = (await Room.findOne({ roomId })) as RoomDTO;

        const endTime = new Date();
        endTime.setSeconds(endTime.getSeconds() + 30);
        if (room.currentAction === null) {
          await Room.updateOne(
            { roomId },
            {
              $set: {
                currentAction: {
                  playerId,
                  mainAction: ActionType.TakeForeignAid,
                  isWaiting: true,
                  approvedPlayers: [] as string[],
                },
                endTimeTurn: endTime.toUTCString(),
              } as RoomUpdateCurrentAction,
            },
          ).exec();
        } else if (
          room.players.filter((pl) => pl.health > 0 && pl.playerId !== playerId).length ===
          room.currentAction?.approvedPlayers.length
        ) {
          await Room.updateOne(
            { roomId },
            {
              $set: {
                players: room.players.map((player) =>
                  player.playerId === playerId ? { ...player, coins: player.coins + 2 } : player,
                ),
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
