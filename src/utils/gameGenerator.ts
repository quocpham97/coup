import { shuffle } from 'helpers/game';
import { Character } from 'types';

export function generateCards() {
  const cards = Array.from(
    [
      Character.Ambassador,
      Character.Assassin,
      Character.Captain,
      Character.Contessa,
      Character.Duke,
    ],
    (x) => Array(3).fill(x) as Character[],
  ).reduce((accumulator, currentValue) => [...accumulator, ...currentValue], []);

  return shuffle(cards);
}
