import React from 'react';
import clsx from 'clsx';
import { Types } from 'ably';
import { ActionType } from 'types';
import { useAction } from 'hooks/useAction';

function ButtonStart({
  roomId,
  isDisabled,
  isHidden,
  isHighlight,
  channel,
}: {
  roomId: string;
  isDisabled?: boolean;
  isHidden?: boolean;
  isHighlight?: boolean;
  channel: Types.RealtimeChannelCallbacks;
}) {
  const { getAction } = useAction();

  return (
    <button
      className={clsx(
        'border  rounded-md px-3 py-1 ',
        isDisabled ? 'border-gray-500 text-gray-500' : 'border-blue-500 text-blue-500',
        isHidden ? 'hidden' : '',
        isHighlight ? 'border-green-500 text-green-500' : 'border-blue-500 text-blue-500',
      )}
      type="button"
      onClick={() => getAction(ActionType.Start, roomId, channel)()}
      disabled={isDisabled}
    >
      Start
    </button>
  );
}

ButtonStart.defaultProps = {
  isDisabled: false,
  isHidden: false,
  isHighlight: false,
};

export default ButtonStart;
