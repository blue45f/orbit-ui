import {
  BaseToast,
  BaseToastProps,
  BaseToastSpecificProps,
  ComponentThemeProps,
  findComponent,
} from '@ui-forge/core'
import { forwardRef, Children, PropsWithChildren } from 'react'

import { vars } from '../../styles/theme.css'

import * as styles from './Toast.css'

export type ToastProps = Omit<BaseToastProps, keyof BaseToastSpecificProps> &
  ComponentThemeProps<typeof vars.com.snackbar>

export const ToastRoot = forwardRef<HTMLDivElement, ToastProps>((props, forwardedRef) => {
  const { theme, children, defaultIsPresented, isPresented, onIsPresentedChange, ...rest } = props

  const { trigger, leading, center, trailing } = findComponent({
    childrenArray: Children.toArray(children),
    target: [
      {
        name: 'trigger',
        component: BaseToast.Trigger,
      },
      {
        name: 'leading',
        component: ToastLeading,
      },
      {
        name: 'center',
        component: ToastCenter,
      },
      {
        name: 'trailing',
        component: ToastTrailing,
      },
    ],
  })

  return (
    <BaseToast
      {...rest}
      ref={forwardedRef}
      className={styles.container}
      theme={{ ...vars.com.snackbar, ...theme }}
      defaultIsPresented={defaultIsPresented}
      isPresented={isPresented}
      onIsPresentedChange={onIsPresentedChange}
      style={{ maxWidth: 768 }}
      arrangement='start'
      alignment='top'
    >
      {trigger && <BaseToast.Trigger>{trigger}</BaseToast.Trigger>}
      {leading && <BaseToast.Leading style={{ width: 18, height: 22 }}>{leading}</BaseToast.Leading>}
      {center && <BaseToast.Center>{center}</BaseToast.Center>}
      {trailing && <BaseToast.Trailing style={{ width: 18, height: 22 }}>{trailing}</BaseToast.Trailing>}
    </BaseToast>
  )
})

const ToastLeading = ({ children }: PropsWithChildren) => {
  return <>{children}</>
}

const ToastCenter = ({ children }: PropsWithChildren) => {
  return <>{children}</>
}

const ToastTrailing = ({ children }: PropsWithChildren) => {
  return <>{children}</>
}

// ========== exports ==========
type ToastComponent = typeof ToastRoot & {
  Leading: typeof ToastLeading
  Center: typeof ToastCenter
  Trailing: typeof ToastTrailing
  Trigger: typeof BaseToast.Trigger
  Close: typeof BaseToast.Close
}

/**
 * ### 💡 알아두기
 * - [🔗 figma 디자인가이드라인 바로가기](https://www.figma.com/design/j83TJjvORWmdqQ1mBWc3uR/%F0%9F%98%8E--%ED%81%B4%EB%A0%88%EC%9D%B4--%EC%BD%94%EC%96%B4-0.30.1?node-id=13588-17523&m=dev)
 *
 * @example
 * ### 👇 기본 사용법
 * ```
 * import { Toast } from '@ui-forge/theme-ocean'
 *
 * function App() {
 *   return (
 *     <Toast defaultIsPresented>
 *       <Toast.Leading>
 *         <CircleInfoFillIcon size={18} />
 *       </Toast.Leading>
 *       <Toast.Center>
 *         <div>Title Text</div>
 *         <div>Description Text</div>
 *       </Toast.Center>
 *       <Toast.Trailing>
 *         <IconButton>
 *           <CloseIcon />
 *         </IconButton>
 *       </Toast.Trailing>
 *     </Toast>
 *   )
 * }
 * ```
 */

export const Toast: ToastComponent = Object.assign(ToastRoot, {
  Leading: ToastLeading,
  Center: ToastCenter,
  Trailing: ToastTrailing,
  Trigger: BaseToast.Trigger,
  Close: BaseToast.Close,
})
