import { Meta, StoryObj } from '@storybook/react'

import { Flex } from '../Flex'

import { Animation, LottieProvider } from './Animation'
import animationData from './example.json'

Animation.displayName = 'Animation'

const meta = {
  title: 'Utils/Animation',
  component: Animation,
  decorators: [
    (Story) => (
      <LottieProvider>
        <Story />
      </LottieProvider>
    ),
  ],
  args: {
    autoplay: true,
    loop: true,
    name: '',
    animationData,
  },
  argTypes: {
    onAnimationLoad: { action: 'animation loaded' },
  },
} satisfies Meta<typeof Animation>

type Story = StoryObj<typeof meta>

export default meta

export const 기본 = {
  render: (args) => <Animation {...args} />,
} satisfies Story

export const 성능_테스트 = {
  render: function Perf(args) {
    const count = 10

    return (
      <>
        <Flex flexWrap="wrap" justifyContent="center">
          {Array.from({ length: count }).map((_, index) => (
            <div key={index} style={{ width: '30%' }}>
              <Animation {...args} />
            </div>
          ))}
        </Flex>
      </>
    )
  },
} satisfies Story
