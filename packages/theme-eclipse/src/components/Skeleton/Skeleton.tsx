import React from 'react'
import clsx from 'clsx'

const SKELETON_CLASS =
  'rounded-lg [background-color:var(--sem-eclipse-color-fillSecondary)] w-full min-h-[1rem] animate-[skeleton-pulse_1.5s_ease-in-out_infinite] motion-reduce:animate-none'

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement> & {
  width?: string | number
  height?: string | number
}

export const Skeleton = ({ className, style, width, height, ...props }: SkeletonProps) => {
  return (
    <div
      className={clsx(SKELETON_CLASS, className)}
      style={{
        width: width ?? style?.width,
        height: height ?? style?.height,
        ...style,
      }}
      {...props}
    />
  )
}
