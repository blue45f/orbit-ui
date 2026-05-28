export type ShareData = { title?: string; text?: string; url?: string; files?: File[] }

export function useShareAPI(): {
  isSupported: boolean
  share: (data: ShareData) => Promise<void>
  canShare: (data?: ShareData) => boolean
} {
  const isSupported = typeof navigator !== 'undefined' && typeof navigator.share === 'function'

  const share = async (data: ShareData): Promise<void> => {
    if (!isSupported) return
    await navigator.share(data)
  }

  const canShare = (data?: ShareData): boolean => {
    if (!isSupported) return false
    return navigator.canShare?.(data) ?? false
  }

  return { isSupported, share, canShare }
}
