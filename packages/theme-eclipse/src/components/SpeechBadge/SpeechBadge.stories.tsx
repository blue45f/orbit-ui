import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { SpeechBadge } from './SpeechBadge'

SpeechBadge.displayName = 'SpeechBadge'

const meta = {
  title: 'eclipse/Data Display/SpeechBadge',
  component: SpeechBadge,
  args: {},
  argTypes: {
    color: {
      control: 'inline-radio',
      options: ['pink', 'blue'],
    },
    tailPosition: {
      control: 'inline-radio',
      options: ['leading', 'trailing'],
    },
  },
} satisfies Meta<typeof SpeechBadge>

type Story = StoryObj<typeof meta>

export default meta

export const 기본 = {
  render(args) {
    return <SpeechBadge {...args}>SpeechBadge</SpeechBadge>
  },
} satisfies Story

export const 테마_재정의 = {
  render(args) {
    return (
      <SpeechBadge {...args} color="blue">
        SpeechBadge
      </SpeechBadge>
    )
  },
} satisfies Story

export const 디자인_QA = {
  args: {
    text: '뱃지 텍스트',
  },
  parameters: {
    controls: {
      exclude: ['children'],
    },
  },
  argTypes: {
    text: {
      control: 'text',
    },
  },

  // eslint-disable-next-line
  render: ({ text, ...rest }: any) => {
    return <SpeechBadge {...rest}>{text || 'SpeechBadge'}</SpeechBadge>
  },
}

/* --------------------------------------------------------------------------
   말풍선 뱃지 색상 변형 쇼케이스
   pink / blue 두 가지 색상과 leading / trailing 꼬리 위치 조합 전체 표시
-------------------------------------------------------------------------- */
export const 색상_위치_조합: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', padding: '8px' }}>
      {(['pink', 'blue'] as const).map((color) => (
        <div key={color}>
          <p style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '12px' }}>
            {color} · leading / trailing
          </p>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <SpeechBadge color={color} tailPosition="leading">안녕하세요!</SpeechBadge>
              <SpeechBadge color={color} tailPosition="leading">오늘 회의 있어요?</SpeechBadge>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
              <SpeechBadge color={color} tailPosition="trailing">네, 2시에 있어요 🙌</SpeechBadge>
              <SpeechBadge color={color} tailPosition="trailing">회의실 A로 와주세요</SpeechBadge>
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
}

/* --------------------------------------------------------------------------
   채팅 대화 시뮬레이션
   SpeechBadge를 실제 메신저처럼 대화 흐름으로 배치하는 패턴
-------------------------------------------------------------------------- */
const chatMessages = [
  { id: 1, sender: 'KJ', text: '디자인 시스템 v2 리뷰 부탁드려요 🎨', mine: false, time: '오후 2:30' },
  { id: 2, sender: '나', text: '네! 방금 PR 확인했어요. 전반적으로 👍', mine: true, time: '오후 2:31' },
  { id: 3, sender: 'KJ', text: 'Tooltip 컴포넌트 쪽 피드백 있으면요?', mine: false, time: '오후 2:31' },
  { id: 4, sender: '나', text: 'side prop 기본값을 "top"으로 하면 어떨까요?', mine: true, time: '오후 2:32' },
  { id: 5, sender: 'KJ', text: '좋아요! 바로 반영할게요 ✅', mine: false, time: '오후 2:33' },
]

const ChatSimulationRender = () => {
  const [messages, setMessages] = useState(chatMessages)
  const [input, setInput] = useState('')

  const sendMessage = () => {
    const text = input.trim()
    if (!text) return
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: '나',
        text,
        mine: true,
        time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
      },
    ])
    setInput('')
  }

  return (
    <div style={{
      width: '360px', borderRadius: '16px', overflow: 'hidden',
      border: '1px solid #e2e8f0', background: '#f8fafc',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Header */}
      <div style={{
        padding: '14px 16px', background: '#fff',
        borderBottom: '1px solid #f1f5f9',
        display: 'flex', alignItems: 'center', gap: '10px',
      }}>
        <div style={{
          width: '36px', height: '36px', borderRadius: '50%',
          background: '#6366f1',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '14px', fontWeight: '700', color: '#fff',
        }}>KJ</div>
        <div>
          <div style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>Kim Jihye</div>
          <div style={{ fontSize: '11px', color: '#22c55e' }}>● 온라인</div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', minHeight: '260px', maxHeight: '320px', overflowY: 'auto' }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{
            display: 'flex', flexDirection: 'column',
            alignItems: msg.mine ? 'flex-end' : 'flex-start',
          }}>
            <SpeechBadge
              color={msg.mine ? 'blue' : 'pink'}
              tailPosition={msg.mine ? 'trailing' : 'leading'}
            >
              {msg.text}
            </SpeechBadge>
            <span style={{ fontSize: '10px', color: '#94a3b8', marginTop: '4px' }}>{msg.time}</span>
          </div>
        ))}
      </div>

      {/* Input */}
      <div style={{
        padding: '12px 14px', background: '#fff',
        borderTop: '1px solid #f1f5f9',
        display: 'flex', gap: '8px',
      }}>
        <input
          type="text"
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') sendMessage() }}
          placeholder="메시지를 입력하세요..."
          style={{
            flex: 1, padding: '8px 12px', borderRadius: '20px',
            border: '1px solid #e2e8f0', fontSize: '13px', outline: 'none',
            background: '#f8fafc',
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            width: '36px', height: '36px', borderRadius: '50%',
            background: '#6366f1', color: '#fff', border: 'none',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export const 채팅_대화_시뮬레이션: Story = {
  render: () => <ChatSimulationRender />,
}

/* --------------------------------------------------------------------------
   알림 말풍선 패턴
   시스템 알림이나 툴팁 대체 표시 용도로 활용하는 패턴
-------------------------------------------------------------------------- */
export const 알림_말풍선: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '8px' }}>
      <div>
        <p style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '12px' }}>
          시스템 알림 패턴
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#6366f118', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <SpeechBadge color="blue" tailPosition="leading">새로운 알림 3건이 있어요</SpeechBadge>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'flex-end' }}>
            <SpeechBadge color="pink" tailPosition="trailing">지금 확인하러 갈게요!</SpeechBadge>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#ef444418', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
          </div>
        </div>
      </div>

      <div>
        <p style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '12px' }}>
          온보딩 가이드 패턴
        </p>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <div style={{
            width: '160px', height: '100px', borderRadius: '12px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: '13px', fontWeight: '700',
          }}>
            여기를 클릭하세요
          </div>
          <div style={{ position: 'absolute', bottom: '-36px', left: '16px' }}>
            <SpeechBadge color="pink" tailPosition="leading">
              새 기능! 클릭해보세요 ✨
            </SpeechBadge>
          </div>
        </div>
      </div>
    </div>
  ),
}
