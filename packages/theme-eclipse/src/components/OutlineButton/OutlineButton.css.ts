import clsx from 'clsx'

export const center = (opts: { size: 'small' | 'medium' | 'large' }) =>
  clsx('inline-block', {
    'px-0.5': opts.size === 'small',
    'px-1': opts.size === 'medium' || opts.size === 'large',
  })
