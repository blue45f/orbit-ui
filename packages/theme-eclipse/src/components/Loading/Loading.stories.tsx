import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Loading } from './Loading'

const meta = {
  title: 'eclipse/Feedback/Loading',
  component: Loading,
  tags: ['autodocs'],
} satisfies Meta<typeof Loading>

export default meta
type Story = StoryObj<typeof meta>

export const 기본: Story = {
  render: () => <Loading>데이터를 불러오는 중입니다...</Loading>,
}

export const 크기별: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <Loading size="small" />
      <Loading size="medium" />
      <Loading size="large" />
    </div>
  ),
}

export const 전체화면: Story = {
  render: function Render() {
    const [isLoading, setIsLoading] = React.useState(false)

    return (
      <div>
        <button
          className="rounded-md bg-slate-900 px-4 py-2 text-white dark:bg-slate-50 dark:text-slate-900"
          onClick={() => {
            setIsLoading(true)
            setTimeout(() => setIsLoading(false), 3000)
          }}
        >
          전체화면 로딩 시작 (3초)
        </button>
        {isLoading && <Loading fullScreen>시스템 초기화 중...</Loading>}
      </div>
    )
  },
}
