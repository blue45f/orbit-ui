import { Drawer as CoreDrawer } from '@heejun-com/core'
import React, { forwardRef } from 'react'

export type DrawerProps = React.ComponentPropsWithoutRef<typeof CoreDrawer>
export type DrawerContentProps = React.ComponentPropsWithoutRef<typeof CoreDrawer.Content>

const BaseDrawerContent = CoreDrawer.Content
const DrawerRoot: React.FC<DrawerProps> = (props) => <CoreDrawer {...props} />

const hasComponent = (
  children: React.ReactNode,
  components: React.ElementType[]
): boolean =>
  React.Children.toArray(children).some((child) => {
    if (!React.isValidElement(child)) return false
    if (components.includes(child.type as React.ElementType)) return true

    return hasComponent((child.props as { children?: React.ReactNode }).children, components)
  })

const DrawerContent = forwardRef<HTMLDivElement, DrawerContentProps>(({ children, ...props }, ref) => {
  const hasTitle = hasComponent(children, [CoreDrawer.Title])
  const hasDescription = hasComponent(children, [CoreDrawer.Description])

  return (
    <BaseDrawerContent ref={ref} {...props}>
      {!hasTitle && <CoreDrawer.Title className="sr-only">Drawer</CoreDrawer.Title>}
      {!hasDescription && (
        <CoreDrawer.Description className="sr-only">
          Supplementary panel content.
        </CoreDrawer.Description>
      )}
      {children}
    </BaseDrawerContent>
  )
})
DrawerContent.displayName = 'DrawerContent'

export const Drawer = Object.assign(DrawerRoot, {
  Trigger: CoreDrawer.Trigger,
  Content: DrawerContent,
  Header: CoreDrawer.Header,
  Footer: CoreDrawer.Footer,
  Title: CoreDrawer.Title,
  Description: CoreDrawer.Description,
  Close: CoreDrawer.Close,
})
