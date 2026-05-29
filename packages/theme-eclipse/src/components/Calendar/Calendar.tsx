import { Calendar as CoreCalendar } from '@heejun-com/core'

export type CalendarProps = React.ComponentPropsWithoutRef<typeof CoreCalendar>

export const Calendar = (props: CalendarProps) => {
  return (
    <CoreCalendar
      {...props}
      classNames={{
        selected:
          'bg-[var(--sem-eclipse-color-fillPrimary)] text-white hover:bg-[var(--sem-eclipse-color-fillPrimary)] hover:text-white',
        ...props.classNames,
      }}
    />
  )
}
