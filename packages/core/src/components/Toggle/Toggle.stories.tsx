import { Meta } from '@storybook/react'
import { ReactElement, useState } from 'react'

import { Flex } from '../primitives'

import { Toggle, ToggleProps } from './Toggle'

Toggle.displayName = 'Toggle'
Toggle.Thumb.displayName = 'Toggle.Thumb'

const meta = {
  title: 'foundation/Toggle',
  component: Toggle,
  args: {
    borderWidth: 1,
  },
  argTypes: {
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof Toggle>

export default meta

export const 제어 = {
  args: {
    width: 40,
    height: 24,
    thumbWidth: 20,
    thumbHeight: 20,
  },

  render: (args: { thumbWidth: number; thumbHeight: number } & ToggleProps): ReactElement => {
    const { onChange, thumbWidth, thumbHeight, ...rest } = args
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [checked, setChecked] = useState(false)

    return (
      <Toggle
        {...rest}
        theme={blueTheme}
        onChange={(e) => {
          onChange?.(e)
          setChecked(e.target.checked)
        }}
        checked={checked}
      >
        <Toggle.Thumb width={thumbWidth} height={thumbHeight} />
      </Toggle>
    )
  },
}

export const 비제어 = {
  args: {
    width: 40,
    height: 24,
    thumbWidth: 20,
    thumbHeight: 20,
    defaultChecked: false,
  },

  render: (args: { thumbWidth: number; thumbHeight: number } & ToggleProps): ReactElement => {
    const { onChange, thumbWidth, thumbHeight, ...rest } = args

    return (
      <Toggle {...rest} theme={blueTheme} onChange={onChange}>
        <Toggle.Thumb width={thumbWidth} height={thumbHeight} />
      </Toggle>
    )
  },
}

export const 디자인QA = {
  args: {
    width: 30,
    height: 16,
    borderWidth: 3,
    thumbWidth: 10,
    thumbHeight: 10,
  },
  // eslint-disable-next-line
  render: ({ thumbWidth, thumbHeight, ...args }: any) => {
    return (
      <Flex flexDirection={'column'} rowGap="20px">
        <label htmlFor="primary">
          민트
          <Toggle
            id="primary"
            theme={mintTheme}
            width={38}
            height={24}
            borderWidth={1}
            onChange={args.onChange}
          >
            <Toggle.Thumb
              style={{ transition: `transform 300ms ease-out` }}
              width={18}
              height={18}
            />
          </Toggle>
        </label>

        <label htmlFor="blue">
          블루
          <Toggle
            id="blue"
            theme={blueTheme}
            width={40}
            height={24}
            borderWidth={1}
            onChange={args.onChange}
          >
            <Toggle.Thumb
              style={{ transition: `transform 300ms ease-out` }}
              width={20}
              height={20}
            />
          </Toggle>
        </label>

        <label htmlFor="custom">
          커스텀
          <Toggle {...args} id="custom" theme={customTheme} onChange={args.onChange}>
            <Toggle.Thumb style={{ transition: 'none' }} width={thumbWidth} height={thumbHeight} />
          </Toggle>
        </label>
      </Flex>
    )
  },
}

const FILL = {
  SECONDARY: '#F3F5F7', // GRAY1
  TERTIARY: '#E4E6E8', // GRAY2
  QUATERNARY: '#D5D7D9', // GRAY3
}

const mintTheme: ToggleProps['theme'] = {
  enabledOnFillColor: '#2AC1BC',
  enabledOffFillColor: FILL.QUATERNARY,
  disabledOnFillColor: '#2AC1BC',
  disabledOffFillColor: FILL.QUATERNARY,
  enabledOnBorderColor: 'rgba(0, 0, 0, 0)',
  enabledOffBorderColor: 'rgba(0, 0, 0, 0)',
  disabledOnBorderColor: 'rgba(0, 0, 0, 0)',
  disabledOffBorderColor: 'rgba(0, 0, 0, 0)',
  focusedOnBorderColor: 'rgba(0, 0, 0, 0.38)',
  focusedOffBorderColor: '#2AC1BC',
  radius: '9999px',

  // ================ State ================
  hoveredFillColor: 'rgba(0, 0, 0, 0.04)',
  pressedFillColor: 'rgba(0, 0, 0, 0.08)',

  // ================ Shape ================
  enabledOnForegroundColor: 'white',
  enabledOffForegroundColor: 'white',
  disabledOnForegroundColor: 'white',
  disabledOffForegroundColor: 'white',
}

const blueTheme: ToggleProps['theme'] = {
  // ================ Container ================

  enabledOnFillColor: '#1A7CFF',
  enabledOffFillColor: FILL.TERTIARY,
  disabledOnFillColor: '#1A7CFF',
  disabledOffFillColor: FILL.TERTIARY,
  enabledOnBorderColor: 'rgba(0, 0, 0, 0)',
  enabledOffBorderColor: 'rgba(0, 0, 0, 0)',
  disabledOnBorderColor: 'rgba(0, 0, 0, 0)',
  disabledOffBorderColor: 'rgba(0, 0, 0, 0)',
  focusedOnBorderColor: 'rgba(0, 0, 0, 0.38)',
  focusedOffBorderColor: '#1A7CFF',
  radius: '9999px',

  // ================ State ================
  hoveredFillColor: 'rgba(0, 0, 0, 0.04)',
  pressedFillColor: 'rgba(0, 0, 0, 0.08)',

  // ================ Shape ================
  enabledOnForegroundColor: 'white',
  enabledOffForegroundColor: 'white',
  disabledOnForegroundColor: 'white',
  disabledOffForegroundColor: 'white',
}

const customTheme: ToggleProps['theme'] = {
  // ================ Container ================
  enabledOnFillColor: '#AAFFAA',
  enabledOffFillColor: '#D5D7D9',
  disabledOnFillColor: '#AAFFAA',
  disabledOffFillColor: '#D5D7D9',
  radius: '9999px',

  // ================ State ================
  hoveredFillColor: 'rgba(0, 0, 0, 0.04)',
  pressedFillColor: 'rgba(0, 0, 0, 0.08)',

  // ================ Shape ================
  enabledOnForegroundColor: 'black',
  enabledOffForegroundColor: 'black',
  disabledOnForegroundColor: 'black',
  disabledOffForegroundColor: 'black',
}
