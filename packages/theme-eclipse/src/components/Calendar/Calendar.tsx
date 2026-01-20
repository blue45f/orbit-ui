import { Calendar as CoreCalendar } from '@orbit-ui/core'

export type CalendarProps = React.ComponentPropsWithoutRef<typeof CoreCalendar>

export const Calendar = (props: CalendarProps) => {
  return (
    <CoreCalendar
      {...props}
      classNames={{
        day_selected:
          'bg-[var(--sem-color-fill-primary)] text-white hover:bg-[var(--sem-color-fill-primary)] hover:text-white',
        ...props.classNames,
      }}
    />
  )
}
