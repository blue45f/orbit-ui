import {
  AlertDialog,
  AlertDialogProps,
  AlertDialogSpecificProps,
  ComponentThemeProps,
  findComponent,
  Flex,
  useElementScroll,
} from '@ui-forge/core'
import { forwardRef, Children, PropsWithChildren, HTMLAttributes } from 'react'

import { vars } from '../../styles/theme.css'

import * as styles from './Dialog.css'

export type DialogProps = Omit<AlertDialogProps, keyof AlertDialogSpecificProps> &
  ComponentThemeProps<typeof vars.com.dialog>

export const DialogRoot = forwardRef<HTMLDivElement, DialogProps>((props, forwardedRef) => {
  const { theme, children, defaultIsPresented, isPresented: isPresentedProp, ...rest } = props

  const { scrollRef, isScrollable } = useElementScroll<HTMLDivElement>()

  const { trigger, top, bottom } = findComponent({
    childrenArray: Children.toArray(children),
    target: [
      {
        name: 'trigger',
        component: AlertDialog.Trigger,
      },
      {
        name: 'top',
        component: DialogTop,
      },
      {
        name: 'bottom',
        component: DialogBottom,
      },
    ],
  })

  return (
    <AlertDialog
      {...rest}
      ref={forwardedRef}
      theme={{ ...vars.com.dialog, ...theme }}
      defaultIsPresented={defaultIsPresented}
      isPresented={isPresentedProp}
      className={styles.root}
    >
      {trigger}
      {top && (
        <AlertDialog.Top className={styles.top} ref={scrollRef}>
          {top}
        </AlertDialog.Top>
      )}
      {bottom && (
        <AlertDialog.Bottom className={isScrollable ? styles.bottomWithGradient : undefined}>{bottom}</AlertDialog.Bottom>
      )}
    </AlertDialog>
  )
})

const DialogTop = ({ children }: PropsWithChildren) => {
  return <>{children}</>
}

interface DialogFooterProps {
  /**
   * 버튼 배치 방향
   * @defaultValue 'horizontal'
   */
  direction?: 'horizontal' | 'vertical'
}

const DialogBottom = ({
  direction = 'horizontal',
  children,
  ...rest
}: PropsWithChildren<DialogFooterProps & HTMLAttributes<HTMLDivElement>>) => {
  return (
    <Flex
      {...rest}
      className={styles.bottom}
      flexDirection={direction === 'horizontal' ? 'row' : 'column'}
      columnGap={direction === 'horizontal' ? vars.ref.spacing[100] : undefined}
      rowGap={direction === 'vertical' ? vars.ref.spacing[100] : undefined}
    >
      {children}
    </Flex>
  )
}

// ========== exports ==========
type DialogComponent = typeof DialogRoot & {
  /**
   * Dialog의 트리거 버튼이에요. {@link DialogRoot `<Dialog>`} 안에 배치하세요.
   * - 비제어 Dialog에서 사용할 수 있어요.
   * - 제어 Dialog에서는 `isPresented` prop을 직접 관리하세요.
   *
   * @example
   * ### 👇 기본 사용법
   * ```tsx
   * <Alert>
   *   <Alert.Trigger>
   *     <Button>열기</Button>
   *   </Alert.Trigger>
   *   <Alert.Body>본문</Alert.Body>
   * </Alert>
   * ```
   */
  Trigger: typeof AlertDialog.Trigger
  /**
   * Dialog의 상단 영역입니다.
   */
  Top: typeof DialogTop
  /**
   * Dialog의 하단 영역입니다.
   */
  Bottom: typeof DialogBottom
  /**
   * Dialog 닫기 버튼이에요. {@link DialogBottom `<Alert.Bottom>`} 안에 배치하세요.
   * - 제어/비제어 Alert 모두에서 사용할 수 있어요.
   *
   * @example
   * ### 👇 기본 사용법
   * ```tsx
   * <Alert>
   *   <Alert.Body>본문</Alert.Body>
   *   <Alert.Footer>
   *     <Alert.Close>
   *       <Button>확인</Button>
   *     </Alert.Close>
   *   </Alert.Footer>
   * </Alert>
   * ```
   */
  Close: typeof AlertDialog.Close
}

/**
 * ### 💡 알아두기
 * - [🔗 figma 디자인가이드라인 바로가기](https://www.figma.com/design/j83TJjvORWmdqQ1mBWc3uR/%F0%9F%98%8E-%5B%ED%81%B4%EB%A0%88%EC%9D%B4%5D-%EC%BD%94%EC%96%B4-(0.1.5-token_v1)?m=auto&node-id=4829-34536&t=0WpAUIxxGzOh6eog-1)
 *
 * @example
 * ### 👇 기본 사용법 (비제어)
 * ```tsx
 * import { Alert, Button } from '@ui-forge/theme-ocean'
 * import { Flex } from '@ui-forge/core'
 *
 * function App() {
 *   return (
 *     <Alert>
 *       <Alert.Trigger>
 *         <Button color='mint' size='medium'>
 *           <Button.Center>열기</Button.Center>
 *         </Button>
 *       </Alert.Trigger>
 *       <Alert.Header>결제를 거절하시겠어요?</Alert.Header>
 *       <Alert.Body>결제요청을 거절하시려면 아래에 사유를 입력해 주세요</Alert.Body>
 *       <Alert.Footer direction='vertical'>
 *         <Alert.Close>
 *           <Button color='white' size='medium' width='100%'>
 *             <Button.Center>작성 취소</Button.Center>
 *           </Button>
 *         </Alert.Close>
 *         <Button color='black' size='medium' width='100%'>
 *           <Button.Center>버튼</Button.Center>
 *         </Button>
 *       </Alert.Footer>
 *     </Alert>
 *   )
 * }
 * ```
 *
 * @example
 * ### 👇 제어 모드
 * ```tsx
 * import { Alert, Button } from '@ui-forge/theme-ocean'
 *
 * function App() {
 *   const [open, setOpen] = useState(false)
 *
 *   return (
 *     <>
 *       <Button variant='medium' onClick={() => setOpen(true)}>열기</Button>
 *       <Alert isPresented={open} onIsPresentedChange={({ newValue }) => setOpen(newValue)}>
 *         <Alert.Header>헤더입니다</Alert.Header>
 *         <Alert.Body>본문입니다</Alert.Body>
 *         <Alert.Footer>
 *           <Alert.Close>
 *             <Button variant='medium'>확인</Button>
 *           </Alert.Close>
 *         </Alert.Footer>
 *       </Alert>
 *     </>
 *   )
 * }
 * ```
 */

export const Dialog: DialogComponent = Object.assign(DialogRoot, {
  Trigger: AlertDialog.Trigger,
  Top: DialogTop,
  Bottom: DialogBottom,
  Close: AlertDialog.Close,
})
