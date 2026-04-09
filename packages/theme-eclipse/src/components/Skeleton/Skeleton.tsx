import React from 'react'
import clsx from 'clsx'
import * as styles from './Skeleton.css'

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement> & {
  width?: string | number
  height?: string | number
}

export const Skeleton = ({ className, style, width, height, ...props }: SkeletonProps) => {
  return (
    <div
      className={clsx(styles.skeleton, className)}
      style={{
        width: width ?? style?.width,
        height: height ?? style?.height,
        ...style,
      }}
      {...props}
    />
  )
}
