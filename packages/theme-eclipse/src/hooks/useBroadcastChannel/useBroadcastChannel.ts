import { useCallback, useEffect, useRef, useState } from 'react'

export function useBroadcastChannel<T = unknown>(
  channelName: string
): {
  lastMessage: T | null
  postMessage: (message: T) => void
  close: () => void
} {
  const [lastMessage, setLastMessage] = useState<T | null>(null)
  const channelRef = useRef<BroadcastChannel | null>(null)

  useEffect(() => {
    if (typeof BroadcastChannel === 'undefined') return

    const channel = new BroadcastChannel(channelName)
    channelRef.current = channel

    channel.onmessage = (event: MessageEvent<T>) => {
      setLastMessage(event.data)
    }

    return () => {
      channel.close()
      channelRef.current = null
    }
  }, [channelName])

  const postMessage = useCallback((message: T) => {
    channelRef.current?.postMessage(message)
  }, [])

  const close = useCallback(() => {
    channelRef.current?.close()
    channelRef.current = null
  }, [])

  return { lastMessage, postMessage, close }
}
