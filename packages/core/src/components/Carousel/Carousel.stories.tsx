import type { Meta, StoryObj } from '@storybook/react'

import { Carousel } from './Carousel'

const meta = {
  title: 'core/Data Display/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Carousel>

export default meta
type Story = StoryObj<typeof meta>

const slides = ['1', '2', '3', '4', '5']

const Slide = ({ label }: { label: string }) => (
  <div
    style={{
      display: 'flex',
      aspectRatio: '1 / 1',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 12,
      fontSize: 32,
      fontWeight: 600,
      background: 'var(--sem-eclipse-color-fillSecondary)',
      color: 'var(--sem-eclipse-color-foregroundPrimary)',
    }}
  >
    {label}
  </div>
)

export const Default: Story = {
  render: () => (
    <Carousel className="w-full max-w-xs" aria-label="기본 캐러셀">
      <Carousel.Content>
        {slides.map((label) => (
          <Carousel.Item key={label}>
            <Slide label={label} />
          </Carousel.Item>
        ))}
      </Carousel.Content>
      <Carousel.Previous />
      <Carousel.Next />
    </Carousel>
  ),
}

export const WithAutoPlay: Story = {
  render: () => (
    <Carousel className="w-full max-w-xs" autoPlay aria-label="자동 재생 캐러셀">
      <Carousel.Content>
        {slides.map((label) => (
          <Carousel.Item key={label}>
            <Slide label={label} />
          </Carousel.Item>
        ))}
      </Carousel.Content>
      <Carousel.Previous />
      <Carousel.Next />
      <Carousel.PlayToggle />
    </Carousel>
  ),
}
