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

/* --------------------------------------------------------------------------
   Radix UI 벤치마크: 실시간 유효성 검사 패턴
   Radix의 uncontrolled → controlled 전환 + 실시간 피드백 패턴
   입력 즉시 규칙 검사 후 아이콘/색상/메시지로 상태를 명확히 전달
-------------------------------------------------------------------------- */
type RuleState = 'idle' | 'valid' | 'invalid'

const validateRules = (value: string) => ({
  length: value.length >= 3 ? 'valid' : value.length > 0 ? 'invalid' : 'idle',
  noSpace: value.length > 0 ? (!/\s/.test(value) ? 'valid' : 'invalid') : 'idle',
  alphaNum: value.length > 0 ? (/^[a-zA-Z0-9가-힣_-]+$/.test(value) ? 'valid' : 'invalid') : 'idle',
} as Record<string, RuleState>)

const RuleIcon = ({ state }: { state: RuleState }) => {
  if (state === 'valid') return <span style={{ color: '#10b981', fontSize: 13 }}>✓</span>
  if (state === 'invalid') return <span style={{ color: '#ef4444', fontSize: 13 }}>✕</span>
  return <span style={{ color: '#cbd5e1', fontSize: 13 }}>○</span>
}

const RadixLiveValidationDemo = () => {
  const [value, setValue] = useState('')
  const rules = validateRules(value)
  const allValid = Object.values(rules).every((r) => r === 'valid')
  const hasError = Object.values(rules).some((r) => r === 'invalid')

  return (
    <div style={{ maxWidth: 360, display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', marginBottom: 6 }}>
          사용자 이름
          <span style={{ fontWeight: 400, color: '#94a3b8', marginLeft: 4 }}>필수</span>
        </div>
        <TextField
          value={value}
          placeholder="username_123"
          error={hasError}
          onChange={(e) => setValue(e.target.value)}
        />
        <div style={{ display: 'flex', gap: 12, marginTop: 10, flexWrap: 'wrap' }}>
          {[
            { key: 'length', label: '3자 이상' },
            { key: 'noSpace', label: '공백 없음' },
            { key: 'alphaNum', label: '영문/숫자/한글만' },
          ].map(({ key, label }) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <RuleIcon state={rules[key]} />
              <span style={{
                fontSize: 12,
                color: rules[key] === 'valid' ? '#10b981' : rules[key] === 'invalid' ? '#ef4444' : '#94a3b8',
              }}>
                {label}
              </span>
            </div>
          ))}
        </div>
        {allValid && (
          <div style={{
            marginTop: 10, padding: '8px 12px', borderRadius: 8,
            background: '#f0fdf4', border: '1px solid #bbf7d0',
            fontSize: 12, color: '#16a34a', fontWeight: 600,
          }}>
            사용 가능한 이름입니다
          </div>
        )}
      </div>
      <div style={{ fontSize: 11, color: '#94a3b8' }}>
        Radix UI 실시간 유효성 — uncontrolled → controlled 전환 + 즉각 피드백
      </div>
    </div>
  )
}

export const Radix_실시간_유효성_검사: Story = {
  name: 'Radix UI - 실시간 유효성 검사 패턴',
  render: () => <RadixLiveValidationDemo />,
}

/* --------------------------------------------------------------------------
   MUI 벤치마크: 헬퍼 텍스트 상태 패턴
   MUI의 FormHelperText — hint / success / warning / error 4가지 상태
   각 상태가 명확한 색상과 아이콘으로 사용자에게 피드백을 제공
-------------------------------------------------------------------------- */
type HelperState = 'hint' | 'success' | 'warning' | 'error'

const helperConfig: Record<HelperState, { color: string; bg: string; border: string; icon: string; label: string }> = {
  hint:    { color: '#64748b', bg: '#f8fafc', border: '#e2e8f0', icon: 'ℹ', label: '힌트' },
  success: { color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0', icon: '✓', label: '성공' },
  warning: { color: '#d97706', bg: '#fffbeb', border: '#fde68a', icon: '!', label: '경고' },
  error:   { color: '#dc2626', bg: '#fef2f2', border: '#fecaca', icon: '✕', label: '오류' },
}

const MUIHelperTextDemo = () => {
  const [activeState, setActiveState] = useState<HelperState>('hint')
  const cfg = helperConfig[activeState]

  const helperMessages: Record<HelperState, string> = {
    hint: '5-20자 영문, 숫자, 특수문자(_)를 사용할 수 있습니다.',
    success: '사용 가능한 이메일 주소입니다.',
    warning: '이미 다른 계정에서 사용 중인 이메일입니다.',
    error: '올바른 이메일 형식을 입력하세요. 예: user@domain.com',
  }

  const placeholders: Record<HelperState, string> = {
    hint: 'your@email.com',
    success: 'user@orbit-ui.com',
    warning: 'taken@domain.com',
    error: 'invalid-email',
  }

  return (
    <div style={{ maxWidth: 380, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 6 }}>
        {(Object.keys(helperConfig) as HelperState[]).map((state) => {
          const c = helperConfig[state]
          return (
            <button
              key={state}
              onClick={() => setActiveState(state)}
              style={{
                padding: '5px 12px', borderRadius: 7, fontSize: 12, fontWeight: 600,
                cursor: 'pointer', transition: 'all 0.15s',
                border: `1.5px solid ${activeState === state ? c.border : '#e2e8f0'}`,
                background: activeState === state ? c.bg : '#fff',
                color: activeState === state ? c.color : '#94a3b8',
              }}
            >
              {c.label}
            </button>
          )
        })}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <label style={{ fontSize: 13, fontWeight: 600, color: activeState === 'error' ? '#dc2626' : '#374151' }}>
          이메일
        </label>
        <TextField
          value={placeholders[activeState]}
          placeholder="your@email.com"
          error={activeState === 'error'}
          onChange={() => {}}
        />
        <div style={{
          display: 'flex', alignItems: 'flex-start', gap: 8, padding: '8px 12px',
          borderRadius: 8, background: cfg.bg, border: `1px solid ${cfg.border}`,
          fontSize: 12, color: cfg.color,
        }}>
          <span style={{
            width: 16, height: 16, borderRadius: '50%', background: cfg.color, color: '#fff',
            fontSize: 9, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, marginTop: 1,
          }}>
            {cfg.icon}
          </span>
          <span style={{ lineHeight: 1.5 }}>{helperMessages[activeState]}</span>
        </div>
      </div>
      <div style={{ fontSize: 11, color: '#94a3b8' }}>
        MUI FormHelperText 패턴 — hint / success / warning / error 4가지 상태
      </div>
    </div>
  )
}

export const MUI_헬퍼_텍스트_상태: Story = {
  name: 'MUI - 헬퍼 텍스트 상태 패턴 (hint/success/warning/error)',
  render: () => <MUIHelperTextDemo />,
}

/* --------------------------------------------------------------------------
   Radix + MUI 조합: 비밀번호 강도 인디케이터
   Radix의 접근성 패턴(aria-describedby) + MUI의 시각적 강도 표시
   실시간 문자 조합 분석으로 보안 강도를 4단계로 시각화
-------------------------------------------------------------------------- */
const calcStrength = (pwd: string) => {
  let score = 0
  if (pwd.length >= 8) score++
  if (/[A-Z]/.test(pwd)) score++
  if (/[0-9]/.test(pwd)) score++
  if (/[^A-Za-z0-9]/.test(pwd)) score++
  return score
}

const strengthConfig = [
  { label: '매우 약함', color: '#ef4444' },
  { label: '약함', color: '#f59e0b' },
  { label: '보통', color: '#3b82f6' },
  { label: '강함', color: '#10b981' },
  { label: '매우 강함', color: '#059669' },
]

const PasswordStrengthDemo = () => {
  const [pwd, setPwd] = useState('')
  const [show, setShow] = useState(false)
  const strength = calcStrength(pwd)
  const cfg = strengthConfig[strength] ?? strengthConfig[0]

  const checks = [
    { label: '8자 이상', ok: pwd.length >= 8 },
    { label: '대문자 포함', ok: /[A-Z]/.test(pwd) },
    { label: '숫자 포함', ok: /[0-9]/.test(pwd) },
    { label: '특수문자 포함', ok: /[^A-Za-z0-9]/.test(pwd) },
  ]

  return (
    <div style={{ maxWidth: 360, display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <label
          htmlFor="pwd-field"
          style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}
        >
          비밀번호
        </label>
        <div style={{ position: 'relative' }}>
          <TextField
            id="pwd-field"
            value={pwd}
            placeholder="8자 이상 입력"
            aria-describedby="pwd-strength-desc"
            onChange={(e) => setPwd(e.target.value)}
          />
          <button
            onClick={() => setShow((v) => !v)}
            style={{
              position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: 11, color: '#94a3b8', fontWeight: 600,
            }}
          >
            {show ? '숨기기' : '보기'}
          </button>
        </div>
      </div>

      {pwd.length > 0 && (
        <>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span id="pwd-strength-desc" style={{ fontSize: 12, color: '#64748b' }}>강도</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: cfg.color }}>{cfg.label}</span>
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    flex: 1, height: 5, borderRadius: 3,
                    background: i < strength ? cfg.color : '#e2e8f0',
                    transition: 'background 0.2s',
                  }}
                />
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {checks.map(({ label, ok }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ fontSize: 12, color: ok ? '#10b981' : '#cbd5e1' }}>
                  {ok ? '✓' : '○'}
                </span>
                <span style={{ fontSize: 12, color: ok ? '#10b981' : '#94a3b8' }}>{label}</span>
              </div>
            ))}
          </div>
        </>
      )}
      <div style={{ fontSize: 11, color: '#94a3b8' }}>
        Radix aria-describedby + MUI 시각적 강도 표시 패턴
      </div>
    </div>
  )
}

export const Radix_MUI_비밀번호_강도: Story = {
  name: 'Radix + MUI - 비밀번호 강도 인디케이터',
  render: () => <PasswordStrengthDemo />,
}

/* --------------------------------------------------------------------------
   Arco Design 벤치마크: 폼 실시간 검증 그룹
   Arco Design Form 패턴 — 여러 입력 필드를 그룹화하고 실시간 검증 메시지를
   각 필드 아래에 표시하는 인라인 피드백 패턴.
-------------------------------------------------------------------------- */
const FIELD_RULES: Record<string, (v: string) => string | null> = {
  username: (v) => {
    if (!v) return '사용자 이름을 입력해 주세요.'
    if (v.length < 3) return '3자 이상이어야 합니다.'
    if (!/^[a-z0-9_]+$/.test(v)) return '영문 소문자, 숫자, 언더스코어만 허용됩니다.'
    return null
  },
  email: (v) => {
    if (!v) return '이메일을 입력해 주세요.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return '올바른 이메일 형식이 아닙니다.'
    return null
  },
  phone: (v) => {
    if (!v) return null
    if (!/^01[0-9]-\d{3,4}-\d{4}$/.test(v)) return '010-0000-0000 형식으로 입력해 주세요.'
    return null
  },
}

function ArcoFormValidationRender() {
  const [values, setValues] = useState({ username: '', email: '', phone: '' })
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [submitted, setSubmitted] = useState(false)

  const errors = Object.fromEntries(
    Object.entries(FIELD_RULES).map(([k, rule]) => [k, rule(values[k as keyof typeof values])])
  )
  const isValid = Object.values(errors).every((e) => e === null)

  const handleSubmit = () => {
    setTouched({ username: true, email: true, phone: true })
    if (isValid) setSubmitted(true)
  }

  if (submitted) {
    return (
      <div style={{ maxWidth: 360, textAlign: 'center', padding: '32px' }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>✓</div>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#10b981' }}>등록 완료!</div>
        <button
          onClick={() => { setSubmitted(false); setValues({ username: '', email: '', phone: '' }); setTouched({}) }}
          style={{ marginTop: 16, padding: '8px 20px', borderRadius: 8, border: '1.5px solid #e2e8f0', background: '#fff', cursor: 'pointer', fontSize: 13 }}
        >
          다시 시도
        </button>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, width: 360 }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a' }}>회원 정보 등록</div>
        <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>Arco Design Form 실시간 검증 패턴</div>
      </div>

      {[
        { key: 'username', label: '사용자 이름', placeholder: 'orbit_user123', required: true },
        { key: 'email', label: '이메일', placeholder: 'hello@orbit.dev', required: true },
        { key: 'phone', label: '전화번호', placeholder: '010-1234-5678', required: false },
      ].map(({ key, label, placeholder, required }) => {
        const err = touched[key] ? errors[key] : null
        const val = values[key as keyof typeof values]
        const ok = touched[key] && !errors[key] && val.length > 0

        return (
          <div key={key} style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 6 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#475569' }}>{label}</label>
              {required && <span style={{ fontSize: 10, color: '#ef4444' }}>*</span>}
              {ok && <span style={{ fontSize: 11, color: '#10b981', marginLeft: 'auto' }}>✓</span>}
            </div>
            <TextField
              value={val}
              placeholder={placeholder}
              error={!!err}
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                setValues((prev) => ({ ...prev, [key]: e.target.value }))
              }
              onBlur={() => setTouched((prev) => ({ ...prev, [key]: true }))}
            />
            {err && (
              <div style={{ fontSize: 11, color: '#ef4444', marginTop: 4 }}>{err}</div>
            )}
          </div>
        )
      })}

      <button
        onClick={handleSubmit}
        style={{
          padding: '12px', borderRadius: 8, border: 'none',
          background: '#6366f1', color: '#fff',
          fontSize: 14, fontWeight: 700, cursor: 'pointer',
          marginTop: 4,
        }}
      >
        등록하기
      </button>
    </div>
  )
}

export const Arco_폼_실시간_검증: Story = {
  name: 'Arco Design - 폼 실시간 검증 그룹',
  parameters: {
    docs: {
      description: {
        story:
          'Arco Design Form 패턴. onBlur 시 각 필드별 검증 실행, 인라인 에러 메시지, 전체 유효 시 제출 허용. required 표시, 성공 체크마크 포함.',
      },
    },
  },
  render: () => <ArcoFormValidationRender />,
}

/* --------------------------------------------------------------------------
   shadcn/ui 벤치마크: OTP 인증 코드 입력
   shadcn/ui의 InputOTP 패턴 — 6자리 인증 코드를 독립 셀로 분리해
   자동 포커스 이동 + Backspace 핸들링을 구현한 패턴.
-------------------------------------------------------------------------- */
function ShadcnOTPRender() {
  const OTP_LENGTH = 6
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(''))
  const [verified, setVerified] = useState<'idle' | 'success' | 'error'>('idle')

  const CORRECT = '123456'

  const handleDigit = (index: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(-1)
    const next = [...digits]
    next[index] = digit
    setDigits(next)

    if (digit && index < OTP_LENGTH - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement
      nextInput?.focus()
    }

    if (index === OTP_LENGTH - 1 && digit) {
      const code = [...next.slice(0, -1), digit].join('')
      if (code.length === OTP_LENGTH) {
        setVerified(code === CORRECT ? 'success' : 'error')
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      const prev = document.getElementById(`otp-${index - 1}`) as HTMLInputElement
      prev?.focus()
    }
  }

  const reset = () => { setDigits(Array(OTP_LENGTH).fill('')); setVerified('idle') }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, padding: '32px', maxWidth: 360 }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>2단계 인증</div>
        <div style={{ fontSize: 12, color: '#94a3b8' }}>인증 앱의 6자리 코드를 입력하세요 (힌트: 123456)</div>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        {digits.map((digit, i) => (
          <div key={i}>
            {i === 3 && (
              <span style={{ fontSize: 18, color: '#cbd5e1', display: 'flex', alignItems: 'center', marginRight: -4, height: '100%', lineHeight: '48px' }}>—</span>
            )}
            <input
              id={`otp-${i}`}
              value={digit}
              onChange={(e) => handleDigit(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              maxLength={1}
              inputMode="numeric"
              aria-label={`인증 코드 ${i + 1}번째 자리`}
              style={{
                width: 44, height: 48,
                borderRadius: 10,
                border: `2px solid ${verified === 'error' ? '#fca5a5' : verified === 'success' ? '#6ee7b7' : digit ? '#6366f1' : '#e2e8f0'}`,
                background: verified === 'error' ? '#fff7f7' : verified === 'success' ? '#f0fdf4' : '#fff',
                textAlign: 'center',
                fontSize: 20, fontWeight: 700,
                color: '#0f172a',
                outline: 'none',
                transition: 'border-color 0.15s',
                fontFamily: 'monospace',
              }}
            />
          </div>
        ))}
      </div>

      {verified === 'success' && (
        <div style={{ fontSize: 13, color: '#10b981', fontWeight: 700 }}>✓ 인증 성공!</div>
      )}
      {verified === 'error' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ fontSize: 13, color: '#ef4444', fontWeight: 600 }}>코드가 올바르지 않습니다.</div>
          <button
            onClick={reset}
            style={{ fontSize: 12, color: '#6366f1', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
          >
            다시 시도
          </button>
        </div>
      )}
      <div style={{ fontSize: 11, color: '#94a3b8' }}>shadcn/ui InputOTP 패턴 — 자동 포커스 이동 + Backspace 핸들링</div>
    </div>
  )
}

export const shadcn_OTP_인증_입력: Story = {
  name: 'shadcn/ui - OTP 인증 코드 입력',
  parameters: {
    docs: {
      description: {
        story:
          'shadcn/ui InputOTP 패턴. 6자리 코드를 개별 셀로 분리, 숫자 입력 시 자동으로 다음 셀로 포커스 이동, Backspace 시 이전 셀로 이동. 정답(123456)과 비교해 성공/실패 상태 표시.',
      },
    },
  },
  render: () => <ShadcnOTPRender />,
}

/* --------------------------------------------------------------------------
   Arco Design + shadcn/ui 벤치마크: 자동저장 인라인 편집 필드
   shadcn/ui의 editable content 패턴 + Arco Design의 자동저장 피드백 패턴.
   debounce 없이 blur 시 저장하고 "저장됨" / "저장 중..." 상태를 표시합니다.
-------------------------------------------------------------------------- */
const INLINE_FIELDS = [
  { id: 'title', label: '프로젝트 이름', value: 'Orbit UI Design System', multiline: false },
  { id: 'slug', label: 'URL 슬러그', value: 'orbit-ui-ds', multiline: false },
  { id: 'desc', label: '설명', value: 'React 기반 Figma-first 디자인 시스템', multiline: false },
]

function ArcoShadcnAutoSaveRender() {
  const [fields, setFields] = useState(INLINE_FIELDS)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [localVal, setLocalVal] = useState('')
  const [saveStates, setSaveStates] = useState<Record<string, 'saved' | 'saving' | 'idle'>>({})

  const startEdit = (id: string, currentVal: string) => {
    setEditingId(id)
    setLocalVal(currentVal)
  }

  const commitSave = (id: string) => {
    setSaveStates((prev) => ({ ...prev, [id]: 'saving' }))
    setFields((prev) => prev.map((f) => f.id === id ? { ...f, value: localVal } : f))
    setEditingId(null)
    setTimeout(() => {
      setSaveStates((prev) => ({ ...prev, [id]: 'saved' }))
      setTimeout(() => setSaveStates((prev) => ({ ...prev, [id]: 'idle' })), 2000)
    }, 600)
  }

  const cancelEdit = () => { setEditingId(null) }

  return (
    <div style={{ maxWidth: 400 }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>프로젝트 설정</div>
        <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>
          필드를 클릭해 인라인 편집 (Arco + shadcn 자동저장 패턴)
        </div>
      </div>

      <div style={{ borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        {fields.map((field, i) => {
          const isEditing = editingId === field.id
          const saveState = saveStates[field.id] ?? 'idle'

          return (
            <div
              key={field.id}
              style={{
                padding: '14px 16px',
                borderBottom: i < fields.length - 1 ? '1px solid #f1f5f9' : 'none',
                background: isEditing ? '#f5f3ff' : '#fff',
                transition: 'background 0.15s',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {field.label}
                </label>
                {saveState === 'saving' && (
                  <span style={{ fontSize: 10, color: '#94a3b8' }}>저장 중...</span>
                )}
                {saveState === 'saved' && (
                  <span style={{ fontSize: 10, color: '#10b981', fontWeight: 600 }}>✓ 저장됨</span>
                )}
              </div>

              {isEditing ? (
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <TextField
                    value={localVal}
                    placeholder={field.value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setLocalVal(e.target.value)}
                    onKeyDown={(e: React.KeyboardEvent) => {
                      if (e.key === 'Enter') commitSave(field.id)
                      if (e.key === 'Escape') cancelEdit()
                    }}
                  />
                  <button
                    onClick={() => commitSave(field.id)}
                    style={{ padding: '4px 10px', borderRadius: 6, border: 'none', background: '#6366f1', color: '#fff', fontSize: 11, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}
                  >
                    저장
                  </button>
                  <button
                    onClick={cancelEdit}
                    style={{ padding: '4px 8px', borderRadius: 6, border: '1px solid #e2e8f0', background: '#fff', color: '#64748b', fontSize: 11, cursor: 'pointer' }}
                  >
                    취소
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => startEdit(field.id, field.value)}
                  style={{
                    display: 'block', width: '100%', textAlign: 'left',
                    background: 'none', border: 'none', cursor: 'pointer',
                    padding: '4px 0',
                    fontSize: 13, color: '#1e293b', fontWeight: 500,
                  }}
                >
                  {field.value || <span style={{ color: '#cbd5e1' }}>클릭해 편집...</span>}
                </button>
              )}
            </div>
          )
        })}
      </div>
      <div style={{ marginTop: 10, fontSize: 11, color: '#94a3b8' }}>
        Arco + shadcn 자동저장 패턴 — blur/Enter 저장, Esc 취소, 600ms 저장 피드백
      </div>
    </div>
  )
}

export const Arco_shadcn_자동저장_필드: Story = {
  name: 'Arco + shadcn/ui - 인라인 자동저장 편집 필드',
  parameters: {
    docs: {
      description: {
        story:
          'Arco Design 자동저장 피드백 + shadcn/ui 인라인 편집 패턴. 클릭 시 편집 모드 전환, Enter/blur로 저장, Esc로 취소. 저장 중/완료 상태를 600ms 시뮬레이션으로 표시합니다.',
      },
    },
  },
  render: () => <ArcoShadcnAutoSaveRender />,
}
