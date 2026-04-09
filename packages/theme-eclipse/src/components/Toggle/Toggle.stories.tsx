import { Meta } from '@storybook/react'

import { Toggle } from './Toggle'

Toggle.displayName = 'Toggle'

const meta = {
  title: 'eclipse/2. Inputs/Selection/Toggle',
  component: Toggle,
  args: {},
  argTypes: {
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof Toggle>

export default meta

export const 디자인_QA = {
  // eslint-disable-next-line
  render: (args: any) => {
    return (
      <>
        <label htmlFor="basic" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Toggle id="basic" />
          기본
        </label>

        <br />

        <label htmlFor="custom" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Toggle id="custom" theme={{ enabledOnFillColor: 'red' }} />
          커스텀
        </label>
      </>
    )
  },
}
