import type { Meta, StoryObj } from '@storybook/react'

import { Breadcrumb } from './Breadcrumb'
import { ChevronRightLineIcon } from '@orbit-ui/icons'

const meta = {
  title: 'eclipse/5. Navigation/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
} satisfies Meta<typeof Breadcrumb>

export default meta
type Story = StoryObj<typeof meta>

export const 기본: Story = {
  render: () => (
    <Breadcrumb>
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/">홈</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator>
          <ChevronRightLineIcon />
        </Breadcrumb.Separator>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/components">컴포넌트</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator>
          <ChevronRightLineIcon />
        </Breadcrumb.Separator>
        <Breadcrumb.Item>
          <Breadcrumb.Page>브레드크럼</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb>
  ),
}
