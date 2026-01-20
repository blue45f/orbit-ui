import { AlertDialog as CoreAlertDialog } from '@orbit-ui/core'
import React, { forwardRef, PropsWithChildren, Children, HTMLAttributes } from 'react'

export type DialogProps = React.ComponentPropsWithoutRef<typeof CoreAlertDialog> & {
  defaultIsPresented?: boolean
  isPresented?: boolean
  onIsPresentedChange?: (open: boolean) => void
  theme?: unknown
}

export const DialogRoot = forwardRef<HTMLDivElement, DialogProps>((props, forwardedRef) => {
  const {
    theme: _theme,
    children,
    defaultIsPresented,
    isPresented,
    onIsPresentedChange,
    ...rest
  } = props

  let trigger: React.ReactNode = null
  const tops: React.ReactNode[] = []
  const bottoms: React.ReactNode[] = []

  Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return
    if (child.type === CoreAlertDialog.Trigger) trigger = child
    if (child.type === DialogTop) tops.push(child)
    if (child.type === DialogBottom) bottoms.push(child)
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

const DialogTop = ({ children }: PropsWithChildren) => {
  return <CoreAlertDialog.Header>{children}</CoreAlertDialog.Header>
}

interface DialogFooterProps {
  direction?: 'horizontal' | 'vertical'
}

const DialogBottom = ({
  direction = 'horizontal',
  children,
}: PropsWithChildren<DialogFooterProps & HTMLAttributes<HTMLDivElement>>) => {
  return (
    <CoreAlertDialog.Footer
      className={direction === 'vertical' ? 'flex-col !space-x-0 space-y-2' : ''}
    >
      {children}
    </CoreAlertDialog.Footer>
  )
}

type DialogComponent = typeof DialogRoot & {
  Trigger: typeof CoreAlertDialog.Trigger
  Top: typeof DialogTop
  Bottom: typeof DialogBottom
  Close: typeof CoreAlertDialog.Cancel
}

export const Dialog: DialogComponent = Object.assign(DialogRoot, {
  Trigger: CoreAlertDialog.Trigger,
  Top: DialogTop,
  Bottom: DialogBottom,
  Close: CoreAlertDialog.Cancel,
})
