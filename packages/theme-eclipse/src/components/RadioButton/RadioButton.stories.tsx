import { Flex } from '@heejun-com/core'
import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { RadioButton } from './RadioButton'

RadioButton.displayName = 'RadioButton'

const meta = {
  title: 'eclipse/Inputs/Selection/RadioButton',
  component: RadioButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "RadioButton은 단일 선택 그룹의 라디오 버튼 컴포넌트입니다. Radix UI 기반으로 완전한 키보드 접근성을 제공합니다.",
      },
    },
  },
  args: {
    disabled: false,
  },
  argTypes: {
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof RadioButton>

type Story = StoryObj<typeof meta>

export default meta

export const 기본 = {
  render: function Render(args) {
    const [selected, setSelected] = useState('blue')
    return (
      <fieldset role="radiogroup">
        <RadioButton
          {...args}
          value="blue"
          name="color"
          checked={selected === 'blue'}
          onChange={() => setSelected('blue')}
        />
        <RadioButton
          {...args}
          value="foundation"
          name="color"
          checked={selected === 'foundation'}
          onChange={() => setSelected('foundation')}
        />
        <RadioButton
          {...args}
          value="primary"
          checked={selected === 'primary'}
          onChange={() => setSelected('primary')}
        />
      </fieldset>
    )
  },
} satisfies Story

export const 테마_재정의 = {
  render: function Render(args) {
    const [selected, setSelected] = useState('blue')
    return (
      <fieldset role="radiogroup">
        <RadioButton
          {...args}
          checked={selected === 'blue'}
          onChange={() => setSelected('blue')}
          theme={{
            enabledSelectedForegroundColor: 'red',
          }}
          value="blue"
        />
        <RadioButton
          {...args}
          value="foundation"
          checked={selected === 'foundation'}
          onChange={() => setSelected('foundation')}
          theme={{
            enabledSelectedForegroundColor: 'red',
          }}
        />
        <RadioButton
          {...args}
          value="primary"
          checked={selected === 'primary'}
          onChange={() => setSelected('primary')}
          theme={{
            enabledSelectedForegroundColor: 'red',
          }}
        />
      </fieldset>
    )
  },
} satisfies Story

export const 라벨_추가 = {
  render: function Render(args) {
    const [selected, setSelected] = useState('blue')
    return (
      <fieldset role="radiogroup">
        <Flex rowGap="25px" flexDirection={'column'}>
          <Flex columnGap="10px">
            <RadioButton
              {...args}
              value="blue"
              id="blue"
              checked={selected === 'blue'}
              onChange={() => setSelected('blue')}
            />
            <label htmlFor="blue">인디고</label>
          </Flex>
          <Flex columnGap="10px">
            <RadioButton
              {...args}
              value="foundation"
              disabled
              id="foundation"
              checked={selected === 'foundation'}
              onChange={() => setSelected('foundation')}
            />
            <label htmlFor="foundation">파운데이션</label>
          </Flex>
          <Flex columnGap="10px">
            <RadioButton
              {...args}
              value="primary"
              id="primary"
              checked={selected === 'primary'}
              onChange={() => setSelected('primary')}
            />
            <label htmlFor="primary">기본</label>
          </Flex>
        </Flex>
      </fieldset>
    )
  },
} satisfies Story

// Tailwind UI 카드형 플랜 선택 패턴
export const 플랜_선택_카드 = {
  render: function Render(args) {
    const [plan, setPlan] = useState('pro')

    const plans = [
      {
        value: 'free',
        name: 'Free',
        price: '0',
        period: '영구 무료',
        features: ['컴포넌트 10개', '프로젝트 1개', '커뮤니티 지원'],
        color: '#64748b',
        badge: null,
      },
      {
        value: 'pro',
        name: 'Pro',
        price: '29',
        period: '월',
        features: ['컴포넌트 무제한', '프로젝트 10개', '우선 지원', '피그마 플러그인'],
        color: '#6366f1',
        badge: '인기',
      },
      {
        value: 'team',
        name: 'Team',
        price: '79',
        period: '월',
        features: ['모든 Pro 기능', '팀원 5명', '공유 토큰', '전담 지원'],
        color: '#8b5cf6',
        badge: null,
      },
    ]

    return (
      <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {plans.map((p) => {
            const selected = plan === p.value
            return (
              <label
                key={p.value}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 16, cursor: 'pointer',
                  padding: '20px 22px', borderRadius: 14,
                  border: `2px solid ${selected ? p.color : '#e2e8f0'}`,
                  background: selected ? `${p.color}06` : '#fff',
                  transition: 'all 0.15s', position: 'relative',
                }}
              >
                <RadioButton
                  {...args}
                  value={p.value}
                  name="plan"
                  checked={selected}
                  onChange={() => setPlan(p.value)}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>{p.name}</span>
                    {p.badge && (
                      <span style={{
                        fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 99,
                        background: p.color, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.06em',
                      }}>
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 10 }}>
                    <span style={{ fontSize: 24, fontWeight: 800, color: p.color }}>${p.price}</span>
                    <span style={{ fontSize: 12, color: '#94a3b8' }}>/ {p.period}</span>
                  </div>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {p.features.map((feat) => (
                      <li key={feat} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#64748b' }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={p.color} strokeWidth="3" strokeLinecap="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              </label>
            )
          })}
        </div>
        <div style={{ marginTop: 16, fontSize: 12, color: '#94a3b8', textAlign: 'center' }}>
          선택된 플랜: <strong style={{ color: '#6366f1' }}>{plans.find((p) => p.value === plan)?.name}</strong>
        </div>
      </fieldset>
    )
  },
} satisfies Story

// Tailwind UI 인라인 라디오 그룹 — 배송 방법 선택
export const 배송_방법_선택 = {
  render: function Render(args) {
    const [shipping, setShipping] = useState('standard')

    const methods = [
      { value: 'standard', label: '일반 배송', sub: '3-5 영업일', price: '무료' },
      { value: 'express', label: '빠른 배송', sub: '1-2 영업일', price: '3,000원' },
      { value: 'same_day', label: '당일 배송', sub: '오늘 도착', price: '5,000원' },
    ]

    return (
      <div style={{ width: 400, padding: 28, background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>배송 방법 선택</div>
        <fieldset style={{ border: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {methods.map((m) => {
            const selected = shipping === m.value
            return (
              <label
                key={m.value}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer',
                  padding: '14px 16px', borderRadius: 10,
                  border: `1.5px solid ${selected ? '#6366f1' : '#e2e8f0'}`,
                  background: selected ? 'rgba(99,102,241,0.04)' : '#f8fafc',
                  transition: 'all 0.15s',
                }}
              >
                <RadioButton
                  {...args}
                  value={m.value}
                  name="shipping"
                  checked={selected}
                  onChange={() => setShipping(m.value)}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: selected ? 700 : 500, color: '#0f172a' }}>{m.label}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 1 }}>{m.sub}</div>
                </div>
                <span style={{
                  fontSize: 13, fontWeight: 700,
                  color: m.price === '무료' ? '#10b981' : '#374151',
                }}>
                  {m.price}
                </span>
              </label>
            )
          })}
        </fieldset>
        <button style={{
          marginTop: 20, width: '100%', padding: '13px', borderRadius: 12, border: 'none',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff',
          fontSize: 14, fontWeight: 700, cursor: 'pointer',
        }}>
          결제하기
        </button>
      </div>
    )
  },
} satisfies Story

// Mantine 팀 역할 선택 패턴
export const 팀원_역할_선택 = {
  render: function Render(args) {
    const [role, setRole] = useState('editor')

    const roles = [
      {
        value: 'viewer',
        label: '뷰어',
        desc: '읽기 전용. 프로젝트를 보고 댓글을 남길 수 있습니다.',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
          </svg>
        ),
      },
      {
        value: 'editor',
        label: '편집자',
        desc: '편집 가능. 컴포넌트를 생성하고 수정할 수 있습니다.',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        ),
      },
      {
        value: 'admin',
        label: '관리자',
        desc: '전체 권한. 팀원 초대, 설정 변경이 가능합니다.',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        ),
      },
    ]

    return (
      <div style={{ width: 400, padding: 28, background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>역할 지정</div>
        <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 20 }}>팀원에게 부여할 권한 수준을 선택하세요.</div>
        <fieldset style={{ border: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {roles.map((r) => {
            const selected = role === r.value
            return (
              <label
                key={r.value}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 14, cursor: 'pointer',
                  padding: '14px 16px', borderRadius: 10,
                  border: `1.5px solid ${selected ? '#6366f1' : '#e2e8f0'}`,
                  background: selected ? 'rgba(99,102,241,0.04)' : '#fff',
                  transition: 'all 0.15s',
                }}
              >
                <div style={{ paddingTop: 2 }}>
                  <RadioButton
                    {...args}
                    value={r.value}
                    name="role"
                    checked={selected}
                    onChange={() => setRole(r.value)}
                  />
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', flex: 1 }}>
                  <div style={{ marginTop: 1 }}>{r.icon}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: selected ? 700 : 600, color: '#0f172a', marginBottom: 2 }}>{r.label}</div>
                    <div style={{ fontSize: 11, color: '#64748b', lineHeight: 1.5 }}>{r.desc}</div>
                  </div>
                </div>
              </label>
            )
          })}
        </fieldset>
      </div>
    )
  },
} satisfies Story

// 설정 페이지 라디오 그룹 (Chakra UI 실무 패턴)
export const 설정페이지라디오그룹 = {
  render: function Render(args) {
    const [theme, setTheme] = useState<string>('system')
    const [lang, setLang] = useState<string>('ko')
    const [density, setDensity] = useState<string>('comfortable')

    const themeOptions = [
      { value: 'light', label: '라이트 모드', desc: '밝은 배경의 테마' },
      { value: 'dark', label: '다크 모드', desc: '어두운 배경의 테마' },
      { value: 'system', label: '시스템 설정 따름', desc: '운영체제 설정에 따라 자동 변경' },
    ]

    const langOptions = [
      { value: 'ko', label: '한국어' },
      { value: 'en', label: 'English' },
      { value: 'ja', label: '日本語' },
    ]

    const densityOptions = [
      { value: 'compact', label: '컴팩트', desc: '좁은 간격' },
      { value: 'comfortable', label: '일반', desc: '기본 간격' },
      { value: 'spacious', label: '여유롭게', desc: '넓은 간격' },
    ]

    const SectionTitle = ({ children }: { children: string }) => (
      <div style={{ fontSize: '11px', fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
        {children}
      </div>
    )

    return (
      <div style={{
        width: '420px', padding: '28px', background: '#fff',
        borderRadius: '16px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        display: 'flex', flexDirection: 'column', gap: '28px',
      }}>
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>환경 설정</h3>

        {/* 테마 */}
        <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
          <SectionTitle>테마</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {themeOptions.map((opt) => (
              <label
                key={opt.value}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '12px 14px', borderRadius: '10px', cursor: 'pointer',
                  background: theme === opt.value ? 'rgba(99,102,241,0.05)' : 'transparent',
                  border: `1.5px solid ${theme === opt.value ? 'rgba(99,102,241,0.25)' : 'transparent'}`,
                  transition: 'all 0.15s',
                }}
              >
                <RadioButton
                  {...args}
                  value={opt.value}
                  name="theme"
                  checked={theme === opt.value}
                  onChange={() => setTheme(opt.value)}
                />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: theme === opt.value ? 600 : 400, color: '#0f172a' }}>{opt.label}</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '1px' }}>{opt.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </fieldset>

        {/* 언어 */}
        <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
          <SectionTitle>언어</SectionTitle>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {langOptions.map((opt) => (
              <label
                key={opt.value}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '8px 16px', borderRadius: '20px', cursor: 'pointer',
                  background: lang === opt.value ? 'rgba(99,102,241,0.08)' : '#f8fafc',
                  border: `1.5px solid ${lang === opt.value ? 'rgba(99,102,241,0.3)' : '#e2e8f0'}`,
                  fontSize: '13px', fontWeight: lang === opt.value ? 600 : 400,
                  color: lang === opt.value ? '#6366f1' : '#374151',
                  transition: 'all 0.15s',
                }}
              >
                <RadioButton
                  {...args}
                  value={opt.value}
                  name="lang"
                  checked={lang === opt.value}
                  onChange={() => setLang(opt.value)}
                />
                {opt.label}
              </label>
            ))}
          </div>
        </fieldset>

        {/* 밀도 */}
        <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
          <SectionTitle>화면 밀도</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {densityOptions.map((opt) => (
              <label
                key={opt.value}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '10px 14px', borderRadius: '8px', cursor: 'pointer',
                  transition: 'background 0.1s',
                }}
              >
                <RadioButton
                  {...args}
                  value={opt.value}
                  name="density"
                  checked={density === opt.value}
                  onChange={() => setDensity(opt.value)}
                />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: density === opt.value ? 600 : 400, color: '#0f172a' }}>{opt.label}</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>{opt.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </fieldset>

        <button style={{
          padding: '12px', borderRadius: '10px', border: 'none', cursor: 'pointer',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          color: '#fff', fontSize: '14px', fontWeight: '700',
        }}>
          설정 저장
        </button>
      </div>
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
  render: function Render(args: any) {
    const [selected, setSelected] = useState('blue')
    return (
      <fieldset role="radiogroup">
        <div style={{ marginBottom: '25px' }}>첫 번째 라디오는 라벨이 없어요</div>
        <Flex rowGap={args.rowGap} columnGap={args.columnGap} flexDirection={args.flexDirection}>
          <Flex columnGap="10px">
            <RadioButton
              {...args}
              name="color"
              value="blue"
              checked={selected === 'blue'}
              onChange={() => setSelected('blue')}
            />
          </Flex>
          <Flex columnGap="10px">
            <RadioButton
              {...args}
              name="color"
              id="foundation"
              value="foundation"
              disabled={args.disabledSecond}
              checked={selected === 'foundation'}
              onChange={() => setSelected('foundation')}
            />
            <label htmlFor="foundation">{args.labelText}</label>
          </Flex>
          <Flex columnGap="10px">
            <RadioButton
              {...args}
              id="primary"
              name="color"
              value="primary"
              checked={selected === 'primary'}
              onChange={() => setSelected('primary')}
            />
            <label htmlFor="primary">기본</label>
          </Flex>
        </Flex>
      </fieldset>
    )
  },
}

/* --------------------------------------------------------------------------
   shadcn/ui 벤치마크: 요금제 선택 라디오 패턴
   shadcn/ui RadioGroup — 박스형 요금제 카드 선택 UI
-------------------------------------------------------------------------- */
const PLANS = [
  { id: 'starter', name: 'Starter', price: '무료', features: ['컴포넌트 50개', '프로젝트 3개', '커뮤니티 지원'] },
  { id: 'pro', name: 'Pro', price: '₩29,000/월', features: ['컴포넌트 무제한', '프로젝트 무제한', '우선 지원', 'Figma 연동'] },
  { id: 'team', name: 'Team', price: '₩79,000/월', features: ['Pro 모든 기능', '팀원 10명', '커스텀 테마', '전담 매니저'] },
]

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const shadcn_요금제_선택 = {
  name: 'shadcn/ui - 박스형 요금제 선택 패턴',
  render: function Render() {
    const [plan, setPlan] = useState('pro')
    return (
      <div style={{ maxWidth: 480 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', marginBottom: 12 }}>요금제 선택</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {PLANS.map((p) => {
            const isSelected = plan === p.id
            return (
              <div
                key={p.id}
                onClick={() => setPlan(p.id)}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 14,
                  padding: '14px 16px',
                  borderRadius: 10,
                  border: `2px solid ${isSelected ? '#6366f1' : '#e2e8f0'}`,
                  background: isSelected ? '#6366f108' : '#fff',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                <RadioButton
                  name="plan"
                  value={p.id}
                  checked={isSelected}
                  onChange={() => setPlan(p.id)}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{p.name}</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: isSelected ? '#6366f1' : '#0f172a' }}>{p.price}</span>
                  </div>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {p.features.map((f) => (
                      <li key={f} style={{ fontSize: 12, color: '#64748b', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ color: isSelected ? '#6366f1' : '#94a3b8', fontSize: 10 }}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
        <div style={{ marginTop: 12, fontSize: 11, color: '#94a3b8' }}>shadcn/ui RadioGroup — 카드형 선택 UI 패턴</div>
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   Linear 벤치마크: 이슈 우선순위 선택 패턴
   Linear priority picker — 우선순위 레벨 라디오 선택 UI
-------------------------------------------------------------------------- */
const PRIORITIES = [
  { id: 'urgent', label: '긴급', color: '#ef4444', desc: '즉시 처리 필요' },
  { id: 'high', label: '높음', color: '#f59e0b', desc: '이번 스프린트 내 처리' },
  { id: 'medium', label: '보통', color: '#6366f1', desc: '우선순위 기본값' },
  { id: 'low', label: '낮음', color: '#94a3b8', desc: '여유 있을 때 처리' },
  { id: 'none', label: '없음', color: '#e2e8f0', desc: '우선순위 미지정' },
]

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const Linear_우선순위_선택 = {
  name: 'Linear - 이슈 우선순위 선택 패턴',
  render: function Render() {
    const [priority, setPriority] = useState('medium')
    const selected = PRIORITIES.find((p) => p.id === priority)!
    return (
      <div style={{ maxWidth: 320 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', marginBottom: 12 }}>우선순위</div>
        <div style={{ borderRadius: 10, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          {PRIORITIES.map((p, i) => (
            <div
              key={p.id}
              onClick={() => setPriority(p.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 14px',
                borderBottom: i < PRIORITIES.length - 1 ? '1px solid #f1f5f9' : 'none',
                cursor: 'pointer',
                background: priority === p.id ? p.color + '08' : '#fff',
                transition: 'background 0.1s',
              }}
            >
              <RadioButton
                name="priority"
                value={p.id}
                checked={priority === p.id}
                onChange={() => setPriority(p.id)}
              />
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: p.color, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{p.label}</div>
                <div style={{ fontSize: 11, color: '#94a3b8' }}>{p.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 12, padding: '8px 12px', borderRadius: 8, background: selected.color + '10', border: `1px solid ${selected.color}30`, fontSize: 13, color: '#475569' }}>
          선택된 우선순위: <strong style={{ color: selected.color }}>{selected.label}</strong>
        </div>
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   Ant Design 벤치마크: 설문 문항 라디오 패턴
   Ant Design Radio.Group — 1~5점 척도 + 단일 선택 설문 UI
-------------------------------------------------------------------------- */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
/* --------------------------------------------------------------------------
   Chakra UI 벤치마크: 테마 색상 모드 선택
   Chakra UI의 colorScheme prop 패턴 — 색상 역할별 시각적 미리보기가 있는 라디오 그룹
-------------------------------------------------------------------------- */
export const Chakra_테마_색상_모드: Story = {
  name: 'Chakra UI - 테마 색상 모드 선택',
  parameters: {
    docs: {
      description: {
        story:
          'Chakra UI colorScheme 패턴. 각 라디오 옵션에 색상 미리보기 스와치가 포함되어 선택 전에 결과를 확인할 수 있습니다.',
      },
    },
  },
  render: function Render(args) {
    const themes = [
      { value: 'indigo', label: 'Indigo', primary: '#6366f1', secondary: '#8b5cf6', accent: '#c7d2fe' },
      { value: 'emerald', label: 'Emerald', primary: '#10b981', secondary: '#059669', accent: '#a7f3d0' },
      { value: 'amber', label: 'Amber', primary: '#f59e0b', secondary: '#d97706', accent: '#fde68a' },
      { value: 'rose', label: 'Rose', primary: '#f43f5e', secondary: '#e11d48', accent: '#fecdd3' },
      { value: 'slate', label: 'Slate', primary: '#475569', secondary: '#334155', accent: '#cbd5e1' },
    ]
    const [selected, setSelected] = useState('indigo')
    const current = themes.find((t) => t.value === selected)!

    return (
      <div style={{ maxWidth: 380, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>테마 색상 선택</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {themes.map((theme) => (
            <div
              key={theme.value}
              onClick={() => setSelected(theme.value)}
              style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
                borderRadius: 10, cursor: 'pointer',
                border: `1.5px solid ${selected === theme.value ? theme.primary : '#e2e8f0'}`,
                background: selected === theme.value ? theme.accent + '30' : '#fff',
                transition: 'all 0.15s',
              }}
            >
              <RadioButton
                {...args}
                value={theme.value}
                name="theme-color"
                checked={selected === theme.value}
                onChange={() => setSelected(theme.value)}
              />
              <div style={{ display: 'flex', gap: 6, flex: 1 }}>
                {[theme.primary, theme.secondary, theme.accent].map((color) => (
                  <div
                    key={color}
                    style={{
                      width: 20, height: 20, borderRadius: 4, background: color,
                      border: '1px solid rgba(0,0,0,0.08)',
                    }}
                  />
                ))}
              </div>
              <span style={{ fontSize: 13, fontWeight: selected === theme.value ? 700 : 500, color: '#1e293b' }}>
                {theme.label}
              </span>
            </div>
          ))}
        </div>
        <div style={{
          padding: '14px 16px', borderRadius: 10,
          background: current.accent + '40', border: `1px solid ${current.accent}`,
        }}>
          <div style={{ fontSize: 11, color: '#64748b', marginBottom: 6 }}>미리보기</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ padding: '8px 16px', borderRadius: 7, background: current.primary, color: '#fff', fontSize: 13, fontWeight: 700 }}>
              Primary
            </div>
            <div style={{
              padding: '8px 16px', borderRadius: 7,
              background: 'transparent', border: `1.5px solid ${current.primary}`,
              color: current.primary, fontSize: 13, fontWeight: 700,
            }}>
              Outline
            </div>
          </div>
        </div>
        <div style={{ fontSize: 11, color: '#94a3b8' }}>
          Chakra UI colorScheme 패턴 — 색상 스와치 미리보기 + 라디오 선택
        </div>
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   Material 3 벤치마크: 버튼 변형 역할 선택
   M3의 filled / tonal / outlined / text 버튼 변형을 라디오로 선택하는 패턴
   각 변형의 시각적 차이를 명확하게 보여주는 UI 설정 패널
-------------------------------------------------------------------------- */
export const M3_버튼_변형_선택: Story = {
  name: 'Material 3 - 버튼 변형 역할 선택',
  parameters: {
    docs: {
      description: {
        story:
          'M3의 filled/tonal/outlined/text 버튼 변형을 라디오 그룹으로 선택하는 설정 패널 패턴. ' +
          '각 변형의 시각적 샘플과 사용 용도 설명이 함께 표시됩니다.',
      },
    },
  },
  render: function Render(args) {
    const variants = [
      {
        value: 'filled',
        label: 'Filled',
        desc: '가장 중요한 CTA. 화면당 1개만 사용.',
        preview: { bg: '#6366f1', color: '#fff', border: 'none' },
        badge: '높은 강조',
      },
      {
        value: 'tonal',
        label: 'Tonal',
        desc: '보조 액션. Filled보다 낮은 강조.',
        preview: { bg: '#eef2ff', color: '#4f46e5', border: '1px solid #c7d2fe' },
        badge: '중간 강조',
      },
      {
        value: 'outlined',
        label: 'Outlined',
        desc: '주요 경계선 버튼. 중립적 액션.',
        preview: { bg: 'transparent', color: '#475569', border: '1.5px solid #e2e8f0' },
        badge: '낮은 강조',
      },
      {
        value: 'text',
        label: 'Text',
        desc: '최소 강조. 보완적인 보조 액션.',
        preview: { bg: 'transparent', color: '#6366f1', border: 'none' },
        badge: '최소 강조',
      },
    ]
    const [selected, setSelected] = useState('filled')

    return (
      <div style={{ maxWidth: 400 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>
          기본 버튼 변형 설정
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {variants.map((v) => (
            <div
              key={v.value}
              onClick={() => setSelected(v.value)}
              style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
                borderRadius: 10, cursor: 'pointer',
                border: `1.5px solid ${selected === v.value ? '#6366f1' : '#e2e8f0'}`,
                background: selected === v.value ? '#f5f3ff' : '#fff',
                transition: 'all 0.15s',
              }}
            >
              <RadioButton
                {...args}
                value={v.value}
                name="btn-variant"
                checked={selected === v.value}
                onChange={() => setSelected(v.value)}
              />
              <div
                style={{
                  padding: '6px 14px', borderRadius: 7, fontSize: 12, fontWeight: 700,
                  minWidth: 72, textAlign: 'center',
                  background: v.preview.bg, color: v.preview.color, border: v.preview.border,
                }}
              >
                {v.label}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{v.label}</div>
                <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{v.desc}</div>
              </div>
              <span style={{
                fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 5,
                background: selected === v.value ? '#6366f1' : '#f1f5f9',
                color: selected === v.value ? '#fff' : '#64748b',
              }}>
                {v.badge}
              </span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 12, fontSize: 11, color: '#94a3b8' }}>
          M3 버튼 변형 시스템 — filled / tonal / outlined / text 강조 계층
        </div>
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   Chakra + M3 조합: 구독 플랜 선택 카드
   Chakra UI의 시각적 피드백 + M3의 컨테이너 색상 역할을 결합한
   가격 플랜 선택 UI — 각 플랜이 M3 컨테이너 토큰으로 시각 구분
-------------------------------------------------------------------------- */
export const Chakra_M3_구독_플랜_선택: Story = {
  name: 'Chakra + M3 - 구독 플랜 선택 카드',
  parameters: {
    docs: {
      description: {
        story:
          'Chakra UI 시각적 피드백 + M3 container color role 조합. ' +
          '선택된 플랜은 M3 primaryContainer 색상으로 강조되며, 각 플랜의 특성이 명확히 구분됩니다.',
      },
    },
  },
  render: function Render(args) {
    const plans = [
      {
        value: 'free',
        name: 'Free',
        price: '₩0',
        period: '영원히 무료',
        features: ['컴포넌트 5개', 'Storybook 공유', '커뮤니티 지원'],
        containerBg: '#f8fafc',
        selectedBg: '#eef2ff',
        borderSelected: '#6366f1',
        accent: '#6366f1',
      },
      {
        value: 'pro',
        name: 'Pro',
        price: '₩19,000',
        period: '/ 월',
        features: ['컴포넌트 무제한', '팀 10명', 'API 100K', '우선 지원'],
        containerBg: '#f8fafc',
        selectedBg: '#f0fdf4',
        borderSelected: '#10b981',
        accent: '#10b981',
        recommended: true,
      },
      {
        value: 'enterprise',
        name: 'Enterprise',
        price: '₩89,000',
        period: '/ 월',
        features: ['모든 Pro 기능', '팀 무제한', 'SLA 99.9%', '전담 지원'],
        containerBg: '#f8fafc',
        selectedBg: '#fffbeb',
        borderSelected: '#f59e0b',
        accent: '#f59e0b',
      },
    ]
    const [selected, setSelected] = useState('pro')

    return (
      <div style={{ maxWidth: 420, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>플랜 선택</div>
        {plans.map((plan) => {
          const isSelected = selected === plan.value
          return (
            <div
              key={plan.value}
              onClick={() => setSelected(plan.value)}
              style={{
                padding: '16px 18px', borderRadius: 12, cursor: 'pointer',
                border: `2px solid ${isSelected ? plan.borderSelected : '#e2e8f0'}`,
                background: isSelected ? plan.selectedBg : plan.containerBg,
                transition: 'all 0.15s',
                position: 'relative',
              }}
            >
              {plan.recommended && (
                <span style={{
                  position: 'absolute', top: -10, right: 16,
                  fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 99,
                  background: '#10b981', color: '#fff',
                }}>
                  추천
                </span>
              )}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{ paddingTop: 2 }}>
                  <RadioButton
                    {...args}
                    value={plan.value}
                    name="subscription-plan"
                    checked={isSelected}
                    onChange={() => setSelected(plan.value)}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <div>
                      <span style={{ fontSize: 14, fontWeight: 800, color: '#0f172a' }}>{plan.name}</span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: 18, fontWeight: 800, color: isSelected ? plan.accent : '#0f172a' }}>
                        {plan.price}
                      </span>
                      <span style={{ fontSize: 11, color: '#94a3b8', marginLeft: 2 }}>{plan.period}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {plan.features.map((feature) => (
                      <span key={feature} style={{ fontSize: 11, color: '#64748b', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <span style={{ color: isSelected ? plan.accent : '#cbd5e1', fontSize: 10 }}>✓</span>
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
        <div style={{ marginTop: 4, fontSize: 11, color: '#94a3b8' }}>
          Chakra UI 시각적 피드백 + M3 container color role 패턴
        </div>
      </div>
    )
  },
}

export const Ant_설문_척도_라디오 = {
  name: 'Ant Design - 설문 문항 라디오 패턴',
  render: function Render() {
    const [satisfaction, setSatisfaction] = useState<string>('')
    const [recommend, setRecommend] = useState<string>('')
    const [submitted, setSubmitted] = useState(false)

    return (
      <div style={{ maxWidth: 400 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#1e293b', marginBottom: 16 }}>사용자 만족도 조사</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Q1 */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b', marginBottom: 10 }}>
              1. Orbit UI 사용 만족도는 어느 정도입니까?
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['매우 불만족', '불만족', '보통', '만족', '매우 만족'].map((label, i) => {
                const val = String(i + 1)
                return (
                  <div
                    key={val}
                    onClick={() => setSatisfaction(val)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 6,
                      padding: '8px 12px',
                      borderRadius: 8,
                      border: `1px solid ${satisfaction === val ? '#6366f1' : '#e2e8f0'}`,
                      background: satisfaction === val ? '#6366f108' : '#fff',
                      cursor: 'pointer',
                      minWidth: 60,
                    }}
                  >
                    <RadioButton name="satisfaction" value={val} checked={satisfaction === val} onChange={() => setSatisfaction(val)} />
                    <span style={{ fontSize: 11, color: '#64748b', textAlign: 'center' }}>{label}</span>
                  </div>
                )
              })}
            </div>
          </div>
          {/* Q2 */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b', marginBottom: 10 }}>
              2. Orbit UI를 추천하시겠습니까?
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {['네, 적극 추천합니다', '네, 상황에 따라 추천합니다', '아니오, 추천하지 않습니다'].map((label) => (
                <div
                  key={label}
                  onClick={() => setRecommend(label)}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
                >
                  <RadioButton name="recommend" value={label} checked={recommend === label} onChange={() => setRecommend(label)} />
                  <span style={{ fontSize: 13, color: recommend === label ? '#1e293b' : '#64748b' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
          {submitted ? (
            <div style={{ padding: '12px 16px', borderRadius: 8, background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#16a34a', fontSize: 14, fontWeight: 600 }}>
              응답이 제출되었습니다. 감사합니다!
            </div>
          ) : (
            <button
              disabled={!satisfaction || !recommend}
              onClick={() => setSubmitted(true)}
              style={{
                padding: '10px',
                borderRadius: 8,
                border: 'none',
                background: satisfaction && recommend ? '#6366f1' : '#e2e8f0',
                color: satisfaction && recommend ? '#fff' : '#94a3b8',
                fontSize: 14,
                fontWeight: 600,
                cursor: satisfaction && recommend ? 'pointer' : 'not-allowed',
              }}
            >
              제출하기
            </button>
          )}
        </div>
        <div style={{ marginTop: 8, fontSize: 11, color: '#94a3b8' }}>Ant Design Radio.Group — 척도형 + 객관식 설문 패턴</div>
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   Radix UI — 접근성 기반 라디오 그룹 (Cycle 121)
   Radix RadioGroup.Root 패턴 — 시각적 포커스 표시 + 키보드 접근성
-------------------------------------------------------------------------- */
function RadixA11yRadioGroupRender() {
  const [value, setValue] = useState('option-a')

  const options = [
    { id: 'option-a', label: '옵션 A', desc: '기본 설정으로 시작합니다', recommended: true },
    { id: 'option-b', label: '옵션 B', desc: '사용자 정의 설정을 직접 구성합니다', recommended: false },
    { id: 'option-c', label: '옵션 C', desc: '가이드 없이 빈 프로젝트로 시작합니다', recommended: false },
  ]

  return (
    <div style={{ width: 380, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>
        Radix RadioGroup — 키보드 접근성 패턴
      </div>
      {options.map((opt) => (
        <label
          key={opt.id}
          style={{
            display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 14px',
            borderRadius: 8, cursor: 'pointer',
            border: `1.5px solid ${value === opt.id ? '#6366f1' : '#e2e8f0'}`,
            background: value === opt.id ? '#f0f4ff' : '#fff',
            transition: 'border-color 0.15s, background 0.15s',
          }}
        >
          <RadioButton
            name="radix-a11y"
            value={opt.id}
            checked={value === opt.id}
            onChange={() => setValue(opt.id)}
          />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{opt.label}</span>
              {opt.recommended && (
                <span style={{ fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 4, background: '#6366f1', color: '#fff' }}>추천</span>
              )}
            </div>
            <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{opt.desc}</div>
          </div>
        </label>
      ))}
      <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>
        선택: {options.find((o) => o.id === value)?.label} · 키보드 ↑↓ 화살표로 이동 가능
      </div>
    </div>
  )
}

export const Radix_A11y_라디오_그룹: Story = {
  name: 'Radix UI — 접근성 라디오 그룹 (Cycle 121)',
  parameters: {
    docs: {
      description: {
        story:
          'Radix UI RadioGroup.Root의 접근성 패턴. 카드형 레이블 클릭, 추천 배지, 선택 시 테두리/배경 변화. 키보드 ↑↓로 포커스 이동 지원.',
      },
    },
  },
  render: () => <RadixA11yRadioGroupRender />,
}

/* --------------------------------------------------------------------------
   Tailwind UI — 결제 방법 선택 라디오 (Cycle 121)
   Tailwind의 payment method radio card 패턴
-------------------------------------------------------------------------- */
function TailwindPaymentRadioRender() {
  const [method, setMethod] = useState('card')

  const methods = [
    { id: 'card', label: '신용카드', icon: '💳', detail: '모든 주요 카드 지원' },
    { id: 'bank', label: '계좌이체', icon: '🏦', detail: '실시간 이체 가능' },
    { id: 'kakao', label: '카카오페이', icon: '💛', detail: '카카오톡으로 간편 결제' },
    { id: 'naver', label: '네이버페이', icon: '💚', detail: '포인트 적립 가능' },
  ]

  return (
    <div style={{ width: 360, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>결제 방법 선택</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {methods.map((m) => (
          <label
            key={m.id}
            style={{
              padding: '14px', borderRadius: 8, cursor: 'pointer',
              border: `1.5px solid ${method === m.id ? '#6366f1' : '#e2e8f0'}`,
              background: method === m.id ? '#f0f4ff' : '#fff',
              display: 'flex', flexDirection: 'column', gap: 8,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 18 }}>{m.icon}</span>
              <RadioButton
                name="payment"
                value={m.id}
                checked={method === m.id}
                onChange={() => setMethod(m.id)}
              />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{m.label}</div>
              <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{m.detail}</div>
            </div>
          </label>
        ))}
      </div>
      <div style={{ padding: '10px 14px', borderRadius: 8, background: '#f0f4ff', border: '1px solid #c7d2fe', fontSize: 12, color: '#6366f1' }}>
        선택된 결제 방법: {methods.find((m) => m.id === method)?.label}
      </div>
    </div>
  )
}

export const Tailwind_결제_방법_라디오: Story = {
  name: 'Tailwind UI — 결제 방법 라디오 카드 (Cycle 121)',
  parameters: {
    docs: {
      description: {
        story:
          'Tailwind UI의 payment method radio card 패턴. 2열 그리드 카드 선택, 아이콘과 설명 포함, 선택 시 테두리/배경 하이라이트.',
      },
    },
  },
  render: () => <TailwindPaymentRadioRender />,
}

/* --------------------------------------------------------------------------
   Radix + Tailwind — 요금제 선택 라디오 (Cycle 121)
   구독 플랜 선택 — 연간/월간 토글 + 플랜 카드
-------------------------------------------------------------------------- */
function RadixTailwindPlanRadioRender() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('annual')
  const [plan, setPlan] = useState('pro')

  const plans = [
    { id: 'hobby', label: 'Hobby', price: { monthly: 0, annual: 0 }, features: ['컴포넌트 40+', '스토리 600+', '커뮤니티 지원'], highlight: false },
    { id: 'pro', label: 'Pro', price: { monthly: 19, annual: 15 }, features: ['컴포넌트 100+', '스토리 1000+', '우선 지원', 'MDX 문서'], highlight: true },
    { id: 'team', label: 'Team', price: { monthly: 49, annual: 39 }, features: ['무제한 컴포넌트', '커스텀 테마', '전담 지원', 'SLA 99.9%'], highlight: false },
  ]

  return (
    <div style={{ width: 460, display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Billing toggle */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 0, border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden', width: 'fit-content', alignSelf: 'center' }}>
        {(['monthly', 'annual'] as const).map((b) => (
          <button
            key={b}
            onClick={() => setBilling(b)}
            style={{
              padding: '6px 20px', fontSize: 12, fontWeight: 600, cursor: 'pointer',
              background: billing === b ? '#6366f1' : '#fff',
              color: billing === b ? '#fff' : '#64748b',
              border: 'none',
            }}
          >
            {b === 'monthly' ? '월간' : '연간'}
            {b === 'annual' && <span style={{ marginLeft: 4, fontSize: 10, opacity: 0.8 }}>(-20%)</span>}
          </button>
        ))}
      </div>

      {/* Plans */}
      <div style={{ display: 'flex', gap: 8 }}>
        {plans.map((p) => (
          <label
            key={p.id}
            style={{
              flex: 1, padding: '14px 12px', borderRadius: 10, cursor: 'pointer',
              border: `2px solid ${plan === p.id ? '#6366f1' : p.highlight ? '#6366f1' : '#e2e8f0'}`,
              background: plan === p.id ? '#f0f4ff' : p.highlight ? '#fafafe' : '#fff',
              position: 'relative',
            }}
          >
            {p.highlight && (
              <div style={{ position: 'absolute', top: -1, left: '50%', transform: 'translateX(-50%)', fontSize: 10, fontWeight: 700, padding: '2px 8px', background: '#6366f1', color: '#fff', borderRadius: '0 0 6px 6px' }}>인기</div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{p.label}</span>
              <RadioButton name="plan" value={p.id} checked={plan === p.id} onChange={() => setPlan(p.id)} />
            </div>
            <div style={{ marginBottom: 8 }}>
              <span style={{ fontSize: 20, fontWeight: 800, color: '#6366f1' }}>
                ${p.price[billing]}
              </span>
              <span style={{ fontSize: 11, color: '#94a3b8' }}>/월</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {p.features.map((f) => (
                <div key={f} style={{ fontSize: 11, color: '#475569', display: 'flex', gap: 4 }}>
                  <span style={{ color: '#10b981' }}>✓</span> {f}
                </div>
              ))}
            </div>
          </label>
        ))}
      </div>
    </div>
  )
}

export const Radix_Tailwind_요금제_선택: Story = {
  name: 'Radix + Tailwind — 요금제 선택 라디오 (Cycle 121)',
  parameters: {
    docs: {
      description: {
        story:
          'Radix UI + Tailwind UI의 pricing plan 선택 패턴. 월간/연간 전환 + 3가지 플랜 카드 라디오. 인기 배지, 연간 할인율, 기능 체크리스트.',
      },
    },
  },
  render: () => <RadixTailwindPlanRadioRender />,
}
