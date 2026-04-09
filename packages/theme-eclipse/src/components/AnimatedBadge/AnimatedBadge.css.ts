import clsx from 'clsx'

export const slotLeading = (opts: { size?: 'small' | 'large' }) =>
  clsx({
    'w-2.5 h-2.5': opts.size === 'small',
    'w-3.5 h-3.5': opts.size === 'large' || !opts.size,
  })
