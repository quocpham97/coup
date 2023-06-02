import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from 'libs/dbConnect';
import Room from 'models/room';
import { ActionType, Room as RoomDTO, RoomStatusType } from 'types';

type RoomUpdateCurrentAction = Pick<RoomDTO, 'currentAction' | 'endTimeTurn'>;
type RoomUpdatePlayers = Pick<RoomDTO, 'players' | 'currentAction'>;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        await dbConnect();
        const { roomId, playerId, action } = req.body as {
          roomId: string;
          playerId: string;
          action: ActionType;
        };

        const room = (await Room.findOne({ roomId })) as RoomDTO;

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
          case ActionType.TakeForeignAid: {
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
                      player.playerId === playerId
                        ? { ...player, coins: player.coins + 2 }
                        : player,
                    ),
                    currentAction: null,
                  } as RoomUpdatePlayers,
                },
              ).exec();
            }
            const roomAfterAction = (await Room.findOne({ roomId })) as RoomDTO;

            res.status(200).json({
              success: true,
              data: { roomId, playerId, action },
              players: roomAfterAction.players,
            });
            return;
          }
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
          case ActionType.Next: {
            const endTime = new Date();
            endTime.setSeconds(endTime.getSeconds() + 30);

            const nextPlayerId =
              room.players[
                (room.players.findIndex((player) => player.playerId === room.currentTurn) + 1) %
                  room.players.length
              ].playerId;

            await Room.updateOne(
              { roomId },
              {
                $set: {
                  endTimeTurn: endTime.toUTCString(),
                  currentTurn: nextPlayerId,
                  currentAction: null,
                } as RoomDTO,
              },
            ).exec();
            break;
          }
          case ActionType.Start: {
            const endTime = new Date();
            endTime.setSeconds(endTime.getSeconds() + 30);
            await Room.updateOne(
              { roomId },
              {
                $set: {
                  status: RoomStatusType.STARTED,
                  currentTurn:
                    room.players[Math.floor(Math.random() * room.players.length)].playerId,
                  endTimeTurn: endTime.toUTCString(),
                  currentAction: null,
                } as RoomDTO,
              },
            ).exec();
            break;
          }
          case ActionType.Approve: {
            await Room.updateOne(
              { roomId },
              {
                $set: {
                  currentAction: {
                    ...room.currentAction,
                    approvedPlayers: room.currentAction && [
                      ...room.currentAction.approvedPlayers,
                      playerId,
                    ],
                  },
                } as RoomUpdateCurrentAction,
              },
            ).exec();
            break;
          }

          default:
            break;
        }

        const roomAfterAction = (await Room.findOne({ roomId })) as RoomDTO;

        res.status(200).json({
          success: true,
          info: { roomId, playerId, action },
          isApproved:
            roomAfterAction.players.filter((pl) => pl.health > 0 && pl.playerId !== playerId)
              .length === roomAfterAction.currentAction?.approvedPlayers.length,
          players: roomAfterAction.players,
          currentTurn: roomAfterAction.currentTurn,
        });
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
