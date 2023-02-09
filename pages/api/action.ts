import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import dbConnect from 'libs/dbConnect';
import Room from 'models/room';
import { ActionType, Player } from 'types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'PUT':
      try {
        const { roomId, playerId, action } = req.body as {
          roomId: string;
          playerId: string;
          action: ActionType;
        };

        const room = (await Room.findOne({ roomId })) as {
          _id: mongoose.Schema.Types.ObjectId;
          cards: string[];
          players: Player[];
        };

        switch (action) {
          case ActionType.TakeIncome:
            await Room.updateOne(
              { roomId },
              {
                $set: {
                  players: room.players.map((player) =>
                    player.playerId === playerId ? { ...player, coins: player.coins + 1 } : player,
                  ),
                },
              },
            ).exec();
            break;
          case ActionType.TakeForeignAid:
            await Room.updateOne(
              { roomId },
              {
                $set: {
                  players: room.players.map((player) =>
                    player.playerId === playerId ? { ...player, coins: player.coins + 2 } : player,
                  ),
                },
              },
            ).exec();
            break;
          case ActionType.MakeCoup:
            await Room.updateOne(
              { roomId },
              {
                $set: {
                  players: room.players.map((player) =>
                    player.playerId === playerId ? { ...player, coins: player.coins - 7 } : player,
                  ),
                },
              },
            ).exec();
            break;
          case ActionType.Steal:
            await Room.updateOne(
              { roomId },
              {
                $set: {
                  players: room.players.map((player) =>
                    player.playerId === playerId ? { ...player, coins: player.coins + 2 } : player,
                  ),
                },
              },
            ).exec();
            break;
          case ActionType.Kill:
            await Room.updateOne(
              { roomId },
              {
                $set: {
                  players: room.players.map((player) =>
                    player.playerId === playerId ? { ...player, coins: player.coins - 3 } : player,
                  ),
                },
              },
            ).exec();
            break;
          case ActionType.BlockSteal:
            await Room.updateOne(
              { roomId },
              {
                $set: {
                  players: room.players,
                },
              },
            ).exec();
            break;
          case ActionType.BlockForeignAid:
            await Room.updateOne(
              { roomId },
              {
                $set: {
                  players: room.players,
                },
              },
            ).exec();
            break;
          case ActionType.BlockKill:
            await Room.updateOne(
              { roomId },
              {
                $set: {
                  players: room.players,
                },
              },
            ).exec();
            break;
          case ActionType.ExchangeCard:
            await Room.updateOne(
              { roomId },
              {
                $set: {
                  players: room.players,
                },
              },
            ).exec();
            break;
          case ActionType.DrawCard:
            await Room.updateOne(
              { roomId },
              {
                $set: {
                  players: room.players,
                },
              },
            ).exec();
            break;
          case ActionType.Challenge:
            await Room.updateOne(
              { roomId },
              {
                $set: {
                  players: room.players,
                },
              },
            ).exec();
            break;

          default:
            await Room.updateOne(
              { roomId },
              {
                $set: {
                  players: [],
                },
              },
            ).exec();
            break;
        }

        const roomAfterAction = (await Room.findOne({ roomId })) as {
          _id: mongoose.Schema.Types.ObjectId;
          cards: string[];
          players: Player[];
        };

        res.status(200).json({
          success: true,
          data: { roomId, playerId, action },
          players: roomAfterAction.players,
        });
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
