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
        const { roomId, playerId, isApproved } = req.body as {
          roomId: string;
          playerId: string;
          isApproved: boolean;
        };

        const room = (await Room.findOne({ roomId })) as RoomDTO;

        const endTime = new Date();
        endTime.setSeconds(endTime.getSeconds() + 30);
        if (room.currentAction === null && playerId && room.currentTurn === playerId) {
          await Room.updateOne(
            { roomId },
            {
              $set: {
                currentAction: {
                  playerId,
                  mainAction: ActionType.TakeForeignAid,
                  isWaiting: true,
                  approvedPlayers: [] as string[],
                  isChallenging: false,
                  challengerId: '',
                  challengeAction: '',
                  isOpposing: false,
                  opposerId: '',
                  opposeAction: '',
                },
                endTimeTurn: endTime.toUTCString(),
              } as RoomUpdateCurrentAction,
            },
          ).exec();
        } else if (
          isApproved ||
          (room.currentAction?.isOpposing && room.currentAction.isChallenging)
        ) {
          await Room.updateOne(
            { roomId },
            {
              $set: {
                players: room.players.map((player) =>
                  player.playerId === room.currentTurn
                    ? { ...player, coins: player.coins + 2 }
                    : player,
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
