import { AvatarComponent as CoreAvatar } from '@heejun-com/core'
import React from 'react'

export type AvatarProps = React.ComponentPropsWithoutRef<typeof CoreAvatar>

export const Avatar = Object.assign(CoreAvatar, {})
