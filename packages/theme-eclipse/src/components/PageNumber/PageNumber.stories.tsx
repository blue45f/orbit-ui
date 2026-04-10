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
