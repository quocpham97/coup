import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from 'libs/dbConnect';
import Room from 'models/room';
import { ActionType, RoomUpdateCurrentAction, Room as RoomDTO, RoomUpdatePlayers } from 'types';

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
        } else if (room.currentAction && playerId === room.currentTurn) {
          await Room.updateOne(
            { roomId },
            {
              $set: {
                currentAction: null,
              } as RoomUpdatePlayers,
            },
          ).exec();
        } else {
          const targetPlayer = room.players.find(
            (pl) => pl.playerId === room.currentAction?.targetId,
          );
          const earnedCoin = targetPlayer && targetPlayer.coins > 1 ? 2 : targetPlayer?.coins;
          const updatedPlayers = room.players.map((player) => {
            if (player.playerId === room.currentAction?.targetId) {
              return { ...player, coins: player.coins - Number(earnedCoin) };
            }
            if (player.playerId === room.currentTurn)
              return { ...player, coins: player.coins + Number(earnedCoin) };
            return player;
          });
          await Room.updateOne(
            { roomId },
            {
              $set: {
                players: updatedPlayers,
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
