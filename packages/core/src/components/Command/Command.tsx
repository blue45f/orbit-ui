import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Command as CommandPrimitive } from 'cmdk'
import { SearchIcon } from '@heejun-com/icons'

import { cn } from '../../styles'

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      'flex h-full w-full flex-col overflow-hidden rounded-md bg-[var(--sem-eclipse-color-surfaceContainer)] text-[var(--sem-eclipse-color-foregroundPrimary)]',
      className
    )}
    {...props}
  />
))
Command.displayName = CommandPrimitive.displayName

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b border-[var(--sem-eclipse-color-borderTertiary)] px-3">
    <SearchIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" tone="soft" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        'flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-[var(--sem-eclipse-color-foregroundTertiary)] disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  </div>
))
CommandInput.displayName = CommandPrimitive.Input.displayName

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn('max-h-[300px] overflow-y-auto overflow-x-hidden', className)}
    {...props}
  />
))
CommandList.displayName = CommandPrimitive.List.displayName

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty ref={ref} className="py-6 text-center text-sm" {...props} />
))
CommandEmpty.displayName = CommandPrimitive.Empty.displayName

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      'overflow-hidden p-1 text-[var(--sem-eclipse-color-foregroundPrimary)] [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-[var(--sem-eclipse-color-foregroundSecondary)]',
      className
    )}
    {...props}
  />
))
CommandGroup.displayName = CommandPrimitive.Group.displayName

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 h-px bg-[var(--sem-eclipse-color-borderTertiary)]', className)}
    {...props}
  />
))
CommandSeparator.displayName = CommandPrimitive.Separator.displayName

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-[var(--sem-eclipse-color-fillSecondary)] data-[selected=true]:text-[var(--sem-eclipse-color-foregroundPrimary)] data-[disabled=true]:opacity-50',
      className
    )}
    {...props}
  />
))
CommandItem.displayName = CommandPrimitive.Item.displayName

/**
 * Cmd+K (macOS) / Ctrl+K (Windows, Linux) 단축키로 열림 상태를 토글합니다.
 *
 * document 에 keydown 리스너를 등록하고 언마운트 시 정리해요.
 * 단축키 입력 시 브라우저 기본 동작(주소창 포커스 등)을 막기 위해 preventDefault 를 호출합니다.
 */
function useCommandShortcut(
  setOpen: React.Dispatch<React.SetStateAction<boolean>> | ((value: boolean) => void),
  enabled = true
): void {
  // 최신 setter 를 ref 로 유지해 effect 재구독을 막아요.
  // useLayoutEffect 로 동기 갱신: render 중 ref 변경은 React Compiler 규칙 위반.
  const setOpenRef = React.useRef(setOpen)
  React.useLayoutEffect(() => {
    setOpenRef.current = setOpen
  })

  React.useEffect(() => {
    if (!enabled) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        // 함수형 업데이트가 가능하면 토글, 아니면 단순 true 처리(controlled setter 호환)
        const setter = setOpenRef.current as (
          value: boolean | ((prev: boolean) => boolean)
        ) => void
        setter((prev) => !prev)
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [enabled])
}

export interface CommandDialogProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive> {
  /** 다이얼로그 열림 상태 (controlled). */
  open?: boolean
  /** 열림 상태 변경 콜백. */
  onOpenChange?: (open: boolean) => void
  /** true 이면 Cmd+K / Ctrl+K 로 열림 상태를 토글합니다. */
  enableShortcut?: boolean
  /** 스크린리더용 다이얼로그 이름. 기본값 "명령 팔레트". */
  label?: string
  /** 다이얼로그 컨테이너에 적용할 className. */
  dialogClassName?: string
}

/**
 * 모달 형태의 커맨드 팔레트(⌘K).
 *
 * Radix Dialog 로 감싸 포커스 트랩 / Esc 닫기 / 스크롤 잠금 / aria-modal 을 자동으로 제공합니다.
 * 내부에는 기존 Command 서브 컴포넌트(Input / List / Empty / Group / Item)를 그대로 사용해요.
 */
const CommandDialog = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  CommandDialogProps
>(
  (
    {
      open,
      onOpenChange,
      enableShortcut = false,
      label = '명령 팔레트',
      className,
      dialogClassName,
      children,
      ...props
    },
    ref
  ) => {
    // controlled / uncontrolled 모두 지원: open 이 주어지지 않으면 내부 상태로 동작해요.
    const [internalOpen, setInternalOpen] = React.useState(false)
    const isControlled = open !== undefined
    const isOpen = isControlled ? open : internalOpen

    const setOpen = React.useCallback(
      (next: boolean | ((prev: boolean) => boolean)) => {
        const resolve = (prev: boolean) =>
          typeof next === 'function' ? (next as (p: boolean) => boolean)(prev) : next

        if (!isControlled) {
          setInternalOpen(resolve)
        }
        onOpenChange?.(resolve(isOpen))
      },
      [isControlled, isOpen, onOpenChange]
    )

    useCommandShortcut(setOpen, enableShortcut)

    return (
      <DialogPrimitive.Root open={isOpen} onOpenChange={(value) => setOpen(value)}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay
            className={cn(
              'fixed inset-0 z-[400] bg-[var(--sem-eclipse-color-overlayPrimary)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'
            )}
          />
          <DialogPrimitive.Content
            aria-label={label}
            className={cn(
              'fixed left-1/2 top-1/2 z-[400] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-[var(--sem-eclipse-color-borderTertiary)] bg-[var(--sem-eclipse-color-surfaceContainer)] p-0 text-[var(--sem-eclipse-color-foregroundPrimary)] shadow-[var(--sem-eclipse-shadow-level3)] outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
              dialogClassName
            )}
          >
            {/* 스크린리더용 제목/설명. 시각적으로는 숨겨요. */}
            <DialogPrimitive.Title className="sr-only">{label}</DialogPrimitive.Title>
            <DialogPrimitive.Description className="sr-only">
              명령을 검색하고 실행하세요.
            </DialogPrimitive.Description>
            <Command ref={ref} className={cn('rounded-none', className)} {...props}>
              {children}
            </Command>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    )
  }
)
CommandDialog.displayName = 'CommandDialog'

export const CommandComponent = Object.assign(Command, {
  Input: CommandInput,
  List: CommandList,
  Empty: CommandEmpty,
  Group: CommandGroup,
  Item: CommandItem,
  Separator: CommandSeparator,
  Dialog: CommandDialog,
})

export { useCommandShortcut }
