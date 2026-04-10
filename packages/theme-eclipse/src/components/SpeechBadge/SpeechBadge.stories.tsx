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
/* --------------------------------------------------------------------------
   Vercel Design: PR 리뷰 코멘트 스레드
   Vercel과 GitHub의 PR 리뷰 UI에서 쓰이는 코드 리뷰 말풍선 패턴
   인터랙티브: 좋아요(resolve), 새 댓글 추가 가능
-------------------------------------------------------------------------- */
type ReviewComment = { id: number; author: string; text: string; mine: boolean; time: string; resolved: boolean }

const VercelPRReviewRender = () => {
  const [comments, setComments] = useState<ReviewComment[]>([
    { id: 1, author: 'leesooyeon', text: 'Tooltip의 `side` 기본값을 `"top"`으로 변경하면 어떨까요? Ant Design 패턴과 일치합니다.', mine: false, time: '10분 전', resolved: false },
    { id: 2, author: 'me', text: '동의합니다! 이미 `side="top"`이 가장 많이 쓰이고 있어서 기본값으로 설정하는 게 맞을 것 같아요.', mine: true, time: '7분 전', resolved: false },
    { id: 3, author: 'parkjiho', text: '`delayDuration` 기본값도 300ms → 200ms로 줄이는 건 어떨까요? Vercel이 그렇게 하더라고요.', mine: false, time: '4분 전', resolved: false },
  ])
  const [input, setInput] = useState('')

  const addComment = () => {
    if (!input.trim()) return
    setComments((prev) => [...prev, { id: Date.now(), author: 'me', text: input.trim(), mine: true, time: '방금 전', resolved: false }])
    setInput('')
  }

  const resolveComment = (id: number) => setComments((prev) => prev.filter((c) => c.id !== id))

  return (
    <div style={{ maxWidth: '420px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ padding: '10px 14px', borderRadius: '10px 10px 0 0', background: '#0f172a', color: '#e2e8f0', fontSize: '11px', fontFamily: 'monospace', borderBottom: '1px solid #1e293b' }}>
        src/components/Tooltip/Tooltip.tsx · 라인 42
      </div>
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderTop: 'none', padding: '12px 14px', borderRadius: '0 0 10px 10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {comments.map((c) => (
          <div key={c.id} style={{ display: 'flex', flexDirection: 'column', alignItems: c.mine ? 'flex-end' : 'flex-start', gap: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexDirection: c.mine ? 'row-reverse' : 'row' }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: c.mine ? '#6366f1' : '#f59e0b', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, flexShrink: 0 }}>
                {c.author[0].toUpperCase()}
              </div>
              <span style={{ fontSize: 11, color: '#94a3b8' }}>{c.author} · {c.time}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, flexDirection: c.mine ? 'row-reverse' : 'row' }}>
              <SpeechBadge color={c.mine ? 'blue' : 'pink'} tailPosition={c.mine ? 'trailing' : 'leading'}>
                {c.text}
              </SpeechBadge>
              {!c.mine && (
                <button onClick={() => resolveComment(c.id)} style={{ fontSize: 10, color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer', padding: '2px 0', flexShrink: 0 }}>
                  해결
                </button>
              )}
            </div>
          </div>
        ))}
        <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') addComment() }}
            placeholder="리뷰 댓글 추가..."
            style={{ flex: 1, padding: '6px 10px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12, outline: 'none' }}
          />
          <button onClick={addComment} style={{ padding: '6px 12px', borderRadius: 8, border: 'none', background: '#6366f1', color: '#fff', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>등록</button>
        </div>
      </div>
    </div>
  )
}

export const Vercel_PR_리뷰_스레드: Story = {
  name: 'Vercel Design — PR 리뷰 코멘트 스레드',
  render: () => <VercelPRReviewRender />,
}

/* --------------------------------------------------------------------------
   Ant Design: 사용자 피드백 쇼케이스
   Ant Design의 Comment 컴포넌트 패턴에서 영감
   제품/서비스에 대한 사용자 후기를 말풍선으로 표현
-------------------------------------------------------------------------- */
const testimonials = [
  { author: 'K', name: '김민준', role: 'Frontend Lead', color: '#6366f1', text: '3단계 토큰 시스템이 정말 강력해요! 브랜드 컬러만 바꾸면 전체 UI가 업데이트되니까 디자이너-개발자 협업이 훨씬 원활해졌습니다.' },
  { author: 'L', name: '이서연', role: 'Product Designer', color: '#8b5cf6', text: 'Storybook autodocs 덕분에 별도 문서 없이도 컴포넌트 API를 바로 파악할 수 있어요. 온보딩 시간이 절반으로 줄었습니다.' },
  { author: 'P', name: '박지호', role: 'Design System Engineer', color: '#0ea5e9', text: 'vanilla-extract로 타입 안전한 CSS를 작성할 수 있어서 런타임 오류가 사라졌어요. TypeScript 통합이 완벽합니다.' },
]

export const Ant_피드백_쇼케이스: Story = {
  name: 'Ant Design — 사용자 피드백 쇼케이스',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px', padding: '12px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>사용자 후기</div>
      {testimonials.map((t) => (
        <div key={t.name} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: t.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, flexShrink: 0 }}>
            {t.author}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'baseline' }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#1e293b' }}>{t.name}</span>
              <span style={{ fontSize: 11, color: '#94a3b8' }}>{t.role}</span>
            </div>
            <SpeechBadge color="blue" tailPosition="leading">
              {t.text}
            </SpeechBadge>
          </div>
        </div>
      ))}
    </div>
  ),
}

/* --------------------------------------------------------------------------
   Vercel Design: 다크모드 배포 상태 알림
   Vercel의 다크 팔레트에서 영감받은 배포 이벤트 타임라인
   컴팩트 밀도 + monochrome 컬러 시스템 적용
-------------------------------------------------------------------------- */
const deployEvents = [
  { text: 'Production 배포 완료 — orbit-ui.vercel.app', status: 'success', time: '14:32' },
  { text: 'Preview 빌드 시작 — PR #247 feat/button-api', status: 'building', time: '14:31' },
  { text: 'Lint + TypeCheck 통과 — 0 오류, 0 경고', status: 'success', time: '14:30' },
  { text: 'Webhook 실패 — POST /api/notify timeout', status: 'error', time: '14:28' },
]

const eventColors: Record<string, { color: string }> = {
  success: { color: '#22c55e' },
  building: { color: '#f59e0b' },
  error: { color: '#ef4444' },
}

export const Vercel_배포_이벤트_타임라인: Story = {
  name: 'Vercel Design — 배포 이벤트 타임라인',
  render: () => (
    <div style={{ background: '#0f172a', padding: '20px 24px', borderRadius: '14px', maxWidth: '420px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '14px' }}>
        배포 이벤트 로그
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {deployEvents.map((ev, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: (eventColors[ev.status] ?? { color: '#94a3b8' }).color, marginTop: 5 }} />
              {i < deployEvents.length - 1 && <div style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.1)', marginTop: 3 }} />}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', flex: 1 }}>
              <SpeechBadge color={i % 2 === 0 ? 'blue' : 'pink'} tailPosition="leading">
                {ev.text}
              </SpeechBadge>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace', fontVariantNumeric: 'tabular-nums' }}>
                {ev.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
}

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
