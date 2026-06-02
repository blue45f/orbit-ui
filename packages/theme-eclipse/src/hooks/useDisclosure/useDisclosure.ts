import { useCallback, useMemo, useState } from 'react'

export type UseDisclosureProps = {
  /**
   * 비제어 모드의 초기 열림 상태.
   * @defaultValue false
   */
  defaultIsOpen?: boolean
  /**
   * 제어 모드 값. 지정하면 외부 상태가 진실의 원천이 됩니다.
   */
  isOpen?: boolean
  /**
   * 상태 변경 시 호출. 제어·비제어 모두에서 동작합니다.
   */
  onOpenChange?: (open: boolean) => void
  /**
   * onOpen 시 호출. onOpenChange의 편의 콜백.
   */
  onOpen?: () => void
  /**
   * onClose 시 호출. onOpenChange의 편의 콜백.
   */
  onClose?: () => void
}

export type UseDisclosureReturn = {
  /** 현재 열림 상태 */
  isOpen: boolean
  /** 열기 */
  onOpen: () => void
  /** 닫기 */
  onClose: () => void
  /** 토글 */
  onToggle: () => void
  /**
   * Trigger 요소(버튼 등)에 spread 해서 ARIA를 자동 적용하기 위한 props 번들.
   * `aria-expanded`, `aria-controls`(id 지정 시), 클릭 핸들러를 포함합니다.
   */
  getTriggerProps: (id?: string) => {
    'aria-expanded': boolean
    'aria-controls'?: string
    onClick: () => void
  }
  /**
   * Disclosure 영역(panel 등)에 spread 해서 id를 자동 부여하기 위한 props 번들.
   */
  getDisclosureProps: (id?: string) => {
    id?: string
    hidden: boolean
  }
}

/**
 * Modal·Drawer·Popover·Tooltip·Accordion 등 열림·닫힘 상태를 가지는 컴포넌트의
 * 제어·비제어 패턴을 한 줄로 통일합니다.
 *
 * @example
 * ### 비제어 (가장 흔한 케이스)
 * ```tsx
 * const { isOpen, onOpen, onClose } = useDisclosure()
 * return (
 *   <>
 *     <SolidButton onClick={onOpen}>열기</SolidButton>
 *     <Modal open={isOpen} onOpenChange={onClose}>...</Modal>
 *   </>
 * )
 * ```
 *
 * @example
 * ### 제어 (부모가 상태 소유)
 * ```tsx
 * const [open, setOpen] = useState(false)
 * const { onToggle } = useDisclosure({ isOpen: open, onOpenChange: setOpen })
 * ```
 *
 * @example
 * ### Trigger·Disclosure 자동 와이어링
 * ```tsx
 * const d = useDisclosure()
 * return (
 *   <>
 *     <button {...d.getTriggerProps('panel-1')}>토글</button>
 *     <section {...d.getDisclosureProps('panel-1')}>...</section>
 *   </>
 * )
 * ```
 */
export function useDisclosure(props: UseDisclosureProps = {}): UseDisclosureReturn {
  const { defaultIsOpen = false, isOpen: controlledIsOpen, onOpenChange, onOpen, onClose } = props

  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(defaultIsOpen)
  const isControlled = controlledIsOpen !== undefined
  const isOpen = isControlled ? controlledIsOpen : uncontrolledIsOpen

  const setIsOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setUncontrolledIsOpen(next)
      }
      onOpenChange?.(next)
      if (next) {
        onOpen?.()
      } else {
        onClose?.()
      }
    },
    [isControlled, onOpenChange, onOpen, onClose]
  )

  const handleOpen = useCallback(() => setIsOpen(true), [setIsOpen])
  const handleClose = useCallback(() => setIsOpen(false), [setIsOpen])
  const handleToggle = useCallback(() => setIsOpen(!isOpen), [isOpen, setIsOpen])

  const getTriggerProps = useCallback(
    (id?: string) => ({
      'aria-expanded': isOpen,
      ...(id ? { 'aria-controls': id } : {}),
      onClick: handleToggle,
    }),
    [isOpen, handleToggle]
  )

  const getDisclosureProps = useCallback(
    (id?: string) => ({
      ...(id ? { id } : {}),
      hidden: !isOpen,
    }),
    [isOpen]
  )

  return useMemo(
    () => ({
      isOpen,
      onOpen: handleOpen,
      onClose: handleClose,
      onToggle: handleToggle,
      getTriggerProps,
      getDisclosureProps,
    }),
    [isOpen, handleOpen, handleClose, handleToggle, getTriggerProps, getDisclosureProps]
  )
}
