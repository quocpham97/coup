import React from 'react';
import clsx from 'clsx';
import { ActionType } from 'types';
import { useAction } from 'hooks/useAction';

function ActionWithTarget({
  type,
  isHighlight,
  isDisabled,
  setSelectedAction,
}: {
  type: ActionType;
  isHighlight?: boolean;
  isDisabled?: boolean;
  setSelectedAction: React.Dispatch<React.SetStateAction<string | undefined>>;
}) {
  const { getText } = useAction();

  return (
    <button
      className={clsx(
        'border rounded-md px-3 py-1',
        { 'border-gray-500 text-gray-500': isDisabled },
        { 'border-green-500 text-green-500': isHighlight && !isDisabled },
      )}
      type="button"
      onClick={() => setSelectedAction(type)}
      disabled={isDisabled}
    >
      {getText(type)}
    </button>
  );
}

ActionWithTarget.defaultProps = {
  isHighlight: false,
  isDisabled: false,
};

export default ActionWithTarget;
