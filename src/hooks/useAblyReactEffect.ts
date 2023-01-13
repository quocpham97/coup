import { useChannel } from '@ably-labs/react-hooks';
import Ably, { Types } from 'ably/promises';
import { useEffect } from 'react';

// const prefix = process.env.API_ENTRYPOINT || '';
// const ably = new Ably.Realtime.Promise({ authUrl: `${prefix}/api/createTokenRequest` });

export function useChannelAbly(
  channelName: string,
  callbackOnMessage: (msg: Ably.Types.Message) => void,
) {
  const [channel, ably] = useChannel(channelName, callbackOnMessage);
  // const channel: Types.RealtimeChannelPromise = ably.channels.get(channelName);

  const onMount = () => {
    channel.subscribe((msg) => {
      callbackOnMessage(msg);
    });
  };

  const onUnmount = () => {
    channel.unsubscribe();
  };

  const useEffectHook = () => {
    onMount();
    return () => {
      onUnmount();
    };
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(useEffectHook);

  return { channel, ably };
}
