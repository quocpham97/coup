import React, { useEffect, useState } from 'react';
import { useAction } from 'hooks/useAction';
import { Character } from 'types';
import Action from 'components/Action';
// import { generateCards } from 'utils/gameGenerator';

function TestComponent() {
  const [cards, setCards] = useState<Character[]>([]);
  const { actionTypes } = useAction();

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
      <div className="flex gap-2">
        {actionTypes.map((a, index) => (
          <Action key={`${a}-${index + 1}`} type={a} isDisabled={index % 2 === 0} />
        ))}
      </div>
    </div>
  );
}

export default TestComponent;
