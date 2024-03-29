import React from 'react';
import clsx from 'clsx';
import { Types } from 'ably';
import { ActionType } from 'types';
import { useAction } from 'hooks/useAction';

function ButtonStart({
  roomId,
  isDisabled,
  isHighlight,
  channel,
}: {
  roomId: string;
  isDisabled?: boolean;
  isHighlight?: boolean;
  channel: Types.RealtimeChannelCallbacks;
}) {
  const { getAction } = useAction();

  return (
    <button
      className={clsx(
        'border  rounded-md px-3 py-1 ',
        isHighlight ? 'border-green-500 text-green-500' : 'border-blue-500 text-blue-500',
      )}
      type="button"
      onClick={() => getAction({ type: ActionType.Start, roomId, channel })()}
      disabled={isDisabled}
    >
      Start
    </button>
  );
}

ButtonStart.defaultProps = {
  isDisabled: false,
  isHighlight: false,
};

export default ButtonStart;
