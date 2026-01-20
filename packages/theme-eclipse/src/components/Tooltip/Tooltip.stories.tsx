import type { Meta, StoryObj } from '@storybook/react'

import { Tooltip } from './Tooltip'
import { FilledButton as Button } from '../SolidButton'
import { Typography } from '../Text'

const meta = {
  title: 'eclipse/Feedback/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const 기본: Story = {
  render: () => (
    <div style={{ padding: '100px', display: 'flex', justifyContent: 'center' }}>
      <Tooltip.Provider>
        <Tooltip>
          <Tooltip.Trigger asChild>
            <Button color="primary" size="medium">
              <Button.Center>마우스 오버</Button.Center>
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content>
            <Typography textStyle="descriptionLarge" className="text-white">
              도움말 메시지입니다.
            </Typography>
          </Tooltip.Content>
        </Tooltip>
      </Tooltip.Provider>
    </div>
  ),
}
