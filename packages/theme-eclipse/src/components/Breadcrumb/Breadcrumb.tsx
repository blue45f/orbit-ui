import { BreadcrumbComponent as CoreBreadcrumb } from '@orbit-ui/core'
import React from 'react'

export type BreadcrumbProps = React.ComponentPropsWithoutRef<typeof CoreBreadcrumb>

export const Breadcrumb = Object.assign(CoreBreadcrumb, {})
