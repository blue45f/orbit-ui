import * as React from 'react'
import { DayPicker } from 'react-day-picker'
import { ChevronLeftLineIcon, ChevronRightLineIcon } from '@heejun-com/icons'

import { cn } from '../../styles'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

const FOCUS_RING =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--sem-base-focus-ring-color)] focus-visible:outline-offset-2'

/**
 * Calendar - react-day-picker 기반 날짜 선택 컴포넌트
 *
 * 접근성:
 * - 시맨틱 색상 토큰(fill/foreground/border) 사용으로 라이트·다크 모드 자동 적응
 * - nav 버튼에 aria-label 명시 (이전/다음 달)
 * - focus-visible 링은 새 focus 토큰 사용
 * - prefers-reduced-motion 자동 적용 (글로벌 미디어쿼리)
 *
 * react-day-picker 가 day 셀에 자동으로 aria-label("Choose Wednesday, April 21st")을
 * 붙여 주므로 추가 처리는 필요 없다.
 */
function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium text-foreground-primary',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          'h-7 w-7 bg-transparent p-0 opacity-60 hover:opacity-100 flex items-center justify-center',
          'rounded-md border border-border-secondary text-foreground-secondary',
          'transition-opacity',
          FOCUS_RING
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell: 'text-foreground-tertiary rounded-md w-9 font-normal text-[0.8rem]',
        row: 'flex w-full mt-2',
        cell: cn(
          'h-9 w-9 text-center text-sm p-0 relative',
          '[&:has([aria-selected].day-range-end)]:rounded-r-md',
          '[&:has([aria-selected].day-outside)]:bg-fill-primary',
          '[&:has([aria-selected])]:bg-fill-primary',
          'first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md',
          'focus-within:relative focus-within:z-20'
        ),
        day: cn(
          'h-9 w-9 p-0 font-normal text-foreground-primary aria-selected:opacity-100',
          'rounded-md hover:bg-fill-secondary transition-colors',
          FOCUS_RING
        ),
        day_range_end: 'day-range-end',
        day_selected: cn(
          'bg-foreground-primary text-foreground-inverted',
          'hover:bg-foreground-primary hover:text-foreground-inverted',
          'focus:bg-foreground-primary focus:text-foreground-inverted'
        ),
        day_today: 'bg-fill-secondary text-foreground-primary font-semibold',
        day_outside: cn(
          'day-outside text-foreground-tertiary',
          'aria-selected:bg-fill-primary aria-selected:text-foreground-tertiary aria-selected:opacity-30'
        ),
        day_disabled: 'text-foreground-quaternary opacity-50',
        day_range_middle: 'aria-selected:bg-fill-secondary aria-selected:text-foreground-primary',
        day_hidden: 'invisible',
        ...classNames,
      }}
      labels={{
        labelPrevious: () => '이전 달',
        labelNext: () => '다음 달',
        ...props.labels,
      }}
      components={{
        Chevron: ({ orientation }) => {
          const Icon = orientation === 'left' ? ChevronLeftLineIcon : ChevronRightLineIcon
          return <Icon className="h-4 w-4" aria-hidden="true" />
        },
      }}
      {...props}
    />
  )
}
Calendar.displayName = 'Calendar'

export { Calendar }
