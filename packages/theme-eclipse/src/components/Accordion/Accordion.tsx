import { Accordion as CoreAccordion } from '@heejun-com/core'
import { forwardRef } from 'react'

import { Typography } from '../Text'

export type AccordionProps = React.ComponentPropsWithoutRef<typeof CoreAccordion>

const AccordionRoot = forwardRef<HTMLDivElement, AccordionProps>((props, forwardedRef) => {
  return <CoreAccordion ref={forwardedRef} {...props} />
})

type AccordionItemProps = React.ComponentPropsWithoutRef<typeof CoreAccordion.Item>

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>((props, forwardedRef) => {
  return (
    <CoreAccordion.Item
      ref={forwardedRef}
      {...props}
      className={`border-b border-b-[var(--sem-color-border-disabled)] ${props.className || ''}`}
    />
  )
})

const AccordionTrigger = forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof CoreAccordion.Trigger>
>((props, forwardedRef) => {
  return (
    <CoreAccordion.Trigger
      ref={forwardedRef}
      {...props}
      className={`hover:no-underline py-4 px-2 ${props.className || ''}`}
    >
      <Typography textStyle="subheadingSmall" className="text-left w-full block">
        {props.children}
      </Typography>
    </CoreAccordion.Trigger>
  )
})

const AccordionContent = forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof CoreAccordion.Content>
>((props, forwardedRef) => {
  return (
    <CoreAccordion.Content
      ref={forwardedRef}
      {...props}
      className={`px-2 ${props.className || ''}`}
    >
      <Typography
        textStyle="descriptionLarge"
        className="text-[var(--sem-color-foreground-secondary)]"
      >
        {props.children}
      </Typography>
    </CoreAccordion.Content>
  )
})

type AccordionComponent = typeof AccordionRoot & {
  Item: typeof AccordionItem
  Trigger: typeof AccordionTrigger
  Content: typeof AccordionContent
}

export const Accordion: AccordionComponent = Object.assign(AccordionRoot, {
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
})
