import { Toaster as CoreToaster, toast } from '@orbit-ui/core'
import React from 'react'

export type ToasterProps = React.ComponentProps<typeof CoreToaster>

/**
 * ### 💡 알아두기
 * 모던 트렌드를 반영하여 Sonner 라이브러리로 전면 개편된 Toaster입니다.
 * 앱 최상단에 `<Toaster />`를 한 번만 선언하고, `toast('메시지')`를 통해 유연하게 호출하세요.
 *
 * @example
 * ### 👇 기본 사용법
 * ```tsx
 * import { Toaster, toast, Button } from '@orbit-ui/theme-eclipse'
 *
 * function App() {
 *   return (
 *     <>
 *       <Toaster position="bottom-center" />
 *       <Button onClick={() => toast('이벤트가 성공적으로 저장되었습니다.')}>
 *         토스트 띄우기
 *       </Button>
 *     </>
 *   )
 * }
 * ```
 */
export const Toaster = (props: ToasterProps) => {
  return <CoreToaster {...props} />
}

export { toast }
