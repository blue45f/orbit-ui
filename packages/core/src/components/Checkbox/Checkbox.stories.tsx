import { CheckIcon, MinusIcon } from '@ui-forge/icons'
import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { Checkbox, CheckboxProps } from './Checkbox'

Checkbox.displayName = 'Checkbox'
Checkbox.Icon.displayName = 'Checkbox.Icon'

const meta = {
  title: 'foundation/Checkbox',
  component: Checkbox,
  args: {
    width: 22,
    height: 22,
    borderWidth: 1,
    disabled: false,
    children: '',
  },
  argTypes: {
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof Checkbox>

type Story = StoryObj<typeof meta>

export default meta

const normalTheme: CheckboxProps['theme'] = {
  enabledCheckedFillColor: '#7D68FF',
  enabledUncheckedFillColor: 'rgba(0, 0, 0, 0)',
  disabledCheckedFillColor: '#DCDAFF',
  disabledUncheckedFillColor: 'rgba(0, 0, 0, 0)',
  enabledCheckedBorderColor: '#7D68FF',
  enabledUncheckedBorderColor: '#4B4D4F',
  disabledCheckedBorderColor: '#DCDAFF',
  disabledUncheckedBorderColor: '#E4E6E8',
  focusedCheckedBorderColor: 'rgba(0, 0, 0, 0.38)',
  focusedUncheckedBorderColor: '#7D68FF',
  hoveredFillColor: 'rgba(0, 0, 0, 0.04)',
  pressedFillColor: 'rgba(0, 0, 0, 0.08)',
  radius: '8px',
  enabledCheckedForegroundColor: 'white',
  enabledUncheckedForegroundColor: 'rgba(255, 255, 255, 0)',
  disabledCheckedForegroundColor: 'white',
  disabledUncheckedForegroundColor: 'rgba(255, 255, 255, 0)',
}

export const 제어 = {
  render: function Controlled({ onChange, ...rest }) {
    const [checked, setChecked] = useState(false)

    return (
      <Checkbox
        {...rest}
        theme={normalTheme}
        checked={checked}
        onChange={(e) => {
          onChange?.(e)
          setChecked(e.target.checked)
        }}
      >
        <Checkbox.Icon>
          <CheckIcon size={rest.width} />
        </Checkbox.Icon>
      </Checkbox>
    )
  },
} satisfies Story

export const 비제어 = {
  render: function Uncontrolled({ onChange, ...rest }) {
    return (
      <Checkbox {...rest} theme={normalTheme} onChange={onChange}>
        <Checkbox.Icon>
          <CheckIcon size={rest.width} />
        </Checkbox.Icon>
      </Checkbox>
    )
  },
} satisfies Story

export const Indeterminate = {
  render: function Indeterminate({ onChange, ...rest }) {
    return (
      <Checkbox {...rest} theme={normalTheme} onChange={onChange}>
        <Checkbox.Icon>
          <MinusIcon size={rest.width} />
        </Checkbox.Icon>
      </Checkbox>
    )
  },
} satisfies Story

const errorTheme: CheckboxProps['theme'] = {
  enabledCheckedFillColor: '#FF403E',
  enabledUncheckedFillColor: 'F3F5F7',
  disabledCheckedFillColor: '#FFD1D3',
  disabledUncheckedFillColor: 'rgba(0, 0, 0, 0)',
  enabledCheckedBorderColor: '#FF403E',
  enabledUncheckedBorderColor: '#FF403E',
  disabledCheckedBorderColor: '#FF8B8D',
  disabledUncheckedBorderColor: '#FF8B8D',
  focusedCheckedBorderColor: 'rgba(0, 0, 0, 0.38)',
  focusedUncheckedBorderColor: '#922524',
  hoveredFillColor: 'rgba(0, 0, 0, 0.04)',
  pressedFillColor: 'rgba(0, 0, 0, 0.08)',
  radius: '8px',
  enabledCheckedForegroundColor: 'white',
  enabledUncheckedForegroundColor: 'rgba(255, 255, 255, 0)',
  disabledCheckedForegroundColor: 'white',
  disabledUncheckedForegroundColor: 'rgba(255, 255, 255, 0)',
}

export const 오류 = {
  render: function Error({ onChange, ...rest }) {
    return (
      <Checkbox {...rest} theme={errorTheme} onChange={onChange}>
        <Checkbox.Icon>
          <CheckIcon size={rest.width} />
        </Checkbox.Icon>
      </Checkbox>
    )
  },
} satisfies Story

export const 아이콘크기 = {
  args: {
    iconSize: 18,
  },
  // eslint-disable-next-line
  render: function IconSize({ iconSize, ...rest }: any) {
    return (
      <Checkbox {...rest} theme={normalTheme}>
        <Checkbox.Icon>
          <CheckIcon size={iconSize} />
        </Checkbox.Icon>
      </Checkbox>
    )
  },
}
