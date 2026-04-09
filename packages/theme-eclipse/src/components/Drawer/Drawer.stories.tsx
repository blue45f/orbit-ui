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
