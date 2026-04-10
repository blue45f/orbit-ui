import { useUniqueID } from '@heejun-com/core'
import { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'

import { RadioButtonWithLabel } from '../RadioButtonWithLabel'
import { RadioGroup, useRadioGroupContext } from './RadioGroup'

RadioGroup.displayName = 'RadioGroup'

const meta = {
  title: 'eclipse/Inputs/Selection/RadioGroup',
  component: RadioGroup,
  args: {
    name: '',
    children: '',
  },
  argTypes: {
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof RadioGroup>

type Story = StoryObj<typeof meta>

export default meta

export const 기본 = {
  render: (args) => (
    <RadioGroup {...args}>
      <input type="radio" />
    </RadioGroup>
  ),
} satisfies Story

const Radio: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
  const { id: idProp, name: nameProp, value, children, ...rest } = props
  const { name, checkedValue } = useRadioGroupContext('Radio')
  const id = useUniqueID(idProp)
  const checked = checkedValue === value

  return (
    <>
      <input
        type="radio"
        {...rest}
        id={id}
        value={value}
        name={name || nameProp}
        checked={checked}
        readOnly
      />
      <label htmlFor={id}>{children}</label>
    </>
  )
}

export const 제어 = {
  render: function Controlled(args) {
    const [value, setValue] = useState('blue')

    return (
      <RadioGroup
        name="pkg"
        value={value}
        onChange={(e) => {
          args.onChange?.(e)
          setValue(e.target.value)
        }}
      >
        <Radio id="controlled-1" value="blue">
          인디고
        </Radio>
        <Radio id="controlled-2" value="foundation">
          코어
        </Radio>
        <Radio id="controlled-3" value="primary">
          에메랄드
        </Radio>
      </RadioGroup>
    )
  },
} satisfies Story

export const 비제어 = {
  render: function Uncontrolled(args) {
    return (
      <RadioGroup name="pkg" defaultValue="blue" onChange={args.onChange}>
        <Radio id="uncontrolled-1" value="blue">
          인디고
        </Radio>
        <Radio id="uncontrolled-2" value="foundation">
          코어
        </Radio>
        <Radio id="uncontrolled-3" value="primary">
          에메랄드
        </Radio>
      </RadioGroup>
    )
  },
} satisfies Story

/* ── Vercel: 배포 환경 선택 ── */
const DeployTargetDemo = () => {
  const [env, setEnv] = useState<string>('preview')

  const envs: { value: string; label: string; desc: string; badge: string; badgeColor: string }[] = [
    { value: 'production', label: 'Production', desc: '실제 서비스 사용자에게 배포됩니다. 신중히 선택하세요.', badge: 'Live', badgeColor: '#10b981' },
    { value: 'preview', label: 'Preview', desc: 'PR마다 독립적인 미리보기 URL이 생성됩니다.', badge: '권장', badgeColor: '#6366f1' },
    { value: 'development', label: 'Development', desc: '로컬 개발 환경. 변경사항이 즉시 반영됩니다.', badge: 'Dev', badgeColor: '#f59e0b' },
  ]

  return (
    <div style={{ maxWidth: 460 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)', marginBottom: 4 }}>배포 환경</div>
      <div style={{ fontSize: 13, color: 'var(--sem-eclipse-color-foregroundTertiary)', marginBottom: 16 }}>변경사항이 배포될 환경을 선택하세요.</div>
      <RadioGroup value={env} onChange={(e) => setEnv(e.target.value)} name="deploy-env">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: '1px solid var(--sem-eclipse-color-borderDefault)', borderRadius: 8, overflow: 'hidden' }}>
          {envs.map((item, i) => (
            <div
              key={item.value}
              onClick={() => setEnv(item.value)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 16px',
                borderBottom: i < envs.length - 1 ? '1px solid var(--sem-eclipse-color-borderSubtle)' : 'none',
                background: env === item.value ? 'var(--sem-eclipse-color-backgroundSecondary)' : 'var(--sem-eclipse-color-backgroundPrimary)',
                cursor: 'pointer',
                transition: 'background 0.1s',
              }}
            >
              <RadioButtonWithLabel value={item.value} alignItems="center" />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>{item.label}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: '1px 7px', borderRadius: 10, background: `${item.badgeColor}20`, color: item.badgeColor }}>{item.badge}</span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </RadioGroup>
      <div style={{ marginTop: 12, padding: '8px 12px', borderRadius: 6, background: 'var(--sem-eclipse-color-backgroundSecondary)', fontSize: 12, color: 'var(--sem-eclipse-color-foregroundSecondary)' }}>
        선택: <strong style={{ color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>{envs.find((e) => e.value === env)?.label}</strong> 환경으로 배포합니다.
      </div>
    </div>
  )
}

export const Vercel_배포_환경_선택: Story = {
  name: 'Vercel — 배포 환경 선택',
  render: () => <DeployTargetDemo />,
}

/* ── Vercel: 엣지 지역 선택 ── */
const RegionPickerDemo = () => {
  const [region, setRegion] = useState<string>('icn1')

  const regions: { value: string; label: string; location: string; latency: number }[] = [
    { value: 'icn1', label: 'Seoul (ICN)', location: '아시아 태평양', latency: 12 },
    { value: 'sin1', label: 'Singapore (SIN)', location: '아시아 태평양', latency: 78 },
    { value: 'hnd1', label: 'Tokyo (HND)', location: '아시아 태평양', latency: 34 },
    { value: 'cdg1', label: 'Paris (CDG)', location: '유럽', latency: 220 },
    { value: 'iad1', label: 'Washington (IAD)', location: '북미', latency: 185 },
    { value: 'sfo1', label: 'San Francisco (SFO)', location: '북미', latency: 200 },
  ]

  const getLatencyColor = (ms: number) =>
    ms < 50 ? '#10b981' : ms < 100 ? '#f59e0b' : '#ef4444'

  return (
    <div style={{ maxWidth: 440 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)', marginBottom: 4 }}>엣지 네트워크 지역</div>
      <div style={{ fontSize: 13, color: 'var(--sem-eclipse-color-foregroundTertiary)', marginBottom: 16 }}>가장 낮은 레이턴시의 지역을 선택하세요. 현재 위치 기준 측정값입니다.</div>
      <RadioGroup value={region} onChange={(e) => setRegion(e.target.value)} name="region">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {regions.map((r) => (
            <div
              key={r.value}
              onClick={() => setRegion(r.value)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '8px 12px',
                borderRadius: 6,
                border: `1px solid ${region === r.value ? 'var(--sem-eclipse-color-fillPrimary)' : 'var(--sem-eclipse-color-borderSubtle)'}`,
                background: region === r.value ? 'color-mix(in srgb, var(--sem-eclipse-color-fillPrimary) 5%, var(--sem-eclipse-color-backgroundPrimary))' : 'var(--sem-eclipse-color-backgroundPrimary)',
                cursor: 'pointer',
                transition: 'border-color 0.15s, background 0.15s',
              }}
            >
              <RadioButtonWithLabel value={r.value} alignItems="center" />
              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>{r.label}</span>
                <span style={{ fontSize: 11, color: 'var(--sem-eclipse-color-foregroundQuaternary)', marginLeft: 6 }}>{r.location}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: getLatencyColor(r.latency), display: 'inline-block' }} />
                <span style={{ fontSize: 12, fontFamily: 'monospace', color: getLatencyColor(r.latency), fontWeight: 600 }}>{r.latency}ms</span>
              </div>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  )
}

export const Vercel_엣지_지역_선택: Story = {
  name: 'Vercel — 엣지 지역 선택 (레이턴시 표시)',
  render: () => <RegionPickerDemo />,
}

/* ── Vercel: 빌드 출력 설정 ── */
const BuildOutputDemo = () => {
  const [output, setOutput] = useState<string>('auto')

  const options: { value: string; label: string; desc: string; example: string }[] = [
    { value: 'auto', label: '자동 감지', desc: '프레임워크를 자동으로 인식해 최적 설정을 적용합니다.', example: 'Next.js → .next/' },
    { value: 'static', label: '정적 파일', desc: '빌드 결과물이 정적 HTML/CSS/JS 파일로 구성됩니다.', example: 'Vite → dist/' },
    { value: 'edge', label: 'Edge Function', desc: '엣지에서 서버사이드 로직을 실행합니다.', example: 'Hono, Remix Edge' },
    { value: 'serverless', label: 'Serverless', desc: '서버리스 함수를 통해 동적 렌더링을 처리합니다.', example: 'Lambda, Vercel Functions' },
  ]

  return (
    <div style={{ maxWidth: 460 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)', marginBottom: 4 }}>빌드 출력 유형</div>
      <div style={{ fontSize: 13, color: 'var(--sem-eclipse-color-foregroundTertiary)', marginBottom: 16 }}>애플리케이션의 렌더링 전략을 선택하세요.</div>
      <RadioGroup value={output} onChange={(e) => setOutput(e.target.value)} name="build-output">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => setOutput(opt.value)}
              style={{
                padding: '12px 14px',
                borderRadius: 8,
                border: `1.5px solid ${output === opt.value ? 'var(--sem-eclipse-color-fillPrimary)' : 'var(--sem-eclipse-color-borderSubtle)'}`,
                background: output === opt.value ? 'color-mix(in srgb, var(--sem-eclipse-color-fillPrimary) 6%, var(--sem-eclipse-color-backgroundPrimary))' : 'var(--sem-eclipse-color-backgroundPrimary)',
                cursor: 'pointer',
                transition: 'border-color 0.15s, background 0.15s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <RadioButtonWithLabel value={opt.value} alignItems="center" />
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>{opt.label}</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--sem-eclipse-color-foregroundTertiary)', lineHeight: 1.5, marginBottom: 4 }}>{opt.desc}</div>
              <code style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--sem-eclipse-color-fillPrimary)', background: 'var(--sem-eclipse-color-backgroundSecondary)', padding: '1px 6px', borderRadius: 4 }}>{opt.example}</code>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  )
}

export const Vercel_빌드_출력_설정: Story = {
  name: 'Vercel — 빌드 출력 유형 선택 (그리드형)',
  render: () => <BuildOutputDemo />,
}

/* --------------------------------------------------------------------------
   Google Material 3 벤치마크: 제안 칩 RadioGroup 패턴
   M3의 Suggestion Chip은 시스템이 추천하는 옵션을 제공합니다.
   RadioGroup과 결합해 "빠른 선택" UX를 구현합니다.
-------------------------------------------------------------------------- */
const M3SuggestionChipDemo = () => {
  const [selected, setSelected] = useState<string>('')
  const [customInput, setCustomInput] = useState('')

  const SUGGESTIONS = [
    { value: '15min', label: '15분 후' },
    { value: '1hr', label: '1시간 후' },
    { value: '3hr', label: '3시간 후' },
    { value: 'tomorrow', label: '내일' },
    { value: 'nextweek', label: '다음 주' },
  ]

  return (
    <div style={{ maxWidth: 440, display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)', marginBottom: 4 }}>알림 미루기</div>
        <div style={{ fontSize: 12, color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>M3 Suggestion Chip — 시스템 추천 옵션 패턴</div>
      </div>

      {/* M3 Suggestion Chip 스타일 빠른 선택 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {SUGGESTIONS.map((s) => (
          <button
            key={s.value}
            onClick={() => { setSelected(s.value); setCustomInput('') }}
            style={{
              padding: '6px 16px',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: selected === s.value ? 700 : 400,
              border: `1px solid ${selected === s.value ? 'var(--sem-eclipse-color-fillPrimary)' : 'var(--sem-eclipse-color-borderDefault)'}`,
              background: selected === s.value ? 'color-mix(in srgb, var(--sem-eclipse-color-fillPrimary) 10%, var(--sem-eclipse-color-backgroundPrimary))' : 'var(--sem-eclipse-color-backgroundPrimary)',
              color: selected === s.value ? 'var(--sem-eclipse-color-fillPrimary)' : 'var(--sem-eclipse-color-foregroundSecondary)',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div style={{ borderTop: '1px solid var(--sem-eclipse-color-borderSubtle)', paddingTop: 12 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--sem-eclipse-color-foregroundTertiary)', marginBottom: 10 }}>또는 시간 직접 선택:</div>
        <RadioGroup value={selected} onChange={(e) => { setSelected(e.target.value); setCustomInput('') }} name="snooze">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              { value: '30min', label: '30분 후' },
              { value: '2hr', label: '2시간 후' },
              { value: 'weekend', label: '주말' },
              { value: 'custom', label: '직접 입력' },
            ].map((opt) => (
              <div key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <RadioButtonWithLabel value={opt.value} alignItems="center">
                  <span style={{ fontSize: 13, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>{opt.label}</span>
                </RadioButtonWithLabel>
                {opt.value === 'custom' && selected === 'custom' && (
                  <input
                    type="datetime-local"
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    style={{ padding: '4px 8px', borderRadius: 6, border: '1px solid var(--sem-eclipse-color-borderDefault)', fontSize: 12, color: 'var(--sem-eclipse-color-foregroundPrimary)', background: 'var(--sem-eclipse-color-backgroundPrimary)' }}
                  />
                )}
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>

      {selected && (
        <div style={{ padding: '8px 12px', borderRadius: 6, background: 'var(--sem-eclipse-color-backgroundSecondary)', fontSize: 12, color: 'var(--sem-eclipse-color-foregroundSecondary)' }}>
          선택됨: <strong style={{ color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>
            {[...SUGGESTIONS, { value: '30min', label: '30분 후' }, { value: '2hr', label: '2시간 후' }, { value: 'weekend', label: '주말' }, { value: 'custom', label: '직접 입력' }].find((s) => s.value === selected)?.label}
          </strong>
          {selected === 'custom' && customInput && ` — ${customInput}`}
        </div>
      )}
    </div>
  )
}

export const M3_제안_칩_RadioGroup: Story = {
  name: 'Material 3 — Suggestion Chip + RadioGroup 빠른 선택',
  render: () => <M3SuggestionChipDemo />,
}

/* --------------------------------------------------------------------------
   Google Material 3 벤치마크: 동적 색상 체계 선택 패턴
   M3의 Dynamic Color — Primary/Secondary/Tertiary/Neutral 역할 체계로
   앱 테마를 동적으로 변경합니다.
-------------------------------------------------------------------------- */
const M3DynamicColorDemo = () => {
  const [scheme, setScheme] = useState<string>('indigo')

  const SCHEMES = [
    {
      value: 'indigo',
      label: 'Indigo',
      primary: '#6366f1',
      secondary: '#818cf8',
      tertiary: '#a5b4fc',
      surface: '#eef2ff',
      onPrimary: '#fff',
    },
    {
      value: 'emerald',
      label: 'Emerald',
      primary: '#10b981',
      secondary: '#34d399',
      tertiary: '#6ee7b7',
      surface: '#ecfdf5',
      onPrimary: '#fff',
    },
    {
      value: 'amber',
      label: 'Amber',
      primary: '#f59e0b',
      secondary: '#fbbf24',
      tertiary: '#fcd34d',
      surface: '#fffbeb',
      onPrimary: '#000',
    },
    {
      value: 'rose',
      label: 'Rose',
      primary: '#f43f5e',
      secondary: '#fb7185',
      tertiary: '#fda4af',
      surface: '#fff1f2',
      onPrimary: '#fff',
    },
  ]

  const active = SCHEMES.find((s) => s.value === scheme)!

  return (
    <div style={{ maxWidth: 460, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)', marginBottom: 4 }}>M3 동적 색상 체계</div>
        <div style={{ fontSize: 12, color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>Primary / Secondary / Tertiary / Surface 역할 기반 색상 시스템</div>
      </div>

      <RadioGroup value={scheme} onChange={(e) => setScheme(e.target.value)} name="color-scheme">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {SCHEMES.map((s) => (
            <div
              key={s.value}
              onClick={() => setScheme(s.value)}
              style={{
                padding: '10px 12px',
                borderRadius: 8,
                border: `1.5px solid ${scheme === s.value ? s.primary : 'var(--sem-eclipse-color-borderSubtle)'}`,
                background: scheme === s.value ? s.surface : 'var(--sem-eclipse-color-backgroundPrimary)',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <RadioButtonWithLabel value={s.value} alignItems="center" />
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>{s.label}</span>
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                {[s.primary, s.secondary, s.tertiary].map((color, i) => (
                  <div key={i} style={{ flex: 1, height: 8, borderRadius: 4, background: color }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </RadioGroup>

      {/* Preview panel */}
      <div style={{ padding: '16px', borderRadius: 10, background: active.surface, border: `1px solid ${active.primary}30` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: active.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 14, color: active.onPrimary, fontWeight: 700 }}>A</span>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: active.primary }}>{active.label} Theme 미리보기</div>
            <div style={{ fontSize: 11, color: active.secondary }}>Primary · Secondary · Tertiary</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ flex: 1, padding: '8px', borderRadius: 6, background: active.primary, fontSize: 11, fontWeight: 700, color: active.onPrimary, textAlign: 'center' }}>Primary</div>
          <div style={{ flex: 1, padding: '8px', borderRadius: 6, background: active.secondary, fontSize: 11, fontWeight: 700, color: active.onPrimary, textAlign: 'center' }}>Secondary</div>
          <div style={{ flex: 1, padding: '8px', borderRadius: 6, background: active.tertiary, fontSize: 11, fontWeight: 700, color: active.onPrimary, textAlign: 'center' }}>Tertiary</div>
        </div>
      </div>
    </div>
  )
}

export const M3_동적_색상_체계: Story = {
  name: 'Material 3 — 동적 색상 체계 선택 (Primary/Secondary/Tertiary 역할)',
  render: () => <M3DynamicColorDemo />,
}

/* --------------------------------------------------------------------------
   Google Material 3 벤치마크: 어시스트 칩 RadioGroup — 빠른 액션
   M3의 Assist Chip은 시스템이 제안하는 행동을 나타냅니다.
   RadioGroup으로 인보이스 상태를 선택하면 어시스트 칩이 다음 권장 액션을 제안합니다.
-------------------------------------------------------------------------- */
const M3AssistChipDemo = () => {
  const [status, setStatus] = useState<string>('draft')

  const STATUSES = [
    { value: 'draft', label: '초안', color: '#94a3b8', bg: '#f1f5f9' },
    { value: 'sent', label: '발송됨', color: '#6366f1', bg: '#eef2ff' },
    { value: 'viewed', label: '열람됨', color: '#f59e0b', bg: '#fffbeb' },
    { value: 'paid', label: '결제됨', color: '#10b981', bg: '#ecfdf5' },
    { value: 'overdue', label: '연체됨', color: '#ef4444', bg: '#fef2f2' },
  ]

  const ASSIST_ACTIONS: Record<string, { label: string; icon: string }[]> = {
    draft:   [{ label: '발송하기', icon: '→' }, { label: '미리보기', icon: '👁' }, { label: '복사', icon: '⎘' }],
    sent:    [{ label: '리마인더 전송', icon: '🔔' }, { label: '상태 확인', icon: '✓' }, { label: '취소', icon: '✕' }],
    viewed:  [{ label: '후속 연락', icon: '📞' }, { label: '리마인더', icon: '🔔' }, { label: '수정', icon: '✏' }],
    paid:    [{ label: '영수증 발행', icon: '🧾' }, { label: '감사 메일', icon: '✉' }, { label: '아카이브', icon: '📁' }],
    overdue: [{ label: '독촉장 발송', icon: '⚠' }, { label: '연장 허용', icon: '⏱' }, { label: '법적 조치', icon: '⚖' }],
  }

  const currentStatus = STATUSES.find((s) => s.value === status)!
  const actions = ASSIST_ACTIONS[status]

  return (
    <div style={{ maxWidth: 460, display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)', marginBottom: -4 }}>인보이스 상태 관리</div>
      <div style={{ fontSize: 12, color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>M3 Assist Chip — 상태에 따른 권장 액션 제안</div>

      <RadioGroup value={status} onChange={(e) => setStatus(e.target.value)} name="invoice-status">
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {STATUSES.map((s) => (
            <div
              key={s.value}
              onClick={() => setStatus(s.value)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 12px',
                borderRadius: 20,
                border: `1px solid ${status === s.value ? s.color : 'var(--sem-eclipse-color-borderSubtle)'}`,
                background: status === s.value ? s.bg : 'var(--sem-eclipse-color-backgroundPrimary)',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              <RadioButtonWithLabel value={s.value} alignItems="center" />
              <span style={{ fontSize: 12, fontWeight: status === s.value ? 700 : 400, color: status === s.value ? s.color : 'var(--sem-eclipse-color-foregroundSecondary)' }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </RadioGroup>

      {/* Assist Chips */}
      <div style={{ padding: '12px 14px', borderRadius: 8, background: currentStatus.bg, border: `1px solid ${currentStatus.color}30` }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: currentStatus.color, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          권장 액션 — {currentStatus.label}
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {actions.map((action) => (
            <button
              key={action.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 12px',
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 500,
                border: `1px solid ${currentStatus.color}60`,
                background: 'var(--sem-eclipse-color-backgroundPrimary)',
                color: currentStatus.color,
                cursor: 'pointer',
                transition: 'background 0.1s',
              }}
            >
              <span>{action.icon}</span>
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export const M3_어시스트_칩_RadioGroup: Story = {
  name: 'Material 3 — Assist Chip + RadioGroup 상태별 권장 액션',
  render: () => <M3AssistChipDemo />,
}

/* ── Tailwind UI: 배송 방법 선택 ── */
const ShippingMethodDemo = () => {
  const [method, setMethod] = useState('standard')

  const methods = [
    { value: 'standard', label: '일반 배송', desc: '4~6일 소요', price: '무료', badge: '' },
    { value: 'express', label: '빠른 배송', desc: '2~3일 소요', price: '₩3,000', badge: '' },
    { value: 'overnight', label: '당일 배송', desc: '오늘 도착 (오후 2시 이전 주문)', price: '₩8,000', badge: '인기' },
  ]

  return (
    <div style={{ maxWidth: 420 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)', marginBottom: 14 }}>배송 방법 선택 (Tailwind UI 패턴)</div>
      <RadioGroup value={method} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMethod(e.target.value)} name="shipping">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: '1px solid var(--sem-eclipse-color-borderDefault)', borderRadius: 8, overflow: 'hidden' }}>
          {methods.map((m, i) => (
            <div
              key={m.value}
              onClick={() => setMethod(m.value)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '14px 16px',
                borderBottom: i < methods.length - 1 ? '1px solid var(--sem-eclipse-color-borderSubtle)' : 'none',
                background: method === m.value ? 'color-mix(in srgb, var(--sem-eclipse-color-fillPrimary) 5%, var(--sem-eclipse-color-backgroundPrimary))' : 'var(--sem-eclipse-color-backgroundPrimary)',
                cursor: 'pointer',
                transition: 'background 0.12s',
              }}
            >
              <RadioButtonWithLabel value={m.value} alignItems="center" />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>{m.label}</span>
                  {m.badge && <span style={{ fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 8, background: '#6366f1', color: '#fff' }}>{m.badge}</span>}
                </div>
                <div style={{ fontSize: 12, color: 'var(--sem-eclipse-color-foregroundTertiary)', marginTop: 1 }}>{m.desc}</div>
              </div>
              <span style={{ fontSize: 14, fontWeight: 700, color: method === m.value ? 'var(--sem-eclipse-color-fillPrimary)' : 'var(--sem-eclipse-color-foregroundPrimary)' }}>{m.price}</span>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  )
}

export const Tailwind_배송_방법_선택: Story = {
  name: 'Tailwind UI — 배송 방법 선택',
  render: () => <ShippingMethodDemo />,
}

/* ── Tailwind UI: 팀 역할 권한 선택 ── */
const TeamRoleDemo = () => {
  const [role, setRole] = useState('editor')

  const roles = [
    {
      value: 'viewer',
      label: '뷰어',
      desc: '읽기 전용 접근. 모든 컨텐츠를 볼 수 있지만 수정은 불가.',
      permissions: ['읽기'],
      color: '#94a3b8',
    },
    {
      value: 'editor',
      label: '편집자',
      desc: '컨텐츠 생성 및 편집. 멤버 관리 및 설정은 제외.',
      permissions: ['읽기', '쓰기', '편집'],
      color: '#6366f1',
    },
    {
      value: 'admin',
      label: '관리자',
      desc: '전체 접근 권한. 멤버 초대, 설정 변경, 결제 관리 가능.',
      permissions: ['읽기', '쓰기', '편집', '관리', '결제'],
      color: '#ef4444',
    },
  ]

  return (
    <div style={{ maxWidth: 440 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)', marginBottom: 6 }}>역할 선택</div>
      <div style={{ fontSize: 13, color: 'var(--sem-eclipse-color-foregroundTertiary)', marginBottom: 14 }}>팀 멤버의 권한 수준을 결정합니다</div>
      <RadioGroup value={role} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRole(e.target.value)} name="role">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {roles.map((r) => (
            <div
              key={r.value}
              onClick={() => setRole(r.value)}
              style={{
                padding: '14px 16px',
                borderRadius: 8,
                border: `2px solid ${role === r.value ? r.color : 'var(--sem-eclipse-color-borderSubtle)'}`,
                background: role === r.value ? `${r.color}08` : 'var(--sem-eclipse-color-backgroundPrimary)',
                cursor: 'pointer',
                transition: 'border-color 0.15s, background 0.15s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <RadioButtonWithLabel value={r.value} alignItems="center" />
                <span style={{ fontSize: 14, fontWeight: 700, color: role === r.value ? r.color : 'var(--sem-eclipse-color-foregroundPrimary)' }}>{r.label}</span>
              </div>
              <div style={{ paddingLeft: 26, fontSize: 12, color: 'var(--sem-eclipse-color-foregroundTertiary)', marginBottom: 8 }}>{r.desc}</div>
              <div style={{ paddingLeft: 26, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {r.permissions.map((p) => (
                  <span key={p} style={{ fontSize: 11, fontWeight: 600, padding: '2px 6px', borderRadius: 4, background: `${r.color}15`, color: r.color }}>{p}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  )
}

export const Tailwind_팀_역할_권한_선택: Story = {
  name: 'Tailwind UI — 팀 역할 권한 선택',
  render: () => <TeamRoleDemo />,
}

/* ── Tailwind UI: 구독 플랜 전환 ── */
const SubscriptionSwitchDemo = () => {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('yearly')
  const [plan, setPlan] = useState('pro')

  const plans = {
    monthly: [
      { value: 'basic', label: 'Basic', price: 9000, features: ['컴포넌트 20개', '스토리 100개', '이메일 지원'] },
      { value: 'pro', label: 'Pro', price: 29000, features: ['컴포넌트 무제한', '스토리 무제한', '테마 커스텀', '우선 지원'] },
      { value: 'team', label: 'Team', price: 79000, features: ['Pro 모든 기능', '팀 5명', '공유 워크스페이스', 'Slack 지원'] },
    ],
    yearly: [
      { value: 'basic', label: 'Basic', price: 7500, features: ['컴포넌트 20개', '스토리 100개', '이메일 지원'] },
      { value: 'pro', label: 'Pro', price: 24000, features: ['컴포넌트 무제한', '스토리 무제한', '테마 커스텀', '우선 지원'] },
      { value: 'team', label: 'Team', price: 65000, features: ['Pro 모든 기능', '팀 5명', '공유 워크스페이스', 'Slack 지원'] },
    ],
  }

  const current = plans[billing]

  return (
    <div style={{ maxWidth: 480 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>구독 플랜</div>
        <div style={{ display: 'flex', gap: 0, border: '1px solid var(--sem-eclipse-color-borderDefault)', borderRadius: 6, overflow: 'hidden' }}>
          {(['monthly', 'yearly'] as const).map((b) => (
            <button
              key={b}
              onClick={() => setBilling(b)}
              style={{ padding: '6px 12px', fontSize: 12, fontWeight: 600, background: billing === b ? '#6366f1' : 'var(--sem-eclipse-color-backgroundPrimary)', color: billing === b ? '#fff' : 'var(--sem-eclipse-color-foregroundTertiary)', border: 'none', cursor: 'pointer', transition: 'all 0.12s' }}
            >
              {b === 'monthly' ? '월간' : '연간'}
              {b === 'yearly' && <span style={{ fontSize: 10, marginLeft: 4, opacity: 0.85 }}>-20%</span>}
            </button>
          ))}
        </div>
      </div>
      <RadioGroup value={plan} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlan(e.target.value)} name="subscription">
        <div style={{ display: 'flex', gap: 10 }}>
          {current.map((p) => (
            <div
              key={p.value}
              onClick={() => setPlan(p.value)}
              style={{ flex: 1, padding: '14px 12px', borderRadius: 8, border: `2px solid ${plan === p.value ? '#6366f1' : 'var(--sem-eclipse-color-borderSubtle)'}`, background: plan === p.value ? '#6366f108' : 'var(--sem-eclipse-color-backgroundPrimary)', cursor: 'pointer', transition: 'border-color 0.15s' }}
            >
              <RadioButtonWithLabel value={p.value} alignItems="center" />
              <div style={{ marginTop: 10, paddingLeft: 4 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: plan === p.value ? '#6366f1' : 'var(--sem-eclipse-color-foregroundPrimary)' }}>{p.label}</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--sem-eclipse-color-foregroundPrimary)', marginTop: 4 }}>₩{p.price.toLocaleString()}<span style={{ fontSize: 11, fontWeight: 400, color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>/월</span></div>
              </div>
              <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 3, paddingLeft: 4 }}>
                {p.features.map((f) => (
                  <div key={f} style={{ fontSize: 11, color: 'var(--sem-eclipse-color-foregroundSecondary)', display: 'flex', gap: 5 }}>
                    <span style={{ color: '#6366f1', fontWeight: 700 }}>✓</span>{f}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  )
}

export const Tailwind_구독_플랜_전환: Story = {
  name: 'Tailwind UI — 구독 플랜 전환 (월간/연간)',
  render: () => <SubscriptionSwitchDemo />,
}

/* --------------------------------------------------------------------------
   Radix UI — 알림 전달 채널 설정
   섹션별 그룹 + 아이콘 레이블 + 설명 텍스트 패턴
-------------------------------------------------------------------------- */
const NOTIFY_CHANNELS = [
  { value: 'push', label: '푸시 알림', desc: '기기 잠금 화면 및 알림 센터에 즉시 표시', icon: '🔔' },
  { value: 'email', label: '이메일', desc: '등록된 이메일 주소로 발송 (최대 5분 지연)', icon: '✉️' },
  { value: 'slack', label: 'Slack', desc: '연결된 Slack 워크스페이스 채널로 전송', icon: '⚡' },
  { value: 'none', label: '알림 끄기', desc: '선택한 이벤트의 알림을 모두 수신 안 함', icon: '🔕' },
]

const RadixNotifyChannelDemo = () => {
  const [channel, setChannel] = useState('push')
  const [urgentOnly, setUrgentOnly] = useState(false)
  return (
    <div style={{ maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)', marginBottom: 4 }}>알림 채널</div>
        <div style={{ fontSize: 12, color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>이벤트 발생 시 알림을 받을 방법을 선택하세요</div>
      </div>
      <RadioGroup value={channel} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setChannel(e.target.value)} name="notify-channel">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {NOTIFY_CHANNELS.map((c) => (
            <label
              key={c.value}
              onClick={() => setChannel(c.value)}
              style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '12px 14px', borderRadius: 10, border: `1.5px solid ${channel === c.value ? '#6366f1' : 'var(--sem-eclipse-color-borderSubtle)'}`, background: channel === c.value ? '#6366f108' : 'var(--sem-eclipse-color-backgroundPrimary)', cursor: 'pointer', transition: 'border-color 0.15s' }}
            >
              <span style={{ fontSize: 20, lineHeight: 1, marginTop: 1, flexShrink: 0 }}>{c.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <RadioButtonWithLabel value={c.value} alignItems="center" />
                  <span style={{ fontSize: 13, fontWeight: 600, color: channel === c.value ? '#6366f1' : 'var(--sem-eclipse-color-foregroundPrimary)' }}>{c.label}</span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--sem-eclipse-color-foregroundTertiary)', marginTop: 2, paddingLeft: 22 }}>{c.desc}</div>
              </div>
            </label>
          ))}
        </div>
      </RadioGroup>
      {channel !== 'none' && (
        <label style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 8, background: 'var(--sem-eclipse-color-backgroundSecondary)', cursor: 'pointer' }}>
          <input type="checkbox" checked={urgentOnly} onChange={(e) => setUrgentOnly(e.target.checked)} style={{ width: 16, height: 16, accentColor: '#6366f1' }} />
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>긴급 알림만 수신</div>
            <div style={{ fontSize: 11, color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>우선순위 높음 이상 이벤트만 전달</div>
          </div>
        </label>
      )}
      <div style={{ fontSize: 11, color: 'var(--sem-eclipse-color-foregroundDisabled)' }}>Radix UI Radio 패턴 — 아이콘 + 설명 텍스트 선택지</div>
    </div>
  )
}

export const Radix_알림_채널_설정: Story = {
  name: 'Radix UI — 알림 채널 설정 (아이콘 + 설명)',
  parameters: {
    docs: {
      description: {
        story: 'Radix UI RadioGroup에서 영감을 받은 알림 채널 선택 UI. 아이콘 + 레이블 + 설명 텍스트 패턴, 선택 시 테두리 강조, 긴급 알림 필터 체크박스 연동.',
      },
    },
  },
  render: () => <RadixNotifyChannelDemo />,
}

/* --------------------------------------------------------------------------
   Vercel Design — 배포 환경 선택
   프로덕션 / 프리뷰 / 개발 타깃 선택 + 메타 뱃지 패턴
-------------------------------------------------------------------------- */
type DeployTarget = 'production' | 'preview' | 'development'

const DEPLOY_TARGETS: { value: DeployTarget; label: string; badge: string; badgeColor: string; desc: string; branch: string }[] = [
  { value: 'production', label: 'Production', badge: 'main', badgeColor: '#10b981', desc: '실제 사용자에게 노출되는 프로덕션 환경입니다.', branch: 'main' },
  { value: 'preview', label: 'Preview', badge: 'PR', badgeColor: '#6366f1', desc: 'PR 브랜치별로 자동 생성되는 미리보기 환경입니다.', branch: 'feat/*' },
  { value: 'development', label: 'Development', badge: 'local', badgeColor: '#f59e0b', desc: '로컬 개발 서버 연동 환경입니다. 외부 노출 없음.', branch: 'localhost' },
]

const VercelDeployTargetDemo = () => {
  const [target, setTarget] = useState<DeployTarget>('preview')
  const selected = DEPLOY_TARGETS.find((t) => t.value === target)!
  return (
    <div style={{ maxWidth: 420, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>배포 환경 선택</div>
      <RadioGroup value={target} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTarget(e.target.value as DeployTarget)} name="deploy-target">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {DEPLOY_TARGETS.map((t) => (
            <div
              key={t.value}
              onClick={() => setTarget(t.value)}
              style={{ padding: '12px 16px', borderRadius: 10, border: `1.5px solid ${target === t.value ? t.badgeColor : 'var(--sem-eclipse-color-borderSubtle)'}`, background: target === t.value ? `${t.badgeColor}08` : 'var(--sem-eclipse-color-backgroundPrimary)', cursor: 'pointer', transition: 'all 0.15s' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <RadioButtonWithLabel value={t.value} alignItems="center" />
                <span style={{ fontSize: 13, fontWeight: 700, color: target === t.value ? t.badgeColor : 'var(--sem-eclipse-color-foregroundPrimary)', flex: 1 }}>{t.label}</span>
                <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 99, background: `${t.badgeColor}18`, color: t.badgeColor, fontFamily: 'monospace' }}>{t.badge}</span>
              </div>
              {target === t.value && (
                <div style={{ marginTop: 8, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <div style={{ fontSize: 11, color: 'var(--sem-eclipse-color-foregroundSecondary)' }}>{t.desc}</div>
                  <div style={{ fontSize: 11, fontFamily: 'monospace', color: t.badgeColor }}>branch: {t.branch}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </RadioGroup>
      <div style={{ padding: '10px 14px', borderRadius: 8, background: 'var(--sem-eclipse-color-backgroundSecondary)', border: `1px solid ${selected.badgeColor}30`, fontSize: 12, color: 'var(--sem-eclipse-color-foregroundSecondary)' }}>
        선택됨: <span style={{ fontWeight: 700, color: selected.badgeColor }}>{selected.label}</span> — {selected.desc}
      </div>
      <div style={{ fontSize: 11, color: 'var(--sem-eclipse-color-foregroundDisabled)' }}>Vercel Design 배포 환경 선택 패턴 — 컬러 코딩 + 상태 확장</div>
    </div>
  )
}

export const Vercel_배포_환경_선택_Cycle112: Story = {
  name: 'Vercel Design — 배포 환경 선택 (Production/Preview/Dev)',
  parameters: {
    docs: {
      description: {
        story: 'Vercel 대시보드 배포 환경 선택 UI. Production/Preview/Development를 RadioGroup으로 선택하고, 선택 시 브랜치 패턴과 설명이 확장되어 노출됩니다. 환경별 컬러 코딩 패턴.',
      },
    },
  },
  render: () => <VercelDeployTargetDemo />,
}

/* --------------------------------------------------------------------------
   Radix UI + Vercel — 보안 인증 방식 선택
   MFA / SSO / 비밀번호 방식 + 보안 레벨 시각화
-------------------------------------------------------------------------- */
type AuthMethod = 'password' | 'sso' | 'mfa'

const AUTH_METHODS: { value: AuthMethod; label: string; level: number; color: string; hint: string }[] = [
  { value: 'password', label: '비밀번호 인증', level: 1, color: '#ef4444', hint: '기본 보안. 강력한 비밀번호 정책 별도 설정 권장.' },
  { value: 'sso', label: 'SSO (OAuth 2.0)', level: 2, color: '#f59e0b', hint: 'Google / GitHub 계정으로 로그인. 팀 계정 관리 편리.' },
  { value: 'mfa', label: 'MFA + SSO', level: 3, color: '#10b981', hint: '최고 보안. OTP 앱 또는 하드웨어 키 2단계 인증 필수.' },
]

const RadixVercelAuthMethodDemo = () => {
  const [method, setMethod] = useState<AuthMethod>('sso')
  const selected = AUTH_METHODS.find((m) => m.value === method)!
  return (
    <div style={{ maxWidth: 380, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)', marginBottom: 2 }}>인증 방식</div>
        <div style={{ fontSize: 12, color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>보안 수준이 높을수록 계정 탈취 위험이 낮아집니다</div>
      </div>
      <RadioGroup value={method} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMethod(e.target.value as AuthMethod)} name="auth-method">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {AUTH_METHODS.map((m) => (
            <div
              key={m.value}
              onClick={() => setMethod(m.value)}
              style={{ padding: '12px 14px', borderRadius: 10, border: `1.5px solid ${method === m.value ? m.color : 'var(--sem-eclipse-color-borderSubtle)'}`, cursor: 'pointer', transition: 'all 0.15s' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <RadioButtonWithLabel value={m.value} alignItems="center" />
                <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>{m.label}</span>
                <div style={{ display: 'flex', gap: 3 }}>
                  {[1, 2, 3].map((i) => (
                    <div key={i} style={{ width: 10, height: 10, borderRadius: 2, background: i <= m.level ? m.color : 'var(--sem-eclipse-color-borderSubtle)', transition: 'background 0.2s' }} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </RadioGroup>
      <div style={{ padding: '10px 14px', borderRadius: 8, background: `${selected.color}10`, border: `1px solid ${selected.color}30`, fontSize: 12, color: 'var(--sem-eclipse-color-foregroundSecondary)' }}>
        <span style={{ fontWeight: 700, color: selected.color }}>보안 레벨 {selected.level}/3</span> — {selected.hint}
      </div>
      <div style={{ fontSize: 11, color: 'var(--sem-eclipse-color-foregroundDisabled)' }}>Radix UI + Vercel — 보안 레벨 시각화 선택지 패턴</div>
    </div>
  )
}

export const Radix_Vercel_보안_인증_방식: Story = {
  name: 'Radix UI + Vercel — 보안 인증 방식 선택 (레벨 시각화)',
  parameters: {
    docs: {
      description: {
        story: 'Radix UI RadioGroup + Vercel 보안 설정 UI 조합. 인증 방식별 보안 레벨을 3단계 블록으로 시각화하고, 선택 시 힌트 텍스트가 하단에 표시됩니다.',
      },
    },
  },
  render: () => <RadixVercelAuthMethodDemo />,
}

/* --------------------------------------------------------------------------
   Cycle 188 — MUI + Tailwind UI
-------------------------------------------------------------------------- */
const MUI_NOTIF_FREQUENCIES_188 = [
  { value: 'realtime', label: '실시간', desc: '즉시 알림 수신', badge: '빠름' },
  { value: 'hourly', label: '매시간', desc: '1시간 단위로 요약', badge: null },
  { value: 'daily', label: '매일', desc: '하루 1회 다이제스트', badge: null },
  { value: 'weekly', label: '매주', desc: '주간 요약 리포트', badge: '절약' },
  { value: 'none', label: '끄기', desc: '알림 수신 안 함', badge: null },
]

function MuiNotifFrequencyRender() {
  const [freq, setFreq] = React.useState('daily')
  return (
    <div style={{ width: 360, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>알림 빈도 설정</div>
        <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>MUI Radio 수직 목록 + 설명 패턴</div>
      </div>
      <RadioGroup value={freq} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFreq(e.target.value)} name="notif-freq">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {MUI_NOTIF_FREQUENCIES_188.map((f) => (
            <div
              key={f.value}
              onClick={() => setFreq(f.value)}
              style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px',
                borderRadius: 8, cursor: 'pointer', transition: 'background 0.1s',
                background: freq === f.value ? '#f0f9ff' : 'transparent',
              }}
            >
              <RadioButtonWithLabel value={f.value} alignItems="center" />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: freq === f.value ? 600 : 400, color: '#0f172a' }}>{f.label}</div>
                <div style={{ fontSize: 11, color: '#64748b', marginTop: 1 }}>{f.desc}</div>
              </div>
              {f.badge && (
                <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 8, background: f.value === 'realtime' ? '#dbeafe' : '#d1fae5', color: f.value === 'realtime' ? '#1d4ed8' : '#065f46' }}>
                  {f.badge}
                </span>
              )}
            </div>
          ))}
        </div>
      </RadioGroup>
      {freq === 'none' && (
        <div style={{ marginTop: 10, padding: '10px 12px', borderRadius: 8, background: '#fef2f2', border: '1px solid #fecaca', fontSize: 12, color: '#991b1b' }}>
          알림을 끄면 중요한 업데이트를 놓칠 수 있습니다.
        </div>
      )}
    </div>
  )
}

export const MUI_알림_빈도_설정: Story = {
  name: 'MUI — 알림 빈도 수직 라디오 목록',
  parameters: {
    docs: {
      description: {
        story:
          'MUI 스타일 수직 RadioGroup 패턴. 빈도 옵션마다 설명 텍스트 + 상태 배지 조합. ' +
          '"끄기" 선택 시 경고 메시지 인라인 표시로 사용자가 선택 결과를 인지하도록 합니다.',
      },
    },
  },
  render: () => <MuiNotifFrequencyRender />,
}

const TAILWIND_PAYMENT_METHODS_188 = [
  { value: 'card', label: '신용카드', icon: '💳', hint: 'Visa, Mastercard, AMEX' },
  { value: 'bank', label: '계좌이체', icon: '🏦', hint: '국내 은행 직접 이체' },
  { value: 'kakao', label: '카카오페이', icon: '💛', hint: '빠른 간편결제' },
  { value: 'naver', label: '네이버페이', icon: '💚', hint: '포인트 적립 가능' },
]

function TailwindPaymentMethodRender() {
  const [method, setMethod] = React.useState('card')
  return (
    <div style={{ width: 380, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#111827', marginBottom: 12 }}>결제 수단 선택</div>
      <RadioGroup value={method} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMethod(e.target.value)} name="payment">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {TAILWIND_PAYMENT_METHODS_188.map((m) => (
            <div
              key={m.value}
              onClick={() => setMethod(m.value)}
              style={{
                padding: '12px 14px', borderRadius: 10,
                border: `2px solid ${method === m.value ? '#0f172a' : '#e5e7eb'}`,
                background: method === m.value ? '#f8fafc' : '#fff',
                cursor: 'pointer', transition: 'all 0.12s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <RadioButtonWithLabel value={m.value} alignItems="center" />
                <span style={{ fontSize: 18 }}>{m.icon}</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: method === m.value ? 700 : 500, color: '#111827' }}>{m.label}</div>
              <div style={{ fontSize: 10, color: '#9ca3af', marginTop: 2 }}>{m.hint}</div>
            </div>
          ))}
        </div>
      </RadioGroup>
      <div style={{ marginTop: 14, padding: '10px 14px', borderRadius: 8, background: '#f9fafb', border: '1px solid #f3f4f6', fontSize: 12, color: '#374151', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span>선택: <strong>{TAILWIND_PAYMENT_METHODS_188.find((m) => m.value === method)?.label}</strong></span>
        <button style={{ padding: '5px 14px', borderRadius: 6, border: 'none', background: '#111827', color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>결제 진행</button>
      </div>
    </div>
  )
}

export const Tailwind_결제_수단_그리드_선택: Story = {
  name: 'Tailwind UI — 결제 수단 2열 그리드 선택',
  parameters: {
    docs: {
      description: {
        story:
          'Tailwind UI 결제 수단 그리드 패턴. 2열 그리드 카드형 라디오 버튼 + 아이콘 + 설명. ' +
          '선택 시 굵은 테두리로 강조하고 하단에 선택 요약 + 결제 진행 버튼을 배치합니다.',
      },
    },
  },
  render: () => <TailwindPaymentMethodRender />,
}

const MUI_DEPLOY_STRATEGIES_188 = [
  { value: 'rolling', label: 'Rolling Update', desc: '점진적 교체. 무중단 배포. 평균 3분', risk: 'low' },
  { value: 'bluegreen', label: 'Blue/Green', desc: '전환 즉시 완료. 롤백 쉬움. 비용 2배', risk: 'low' },
  { value: 'canary', label: 'Canary', desc: '10% 트래픽 테스트. 점진적 확대', risk: 'medium' },
  { value: 'recreate', label: 'Recreate', desc: '전체 중단 후 재시작. 가장 빠름', risk: 'high' },
]

const RISK_STYLE_188: Record<string, { label: string; color: string; bg: string }> = {
  low:    { label: '낮음', color: '#10b981', bg: '#d1fae5' },
  medium: { label: '중간', color: '#f59e0b', bg: '#fef3c7' },
  high:   { label: '높음', color: '#ef4444', bg: '#fee2e2' },
}

function MuiTailwindDeployStrategyRender() {
  const [strategy, setStrategy] = React.useState('rolling')
  const selected = MUI_DEPLOY_STRATEGIES_188.find((s) => s.value === strategy)!
  const risk = RISK_STYLE_188[selected.risk]

  return (
    <div style={{ width: 400, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>배포 전략 선택</div>
        <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>MUI + Tailwind UI 복합 선택 패턴</div>
      </div>
      <RadioGroup value={strategy} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStrategy(e.target.value)} name="deploy-strategy">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {MUI_DEPLOY_STRATEGIES_188.map((s) => {
            const r = RISK_STYLE_188[s.risk]
            return (
              <div
                key={s.value}
                onClick={() => setStrategy(s.value)}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 10, padding: '11px 14px', borderRadius: 8,
                  border: `1.5px solid ${strategy === s.value ? '#6366f1' : '#e5e7eb'}`,
                  background: strategy === s.value ? '#eef2ff' : '#fff',
                  cursor: 'pointer', transition: 'all 0.12s',
                }}
              >
                <div style={{ paddingTop: 2 }}>
                  <RadioButtonWithLabel value={s.value} alignItems="center" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                    <span style={{ fontSize: 13, fontWeight: strategy === s.value ? 700 : 500, color: '#0f172a' }}>{s.label}</span>
                    <span style={{ fontSize: 9, fontWeight: 700, padding: '1px 6px', borderRadius: 8, background: r.bg, color: r.color }}>위험 {r.label}</span>
                  </div>
                  <div style={{ fontSize: 11, color: '#64748b' }}>{s.desc}</div>
                </div>
              </div>
            )
          })}
        </div>
      </RadioGroup>
      <div style={{ marginTop: 12, padding: '10px 14px', borderRadius: 8, background: risk.bg, border: `1px solid ${risk.color}40`, fontSize: 12 }}>
        <span style={{ fontWeight: 700, color: risk.color }}>선택: {selected.label}</span>
        <span style={{ color: '#6b7280' }}> — 위험도 {risk.label}</span>
      </div>
    </div>
  )
}

export const MUI_Tailwind_배포_전략_선택: Story = {
  name: 'MUI + Tailwind UI — 배포 전략 위험도 시각화 선택',
  parameters: {
    docs: {
      description: {
        story:
          'MUI + Tailwind UI 배포 전략 선택 패턴. 전략별 설명 + 위험도 배지 + 선택 시 요약 패널 변화. ' +
          'Rolling/Blue-Green/Canary/Recreate 전략을 카드형 라디오로 명확하게 비교합니다.',
      },
    },
  },
  render: () => <MuiTailwindDeployStrategyRender />,
}
