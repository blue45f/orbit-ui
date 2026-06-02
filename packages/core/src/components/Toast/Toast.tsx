import * as React from 'react'
import { Toaster as SonnerToaster, toast } from 'sonner'

type ToasterProps = React.ComponentProps<typeof SonnerToaster>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <SonnerToaster
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-[var(--sem-eclipse-color-surfaceContainer)] group-[.toaster]:text-[var(--sem-eclipse-color-foregroundPrimary)] group-[.toaster]:border-[var(--sem-eclipse-color-borderTertiary)] group-[.toaster]:shadow-[var(--sem-eclipse-shadow-level2)]',
          description: 'group-[.toast]:text-[var(--sem-eclipse-color-foregroundSecondary)]',
          actionButton:
            'group-[.toast]:bg-[var(--sem-eclipse-color-foregroundPrimary)] group-[.toast]:text-[var(--sem-eclipse-color-foregroundInverted)]',
          cancelButton:
            'group-[.toast]:bg-[var(--sem-eclipse-color-fillSecondary)] group-[.toast]:text-[var(--sem-eclipse-color-foregroundSecondary)]',
        },
      }}
      {...props}
    />
  )
}

export { Toaster, toast }
