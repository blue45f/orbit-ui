import React from 'react'
import clsx from 'clsx'

const SKELETON_CLASS =
  'rounded-lg [background-color:var(--sem-eclipse-color-fillSecondary)] w-full min-h-[1rem] animate-[skeleton-pulse_1.5s_ease-in-out_infinite] motion-reduce:animate-none'

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement> & {
  width?: string | number
  height?: string | number
}

/**
 * 시각적 placeholder 박스. 펄스 애니메이션 + `prefers-reduced-motion` 자동 정지.
 *
 * 기본적으로 `aria-hidden='true'`가 적용됩니다 — 스크린리더에게 의미 없는 placeholder를
 * 반복해서 읽지 않게 하기 위함. 로딩 안내가 필요하면 부모 컨테이너에서 `role='status'`나
 * `Loading` 컴포넌트로 한 번만 알립니다. `aria-hidden`을 명시적으로 `false` 또는 다른 값으로
 * 덮어쓸 수 있습니다.
 */
export const Skeleton = ({ className, style, width, height, ...props }: SkeletonProps) => {
  return (
    <div
      aria-hidden="true"
      {...props}
      className={clsx(SKELETON_CLASS, className)}
      style={{
        width: width ?? style?.width,
        height: height ?? style?.height,
        ...style,
      }}
    />
  )
}
