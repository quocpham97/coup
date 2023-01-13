import { Character } from './character';

export type Player = {
  cards: Character[];
  name?: string;
  health?: number;
  assets?: {
    dead: string;
    win: string;
  };
};
