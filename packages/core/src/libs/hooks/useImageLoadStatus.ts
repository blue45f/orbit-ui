import { useEffect, useState } from 'react'

export type ImageLoadStatus = 'loading' | 'loaded' | 'error'

export const useImageLoadStatus = (src: string): ImageLoadStatus => {
  const [imageLoadStatus, setImageLoadStatus] = useState<ImageLoadStatus>('loading')

  useEffect(() => {
    const img = new Image()

    img.src = src
    img.onerror = () => setImageLoadStatus('error')
    img.onload = () => setImageLoadStatus('loaded')

    return () => {
      img.onerror = null
      img.onload = null
    }
  }, [src])

  return imageLoadStatus
}
