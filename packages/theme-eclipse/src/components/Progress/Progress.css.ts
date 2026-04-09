import clsx from 'clsx'

export const root = (opts: { size?: 'small' | 'medium' | 'large' }) =>
  clsx(
    'relative rounded-full w-full overflow-hidden',
    '[background-color:var(--sem-eclipse-color-fillSecondary)]',
    {
      'h-1': opts.size === 'small',
      'h-2': opts.size === 'medium' || !opts.size,
      'h-3': opts.size === 'large',
    }
  )

export const indicator = (opts: {
  color?: 'primary' | 'success' | 'warning'
  indeterminate?: boolean
}) =>
  clsx('flex-1 transition-transform duration-[600ms] [cubic-bezier(0.65,0,0.35,1)] w-full h-full', {
    '[background-color:var(--sem-eclipse-color-systemMainPrimary)]':
      opts.color === 'primary' || !opts.color,
    '[background-color:var(--sem-eclipse-color-systemMainTertiary)]': opts.color === 'success',
    '[background-color:var(--sem-eclipse-color-systemSubPrimary)]': opts.color === 'warning',
    'w-1/2 animate-[progress-indeterminate_1.5s_infinite_linear]': opts.indeterminate,
  })
