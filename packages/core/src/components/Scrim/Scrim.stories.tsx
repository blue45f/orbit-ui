import { CheckIcon } from '@prism-ui/icons'
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { Button } from '../Button'
import { Checkbox } from '../Checkbox'
import { Flex } from '../primitives'

import { Scrim } from './Scrim'
import * as storyStyles from './Scrim.stories.css'

const meta = {
  title: 'foundation/Scrim',
  component: Scrim,
  tags: ['autodocs'],
  argTypes: {
    isPresented: {
      control: 'boolean',
    },
    width: {
      control: 'text',
    },
    height: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Scrim>

export default meta
type Story = StoryObj<typeof meta>

export const 기본: Story = {
  render: (args) => <Scrim {...args} defaultIsPresented={true} className={storyStyles.animatedScrim} />,
}

export const 제어: Story = {
  render: function Uncontrolled(args) {
    const [isPresented, setIsPresented] = useState(false)
    const [isClickable, setIsClickable] = useState(false)

    const handleClick = () => {
      setIsPresented(false)
    }

    return (
      <Flex flexDirection='column' rowGap='10px'>
        <Flex columnGap='5px' alignItems='center'>
          <Button onClick={() => setIsPresented(true)}>Scrim 열기</Button> (
          <Flex columnGap='5px' alignItems='center'>
            <label htmlFor='checkbox'>Scrim 클릭 가능 여부</label>
            <Checkbox
              id='checkbox'
              theme={{
                focusedCheckedForegroundColor: 'black',
                focusedUncheckedForegroundColor: 'black',
                enabledCheckedForegroundColor: 'black',
                enabledUncheckedForegroundColor: 'black',
                disabledCheckedForegroundColor: 'black',
                disabledUncheckedForegroundColor: 'black',
                hoveredCheckedForegroundColor: 'black',
                hoveredUncheckedForegroundColor: 'black',
                pressedCheckedForegroundColor: 'black',
                pressedUncheckedForegroundColor: 'black',
              }}
              onClick={() => setIsClickable(!isClickable)}
            >
              <Checkbox.Icon>
                <CheckIcon size={22} />
              </Checkbox.Icon>
            </Checkbox>
          </Flex>
          )
        </Flex>
        <Scrim
          {...args}
          isPresented={isPresented}
          className={storyStyles.animatedScrim}
          onClick={isClickable ? handleClick : undefined}
        />
      </Flex>
    )
  },
}
