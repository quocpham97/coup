import React from 'react';
import clsx from 'clsx';
import { ActionType } from 'types';
import { useAction } from 'hooks/useAction';

function ActionWithTarget({
  type,
  isHighlight,
  setSelectedAction,
}: {
  type: ActionType;
  isHighlight?: boolean;
  setSelectedAction: React.Dispatch<React.SetStateAction<string | undefined>>;
}) {
  const { getText } = useAction();

  return (
    <button
      className={clsx(
        'border  rounded-md px-3 py-1 ',
        isHighlight ? 'border-green-500 text-green-500' : 'border-blue-500 text-blue-500',
      )}
      type="button"
      onClick={() => setSelectedAction(type)}
    >
      {getText(type)}
    </button>
  );
}

ActionWithTarget.defaultProps = {
  isHighlight: false,
};

export default ActionWithTarget;
