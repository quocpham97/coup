import React, { useEffect, useState } from 'react';
import { Character } from 'types';
import { generateCards } from 'utils/gameGenerator';

function TestComponent() {
  const [cards, setCards] = useState<Character[]>([]);

  useEffect(() => {
    setCards(generateCards());
  }, []);

  return (
    <div>
      Test
      <div>
        {cards.map((p, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={`${p}-${index}`}>{p}</div>
        ))}
      </div>
    </div>
  );
}

export default TestComponent;
