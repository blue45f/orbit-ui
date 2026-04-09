import clsx from 'clsx'

export const container = (opts: { fullWidth?: boolean }) =>
  clsx('inline-flex', {
    flex: opts.fullWidth,
  })

export const radioWrapper = 'shrink-0'

export const label = (opts: { fullWidth?: boolean; disabled?: boolean }) =>
  clsx('inline-block min-h-[24px]', {
    'w-full': opts.fullWidth,
    'opacity-30': opts.disabled,
  })

export const labelText = 'inline-block ml-1 align-middle'
