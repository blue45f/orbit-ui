import React, { useState, useEffect } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Flex } from '@heejun-com/core'

import { Progress } from './Progress'

const meta = {
  title: 'eclipse/Feedback/Progress',
  component: Progress,
  tags: ['autodocs'],
  args: {
    value: 50,
    size: 'medium',
    color: 'primary',
    indeterminate: false,
  },
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontSize: '13px', fontWeight: 600, color: '#64748b', letterSpacing: '-0.01em' }}>
    {children}
  </div>
)

const InteractiveProgress = (args: any) => {
  const [progress, setProgress] = useState(13)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Flex flexDirection="column" gap="2.5rem" style={{ width: '100%', maxWidth: '480px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <SectionLabel>Interactive (Auto-animate)</SectionLabel>
        <Progress {...args} value={progress} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <SectionLabel>Sizes</SectionLabel>
        <Flex flexDirection="column" gap="16px">
          <Progress size="small" value={30} />
          <Progress size="medium" value={50} />
          <Progress size="large" value={80} />
        </Flex>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <SectionLabel>Colors</SectionLabel>
        <Flex flexDirection="column" gap="16px">
          <Progress color="primary" value={70} />
          <Progress color="success" value={90} />
          <Progress color="warning" value={40} />
        </Flex>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <SectionLabel>Indeterminate (Loading)</SectionLabel>
        <Progress indeterminate />
      </div>
    </Flex>
  )
}

export const 기본: Story = {
  render: (args) => <InteractiveProgress {...args} />,
}

export const 사이즈: Story = {
  render: () => (
    <Flex flexDirection="column" gap="16px" style={{ width: '100%', maxWidth: '480px' }}>
      <Progress size="small" value={40} />
      <Progress size="medium" value={60} />
      <Progress size="large" value={80} />
    </Flex>
  ),
}

export const 색상: Story = {
  render: () => (
    <Flex flexDirection="column" gap="16px" style={{ width: '100%', maxWidth: '480px' }}>
      <Progress color="primary" value={60} />
      <Progress color="success" value={80} />
      <Progress color="warning" value={45} />
    </Flex>
  ),
}

export const 로딩: Story = {
  render: () => (
    <div style={{ width: '100%', maxWidth: '480px' }}>
      <Progress indeterminate />
    </div>
  ),
}

/* --------------------------------------------------------------------------
   단계별 진행 인터랙티브 데모
   Ant Design Steps 패턴: 이전/다음 버튼으로 단계를 이동하며 진행률 표시
-------------------------------------------------------------------------- */
const StepProgressRender = (args: any) => {
  const steps = [
    { label: '기본 정보', desc: '이름과 이메일을 입력합니다.' },
    { label: '계획 선택', desc: '사용할 플랜을 선택합니다.' },
    { label: '결제 수단', desc: '결제 정보를 입력합니다.' },
    { label: '완료', desc: '모든 설정이 완료되었습니다.' },
  ]
  const [current, setCurrent] = useState(0)
  const progress = Math.round((current / (steps.length - 1)) * 100)
  const isComplete = current === steps.length - 1

  return (
    <Flex flexDirection="column" gap="24px" style={{ width: '100%', maxWidth: '480px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>
            단계 {current + 1} / {steps.length}
          </span>
          <span style={{ fontSize: '13px', fontWeight: 700, color: isComplete ? '#10b981' : '#6366f1' }}>
            {progress}%
          </span>
        </div>
        <Progress
          {...args}
          value={progress}
          color={isComplete ? 'success' : 'primary'}
        />
      </div>

      <div style={{
        padding: '20px',
        borderRadius: '12px',
        border: '1.5px solid #e2e8f0',
        background: '#f8fafc',
      }}>
        <div style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>
          {steps[current].label}
        </div>
        <div style={{ fontSize: '13px', color: '#64748b' }}>{steps[current].desc}</div>
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={current === 0}
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            border: '1.5px solid #e2e8f0',
            background: current === 0 ? '#f1f5f9' : '#fff',
            color: current === 0 ? '#94a3b8' : '#1e293b',
            fontWeight: 600,
            fontSize: '13px',
            cursor: current === 0 ? 'not-allowed' : 'pointer',
          }}
        >
          이전
        </button>
        <button
          onClick={() => setCurrent((c) => Math.min(steps.length - 1, c + 1))}
          disabled={isComplete}
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            background: isComplete ? '#10b981' : '#6366f1',
            color: '#fff',
            fontWeight: 600,
            fontSize: '13px',
            cursor: isComplete ? 'default' : 'pointer',
          }}
        >
          {isComplete ? '완료!' : '다음'}
        </button>
        {current > 0 && !isComplete && (
          <button
            onClick={() => setCurrent(0)}
            style={{
              padding: '10px 16px',
              borderRadius: '8px',
              border: '1.5px solid #e2e8f0',
              background: '#fff',
              color: '#94a3b8',
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            처음으로
          </button>
        )}
      </div>
    </Flex>
  )
}

export const 단계별진행: Story = {
  render: (args) => <StepProgressRender {...args} />,
}

/* --------------------------------------------------------------------------
   상태 표현 (성공 / 에러 / 로딩)
   Ant Design Steps 패턴: 각 상태에 따른 색상 및 인디케이터 표현
-------------------------------------------------------------------------- */
const StatusProgressRender = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'warning'>('loading')

  return (
    <Flex flexDirection="column" gap="24px" style={{ width: '100%', maxWidth: '480px' }}>
      <div style={{ display: 'flex', gap: '8px' }}>
        {(['loading', 'success', 'warning'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: `1.5px solid ${status === s ? '#6366f1' : '#e2e8f0'}`,
              background: status === s ? '#6366f118' : '#fff',
              color: status === s ? '#6366f1' : '#64748b',
              fontWeight: 600,
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            {s}
          </button>
        ))}
      </div>

      <Flex flexDirection="column" gap="16px">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <SectionLabel>
            {status === 'loading' ? '업로드 중...' : status === 'success' ? '업로드 완료' : '업로드 경고'}
          </SectionLabel>
          {status === 'loading' ? (
            <Progress indeterminate />
          ) : (
            <Progress
              value={100}
              color={status === 'success' ? 'success' : 'warning'}
            />
          )}
        </div>

        <div style={{
          padding: '12px 16px',
          borderRadius: '10px',
          background: status === 'loading' ? '#f8fafc' : status === 'success' ? 'rgba(16,185,129,0.08)' : 'rgba(245,158,11,0.08)',
          border: `1px solid ${status === 'loading' ? '#e2e8f0' : status === 'success' ? '#10b981' : '#f59e0b'}`,
          fontSize: '13px',
          color: status === 'loading' ? '#64748b' : status === 'success' ? '#10b981' : '#f59e0b',
          fontWeight: 500,
        }}>
          {status === 'loading' && '파일을 서버에 업로드하고 있습니다...'}
          {status === 'success' && '3개 파일이 성공적으로 업로드되었습니다.'}
          {status === 'warning' && '2개 파일 업로드 중 권한 오류가 발생했습니다.'}
        </div>
      </Flex>
    </Flex>
  )
}

export const 상태표현: Story = {
  render: () => <StatusProgressRender />,
}

/* --------------------------------------------------------------------------
   Linear 스타일: 프로젝트 목록 진행률
   Linear의 팀/프로젝트 뷰에서 보여주는 컴팩트 프로젝트 진행 목록
-------------------------------------------------------------------------- */
const LinearProjectListRender = () => {
  const projects = [
    { name: 'Orbit UI Design System', progress: 72, color: 'primary' as const, issues: 18, total: 25 },
    { name: 'Dashboard Redesign', progress: 45, color: 'warning' as const, issues: 9, total: 20 },
    { name: 'Authentication Flow', progress: 100, color: 'success' as const, issues: 12, total: 12 },
    { name: 'Mobile App v2.0', progress: 28, color: 'primary' as const, issues: 7, total: 25 },
    { name: 'API Integration Layer', progress: 60, color: 'primary' as const, issues: 15, total: 25 },
  ]

  return (
    <div style={{ maxWidth: '520px', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
      <div
        style={{
          padding: '12px 16px',
          background: '#f8fafc',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', letterSpacing: '-0.01em' }}>
          Projects
        </span>
        <span style={{ fontSize: '11px', color: '#94a3b8' }}>{projects.length}개</span>
      </div>
      {projects.map((project, i) => (
        <div
          key={project.name}
          style={{
            padding: '12px 16px',
            borderBottom: i < projects.length - 1 ? '1px solid #f8fafc' : 'none',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span
              style={{
                fontSize: '13px',
                fontWeight: 500,
                color: project.progress === 100 ? '#94a3b8' : '#1e293b',
                textDecoration: project.progress === 100 ? 'line-through' : 'none',
              }}
            >
              {project.name}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                {project.issues}/{project.total}
              </span>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: project.progress === 100 ? '#10b981' : project.progress >= 60 ? '#6366f1' : '#f59e0b',
                  minWidth: '32px',
                  textAlign: 'right',
                }}
              >
                {project.progress}%
              </span>
            </div>
          </div>
          <Progress value={project.progress} color={project.color} size="small" />
        </div>
      ))}
    </div>
  )
}

export const Linear_프로젝트_목록: Story = {
  render: () => <LinearProjectListRender />,
}

/* --------------------------------------------------------------------------
   Linear 스타일: 사이클 번다운 차트 시뮬레이션
   Linear의 Cycle 뷰에서 볼 수 있는 진행률 + 통계 조합 패턴
-------------------------------------------------------------------------- */
const CycleBurndownRender = () => {
  const [day, setDay] = useState(5)
  const totalDays = 14
  const totalIssues = 32
  const completedIssues = Math.round((day / totalDays) * totalIssues * (0.8 + Math.random() * 0.2))
  const cycleProgress = Math.round((day / totalDays) * 100)
  const issueProgress = Math.round((completedIssues / totalIssues) * 100)
  const isOnTrack = issueProgress >= cycleProgress - 10

  return (
    <Flex flexDirection="column" gap="24px" style={{ maxWidth: '480px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>사이클 경과</span>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>
            Day {day} / {totalDays}
          </span>
        </div>
        <input
          type="range"
          min={1}
          max={totalDays}
          value={day}
          onChange={(e) => setDay(Number(e.target.value))}
          style={{ width: '100%', cursor: 'pointer' }}
        />
      </div>

      <div
        style={{
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          background: '#fff',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
              Sprint 12
            </div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '3px 8px',
                borderRadius: '6px',
                background: isOnTrack ? 'rgba(16,185,129,0.08)' : 'rgba(245,158,11,0.08)',
                fontSize: '11px',
                fontWeight: 700,
                color: isOnTrack ? '#10b981' : '#f59e0b',
              }}
            >
              {isOnTrack ? 'On Track' : 'At Risk'}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>
              {completedIssues}
            </div>
            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>
              / {totalIssues} issues done
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>시간 경과</span>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#6366f1' }}>{cycleProgress}%</span>
            </div>
            <Progress value={cycleProgress} color="primary" size="small" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>이슈 완료</span>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: isOnTrack ? '#10b981' : '#f59e0b',
                }}
              >
                {issueProgress}%
              </span>
            </div>
            <Progress
              value={issueProgress}
              color={isOnTrack ? 'success' : 'warning'}
              size="small"
            />
          </div>
        </div>
      </div>
    </Flex>
  )
}

export const Linear_사이클_번다운: Story = {
  render: () => <CycleBurndownRender />,
}

/* --------------------------------------------------------------------------
   Vercel 벤치마크: 빌드 파이프라인 진행 패턴
   Vercel build pipeline — 스테이지별 순차 진행 Progress UI
-------------------------------------------------------------------------- */
const BUILD_STAGES = [
  { id: 'install', label: '패키지 설치', duration: 2000 },
  { id: 'build', label: '빌드 실행', duration: 3000 },
  { id: 'optimize', label: '에셋 최적화', duration: 1500 },
  { id: 'deploy', label: '배포 완료', duration: 1000 },
]

function BuildPipelineRender() {
  const [stageProgress, setStageProgress] = useState<Record<string, number>>({})
  const [currentStage, setCurrentStage] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  const runBuild = () => {
    setStageProgress({})
    setDone(false)
    let stageIdx = 0

    const runStage = (idx: number) => {
      if (idx >= BUILD_STAGES.length) { setDone(true); setCurrentStage(null); return }
      const stage = BUILD_STAGES[idx]
      setCurrentStage(stage.id)
      const steps = 20
      let step = 0
      const interval = setInterval(() => {
        step++
        setStageProgress((prev) => ({ ...prev, [stage.id]: Math.round((step / steps) * 100) }))
        if (step >= steps) {
          clearInterval(interval)
          stageIdx++
          setTimeout(() => runStage(stageIdx), 200)
        }
      }, stage.duration / steps)
    }

    runStage(0)
  }

  return (
    <div style={{ maxWidth: 420 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>빌드 파이프라인</div>
        <button
          onClick={runBuild}
          disabled={currentStage !== null}
          style={{ padding: '6px 14px', borderRadius: 6, border: 'none', background: currentStage ? '#e2e8f0' : '#6366f1', color: currentStage ? '#94a3b8' : '#fff', fontSize: 12, fontWeight: 600, cursor: currentStage ? 'not-allowed' : 'pointer' }}
        >
          {currentStage ? '빌드 중...' : done ? '재실행' : '빌드 시작'}
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {BUILD_STAGES.map((stage) => {
          const progress = stageProgress[stage.id] ?? 0
          const isActive = currentStage === stage.id
          const isComplete = progress === 100
          return (
            <div key={stage.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: isActive ? '#6366f1' : isComplete ? '#10b981' : '#94a3b8' }}>
                  {isComplete ? '✓ ' : isActive ? '⟳ ' : '○ '}{stage.label}
                </span>
                <span style={{ fontSize: 11, color: '#94a3b8' }}>{progress}%</span>
              </div>
              <Progress
                value={progress}
                color={isComplete ? 'success' : isActive ? 'primary' : 'primary'}
                size="small"
              />
            </div>
          )
        })}
      </div>
      {done && (
        <div style={{ marginTop: 16, padding: '10px 14px', borderRadius: 8, background: '#f0fdf4', border: '1px solid #bbf7d0', fontSize: 13, color: '#16a34a', fontWeight: 600 }}>
          ✓ 배포 완료 — Production에 반영되었습니다.
        </div>
      )}
      <div style={{ marginTop: 12, fontSize: 11, color: '#94a3b8' }}>Vercel 빌드 파이프라인 패턴 — 스테이지별 순차 진행</div>
    </div>
  )
}

export const Vercel_빌드_파이프라인: Story = {
  name: 'Vercel - 빌드 파이프라인 진행 패턴',
  render: () => <BuildPipelineRender />,
}

/* --------------------------------------------------------------------------
   Notion 벤치마크: 페이지 완성도 트래커 패턴
   Notion 체크리스트 진행률 — 섹션별 완성도 시각화 UI
-------------------------------------------------------------------------- */
const PAGE_SECTIONS = [
  { id: 'intro', label: '소개', items: ['프로젝트 개요', '목표 설정', '팀 소개'], completed: [true, true, false] },
  { id: 'design', label: '디자인', items: ['와이어프레임', '프로토타입', '디자인 토큰', '컴포넌트 정의'], completed: [true, true, true, false] },
  { id: 'dev', label: '개발', items: ['환경 설정', '코어 컴포넌트', '테마 적용'], completed: [true, false, false] },
  { id: 'docs', label: '문서화', items: ['Storybook', 'MDX 가이드'], completed: [true, false] },
]

export const Notion_페이지_완성도: Story = {
  name: 'Notion - 페이지 완성도 트래커 패턴',
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>프로젝트 완성도</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {PAGE_SECTIONS.map((section) => {
          const completedCount = section.completed.filter(Boolean).length
          const pct = Math.round((completedCount / section.items.length) * 100)
          return (
            <div key={section.id} style={{ padding: '12px 14px', borderRadius: 10, border: '1px solid #f1f5f9', background: '#fafafa' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>{section.label}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: pct === 100 ? '#10b981' : '#94a3b8' }}>
                  {completedCount}/{section.items.length}
                </span>
              </div>
              <Progress value={pct} color={pct === 100 ? 'success' : pct > 50 ? 'primary' : 'warning'} size="small" />
              <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {section.items.map((item, i) => (
                  <span
                    key={item}
                    style={{
                      fontSize: 11,
                      padding: '2px 8px',
                      borderRadius: 12,
                      background: section.completed[i] ? '#6366f110' : '#f1f5f9',
                      color: section.completed[i] ? '#6366f1' : '#94a3b8',
                      fontWeight: section.completed[i] ? 600 : 400,
                    }}
                  >
                    {section.completed[i] ? '✓ ' : ''}{item}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
      <div style={{ marginTop: 12, fontSize: 11, color: '#94a3b8' }}>Notion 체크리스트 진행률 — 섹션별 완성도 시각화</div>
    </div>
  ),
}
