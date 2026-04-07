import React, {
  createContext,
  forwardRef,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import {
  DismissableLayer as RadixDismissableLayer,
  DismissableLayerBranch as RadixDismissableLayerBranch,
} from '@radix-ui/react-dismissable-layer'

import { polymorphic, useComposedRefs } from '../../../libs'
import { vars } from '../../../styles/theme.css'
import { ContainerLayer } from '../Layer'

type OverlayContainerLayerContextValue = {
  layers: Set<HTMLElement>
  protectedItems: Set<HTMLElement>
}

const OverlayContainerLayerContext = createContext<OverlayContainerLayerContextValue>({
  layers: new Set<HTMLElement>(),
  protectedItems: new Set<HTMLElement>(),
})

export const OverlayContainerLayerProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const layersRef = useRef(new Set<HTMLElement>())
  const protectedItemsRef = useRef(new Set<HTMLElement>())

  const value = useMemo(
    () => ({ layers: layersRef.current, protectedItems: protectedItemsRef.current }),
    []
  )

  return (
    <OverlayContainerLayerContext.Provider value={value}>
      {children}
    </OverlayContainerLayerContext.Provider>
  )
}

type AllowOverlayContainerLayerTagNames =
  | 'div'
  | 'header'
  | 'section'
  | 'article'
  | 'aside'
  | 'nav'
  | 'main'
  | 'dialog'
  | 'form'

type OverlayContainerLayerBaseProps = {
  /**
   * ESC 키로 닫힐지 여부
   * @defaultValue true
   */
  dismissOnEscape?: boolean

  /**
   * 외부 영역에서 포인터를 누를 때 닫힐지 여부
   * @defaultValue true
   */
  dismissOnClickOutside?: boolean

  /**
   * 외부로 포커스가 이동할 때 닫힐지 여부
   * @defaultValue true
   */
  dismissOnFocusOutside?: boolean

  /**
   * 오버레이 컨테이너의 z-index 값
   * @defaultValue 1
   * @example vars.sem.elevation.level3
   */
  elevation?: (typeof vars.sem.elevation)[keyof typeof vars.sem.elevation]

  onDismiss?: () => void
}

export type OverlayContainerLayerProps = React.ComponentProps<typeof OverlayContainerLayerRoot>

const OverlayContainerLayerRoot = polymorphic<
  'div',
  AllowOverlayContainerLayerTagNames,
  OverlayContainerLayerBaseProps
>(
  (props, forwardedRef) => {
    const {
      dismissOnEscape = true,
      dismissOnClickOutside = true,
      dismissOnFocusOutside = true,
      onDismiss,
      elevation = 1,
      children,
      as,
      ...rest
    } = props

    const asProp = (as ?? 'div') as AllowOverlayContainerLayerTagNames
    const context = useContext(OverlayContainerLayerContext)
    const [node, setNode] = useState<HTMLElement | null>(null)
    const composedRefs = useComposedRefs(forwardedRef, (nd) => setNode(nd))

    useEffect(() => {
      if (!node) return
      context.layers.add(node)
      return () => {
        if (!node) return
        context.layers.delete(node)
      }
    }, [node, context])

    return (
      <RadixDismissableLayer
        asChild
        onEscapeKeyDown={(event) => {
          const layers = Array.from(context.layers)
          const index = node ? layers.indexOf(node) : -1
          // 가장 상위의 레이어만 ESC 키를 통해 닫을 수 있음
          const isHighestLayer = index === context.layers.size - 1 && index !== -1

          if (!isHighestLayer || !dismissOnEscape) {
            event.preventDefault()
            return
          }

          if (onDismiss) {
            event.preventDefault()
            onDismiss()
          }
        }}
        onPointerDownOutside={(event) => {
          const target = event.target as HTMLElement
          const isPointerDownOnProtected = [...context.protectedItems].some((protectedItem) =>
            protectedItem.contains(target)
          )

          if (!dismissOnClickOutside || isPointerDownOnProtected) {
            event.preventDefault()
            return
          }

          onDismiss?.()
        }}
        onFocusOutside={(event) => {
          const target = event.target as HTMLElement
          const isPointerDownOnProtected = [...context.protectedItems].some((protectedItem) =>
            protectedItem.contains(target)
          )

          if (!dismissOnFocusOutside || isPointerDownOnProtected) {
            event.preventDefault()
            return
          }

          onDismiss?.()
        }}
      >
        <ContainerLayer
          as={asProp}
          {...rest}
          ref={composedRefs}
          style={{
            zIndex: elevation,
            ...props.style,
          }}
        >
          {children}
        </ContainerLayer>
      </RadixDismissableLayer>
    )
  },
  { useForwardRef: true }
)

const OverlayContainerLayerProtected = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, forwardedRef) => {
  const context = useContext(OverlayContainerLayerContext)
  const ref = useRef<HTMLDivElement>(null)
  const composedRefs = useComposedRefs(forwardedRef, ref)

  useEffect(() => {
    const node = ref.current
    if (node) {
      context.protectedItems.add(node)
      return () => {
        context.protectedItems.delete(node)
      }
    }
  }, [context.protectedItems])

  return (
    <RadixDismissableLayerBranch asChild>
      <div {...props} ref={composedRefs} />
    </RadixDismissableLayerBranch>
  )
})
// =========== exports ===========

type OverlayContainerLayerComponent = typeof OverlayContainerLayerRoot & {
  /**
   * OverlayContainerLayer 외부에 존재하는 엘리먼트를 클릭했을 때 OverlayContainer를 닫지 않아야 하는 경우 사용해요.
   * e.g. Select Element에서 Input 엘리먼트를 클릭해도 Overlay가 닫히지 않아야 함
   */
  Protected: typeof OverlayContainerLayerProtected
}

const OverlayContainerLayer: OverlayContainerLayerComponent = Object.assign(
  OverlayContainerLayerRoot,
  {
    Protected: OverlayContainerLayerProtected,
  }
)

export { OverlayContainerLayer }
