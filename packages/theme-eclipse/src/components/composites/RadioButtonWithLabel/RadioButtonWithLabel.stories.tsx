import { Flex } from '@heejun-com/core'
import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { RadioGroup } from '../RadioGroup'

import { RadioButtonWithLabel } from './RadioButtonWithLabel'

RadioButtonWithLabel.displayName = 'RadioButtonWithLabel'

const meta = {
  title: 'eclipse/Inputs/Selection/RadioButtonWithLabel',
  component: RadioButtonWithLabel,
  args: {
    disabled: false,
  },
  argTypes: {
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof RadioButtonWithLabel>

type Story = StoryObj<typeof meta>

export default meta

export const 기본 = {
  render: (args) => {
    return (
      <RadioGroup defaultValue="foundation" name="color">
        <Flex rowGap="25px" flexDirection={'column'}>
          <RadioButtonWithLabel {...args} value="blue" alignItems="center">
            인디고
          </RadioButtonWithLabel>
          <RadioButtonWithLabel {...args} value="foundation" disabled>
            파운데이션
          </RadioButtonWithLabel>
          <RadioButtonWithLabel {...args} value="primary">
            에메랄드
          </RadioButtonWithLabel>
        </Flex>
      </RadioGroup>
    )
  },
} satisfies Story

export const 디자인QA = {
  args: {
    disabledAll: false,
    disabledSecond: false,
    flexDirection: 'column',
    rowGap: '25px',
    columnGap: '25px',
    labelText: '파운데이션',
  },
  argTypes: {
    disabled: {
      control: 'never',
    },
    flexDirection: {
      control: 'select',
      options: ['row', 'column'],
      description: '라디오 그룹 내부 라디오 배치 방식',
    },
    rowGap: {
      control: 'text',
      description: '라디오 그룹 내부 라디오 간격',
    },
    columnGap: {
      control: 'text',
      description: '라디오 그룹 내부 라디오 간격',
    },
    labelText: {
      control: 'text',
      description: '두 번째 라디오 라벨 텍스트',
    },
    disabledAll: {
      control: 'boolean',
      description: '라디오 그룹 전체 비활성화 여부',
    },
    disabledSecond: {
      control: 'boolean',
      description: '두 번째 라디오 비활성화 여부',
    },
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  render: (args: any) => (
    <RadioGroup defaultValue="blue" name="color" {...args} disabled={args.disabledAll}>
      <div style={{ marginBottom: '25px' }}>첫 번째 라디오는 라벨이 없어요</div>
      <Flex rowGap={args.rowGap} columnGap={args.columnGap} flexDirection={args.flexDirection}>
        <Flex columnGap="10px">
          <RadioButtonWithLabel {...args} value="blue" />
        </Flex>
        <Flex columnGap="10px">
          <RadioButtonWithLabel {...args} value="foundation" disabled={args.disabledSecond}>
            {args.labelText}
          </RadioButtonWithLabel>
        </Flex>
        <Flex columnGap="10px">
          <RadioButtonWithLabel {...args} value="primary">
            에메랄드
          </RadioButtonWithLabel>
        </Flex>
      </Flex>
    </RadioGroup>
  ),
}

/* ── Linear: 뷰 밀도 선택 ── */
const DensityPickerDemo = () => {
  const [density, setDensity] = useState<'compact' | 'default' | 'comfortable'>('default')

  const options: { value: 'compact' | 'default' | 'comfortable'; label: string; desc: string; rows: number }[] = [
    { value: 'compact', label: 'Compact', desc: '더 많은 항목을 한 화면에 표시 (행 높이 32px)', rows: 8 },
    { value: 'default', label: 'Default', desc: '균형 잡힌 기본 밀도 (행 높이 40px)', rows: 6 },
    { value: 'comfortable', label: 'Comfortable', desc: '여유 있는 간격으로 읽기 편안 (행 높이 56px)', rows: 4 },
  ]

  const rowH = density === 'compact' ? 32 : density === 'comfortable' ? 56 : 40

  return (
    <div style={{ maxWidth: 480, display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)', marginBottom: 12 }}>뷰 밀도</div>
        <RadioGroup value={density} onChange={(e) => setDensity(e.target.value as typeof density)} name="density">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {options.map((opt) => (
              <div
                key={opt.value}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 10,
                  padding: '10px 14px',
                  borderRadius: 8,
                  border: `1px solid ${density === opt.value ? 'var(--sem-eclipse-color-fillPrimary)' : 'var(--sem-eclipse-color-borderSubtle)'}`,
                  background: density === opt.value ? 'color-mix(in srgb, var(--sem-eclipse-color-fillPrimary) 5%, var(--sem-eclipse-color-backgroundPrimary))' : 'var(--sem-eclipse-color-backgroundPrimary)',
                  cursor: 'pointer',
                  transition: 'border-color 0.15s, background 0.15s',
                }}
                onClick={() => setDensity(opt.value)}
              >
                <div style={{ paddingTop: 2 }}>
                  <RadioButtonWithLabel value={opt.value} alignItems="center" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>{opt.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--sem-eclipse-color-foregroundTertiary)', marginTop: 2 }}>{opt.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>

      {/* Preview */}
      <div style={{ borderRadius: 8, border: '1px solid var(--sem-eclipse-color-borderDefault)', overflow: 'hidden' }}>
        <div style={{ padding: '8px 12px', background: 'var(--sem-eclipse-color-backgroundSecondary)', borderBottom: '1px solid var(--sem-eclipse-color-borderSubtle)', fontSize: 12, fontWeight: 600, color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>
          미리보기 — {density} density
        </div>
        {['이슈 #101', '이슈 #102', '이슈 #103'].map((item, i) => (
          <div
            key={item}
            style={{
              height: rowH,
              display: 'flex',
              alignItems: 'center',
              padding: '0 12px',
              borderBottom: i < 2 ? '1px solid var(--sem-eclipse-color-borderSubtle)' : 'none',
              fontSize: density === 'compact' ? 12 : 13,
              color: 'var(--sem-eclipse-color-foregroundPrimary)',
              transition: 'height 0.2s ease',
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

export const Linear_뷰_밀도_선택: Story = {
  name: 'Linear — 뷰 밀도 선택 (Compact/Default/Comfortable)',
  render: () => <DensityPickerDemo />,
}

/* ── Linear: 테마/시스템 환경 설정 ── */
const ThemePickerDemo = () => {
  const [theme, setTheme] = useState<'system' | 'light' | 'dark'>('system')

  const options: { value: 'system' | 'light' | 'dark'; label: string; desc: string; icon: string }[] = [
    { value: 'system', label: '시스템 설정 따름', desc: 'OS 다크모드/라이트모드를 자동으로 감지해요.', icon: '⬡' },
    { value: 'light', label: '라이트 모드', desc: '밝은 배경으로 항상 고정해요.', icon: '○' },
    { value: 'dark', label: '다크 모드', desc: '어두운 배경으로 항상 고정해요.', icon: '●' },
  ]

  return (
    <div style={{ maxWidth: 420 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)', marginBottom: 4 }}>테마</div>
      <div style={{ fontSize: 13, color: 'var(--sem-eclipse-color-foregroundTertiary)', marginBottom: 16 }}>인터페이스 색상 테마를 선택하세요.</div>
      <RadioGroup value={theme} onChange={(e) => setTheme(e.target.value as typeof theme)} name="theme">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: '1px solid var(--sem-eclipse-color-borderDefault)', borderRadius: 8, overflow: 'hidden' }}>
          {options.map((opt, i) => (
            <div
              key={opt.value}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 16px',
                borderBottom: i < options.length - 1 ? '1px solid var(--sem-eclipse-color-borderSubtle)' : 'none',
                background: theme === opt.value ? 'var(--sem-eclipse-color-backgroundSecondary)' : 'var(--sem-eclipse-color-backgroundPrimary)',
                cursor: 'pointer',
              }}
              onClick={() => setTheme(opt.value)}
            >
              <span style={{ fontSize: 18, width: 24, textAlign: 'center', color: 'var(--sem-eclipse-color-foregroundSecondary)' }}>{opt.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>{opt.label}</div>
                <div style={{ fontSize: 12, color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>{opt.desc}</div>
              </div>
              <RadioButtonWithLabel value={opt.value} alignItems="center" />
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  )
}

export const Linear_테마_선택: Story = {
  name: 'Linear — 테마 선택 (System/Light/Dark)',
  render: () => <ThemePickerDemo />,
}

/* ── Linear: 알림 우선순위 설정 ── */
const NotifPriorityDemo = () => {
  const [priority, setPriority] = useState<string>('important')

  const options: { value: string; label: string; desc: string; badge: string; color: string }[] = [
    { value: 'all', label: '모든 알림', desc: '댓글, 멘션, 상태 변경 모두 수신', badge: '최대', color: '#64748b' },
    { value: 'important', label: '중요 알림만', desc: '나를 멘션하거나 직접 관련된 이슈만 수신', badge: '권장', color: '#6366f1' },
    { value: 'critical', label: '긴급 알림만', desc: '마감 임박, 차단 상태 이슈만 수신', badge: '최소', color: '#ef4444' },
    { value: 'none', label: '알림 끄기', desc: '모든 알림을 비활성화 (이메일 포함)', badge: '없음', color: '#94a3b8' },
  ]

  return (
    <div style={{ maxWidth: 440 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)', marginBottom: 4 }}>알림 빈도</div>
      <div style={{ fontSize: 13, color: 'var(--sem-eclipse-color-foregroundTertiary)', marginBottom: 16 }}>받을 알림의 범위와 우선순위를 설정하세요.</div>
      <RadioGroup value={priority} onChange={(e) => setPriority(e.target.value)} name="notif-priority">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {options.map((opt) => (
            <div
              key={opt.value}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 14px',
                borderRadius: 8,
                border: `1px solid ${priority === opt.value ? opt.color : 'var(--sem-eclipse-color-borderSubtle)'}`,
                background: priority === opt.value ? `${opt.color}0D` : 'var(--sem-eclipse-color-backgroundPrimary)',
                cursor: 'pointer',
                transition: 'border-color 0.15s, background 0.15s',
              }}
              onClick={() => setPriority(opt.value)}
            >
              <RadioButtonWithLabel value={opt.value} alignItems="center" />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>{opt.label}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: '1px 7px', borderRadius: 10, background: `${opt.color}20`, color: opt.color }}>{opt.badge}</span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>{opt.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  )
}

export const Linear_알림_우선순위: Story = {
  name: 'Linear — 알림 우선순위 설정',
  render: () => <NotifPriorityDemo />,
}
