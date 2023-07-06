import React from 'react';
import clsx from 'clsx';
import { Types } from 'ably';
import { ActionType } from 'types';
import { useAction } from 'hooks/useAction';

// type CurrentAction = Pick<Room, 'currentAction'>;

function Action({
  type,
  roomId,
  isDisabled,
  isHighlight,
  channel,
  opposedAction,
}: {
  type: ActionType;
  roomId: string;
  isDisabled?: boolean;
  isHighlight?: boolean;
  channel: Types.RealtimeChannelCallbacks;
  opposedAction?: ActionType;
}) {
  const { getAction, getText } = useAction();

  return (
    <button
      className={clsx(
        'border  rounded-md px-3 py-1 ',
        { 'border-gray-500 text-gray-500': isDisabled },
        { 'border-green-500 text-green-500': isHighlight && !isDisabled },
      )}
      type="button"
      onClick={() => getAction({ type, roomId, channel })()}
      disabled={isDisabled}
    >
      {getText(type)} {getText(opposedAction as ActionType)}
    </button>
  );
}

Action.defaultProps = {
  isDisabled: false,
  isHighlight: false,
  opposedAction: undefined,
};

export default Action;
