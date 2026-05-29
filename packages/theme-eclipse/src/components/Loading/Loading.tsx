import { Spinner } from '@heejun-com/core'
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
   * 로딩 메시지 (스크린리더에도 함께 안내됩니다).
   */
  children?: React.ReactNode
  /**
   * 시각 라벨이 없을 때 스크린리더에 안내될 접근성 이름.
   * children이 있으면 children이 우선합니다.
   * @defaultValue '불러오는 중'
   */
  'aria-label'?: string
  /**
   * 라벨 텍스트가 별도 노드에 있을 때 그 id를 지정합니다.
   */
  'aria-labelledby'?: string
}

export const Loading = ({
  size = 'medium',
  fullScreen = false,
  className,
  children,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
}: LoadingProps) => {
  const spinnerSize = size === 'small' ? 24 : size === 'large' ? 48 : 32

  const containerClasses = cn(
    'flex flex-col items-center justify-center gap-3',
    fullScreen && 'fixed inset-0 z-[9999] bg-white/80 dark:bg-slate-950/80',
    className
  )

  // aria-label fallback only when no visible label is provided and no
  // external label is referenced; redundant labels confuse screen readers.
  const effectiveLabel = children || ariaLabelledBy ? undefined : ariaLabel ?? '불러오는 중'

  return (
    <div
      className={containerClasses}
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={effectiveLabel}
      aria-labelledby={ariaLabelledBy}
    >
      <Spinner size={spinnerSize} color="primary" />
      {children && (
        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{children}</span>
      )}
    </div>
  )
}
