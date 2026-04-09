import { Meta, StoryObj } from '@storybook/react'
import { useReducer } from 'react'

import { Presence } from './Presence'


const meta = {
  title: 'Utils/Presence',
  component: Presence,
  tags: ['autodocs'],
} satisfies Meta<typeof Presence>

export default meta

export const 예제: StoryObj<Meta> = {
  argTypes: {
    onChange: { action: 'changed' },
  },
  render: ({ onChange }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [present, togglePresent] = useReducer((v) => !v, false)

    return (
      <>
        <button type="button" onClick={togglePresent} style={{
          padding: '8px 16px', borderRadius: '8px', border: '1px solid #d1d5db',
          background: '#ffffff', fontSize: '14px', fontWeight: '500', cursor: 'pointer',
        }}>
          토글
        </button>
        <Presence present={present} onChange={onChange}>
          <div style={{ padding: "20px", background: "#f5f5f5", borderRadius: "8px" }}>I sense you!</div>
        </Presence>
      </>
    )
  },
}
