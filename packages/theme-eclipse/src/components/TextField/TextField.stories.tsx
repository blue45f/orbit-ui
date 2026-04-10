import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { useState } from 'react'

import { TextField } from './TextField'

const meta = {
  title: 'eclipse/Inputs/Text Fields/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    placeholder: 'Enter text',
    disabled: false,
    error: false,
    onChange: fn(),
  },
  argTypes: {
    value: {
      control: 'text',
      description: '입력된 값 (있으면 Populated 상태)',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder 텍스트',
    },
    error: {
      control: 'boolean',
      description: '에러 상태',
    },
  },
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const 기본: Story = {
  parameters: {
    controls: {
      exclude: ['theme', 'className', 'style', 'axis'],
    },
  },
  render: (args) => <TextField {...args} />,
}

const FocusedExample = ({
  value,
  placeholder,
  error,
}: {
  value?: string
  placeholder?: string
  error?: boolean
}) => {
  const [isFocused, setIsFocused] = useState(false)
  return (
    <div>
      <TextField
        value={value}
        placeholder={placeholder}
        error={error}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <small style={{ display: 'block', marginTop: '4px', color: '#666' }}>
        {isFocused ? '(Focused - 클릭하여 포커스)' : '(클릭하여 포커스)'}
      </small>
    </div>
  )
}

export const 모든상태: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '24px',
        width: '800px',
      }}
    >
      <div>
        <h4 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 'bold' }}>State</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Enabled</p>
            <TextField placeholder="Enter text" />
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Focused</p>
            <FocusedExample placeholder="Enter text" />
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Disabled</p>
            <TextField placeholder="Enter text" disabled />
          </div>
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 'bold' }}>Populated</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Empty</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <TextField placeholder="Enter text" />
              <FocusedExample placeholder="Enter text" />
              <TextField placeholder="Enter text" disabled />
            </div>
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Populated</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <TextField value="Sample text" placeholder="Enter text" />
              <FocusedExample value="Sample text" placeholder="Enter text" />
              <TextField value="Sample text" placeholder="Enter text" disabled />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const 에러상태: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '24px',
        width: '800px',
      }}
    >
      <div>
        <h4 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 'bold' }}>Error: false</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Empty</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <TextField placeholder="Enter text" error={false} />
              <FocusedExample placeholder="Enter text" error={false} />
              <TextField placeholder="Enter text" error={false} disabled />
            </div>
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Populated</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <TextField value="Sample text" placeholder="Enter text" error={false} />
              <FocusedExample value="Sample text" placeholder="Enter text" error={false} />
              <TextField value="Sample text" placeholder="Enter text" error={false} disabled />
            </div>
          </div>
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 'bold' }}>Error: true</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Empty</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <TextField placeholder="Enter text" error={true} />
              <FocusedExample placeholder="Enter text" error={true} />
              <TextField placeholder="Enter text" error={true} disabled />
            </div>
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Populated</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <TextField value="Sample text" placeholder="Enter text" error={true} />
              <FocusedExample value="Sample text" placeholder="Enter text" error={true} />
              <TextField value="Sample text" placeholder="Enter text" error={true} disabled />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const 디자인QA = {
  args: {
    placeholder: 'Enter text',
    disabled: false,
    error: false,
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  render: ({ placeholder, disabled, error, ...args }: any) => (
    <TextField placeholder={placeholder} disabled={disabled} error={error} {...args} />
  ),
}

// MUI FormControl 패턴: 라벨 + 헬퍼 텍스트 + 에러 메시지 조합
const FormFieldWrapper = ({
  label,
  required,
  helperText,
  errorText,
  isError,
  children,
}: {
  label: string
  required?: boolean
  helperText?: string
  errorText?: string
  isError: boolean
  children: React.ReactNode
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
    <label style={{
      fontSize: '13px', fontWeight: '600',
      color: isError ? '#ef4444' : '#374151',
      display: 'flex', alignItems: 'center', gap: '4px',
    }}>
      {label}
      {required && <span style={{ color: '#ef4444', fontSize: '12px' }}>*</span>}
    </label>
    {children}
    {isError && errorText ? (
      <span style={{
        fontSize: '12px', color: '#ef4444',
        display: 'flex', alignItems: 'center', gap: '4px',
      }}>
        <span style={{
          width: '14px', height: '14px', borderRadius: '50%',
          background: '#ef4444', color: '#fff', fontSize: '9px',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>!</span>
        {errorText}
      </span>
    ) : helperText ? (
      <span style={{ fontSize: '12px', color: '#94a3b8' }}>{helperText}</span>
    ) : null}
  </div>
)

// MUI 회원가입 폼 패턴
const SignupFormDemo = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '' })
  const [touched, setTouched] = useState({ name: false, email: false, phone: false, company: false })
  const [submitted, setSubmitted] = useState(false)

  const errors = {
    name: touched.name && form.name.trim().length < 2 ? '이름은 2자 이상 입력하세요' : '',
    email: touched.email && !form.email.includes('@') ? '올바른 이메일 형식이 아닙니다' : '',
    phone: touched.phone && !/^[0-9-]{10,13}$/.test(form.phone.replace(/\s/g, '')) ? '올바른 전화번호 형식이 아닙니다' : '',
    company: '',
  }

  const isValid = form.name.trim().length >= 2 && form.email.includes('@')

  const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  return (
    <div style={{
      width: '440px', padding: '36px', background: '#fff',
      borderRadius: '20px', boxShadow: '0 8px 40px rgba(0,0,0,0.1)',
    }}>
      <div style={{ marginBottom: '28px' }}>
        <div style={{ fontSize: '11px', fontWeight: '700', color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
          MUI FormControl Pattern
        </div>
        <h2 style={{ margin: '0 0 6px', fontSize: '22px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.02em' }}>
          계정 만들기
        </h2>
        <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
          모든 필드를 입력하면 가입 버튼이 활성화됩니다
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <FormFieldWrapper
            label="이름"
            required
            helperText="실명을 입력하세요"
            errorText={errors.name}
            isError={Boolean(errors.name)}
          >
            <TextField
              placeholder="홍길동"
              value={form.name}
              error={Boolean(errors.name)}
              onChange={handleChange('name')}
            />
          </FormFieldWrapper>
          <FormFieldWrapper
            label="회사명"
            helperText="선택 사항"
            errorText=""
            isError={false}
          >
            <TextField
              placeholder="Acme Corp"
              value={form.company}
              onChange={handleChange('company')}
            />
          </FormFieldWrapper>
        </div>

        <FormFieldWrapper
          label="이메일"
          required
          helperText="로그인에 사용됩니다"
          errorText={errors.email}
          isError={Boolean(errors.email)}
        >
          <TextField
            placeholder="example@email.com"
            value={form.email}
            error={Boolean(errors.email)}
            onChange={handleChange('email')}
          />
        </FormFieldWrapper>

        <FormFieldWrapper
          label="전화번호"
          helperText="010-1234-5678 형식"
          errorText={errors.phone}
          isError={Boolean(errors.phone)}
        >
          <TextField
            placeholder="010-0000-0000"
            value={form.phone}
            error={Boolean(errors.phone)}
            onChange={handleChange('phone')}
          />
        </FormFieldWrapper>
      </div>

      {submitted && isValid && (
        <div style={{
          marginTop: '16px', padding: '12px 16px', borderRadius: '10px',
          background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)',
          fontSize: '13px', color: '#10b981', fontWeight: '500',
        }}>
          가입이 완료되었습니다!
        </div>
      )}

      <button
        onClick={() => {
          setTouched({ name: true, email: true, phone: true, company: true })
          if (isValid) setSubmitted(true)
        }}
        style={{
          marginTop: '24px', width: '100%', padding: '14px', borderRadius: '12px',
          border: 'none', cursor: isValid ? 'pointer' : 'not-allowed',
          background: isValid
            ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
            : '#e2e8f0',
          color: isValid ? '#fff' : '#94a3b8',
          fontSize: '14px', fontWeight: '700',
          transition: 'all 0.2s',
        }}
      >
        가입하기
      </button>
    </div>
  )
}

export const MUI_폼패턴: Story = {
  name: 'MUI FormControl 패턴 (회원가입 폼)',
  render: () => <SignupFormDemo />,
}

// MUI outlined/filled/standard 3-variant 비교 패턴
export const MUI_Variant_비교: Story = {
  name: 'MUI 3-Variant 비교 (Outlined / Filled / Standard)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '560px' }}>
      <div>
        <div style={{ fontSize: '11px', fontWeight: '700', color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
          Orbit UI TextField (Outlined - default)
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <TextField placeholder="기본 (Enabled)" />
          <TextField placeholder="에러 상태" error />
          <TextField placeholder="비활성화" disabled />
          <TextField value="입력값 있음" placeholder="Populated" />
        </div>
      </div>

      <div style={{ padding: '20px', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
        <div style={{ fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '10px' }}>
          MUI vs Orbit UI 차이점
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { mui: 'outlined', orbit: 'TextField (기본)', note: '테두리 있는 형태 - 동일' },
            { mui: 'filled', orbit: 'theme prop으로 배경색 적용', note: '배경 채워진 형태' },
            { mui: 'standard', orbit: 'theme prop으로 언더라인만', note: '언더라인만 있는 형태' },
          ].map((row) => (
            <div key={row.mui} style={{
              display: 'grid', gridTemplateColumns: '1fr 1.5fr 1.5fr',
              gap: '8px', padding: '8px 12px', borderRadius: '6px', background: '#fff',
              border: '1px solid #f1f5f9', fontSize: '12px',
            }}>
              <span style={{ color: '#6366f1', fontWeight: '600' }}>MUI: {row.mui}</span>
              <span style={{ color: '#374151' }}>{row.orbit}</span>
              <span style={{ color: '#94a3b8' }}>{row.note}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
}

// 인라인 검색 + 필터 패턴 (Chakra Input group 패턴)
const InlineSearchDemo = () => {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const results = ['Apple', 'Banana', 'Cherry', 'Dragonfruit', 'Elderberry', 'Fig', 'Grape']
  const filters = [
    { id: 'all', label: '전체' },
    { id: 'a-c', label: 'A-C' },
    { id: 'd-f', label: 'D-F' },
    { id: 'g-i', label: 'G-I' },
  ]

  const filtered = results.filter((r) => {
    const matchQuery = r.toLowerCase().includes(query.toLowerCase())
    if (filter === 'all') return matchQuery
    if (filter === 'a-c') return matchQuery && r[0] >= 'A' && r[0] <= 'C'
    if (filter === 'd-f') return matchQuery && r[0] >= 'D' && r[0] <= 'F'
    if (filter === 'g-i') return matchQuery && r[0] >= 'G' && r[0] <= 'I'
    return matchQuery
  })

  return (
    <div style={{ width: '400px' }}>
      <div style={{ fontSize: '11px', fontWeight: '700', color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
        Chakra Input Group Pattern
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
        <TextField
          placeholder="검색어를 입력하세요..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div style={{ display: 'flex', gap: '6px' }}>
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              style={{
                padding: '6px 12px', borderRadius: '20px', border: 'none',
                fontSize: '12px', fontWeight: '600', cursor: 'pointer',
                background: filter === f.id ? '#6366f1' : '#f1f5f9',
                color: filter === f.id ? '#fff' : '#64748b',
                transition: 'all 0.15s',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <div key={item} style={{
              padding: '10px 14px', borderRadius: '8px', background: '#f8fafc',
              border: '1px solid #f1f5f9', fontSize: '14px', color: '#374151',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#6366f1', flexShrink: 0 }} />
              {item}
            </div>
          ))
        ) : (
          <div style={{
            padding: '24px', textAlign: 'center',
            fontSize: '13px', color: '#94a3b8',
          }}>
            검색 결과가 없습니다
          </div>
        )}
      </div>
    </div>
  )
}

export const Chakra_검색필터패턴: Story = {
  name: 'Chakra Input Group 패턴 (검색 + 필터)',
  render: () => <InlineSearchDemo />,
}

// Notion 인라인 편집 패턴: 클릭하면 입력 활성화, blur 시 저장
const NotionInlineEditDemo = () => {
  const properties = [
    { key: 'assignee', label: '담당자', value: '김희준' },
    { key: 'status', label: '상태', value: '진행 중' },
    { key: 'priority', label: '우선순위', value: 'P1 — 긴급' },
    { key: 'due', label: '마감일', value: '2026-04-30' },
    { key: 'sprint', label: '스프린트', value: 'Sprint 12' },
  ]

  const [editing, setEditing] = useState<string | null>(null)
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(properties.map((p) => [p.key, p.value]))
  )

  return (
    <div style={{
      width: 440,
      background: '#fff',
      borderRadius: 12,
      border: '1px solid #e2e8f0',
      overflow: 'hidden',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    }}>
      <div style={{
        padding: '12px 20px',
        borderBottom: '1px solid #f1f5f9',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}>
        <div style={{
          width: 20, height: 20, borderRadius: 4,
          background: '#6366f1', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          fontSize: 11, color: '#fff', fontWeight: 700,
        }}>N</div>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>데이터베이스 속성 편집</span>
        <span style={{ marginLeft: 'auto', fontSize: 11, color: '#94a3b8' }}>클릭해서 편집</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {properties.map((prop) => (
          <div
            key={prop.key}
            style={{
              display: 'grid',
              gridTemplateColumns: '120px 1fr',
              alignItems: 'center',
              padding: '0 20px',
              borderBottom: '1px solid #f8fafc',
              minHeight: 44,
            }}
          >
            <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 500 }}>{prop.label}</span>
            <div style={{ padding: '4px 0' }}>
              {editing === prop.key ? (
                <TextField
                  value={values[prop.key]}
                  onChange={(e) => setValues((v) => ({ ...v, [prop.key]: e.target.value }))}
                  onBlur={() => setEditing(null)}
                  autoFocus
                />
              ) : (
                <div
                  onClick={() => setEditing(prop.key)}
                  style={{
                    fontSize: 13,
                    color: '#1e293b',
                    padding: '6px 8px',
                    borderRadius: 6,
                    cursor: 'pointer',
                    background: 'transparent',
                    transition: 'background 0.1s',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = '#f8fafc' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'transparent' }}
                >
                  {values[prop.key]}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: '10px 20px', background: '#fafafa', borderTop: '1px solid #f1f5f9' }}>
        <span style={{ fontSize: 11, color: '#94a3b8' }}>Notion — 인라인 편집 패턴</span>
      </div>
    </div>
  )
}

export const Notion_인라인_편집_필드: Story = {
  name: 'Notion 인라인 편집 패턴 (클릭-편집-저장)',
  render: () => <NotionInlineEditDemo />,
}

// Apple HIG 검색 필드 패턴: 포커스 시 레이블 축소, clear 버튼
const AppleHIGSearchDemo = () => {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const suggestions = ['Button', 'Checkbox', 'DataTable', 'Dropdown', 'Modal', 'Progress', 'Slider', 'TextField', 'Toggle']

  const filtered = query.length > 0
    ? suggestions.filter((s) => s.toLowerCase().startsWith(query.toLowerCase()))
    : []

  return (
    <div style={{
      width: 380,
      background: '#f2f2f7',
      borderRadius: 16,
      padding: 20,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif',
    }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#8e8e93', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
        Apple HIG — Search Field
      </div>
      <div style={{ position: 'relative', marginBottom: filtered.length > 0 ? 4 : 0 }}>
        <div style={{
          position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)',
          fontSize: 14, color: '#8e8e93', pointerEvents: 'none', zIndex: 1,
        }}>
          {focused || query ? '' : ''}
        </div>
        <TextField
          placeholder={focused ? '' : '컴포넌트 검색...'}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {query.length > 0 && (
          <button
            onClick={() => setQuery('')}
            style={{
              position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
              width: 18, height: 18, borderRadius: '50%',
              background: '#c7c7cc', border: 'none', cursor: 'pointer',
              fontSize: 10, color: '#fff', fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              lineHeight: 1, padding: 0,
            }}
          >
            x
          </button>
        )}
      </div>

      {filtered.length > 0 && (
        <div style={{
          background: '#fff',
          borderRadius: 12,
          overflow: 'hidden',
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          marginTop: 8,
        }}>
          {filtered.map((item, i) => (
            <div
              key={item}
              onClick={() => { setQuery(item); setFocused(false) }}
              style={{
                padding: '10px 14px',
                fontSize: 14,
                color: '#1c1c1e',
                borderBottom: i < filtered.length - 1 ? '1px solid #f2f2f7' : 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = '#f2f2f7' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = '#fff' }}
            >
              <span style={{ fontSize: 12, color: '#6366f1', width: 20, textAlign: 'center' }}>C</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: 16, fontSize: 11, color: '#8e8e93' }}>
        Apple HIG — 검색 필드 + 자동완성 + 지우기 버튼 패턴
      </div>
    </div>
  )
}

export const Apple_HIG_검색_필드: Story = {
  name: 'Apple HIG 검색 필드 (자동완성 + Clear 버튼)',
  render: () => <AppleHIGSearchDemo />,
}

// Notion 빠른 캡처 패턴: 단일 입력 → 엔터 → 항목 추가
const NotionQuickCaptureDemo = () => {
  const [input, setInput] = useState('')
  const [items, setItems] = useState([
    '디자인 시스템 문서 업데이트',
    'TextField 스토리 추가',
    'Breadcrumb 리뷰 요청',
  ])

  const addItem = () => {
    if (input.trim()) {
      setItems((prev) => [input.trim(), ...prev])
      setInput('')
    }
  }

  return (
    <div style={{
      width: 440,
      background: '#fff',
      borderRadius: 12,
      border: '1px solid #e2e8f0',
      overflow: 'hidden',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    }}>
      <div style={{
        padding: '14px 20px',
        borderBottom: '1px solid #f1f5f9',
      }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', marginBottom: 10 }}>
          빠른 캡처 — 받은 편지함
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ flex: 1 }}>
            <TextField
              placeholder="할 일 추가 (Enter로 저장)..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') addItem() }}
            />
          </div>
          <button
            onClick={addItem}
            style={{
              padding: '0 16px',
              borderRadius: 8,
              border: 'none',
              background: input.trim() ? '#6366f1' : '#e2e8f0',
              color: input.trim() ? '#fff' : '#94a3b8',
              fontSize: 13,
              fontWeight: 600,
              cursor: input.trim() ? 'pointer' : 'default',
              transition: 'all 0.15s',
              whiteSpace: 'nowrap',
            }}
          >
            추가
          </button>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', maxHeight: 240, overflowY: 'auto' }}>
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 20px',
              borderBottom: i < items.length - 1 ? '1px solid #f8fafc' : 'none',
            }}
          >
            <div style={{
              width: 16, height: 16, borderRadius: 4,
              border: '1.5px solid #cbd5e1', flexShrink: 0,
            }} />
            <span style={{ fontSize: 13, color: '#1e293b', flex: 1 }}>{item}</span>
            <button
              onClick={() => setItems((prev) => prev.filter((_, j) => j !== i))}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#cbd5e1', fontSize: 16, lineHeight: 1,
                padding: '0 4px',
              }}
            >
              x
            </button>
          </div>
        ))}
      </div>
      <div style={{ padding: '10px 20px', background: '#fafafa', borderTop: '1px solid #f1f5f9' }}>
        <span style={{ fontSize: 11, color: '#94a3b8' }}>Notion — 빠른 캡처 받은 편지함 패턴</span>
      </div>
    </div>
  )
}

export const Notion_빠른_캡처_받은편지함: Story = {
  name: 'Notion 빠른 캡처 (받은 편지함 패턴)',
  render: () => <NotionQuickCaptureDemo />,
}
