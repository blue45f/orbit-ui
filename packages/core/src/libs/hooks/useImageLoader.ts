import { ImageLoadStatus, useImageLoadStatus } from './useImageLoadStatus'

type Returns = {
  imageLoadStatus: ImageLoadStatus
  fallbackLoadStatus: ImageLoadStatus
  placeholderVisible: boolean
}

/** @deprecated ThumbnailDeprecated 에만 사용됩니다. (함께 제거 예정) */
export const useImageLoader = (src: string, fallbackSrc?: string): Returns => {
  const imageLoadStatus = useImageLoadStatus(src)
  const fallbackLoadStatus = useImageLoadStatus(fallbackSrc ?? '')

  /**
   * 조건별 렌더링 결과
   * - imageLoadStatus === 'loading': 클레이 플레이스홀더 (placeholderVisible === true)
   * - imageLoadStatus === 'loaded': 사용자 src
   * - imageLoadStatus === 'error'
   *   - fallbackLoadStatus !== 'loaded': 클레이 플레이스홀더 (placeholderVisible === true)
   *   - fallbackLoadStatus === 'loaded': 사용자 fallbackSrc
   */
  const placeholderVisible =
    imageLoadStatus === 'loading' || (imageLoadStatus === 'error' && fallbackLoadStatus !== 'loaded')

  return {
    imageLoadStatus,
    fallbackLoadStatus,
    placeholderVisible,
  }
}
