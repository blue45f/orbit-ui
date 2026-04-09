import clsx from 'clsx'

export const root = 'solid-button-root'

export const center = (opts: { size: 'small' | 'medium' | 'large' }) =>
  clsx('inline-block tracking-tight font-semibold', {
    'px-0.5 text-[13px]': opts.size === 'small',
    'px-1 text-[15px]': opts.size === 'medium',
    'px-1 text-[17px]': opts.size === 'large',
  })
