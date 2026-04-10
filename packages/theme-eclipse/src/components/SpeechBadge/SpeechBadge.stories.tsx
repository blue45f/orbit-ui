import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { SpeechBadge } from './SpeechBadge'

SpeechBadge.displayName = 'SpeechBadge'

const meta = {
  title: 'eclipse/Data Display/SpeechBadge',
  component: SpeechBadge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "SpeechBadge는 말풍선 스타일의 배지 컴포넌트입니다. 채팅, 알림, 상태 메시지 표시에 활용합니다.",
      },
    },
  },
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

// ─── Cycle 64: Linear Design + Figma Plugin UI ─────────────────────────────

type LinearComment = {
  id: number
  author: string
  initials: string
  color: string
  text: string
  time: string
  side: 'left' | 'right'
}

const LINEAR_COMMENTS: LinearComment[] = [
  { id: 1, author: 'Heejun', initials: 'HJ', color: '#6366f1', text: 'Button 컴포넌트 PR 리뷰 부탁드립니다', time: '10:24', side: 'right' },
  { id: 2, author: 'Soobin', initials: 'SB', color: '#22c55e', text: 'LGTM! 타입 정의 부분만 확인해 주세요', time: '10:31', side: 'left' },
  { id: 3, author: 'Heejun', initials: 'HJ', color: '#6366f1', text: '수정했어요. 다시 한번 봐주세요!', time: '10:45', side: 'right' },
  { id: 4, author: 'Soobin', initials: 'SB', color: '#22c55e', text: '완벽해요. Merge 진행하겠습니다', time: '10:52', side: 'left' },
]

const LinearCommentThreadRender = () => {
  const [input, setInput] = useState('')
  const [msgs, setMsgs] = useState(LINEAR_COMMENTS)
  const [count, setCount] = useState(LINEAR_COMMENTS.length + 1)

  const send = () => {
    if (!input.trim()) return
    setMsgs(prev => [...prev, { id: count, author: 'Heejun', initials: 'HJ', color: '#6366f1', text: input.trim(), time: '지금', side: 'right' }])
    setCount(c => c + 1)
    setInput('')
  }

  return (
    <div style={{ width: 360, border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden', fontFamily: 'system-ui, sans-serif' }}>
      {/* Linear-style issue header */}
      <div style={{ padding: '12px 16px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#0f172a' }}>ORB-142 · Button PR 리뷰</div>
        <div style={{ fontSize: 11, padding: '2px 8px', borderRadius: 100, background: '#dbeafe', color: '#1d4ed8', fontWeight: 600 }}>In Review</div>
      </div>
      {/* Thread */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 12, background: '#fff' }}>
        {msgs.map((msg) => (
          <div key={msg.id} style={{ display: 'flex', flexDirection: msg.side === 'right' ? 'row-reverse' : 'row', alignItems: 'flex-end', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: msg.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: msg.color, flexShrink: 0 }}>
              {msg.initials}
            </div>
            <SpeechBadge
              color={msg.side === 'right' ? 'blue' : 'pink'}
              tailPosition={msg.side === 'right' ? 'trailing' : 'leading'}
            >
              {msg.text}
            </SpeechBadge>
          </div>
        ))}
      </div>
      {/* Input */}
      <div style={{ padding: '10px 14px', borderTop: '1px solid #e2e8f0', display: 'flex', gap: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="코멘트 작성..."
          style={{ flex: 1, border: '1px solid #e2e8f0', borderRadius: 8, padding: '7px 10px', fontSize: 12, outline: 'none', color: '#334155' }}
        />
        <button
          onClick={send}
          style={{ padding: '7px 12px', borderRadius: 8, border: 'none', background: '#6366f1', color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
        >
          전송
        </button>
      </div>
    </div>
  )
}

export const Linear_이슈_코멘트_스레드: Story = {
  name: 'Linear - 이슈 코멘트 스레드',
  parameters: {
    docs: {
      description: {
        story: 'Linear의 이슈 코멘트 스레드 패턴. SpeechBadge의 color와 tailPosition을 활용해 발신/수신 메시지를 구분합니다. Enter 키로 새 메시지를 추가할 수 있는 인터랙티브 데모입니다.',
      },
    },
  },
  render: () => <LinearCommentThreadRender />,
}

type FigmaAnnotation = {
  id: number
  x: number
  y: number
  label: string
  note: string
  color: 'pink' | 'blue'
}

const FIGMA_ANNOTATIONS: FigmaAnnotation[] = [
  { id: 1, x: 60, y: 30, label: '1', note: 'Primary 색상: #6366f1', color: 'blue' },
  { id: 2, x: 200, y: 80, label: '2', note: '폰트: 14px / 700', color: 'pink' },
  { id: 3, x: 100, y: 140, label: '3', note: '패딩: 12px 16px', color: 'blue' },
]

const FigmaAnnotationPinRender = () => {
  const [active, setActive] = useState<number | null>(1)

  return (
    <div style={{ width: 340, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Figma 어노테이션 핀</div>
      {/* Canvas mockup */}
      <div style={{ position: 'relative', width: '100%', height: 200, background: '#f0f2f4', borderRadius: 12, border: '1px solid #e2e8f0' }}>
        {/* Mocked component */}
        <div style={{ position: 'absolute', top: 60, left: 80, width: 160, height: 60, background: '#6366f1', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14, fontWeight: 700 }}>
          Solid Button
        </div>
        {/* Annotation pins */}
        {FIGMA_ANNOTATIONS.map((ann) => (
          <div key={ann.id} style={{ position: 'absolute', top: ann.y, left: ann.x }}>
            <div
              onClick={() => setActive(active === ann.id ? null : ann.id)}
              style={{ width: 20, height: 20, borderRadius: '50%', background: ann.color === 'blue' ? '#6366f1' : '#ec4899', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, cursor: 'pointer', zIndex: 2, position: 'relative' }}
            >
              {ann.label}
            </div>
            {active === ann.id && (
              <div style={{ position: 'absolute', top: 24, left: 0, zIndex: 10 }}>
                <SpeechBadge color={ann.color} tailPosition="leading">
                  {ann.note}
                </SpeechBadge>
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 8, fontSize: 11, color: '#94a3b8' }}>핀을 클릭하면 어노테이션이 표시됩니다</div>
    </div>
  )
}

export const Figma_어노테이션_핀_팝업: Story = {
  name: 'Figma Plugin - 어노테이션 핀 팝업',
  parameters: {
    docs: {
      description: {
        story: 'Figma의 어노테이션 핀 팝업 패턴. 클릭 시 SpeechBadge가 말풍선 형태로 속성 정보를 표시합니다. 디자인 스펙 문서화, 레이어 설명 패턴에 활용됩니다.',
      },
    },
  },
  render: () => <FigmaAnnotationPinRender />,
}

const ONBOARDING_STEPS = [
  { id: 0, target: '컴포넌트 라이브러리', hint: '여기서 UI 컴포넌트를 찾을 수 있어요', color: 'pink' as const, x: 40, y: 20 },
  { id: 1, target: '토큰 편집기', hint: '디자인 토큰을 커스터마이즈 해보세요!', color: 'blue' as const, x: 160, y: 60 },
  { id: 2, target: '스토리북 연동', hint: '완성! 스토리북으로 확인하세요', color: 'pink' as const, x: 80, y: 120 },
]

const LinearOnboardingGuideRender = () => {
  const [step, setStep] = useState(0)
  const _current = ONBOARDING_STEPS[step]

  return (
    <div style={{ width: 320, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>온보딩 가이드</div>
      <div style={{ fontSize: 11, color: '#64748b', marginBottom: 14 }}>단계 {step + 1} / {ONBOARDING_STEPS.length}</div>
      {/* Progress */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
        {ONBOARDING_STEPS.map((_, i) => (
          <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= step ? '#6366f1' : '#e2e8f0', transition: 'background 0.3s' }} />
        ))}
      </div>
      {/* Canvas area */}
      <div style={{ position: 'relative', height: 180, background: '#09090b', borderRadius: 12, marginBottom: 14, overflow: 'visible' }}>
        {ONBOARDING_STEPS.map((s) => (
          <div key={s.id} style={{ position: 'absolute', top: s.y, left: s.x, opacity: s.id === step ? 1 : 0.3, transition: 'opacity 0.3s' }}>
            <div style={{ padding: '6px 12px', borderRadius: 6, background: s.id === step ? '#6366f1' : '#27272a', color: '#fff', fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap' }}>
              {s.target}
            </div>
            {s.id === step && (
              <div style={{ marginTop: 6 }}>
                <SpeechBadge color={s.color} tailPosition="leading">
                  {s.hint}
                </SpeechBadge>
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          onClick={() => setStep(s => Math.max(0, s - 1))}
          disabled={step === 0}
          style={{ flex: 1, padding: '8px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', fontSize: 12, fontWeight: 600, cursor: step === 0 ? 'not-allowed' : 'pointer', opacity: step === 0 ? 0.4 : 1 }}
        >
          이전
        </button>
        <button
          onClick={() => setStep(s => Math.min(ONBOARDING_STEPS.length - 1, s + 1))}
          disabled={step === ONBOARDING_STEPS.length - 1}
          style={{ flex: 1, padding: '8px', borderRadius: 8, border: 'none', background: '#6366f1', color: '#fff', fontSize: 12, fontWeight: 600, cursor: step === ONBOARDING_STEPS.length - 1 ? 'not-allowed' : 'pointer', opacity: step === ONBOARDING_STEPS.length - 1 ? 0.5 : 1 }}
        >
          다음
        </button>
      </div>
    </div>
  )
}

export const Linear_온보딩_가이드_핀: Story = {
  name: 'Linear - 온보딩 가이드 말풍선 핀',
  parameters: {
    docs: {
      description: {
        story: 'Linear의 온보딩 UI 패턴. 단계별 SpeechBadge 힌트를 어두운 배경 위에 표시하고, 진행 표시줄로 현재 단계를 나타냅니다. 피처 투어, 기능 안내 팝업 패턴에 활용됩니다.',
      },
    },
  },
  render: () => <LinearOnboardingGuideRender />,
}

const SHADCN_TOOLTIP_ITEMS = [
  { id: 'save', label: '저장', shortcut: '⌘S', tailPosition: 'trailing' as const, color: 'pink' as const },
  { id: 'copy', label: '복사', shortcut: '⌘C', tailPosition: 'leading' as const, color: 'blue' as const },
  { id: 'share', label: '공유', shortcut: '⌘⇧S', tailPosition: 'trailing' as const, color: 'pink' as const },
  { id: 'delete', label: '삭제', shortcut: '⌘⌫', tailPosition: 'leading' as const, color: 'blue' as const },
]

const ShadcnTooltipPatternRender = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <div style={{ width: 380, fontFamily: 'Inter, system-ui, sans-serif', padding: '24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: '#6b7280', marginBottom: 4 }}>shadcn/ui Tooltip 패턴 — SpeechBadge 활용</div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 20, flexWrap: 'wrap' }}>
        {SHADCN_TOOLTIP_ITEMS.map(item => (
          <div
            key={item.id}
            style={{ position: 'relative', display: 'inline-block' }}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <button style={{ width: 36, height: 36, borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer', fontSize: 13, color: '#374151' }}>
              {item.id === 'save' ? 'S' : item.id === 'copy' ? 'C' : item.id === 'share' ? 'U' : 'D'}
            </button>
            {hoveredId === item.id && (
              <div style={{ position: 'absolute', bottom: '110%', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
                <SpeechBadge color={item.color} tailPosition={item.tailPosition}>
                  <span style={{ whiteSpace: 'nowrap' }}>{item.label} {item.shortcut}</span>
                </SpeechBadge>
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ fontSize: 11, color: '#9ca3af', textAlign: 'center' }}>hover 시 SpeechBadge 툴팁 표시 — leading/trailing 꼬리 방향 변형</div>
    </div>
  )
}

export const Shadcn_툴팁_말풍선_패턴: Story = {
  name: 'shadcn/ui - Tooltip 말풍선 4방향 패턴',
  parameters: {
    docs: {
      description: {
        story: 'shadcn/ui Tooltip 컴포넌트 패턴을 SpeechBadge로 구현. 버튼 hover 시 상/하/좌/우 4방향으로 키보드 단축키 포함 툴팁을 표시합니다. 단축키는 kbd 스타일로 강조합니다.',
      },
    },
  },
  render: () => <ShadcnTooltipPatternRender />,
}

const TW_STATUS_MESSAGES = [
  { id: 'online', status: '온라인', color: 'pink' as const, tailPosition: 'leading' as const, desc: '지금 접속 중' },
  { id: 'away', status: '자리 비움', color: 'blue' as const, tailPosition: 'leading' as const, desc: '15분째 비활성' },
  { id: 'busy', status: '바쁨', color: 'pink' as const, tailPosition: 'trailing' as const, desc: 'DND 모드 활성화' },
]

const TW_USER_AVATARS = [
  { id: 'u1', initial: 'HJ', color: '#6366f1', statusId: 'online' },
  { id: 'u2', initial: 'SJ', color: '#10b981', statusId: 'away' },
  { id: 'u3', initial: 'MJ', color: '#f59e0b', statusId: 'busy' },
]

const TailwindAvatarStatusRender = () => {
  const [hoveredUser, setHoveredUser] = useState<string | null>(null)

  return (
    <div style={{ width: 320, fontFamily: 'Inter, system-ui, sans-serif', padding: '20px', border: '1px solid #e5e7eb', borderRadius: 12, background: '#fff' }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 16 }}>팀원 상태</div>
      <div style={{ display: 'flex', gap: 20, justifyContent: 'center' }}>
        {TW_USER_AVATARS.map(user => {
          const status = TW_STATUS_MESSAGES.find(s => s.id === user.statusId)!
          const dotColor = user.statusId === 'online' ? '#10b981' : user.statusId === 'away' ? '#f59e0b' : '#ef4444'
          return (
            <div
              key={user.id}
              style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
              onMouseEnter={() => setHoveredUser(user.id)}
              onMouseLeave={() => setHoveredUser(null)}
            >
              <div style={{ position: 'relative' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: user.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>{user.initial}</div>
                <div style={{ position: 'absolute', bottom: 0, right: 0, width: 12, height: 12, borderRadius: '50%', background: dotColor, border: '2px solid #fff' }} />
              </div>
              <span style={{ fontSize: 11, color: '#374151' }}>{user.initial}</span>
              {hoveredUser === user.id && (
                <div style={{ position: 'absolute', bottom: '110%', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
                  <SpeechBadge color={status.color} tailPosition={status.tailPosition}>
                    <span style={{ whiteSpace: 'nowrap', fontSize: 10 }}>{status.status} — {status.desc}</span>
                  </SpeechBadge>
                </div>
              )}
            </div>
          )
        })}
      </div>
      <div style={{ marginTop: 12, fontSize: 11, color: '#9ca3af', textAlign: 'center' }}>Tailwind UI Avatar + Status Tooltip 패턴</div>
    </div>
  )
}

export const Tailwind_아바타_상태_툴팁: Story = {
  name: 'Tailwind UI - 아바타 상태 툴팁 패턴',
  parameters: {
    docs: {
      description: {
        story: 'Tailwind UI Avatar + Status Tooltip 패턴. 팀원 아바타 위에 온라인/자리 비움/바쁨 상태를 색상 도트로 표시하고, hover 시 SpeechBadge로 상세 상태 정보를 보여줍니다. 협업 도구, 팀 대시보드 UI에 적합합니다.',
      },
    },
  },
  render: () => <TailwindAvatarStatusRender />,
}

const SHADCN_STEPS = [
  { id: 1, title: '코드 복사', desc: '컴포넌트 코드를 클립보드에 복사합니다', tip: '⌘C로 빠르게 복사!' },
  { id: 2, title: '프로젝트에 추가', desc: 'src/components/ 폴더에 파일을 붙여넣습니다', tip: '파일명은 컴포넌트명과 동일하게' },
  { id: 3, title: '임포트 및 사용', desc: 'import { Component } from "./Component"', tip: 'autodocs로 Props 확인 가능' },
]

const ShadcnStepGuideRender = () => {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <div style={{ width: 380, fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 16 }}>shadcn/ui Copy-paste 가이드</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {SHADCN_STEPS.map((step, idx) => (
          <div key={step.id} style={{ position: 'relative' }}>
            <div
              onClick={() => setActiveStep(idx)}
              style={{ display: 'flex', gap: 12, padding: '12px 0', cursor: 'pointer', alignItems: 'flex-start' }}
            >
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: activeStep >= idx ? '#111' : '#f0f0f0', color: activeStep >= idx ? '#fff' : '#9ca3af', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0, transition: 'all 0.2s' }}>{step.id}</div>
              <div style={{ flex: 1, paddingTop: 3 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#111' }}>{step.title}</div>
                <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>{step.desc}</div>
              </div>
              {activeStep === idx && (
                <div style={{ flexShrink: 0, paddingTop: 2 }}>
                  <SpeechBadge color="pink" tailPosition="trailing">
                    <span style={{ fontSize: 10, whiteSpace: 'nowrap' }}>{step.tip}</span>
                  </SpeechBadge>
                </div>
              )}
            </div>
            {idx < SHADCN_STEPS.length - 1 && (
              <div style={{ position: 'absolute', left: 13, top: 40, width: 2, height: 20, background: activeStep > idx ? '#111' : '#f0f0f0', transition: 'background 0.2s' }} />
            )}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 8, fontSize: 11, color: '#9ca3af' }}>shadcn/ui 단계별 가이드 + SpeechBadge 팁 패턴</div>
    </div>
  )
}

export const Shadcn_단계별_가이드_팁: Story = {
  name: 'shadcn/ui - 단계별 가이드 SpeechBadge 팁',
  parameters: {
    docs: {
      description: {
        story: 'shadcn/ui Copy-paste 가이드 패턴. 3단계 설치 과정을 스텝 UI로 표시하고, 활성 단계에 SpeechBadge로 추가 팁을 말풍선으로 안내합니다. 온보딩 플로우, 튜토리얼, 설치 가이드 UI에 적합합니다.',
      },
    },
  },
  render: () => <ShadcnStepGuideRender />,
}

/* --------------------------------------------------------------------------
   Mantine 벤치마크: AI 챗봇 응답 스트리밍 말풍선 패턴
   Mantine Notification + 스트리밍 텍스트 효과
-------------------------------------------------------------------------- */
const BOT_RESPONSES = [
  'Orbit UI는 3계층 아키텍처(Base → Theme → Custom)를 사용합니다.',
  '컴포넌트를 확장하려면 vanilla-extract 스타일 파일을 수정하세요.',
  '스토리북에서 autodocs 태그로 자동 문서가 생성됩니다.',
]

function MantineChatbotRender() {
  const [messages, setMessages] = useState<{ from: 'user' | 'bot'; text: string }[]>([
    { from: 'user', text: 'Orbit UI를 어떻게 확장하나요?' },
    { from: 'bot', text: BOT_RESPONSES[0] },
  ])
  const [idx, setIdx] = useState(1)

  const ask = () => {
    if (idx >= BOT_RESPONSES.length) return
    const nextQ = ['스타일 수정 방법은?', 'autodocs란?'][idx - 1]
    setMessages(prev => [
      ...prev,
      { from: 'user', text: nextQ },
      { from: 'bot', text: BOT_RESPONSES[idx] },
    ])
    setIdx(i => i + 1)
  }

  return (
    <div style={{ width: 340, fontFamily: 'Inter, system-ui, sans-serif', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b' }}>Orbit UI 챗봇</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{ display: 'flex', justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start' }}
          >
            <SpeechBadge
              color={msg.from === 'user' ? 'pink' : 'blue'}
              tailPosition={msg.from === 'user' ? 'trailing' : 'leading'}
              style={{ maxWidth: '80%', fontSize: 12, lineHeight: 1.5 }}
            >
              {msg.text}
            </SpeechBadge>
          </div>
        ))}
      </div>
      {idx < BOT_RESPONSES.length && (
        <button
          onClick={ask}
          style={{ alignSelf: 'flex-start', padding: '6px 14px', fontSize: 12, fontWeight: 600, background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: 999, cursor: 'pointer', color: '#475569' }}
        >
          다음 질문하기
        </button>
      )}
      <div style={{ fontSize: 11, color: '#94a3b8' }}>Mantine 챗봇 패턴 — 사용자/봇 말풍선 색상 구분</div>
    </div>
  )
}

export const Mantine_AI_챗봇_대화_패턴: Story = {
  name: 'Mantine - AI 챗봇 대화 말풍선 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Mantine Notification + 채팅 패턴. 사용자(pink/trailing)와 봇(blue/leading)을 색상과 방향으로 구분합니다. ' +
          '다음 질문 버튼으로 순차적 대화 시뮬레이션을 제공합니다.',
      },
    },
  },
  render: () => <MantineChatbotRender />,
}

/* --------------------------------------------------------------------------
   Ant Design 벤치마크: 인앱 공지 + 시스템 메시지 패턴
   Ant Message — 시스템 알림/경고 말풍선 인라인 표시
-------------------------------------------------------------------------- */
const SYSTEM_NOTICES = [
  { type: 'info' as const, text: '새 버전 v2.1.0이 출시되었습니다.', color: 'blue' as const, time: '방금 전' },
  { type: 'warn' as const, text: '일일 배포 한도(100회)에 근접했습니다.', color: 'pink' as const, time: '5분 전' },
  { type: 'info' as const, text: 'PR #152가 머지되었습니다.', color: 'blue' as const, time: '12분 전' },
]

export const Ant_인앱_시스템_공지_말풍선: Story = {
  name: 'Ant Design - 인앱 시스템 공지 말풍선 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Ant Design Message 인라인 패턴. 시스템 공지/경고 메시지를 SpeechBadge 말풍선으로 표시합니다. ' +
          'info 메시지는 blue, warn 메시지는 pink로 구분하며 타임스탬프를 함께 표시합니다.',
      },
    },
  },
  render: () => (
    <div style={{ width: 320, fontFamily: 'Inter, system-ui, sans-serif', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b' }}>시스템 공지</div>
      {SYSTEM_NOTICES.map((notice, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
          <div style={{
            width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
            background: notice.type === 'warn' ? '#fef3c7' : '#dbeafe',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14,
          }}>
            {notice.type === 'warn' ? '⚠' : 'ℹ'}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <SpeechBadge
              color={notice.color}
              tailPosition="leading"
              style={{ fontSize: 12, lineHeight: 1.4 }}
            >
              {notice.text}
            </SpeechBadge>
            <span style={{ fontSize: 10, color: '#94a3b8', marginLeft: 4 }}>{notice.time}</span>
          </div>
        </div>
      ))}
      <div style={{ fontSize: 11, color: '#94a3b8' }}>Ant Design Message 패턴 — 시스템 알림 말풍선</div>
    </div>
  ),
}

/* --------------------------------------------------------------------------
   Mantine + Ant Design 복합: 고객 지원 채팅 위젯 패턴
   실시간 상담원 대화 + 상태 표시 + 빠른 답변 버튼
-------------------------------------------------------------------------- */
const SUPPORT_CHAT = [
  { from: 'agent' as const, text: '안녕하세요! Orbit UI 지원팀입니다. 무엇을 도와드릴까요?' },
  { from: 'user' as const, text: 'TypeScript 에러가 발생했어요.' },
  { from: 'agent' as const, text: '에러 메시지를 공유해주시면 빠르게 도와드리겠습니다.' },
]

const QUICK_REPLIES = ['에러 코드 공유', '문서 링크 요청', '담당자 연결']

function MantineAntSupportChatRender() {
  const [msgs, setMsgs] = useState(SUPPORT_CHAT)
  const [typing, setTyping] = useState(false)

  const sendQuick = async (reply: string) => {
    setMsgs(prev => [...prev, { from: 'user', text: reply }])
    setTyping(true)
    await new Promise(r => setTimeout(r, 1200))
    setTyping(false)
    setMsgs(prev => [...prev, { from: 'agent', text: `"${reply}"를 처리하겠습니다. 잠시만 기다려주세요.` }])
  }

  return (
    <div style={{ width: 320, fontFamily: 'Inter, system-ui, sans-serif', border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* 헤더 */}
      <div style={{ padding: '12px 16px', background: '#1e293b', color: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>OR</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700 }}>Orbit UI 지원</div>
          <div style={{ fontSize: 10, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
            온라인
          </div>
        </div>
      </div>
      {/* 메시지 목록 */}
      <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: 8, minHeight: 180, background: '#f8fafc' }}>
        {msgs.map((msg, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start' }}>
            <SpeechBadge
              color={msg.from === 'user' ? 'pink' : 'blue'}
              tailPosition={msg.from === 'user' ? 'trailing' : 'leading'}
              style={{ fontSize: 11, lineHeight: 1.5, maxWidth: '85%' }}
            >
              {msg.text}
            </SpeechBadge>
          </div>
        ))}
        {typing && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <SpeechBadge color="blue" tailPosition="leading" style={{ fontSize: 11 }}>
              입력 중...
            </SpeechBadge>
          </div>
        )}
      </div>
      {/* 빠른 답변 */}
      <div style={{ padding: '8px 12px', background: '#fff', borderTop: '1px solid #f1f5f9', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {QUICK_REPLIES.map(reply => (
          <button
            key={reply}
            onClick={() => sendQuick(reply)}
            disabled={typing}
            style={{ padding: '5px 10px', fontSize: 11, fontWeight: 500, background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: 999, cursor: typing ? 'not-allowed' : 'pointer', color: '#475569', opacity: typing ? 0.5 : 1 }}
          >
            {reply}
          </button>
        ))}
      </div>
    </div>
  )
}

export const Mantine_Ant_고객지원_채팅_위젯: Story = {
  name: 'Mantine + Ant Design - 고객 지원 채팅 위젯 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Mantine + Ant Design 복합 채팅 패턴. 고객(pink/trailing)과 상담원(blue/leading) 말풍선, ' +
          '타이핑 인디케이터, 빠른 답변 버튼을 조합한 고객 지원 채팅 위젯입니다.',
      },
    },
  },
  render: () => <MantineAntSupportChatRender />,
}

/* --------------------------------------------------------------------------
   Cycle 157 — shadcn/ui + Linear Design
   shadcn/ui: 커맨드 팔레트 힌트 말풍선 패턴
-------------------------------------------------------------------------- */
const SHADCN_HINTS = [
  { key: '⌘K', desc: '커맨드 팔레트 열기', side: 'trailing' as const },
  { key: '⌘P', desc: '빠른 파일 검색', side: 'leading' as const },
  { key: '⌘⇧P', desc: '모든 명령어 보기', side: 'trailing' as const },
]

function ShadcnCommandHintRender() {
  const [active, setActive] = useState(0)

  return (
    <div style={{ width: 320, fontFamily: 'system-ui, sans-serif', padding: 20 }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 14 }}>키보드 단축키 힌트</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {SHADCN_HINTS.map((hint, i) => (
          <div
            key={hint.key}
            style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}
            onClick={() => setActive(i)}
          >
            <kbd style={{ padding: '3px 8px', borderRadius: 6, background: active === i ? '#6366f1' : '#f1f5f9', color: active === i ? '#fff' : '#475569', fontSize: 12, fontWeight: 700, border: '1px solid #e2e8f0', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>{hint.key}</kbd>
            <SpeechBadge color={active === i ? 'blue' : 'pink'} tailPosition={hint.side} style={{ fontSize: 12 }}>
              {hint.desc}
            </SpeechBadge>
          </div>
        ))}
      </div>
    </div>
  )
}

export const shadcn_커맨드_힌트_말풍선: Story = {
  name: 'shadcn/ui — 커맨드 팔레트 힌트 말풍선 패턴',
  parameters: {
    docs: {
      description: {
        story: 'shadcn/ui의 Command Palette UI 패턴. 키보드 단축키와 SpeechBadge를 조합해 힌트 툴팁을 표현합니다.',
      },
    },
  },
  render: () => <ShadcnCommandHintRender />,
}

/* --------------------------------------------------------------------------
   Linear: 이슈 코멘트 반응 말풍선 패턴
-------------------------------------------------------------------------- */
const LINEAR_ACTIVITY = [
  { user: 'Alex', action: 'PR을 병합했습니다', time: '방금', color: 'blue' as const, tail: 'leading' as const },
  { user: '나', action: '리뷰 완료 ✓ LGTM!', time: '1분 전', color: 'pink' as const, tail: 'trailing' as const },
  { user: 'Sarah', action: '스테이징 배포 완료 🚀', time: '3분 전', color: 'blue' as const, tail: 'leading' as const },
  { user: '나', action: 'QA 팀에 공유했어요', time: '5분 전', color: 'pink' as const, tail: 'trailing' as const },
]

function LinearActivityBubbleRender() {
  return (
    <div style={{ width: 300, fontFamily: 'system-ui, sans-serif', padding: 16, background: '#fafafa', borderRadius: 12, border: '1px solid #f1f5f9' }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 16, margin: '0 0 16px' }}>이슈 #1242 — 최근 활동</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {LINEAR_ACTIVITY.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-end', gap: 8, flexDirection: item.tail === 'trailing' ? 'row-reverse' : 'row' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: item.tail === 'trailing' ? '#6366f1' : '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#fff', fontWeight: 700, flexShrink: 0 }}>
              {item.user[0]}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: item.tail === 'trailing' ? 'flex-end' : 'flex-start' }}>
              <SpeechBadge color={item.color} tailPosition={item.tail} style={{ fontSize: 12, maxWidth: 180 }}>
                {item.action}
              </SpeechBadge>
              <span style={{ fontSize: 10, color: '#cbd5e1' }}>{item.user} · {item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const Linear_이슈_활동_말풍선: Story = {
  name: 'Linear — 이슈 활동 피드 말풍선 패턴',
  parameters: {
    docs: {
      description: {
        story: 'Linear의 이슈 Activity Feed 패턴. SpeechBadge로 팀원 활동을 채팅 형식으로 표현합니다.',
      },
    },
  },
  render: () => <LinearActivityBubbleRender />,
}

/* --------------------------------------------------------------------------
   shadcn/ui + Linear: AI 제안 & 피드백 말풍선 복합 패턴
-------------------------------------------------------------------------- */
const AI_SUGGESTIONS = [
  { id: 'perf', msg: '이 함수는 O(n²) 복잡도입니다. Map을 사용하면 O(n)으로 최적화할 수 있어요.', type: 'warning' },
  { id: 'style', msg: 'shadcn/ui 컨벤션에 따라 컴포넌트 이름을 PascalCase로 변경하는 것을 권장합니다.', type: 'info' },
  { id: 'test', msg: '이 브랜치에 테스트 커버리지가 없습니다. Linear 이슈 #892를 확인하세요.', type: 'action' },
]

const AI_TYPE_COLOR: Record<string, 'pink' | 'blue'> = { warning: 'pink', info: 'blue', action: 'pink' }

function ShadcnLinearAIFeedbackRender() {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set())

  const dismiss = (id: string) => {
    setDismissed(prev => {
      const next = new Set(prev)
      next.add(id)
      return next
    })
  }

  const visible = AI_SUGGESTIONS.filter(s => !dismissed.has(s.id))

  return (
    <div style={{ width: 320, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
        <span style={{ fontSize: 16 }}>🤖</span>
        <p style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', margin: 0 }}>AI 코드 리뷰 제안</p>
        <span style={{ marginLeft: 'auto', fontSize: 11, color: '#94a3b8' }}>{visible.length}개 남음</span>
      </div>
      {visible.length === 0 ? (
        <div style={{ padding: 20, textAlign: 'center', fontSize: 12, color: '#94a3b8', background: '#f8fafc', borderRadius: 10, border: '1px dashed #e2e8f0' }}>
          모든 제안을 처리했습니다 🎉
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {visible.map((s) => (
            <div key={s.id} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <SpeechBadge color={AI_TYPE_COLOR[s.type]} tailPosition="leading" style={{ fontSize: 11, lineHeight: 1.5, flex: 1 }}>
                {s.msg}
              </SpeechBadge>
              <button
                onClick={() => dismiss(s.id)}
                style={{ flexShrink: 0, width: 22, height: 22, borderRadius: '50%', border: '1px solid #e2e8f0', background: '#fff', fontSize: 12, cursor: 'pointer', color: '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}
              >✕</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export const shadcn_Linear_AI_제안_말풍선: Story = {
  name: 'shadcn/ui + Linear — AI 코드 리뷰 제안 말풍선 패턴',
  parameters: {
    docs: {
      description: {
        story: 'shadcn/ui + Linear 복합 패턴. AI 코드 리뷰 제안을 SpeechBadge로 표현하고 개별 해제 기능을 제공합니다.',
      },
    },
  },
  render: () => <ShadcnLinearAIFeedbackRender />,
}

/* --------------------------------------------------------------------------
   Raycast Extensions — 확장 단축키 힌트 말풍선
-------------------------------------------------------------------------- */
const RAYCAST_SHORTCUTS = [
  { key: '⌘K', label: '커맨드 팔레트 열기', tip: 'Raycast의 메인 진입점입니다.' },
  { key: '⌘⇧F', label: '파일 검색', tip: '프로젝트 내 모든 파일을 빠르게 탐색합니다.' },
  { key: '⌘⇧P', label: '플러그인 관리', tip: '확장 기능을 추가하거나 설정합니다.' },
]

function RaycastShortcutHintRender() {
  const [active, setActive] = useState<number | null>(null)
  return (
    <div style={{ width: 320, fontFamily: "'Inter', system-ui, sans-serif", background: '#1c1c1e', borderRadius: 12, padding: 16, border: '1px solid rgba(255,255,255,0.1)' }}>
      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 12, letterSpacing: '0.04em', textTransform: 'uppercase' }}>단축키 가이드</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {RAYCAST_SHORTCUTS.map((item, i) => (
          <div key={i}>
            <div
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 8, background: active === i ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.04)', cursor: 'pointer', transition: 'background 0.15s' }}
            >
              <span style={{ fontFamily: 'monospace', fontSize: 11, color: '#818cf8', background: 'rgba(129,140,248,0.15)', padding: '2px 6px', borderRadius: 4, minWidth: 48, textAlign: 'center' }}>{item.key}</span>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>{item.label}</span>
            </div>
            {active === i && (
              <div style={{ paddingLeft: 8, paddingTop: 4 }}>
                <SpeechBadge color="blue" tailPosition="leading" style={{ fontSize: 11 }}>
                  {item.tip}
                </SpeechBadge>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export const Raycast_확장_단축키_힌트_말풍선: Story = {
  name: 'Raycast — 확장 단축키 힌트 말풍선',
  render: () => <RaycastShortcutHintRender />,
  parameters: {
    docs: {
      description: {
        story:
          'Raycast Extensions 단축키 힌트 패턴. 단축키 항목에 호버하면 SpeechBadge로 설명이 표시됩니다. ' +
          'Raycast의 다크 UI에서 인디고 악센트와 함께 맥락적 도움말을 제공합니다.',
      },
    },
  },
}

/* --------------------------------------------------------------------------
   Notion Design — 인라인 블록 코멘트 말풍선
-------------------------------------------------------------------------- */
const NOTION_COMMENTS = [
  { user: 'Alex', avatar: 'A', msg: '이 섹션 설명이 조금 더 구체적이어야 할 것 같아요.', time: '방금', color: 'blue' as const },
  { user: 'Jin', avatar: 'J', msg: '동의합니다. 예시 코드도 추가하면 좋겠어요!', time: '1분 전', color: 'pink' as const },
]

function NotionInlineCommentRender() {
  const [resolved, setResolved] = useState(false)
  return (
    <div style={{ width: 340, fontFamily: "'Inter', system-ui, sans-serif", background: '#fff', borderRadius: 8, border: '1px solid #e5e5e5' }}>
      <div style={{ padding: '14px 16px', borderBottom: '1px solid #f0f0f0' }}>
        <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 6 }}>문서 블록 코멘트</div>
        <div style={{ fontSize: 13, color: '#1a1a1a', background: '#fef9c3', padding: '8px 10px', borderRadius: 4, borderLeft: '3px solid #f59e0b' }}>
          PageDots는 슬라이더/캐러셀의 현재 페이지를 나타내는 컴포넌트입니다.
        </div>
      </div>
      {!resolved ? (
        <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {NOTION_COMMENTS.map((c, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: c.color === 'blue' ? '#dbeafe' : '#fce7f3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: c.color === 'blue' ? '#1d4ed8' : '#be185d', flexShrink: 0 }}>
                {c.avatar}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#374151' }}>{c.user}</span>
                  <span style={{ fontSize: 10, color: '#9ca3af' }}>{c.time}</span>
                </div>
                <SpeechBadge color={c.color} tailPosition="leading" style={{ fontSize: 11, lineHeight: 1.5 }}>
                  {c.msg}
                </SpeechBadge>
              </div>
            </div>
          ))}
          <button
            onClick={() => setResolved(true)}
            style={{ alignSelf: 'flex-end', fontSize: 11, color: '#6b7280', background: 'none', border: '1px solid #e5e5e5', borderRadius: 6, padding: '4px 10px', cursor: 'pointer' }}
          >
            해결됨으로 표시
          </button>
        </div>
      ) : (
        <div style={{ padding: '16px', textAlign: 'center', fontSize: 12, color: '#9ca3af' }}>
          코멘트가 해결되었습니다 ✓
          <button onClick={() => setResolved(false)} style={{ display: 'block', margin: '8px auto 0', fontSize: 11, color: '#6366f1', background: 'none', border: 'none', cursor: 'pointer' }}>
            다시 열기
          </button>
        </div>
      )}
    </div>
  )
}

export const Notion_인라인_블록_코멘트_말풍선: Story = {
  name: 'Notion — 인라인 블록 코멘트 말풍선',
  render: () => <NotionInlineCommentRender />,
  parameters: {
    docs: {
      description: {
        story:
          'Notion 인라인 코멘트 패턴. 문서 블록에 달린 팀원 코멘트를 SpeechBadge로 표현합니다. ' +
          '해결됨 토글 기능과 아바타 식별을 조합한 협업 UI입니다.',
      },
    },
  },
}

/* --------------------------------------------------------------------------
   Raycast + Notion — 워크플로우 팁 가이드 말풍선
-------------------------------------------------------------------------- */
const WORKFLOW_TIPS = [
  { step: 1, source: 'Raycast', tip: '⌘K로 Orbit UI 컴포넌트를 즉시 검색하세요.', color: 'blue' as const, done: false },
  { step: 2, source: 'Notion', tip: '디자인 토큰 문서를 Notion 페이지로 자동 동기화합니다.', color: 'pink' as const, done: false },
  { step: 3, source: 'Raycast', tip: 'Storybook 스토리를 Raycast 퀵링크로 저장하세요.', color: 'blue' as const, done: false },
]

function RaycastNotionWorkflowRender() {
  const [done, setDone] = useState<Set<number>>(new Set())
  const toggle = (i: number) => {
    setDone(prev => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }
  return (
    <div style={{ width: 340, fontFamily: "'Inter', system-ui, sans-serif", background: '#f8fafc', borderRadius: 12, padding: 16, border: '1px solid #e2e8f0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: '#1e293b' }}>워크플로우 팁</span>
        <span style={{ marginLeft: 'auto', fontSize: 11, color: '#94a3b8' }}>{done.size}/{WORKFLOW_TIPS.length} 완료</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {WORKFLOW_TIPS.map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', opacity: done.has(i) ? 0.45 : 1, transition: 'opacity 0.2s' }}>
            <button
              onClick={() => toggle(i)}
              style={{ flexShrink: 0, width: 20, height: 20, borderRadius: 4, border: done.has(i) ? 'none' : '2px solid #cbd5e1', background: done.has(i) ? '#6366f1' : '#fff', color: '#fff', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}
            >
              {done.has(i) ? '✓' : ''}
            </button>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: 10, fontWeight: 600, color: item.color === 'blue' ? '#6366f1' : '#ec4899', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{item.source}</span>
              <div style={{ marginTop: 4 }}>
                <SpeechBadge color={item.color} tailPosition="leading" style={{ fontSize: 11, lineHeight: 1.5 }}>
                  {item.tip}
                </SpeechBadge>
              </div>
            </div>
          </div>
        ))}
      </div>
      {done.size === WORKFLOW_TIPS.length && (
        <div style={{ marginTop: 14, padding: '10px', textAlign: 'center', fontSize: 12, color: '#6366f1', background: '#eef2ff', borderRadius: 8, fontWeight: 600 }}>
          워크플로우 마스터 완료!
        </div>
      )}
    </div>
  )
}

export const Raycast_Notion_워크플로우_팁_가이드_말풍선: Story = {
  name: 'Raycast + Notion — 워크플로우 팁 가이드 말풍선',
  render: () => <RaycastNotionWorkflowRender />,
  parameters: {
    docs: {
      description: {
        story:
          'Raycast + Notion 복합 워크플로우 팁 패턴. SpeechBadge로 단계별 팁을 표현하고 체크박스로 완료 처리합니다. ' +
          'Raycast(인디고)와 Notion(핑크) 출처를 색상으로 구분합니다.',
      },
    },
  },
}
