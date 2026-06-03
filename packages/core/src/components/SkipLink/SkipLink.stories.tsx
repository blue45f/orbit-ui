import { Meta, StoryObj } from '@storybook/react'

import { SkipLink } from './SkipLink'

const meta = {
  title: 'foundation/SkipLink',
  component: SkipLink,
  args: {
    targetId: 'main',
    children: '본문 바로가기',
  },
  parameters: {
    docs: {
      description: {
        component:
          'Tab 키를 누르면 좌상단에 "본문 바로가기" 링크가 나타나요. 평소에는 화면 밖에 숨겨져 있어요.',
      },
    },
  },
} satisfies Meta<typeof SkipLink>

type Story = StoryObj<typeof meta>

export default meta

export const 기본: Story = {
  render: (args) => (
    <div>
      <SkipLink {...args} />
      <nav style={{ padding: 12, background: '#f6f6f6' }}>
        <p style={{ margin: 0 }}>여기에 포커스를 두고 Tab 을 눌러보세요 (내비게이션 영역)</p>
      </nav>
      <main
        id="main"
        tabIndex={-1}
        style={{ padding: 24, minHeight: 160, border: '1px dashed #c0c0c0', marginTop: 12 }}
      >
        <h2 style={{ marginTop: 0 }}>본문 영역</h2>
        <p>링크를 클릭하면 이 영역으로 포커스가 이동해요.</p>
      </main>
    </div>
  ),
}
