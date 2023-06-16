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
}: {
  type: ActionType;
  roomId: string;
  isDisabled?: boolean;
  isHighlight?: boolean;
  channel: Types.RealtimeChannelCallbacks;
}) {
  const { getAction, getText } = useAction();

  return (
    <button
      className={clsx(
        'border  rounded-md px-3 py-1 ',
        isDisabled ? 'border-gray-500 text-gray-500' : 'border-blue-500 text-blue-500',
        isHighlight ? 'border-green-500 text-green-500' : 'border-blue-500 text-blue-500',
      )}
      type="button"
      onClick={() => getAction(type, roomId, channel)()}
      disabled={isDisabled}
    >
      {getText(type)}
    </button>
  );
}

Action.defaultProps = {
  isDisabled: false,
  isHighlight: false,
};

export default Action;
