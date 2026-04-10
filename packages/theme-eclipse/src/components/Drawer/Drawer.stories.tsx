import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { Drawer } from './Drawer'
import { FilledButton as Button } from '../SolidButton'
import { OutlineButton } from '../OutlineButton'
import { FloatingTextField } from '../FloatingTextField'
import { CheckboxWithLabel } from '../composites/CheckboxWithLabel'
import { RadioButtonWithLabel } from '../composites/RadioButtonWithLabel'
import { RadioGroup } from '../composites/RadioGroup'
import { Typography } from '../Text'

const meta = {
  title: 'eclipse/Feedback/Drawer',
  component: Drawer,
  tags: ['autodocs'],
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof meta>

export const 기본: Story = {
  render: () => (
    <Drawer>
      <Drawer.Trigger asChild>
        <Button color="primary" size="medium">
          <Button.Center>서랍 열기</Button.Center>
        </Button>
      </Drawer.Trigger>
      <Drawer.Content side="right">
        <Drawer.Header>
          <Drawer.Title>계정 설정</Drawer.Title>
          <Drawer.Description>
            여기서 프로필 정보와 보안 설정을 변경할 수 있습니다.
          </Drawer.Description>
        </Drawer.Header>
        <div className="py-4">
          <Typography textStyle="bodyMedium">
            여기에 다양한 설정 폼이나 리스트가 들어갑니다.
          </Typography>
        </div>
        <Drawer.Footer>
          <Drawer.Close asChild>
            <Button color="black" size="medium">
              <Button.Center>저장하기</Button.Center>
            </Button>
          </Drawer.Close>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  ),
}

// ─── 4방향 드로어 패턴 ────────────────────────────────────────────────────────
export const 방향_4가지: Story = {
  name: '방향 4가지 (right / left / top / bottom)',
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      {(['right', 'left', 'top', 'bottom'] as const).map((side) => (
        <Drawer key={side}>
          <Drawer.Trigger asChild>
            <Button color="gray" size="medium">
              <Button.Center>{side}</Button.Center>
            </Button>
          </Drawer.Trigger>
          <Drawer.Content side={side}>
            <Drawer.Header>
              <Drawer.Title>{side} Drawer</Drawer.Title>
              <Drawer.Description>{side} 방향에서 슬라이드 인합니다.</Drawer.Description>
            </Drawer.Header>
            <div style={{ padding: '16px 0' }}>
              <Typography textStyle="bodyMedium">
                이 드로어는 <strong>{side}</strong> 방향에서 열립니다.
              </Typography>
            </div>
            <Drawer.Footer>
              <Drawer.Close asChild>
                <Button color="black" size="medium">
                  <Button.Center>닫기</Button.Center>
                </Button>
              </Drawer.Close>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer>
      ))}
    </div>
  ),
}

// ─── 폼 포함 드로어 (Ant Design Form 인라인 에러 패턴) ─────────────────────────
// Ant Design Form의 validateStatus + help 메시지 패턴을 참고:
// 각 필드 아래에 인라인 에러 메시지를 즉시 표시합니다.
const DrawerFormRender = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [touched, setTouched] = useState({ name: false, email: false })

  const nameError = touched.name && name.trim().length === 0
  const emailError = touched.email && !email.includes('@')

  return (
    <Drawer>
      <Drawer.Trigger asChild>
        <Button color="primary" size="medium">
          <Button.Center>폼 드로어 열기</Button.Center>
        </Button>
      </Drawer.Trigger>
      <Drawer.Content side="right">
        <Drawer.Header>
          <Drawer.Title>프로필 편집</Drawer.Title>
          <Drawer.Description>
            Ant Design Form 패턴: 각 필드 아래 인라인 에러 메시지를 즉시 표시합니다.
          </Drawer.Description>
        </Drawer.Header>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px 0' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <FloatingTextField
              placeholder="이름"
              value={name}
              error={nameError}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
              style={{ width: '100%' }}
            />
            {nameError && (
              <span style={{ fontSize: '12px', color: '#ef4444', paddingLeft: '4px' }}>
                이름을 입력해주세요
              </span>
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <FloatingTextField
              placeholder="이메일"
              value={email}
              error={emailError}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
              style={{ width: '100%' }}
            />
            {emailError && (
              <span style={{ fontSize: '12px', color: '#ef4444', paddingLeft: '4px' }}>
                올바른 이메일 형식이 아닙니다
              </span>
            )}
            {!emailError && touched.email && email.includes('@') && (
              <span style={{ fontSize: '12px', color: '#10b981', paddingLeft: '4px' }}>
                올바른 이메일입니다
              </span>
            )}
          </div>
        </div>
        <Drawer.Footer>
          <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
            <Drawer.Close asChild>
              <OutlineButton color="black" size="medium" style={{ flex: 1 }}>
                <OutlineButton.Center>취소</OutlineButton.Center>
              </OutlineButton>
            </Drawer.Close>
            <Button
              color="primary"
              size="medium"
              disabled={nameError || emailError || !name || !email}
              style={{ flex: 1 }}
            >
              <Button.Center>저장</Button.Center>
            </Button>
          </div>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  )
}

export const 폼_포함_드로어: Story = {
  name: '폼 포함 드로어 (Ant Design 인라인 에러 패턴)',
  render: () => <DrawerFormRender />,
}

// ─── 필터 패널 드로어 ─────────────────────────────────────────────────────────
const DrawerFilterRender = () => {
  const [categories, setCategories] = useState<string[]>(['react'])
  const [sort, setSort] = useState('latest')

  const toggleCategory = (val: string) => {
    setCategories((prev) =>
      prev.includes(val) ? prev.filter((c) => c !== val) : [...prev, val]
    )
  }

  return (
    <Drawer>
      <Drawer.Trigger asChild>
        <Button color="black" size="medium">
          <Button.Center>필터 패널 열기</Button.Center>
        </Button>
      </Drawer.Trigger>
      <Drawer.Content side="left">
        <Drawer.Header>
          <Drawer.Title>필터</Drawer.Title>
          <Drawer.Description>카테고리와 정렬 옵션을 선택하세요.</Drawer.Description>
        </Drawer.Header>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '16px 0' }}>
          <div>
            <Typography textStyle="labelLarge" style={{ marginBottom: '12px', display: 'block' }}>
              카테고리
            </Typography>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { value: 'react', label: 'React' },
                { value: 'vue', label: 'Vue' },
                { value: 'angular', label: 'Angular' },
                { value: 'svelte', label: 'Svelte' },
              ].map(({ value, label }) => (
                <CheckboxWithLabel
                  key={value}
                  checked={categories.includes(value)}
                  onChange={() => toggleCategory(value)}
                >
                  {label}
                </CheckboxWithLabel>
              ))}
            </div>
          </div>
          <div>
            <Typography textStyle="labelLarge" style={{ marginBottom: '12px', display: 'block' }}>
              정렬
            </Typography>
            <RadioGroup name="sort-filter" value={sort} onChange={(e) => setSort(e.target.value)}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <RadioButtonWithLabel value="latest">최신순</RadioButtonWithLabel>
                <RadioButtonWithLabel value="popular">인기순</RadioButtonWithLabel>
                <RadioButtonWithLabel value="name">이름순</RadioButtonWithLabel>
              </div>
            </RadioGroup>
          </div>
        </div>
        <Drawer.Footer>
          <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
            <OutlineButton
              color="gray"
              size="medium"
              style={{ flex: 1 }}
              onClick={() => { setCategories([]); setSort('latest') }}
            >
              <OutlineButton.Center>초기화</OutlineButton.Center>
            </OutlineButton>
            <Drawer.Close asChild>
              <Button color="primary" size="medium" style={{ flex: 1 }}>
                <Button.Center>적용 ({categories.length})</Button.Center>
              </Button>
            </Drawer.Close>
          </div>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  )
}

export const 필터_패널_드로어: Story = {
  name: '필터 패널 드로어 (Checkbox + RadioButton + SolidButton)',
  render: () => <DrawerFilterRender />,
}

// ─── Apple HIG 스타일: 바텀시트 스냅 포인트 시뮬레이션 ───────────────────────
// Apple HIG의 iOS Sheet 패턴:
// - 핸들 바 + 스냅 포인트 (collapsed / half / full)
// - 스냅 버튼으로 시뮬레이션
// - 배경 오버레이 딤처리

const AppleHIGBottomSheetRender = () => {
  const [snap, setSnap] = useState<'collapsed' | 'half' | 'full'>('half')

  const snapHeights = {
    collapsed: '80px',
    half: '320px',
    full: '560px',
  }

  const snapLabels = {
    collapsed: 'Collapsed (핸들만)',
    half: 'Half Sheet (기본)',
    full: 'Full Sheet (전체)',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'flex-start' }}>
      <div style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6' }}>
        Apple HIG iOS Sheet 패턴: 스냅 포인트를 버튼으로 전환합니다.
        실제 앱에서는 드래그 제스처로 스냅 포인트 간 이동이 가능합니다.
      </div>

      {/* 스냅 컨트롤 */}
      <div style={{ display: 'flex', gap: '8px' }}>
        {(['collapsed', 'half', 'full'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setSnap(s)}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: `1.5px solid ${snap === s ? '#6366f1' : '#e2e8f0'}`,
              background: snap === s ? 'rgba(99,102,241,0.08)' : '#fff',
              color: snap === s ? '#6366f1' : '#64748b',
              fontWeight: snap === s ? 600 : 400,
              fontSize: '12px',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* 바텀시트 시뮬레이션 */}
      <div style={{
        width: '360px',
        height: '560px',
        background: '#f8fafc',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* 배경 콘텐츠 */}
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ height: '20px', borderRadius: '6px', background: '#e2e8f0' }} />
          <div style={{ height: '16px', width: '70%', borderRadius: '6px', background: '#e2e8f0' }} />
          <div style={{ height: '80px', borderRadius: '10px', background: '#e2e8f0' }} />
          <div style={{ height: '16px', width: '85%', borderRadius: '6px', background: '#e2e8f0' }} />
        </div>

        {/* 딤 오버레이 */}
        {snap !== 'collapsed' && (
          <div style={{
            position: 'absolute', inset: 0,
            background: snap === 'full' ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.2)',
            transition: 'background 0.3s ease',
          }} />
        )}

        {/* 바텀시트 */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: snapHeights[snap],
          background: '#fff',
          borderRadius: '16px 16px 0 0',
          boxShadow: '0 -4px 24px rgba(0,0,0,0.12)',
          transition: 'height 0.35s cubic-bezier(0.32, 0.72, 0, 1)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}>
          {/* 핸들 바 */}
          <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 6px', flexShrink: 0 }}>
            <div style={{ width: '36px', height: '4px', borderRadius: '2px', background: '#e2e8f0' }} />
          </div>

          {/* 시트 콘텐츠 */}
          {snap !== 'collapsed' && (
            <div style={{ padding: '8px 20px 20px', flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b' }}>{snapLabels[snap]}</div>
              <div style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6' }}>
                iOS Sheet는 사용자가 드래그하여 스냅 포인트 간 이동할 수 있습니다.
                핸들 바를 위로 당기면 확장, 아래로 내리면 축소됩니다.
              </div>
              {snap === 'full' && (
                <>
                  {[1, 2, 3].map((n) => (
                    <div
                      key={n}
                      style={{
                        padding: '12px 14px',
                        borderRadius: '10px',
                        border: '1px solid #e2e8f0',
                        fontSize: '13px',
                        color: '#1e293b',
                        fontWeight: 500,
                      }}
                    >
                      추가 항목 {n}
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export const Apple_HIG_바텀시트: Story = {
  name: 'Apple HIG 바텀시트 스냅 포인트 시뮬레이션',
  render: () => <AppleHIGBottomSheetRender />,
}

// ─── Raycast 스타일: 퀵 액션 사이드 패널 ────────────────────────────────────
// Raycast의 Action Panel 패턴:
// - 단축키 힌트 목록
// - 카테고리별 그룹 분리
// - 컴팩트 밀도

const RaycastActionPanelRender = () => {
  const [selected, setSelected] = useState<string | null>(null)

  const actionGroups: Array<{
    title: string
    items: Array<{ id: string; label: string; shortcut: string; destructive?: boolean }>
  }> = [
    {
      title: 'File',
      items: [
        { id: 'open', label: '파일 열기', shortcut: 'Cmd O' },
        { id: 'save', label: '저장', shortcut: 'Cmd S' },
        { id: 'saveas', label: '다른 이름으로 저장', shortcut: 'Cmd Shift S' },
        { id: 'export', label: '내보내기', shortcut: 'Cmd E' },
      ],
    },
    {
      title: 'Edit',
      items: [
        { id: 'copy', label: '복사', shortcut: 'Cmd C' },
        { id: 'paste', label: '붙여넣기', shortcut: 'Cmd V' },
        { id: 'undo', label: '되돌리기', shortcut: 'Cmd Z' },
      ],
    },
    {
      title: 'Danger Zone',
      items: [
        { id: 'delete', label: '삭제', shortcut: 'Cmd Del', destructive: true },
        { id: 'reset', label: '초기화', shortcut: '', destructive: true },
      ],
    },
  ]

  return (
    <Drawer>
      <Drawer.Trigger asChild>
        <Button color="primary" size="medium">
          <Button.Center>Raycast 액션 패널 열기</Button.Center>
        </Button>
      </Drawer.Trigger>
      <Drawer.Content side="right">
        <Drawer.Header>
          <Drawer.Title>Quick Actions</Drawer.Title>
          <Drawer.Description>
            Raycast Action Panel 패턴: 단축키 힌트와 카테고리별 그룹 액션
          </Drawer.Description>
        </Drawer.Header>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0', padding: '8px 0' }}>
          {actionGroups.map((group, gi) => (
            <div key={group.title}>
              <div style={{
                padding: '10px 16px 4px',
                fontSize: '10px',
                fontWeight: 700,
                color: '#94a3b8',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}>
                {group.title}
              </div>
              {group.items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelected(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 16px',
                    cursor: 'pointer',
                    background: selected === item.id ? 'rgba(99,102,241,0.06)' : 'transparent',
                    transition: 'background 0.1s',
                  }}
                >
                  <span style={{
                    fontSize: '13px',
                    fontWeight: 500,
                    color: item.destructive ? '#ef4444' : '#1e293b',
                  }}>
                    {item.label}
                  </span>
                  {item.shortcut && (
                    <kbd style={{
                      fontSize: '10px',
                      fontWeight: 600,
                      color: '#94a3b8',
                      fontFamily: 'monospace',
                      background: '#f1f5f9',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      border: '1px solid #e2e8f0',
                    }}>
                      {item.shortcut}
                    </kbd>
                  )}
                </div>
              ))}
              {gi < actionGroups.length - 1 && (
                <div style={{ height: '1px', background: '#f1f5f9', margin: '6px 0' }} />
              )}
            </div>
          ))}
        </div>
        <Drawer.Footer>
          {selected && (
            <div style={{ fontSize: '12px', color: '#94a3b8', flex: 1 }}>
              선택됨: <strong style={{ color: '#6366f1' }}>{selected}</strong>
            </div>
          )}
          <Drawer.Close asChild>
            <Button color="black" size="medium">
              <Button.Center>닫기</Button.Center>
            </Button>
          </Drawer.Close>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  )
}

export const Raycast_퀵액션_사이드패널: Story = {
  name: 'Raycast 퀵 액션 사이드 패널',
  render: () => <RaycastActionPanelRender />,
}

// ─── shadcn/ui: 멀티스텝 온보딩 드로어 ───────────────────────────────────────
// shadcn/ui Drawer의 핵심 패턴: 복잡한 온보딩 플로우를 Drawer 내에서 단계별로 처리
// scrollable content + 고정 footer 액션 버튼 패턴
const steps = [
  {
    title: '팀 설정',
    description: '팀 이름과 설명을 입력하세요',
    fields: ['팀 이름', '팀 슬러그', '팀 설명'],
  },
  {
    title: '멤버 초대',
    description: '이메일로 팀원을 초대하세요',
    fields: ['이메일 주소 1', '이메일 주소 2', '이메일 주소 3'],
  },
  {
    title: '역할 설정',
    description: '각 멤버의 역할을 지정하세요',
    fields: ['관리자', '편집자', '뷰어'],
  },
]

const ShadcnMultiStepRender = () => {
  const [step, setStep] = useState(0)
  const [values, setValues] = useState<Record<string, string>>({})

  const current = steps[step]
  const isLast = step === steps.length - 1

  return (
    <Drawer>
      <Drawer.Trigger asChild>
        <Button color="primary" size="medium">
          <Button.Center>팀 온보딩 시작</Button.Center>
        </Button>
      </Drawer.Trigger>
      <Drawer.Content side="right">
        <Drawer.Header>
          {/* shadcn 패턴: 단계 표시기를 헤더에 배치 */}
          <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
            {steps.map((_, i) => (
              <div
                key={i}
                style={{
                  height: '3px',
                  flex: 1,
                  borderRadius: '2px',
                  background: i <= step ? '#6366f1' : '#e2e8f0',
                  transition: 'background 0.2s',
                }}
              />
            ))}
          </div>
          <Drawer.Title>{current.title}</Drawer.Title>
          <Drawer.Description>{current.description}</Drawer.Description>
        </Drawer.Header>

        {/* shadcn 핵심 패턴: 스크롤 영역과 고정 푸터 분리 */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '4px' }}>
            단계 {step + 1} / {steps.length}
          </div>
          {current.fields.map((field) => (
            <FloatingTextField
              key={field}
              placeholder={field}
              value={values[field] ?? ''}
              onChange={(e) => setValues((prev) => ({ ...prev, [field]: e.target.value }))}
              style={{ width: '100%' }}
            />
          ))}
        </div>

        <Drawer.Footer>
          <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
            {step > 0 ? (
              <OutlineButton color="gray" size="medium" style={{ flex: 1 }} onClick={() => setStep((s) => s - 1)}>
                <OutlineButton.Center>이전</OutlineButton.Center>
              </OutlineButton>
            ) : (
              <Drawer.Close asChild>
                <OutlineButton color="gray" size="medium" style={{ flex: 1 }}>
                  <OutlineButton.Center>취소</OutlineButton.Center>
                </OutlineButton>
              </Drawer.Close>
            )}
            {isLast ? (
              <Drawer.Close asChild>
                <Button color="primary" size="medium" style={{ flex: 2 }}>
                  <Button.Center>팀 생성 완료</Button.Center>
                </Button>
              </Drawer.Close>
            ) : (
              <Button color="primary" size="medium" style={{ flex: 2 }} onClick={() => setStep((s) => s + 1)}>
                <Button.Center>다음 단계</Button.Center>
              </Button>
            )}
          </div>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  )
}

export const shadcn_멀티스텝_온보딩: Story = {
  name: 'shadcn/ui — 멀티스텝 온보딩 드로어',
  render: () => <ShadcnMultiStepRender />,
}

// ─── Linear: 이슈 상세 패널 ───────────────────────────────────────────────────
// Linear의 이슈 상세 사이드 패널 패턴:
// - 상태/우선순위/담당자를 상단에 표시
// - 설명과 댓글을 스크롤 가능한 영역에 배치
// - 액션 버튼을 하단 고정 푸터에 배치
const LinearIssuePanelRender = () => {
  const [status, setStatus] = useState<'todo' | 'progress' | 'done'>('progress')
  const [priority, setPriority] = useState<'urgent' | 'high' | 'medium' | 'low'>('high')

  const statusConfig = {
    todo: { label: 'Todo', color: '#94a3b8', bg: '#f8fafc' },
    progress: { label: 'In Progress', color: '#6366f1', bg: '#eff6ff' },
    done: { label: 'Done', color: '#10b981', bg: '#f0fdf4' },
  }

  const priorityConfig = {
    urgent: { label: 'Urgent', color: '#ef4444' },
    high: { label: 'High', color: '#f59e0b' },
    medium: { label: 'Medium', color: '#6366f1' },
    low: { label: 'Low', color: '#94a3b8' },
  }

  const sc = statusConfig[status]
  const pc = priorityConfig[priority]

  return (
    <Drawer>
      <Drawer.Trigger asChild>
        <Button color="black" size="medium">
          <Button.Center>이슈 상세 보기</Button.Center>
        </Button>
      </Drawer.Trigger>
      <Drawer.Content side="right">
        <Drawer.Header>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{ fontSize: '11px', fontFamily: 'monospace', color: '#94a3b8', fontWeight: 600 }}>ORB-247</span>
          </div>
          <Drawer.Title>디자인 토큰 시스템 고도화</Drawer.Title>
          <Drawer.Description>Reference → Semantic → Component 3단계 토큰 구조로 마이그레이션</Drawer.Description>
        </Drawer.Header>

        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 0', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* 속성 패널 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>상태</div>
              <div style={{ display: 'flex', gap: '6px' }}>
                {(['todo', 'progress', 'done'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatus(s)}
                    style={{
                      padding: '4px 10px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: 600,
                      background: status === s ? statusConfig[s].bg : '#f1f5f9',
                      color: status === s ? statusConfig[s].color : '#94a3b8',
                      transition: 'all 0.15s',
                    }}
                  >
                    {statusConfig[s].label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>우선순위</div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {(['urgent', 'high', 'medium', 'low'] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPriority(p)}
                    style={{
                      padding: '4px 10px', borderRadius: '6px', border: `1.5px solid ${priority === p ? priorityConfig[p].color : '#e2e8f0'}`,
                      cursor: 'pointer', fontSize: '11px', fontWeight: 600,
                      background: priority === p ? 'rgba(99,102,241,0.06)' : '#fff',
                      color: priority === p ? priorityConfig[p].color : '#94a3b8',
                      transition: 'all 0.15s',
                    }}
                  >
                    {priorityConfig[p].label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 현재 상태 요약 */}
          <div style={{ padding: '12px', borderRadius: '10px', background: sc.bg, border: `1px solid ${sc.color}22` }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: sc.color }}>{sc.label}</span>
            <span style={{ fontSize: '12px', color: '#64748b', marginLeft: '8px' }}>· 우선순위: </span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: pc.color }}>{pc.label}</span>
          </div>

          {/* 설명 */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>설명</div>
            <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.7', background: '#f8fafc', borderRadius: '10px', padding: '12px' }}>
              현재 2단계 토큰 구조(reference → component)를 3단계로 확장하여
              시맨틱 레이어를 추가합니다. 이를 통해 브랜드 컬러 변경 시 단일
              지점에서 전체 UI에 반영할 수 있습니다.
            </div>
          </div>

          {/* 댓글 */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#1e293b', marginBottom: '10px' }}>댓글 (2)</div>
            {[
              { author: '김민준', time: '2시간 전', text: 'semantic 토큰 네이밍 컨벤션 먼저 확정하는 게 좋을 것 같아요.' },
              { author: '이서연', time: '방금 전', text: '피그마 토큰 플러그인 연동까지 고려하면 좋겠습니다!' },
            ].map(({ author, time, text }) => (
              <div key={author} style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#6366f1', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, flexShrink: 0 }}>
                  {author[0]}
                </div>
                <div>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'baseline', marginBottom: '3px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#1e293b' }}>{author}</span>
                    <span style={{ fontSize: '11px', color: '#94a3b8' }}>{time}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '12px', color: '#475569', lineHeight: '1.6' }}>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Drawer.Footer>
          <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
            <Drawer.Close asChild>
              <OutlineButton color="gray" size="medium" style={{ flex: 1 }}>
                <OutlineButton.Center>닫기</OutlineButton.Center>
              </OutlineButton>
            </Drawer.Close>
            <Button color="primary" size="medium" style={{ flex: 2 }}>
              <Button.Center>변경사항 저장</Button.Center>
            </Button>
          </div>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  )
}

export const Linear_이슈_상세_패널: Story = {
  name: 'Linear — 이슈 상세 사이드 패널',
  render: () => <LinearIssuePanelRender />,
}

// ─── shadcn/ui: 설정 드로어 (반응형 스크롤 콘텐츠) ───────────────────────────
// shadcn Drawer의 스크롤 가능 콘텐츠 + 하단 고정 액션 패턴
// 긴 콘텐츠가 스크롤되어도 CTA 버튼은 항상 보이는 패턴
const ShadcnSettingsDrawerRender = () => {
  const [notifications, setNotifications] = useState({ email: true, push: false, weekly: true })
  const [theme, setTheme] = useState<'system' | 'light' | 'dark'>('system')
  const [lang, setLang] = useState('ko')

  const toggle = (key: keyof typeof notifications) =>
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))

  return (
    <Drawer>
      <Drawer.Trigger asChild>
        <Button color="gray" size="medium">
          <Button.Center>설정 열기</Button.Center>
        </Button>
      </Drawer.Trigger>
      <Drawer.Content side="right">
        <Drawer.Header>
          <Drawer.Title>환경설정</Drawer.Title>
          <Drawer.Description>알림, 테마, 언어 설정을 관리하세요.</Drawer.Description>
        </Drawer.Header>

        {/* 스크롤 가능 콘텐츠 영역 */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
          {/* 알림 설정 */}
          <section style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '12px 0 8px' }}>
              알림
            </div>
            {[
              { key: 'email' as const, label: '이메일 알림', desc: '중요 업데이트를 이메일로 받습니다' },
              { key: 'push' as const, label: '푸시 알림', desc: '브라우저 푸시 알림을 활성화합니다' },
              { key: 'weekly' as const, label: '주간 요약', desc: '매주 월요일 주간 리포트를 받습니다' },
            ].map(({ key, label, desc }) => (
              <div
                key={key}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}
              >
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 500, color: '#1e293b' }}>{label}</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>{desc}</div>
                </div>
                <div
                  role="switch"
                  aria-checked={notifications[key]}
                  onClick={() => toggle(key)}
                  style={{
                    width: 36, height: 20, borderRadius: 10, cursor: 'pointer',
                    background: notifications[key] ? '#6366f1' : '#e2e8f0',
                    position: 'relative', transition: 'background 0.2s', flexShrink: 0,
                  }}
                >
                  <div style={{
                    width: 16, height: 16, borderRadius: '50%', background: '#fff',
                    position: 'absolute', top: 2, transition: 'left 0.2s',
                    left: notifications[key] ? 18 : 2, boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                  }} />
                </div>
              </div>
            ))}
          </section>

          {/* 테마 설정 */}
          <section style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '12px 0 8px' }}>
              테마
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {(['system', 'light', 'dark'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  style={{
                    flex: 1, padding: '8px 0', borderRadius: '8px', border: `1.5px solid ${theme === t ? '#6366f1' : '#e2e8f0'}`,
                    background: theme === t ? '#eff6ff' : '#fff', color: theme === t ? '#6366f1' : '#64748b',
                    fontSize: '12px', fontWeight: theme === t ? 700 : 400, cursor: 'pointer', transition: 'all 0.15s',
                  }}
                >
                  {t === 'system' ? '시스템' : t === 'light' ? '라이트' : '다크'}
                </button>
              ))}
            </div>
          </section>

          {/* 언어 설정 */}
          <section>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '12px 0 8px' }}>
              언어
            </div>
            {[
              { code: 'ko', label: '한국어' },
              { code: 'en', label: 'English' },
              { code: 'ja', label: '日本語' },
            ].map(({ code, label }) => (
              <div
                key={code}
                onClick={() => setLang(code)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '10px 12px', borderRadius: '8px', cursor: 'pointer', marginBottom: '4px',
                  background: lang === code ? '#eff6ff' : 'transparent',
                  border: `1px solid ${lang === code ? '#c7d2fe' : 'transparent'}`,
                  transition: 'all 0.1s',
                }}
              >
                <span style={{ fontSize: '13px', color: lang === code ? '#6366f1' : '#475569', fontWeight: lang === code ? 600 : 400 }}>{label}</span>
                {lang === code && <span style={{ fontSize: '12px', color: '#6366f1' }}>✓</span>}
              </div>
            ))}
          </section>
        </div>

        {/* 고정 푸터 — shadcn 핵심 패턴: 스크롤과 무관하게 항상 노출 */}
        <Drawer.Footer>
          <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
            <Drawer.Close asChild>
              <OutlineButton color="gray" size="medium" style={{ flex: 1 }}>
                <OutlineButton.Center>취소</OutlineButton.Center>
              </OutlineButton>
            </Drawer.Close>
            <Drawer.Close asChild>
              <Button color="primary" size="medium" style={{ flex: 2 }}>
                <Button.Center>설정 저장</Button.Center>
              </Button>
            </Drawer.Close>
          </div>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  )
}

export const shadcn_설정_드로어: Story = {
  name: 'shadcn/ui — 설정 드로어 (스크롤 콘텐츠 + 고정 푸터)',
  render: () => <ShadcnSettingsDrawerRender />,
}

/* --------------------------------------------------------------------------
   Cycle 66: shadcn/ui + Vercel Design 벤치마크
-------------------------------------------------------------------------- */

/* shadcn/ui Sheet — 검색 + 필터 사이드패널
   shadcn의 Sheet(=Drawer) 핵심 패턴: 우측에서 슬라이드되는 검색/필터 패널.
   헤더에 검색 입력, 바디에 필터 체크리스트, 푸터에 적용/초기화 버튼.
-------------------------------------------------------------------------- */
const FILTER_CATEGORIES = [
  { id: 'ui', label: 'UI 라이브러리', count: 24, active: true },
  { id: 'state', label: '상태관리', count: 12, active: false },
  { id: 'form', label: '폼 라이브러리', count: 8, active: true },
  { id: 'animation', label: '애니메이션', count: 6, active: false },
  { id: 'data', label: '데이터 페칭', count: 9, active: false },
]

const ShadcnSearchFilterRender = () => {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<Set<string>>(new Set(['ui', 'form']))

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const filtered = FILTER_CATEGORIES.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>
        <Button color="primary" size="medium">
          <Button.Center>검색 필터 열기</Button.Center>
        </Button>
      </Drawer.Trigger>
      <Drawer.Content side="right">
        <Drawer.Header>
          <Drawer.Title>패키지 검색 및 필터</Drawer.Title>
          <Drawer.Description>카테고리를 선택해 결과를 좁힐 수 있습니다.</Drawer.Description>
          <div style={{ marginTop: 12 }}>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="카테고리 검색..."
              style={{
                width: '100%', padding: '8px 12px', borderRadius: 8,
                border: '1.5px solid #e2e8f0', fontSize: 13, outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>
        </Drawer.Header>
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '8px 0 6px' }}>
            카테고리 ({selected.size}개 선택)
          </div>
          {filtered.map((cat) => (
            <div
              key={cat.id}
              onClick={() => toggle(cat.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
                borderRadius: 8, cursor: 'pointer', marginBottom: 4,
                background: selected.has(cat.id) ? '#eff6ff' : 'transparent',
                border: `1px solid ${selected.has(cat.id) ? '#c7d2fe' : 'transparent'}`,
                transition: 'all 0.15s',
              }}
            >
              <div style={{
                width: 16, height: 16, borderRadius: 4,
                border: `2px solid ${selected.has(cat.id) ? '#6366f1' : '#cbd5e1'}`,
                background: selected.has(cat.id) ? '#6366f1' : '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                {selected.has(cat.id) && <span style={{ fontSize: 9, color: '#fff', fontWeight: 700 }}>✓</span>}
              </div>
              <span style={{ flex: 1, fontSize: 13, color: selected.has(cat.id) ? '#3730a3' : '#374151', fontWeight: selected.has(cat.id) ? 600 : 400 }}>
                {cat.label}
              </span>
              <span style={{ fontSize: 11, color: '#94a3b8', background: '#f1f5f9', padding: '2px 6px', borderRadius: 4 }}>
                {cat.count}
              </span>
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '32px 0', fontSize: 13, color: '#94a3b8' }}>
              검색 결과가 없습니다.
            </div>
          )}
        </div>
        <Drawer.Footer>
          <div style={{ display: 'flex', gap: 8, width: '100%' }}>
            <OutlineButton color="gray" size="medium" style={{ flex: 1 }} onClick={() => setSelected(new Set())}>
              <OutlineButton.Center>초기화</OutlineButton.Center>
            </OutlineButton>
            <Drawer.Close asChild>
              <Button color="primary" size="medium" style={{ flex: 2 }}>
                <Button.Center>적용 ({selected.size})</Button.Center>
              </Button>
            </Drawer.Close>
          </div>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  )
}

export const shadcn_검색_필터_사이드패널: Story = {
  name: 'shadcn/ui — 검색 필터 사이드패널',
  parameters: {
    docs: {
      description: {
        story: 'shadcn/ui Sheet 패턴. 우측에서 슬라이드되는 검색·필터 패널. 헤더 인라인 검색 입력, 바디 체크리스트, 푸터 적용/초기화 버튼의 3단 구조.',
      },
    },
  },
  render: () => <ShadcnSearchFilterRender />,
}

/* Vercel — 배포 로그 사이드패널
   Vercel 배포 상세 뷰에서 영감. 우측 패널에 로그 스트림을 타임라인으로 표시.
   실시간 업데이트 시뮬레이션과 상태 배지.
-------------------------------------------------------------------------- */
const DEPLOY_LOG_STEPS = [
  { time: '12:01:03', level: 'info', msg: 'Initializing build environment...' },
  { time: '12:01:05', level: 'info', msg: 'Installing dependencies (pnpm install)' },
  { time: '12:01:21', level: 'success', msg: 'Dependencies installed (247 packages)' },
  { time: '12:01:22', level: 'info', msg: 'Running build: pnpm build:storybook' },
  { time: '12:01:38', level: 'warn', msg: 'Some chunks are larger than 500 kB' },
  { time: '12:01:45', level: 'success', msg: 'Build completed in 23s' },
  { time: '12:01:46', level: 'info', msg: 'Uploading artifacts...' },
  { time: '12:01:52', level: 'success', msg: 'Deployment ready: orbit-ui.vercel.app' },
]

const LEVEL_COLOR: Record<string, string> = {
  info: '#6366f1',
  success: '#22c55e',
  warn: '#f59e0b',
  error: '#ef4444',
}

const VercelDeployLogRender = () => {
  const [open, setOpen] = useState(false)
  const [visibleCount, setVisibleCount] = useState(0)
  const [running, setRunning] = useState(false)

  const startDeploy = () => {
    setOpen(true)
    setVisibleCount(0)
    setRunning(true)
  }

  if (running && visibleCount < DEPLOY_LOG_STEPS.length) {
    setTimeout(() => setVisibleCount((c) => c + 1), 400)
  }

  return (
    <Drawer open={open} onOpenChange={(v) => { setOpen(v); if (!v) setRunning(false) }}>
      <Drawer.Trigger asChild>
        <Button color="primary" size="medium" onClick={startDeploy}>
          <Button.Center>배포 시작</Button.Center>
        </Button>
      </Drawer.Trigger>
      <Drawer.Content side="right">
        <Drawer.Header>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Drawer.Title>배포 로그</Drawer.Title>
            {visibleCount < DEPLOY_LOG_STEPS.length && running ? (
              <span style={{ fontSize: 11, background: '#fef3c7', color: '#92400e', padding: '2px 8px', borderRadius: 99, fontWeight: 600 }}>
                진행 중
              </span>
            ) : (
              <span style={{ fontSize: 11, background: '#dcfce7', color: '#166534', padding: '2px 8px', borderRadius: 99, fontWeight: 600 }}>
                완료
              </span>
            )}
          </div>
          <Drawer.Description>실시간 빌드 로그를 확인합니다.</Drawer.Description>
        </Drawer.Header>
        <div style={{ flex: 1, overflowY: 'auto', fontFamily: 'monospace', fontSize: 12, background: '#0f172a', borderRadius: 8, margin: '0 4px', padding: 16 }}>
          {DEPLOY_LOG_STEPS.slice(0, visibleCount).map((log, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'flex-start' }}>
              <span style={{ color: '#475569', flexShrink: 0 }}>{log.time}</span>
              <span style={{ color: LEVEL_COLOR[log.level] ?? '#94a3b8', fontWeight: 700, flexShrink: 0, minWidth: 50 }}>
                [{log.level.toUpperCase()}]
              </span>
              <span style={{ color: '#e2e8f0', wordBreak: 'break-all' }}>{log.msg}</span>
            </div>
          ))}
          {visibleCount < DEPLOY_LOG_STEPS.length && running && (
            <div style={{ color: '#6366f1', animation: 'none' }}>_ </div>
          )}
        </div>
        <Drawer.Footer>
          <Drawer.Close asChild>
            <OutlineButton color="gray" size="medium" style={{ width: '100%' }}>
              <OutlineButton.Center>닫기</OutlineButton.Center>
            </OutlineButton>
          </Drawer.Close>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  )
}

export const Vercel_배포_로그_패널: Story = {
  name: 'Vercel — 배포 로그 사이드패널',
  parameters: {
    docs: {
      description: {
        story: 'Vercel 배포 상세 뷰 패턴. 우측 패널에 모노스페이스 로그 스트림을 타임라인으로 표시. 빌드 진행 상태 배지와 실시간 로그 시뮬레이션.',
      },
    },
  },
  render: () => <VercelDeployLogRender />,
}

/* Vercel — 팀 멤버 초대 드로어
   Vercel 팀 설정의 멤버 초대 플로우. 이메일 + 역할 선택 + 확인의 단계적 UX.
-------------------------------------------------------------------------- */
const ROLES = [
  { id: 'owner', label: 'Owner', desc: '모든 권한 (결제 포함)' },
  { id: 'member', label: 'Member', desc: '프로젝트 배포 및 설정' },
  { id: 'viewer', label: 'Viewer', desc: '읽기 전용 접근' },
]

const VercelInviteRender = () => {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('member')
  const [sent, setSent] = useState(false)

  const handleSend = () => {
    if (!email.trim()) return
    setSent(true)
    setTimeout(() => { setOpen(false); setSent(false); setEmail('') }, 1200)
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>
        <Button color="primary" size="medium">
          <Button.Center>팀원 초대</Button.Center>
        </Button>
      </Drawer.Trigger>
      <Drawer.Content side="right">
        <Drawer.Header>
          <Drawer.Title>팀원 초대</Drawer.Title>
          <Drawer.Description>이메일을 입력하고 역할을 선택하세요.</Drawer.Description>
        </Drawer.Header>
        <div style={{ flex: 1, padding: '8px 0' }}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>
              이메일 주소
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="colleague@company.com"
              style={{
                width: '100%', padding: '9px 12px', borderRadius: 8,
                border: '1.5px solid #e2e8f0', fontSize: 13, outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 8 }}>
              역할 선택
            </label>
            {ROLES.map((r) => (
              <div
                key={r.id}
                onClick={() => setRole(r.id)}
                style={{
                  padding: '12px 14px', borderRadius: 8, marginBottom: 8, cursor: 'pointer',
                  border: `2px solid ${role === r.id ? '#6366f1' : '#e2e8f0'}`,
                  background: role === r.id ? '#eff6ff' : '#fff',
                  transition: 'all 0.15s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    width: 14, height: 14, borderRadius: '50%',
                    border: `2px solid ${role === r.id ? '#6366f1' : '#cbd5e1'}`,
                    background: role === r.id ? '#6366f1' : '#fff',
                    flexShrink: 0,
                  }} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: role === r.id ? '#3730a3' : '#1e293b' }}>
                    {r.label}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: '#64748b', marginTop: 4, paddingLeft: 22 }}>{r.desc}</div>
              </div>
            ))}
          </div>
        </div>
        <Drawer.Footer>
          <div style={{ display: 'flex', gap: 8, width: '100%' }}>
            <Drawer.Close asChild>
              <OutlineButton color="gray" size="medium" style={{ flex: 1 }}>
                <OutlineButton.Center>취소</OutlineButton.Center>
              </OutlineButton>
            </Drawer.Close>
            <Button
              color={sent ? 'gray' : 'primary'}
              size="medium"
              style={{ flex: 2 }}
              onClick={handleSend}
              disabled={!email.trim() || sent}
            >
              <Button.Center>{sent ? '초대 완료!' : '초대 전송'}</Button.Center>
            </Button>
          </div>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  )
}

export const Vercel_팀_멤버_초대_드로어: Story = {
  name: 'Vercel — 팀 멤버 초대 드로어',
  parameters: {
    docs: {
      description: {
        story: 'Vercel 팀 설정 초대 플로우. 이메일 입력 + 역할 선택(Owner/Member/Viewer) + 전송 확인. 간결한 단일 패널에 완전한 초대 워크플로우를 담은 패턴.',
      },
    },
  },
  render: () => <VercelInviteRender />,
}
