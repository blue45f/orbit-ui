import { useUniqueID } from '@heejun-com/core'
import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

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
