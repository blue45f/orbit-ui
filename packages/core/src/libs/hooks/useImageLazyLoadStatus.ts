import { RefObject, useEffect, useState } from 'react'

import { ImageLoadStatus } from './useImageLoadStatus'

const INITIAL_STATUS: ImageLoadStatus = 'loading'

export const useImageLazyLoadStatus = (
  ref: RefObject<HTMLImageElement>,
  src: string,
  fallbackSrc: string | undefined,
  loading: 'lazy' | 'eager',
): { imageLoadStatus: ImageLoadStatus; fallbackLoadStatus: ImageLoadStatus } => {
  const [imageLoadStatus, setImageLoadStatus] = useState<ImageLoadStatus>(INITIAL_STATUS)
  const [fallbackLoadStatus, setFallbackLoadStatus] = useState<ImageLoadStatus>(INITIAL_STATUS)

  // 초기화
  useEffect(() => {
    setImageLoadStatus(INITIAL_STATUS)
  }, [src])

  useEffect(() => {
    const imgElement = ref.current
    if (!imgElement) return

    imgElement.loading = loading
    imgElement.src = src
  }, [ref, loading, src])

  // 이벤트 핸들러
  useEffect(() => {
    const imgElement = ref.current
    if (!imgElement) return

    const handleLoad = () => {
      setImageLoadStatus('loaded')
    }
    const handleFallbackLoad = () => {
      setFallbackLoadStatus('loaded')
    }

    const handleError = () => {
      setImageLoadStatus('error')

      if (!fallbackSrc) return
      imgElement.src = fallbackSrc
      imgElement.removeEventListener('load', handleLoad)
      imgElement.addEventListener('load', handleFallbackLoad)
    }

    imgElement.addEventListener('load', handleLoad)
    imgElement.addEventListener('error', handleError)

    return () => {
      imgElement.removeEventListener('load', handleFallbackLoad)
      imgElement.removeEventListener('error', handleError)
    }
  }, [fallbackSrc, ref])

  return { imageLoadStatus, fallbackLoadStatus }
}
