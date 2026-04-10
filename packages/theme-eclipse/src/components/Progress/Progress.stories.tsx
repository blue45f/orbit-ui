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

/* --------------------------------------------------------------------------
   Tailwind UI 벤치마크: 파일 배치 업로드 진행
   Tailwind UI의 multi-file upload 패턴 — 각 파일별 독립 Progress + 취소 버튼
-------------------------------------------------------------------------- */
type UploadFile = {
  id: string
  name: string
  size: string
  progress: number
  status: 'uploading' | 'done' | 'error'
}

const INITIAL_FILES: UploadFile[] = [
  { id: 'f1', name: 'design-tokens.json', size: '24 KB', progress: 100, status: 'done' },
  { id: 'f2', name: 'component-lib.zip', size: '3.2 MB', progress: 62, status: 'uploading' },
  { id: 'f3', name: 'storybook-export.tar', size: '18 MB', progress: 28, status: 'uploading' },
  { id: 'f4', name: 'icons-sprite.svg', size: '148 KB', progress: 0, status: 'error' },
]

const BatchUploadRender = () => {
  const [files, setFiles] = React.useState<UploadFile[]>(INITIAL_FILES)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setFiles((prev) =>
        prev.map((f) =>
          f.status === 'uploading' && f.progress < 100
            ? { ...f, progress: Math.min(100, f.progress + Math.floor(Math.random() * 8) + 2) }
            : f.progress >= 100 && f.status === 'uploading'
              ? { ...f, status: 'done' }
              : f
        )
      )
    }, 600)
    return () => clearInterval(timer)
  }, [])

  const total = files.length
  const done = files.filter((f) => f.status === 'done').length
  const overallPct = Math.round(files.reduce((sum, f) => sum + f.progress, 0) / total)

  return (
    <div style={{ maxWidth: 460, display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>전체 업로드</span>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#6366f1' }}>{done}/{total} 완료</span>
        </div>
        <Progress value={overallPct} color="primary" size="medium" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {files.map((file) => (
          <div
            key={file.id}
            style={{
              padding: '12px 14px',
              borderRadius: 10,
              border: `1px solid ${file.status === 'error' ? '#fca5a5' : '#e2e8f0'}`,
              background: file.status === 'error' ? '#fff7f7' : '#fafafa',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{file.name}</span>
                <span style={{ fontSize: 11, color: '#94a3b8' }}>{file.size}</span>
              </div>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: 6,
                  background:
                    file.status === 'done' ? '#f0fdf4' :
                    file.status === 'error' ? '#fee2e2' : '#eff6ff',
                  color:
                    file.status === 'done' ? '#16a34a' :
                    file.status === 'error' ? '#dc2626' : '#3b82f6',
                }}
              >
                {file.status === 'done' ? '완료' : file.status === 'error' ? '실패' : `${file.progress}%`}
              </span>
            </div>
            {file.status !== 'error' && (
              <Progress
                value={file.progress}
                color={file.status === 'done' ? 'success' : 'primary'}
                size="small"
              />
            )}
            {file.status === 'error' && (
              <div style={{ fontSize: 12, color: '#ef4444' }}>
                업로드 실패 — 파일 형식 또는 크기를 확인하세요.
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ fontSize: 11, color: '#94a3b8' }}>Tailwind UI 배치 업로드 패턴 — 파일별 독립 Progress + 상태 표시</div>
    </div>
  )
}

export const Tailwind_파일_업로드_배치: Story = {
  name: 'Tailwind UI - 파일 배치 업로드 진행',
  render: () => <BatchUploadRender />,
}

/* --------------------------------------------------------------------------
   Ant Design 벤치마크: 역량 평가 차트
   Ant Design Progress + Label 패턴 — 스킬/역량 시각화 대시보드
-------------------------------------------------------------------------- */
type SkillEntry = {
  label: string
  value: number
  color: 'primary' | 'success' | 'warning'
  category: string
}

const SKILLS: SkillEntry[] = [
  { label: 'TypeScript', value: 92, color: 'success', category: '언어' },
  { label: 'React', value: 88, color: 'success', category: '프레임워크' },
  { label: 'CSS / Tailwind', value: 80, color: 'primary', category: '스타일' },
  { label: 'Figma', value: 65, color: 'primary', category: '디자인' },
  { label: 'Node.js', value: 58, color: 'warning', category: '백엔드' },
  { label: 'GraphQL', value: 42, color: 'warning', category: '백엔드' },
]

export const Ant_역량_평가_차트: Story = {
  name: 'Ant Design - 역량 평가 차트',
  render: () => (
    <div style={{ maxWidth: 460 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>팀원 기술 역량</div>
      <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 20 }}>김지수 — Senior Frontend Engineer</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {SKILLS.map((skill) => (
          <div key={skill.label}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{skill.label}</span>
                <span
                  style={{
                    fontSize: 10,
                    padding: '1px 6px',
                    borderRadius: 4,
                    background: '#f1f5f9',
                    color: '#64748b',
                    fontWeight: 500,
                  }}
                >
                  {skill.category}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color:
                      skill.value >= 80 ? '#10b981' :
                      skill.value >= 60 ? '#6366f1' : '#f59e0b',
                  }}
                >
                  {skill.value >= 80 ? '전문가' : skill.value >= 60 ? '숙련' : '개발중'}
                </span>
                <span style={{ fontSize: 12, fontWeight: 800, color: '#0f172a', minWidth: 30, textAlign: 'right' }}>
                  {skill.value}
                </span>
              </div>
            </div>
            <Progress value={skill.value} color={skill.color} size="small" />
          </div>
        ))}
      </div>
      <div style={{ marginTop: 20, display: 'flex', gap: 16 }}>
        {[
          { label: '전문가 (80+)', color: '#10b981', count: SKILLS.filter((s) => s.value >= 80).length },
          { label: '숙련 (60-79)', color: '#6366f1', count: SKILLS.filter((s) => s.value >= 60 && s.value < 80).length },
          { label: '개발중 (~59)', color: '#f59e0b', count: SKILLS.filter((s) => s.value < 60).length },
        ].map((item) => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.color }} />
            <span style={{ fontSize: 11, color: '#64748b' }}>{item.label} ({item.count})</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12, fontSize: 11, color: '#94a3b8' }}>Ant Design Progress + Label 패턴 — 스킬 역량 시각화</div>
    </div>
  ),
}

/* --------------------------------------------------------------------------
   Tailwind UI + Ant Design: 리소스 쿼터 대시보드
   API 호출 / 스토리지 / 시트 등의 사용량을 한 눈에 표시하는 엔터프라이즈 패턴
-------------------------------------------------------------------------- */
type QuotaItem = {
  label: string
  used: number
  total: number
  unit: string
  color: 'primary' | 'success' | 'warning'
}

const QUOTAS: QuotaItem[] = [
  { label: 'API 호출', used: 84200, total: 100000, unit: '건', color: 'warning' },
  { label: '스토리지', used: 7.4, total: 20, unit: 'GB', color: 'primary' },
  { label: '팀 시트', used: 8, total: 10, unit: '명', color: 'warning' },
  { label: '빌드 분', used: 280, total: 2000, unit: 'min', color: 'success' },
]

export const Tailwind_Ant_리소스_쿼터: Story = {
  name: 'Tailwind UI + Ant Design - 리소스 쿼터 대시보드',
  render: () => (
    <div style={{ maxWidth: 500 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>플랜 사용량</div>
          <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>Pro Plan — 갱신일: 2026-05-01</div>
        </div>
        <div
          style={{
            padding: '5px 12px',
            borderRadius: 20,
            background: '#eff6ff',
            fontSize: 12,
            fontWeight: 700,
            color: '#3b82f6',
          }}
        >
          Pro
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {QUOTAS.map((quota) => {
          const pct = Math.round((quota.used / quota.total) * 100)
          const isHigh = pct >= 80
          return (
            <div
              key={quota.label}
              style={{
                padding: '16px',
                borderRadius: 12,
                border: `1px solid ${isHigh ? '#fde68a' : '#e2e8f0'}`,
                background: isHigh ? '#fffbeb' : '#fafafa',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#64748b' }}>{quota.label}</span>
                {isHigh && (
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#d97706', background: '#fef3c7', padding: '1px 6px', borderRadius: 4 }}>
                    경고
                  </span>
                )}
              </div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 2, lineHeight: 1 }}>
                {typeof quota.used === 'number' && quota.used >= 1000
                  ? (quota.used / 1000).toFixed(0) + 'K'
                  : quota.used}
                <span style={{ fontSize: 12, fontWeight: 400, color: '#94a3b8', marginLeft: 3 }}>{quota.unit}</span>
              </div>
              <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 8 }}>
                / {quota.total}{quota.unit}
              </div>
              <Progress value={pct} color={quota.color} size="small" />
              <div style={{ marginTop: 6, fontSize: 11, fontWeight: 600, color: pct >= 80 ? '#d97706' : '#94a3b8', textAlign: 'right' }}>
                {pct}% 사용
              </div>
            </div>
          )
        })}
      </div>

      <div style={{ marginTop: 16, padding: '12px 14px', borderRadius: 10, background: '#eff6ff', border: '1px solid #bfdbfe', fontSize: 12, color: '#1d4ed8' }}>
        API 호출 및 팀 시트가 한도에 근접했습니다.{' '}
        <span style={{ fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}>플랜 업그레이드</span>
        를 고려해보세요.
      </div>
      <div style={{ marginTop: 10, fontSize: 11, color: '#94a3b8' }}>Tailwind UI + Ant Design 엔터프라이즈 쿼터 대시보드 패턴</div>
    </div>
  ),
}

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

/* --------------------------------------------------------------------------
   Linear Design 벤치마크: 팀별 사이클 완료율 대시보드
   Linear의 Cycles 뷰 — 팀별 이슈 완료율과 남은 작업을 Progress로 시각화
-------------------------------------------------------------------------- */
const CYCLE_TEAMS = [
  { name: 'Design System', completed: 18, total: 24, color: 'primary' as const, avatar: '🎨' },
  { name: 'Platform', completed: 9, total: 16, color: 'warning' as const, avatar: '⚙️' },
  { name: 'Frontend', completed: 22, total: 25, color: 'success' as const, avatar: '🖥' },
  { name: 'QA', completed: 7, total: 12, color: 'primary' as const, avatar: '🔍' },
]

function LinearCycleTeamRender() {
  const [cycle, setCycle] = useState(12)
  const totalCompleted = CYCLE_TEAMS.reduce((s, t) => s + t.completed, 0)
  const totalIssues = CYCLE_TEAMS.reduce((s, t) => s + t.total, 0)
  const overallPct = Math.round((totalCompleted / totalIssues) * 100)

  return (
    <div style={{ maxWidth: 480 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>Cycle {cycle}</div>
          <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>2주 스프린트 — 팀별 진행률</div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {[10, 11, 12, 13].map((c) => (
            <button
              key={c}
              onClick={() => setCycle(c)}
              style={{
                padding: '4px 10px', borderRadius: 6,
                border: `1px solid ${cycle === c ? '#6366f1' : '#e2e8f0'}`,
                background: cycle === c ? '#6366f112' : '#fff',
                color: cycle === c ? '#6366f1' : '#64748b',
                fontSize: 11, fontWeight: cycle === c ? 700 : 400, cursor: 'pointer',
              }}
            >
              #{c}
            </button>
          ))}
        </div>
      </div>

      {/* 전체 진행률 */}
      <div style={{ padding: '14px 16px', borderRadius: 10, border: '1.5px solid #e2e8f0', marginBottom: 16, background: '#fafafa' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#64748b' }}>전체 완료율</span>
          <span style={{ fontSize: 18, fontWeight: 800, color: overallPct >= 80 ? '#10b981' : '#6366f1' }}>
            {totalCompleted} / {totalIssues}
          </span>
        </div>
        <Progress value={overallPct} color={overallPct >= 80 ? 'success' : 'primary'} size="medium" />
        <div style={{ marginTop: 6, fontSize: 11, color: '#94a3b8', textAlign: 'right' }}>{overallPct}% 완료</div>
      </div>

      {/* 팀별 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {CYCLE_TEAMS.map((team) => {
          const pct = Math.round((team.completed / team.total) * 100)
          return (
            <div key={team.name} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 16 }}>{team.avatar}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{team.name}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 11, color: '#94a3b8' }}>{team.completed}/{team.total}</span>
                  <span style={{
                    fontSize: 11, fontWeight: 700, minWidth: 32, textAlign: 'right',
                    color: pct >= 80 ? '#10b981' : pct >= 50 ? '#6366f1' : '#f59e0b',
                  }}>
                    {pct}%
                  </span>
                </div>
              </div>
              <Progress value={pct} color={team.color} size="small" />
            </div>
          )
        })}
      </div>
      <div style={{ marginTop: 16, fontSize: 11, color: '#94a3b8' }}>
        Linear Design 패턴 — 팀별 사이클 완료율 대시보드
      </div>
    </div>
  )
}

export const Linear_팀_사이클_완료율: Story = {
  name: 'Linear Design - 팀별 사이클 완료율 대시보드',
  render: () => <LinearCycleTeamRender />,
}

/* --------------------------------------------------------------------------
   Figma Plugin UI 벤치마크: 컴포넌트 커버리지 분석
   Figma Plugin 패턴 — 디자인 시스템 컴포넌트 커버리지를 Progress로 분석하는 플러그인 UI
-------------------------------------------------------------------------- */
const COVERAGE_CATEGORIES = [
  { label: '기본 입력', used: 8, total: 10, color: 'success' as const },
  { label: '피드백/오버레이', used: 5, total: 8, color: 'primary' as const },
  { label: '데이터 표시', used: 3, total: 7, color: 'warning' as const },
  { label: '레이아웃', used: 6, total: 6, color: 'success' as const },
  { label: '내비게이션', used: 2, total: 5, color: 'warning' as const },
]

function FigmaCoverageRender() {
  const [analyzing, setAnalyzing] = useState(false)
  const [progress, setProgress] = useState(100)

  const runAnalysis = () => {
    setAnalyzing(true)
    setProgress(0)
    let p = 0
    const iv = setInterval(() => {
      p += Math.floor(Math.random() * 15) + 5
      if (p >= 100) {
        setProgress(100)
        setAnalyzing(false)
        clearInterval(iv)
      } else {
        setProgress(p)
      }
    }, 200)
  }

  const totalUsed = COVERAGE_CATEGORIES.reduce((s, c) => s + c.used, 0)
  const totalAll = COVERAGE_CATEGORIES.reduce((s, c) => s + c.total, 0)
  const overallCoverage = Math.round((totalUsed / totalAll) * 100)

  return (
    <div
      style={{
        width: 280,
        borderRadius: 10,
        border: '1px solid #e2e8f0',
        background: '#fff',
        overflow: 'hidden',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        fontFamily: '"JetBrains Mono", monospace',
      }}
    >
      {/* 헤더 */}
      <div style={{ padding: '10px 14px', borderBottom: '1px solid #f1f5f9', background: '#f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: '#0f172a' }}>Coverage Analyzer</span>
        <button
          onClick={runAnalysis}
          disabled={analyzing}
          style={{
            padding: '3px 10px', borderRadius: 5, border: 'none',
            background: analyzing ? '#e2e8f0' : '#6366f1',
            color: analyzing ? '#94a3b8' : '#fff',
            fontSize: 10, fontWeight: 700, cursor: analyzing ? 'not-allowed' : 'pointer',
          }}
        >
          {analyzing ? '분석 중...' : '재분석'}
        </button>
      </div>

      {/* 분석 진행 */}
      {analyzing && (
        <div style={{ padding: '10px 14px', borderBottom: '1px solid #f1f5f9' }}>
          <div style={{ fontSize: 10, color: '#94a3b8', marginBottom: 6 }}>Analyzing components...</div>
          <Progress value={progress} color="primary" size="small" />
        </div>
      )}

      {/* 전체 커버리지 */}
      <div style={{ padding: '12px 14px', borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontSize: 10, color: '#64748b' }}>Overall Coverage</span>
          <span style={{
            fontSize: 14, fontWeight: 800,
            color: overallCoverage >= 80 ? '#10b981' : '#f59e0b',
          }}>
            {overallCoverage}%
          </span>
        </div>
        <Progress value={overallCoverage} color={overallCoverage >= 80 ? 'success' : 'warning'} size="small" />
        <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 4 }}>
          {totalUsed} / {totalAll} components used
        </div>
      </div>

      {/* 카테고리별 */}
      <div style={{ padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {COVERAGE_CATEGORIES.map((cat) => {
          const pct = Math.round((cat.used / cat.total) * 100)
          return (
            <div key={cat.label}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 10, color: '#64748b' }}>{cat.label}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#475569' }}>
                  {cat.used}/{cat.total}
                </span>
              </div>
              <Progress value={pct} color={cat.color} size="small" />
            </div>
          )
        })}
      </div>

      <div style={{ padding: '8px 14px', borderTop: '1px solid #f1f5f9', fontSize: 9, color: '#cbd5e1' }}>
        Figma Plugin UI — DS Coverage Analyzer
      </div>
    </div>
  )
}

export const Figma_컴포넌트_커버리지: Story = {
  name: 'Figma Plugin UI - 컴포넌트 커버리지 분석기',
  render: () => <FigmaCoverageRender />,
}

/* --------------------------------------------------------------------------
   Linear Design 벤치마크: OKR 키 결과 진행률 대시보드
   Linear의 Goals 뷰 — 분기별 OKR과 Key Result 달성률을 Progress로 표현
-------------------------------------------------------------------------- */
type KeyResult = {
  id: string
  label: string
  current: number
  target: number
  unit: string
  color: 'primary' | 'success' | 'warning'
}

const Q1_OKRS: Array<{ objective: string; owner: string; keyResults: KeyResult[] }> = [
  {
    objective: 'Design System 품질 향상',
    owner: '김민지',
    keyResults: [
      { id: 'kr1', label: '컴포넌트 스토리 수', current: 108, target: 120, unit: '개', color: 'primary' },
      { id: 'kr2', label: '접근성 커버리지', current: 82, target: 90, unit: '%', color: 'warning' },
      { id: 'kr3', label: 'TypeScript 에러 수', current: 2, target: 0, unit: '건', color: 'warning' },
    ],
  },
  {
    objective: '개발자 경험(DX) 개선',
    owner: '이동욱',
    keyResults: [
      { id: 'kr4', label: '빌드 시간 단축', current: 28, target: 20, unit: 's', color: 'success' },
      { id: 'kr5', label: '문서화 완성도', current: 75, target: 95, unit: '%', color: 'warning' },
    ],
  },
]

function LinearOKRRender() {
  return (
    <div style={{ maxWidth: 520 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>OKR — Q1 2026</div>
          <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>orbit-ui Design System Team</div>
        </div>
        <div style={{
          padding: '4px 12px', borderRadius: 20,
          background: '#eff6ff', fontSize: 12, fontWeight: 700, color: '#3b82f6',
        }}>
          진행 중
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {Q1_OKRS.map((okr, oi) => {
          const avgPct = Math.round(
            okr.keyResults.reduce((s, kr) => {
              const raw = kr.id === 'kr3'
                ? (kr.current === 0 ? 100 : Math.max(0, 100 - kr.current * 50))
                : Math.min(100, Math.round((kr.current / kr.target) * 100))
              return s + raw
            }, 0) / okr.keyResults.length
          )
          return (
            <div key={oi} style={{ borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
              {/* Objective 헤더 */}
              <div style={{ padding: '12px 16px', background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>
                    O{oi + 1}. {okr.objective}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 10, color: '#94a3b8' }}>{okr.owner}</span>
                    <span style={{
                      fontSize: 12, fontWeight: 800,
                      color: avgPct >= 80 ? '#10b981' : avgPct >= 60 ? '#6366f1' : '#f59e0b',
                    }}>
                      {avgPct}%
                    </span>
                  </div>
                </div>
                <Progress
                  value={avgPct}
                  color={avgPct >= 80 ? 'success' : avgPct >= 60 ? 'primary' : 'warning'}
                  size="small"
                />
              </div>

              {/* Key Results */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {okr.keyResults.map((kr, ki) => {
                  const pct = kr.id === 'kr3'
                    ? (kr.current === 0 ? 100 : Math.max(0, 100 - kr.current * 50))
                    : Math.min(100, Math.round((kr.current / kr.target) * 100))
                  return (
                    <div
                      key={kr.id}
                      style={{
                        padding: '10px 16px',
                        borderBottom: ki < okr.keyResults.length - 1 ? '1px solid #f8fafc' : 'none',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                        <span style={{ fontSize: 12, color: '#475569' }}>
                          KR{ki + 1}. {kr.label}
                        </span>
                        <span style={{ fontSize: 11, color: '#94a3b8' }}>
                          {kr.current} / {kr.target} {kr.unit}
                        </span>
                      </div>
                      <Progress value={pct} color={kr.color} size="small" />
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
      <div style={{ marginTop: 14, fontSize: 11, color: '#94a3b8' }}>
        Linear Goals 패턴 — OKR 키 결과 진행률 대시보드
      </div>
    </div>
  )
}

export const Linear_OKR_키결과_진행률: Story = {
  name: 'Linear Design - OKR 키 결과 진행률 대시보드',
  render: () => <LinearOKRRender />,
}
