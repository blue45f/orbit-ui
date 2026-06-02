import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { CancelIcon } from '@heejun-com/icons'

import { cn } from '../../styles'

const hasComponent = (children: React.ReactNode, components: React.ElementType[]): boolean =>
  React.Children.toArray(children).some((child) => {
    if (!React.isValidElement(child)) return false
    if (components.includes(child.type as React.ElementType)) return true

    return hasComponent((child.props as { children?: React.ReactNode }).children, components)
  })

const DrawerRoot = DialogPrimitive.Root
const DrawerTrigger = DialogPrimitive.Trigger
const DrawerPortal = DialogPrimitive.Portal
const DrawerClose = DialogPrimitive.Close

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    className={cn(
      'fixed inset-0 z-[400] bg-[var(--sem-eclipse-color-overlayPrimary)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
    ref={ref}
  />
))
DrawerOverlay.displayName = DialogPrimitive.Overlay.displayName

export interface DrawerContentProps extends React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Content
> {
  side?: 'top' | 'bottom' | 'left' | 'right'
}

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DrawerContentProps
>(({ side = 'right', className, children, ...props }, ref) => {
  const hasTitle = hasComponent(children, [DrawerTitle])
  const hasDescription = hasComponent(children, [DrawerDescription])
  const sideClasses = {
    top: 'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
    bottom:
      'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
    left: 'inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left',
    right:
      'inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right',
  }

  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          'fixed z-[400] gap-4 border-[var(--sem-eclipse-color-borderTertiary)] bg-[var(--sem-eclipse-color-surfaceContainer)] p-6 shadow-[var(--sem-eclipse-shadow-level3)] transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out',
          sideClasses[side],
          className
        )}
        {...props}
      >
        {!hasTitle && <DrawerTitle className="sr-only">Drawer</DrawerTitle>}
        {!hasDescription && (
          <DrawerDescription className="sr-only">Supplementary panel content.</DrawerDescription>
        )}
        {children}
        <DrawerClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-[var(--sem-eclipse-color-surfaceContainer)] transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[var(--sem-eclipse-color-systemMainPrimary)] focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-[var(--sem-eclipse-color-fillSecondary)]">
          <CancelIcon className="h-4 w-4" tone="soft" />
          <span className="sr-only">Close</span>
        </DrawerClose>
      </DialogPrimitive.Content>
    </DrawerPortal>
  )
})
DrawerContent.displayName = DialogPrimitive.Content.displayName

const DrawerHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-2 text-center sm:text-left', className)} {...props} />
)
DrawerHeader.displayName = 'DrawerHeader'

const DrawerFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
    {...props}
  />
)
DrawerFooter.displayName = 'DrawerFooter'

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      'text-lg font-semibold text-[var(--sem-eclipse-color-foregroundPrimary)]',
      className
    )}
    {...props}
  />
))
DrawerTitle.displayName = DialogPrimitive.Title.displayName

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-[var(--sem-eclipse-color-foregroundSecondary)]', className)}
    {...props}
  />
))
DrawerDescription.displayName = DialogPrimitive.Description.displayName

export const Drawer = Object.assign(DrawerRoot, {
  Trigger: DrawerTrigger,
  Content: DrawerContent,
  Header: DrawerHeader,
  Footer: DrawerFooter,
  Title: DrawerTitle,
  Description: DrawerDescription,
  Close: DrawerClose,
})
