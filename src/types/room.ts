import mongoose from 'mongoose';
import { Player } from './player';

export interface Room {
  roomId: string;
  status: RoomStatusType;
  cards: string[];
  host: string;
  playerIds: string[];
  players: Player[];
  currentAction: {
    playerId: string;
    mainAction: string;
    isWaiting: boolean;
    approvedPlayers: string[];
    isChallenging: boolean;
    challengerId?: string;
    challengeAction?: string;
    isOpposing: boolean;
    opposerId?: string;
    opposeAction?: string;
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
