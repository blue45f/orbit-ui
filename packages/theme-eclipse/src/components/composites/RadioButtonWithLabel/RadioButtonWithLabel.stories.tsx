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

/* ── shadcn/ui: 카드형 플랜 선택 ── */
const PlanPickerDemo = () => {
  const [plan, setPlan] = useState<'free' | 'pro' | 'enterprise'>('pro')

  const plans: { value: 'free' | 'pro' | 'enterprise'; label: string; price: string; desc: string; features: string[]; accent: string }[] = [
    {
      value: 'free',
      label: 'Free',
      price: '₩0',
      desc: '개인 프로젝트 & 탐색용',
      features: ['컴포넌트 10개', '스토리 50개', '커뮤니티 지원'],
      accent: '#64748b',
    },
    {
      value: 'pro',
      label: 'Pro',
      price: '₩29,000',
      desc: '팀 협업 & 실무 프로젝트',
      features: ['컴포넌트 무제한', '스토리 무제한', '테마 커스텀', '우선 지원'],
      accent: '#6366f1',
    },
    {
      value: 'enterprise',
      label: 'Enterprise',
      price: '문의',
      desc: '대규모 조직 & 보안 요구사항',
      features: ['Pro 모든 기능', 'SSO/SAML', 'SLA 99.9%', '전담 매니저'],
      accent: '#0ea5e9',
    },
  ]

  return (
    <div style={{ maxWidth: 520 }}>
      <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--sem-eclipse-color-foregroundPrimary)', marginBottom: 4 }}>플랜 선택</div>
      <div style={{ fontSize: 14, color: 'var(--sem-eclipse-color-foregroundTertiary)', marginBottom: 20 }}>shadcn/ui 카드형 라디오 패턴 — 풍부한 시각 피드백</div>
      <RadioGroup value={plan} onChange={(e) => setPlan(e.target.value as typeof plan)} name="plan">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {plans.map((p) => {
            const selected = plan === p.value
            return (
              <div
                key={p.value}
                onClick={() => setPlan(p.value)}
                style={{
                  padding: '16px 18px',
                  borderRadius: 10,
                  border: `2px solid ${selected ? p.accent : 'var(--sem-eclipse-color-borderSubtle)'}`,
                  background: selected ? `${p.accent}08` : 'var(--sem-eclipse-color-backgroundPrimary)',
                  cursor: 'pointer',
                  transition: 'border-color 0.15s, background 0.15s',
                  position: 'relative',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                  <RadioButtonWithLabel value={p.value} alignItems="center" />
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <span style={{ fontSize: 15, fontWeight: 700, color: selected ? p.accent : 'var(--sem-eclipse-color-foregroundPrimary)' }}>{p.label}</span>
                      <span style={{ fontSize: 12, color: 'var(--sem-eclipse-color-foregroundTertiary)', marginLeft: 8 }}>{p.desc}</span>
                    </div>
                    <span style={{ fontSize: 15, fontWeight: 700, color: selected ? p.accent : 'var(--sem-eclipse-color-foregroundPrimary)' }}>{p.price}<span style={{ fontSize: 11, fontWeight: 400, color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>{p.value !== 'enterprise' ? '/월' : ''}</span></span>
                  </div>
                </div>
                <div style={{ paddingLeft: 26, display: 'flex', flexWrap: 'wrap', gap: '4px 12px' }}>
                  {p.features.map((f) => (
                    <span key={f} style={{ fontSize: 12, color: 'var(--sem-eclipse-color-foregroundSecondary)', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span style={{ color: p.accent, fontWeight: 700 }}>✓</span> {f}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </RadioGroup>
      <div style={{ marginTop: 16, textAlign: 'right' }}>
        <button style={{ padding: '10px 24px', borderRadius: 8, border: 'none', background: '#6366f1', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
          {plan === 'enterprise' ? '영업팀 문의' : `${plans.find((p) => p.value === plan)?.label} 플랜 시작`}
        </button>
      </div>
    </div>
  )
}

export const Shadcn_카드형_플랜_선택: Story = {
  name: 'shadcn/ui — 카드형 플랜 선택',
  render: () => <PlanPickerDemo />,
}

/* ── shadcn/ui: 폼 통합 결제 주기 선택 ── */
const BillingCycleDemo = () => {
  const [cycle, setCycle] = useState<'monthly' | 'yearly'>('yearly')
  const [submitted, setSubmitted] = useState(false)

  const options: { value: 'monthly' | 'yearly'; label: string; sublabel: string; badge?: string }[] = [
    { value: 'monthly', label: '월간 결제', sublabel: '매달 자동 갱신' },
    { value: 'yearly', label: '연간 결제', sublabel: '한 번에 12개월 결제', badge: '2개월 무료' },
  ]

  return (
    <div style={{ maxWidth: 380 }}>
      <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)', marginBottom: 4 }}>결제 주기</div>
      <div style={{ fontSize: 13, color: 'var(--sem-eclipse-color-foregroundTertiary)', marginBottom: 16 }}>shadcn/ui 폼 통합 + 유효성 표시 패턴</div>
      {submitted ? (
        <div style={{ padding: '20px', textAlign: 'center', borderRadius: 10, background: '#f0fdf4', border: '1.5px solid #86efac' }}>
          <div style={{ fontSize: 24, marginBottom: 8 }}>✓</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#16a34a' }}>{cycle === 'yearly' ? '연간' : '월간'} 결제 플랜이 선택되었어요</div>
          <button onClick={() => setSubmitted(false)} style={{ marginTop: 12, fontSize: 12, color: '#6366f1', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>다시 선택</button>
        </div>
      ) : (
        <>
          <RadioGroup value={cycle} onChange={(e) => setCycle(e.target.value as typeof cycle)} name="billing-cycle">
            <div style={{ display: 'flex', gap: 10 }}>
              {options.map((opt) => (
                <div
                  key={opt.value}
                  onClick={() => setCycle(opt.value)}
                  style={{
                    flex: 1,
                    padding: '14px 12px',
                    borderRadius: 8,
                    border: `2px solid ${cycle === opt.value ? '#6366f1' : 'var(--sem-eclipse-color-borderSubtle)'}`,
                    background: cycle === opt.value ? '#6366f108' : 'var(--sem-eclipse-color-backgroundPrimary)',
                    cursor: 'pointer',
                    transition: 'border-color 0.15s',
                    position: 'relative',
                  }}
                >
                  {opt.badge && (
                    <span style={{ position: 'absolute', top: -10, right: 10, fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 10, background: '#6366f1', color: '#fff' }}>{opt.badge}</span>
                  )}
                  <RadioButtonWithLabel value={opt.value} alignItems="center" />
                  <div style={{ marginTop: 8, paddingLeft: 4 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: cycle === opt.value ? '#6366f1' : 'var(--sem-eclipse-color-foregroundPrimary)' }}>{opt.label}</div>
                    <div style={{ fontSize: 11, color: 'var(--sem-eclipse-color-foregroundTertiary)', marginTop: 2 }}>{opt.sublabel}</div>
                  </div>
                </div>
              ))}
            </div>
          </RadioGroup>
          <button onClick={() => setSubmitted(true)} style={{ marginTop: 16, width: '100%', padding: '11px', borderRadius: 8, border: 'none', background: '#6366f1', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
            선택 완료
          </button>
        </>
      )}
    </div>
  )
}

export const Shadcn_폼_결제_주기_선택: Story = {
  name: 'shadcn/ui — 폼 통합 결제 주기 선택',
  render: () => <BillingCycleDemo />,
}

/* ── shadcn/ui: 수평 아이콘 배지 옵션 선택 ── */
const DeployTargetDemo = () => {
  const [target, setTarget] = useState<string>('vercel')

  const targets: { value: string; label: string; icon: string; badge: string; desc: string }[] = [
    { value: 'vercel', label: 'Vercel', icon: '▲', badge: '권장', desc: 'Zero-config 배포 & Edge Network' },
    { value: 'netlify', label: 'Netlify', icon: '◆', badge: '', desc: 'JAMstack 특화 정적 배포' },
    { value: 'aws', label: 'AWS Amplify', icon: '⬡', badge: '', desc: '엔터프라이즈급 확장성' },
    { value: 'cloudflare', label: 'Cloudflare Pages', icon: '☁', badge: '무료', desc: 'CDN 통합 글로벌 엣지' },
  ]

  return (
    <div style={{ maxWidth: 440 }}>
      <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)', marginBottom: 4 }}>배포 대상</div>
      <div style={{ fontSize: 13, color: 'var(--sem-eclipse-color-foregroundTertiary)', marginBottom: 16 }}>shadcn/ui 수평 아이콘 + 배지 결합 패턴</div>
      <RadioGroup value={target} onChange={(e) => setTarget(e.target.value)} name="deploy-target">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: '1px solid var(--sem-eclipse-color-borderDefault)', borderRadius: 10, overflow: 'hidden' }}>
          {targets.map((t, i) => (
            <div
              key={t.value}
              onClick={() => setTarget(t.value)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '13px 16px',
                borderBottom: i < targets.length - 1 ? '1px solid var(--sem-eclipse-color-borderSubtle)' : 'none',
                background: target === t.value ? 'color-mix(in srgb, var(--sem-eclipse-color-fillPrimary) 5%, var(--sem-eclipse-color-backgroundPrimary))' : 'var(--sem-eclipse-color-backgroundPrimary)',
                cursor: 'pointer',
                transition: 'background 0.12s',
              }}
            >
              <div style={{ width: 36, height: 36, borderRadius: 8, background: target === t.value ? 'var(--sem-eclipse-color-fillPrimary)' : 'var(--sem-eclipse-color-backgroundSecondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: target === t.value ? '#fff' : 'var(--sem-eclipse-color-foregroundSecondary)', transition: 'background 0.12s, color 0.12s', flexShrink: 0 }}>
                {t.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>{t.label}</span>
                  {t.badge && <span style={{ fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 6, background: 'var(--sem-eclipse-color-fillPrimary)', color: '#fff' }}>{t.badge}</span>}
                </div>
                <div style={{ fontSize: 12, color: 'var(--sem-eclipse-color-foregroundTertiary)', marginTop: 1 }}>{t.desc}</div>
              </div>
              <RadioButtonWithLabel value={t.value} alignItems="center" />
            </div>
          ))}
        </div>
      </RadioGroup>
      <div style={{ marginTop: 12, padding: '10px 14px', borderRadius: 8, background: 'var(--sem-eclipse-color-backgroundSecondary)', fontSize: 13, color: 'var(--sem-eclipse-color-foregroundSecondary)' }}>
        선택됨: <strong style={{ color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>{targets.find((t) => t.value === target)?.label}</strong>
      </div>
    </div>
  )
}

export const Shadcn_배포_대상_선택: Story = {
  name: 'shadcn/ui — 배포 대상 선택 (아이콘+배지)',
  render: () => <DeployTargetDemo />,
}

/* ── Ant Design: 폼 필드 내 라디오 그룹 ── */
const AntFormRadioDemo = () => {
  const [gender, setGender] = useState('')
  const [experience, setExperience] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const genderValid = gender !== ''
  const expValid = experience !== ''
  const allValid = genderValid && expValid

  return (
    <div style={{ maxWidth: 380 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)', marginBottom: 20 }}>프로필 설정 (Ant Design 폼 레이블 패턴)</div>

      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8 }}>
          <span style={{ color: '#ef4444', fontSize: 12 }}>*</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>성별</span>
        </div>
        <RadioGroup value={gender} onChange={(e) => setGender(e.target.value)} name="gender">
          <div style={{ display: 'flex', gap: 20 }}>
            {['남성', '여성', '선택 안함'].map((g) => (
              <RadioButtonWithLabel key={g} value={g} alignItems="center">{g}</RadioButtonWithLabel>
            ))}
          </div>
        </RadioGroup>
        {submitted && !genderValid && <div style={{ fontSize: 12, color: '#ef4444', marginTop: 4 }}>성별을 선택해주세요</div>}
      </div>

      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8 }}>
          <span style={{ color: '#ef4444', fontSize: 12 }}>*</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>개발 경력</span>
        </div>
        <RadioGroup value={experience} onChange={(e) => setExperience(e.target.value)} name="experience">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {['1년 미만', '1~3년', '3~5년', '5년 이상'].map((exp) => (
              <RadioButtonWithLabel key={exp} value={exp} alignItems="center">{exp}</RadioButtonWithLabel>
            ))}
          </div>
        </RadioGroup>
        {submitted && !expValid && <div style={{ fontSize: 12, color: '#ef4444', marginTop: 4 }}>경력을 선택해주세요</div>}
      </div>

      <button
        onClick={() => setSubmitted(true)}
        style={{ width: '100%', padding: '10px', borderRadius: 6, border: 'none', background: allValid ? '#6366f1' : 'var(--sem-eclipse-color-backgroundSecondary)', color: allValid ? '#fff' : 'var(--sem-eclipse-color-foregroundTertiary)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
      >
        {submitted && allValid ? '저장 완료!' : '저장'}
      </button>
    </div>
  )
}

export const Ant_폼_필드_라디오_그룹: Story = {
  name: 'Ant Design — 폼 필드 내 라디오 그룹',
  render: () => <AntFormRadioDemo />,
}

/* ── Ant Design: 수평 라디오 버튼 그룹 ── */
const AntHorizontalRadioDemo = () => {
  const [timeRange, setTimeRange] = useState('week')
  const [chartType, setChartType] = useState('line')

  const timeRanges = [
    { value: 'day', label: '오늘' },
    { value: 'week', label: '1주' },
    { value: 'month', label: '1개월' },
    { value: 'quarter', label: '3개월' },
    { value: 'year', label: '1년' },
  ]

  const chartTypes = [
    { value: 'line', label: '선형' },
    { value: 'bar', label: '막대' },
    { value: 'area', label: '영역' },
  ]

  return (
    <div style={{ maxWidth: 480 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)', marginBottom: 16 }}>대시보드 설정 (Ant Design 수평 라디오 패턴)</div>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--sem-eclipse-color-foregroundTertiary)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>기간</div>
        <RadioGroup value={timeRange} onChange={(e) => setTimeRange(e.target.value)} name="time-range">
          <div style={{ display: 'flex', gap: 0, border: '1px solid var(--sem-eclipse-color-borderDefault)', borderRadius: 6, overflow: 'hidden' }}>
            {timeRanges.map((tr, i) => (
              <div
                key={tr.value}
                onClick={() => setTimeRange(tr.value)}
                style={{ flex: 1, padding: '7px 0', textAlign: 'center', background: timeRange === tr.value ? '#6366f1' : 'var(--sem-eclipse-color-backgroundPrimary)', borderRight: i < timeRanges.length - 1 ? '1px solid var(--sem-eclipse-color-borderSubtle)' : 'none', cursor: 'pointer', transition: 'background 0.12s' }}
              >
                <span style={{ fontSize: 12, fontWeight: timeRange === tr.value ? 700 : 400, color: timeRange === tr.value ? '#fff' : 'var(--sem-eclipse-color-foregroundSecondary)' }}>{tr.label}</span>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--sem-eclipse-color-foregroundTertiary)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>차트 유형</div>
        <RadioGroup value={chartType} onChange={(e) => setChartType(e.target.value)} name="chart-type">
          <div style={{ display: 'flex', gap: 10 }}>
            {chartTypes.map((ct) => (
              <RadioButtonWithLabel key={ct.value} value={ct.value} alignItems="center">{ct.label}</RadioButtonWithLabel>
            ))}
          </div>
        </RadioGroup>
      </div>
      <div style={{ marginTop: 16, padding: '12px', borderRadius: 8, background: 'var(--sem-eclipse-color-backgroundSecondary)', fontSize: 12, color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>
        선택: <strong style={{ color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>{timeRanges.find((t) => t.value === timeRange)?.label}</strong> / <strong style={{ color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>{chartTypes.find((c) => c.value === chartType)?.label}</strong> 차트
      </div>
    </div>
  )
}

export const Ant_수평_라디오_그룹: Story = {
  name: 'Ant Design — 수평 라디오 버튼 그룹',
  render: () => <AntHorizontalRadioDemo />,
}

/* ── Ant Design: 카드형 선택 그리드 ── */
const AntCardSelectDemo = () => {
  const [selected, setSelected] = useState('nextjs')

  const frameworks = [
    { value: 'nextjs', label: 'Next.js', desc: 'React 풀스택', icon: '▲' },
    { value: 'nuxt', label: 'Nuxt', desc: 'Vue 풀스택', icon: '◆' },
    { value: 'remix', label: 'Remix', desc: 'React 웹앱', icon: '●' },
    { value: 'astro', label: 'Astro', desc: '정적 우선', icon: '★' },
  ]

  return (
    <div style={{ maxWidth: 400 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)', marginBottom: 14 }}>프레임워크 선택 (Ant Design 카드 라디오 그리드)</div>
      <RadioGroup value={selected} onChange={(e) => setSelected(e.target.value)} name="framework">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {frameworks.map((fw) => (
            <div
              key={fw.value}
              onClick={() => setSelected(fw.value)}
              style={{ padding: '14px', borderRadius: 8, border: `2px solid ${selected === fw.value ? '#6366f1' : 'var(--sem-eclipse-color-borderSubtle)'}`, background: selected === fw.value ? '#6366f108' : 'var(--sem-eclipse-color-backgroundPrimary)', cursor: 'pointer', transition: 'border-color 0.15s', display: 'flex', flexDirection: 'column', gap: 8 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 20, color: selected === fw.value ? '#6366f1' : 'var(--sem-eclipse-color-foregroundSecondary)' }}>{fw.icon}</span>
                <RadioButtonWithLabel value={fw.value} alignItems="center" />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: selected === fw.value ? '#6366f1' : 'var(--sem-eclipse-color-foregroundPrimary)' }}>{fw.label}</div>
                <div style={{ fontSize: 11, color: 'var(--sem-eclipse-color-foregroundTertiary)', marginTop: 2 }}>{fw.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  )
}

export const Ant_카드형_선택_그리드: Story = {
  name: 'Ant Design — 카드형 선택 그리드',
  render: () => <AntCardSelectDemo />,
}
