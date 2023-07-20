import mongoose from 'mongoose';
import { ActionType, Character } from './character';
import { Player } from './player';

export interface Room {
  roomId: string;
  status: RoomStatusType;
  cards: Character[];
  host: string;
  playerIds: string[];
  players: Player[];
  currentAction: {
    playerId: string;
    targetId: string;
    mainAction: string;
    isWaiting: boolean;
    approvedPlayers: string[];
    isChallenging: boolean;
    challengerId: string;
    challengeAction: string;
    isOpposing: boolean;
    opposerId: string;
    opposeAction: string;
  } | null;
  currentTurn?: string;
  endTimeTurn?: string;
  _id?: mongoose.Types.ObjectId | undefined;
}

export enum RoomActionType {
  JOIN = 'JOIN',
  LEAVE = 'LEAVE',
}

export enum RoomStatusType {
  STARTED = 'STARTED',
  AVAILABLE = 'AVAILABLE',
}

export type RoomUpdateCurrentAction = Pick<Room, 'currentAction' | 'endTimeTurn'>;
export type RoomUpdatePlayers = Pick<Room, 'players' | 'currentAction'>;

export const listActionNeedApprove = [
  ActionType.TakeForeignAid,
  ActionType.ExchangeCard,
  ActionType.TakeThreeCoins,
];
export const listActionWithTarget = [ActionType.Steal, ActionType.Kill, ActionType.MakeCoup];
