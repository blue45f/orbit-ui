import { useState } from 'react'

import { ChevronRightLineIcon } from '@heejun-com/icons'
import { Meta, StoryObj } from '@storybook/react'

import { PageNumber } from './PageNumber'

const meta = {
  title: 'eclipse/Navigation/PageNumber',
  component: PageNumber,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "PageNumber는 페이지네이션의 개별 페이지 번호 버튼 컴포넌트입니다. 현재/비활성/비활성화 상태를 지원합니다.",
      },
    },
  },
  args: {
    current: 1,
    total: 3,
  },
} satisfies Meta<typeof PageNumber>

type Story = StoryObj<typeof meta>

export default meta

export const 기본 = {} satisfies Story

export const 첫_페이지 = {
  args: {
    current: 1,
    total: 5,
  },
} satisfies Story

export const 중간_페이지 = {
  args: {
    current: 3,
    total: 5,
  },
} satisfies Story

export const 마지막_페이지 = {
  args: {
    current: 5,
    total: 5,
  },
} satisfies Story

export const 두_자리_숫자 = {
  args: {
    current: 12,
    total: 24,
  },
} satisfies Story

export const Trailing_슬롯 = {
  render: function WithTrailing() {
    // Mock icon using a simple SVG
    const MockIcon = () => (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <path
          d="M2 2L11 11M11 2L2 11"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )

    return (
      <PageNumber current={1} total={3}>
        <PageNumber.Trailing>
          <MockIcon />
        </PageNumber.Trailing>
      </PageNumber>
    )
  },
} satisfies Story

export const 배경과_함께 = {
  render: function WithBackground() {
    return (
      <div
        style={{
          padding: '40px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '12px',
          display: 'inline-block',
        }}
      >
        <PageNumber current={1} total={5} />
      </div>
    )
  },
} satisfies Story

export const 여러_상태 = {
  render: function MultipleStates() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>기본</p>
          <PageNumber current={1} total={3} />
        </div>

        <div>
          <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>큰 숫자</p>
          <PageNumber current={99} total={100} />
        </div>

        <div>
          <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Trailing 포함</p>
          <PageNumber current={2} total={5}>
            <PageNumber.Trailing>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path
                  d="M2 2L11 11M11 2L2 11"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </PageNumber.Trailing>
          </PageNumber>
        </div>
      </div>
    )
  },
} satisfies Story

export const 디자인_QA = {
  args: {
    current: 1,
    total: 3,
    trailing: false,
  },
  argTypes: {
    current: {
      control: { type: 'number', min: 1 },
    },
    total: {
      control: { type: 'number', min: 1 },
    },
    trailing: {
      control: 'boolean',
    },
  },
  // eslint-disable-next-line
  render: function RenderComponent({ trailing, children: _children, ...rest }: any) {
    return (
      <PageNumber {...rest}>
        {trailing && (
          <PageNumber.Trailing>
            <ChevronRightLineIcon size={14} />
          </PageNumber.Trailing>
        )}
      </PageNumber>
    )
  },
}

// ─── Cycle 65: Radix UI + Ant Design ───────────────────────────────────────

const RADIX_TOTAL_ITEMS = 87
const RADIX_PAGE_SIZE = 10

const RadixPaginationRender = () => {
  const [current, setCurrent] = useState(1)
  const total = Math.ceil(RADIX_TOTAL_ITEMS / RADIX_PAGE_SIZE)
  const startItem = (current - 1) * RADIX_PAGE_SIZE + 1
  const endItem = Math.min(current * RADIX_PAGE_SIZE, RADIX_TOTAL_ITEMS)

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', width: 380 }}>
      <div style={{ fontSize: 13, color: '#64748b', marginBottom: 16 }}>
        총 {RADIX_TOTAL_ITEMS}개 항목 중 {startItem}-{endItem} 표시
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
        {Array.from({ length: Math.min(RADIX_PAGE_SIZE, RADIX_TOTAL_ITEMS - (current - 1) * RADIX_PAGE_SIZE) }).map((_, i) => (
          <div key={i} style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', fontSize: 13, color: '#0f172a', display: 'flex', justifyContent: 'space-between' }}>
            <span>항목 #{startItem + i}</span>
            <span style={{ fontSize: 11, color: '#94a3b8' }}>데이터 {startItem + i}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'center' }}>
        <button
          onClick={() => setCurrent(c => Math.max(1, c - 1))}
          disabled={current === 1}
          style={{ padding: '6px 12px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', fontSize: 12, cursor: current === 1 ? 'not-allowed' : 'pointer', opacity: current === 1 ? 0.4 : 1 }}
        >
          이전
        </button>
        {Array.from({ length: total }).map((_, i) => {
          const page = i + 1
          const isActive = page === current
          const isNear = Math.abs(page - current) <= 1 || page === 1 || page === total
          if (!isNear) {
            if (page === 2 || page === total - 1) return <span key={i} style={{ fontSize: 12, color: '#94a3b8' }}>···</span>
            return null
          }
          return (
            <div key={i} onClick={() => setCurrent(page)} style={{ cursor: 'pointer' }}>
              <PageNumber current={isActive ? 1 : 0} total={1}>{page}</PageNumber>
            </div>
          )
        })}
        <button
          onClick={() => setCurrent(c => Math.min(total, c + 1))}
          disabled={current === total}
          style={{ padding: '6px 12px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', fontSize: 12, cursor: current === total ? 'not-allowed' : 'pointer', opacity: current === total ? 0.4 : 1 }}
        >
          다음
        </button>
        <PageNumber current={current} total={total} />
      </div>
      <div style={{ marginTop: 8, fontSize: 11, color: '#94a3b8', textAlign: 'center' }}>Radix UI Pagination 패턴 — 데이터 리스트 페이지 네이션</div>
    </div>
  )
}

export const Radix_페이지네이션_데이터_리스트: Story = {
  name: 'Radix UI - 데이터 리스트 페이지네이션',
  parameters: {
    docs: {
      description: {
        story: 'Radix UI Pagination 패턴. 총 87개 항목을 10개씩 나눠 PageNumber와 이전/다음 버튼으로 페이지를 전환합니다. 현재 표시 범위와 total/current 상태를 실시간으로 보여줍니다.',
      },
    },
  },
  render: () => <RadixPaginationRender />,
}

type AntStep = {
  id: number
  title: string
  desc: string
}

const ANT_STEPS: AntStep[] = [
  { id: 1, title: '프로젝트 정보', desc: '이름, 설명, 가시성 설정' },
  { id: 2, title: '팀 멤버 초대', desc: '협업할 팀원을 초대합니다' },
  { id: 3, title: '통합 설정', desc: 'GitHub, Slack 연동' },
  { id: 4, title: '완료', desc: '프로젝트가 생성되었습니다' },
]

const AntDesignStepperRender = () => {
  const [step, setStep] = useState(1)
  const total = ANT_STEPS.length
  const current = ANT_STEPS[step - 1]

  return (
    <div style={{ width: 400, fontFamily: 'system-ui, sans-serif' }}>
      {/* Step indicators */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 24 }}>
        {ANT_STEPS.map((s, i) => {
          const isDone = s.id < step
          const isActive = s.id === step
          return (
            <div key={s.id} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
              {i < ANT_STEPS.length - 1 && (
                <div style={{ position: 'absolute', top: 14, left: '50%', width: '100%', height: 2, background: isDone ? '#6366f1' : '#e2e8f0', zIndex: 0 }} />
              )}
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: isDone ? '#6366f1' : isActive ? '#fff' : '#f1f5f9', border: `2px solid ${isActive ? '#6366f1' : isDone ? '#6366f1' : '#e2e8f0'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: isDone ? '#fff' : isActive ? '#6366f1' : '#94a3b8', zIndex: 1, position: 'relative' }}>
                {isDone ? '✓' : s.id}
              </div>
              <div style={{ fontSize: 10, color: isActive ? '#6366f1' : '#94a3b8', marginTop: 4, fontWeight: isActive ? 700 : 400, textAlign: 'center' }}>{s.title}</div>
            </div>
          )
        })}
      </div>
      {/* Content */}
      <div style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: 12, background: '#fff', marginBottom: 16, minHeight: 80 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>{current.title}</div>
        <div style={{ fontSize: 13, color: '#64748b' }}>{current.desc}</div>
      </div>
      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          onClick={() => setStep(s => Math.max(1, s - 1))}
          disabled={step === 1}
          style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', fontSize: 13, fontWeight: 600, cursor: step === 1 ? 'not-allowed' : 'pointer', opacity: step === 1 ? 0.4 : 1, color: '#334155' }}
        >
          이전
        </button>
        <PageNumber current={step} total={total} />
        <button
          onClick={() => setStep(s => Math.min(total, s + 1))}
          disabled={step === total}
          style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: step === total ? '#22c55e' : '#6366f1', color: '#fff', fontSize: 13, fontWeight: 600, cursor: step === total ? 'not-allowed' : 'pointer' }}
        >
          {step === total ? '완료!' : '다음'}
        </button>
      </div>
      <div style={{ marginTop: 10, fontSize: 11, color: '#94a3b8', textAlign: 'center' }}>Ant Design Steps 패턴 — 프로젝트 생성 멀티스텝 위저드</div>
    </div>
  )
}

export const Ant_멀티스텝_위저드_네비게이션: Story = {
  name: 'Ant Design - 멀티스텝 위저드 PageNumber',
  parameters: {
    docs: {
      description: {
        story: 'Ant Design Steps 컴포넌트 패턴. PageNumber로 현재 단계/전체 단계를 표시하고, 이전/다음 버튼으로 스텝을 전환합니다. 프로젝트 생성, 온보딩, 결제 플로우 등에 활용됩니다.',
      },
    },
  },
  render: () => <AntDesignStepperRender />,
}

const ANT_GALLERY_ITEMS = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  title: `컴포넌트 ${i + 1}`,
  category: ['Button', 'Input', 'Badge', 'Tab', 'Modal', 'Toast'][i % 6],
  color: ['#6366f1', '#f59e0b', '#22c55e', '#ef4444', '#0ea5e9', '#ec4899'][i % 6],
}))
const ANT_PAGE_SIZE = 6

const AntGalleryPaginationRender = () => {
  const [page, setPage] = useState(1)
  const total = Math.ceil(ANT_GALLERY_ITEMS.length / ANT_PAGE_SIZE)
  const items = ANT_GALLERY_ITEMS.slice((page - 1) * ANT_PAGE_SIZE, page * ANT_PAGE_SIZE)

  return (
    <div style={{ width: 380, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 20 }}>
        {items.map((item) => (
          <div key={item.id} style={{ aspectRatio: '1', borderRadius: 12, background: item.color + '15', border: `1px solid ${item.color}30`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 800 }}>{item.id}</div>
            <div style={{ fontSize: 10, color: item.color, fontWeight: 700 }}>{item.category}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          style={{ padding: '5px 10px', borderRadius: 6, border: '1px solid #e2e8f0', background: '#fff', fontSize: 12, cursor: page === 1 ? 'not-allowed' : 'pointer', opacity: page === 1 ? 0.4 : 1 }}
        >{'<'}</button>
        <PageNumber current={page} total={total} />
        <button
          onClick={() => setPage(p => Math.min(total, p + 1))}
          disabled={page === total}
          style={{ padding: '5px 10px', borderRadius: 6, border: '1px solid #e2e8f0', background: '#fff', fontSize: 12, cursor: page === total ? 'not-allowed' : 'pointer', opacity: page === total ? 0.4 : 1 }}
        >{'>'}</button>
      </div>
      <div style={{ marginTop: 8, fontSize: 11, color: '#94a3b8', textAlign: 'center' }}>Ant Design Pagination + 갤러리 그리드 패턴</div>
    </div>
  )
}

export const Ant_갤러리_그리드_페이지네이션: Story = {
  name: 'Ant Design - 갤러리 그리드 PageNumber',
  parameters: {
    docs: {
      description: {
        story: 'Ant Design Pagination의 갤러리 그리드 패턴. 24개 컴포넌트 카드를 6개씩 나눠 4페이지로 표시합니다. 이미지 갤러리, 컴포넌트 카탈로그, 상품 그리드 등의 페이지네이션에 활용됩니다.',
      },
    },
  },
  render: () => <AntGalleryPaginationRender />,
}

/* --------------------------------------------------------------------------
   shadcn/ui 벤치마크: 블로그/문서 아티클 목록 페이지네이션
   shadcn Pagination 패턴 — 이전/다음 + 페이지 번호 + 생략(...) 조합
-------------------------------------------------------------------------- */
const SHADCN_ARTICLES = Array.from({ length: 48 }, (_, i) => ({
  title: [
    'Design Token 계층 구조 완전 정복',
    'Radix UI Primitive 설계 철학',
    'Storybook 8 마이그레이션 가이드',
    'vanilla-extract로 타입 안전 CSS 작성',
    'Tailwind CSS v4 무엇이 바뀌었나',
    'shadcn/ui Copy-paste 패턴의 진화',
  ][i % 6],
  date: `2026-04-${String(10 - (i % 10)).padStart(2, '0')}`,
  category: ['Design', 'Dev', 'Tool', 'CSS', 'React'][i % 5],
}))

const PER_PAGE = 6

function buildPageNums(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  if (current <= 4) return [1, 2, 3, 4, 5, '...', total]
  if (current >= total - 3) return [1, '...', total - 4, total - 3, total - 2, total - 1, total]
  return [1, '...', current - 1, current, current + 1, '...', total]
}

const ShadcnArticlePaginationRender = () => {
  const [page, setPage] = useState(1)
  const totalPages = Math.ceil(SHADCN_ARTICLES.length / PER_PAGE)
  const items = SHADCN_ARTICLES.slice((page - 1) * PER_PAGE, page * PER_PAGE)
  const pageNums = buildPageNums(page, totalPages)

  return (
    <div style={{ width: 560, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ fontSize: 15, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>
        아티클 ({SHADCN_ARTICLES.length}건)
      </div>
      {/* 목록 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1, marginBottom: 20 }}>
        {items.map((article, i) => (
          <div
            key={i}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px 14px', borderRadius: 8, background: '#fff',
              border: '1px solid #f1f5f9',
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b', marginBottom: 2 }}>{article.title}</div>
              <div style={{ fontSize: 11, color: '#94a3b8' }}>{article.date}</div>
            </div>
            <span style={{
              fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20,
              background: '#f0f9ff', color: '#0284c7',
            }}>
              {article.category}
            </span>
          </div>
        ))}
      </div>
      {/* 페이지네이션 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'center' }}>
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          style={{ padding: '5px 10px', borderRadius: 6, border: '1px solid #e2e8f0', background: '#fff', fontSize: 12, cursor: page === 1 ? 'not-allowed' : 'pointer', opacity: page === 1 ? 0.4 : 1 }}
        >
          이전
        </button>
        {pageNums.map((n, i) =>
          n === '...'
            ? <span key={`ellipsis-${i}`} style={{ width: 28, textAlign: 'center', fontSize: 12, color: '#94a3b8' }}>...</span>
            : <div key={n} onClick={() => setPage(n as number)} style={{ cursor: "pointer" }}><PageNumber current={n === page ? 1 : 0} total={1}>{n}</PageNumber></div>
        )}
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          style={{ padding: '5px 10px', borderRadius: 6, border: '1px solid #e2e8f0', background: '#fff', fontSize: 12, cursor: page === totalPages ? 'not-allowed' : 'pointer', opacity: page === totalPages ? 0.4 : 1 }}
        >
          다음
        </button>
      </div>
      <div style={{ textAlign: 'center', fontSize: 11, color: '#94a3b8', marginTop: 8 }}>
        {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, SHADCN_ARTICLES.length)} / {SHADCN_ARTICLES.length}건
      </div>
    </div>
  )
}

export const Shadcn_아티클_목록_페이지네이션: Story = {
  name: 'shadcn/ui - 아티클 목록 페이지네이션',
  parameters: {
    docs: {
      description: {
        story:
          'shadcn/ui Pagination 패턴. 48개 아티클을 6개씩 나눠 8페이지로 표시합니다. ' +
          '생략(..​.) 처리와 이전/다음 버튼이 포함된 실무형 페이지네이션입니다.',
      },
    },
  },
  render: () => <ShadcnArticlePaginationRender />,
}

/* --------------------------------------------------------------------------
   Vercel Design 벤치마크: 배포 로그 페이지네이션
   Vercel Dashboard 스타일 — 컴팩트 테이블 + 페이지 번호 패턴
-------------------------------------------------------------------------- */
type DeployLog = { id: string; env: string; status: string; branch: string; time: string; dur: string }

const DEPLOY_LOGS: DeployLog[] = Array.from({ length: 30 }, (_, i) => ({
  id: `deploy_${(Math.abs(Math.sin(i) * 1e9) | 0).toString(16).slice(0, 8)}`,
  env: ['Production', 'Preview', 'Preview', 'Development', 'Preview'][i % 5],
  status: ['Ready', 'Building', 'Error', 'Ready', 'Ready'][i % 5],
  branch: ['main', 'feat/token-v3', 'fix/tooltip', 'develop', 'chore/deps'][i % 5],
  time: `${(i % 12) + 1}시간 전`,
  dur: `${20 + (i % 40)}s`,
}))

const STATUS_STYLE: Record<string, { color: string; bg: string }> = {
  Ready: { color: '#16a34a', bg: '#f0fdf4' },
  Building: { color: '#d97706', bg: '#fffbeb' },
  Error: { color: '#dc2626', bg: '#fef2f2' },
}

const LOGS_PER_PAGE = 8

const VercelDeployLogRender = () => {
  const [page, setPage] = useState(1)
  const total = Math.ceil(DEPLOY_LOGS.length / LOGS_PER_PAGE)
  const logs = DEPLOY_LOGS.slice((page - 1) * LOGS_PER_PAGE, page * LOGS_PER_PAGE)

  return (
    <div style={{ width: 620, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>배포 로그</div>
        <div style={{ fontSize: 12, color: '#94a3b8' }}>{DEPLOY_LOGS.length}건 · 페이지 {page}/{total}</div>
      </div>
      {/* 테이블 */}
      <div style={{ borderRadius: 10, border: '1px solid #e2e8f0', overflow: 'hidden', marginBottom: 14 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '160px 100px 80px 1fr 80px 60px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
          {['배포 ID', '환경', '상태', '브랜치', '시간', '빌드'].map((h) => (
            <div key={h} style={{ padding: '8px 12px', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</div>
          ))}
        </div>
        {logs.map((log, i) => {
          const st = STATUS_STYLE[log.status] ?? { color: '#64748b', bg: '#f8fafc' }
          return (
            <div key={log.id} style={{ display: 'grid', gridTemplateColumns: '160px 100px 80px 1fr 80px 60px', borderBottom: i < logs.length - 1 ? '1px solid #f8fafc' : 'none', background: '#fff', alignItems: 'center' }}>
              <div style={{ padding: '10px 12px', fontSize: 11, fontFamily: 'monospace', color: '#6366f1' }}>{log.id}</div>
              <div style={{ padding: '10px 12px', fontSize: 11, color: '#475569' }}>{log.env}</div>
              <div style={{ padding: '10px 12px' }}>
                <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 20, color: st.color, background: st.bg }}>{log.status}</span>
              </div>
              <div style={{ padding: '10px 12px', fontSize: 11, color: '#64748b', fontFamily: 'monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{log.branch}</div>
              <div style={{ padding: '10px 12px', fontSize: 11, color: '#94a3b8' }}>{log.time}</div>
              <div style={{ padding: '10px 12px', fontSize: 11, color: '#94a3b8', fontVariantNumeric: 'tabular-nums' }}>{log.dur}</div>
            </div>
          )
        })}
      </div>
      {/* 페이지네이션 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'center' }}>
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          style={{ padding: '5px 10px', borderRadius: 6, border: '1px solid #e2e8f0', background: '#fff', fontSize: 11, cursor: page === 1 ? 'not-allowed' : 'pointer', opacity: page === 1 ? 0.4 : 1 }}
        >
          이전
        </button>
        {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
          <div key={n} onClick={() => setPage(n)} style={{ cursor: 'pointer' }}>
            <PageNumber current={n === page ? 1 : 0} total={1}>{n}</PageNumber>
          </div>
        ))}
        <button
          onClick={() => setPage((p) => Math.min(total, p + 1))}
          disabled={page === total}
          style={{ padding: '5px 10px', borderRadius: 6, border: '1px solid #e2e8f0', background: '#fff', fontSize: 11, cursor: page === total ? 'not-allowed' : 'pointer', opacity: page === total ? 0.4 : 1 }}
        >
          다음
        </button>
      </div>
    </div>
  )
}

export const Vercel_배포_로그_페이지네이션: Story = {
  name: 'Vercel Design - 배포 로그 컴팩트 페이지네이션',
  parameters: {
    docs: {
      description: {
        story:
          'Vercel Dashboard 배포 로그 패턴. 30건의 배포 기록을 8개씩 나눠 표시합니다. ' +
          '컴팩트 테이블 + 상태 배지 + PageNumber 페이지네이션을 조합한 실무 패턴.',
      },
    },
  },
  render: () => <VercelDeployLogRender />,
}

/* --------------------------------------------------------------------------
   shadcn/ui 벤치마크: 댓글 스레드 무한 스크롤 대안 페이지네이션
   shadcn DataTable 패턴 — "더 보기" 버튼과 페이지 번호 혼합 방식
-------------------------------------------------------------------------- */
const SHADCN_COMMENTS = Array.from({ length: 35 }, (_, i) => ({
  author: ['Heejun', 'Sora', 'Jaewon', 'Minji', 'Taeho'][i % 5],
  avatar: ['HJ', 'SR', 'JW', 'MJ', 'TH'][i % 5],
  color: ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][i % 5],
  text: [
    'Design Token 구조가 훨씬 명확해졌네요!',
    '스토리북 자동 배포 정말 편리합니다.',
    '컴포넌트 조합 패턴 잘 정리되어 있어요.',
    'Radix 접근성 패턴 적용이 인상적입니다.',
    'vanilla-extract 타입 안전성이 좋네요.',
  ][i % 5],
  time: `${i + 1}분 전`,
  likes: (i * 7) % 23,
}))

const COMMENT_PAGE_SIZE = 5

const ShadcnCommentPaginationRender = () => {
  const [page, setPage] = useState(1)
  const total = Math.ceil(SHADCN_COMMENTS.length / COMMENT_PAGE_SIZE)
  const comments = SHADCN_COMMENTS.slice((page - 1) * COMMENT_PAGE_SIZE, page * COMMENT_PAGE_SIZE)

  return (
    <div style={{ width: 480, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 14 }}>
        댓글 {SHADCN_COMMENTS.length}개
      </div>
      {/* 댓글 목록 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
        {comments.map((c, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, padding: '14px', borderRadius: 10, border: '1px solid #f1f5f9', background: '#fff' }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
              {c.avatar}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>{c.author}</span>
                <span style={{ fontSize: 11, color: '#94a3b8' }}>{c.time}</span>
              </div>
              <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.5 }}>{c.text}</div>
              <div style={{ marginTop: 6, fontSize: 11, color: '#94a3b8' }}>
                좋아요 {c.likes}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* 페이지네이션 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'center' }}>
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          style={{ padding: '5px 10px', borderRadius: 6, border: '1px solid #e2e8f0', background: '#fff', fontSize: 11, cursor: page === 1 ? 'not-allowed' : 'pointer', opacity: page === 1 ? 0.4 : 1 }}
        >
          이전
        </button>
        {buildPageNums(page, total).map((n, i) =>
          n === '...'
            ? <span key={`e-${i}`} style={{ width: 24, textAlign: 'center', fontSize: 11, color: '#94a3b8' }}>...</span>
            : <div key={n} onClick={() => setPage(n as number)} style={{ cursor: "pointer" }}><PageNumber current={n === page ? 1 : 0} total={1}>{n}</PageNumber></div>
        )}
        <button
          onClick={() => setPage((p) => Math.min(total, p + 1))}
          disabled={page === total}
          style={{ padding: '5px 10px', borderRadius: 6, border: '1px solid #e2e8f0', background: '#fff', fontSize: 11, cursor: page === total ? 'not-allowed' : 'pointer', opacity: page === total ? 0.4 : 1 }}
        >
          다음
        </button>
      </div>
    </div>
  )
}

export const Shadcn_댓글_스레드_페이지네이션: Story = {
  name: 'shadcn/ui - 댓글 스레드 페이지네이션',
  parameters: {
    docs: {
      description: {
        story:
          'shadcn/ui 댓글 목록 패턴. 35개 댓글을 5개씩 나눠 7페이지로 표시합니다. ' +
          '아바타 + 이름 + 내용 + 좋아요 조합의 댓글 카드와 PageNumber 페이지네이션.',
      },
    },
  },
  render: () => <ShadcnCommentPaginationRender />,
}

// ============================================================
// Cycle 132 — Linear Design + Vercel Design 벤치마크 반영
// ============================================================

// Linear 스타일 — 이슈 목록 컴팩트 페이지네이션 (미니멀, 밀도 높은 UI)
const LINEAR_ISSUES = Array.from({ length: 48 }, (_, i) => ({
  id: `ORB-${1024 - i}`,
  title: ['Button 토큰 시스템 리팩터링', 'Tooltip 접근성 개선', 'DataTable 정렬 버그', 'Modal 포커스 트랩', 'Space 컴포넌트 문서화', 'Carousel 터치 지원', 'Badge 색상 확장', 'Select 키보드 내비게이션', 'Form 유효성 검사 패턴', 'Icon 사이즈 스펙 정리'][i % 10],
  priority: (['urgent', 'high', 'medium', 'low'] as const)[i % 4],
  status: (['backlog', 'todo', 'in-progress', 'done'] as const)[i % 4],
}))

const PRIORITY_DOT: Record<string, string> = {
  urgent: '#ef4444', high: '#f97316', medium: '#3b82f6', low: '#94a3b8',
}

const STATUS_LABEL: Record<string, { label: string; color: string }> = {
  backlog: { label: '백로그', color: '#94a3b8' },
  todo: { label: '할 일', color: '#3b82f6' },
  'in-progress': { label: '진행 중', color: '#f59e0b' },
  done: { label: '완료', color: '#22c55e' },
}

const PAGE_SIZE_LINEAR = 8

function LinearIssueListPaginationRender() {
  const [page, setPage] = useState(1)
  const total = Math.ceil(LINEAR_ISSUES.length / PAGE_SIZE_LINEAR)
  const items = LINEAR_ISSUES.slice((page - 1) * PAGE_SIZE_LINEAR, page * PAGE_SIZE_LINEAR)
  return (
    <div style={{ width: 520, fontFamily: 'system-ui, sans-serif' }}>
      {/* 헤더 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>이슈 목록</span>
        <span style={{ fontSize: 12, color: '#94a3b8' }}>{LINEAR_ISSUES.length}개</span>
      </div>
      {/* 이슈 목록 */}
      <div style={{ border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden' }}>
        {items.map((issue, i) => (
          <div key={issue.id} style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px',
            borderBottom: i < items.length - 1 ? '1px solid #f1f5f9' : 'none',
            background: '#fff',
          }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: PRIORITY_DOT[issue.priority], flexShrink: 0 }} />
            <span style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'monospace', width: 70, flexShrink: 0 }}>{issue.id}</span>
            <span style={{ flex: 1, fontSize: 13, color: '#1e293b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{issue.title}</span>
            <span style={{
              fontSize: 11, padding: '2px 7px', borderRadius: 99, fontWeight: 500,
              background: STATUS_LABEL[issue.status].color + '18',
              color: STATUS_LABEL[issue.status].color,
            }}>
              {STATUS_LABEL[issue.status].label}
            </span>
          </div>
        ))}
      </div>
      {/* 페이지네이션 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
        <span style={{ fontSize: 11, color: '#94a3b8' }}>
          {(page - 1) * PAGE_SIZE_LINEAR + 1}–{Math.min(page * PAGE_SIZE_LINEAR, LINEAR_ISSUES.length)} / {LINEAR_ISSUES.length}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            style={{ padding: '4px 8px', fontSize: 11, borderRadius: 5, border: '1px solid #e2e8f0', background: '#fff', cursor: page === 1 ? 'not-allowed' : 'pointer', opacity: page === 1 ? 0.4 : 1 }}
          >
            ‹
          </button>
          {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
            <div key={n} onClick={() => setPage(n)} style={{ cursor: 'pointer' }}>
              <PageNumber current={n === page ? 1 : 0} total={1}>{n}</PageNumber>
            </div>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(total, p + 1))}
            disabled={page === total}
            style={{ padding: '4px 8px', fontSize: 11, borderRadius: 5, border: '1px solid #e2e8f0', background: '#fff', cursor: page === total ? 'not-allowed' : 'pointer', opacity: page === total ? 0.4 : 1 }}
          >
            ›
          </button>
        </div>
        <PageNumber current={page} total={total} />
      </div>
    </div>
  )
}

export const Linear_이슈_목록_컴팩트_페이지네이션: Story = {
  name: 'Linear - 이슈 목록 컴팩트 페이지네이션',
  parameters: {
    docs: {
      description: {
        story:
          'Linear의 컴팩트 밀도 UI 패턴. 48개 이슈를 8개씩 페이지 분할. ' +
          '우선순위 색상 도트 + ID + 제목 + 상태 배지 조합. PageNumber current/total 동시 활용.',
      },
    },
  },
  render: () => <LinearIssueListPaginationRender />,
}

// Vercel 스타일 — 배포 이력 무한 스크롤 페이지네이션
const VERCEL_DEPLOYS = Array.from({ length: 30 }, (_, i) => ({
  id: `dpl_${Math.random().toString(36).slice(2, 10)}`,
  branch: ['main', 'feat/tokens', 'fix/tooltip', 'chore/deps', 'feat/carousel'][i % 5],
  sha: Math.random().toString(16).slice(2, 9),
  time: `${i * 3 + 1}분 전`,
  status: (['ready', 'ready', 'ready', 'error', 'building'] as const)[i % 5],
  duration: `${20 + (i % 8) * 7}s`,
}))

const DEPLOY_STATUS_COLOR: Record<string, string> = {
  ready: '#22c55e', error: '#ef4444', building: '#f59e0b',
}

function VercelDeployHistoryRender() {
  const [page, setPage] = useState(1)
  const pageSize = 6
  const total = Math.ceil(VERCEL_DEPLOYS.length / pageSize)
  const items = VERCEL_DEPLOYS.slice((page - 1) * pageSize, page * pageSize)
  return (
    <div style={{ width: 540, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>배포 이력</span>
        <PageNumber current={page} total={total} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map((d) => (
          <div key={d.id} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px',
            borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff',
          }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: DEPLOY_STATUS_COLOR[d.status], flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{d.branch}</div>
              <div style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'monospace', marginTop: 1 }}>{d.sha}</div>
            </div>
            <span style={{ fontSize: 11, color: '#64748b' }}>{d.duration}</span>
            <span style={{ fontSize: 11, color: '#94a3b8' }}>{d.time}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 16 }}>
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          style={{ padding: '6px 14px', fontSize: 12, borderRadius: 6, border: '1px solid #e2e8f0', background: page === 1 ? '#f8fafc' : '#fff', color: page === 1 ? '#94a3b8' : '#0f172a', cursor: page === 1 ? 'not-allowed' : 'pointer' }}
        >
          이전
        </button>
        {Array.from({ length: Math.min(total, 5) }, (_, i) => {
          const n = Math.max(1, Math.min(page - 2, total - 4)) + i
          return n <= total ? (
            <div key={n} onClick={() => setPage(n)} style={{ cursor: 'pointer' }}>
              <PageNumber current={n === page ? 1 : 0} total={1}>{n}</PageNumber>
            </div>
          ) : null
        })}
        <button
          onClick={() => setPage((p) => Math.min(total, p + 1))}
          disabled={page === total}
          style={{ padding: '6px 14px', fontSize: 12, borderRadius: 6, border: '1px solid #e2e8f0', background: page === total ? '#f8fafc' : '#fff', color: page === total ? '#94a3b8' : '#0f172a', cursor: page === total ? 'not-allowed' : 'pointer' }}
        >
          다음
        </button>
      </div>
    </div>
  )
}

export const Vercel_배포_이력_페이지네이션: Story = {
  name: 'Vercel Design - 배포 이력 페이지네이션',
  parameters: {
    docs: {
      description: {
        story:
          'Vercel 대시보드 스타일. 30개 배포 이력을 6개씩 분할. ' +
          '상태 도트 + 브랜치 + SHA + 소요시간 카드. 슬라이딩 윈도우 페이지 번호.',
      },
    },
  },
  render: () => <VercelDeployHistoryRender />,
}

// Linear + Vercel — 프로젝트 파일 탐색기 페이지네이션
type FileItem132 = { name: string; type: 'folder' | 'file'; ext: string; size: string; modified: string }
const REPO_FILES_132: FileItem132[] = [
  { name: 'packages', type: 'folder', ext: '', size: '—', modified: '2시간 전' },
  { name: 'config', type: 'folder', ext: '', size: '—', modified: '1일 전' },
  { name: '.storybook', type: 'folder', ext: '', size: '—', modified: '3일 전' },
  { name: 'package.json', type: 'file', ext: 'json', size: '2.1 KB', modified: '2시간 전' },
  { name: 'pnpm-workspace.yaml', type: 'file', ext: 'yaml', size: '0.4 KB', modified: '5일 전' },
  { name: 'tsconfig.json', type: 'file', ext: 'json', size: '1.2 KB', modified: '1주 전' },
  { name: 'CLAUDE.md', type: 'file', ext: 'md', size: '8.7 KB', modified: '3시간 전' },
  { name: 'BenchmarkComparison.mdx', type: 'file', ext: 'mdx', size: '12.4 KB', modified: '1시간 전' },
  { name: '.eslintrc.js', type: 'file', ext: 'js', size: '0.8 KB', modified: '2주 전' },
  { name: '.prettierrc', type: 'file', ext: '', size: '0.2 KB', modified: '2주 전' },
  { name: 'turbo.json', type: 'file', ext: 'json', size: '1.0 KB', modified: '1일 전' },
  { name: 'vitest.config.ts', type: 'file', ext: 'ts', size: '0.6 KB', modified: '4일 전' },
]

const EXT_COLOR: Record<string, string> = {
  json: '#22c55e', ts: '#3b82f6', js: '#f59e0b', yaml: '#8b5cf6', md: '#6366f1', mdx: '#ec4899',
}

function LinearVercelFileBrowserRender() {
  const [page, setPage] = useState(1)
  const pageSize = 5
  const total = Math.ceil(REPO_FILES_132.length / pageSize)
  const items = REPO_FILES_132.slice((page - 1) * pageSize, page * pageSize)
  return (
    <div style={{ width: 480, fontFamily: 'system-ui, sans-serif', border: '1px solid #e2e8f0', borderRadius: 10, overflow: 'hidden' }}>
      {/* 헤더 */}
      <div style={{ padding: '10px 14px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>orbit-ui / root</span>
        <PageNumber current={page} total={total} />
      </div>
      {/* 파일 목록 */}
      {items.map((f, i) => (
        <div key={f.name} style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '9px 14px',
          borderBottom: i < items.length - 1 ? '1px solid #f8fafc' : 'none',
          background: '#fff',
        }}>
          <span style={{ fontSize: 16 }}>{f.type === 'folder' ? '📁' : '📄'}</span>
          <span style={{ flex: 1, fontSize: 13, color: '#0f172a', fontWeight: f.type === 'folder' ? 600 : 400 }}>{f.name}</span>
          {f.ext && (
            <span style={{ fontSize: 10, padding: '1px 6px', borderRadius: 4, background: (EXT_COLOR[f.ext] || '#94a3b8') + '18', color: EXT_COLOR[f.ext] || '#94a3b8', fontFamily: 'monospace', fontWeight: 600 }}>
              {f.ext}
            </span>
          )}
          <span style={{ fontSize: 11, color: '#94a3b8', width: 48, textAlign: 'right' }}>{f.size}</span>
          <span style={{ fontSize: 11, color: '#94a3b8', width: 64, textAlign: 'right' }}>{f.modified}</span>
        </div>
      ))}
      {/* 페이지네이션 */}
      <div style={{ padding: '8px 14px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'center', gap: 4 }}>
        {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
          <div key={n} onClick={() => setPage(n)} style={{ cursor: 'pointer' }}>
            <PageNumber current={n === page ? 1 : 0} total={1}>{n}</PageNumber>
          </div>
        ))}
      </div>
    </div>
  )
}

export const Linear_Vercel_파일_탐색기_페이지네이션: Story = {
  name: 'Linear + Vercel - 파일 탐색기 페이지네이션',
  parameters: {
    docs: {
      description: {
        story:
          'Linear 컴팩트 + Vercel 모노크롬 스타일 결합. 12개 파일을 5개씩 분할. ' +
          '폴더/파일 타입 구분, 확장자 컬러 배지, 수정 시간 표시. PageNumber 헤더+푸터 동시 사용.',
      },
    },
  },
  render: () => <LinearVercelFileBrowserRender />,
}

/* --------------------------------------------------------------------------
   Cycle 159 — Vercel Design + Ant Design
   Vercel: 배포 인스턴스 리전별 페이지네이션 패턴
-------------------------------------------------------------------------- */
const VERCEL_REGIONS = ['iad1', 'sfo1', 'sin1', 'hnd1', 'fra1']
const VERCEL_LOG_ITEMS = Array.from({ length: 47 }, (_, i) => ({
  id: `log-${i + 1}`,
  region: VERCEL_REGIONS[i % VERCEL_REGIONS.length],
  status: i % 7 === 0 ? 'error' : i % 3 === 0 ? 'warning' : 'success',
  message: `Function invocation ${i + 1} completed`,
  duration: Math.floor(Math.random() * 500 + 50) + 'ms',
  timestamp: `${String(Math.floor(i / 4)).padStart(2, '0')}:${String((i * 15) % 60).padStart(2, '0')}`,
}))

const VERCEL_PAGE_SIZE = 8

function VercelRegionLogPaginationRender() {
  const [page, setPage] = useState(1)
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)

  const filtered = selectedRegion ? VERCEL_LOG_ITEMS.filter(l => l.region === selectedRegion) : VERCEL_LOG_ITEMS
  const totalPages = Math.ceil(filtered.length / VERCEL_PAGE_SIZE)
  const currentItems = filtered.slice((page - 1) * VERCEL_PAGE_SIZE, page * VERCEL_PAGE_SIZE)

  const handleRegion = (r: string | null) => { setSelectedRegion(r); setPage(1) }

  const STATUS_COLOR: Record<string, string> = { success: '#22c55e', warning: '#f59e0b', error: '#ef4444' }

  return (
    <div style={{ width: 460, fontFamily: 'system-ui, sans-serif', background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0' }}>
      <div style={{ padding: '14px 16px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>함수 실행 로그</span>
        <span style={{ fontSize: 11, color: '#94a3b8' }}>{filtered.length}개</span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
          <button onClick={() => handleRegion(null)} style={{ padding: '3px 8px', fontSize: 10, borderRadius: 5, border: `1px solid ${!selectedRegion ? '#1e293b' : '#e2e8f0'}`, background: !selectedRegion ? '#1e293b' : '#fff', color: !selectedRegion ? '#fff' : '#64748b', cursor: 'pointer', fontWeight: 600 }}>ALL</button>
          {VERCEL_REGIONS.map(r => (
            <button key={r} onClick={() => handleRegion(r)} style={{ padding: '3px 7px', fontSize: 10, borderRadius: 5, border: `1px solid ${selectedRegion === r ? '#1e293b' : '#e2e8f0'}`, background: selectedRegion === r ? '#1e293b' : '#fff', color: selectedRegion === r ? '#fff' : '#64748b', cursor: 'pointer', fontFamily: 'monospace', fontWeight: 600 }}>{r}</button>
          ))}
        </div>
      </div>
      <div style={{ minHeight: 240 }}>
        {currentItems.map(item => (
          <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 16px', borderBottom: '1px solid #f8fafc' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: STATUS_COLOR[item.status], flexShrink: 0 }} />
            <span style={{ fontSize: 10, color: '#94a3b8', fontFamily: 'monospace', width: 40 }}>{item.timestamp}</span>
            <span style={{ fontSize: 10, padding: '1px 5px', borderRadius: 3, background: '#f1f5f9', color: '#475569', fontFamily: 'monospace', flexShrink: 0 }}>{item.region}</span>
            <span style={{ flex: 1, fontSize: 11, color: '#1e293b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.message}</span>
            <span style={{ fontSize: 10, color: '#94a3b8', flexShrink: 0 }}>{item.duration}</span>
          </div>
        ))}
      </div>
      <div style={{ padding: '12px 16px', borderTop: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: 8 }}>
        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{ padding: '4px 10px', fontSize: 11, borderRadius: 6, border: '1px solid #e2e8f0', background: '#fff', color: '#64748b', cursor: page === 1 ? 'not-allowed' : 'pointer', opacity: page === 1 ? 0.4 : 1 }}>이전</button>
        <PageNumber current={page} total={totalPages} />
        <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={{ padding: '4px 10px', fontSize: 11, borderRadius: 6, border: '1px solid #e2e8f0', background: '#fff', color: '#64748b', cursor: page === totalPages ? 'not-allowed' : 'pointer', opacity: page === totalPages ? 0.4 : 1 }}>다음</button>
        <span style={{ marginLeft: 'auto', fontSize: 11, color: '#94a3b8' }}>리전: {selectedRegion ?? '전체'}</span>
      </div>
    </div>
  )
}

export const Vercel_리전별_로그_페이지네이션: Story = {
  name: 'Vercel Design — 리전별 함수 실행 로그 페이지네이션',
  parameters: {
    docs: {
      description: {
        story: 'Vercel Design의 Function Log 패턴. 리전 필터 + PageNumber로 서버리스 함수 실행 로그를 페이지네이션합니다.',
      },
    },
  },
  render: () => <VercelRegionLogPaginationRender />,
}

/* --------------------------------------------------------------------------
   Ant Design: 데이터 테이블 페이지네이션 패턴
-------------------------------------------------------------------------- */
const ANT_TABLE_DATA = Array.from({ length: 63 }, (_, i) => ({
  key: `user-${i + 1}`,
  name: ['김민준', '이서연', '박지후', '최수아', '정도윤', '윤채원', '임주원', '한서진', '오지우', '신예린'][i % 10],
  role: ['개발자', '디자이너', 'PM', '마케터', 'QA'][i % 5],
  status: i % 4 === 0 ? 'inactive' : 'active',
  joined: `2024-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
}))

const ANT_TABLE_PAGE_SIZE = 7

function AntTablePaginationRender() {
  const [page, setPage] = useState(1)
  const totalPages = Math.ceil(ANT_TABLE_DATA.length / ANT_TABLE_PAGE_SIZE)
  const rows = ANT_TABLE_DATA.slice((page - 1) * ANT_TABLE_PAGE_SIZE, page * ANT_TABLE_PAGE_SIZE)

  return (
    <div style={{ width: 480, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#1e293b' }}>팀원 목록</span>
        <span style={{ fontSize: 11, color: '#94a3b8' }}>총 {ANT_TABLE_DATA.length}명</span>
      </div>
      <div style={{ border: '1px solid #e2e8f0', borderRadius: 10, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
          <thead>
            <tr style={{ background: '#f8fafc' }}>
              {['이름', '역할', '상태', '가입일'].map(h => (
                <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.key} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '8px 12px', color: '#1e293b', fontWeight: 500 }}>{row.name}</td>
                <td style={{ padding: '8px 12px', color: '#475569' }}>{row.role}</td>
                <td style={{ padding: '8px 12px' }}>
                  <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 4, background: row.status === 'active' ? '#f0fdf4' : '#f8fafc', color: row.status === 'active' ? '#22c55e' : '#94a3b8', fontWeight: 700 }}>
                    {row.status === 'active' ? '활성' : '비활성'}
                  </span>
                </td>
                <td style={{ padding: '8px 12px', color: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }}>{row.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'space-between', background: '#fff', borderTop: '1px solid #f1f5f9' }}>
          <span style={{ fontSize: 11, color: '#94a3b8' }}>{(page - 1) * ANT_TABLE_PAGE_SIZE + 1}–{Math.min(page * ANT_TABLE_PAGE_SIZE, ANT_TABLE_DATA.length)} / {ANT_TABLE_DATA.length}명</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{ padding: '3px 8px', fontSize: 11, borderRadius: 5, border: '1px solid #e2e8f0', background: '#fff', cursor: page === 1 ? 'not-allowed' : 'pointer', opacity: page === 1 ? 0.4 : 1 }}>‹</button>
            <PageNumber current={page} total={totalPages} />
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={{ padding: '3px 8px', fontSize: 11, borderRadius: 5, border: '1px solid #e2e8f0', background: '#fff', cursor: page === totalPages ? 'not-allowed' : 'pointer', opacity: page === totalPages ? 0.4 : 1 }}>›</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Ant_데이터_테이블_페이지네이션: Story = {
  name: 'Ant Design — 데이터 테이블 페이지네이션 패턴',
  parameters: {
    docs: {
      description: {
        story: 'Ant Design의 Table Pagination 패턴. PageNumber로 사용자 목록 테이블의 페이지네이션을 구현합니다.',
      },
    },
  },
  render: () => <AntTablePaginationRender />,
}

/* --------------------------------------------------------------------------
   Vercel + Ant: 분석 대시보드 페이지네이션 복합 패턴
-------------------------------------------------------------------------- */
const DASHBOARD_METRICS = Array.from({ length: 28 }, (_, i) => ({
  id: i + 1,
  name: ['페이지뷰', '세션', '이탈률', '전환율', '체류시간', 'CLS', 'LCP', 'FID'][i % 8],
  value: Math.floor(Math.random() * 10000 + 500),
  change: (Math.random() * 40 - 20).toFixed(1),
  period: ['오늘', '이번 주', '이번 달'][i % 3],
}))

const DASHBOARD_PAGE_SIZE = 6

function VercelAntDashboardPaginationRender() {
  const [page, setPage] = useState(1)
  const totalPages = Math.ceil(DASHBOARD_METRICS.length / DASHBOARD_PAGE_SIZE)
  const items = DASHBOARD_METRICS.slice((page - 1) * DASHBOARD_PAGE_SIZE, page * DASHBOARD_PAGE_SIZE)

  return (
    <div style={{ width: 440, fontFamily: 'system-ui, sans-serif', background: '#0f172a', borderRadius: 14, overflow: 'hidden' }}>
      <div style={{ padding: '14px 18px', borderBottom: '1px solid #1e293b', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#f1f5f9' }}>성능 지표 대시보드</span>
        <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 4, background: '#1e293b', color: '#94a3b8', fontFamily: 'monospace' }}>실시간</span>
        <span style={{ marginLeft: 'auto', fontSize: 11, color: '#475569' }}>{DASHBOARD_METRICS.length}개 지표</span>
      </div>
      <div style={{ padding: '12px 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {items.map(m => {
          const isUp = parseFloat(m.change) >= 0
          return (
            <div key={m.id} style={{ padding: '12px 14px', borderRadius: 10, background: '#1e293b', border: '1px solid #334155' }}>
              <div style={{ fontSize: 10, color: '#64748b', marginBottom: 4 }}>{m.name} · {m.period}</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.03em' }}>{m.value.toLocaleString()}</div>
              <div style={{ fontSize: 11, color: isUp ? '#4ade80' : '#f87171', marginTop: 4 }}>{isUp ? '▲' : '▼'} {Math.abs(parseFloat(m.change))}%</div>
            </div>
          )
        })}
      </div>
      <div style={{ padding: '10px 16px', borderTop: '1px solid #1e293b', display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center' }}>
        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{ padding: '4px 10px', fontSize: 11, borderRadius: 6, border: '1px solid #334155', background: '#1e293b', color: '#64748b', cursor: page === 1 ? 'not-allowed' : 'pointer', opacity: page === 1 ? 0.4 : 1 }}>←</button>
        <PageNumber current={page} total={totalPages} />
        <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={{ padding: '4px 10px', fontSize: 11, borderRadius: 6, border: '1px solid #334155', background: '#1e293b', color: '#64748b', cursor: page === totalPages ? 'not-allowed' : 'pointer', opacity: page === totalPages ? 0.4 : 1 }}>→</button>
      </div>
    </div>
  )
}

export const Vercel_Ant_성능지표_대시보드_페이지네이션: Story = {
  name: 'Vercel + Ant Design — 성능 지표 대시보드 페이지네이션 패턴',
  parameters: {
    docs: {
      description: {
        story: 'Vercel Design + Ant Design 복합 패턴. 다크 대시보드에서 PageNumber로 성능 지표 카드 그리드를 페이지네이션합니다.',
      },
    },
  },
  render: () => <VercelAntDashboardPaginationRender />,
}
