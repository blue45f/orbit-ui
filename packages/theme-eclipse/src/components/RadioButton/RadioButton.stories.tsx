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
