import * as ProgressPrimitive from '@radix-ui/react-progress'
import React, { forwardRef } from 'react'
import clsx from 'clsx'

const progressRoot = (opts: { size?: 'small' | 'medium' | 'large' }) =>
  clsx(
    'relative rounded-full w-full overflow-hidden',
    '[background-color:var(--sem-eclipse-color-fillSecondary)]',
    {
      'h-1': opts.size === 'small',
      'h-2': opts.size === 'medium' || !opts.size,
      'h-3': opts.size === 'large',
    }
  )

const progressIndicator = (opts: {
  color?: 'primary' | 'success' | 'warning'
  indeterminate?: boolean
}) =>
  clsx(
    'flex-1 transition-transform duration-[600ms] [cubic-bezier(0.65,0,0.35,1)] w-full h-full',
    {
      '[background-color:var(--sem-eclipse-color-systemMainPrimary)]':
        opts.color === 'primary' || !opts.color,
      '[background-color:var(--sem-eclipse-color-systemMainTertiary)]': opts.color === 'success',
      '[background-color:var(--sem-eclipse-color-systemSubPrimary)]': opts.color === 'warning',
      'w-1/2 animate-[progress-indeterminate_1.5s_infinite_linear] motion-reduce:animate-none':
        opts.indeterminate,
    }
  )

export type ProgressProps = React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
  /**
   * 로딩바 크기
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * 로딩바 색상 테마
   * @default 'primary'
   */
  color?: 'primary' | 'success' | 'warning'
  /**
   * 진행률을 알 수 없는 무한 로딩 상태 여부
   * @default false
   */
  indeterminate?: boolean
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, size = 'medium', color = 'primary', indeterminate = false, ...props }, ref) => {
    return (
      <ProgressPrimitive.Root
        ref={ref}
        className={clsx(progressRoot({ size }), className)}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={progressIndicator({ color, indeterminate })}
          style={{ 
            transform: indeterminate ? undefined : `translateX(-${100 - (value || 0)}%)` 
          }}
        />
      </ProgressPrimitive.Root>
    )
  }
)

Progress.displayName = 'Progress'
