// NOTE : 한글 입력시 한글자씩 초과 입력되는 현상을 위한 코드
export const textOverflow = ({
  next = '',
  current = '',
  maxLength,
}: {
  next?: string
  current?: string
  maxLength?: number
}): boolean => {
  const isTyping = next.length > current.length
  const shouldBlock = maxLength && current.length >= maxLength

  return Boolean(isTyping && shouldBlock)
}
