import React from 'react';
import clsx from 'clsx';
import { Types } from 'ably';
import { ActionType } from 'types';
import { useAction } from 'hooks/useAction';

// TODO: select player to action when choose steal or any action like that
export function TargetPlayer({
  type,
  roomId,
  channel,
  targetId,
  targetName,
}: {
  type: ActionType;
  roomId: string;
  channel: Types.RealtimeChannelCallbacks;
  targetId: string;
  targetName: string;
}) {
  const { getAction } = useAction();

  return (
    <button
      className={clsx('border rounded-md px-3 py-1 border-yellow-500 text-yellow-500')}
      type="button"
      onClick={() => getAction({ type, roomId, channel, targetId })()}
    >
      {targetName}
    </button>
  );
}
