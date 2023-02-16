import mongoose from 'mongoose';
import { Player } from './player';

export interface Room {
  roomId: string;
  cards: string[];
  host: string;
  players: Player[];
  currentTurn?: string;
  _id?: mongoose.Types.ObjectId | undefined;
}

export enum RoomActionType {
  JOIN = 'JOIN',
  LEAVE = 'LEAVE',
}
