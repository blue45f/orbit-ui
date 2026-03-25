import { AvatarComponent as CoreAvatar } from '@orbit-ui/core'
import React from 'react'

export type AvatarProps = React.ComponentPropsWithoutRef<typeof CoreAvatar>

export const Avatar = Object.assign(CoreAvatar, {})
