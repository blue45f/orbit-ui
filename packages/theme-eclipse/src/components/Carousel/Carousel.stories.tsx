import type { Meta, StoryObj } from '@storybook/react'

import { Carousel } from './Carousel'

const meta = {
  title: 'eclipse/Data Display/Carousel',
  component: Carousel,
  tags: ['autodocs'],
} satisfies Meta<typeof Carousel>

export default meta
type Story = StoryObj<typeof meta>

export const 기본: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
      <Carousel className="w-full max-w-xs">
        <Carousel.Content>
          {Array.from({ length: 5 }).map((_, index) => (
            <Carousel.Item key={index}>
              <div className="p-1">
                <div className="flex aspect-square items-center justify-center rounded-2xl bg-slate-100 p-6 dark:bg-slate-800">
                  <span className="text-4xl font-semibold text-slate-900 dark:text-slate-50">
                    {index + 1}
                  </span>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel.Content>
        <Carousel.Previous />
        <Carousel.Next />
      </Carousel>
    </div>
  ),
}
