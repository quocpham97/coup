import React, { useEffect, useState } from 'react';
import { Character } from 'types';
// import { generateCards } from 'utils/gameGenerator';

function TestComponent() {
  const [cards, setCards] = useState<Character[]>([]);

  useEffect(() => {
    // setCards(generateCards());
    setCards([]);
  }, []);

  return (
    <div>
      Test
      {cards.map((c, index) => (
        <div key={`${c}-${index + 1}`}>{c}</div>
      ))}
    </div>
  );
}

export default TestComponent;
