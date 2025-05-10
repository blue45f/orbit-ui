import { Meta, StoryObj } from '@storybook/react'
import { useReducer } from 'react'

import { Presence } from './Presence'
import * as styles from './Presence.stories.css'

const meta = {
  title: 'utils/Presence',
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
        <button type="button" onClick={togglePresent}>
          토글
        </button>
        <Presence present={present} onChange={onChange}>
          <div className={styles.presentable}>I sense you!</div>
        </Presence>
      </>
    )
  },
}
