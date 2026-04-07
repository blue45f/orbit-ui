import type { Meta, StoryObj } from '@storybook/react'

import { AlertDialog } from './AlertDialog'
import { Button } from '../Button'

const meta = {
  title: 'core/Uncategorized/AlertDialog',
  component: AlertDialog,
  tags: ['autodocs'],
  args: {
    defaultOpen: false,
  },
} satisfies Meta<typeof AlertDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <AlertDialog {...args}>
      <AlertDialog.Trigger asChild>
        <Button>Open Dialog</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
          <AlertDialog.Description>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel asChild>
            <Button>Cancel</Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <Button>Continue</Button>
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  ),
}
