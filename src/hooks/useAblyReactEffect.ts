import Ably, { Types } from 'ably/promises'
import { useEffect } from 'react'

const ably = new Ably.Realtime.Promise({ authUrl: '/api/createTokenRequest' })

export function useChannel(
  channelName: string,
  callbackOnMessage: (msg: Ably.Types.Message) => void,
) {
  const channel: Types.RealtimeChannelPromise = ably.channels.get(channelName)

  const onMount = () => {
    channel.subscribe((msg) => {
      callbackOnMessage(msg)
    })
  }

  const onUnmount = () => {
    channel.unsubscribe()
  }

  const useEffectHook = () => {
    onMount()
    return () => {
      onUnmount()
    }
  }

  useEffect(useEffectHook)

  return { channel, ably }
}
