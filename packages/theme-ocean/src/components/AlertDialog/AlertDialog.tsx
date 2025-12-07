import {
  AlertDialog,
  AlertDialogProps,
  AlertDialogSpecificProps,
  ComponentThemeProps,
  findComponent,
  Flex,
} from '@prism-ui/core'
import { forwardRef, Children, PropsWithChildren } from 'react'

import { vars } from '../../styles/theme.css'
import { Typography } from '../Text'

import * as styles from './AlertDialog.css'

export type AlertProps = Omit<AlertDialogProps, keyof AlertDialogSpecificProps> & ComponentThemeProps<typeof vars.com.alert>

export const AlertRoot = forwardRef<HTMLDivElement, AlertProps>((props, forwardedRef) => {
  const { theme, children, defaultIsPresented, isPresented: isPresentedProp, ...rest } = props

  const { trigger, top, bottom } = findComponent({
    childrenArray: Children.toArray(children),
    target: [
      {
        name: 'trigger',
        component: AlertDialog.Trigger,
      },
      {
        name: 'top',
        component: AlertTop,
      },
      {
        name: 'bottom',
        component: AlertBottom,
      },
    ],
  })

  return (
    <AlertDialog
      {...rest}
      ref={forwardedRef}
      theme={{ ...vars.com.alert, ...theme }}
      defaultIsPresented={defaultIsPresented}
      isPresented={isPresentedProp}
    >
      {trigger}
      {top && <AlertDialog.Top className={styles.top}>{top}</AlertDialog.Top>}
      {bottom && <AlertDialog.Bottom>{bottom}</AlertDialog.Bottom>}
    </AlertDialog>
  )
})

const AlertTop = ({ children }: PropsWithChildren) => <>{children}</>

interface AlertBottomProps {
  /**
   * 버튼 배치 방향
   * @defaultValue 'horizontal'
   */
  direction?: 'horizontal' | 'vertical'
}

const AlertBottom = ({ direction = 'horizontal', children }: PropsWithChildren<AlertBottomProps>) => {
  return (
    <Flex
      className={styles.bottom}
      flexDirection={direction === 'horizontal' ? 'row' : 'column'}
      columnGap={direction === 'horizontal' ? vars.ref.spacing[100] : undefined}
      rowGap={direction === 'vertical' ? vars.ref.spacing[100] : undefined}
    >
      {children}
    </Flex>
  )
}

// ========== AlertTitle ==========
const AlertTitle = ({ children }: PropsWithChildren) => {
  return (
    <Typography maxLines={2} textStyle='subheadingSmall'>
      {children}
    </Typography>
  )
}

// ========== AlertDescription ==========
const AlertDescription = ({ children }: PropsWithChildren) => {
  return <Typography textStyle='descriptionLarge'>{children}</Typography>
}

// ========== exports ==========
type AlertComponent = typeof AlertRoot & {
  /**
   * Alert의 트리거 버튼이에요. {@link AlertRoot `<Alert>`} 안에 배치하세요.
   * - 비제어 Alert에서 사용할 수 있어요.
   * - 제어 Alert에서는 `isPresented` prop을 직접 관리하세요.
   *
   * @example
   * ### 👇 기본 사용법
   * ```tsx
   * <Alert>
   *   <Alert.Trigger>
   *     <Button>열기</Button>
   *   </Alert.Trigger>
   *   <Alert.Top>상단 영역입니다</Alert.Top>
   * </Alert>
   * ```
   */
  Trigger: typeof AlertDialog.Trigger
  /**
   * Alert의 상단 영역입니다.
   */
  Top: typeof AlertTop
  /**
   * Alert의 하단 영역입니다.
   */
  Bottom: typeof AlertBottom
  /**
   * Alert 닫기 버튼이에요. {@link AlertBottom `<Alert.Bottom>`} 안에 배치하세요.
   * - 제어/비제어 Alert 모두에서 사용할 수 있어요.
   *
   * @example
   * ### 👇 기본 사용법
   * ```tsx
   * <Alert>
   *   <Alert.Top>상단 영역입니다</Alert.Top>
   *   <Alert.Bottom>
   *     <Alert.Close>
   *       <Button>확인</Button>
   *     </Alert.Close>
   *   </Alert.Bottom>
   * </Alert>
   * ```
   */
  Close: typeof AlertDialog.Close
  Title: typeof AlertTitle
  Description: typeof AlertDescription
}

/**
 * ### 💡 알아두기
 * - [🔗 figma 디자인가이드라인 바로가기](https://www.figma.com/design/j83TJjvORWmdqQ1mBWc3uR/%F0%9F%98%8E-%5B%ED%81%B4%EB%A0%88%EC%9D%B4%5D-%EC%BD%94%EC%96%B4-(0.1.5-token_v1)?m=auto&node-id=4829-34536&t=0WpAUIxxGzOh6eog-1)
 *
 * @example
 * ### 👇 기본 사용법 (비제어)
 * ```tsx
 * import { Alert, Button } from '@prism-ui/theme-ocean'
 * import { Typography } from '@prism-ui/core'
 *
 * function App() {
 *   return (
 *     <Alert>
 *       <Alert.Trigger>
 *         <Button color='mint' size='medium'>
 *           <Button.Center>열기</Button.Center>
 *         </Button>
 *       </Alert.Trigger>
 *       <Alert.Top>
 *         <Typography textStyle='subheadingSmall' maxLines={2}>
 *           수령방법이 변경됐어요.
 *         </Typography>
 *         <Typography textStyle='descriptionLarge'>결제금액과 함께 확인 후 결제해주세요.</Typography>
 *       </Alert.Top>
 *       <Alert.Bottom>
 *         <Alert.Close>
 *           <Button color='black' size='large' width='100%'>
 *             <Button.Center>버튼</Button.Center>
 *           </Button>
 *         </Alert.Close>
 *       </Alert.Bottom>
 *     </Alert>
 *   )
 * }
 * ```
 *
 * @example
 * ### 👇 제어 모드
 * ```tsx
 * import { Alert, Button } from '@prism-ui/theme-ocean'
 * import { Typography } from '@prism-ui/core'
 * import { useState } from 'react'
 *
 * function App() {
 *   const [open, setOpen] = useState(false)
 *
 *   return (
 *     <>
 *       <Button color='mint' size='medium' onClick={() => setOpen(true)}>
 *         <Button.Center>열기</Button.Center>
 *       </Button>
 *       <Alert isPresented={open} onIsPresentedChange={({ newValue }) => setOpen(newValue)}>
 *         <Alert.Top>
 *           <Typography textStyle='subheadingSmall' maxLines={2}>
 *             결제를 거절하시겠어요?
 *           </Typography>
 *           <Typography textStyle='descriptionLarge'>결제요청을 거절하시려면 아래에 사유를 입력해 주세요.</Typography>
 *         </Alert.Top>
 *         <Alert.Bottom>
 *           <Alert.Close>
 *             <Button color='gray' size='large' width='100%'>
 *               <Button.Center>작성 취소</Button.Center>
 *             </Button>
 *           </Alert.Close>
 *           <Button color='black' size='large' width='100%'>
 *             <Button.Center>버튼</Button.Center>
 *           </Button>
 *         </Alert.Bottom>
 *       </Alert>
 *     </>
 *   )
 * }
 * ```
 */

export const Alert: AlertComponent = Object.assign(AlertRoot, {
  Trigger: AlertDialog.Trigger,
  Top: AlertTop,
  Bottom: AlertBottom,
  Close: AlertDialog.Close,
  Title: AlertTitle,
  Description: AlertDescription,
})
