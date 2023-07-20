import { Character } from './character';

export type Player = {
  playerId: string;
  cards: Character[];
  coins: number;
  name?: string;
  health: number;
  stats?: {
    win: string;
  };
};
