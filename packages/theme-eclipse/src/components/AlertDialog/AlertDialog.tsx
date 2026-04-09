import { AlertDialog as CoreAlertDialog } from '@heejun-com/core'
import React, { forwardRef, PropsWithChildren, Children } from 'react'

import { Typography } from '../Text'

export type AlertProps = React.ComponentPropsWithoutRef<typeof CoreAlertDialog> & {
  defaultIsPresented?: boolean
  isPresented?: boolean
  onIsPresentedChange?: (open: boolean) => void
}

export const AlertRoot = forwardRef<HTMLDivElement, AlertProps>((props, forwardedRef) => {
  const { children, defaultIsPresented, isPresented, onIsPresentedChange, ...rest } = props

  let trigger: React.ReactNode = null
  const tops: React.ReactNode[] = []
  const bottoms: React.ReactNode[] = []

  Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return
    if (child.type === CoreAlertDialog.Trigger) trigger = child
    if (child.type === AlertTop) tops.push(child)
    if (child.type === AlertBottom) bottoms.push(child)
  })

  return (
    <CoreAlertDialog
      defaultOpen={defaultIsPresented}
      open={isPresented}
      onOpenChange={onIsPresentedChange}
    >
      {trigger}
      <CoreAlertDialog.Content ref={forwardedRef} {...rest}>
        {tops}
        {bottoms}
      </CoreAlertDialog.Content>
    </CoreAlertDialog>
  )
})

const AlertTop = ({ children }: PropsWithChildren) => (
  <CoreAlertDialog.Header>{children}</CoreAlertDialog.Header>
)

interface AlertBottomProps {
  direction?: 'horizontal' | 'vertical'
}

const AlertBottom = ({
  direction = 'horizontal',
  children,
}: PropsWithChildren<AlertBottomProps>) => {
  return (
    <CoreAlertDialog.Footer
      className={direction === 'vertical' ? 'flex-col !space-x-0 space-y-2' : ''}
    >
      {children}
    </CoreAlertDialog.Footer>
  )
}

const AlertTitle = ({ children }: PropsWithChildren) => {
  return (
    <CoreAlertDialog.Title asChild>
      <Typography maxLines={2} textStyle="subheadingSmall">
        {children}
      </Typography>
    </CoreAlertDialog.Title>
  )
}

const AlertDescription = ({ children }: PropsWithChildren) => {
  return (
    <CoreAlertDialog.Description asChild>
      <Typography textStyle="descriptionLarge">{children}</Typography>
    </CoreAlertDialog.Description>
  )
}

type AlertComponent = typeof AlertRoot & {
  Trigger: typeof CoreAlertDialog.Trigger
  Top: typeof AlertTop
  Bottom: typeof AlertBottom
  Close: typeof CoreAlertDialog.Cancel
  Action: typeof CoreAlertDialog.Action
  Title: typeof AlertTitle
  Description: typeof AlertDescription
}

/**
 * ### 💡 알아두기
 * 모던한 트렌드를 반영하여 재구성된 Alert 컴포넌트입니다. Radix UI를 기반으로 부드러운 전환과 안정성을 보장합니다.
 *
 * @example
 * ### 👇 기본 사용법 (비제어)
 * ```tsx
 * import { Alert, Button } from '@heejun-com/theme-eclipse'
 *
 * function App() {
 *   return (
 *     <Alert>
 *       <Alert.Trigger>
 *         <Button color='primary' size='medium'>열기</Button>
 *       </Alert.Trigger>
 *       <Alert.Top>
 *         <Alert.Title>이용 정책이 업데이트되었습니다.</Alert.Title>
 *         <Alert.Description>내용을 확인하신 후 동의해 주세요.</Alert.Description>
 *       </Alert.Top>
 *       <Alert.Bottom direction="horizontal">
 *         <Alert.Close asChild>
 *           <Button color='black' size='large' width='100%'>취소</Button>
 *         </Alert.Close>
 *         <Alert.Action asChild>
 *           <Button color='primary' size='large' width='100%'>확인</Button>
 *         </Alert.Action>
 *       </Alert.Bottom>
 *     </Alert>
 *   )
 * }
 * ```
 */
export const Alert: AlertComponent = Object.assign(AlertRoot, {
  Trigger: CoreAlertDialog.Trigger,
  Top: AlertTop,
  Bottom: AlertBottom,
  Close: CoreAlertDialog.Cancel,
  Action: CoreAlertDialog.Action,
  Title: AlertTitle,
  Description: AlertDescription,
})
