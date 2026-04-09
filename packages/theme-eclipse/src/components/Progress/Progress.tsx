import * as ProgressPrimitive from '@radix-ui/react-progress'
import React, { forwardRef } from 'react'
import clsx from 'clsx'
import * as styles from './Progress.css'

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
        className={clsx(styles.root({ size }), className)}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={styles.indicator({ color, indeterminate })}
          style={{ 
            transform: indeterminate ? undefined : `translateX(-${100 - (value || 0)}%)` 
          }}
        />
      </ProgressPrimitive.Root>
    )
  }
)

Progress.displayName = 'Progress'
