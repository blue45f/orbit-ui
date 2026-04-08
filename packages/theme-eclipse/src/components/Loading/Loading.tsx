import { Spinner } from '@orbit-ui/core'
import React from 'react'
import { cn } from '../../styles'

export type LoadingProps = {
  /**
   * 로딩 인디케이터의 크기
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * 전체 화면 오버레이 여부
   * @default false
   */
  fullScreen?: boolean
  /**
   * 추가 클래스명
   */
  className?: string
  /**
   * 로딩 메시지
   */
  children?: React.ReactNode
}

export const Loading = ({
  size = 'medium',
  fullScreen = false,
  className,
  children,
}: LoadingProps) => {
  const spinnerSize = size === 'small' ? 24 : size === 'large' ? 48 : 32

  const containerClasses = cn(
    'flex flex-col items-center justify-center gap-3',
    fullScreen && 'fixed inset-0 z-[9999] bg-white/80 backdrop-blur-sm dark:bg-slate-950/80',
    className
  )

  return (
    <div className={containerClasses}>
      <Spinner size={spinnerSize} color="primary" />
      {children && (
        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{children}</span>
      )}
    </div>
  )
}
