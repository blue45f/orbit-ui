import { useState } from 'react'

export type NotificationPermission = 'default' | 'granted' | 'denied'

export function useNotification(): {
  permission: NotificationPermission
  isSupported: boolean
  requestPermission: () => Promise<NotificationPermission>
  notify: (title: string, options?: NotificationOptions) => Notification | null
} {
  const isSupported = typeof Notification !== 'undefined'

  const [permission, setPermission] = useState<NotificationPermission>(() => {
    if (!isSupported) return 'default'
    return Notification.permission as NotificationPermission
  })

  const requestPermission = async (): Promise<NotificationPermission> => {
    if (!isSupported) return 'default'
    const result = (await Notification.requestPermission()) as NotificationPermission
    setPermission(result)
    return result
  }

  const notify = (title: string, options?: NotificationOptions): Notification | null => {
    if (!isSupported || permission !== 'granted') return null
    return new Notification(title, options)
  }

  return { permission, isSupported, requestPermission, notify }
}
