import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { RouteAnnouncer } from './RouteAnnouncer'

const meta = {
  title: 'foundation/RouteAnnouncer',
  component: RouteAnnouncer,
  parameters: {
    docs: {
      description: {
        component:
          'SPA 라우트 변경을 스크린 리더에 알리는 polite aria-live 영역이에요. 라우터에 의존하지 않으며, 제어형(message) 또는 자체 관리형(location/label/focusTargetId)으로 쓸 수 있어요.',
      },
    },
  },
} satisfies Meta<typeof RouteAnnouncer>

type Story = StoryObj<typeof meta>

export default meta

const PAGES = ['홈', '소개', '문의'] as const

export const 자체관리형: Story = {
  // render 가 자체적으로 location/label 을 관리하므로 args 는 사용되지 않지만,
  // RouteAnnouncerProps 가 유니온이라 Story 타입상 args 가 필요해 자체관리형 분기를 만족시킨다.
  args: {
    location: '/홈',
    label: '홈 페이지로 이동했어요',
    focusTargetId: 'main',
  },
  render: function Managed() {
    const [index, setIndex] = useState(0)
    const page = PAGES[index]

    return (
      <div>
        <p>버튼으로 라우트를 바꾸면 보이지 않는 라이브 영역에 안내 문구가 채워져요.</p>
        <nav style={{ display: 'flex', gap: 8 }}>
          {PAGES.map((label, i) => (
            <button
              key={label}
              type="button"
              onClick={() => setIndex(i)}
              aria-current={i === index ? 'page' : undefined}
              style={{
                padding: '6px 12px',
                borderRadius: 8,
                border: '1px solid #d0d0d0',
                background: i === index ? '#111' : '#fff',
                color: i === index ? '#fff' : '#111',
              }}
            >
              {label}
            </button>
          ))}
        </nav>

        <main id="main" tabIndex={-1} style={{ marginTop: 16 }}>
          <h2>{page} 페이지</h2>
        </main>

        {/* location 이 바뀌면(=page) 안내가 발생하고 #main 으로 포커스가 이동해요 */}
        <RouteAnnouncer
          location={`/${page}`}
          label={`${page} 페이지로 이동했어요`}
          focusTargetId="main"
        />
      </div>
    )
  },
}

export const 제어형: Story = {
  args: {
    message: '홈 페이지로 이동했어요',
  },
  render: (args) => (
    <div>
      <p>
        아래에 보이지 않는 status 영역이 있어요. 안내 문구:{' '}
        <code>{'message' in args ? args.message : ''}</code>
      </p>
      <RouteAnnouncer {...args} />
    </div>
  ),
}
