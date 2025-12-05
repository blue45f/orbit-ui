type GetPlaceholder = (
  width: string | number,
  height: string | number,
  options?: {
    /**
     * hex color code
     * @defaultValue `#cccccc`
     */
    bgColor?: string
    fontColor?: string
  },
) => string

/**
 * placeholder 이미지 url을 반환하는 함수
 * - 현재 `https://placehold.co`을 사용하고 있어요.
 * - 의존된 서비스는 변경될 수 있어요.
 * - 🚨 사용하고 있는 서비스에서 장애가 발생할 경우 미동작할 수 있어요.
 * -
 */
export const getPlaceholder: GetPlaceholder = (width, height, options = {}) => {
  const { bgColor: bgColorProp = '#cccccc', fontColor: fontColorProp = '#000000' } = options
  const bgColor = bgColorProp.replace('#', '')
  const fontColor = fontColorProp.replace('#', '')
  const VENDOR = 'https://placehold.co'

  return `${VENDOR}/${width}x${height}/${bgColor}/${fontColor}`
}
