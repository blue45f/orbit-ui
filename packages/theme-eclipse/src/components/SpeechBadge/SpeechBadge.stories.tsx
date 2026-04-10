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
