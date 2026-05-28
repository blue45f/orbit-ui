import { useCallback, useEffect, useRef, useState } from 'react'

export type WebSocketStatus = 'connecting' | 'open' | 'closed' | 'error'

export type UseWebSocketOptions = {
  onMessage?: (event: MessageEvent) => void
  onOpen?: () => void
  onClose?: () => void
  onError?: () => void
  reconnect?: boolean
  reconnectDelay?: number
}

export function useWebSocket(
  url: string,
  options: UseWebSocketOptions = {},
): {
  status: WebSocketStatus
  send: (data: string | ArrayBuffer | Blob) => void
  close: () => void
} {
  const isSupported = typeof WebSocket !== 'undefined'
  const [status, setStatus] = useState<WebSocketStatus>(isSupported ? 'connecting' : 'closed')
  const socketRef = useRef<WebSocket | null>(null)
  const explicitCloseRef = useRef(false)
  const optionsRef = useRef(options)

  useEffect(() => {
    optionsRef.current = options
  })

  useEffect(() => {
    if (typeof WebSocket === 'undefined') return

    const {
      onMessage,
      onOpen,
      onClose,
      onError,
      reconnect = false,
      reconnectDelay = 3000,
    } = optionsRef.current

    explicitCloseRef.current = false

    const ws = new WebSocket(url)
    socketRef.current = ws

    ws.onopen = () => {
      setStatus('open')
      onOpen?.()
    }

    ws.onmessage = (event: MessageEvent) => {
      onMessage?.(event)
    }

    ws.onclose = () => {
      setStatus('closed')
      onClose?.()
      if (reconnect && !explicitCloseRef.current) {
        const timer = setTimeout(() => {
          setStatus('connecting')
        }, reconnectDelay)
        return () => clearTimeout(timer)
      }
    }

    ws.onerror = () => {
      setStatus('error')
      onError?.()
    }

    return () => {
      explicitCloseRef.current = true
      ws.close()
    }
  }, [url])

  const send = useCallback((data: string | ArrayBuffer | Blob) => {
    if (socketRef.current?.readyState === 1) {
      socketRef.current.send(data)
    }
  }, [])

  const close = useCallback(() => {
    explicitCloseRef.current = true
    socketRef.current?.close()
  }, [])

  return { status, send, close }
}
