import { Drawer as CoreDrawer } from '@orbit-ui/core'
import type { ComponentPropsWithoutRef } from 'react'

export type DrawerProps = ComponentPropsWithoutRef<typeof CoreDrawer>

export const Drawer = Object.assign(CoreDrawer, {})
