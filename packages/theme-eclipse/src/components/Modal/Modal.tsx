import * as DialogPrimitive from '@radix-ui/react-dialog'
import React, { Children, forwardRef, HTMLAttributes, PropsWithChildren } from 'react'

import { cn } from '../../styles'

type DialogRootPrimitiveProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root>
type DialogContentPrimitiveProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>

export type DialogProps = Omit<DialogContentPrimitiveProps, 'children'> & {
  children?: React.ReactNode
  defaultIsPresented?: boolean
  isPresented?: boolean
  onIsPresentedChange?: (open: boolean) => void
  onOpenChange?: (open: boolean) => void
  modal?: DialogRootPrimitiveProps['modal']
  theme?: unknown
}

const hasComponent = (children: React.ReactNode, components: React.ElementType[]): boolean =>
  Children.toArray(children).some((child) => {
    if (!React.isValidElement(child)) return false
    if (components.includes(child.type as React.ElementType)) return true

    return hasComponent((child.props as { children?: React.ReactNode }).children, components)
  })

export const DialogRoot = forwardRef<HTMLDivElement, DialogProps>((props, forwardedRef) => {
  const {
    theme: _theme,
    children,
    defaultIsPresented,
    isPresented,
    onIsPresentedChange,
    onOpenChange,
    modal,
    className,
    ...contentProps
  } = props

  let trigger: React.ReactNode = null
  const tops: React.ReactNode[] = []
  const bottoms: React.ReactNode[] = []

  Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return
    if (child.type === DialogTrigger) trigger = child
    if (child.type === DialogTop) tops.push(child)
    if (child.type === DialogBottom) bottoms.push(child)
  })

  const content = [...tops, ...bottoms]
  const hasTitle = hasComponent(content, [DialogTitle])
  const hasDescription = hasComponent(content, [DialogDescription])

  return (
    <DialogPrimitive.Root
      defaultOpen={defaultIsPresented}
      open={isPresented}
      onOpenChange={onIsPresentedChange ?? onOpenChange}
      modal={modal}
    >
      {trigger}
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            'fixed inset-0 z-[300] bg-[var(--sem-eclipse-color-overlayPrimary)]',
            'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'
          )}
        />
        <DialogPrimitive.Content
          ref={forwardedRef}
          className={cn(
            'fixed left-[50%] top-[50%] z-[300] grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-[var(--sem-eclipse-color-borderTertiary)] bg-[var(--sem-eclipse-color-surfaceContainer)] p-6 shadow-[var(--sem-eclipse-shadow-level4)] duration-200',
            'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
            'sm:rounded-xl',
            className
          )}
          {...contentProps}
        >
          {!hasTitle && <DialogTitle className="sr-only">Dialog</DialogTitle>}
          {!hasDescription && (
            <DialogDescription className="sr-only">Supplementary dialog content.</DialogDescription>
          )}
          {content}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
})

const DialogTrigger = DialogPrimitive.Trigger

const DialogTop = ({ children }: PropsWithChildren) => {
  return <div className="flex flex-col space-y-2 text-center sm:text-left">{children}</div>
}

interface DialogFooterProps {
  direction?: 'horizontal' | 'vertical'
}

const DialogBottom = ({
  direction = 'horizontal',
  children,
}: PropsWithChildren<DialogFooterProps & HTMLAttributes<HTMLDivElement>>) => {
  return (
    <div
      className={cn(
        'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
        direction === 'vertical' && 'flex-col !space-x-0 space-y-2'
      )}
    >
      {children}
    </div>
  )
}

const DialogTitle = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold tracking-tight', className)}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-[var(--sem-eclipse-color-foregroundSecondary)]', className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

type DialogComponent = typeof DialogRoot & {
  Trigger: typeof DialogTrigger
  Top: typeof DialogTop
  Bottom: typeof DialogBottom
  Close: typeof DialogPrimitive.Close
  Title: typeof DialogTitle
  Description: typeof DialogDescription
}

export const Dialog: DialogComponent = Object.assign(DialogRoot, {
  Trigger: DialogTrigger,
  Top: DialogTop,
  Bottom: DialogBottom,
  Close: DialogPrimitive.Close,
  Title: DialogTitle,
  Description: DialogDescription,
})
