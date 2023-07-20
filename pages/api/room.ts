import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from 'libs/dbConnect';
import Room from 'models/room';
import { Player, Room as RoomDTO, RoomActionType, Character } from 'types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'PUT':
      try {
        await dbConnect();
        const { roomId, playerId, action } = req.body as {
          roomId: string;
          playerId: string;
          action: string;
        };

        const room = (await Room.findOne({ roomId })) as RoomDTO;

        switch (action) {
          case RoomActionType.JOIN: {
            const players = [
              ...room.players,
              { playerId, coins: 0, health: 2, cards: [] } as Player,
            ];
            const playerIds = [...room.playerIds, playerId];
            const host = players.length === 1 ? players[0].playerId : room.host;
            await Room.updateOne({ roomId }, { $set: { players, playerIds, host } }).exec();
            break;
          }

          case RoomActionType.LEAVE: {
            const players = room.players.filter((pl) => pl.playerId !== playerId);
            const playerIds = room.playerIds.filter((id) => id !== playerId);
            const host = (() => {
              if (players.length === 0) return null;
              if (players.length === 1) return players[0].playerId;
              return room.host;
            })();
            await Room.updateOne(
              { roomId },
              {
                $set: {
                  players,
                  playerIds,
                  host,
                  currentTurn: players.length === 0 ? null : room.currentTurn,

                  // temporary action to clear room data
                  status: players.length === 0 ? 'AVAILABLE' : room.status,
                  endTimeTurn: players.length === 0 ? null : room.endTimeTurn,
                  currentAction: players.length === 0 ? null : room.currentAction,
                  cards: [] as Character[],
                } as RoomDTO,
              },
            ).exec();
            break;
          }

          default:
            break;
        }

        res.status(200).json({ success: true, cards: room?.cards || [] });
      } catch (error) {
        res.status(400).json(null);
      }
      break;

    case 'POST':
      try {
        const { roomId } = req.body as { roomId: string };
        const room = (await Room.findOne({ roomId })) as RoomDTO;

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
