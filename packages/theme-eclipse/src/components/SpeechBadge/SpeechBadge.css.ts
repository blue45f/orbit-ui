import clsx from 'clsx'

export const tail = (opts: {
  color: 'pink' | 'blue'
  position: 'leading' | 'trailing'
}) =>
  clsx('absolute w-[9px] h-[5px]', {
    '[color:var(--com-eclipse-bubbleBadge-fillColor-color-pink)]': opts.color === 'pink',
    '[color:var(--com-eclipse-bubbleBadge-fillColor-color-blue)]': opts.color === 'blue',
    'bottom-0 left-[7.7px] scale-x-[-1]': opts.position === 'leading',
    'right-[7.7px] bottom-0': opts.position === 'trailing',
  })
