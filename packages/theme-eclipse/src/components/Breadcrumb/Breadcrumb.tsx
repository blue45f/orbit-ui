import { BreadcrumbComponent as CoreBreadcrumb } from '@heejun-com/core'
import React from 'react'

export type BreadcrumbProps = React.ComponentPropsWithoutRef<typeof CoreBreadcrumb>

export const Breadcrumb = Object.assign(CoreBreadcrumb, {})
