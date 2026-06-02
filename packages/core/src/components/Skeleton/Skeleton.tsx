import { cn } from '../../styles'

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-[var(--sem-eclipse-color-fillSecondary)] motion-reduce:animate-none',
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
