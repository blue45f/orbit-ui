import { cn } from '../../../styles'
import { toCSSLength } from '../../../libs'

export type SafeAreaInsetProps = {
  of: 'top' | 'bottom'
  inset?: string | number
} & React.HTMLAttributes<HTMLDivElement>

/**
 * Safe Area Inset 컴포넌트
 *
 * @example
 * ```tsx
 * <SafeAreaInset of="top" />
 * <SafeAreaInset of="bottom" />
 * ```
 */
export const SafeAreaInset: React.FC<SafeAreaInsetProps> = ({
  of: position,
  style,
  inset,
  className,
  ...rest
}) => {
  const safeAreaVar = position === 'top' ? 'env(safe-area-inset-top)' : 'env(safe-area-inset-bottom)'
  const heightValue = inset !== undefined ? toCSSLength(inset) : safeAreaVar

  return (
    <div
      {...rest}
      className={cn('flex-shrink-0', className)}
      style={{
        height: heightValue,
        ...style,
      }}
    />
  )
}
