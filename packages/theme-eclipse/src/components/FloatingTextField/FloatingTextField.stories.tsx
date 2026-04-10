import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { FloatingTextField } from './FloatingTextField'

const meta = {
  title: 'eclipse/Inputs/Text Fields/FloatingTextField',
  component: FloatingTextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    placeholder: '이메일을 입력하세요',
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
      description: '라벨로 표시될 플레이스홀더 텍스트',
    },
    error: {
      control: 'boolean',
      description: '에러 상태',
    },
  },
} satisfies Meta<typeof FloatingTextField>

export default meta
type Story = StoryObj<typeof meta>

export const 기본: Story = {
  parameters: {
    controls: {
      exclude: ['theme', 'className', 'style', 'type'],
    },
  },
  render: (args) => <FloatingTextField {...args} style={{ width: '300px' }} />,
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
      <FloatingTextField
        value={value}
        placeholder={placeholder}
        error={error}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{ width: '300px' }}
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
        width: '1000px',
      }}
    >
      <div>
        <h4 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 'bold' }}>State</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Enabled</p>
            <FloatingTextField placeholder="이메일을 입력하세요" style={{ width: '300px' }} />
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Focused</p>
            <FocusedExample placeholder="이메일을 입력하세요" />
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Disabled</p>
            <FloatingTextField
              placeholder="이메일을 입력하세요"
              disabled
              style={{ width: '300px' }}
            />
          </div>
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 'bold' }}>Populated</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Empty</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <FloatingTextField placeholder="이메일을 입력하세요" style={{ width: '300px' }} />
              <FocusedExample placeholder="이메일을 입력하세요" />
              <FloatingTextField
                placeholder="이메일을 입력하세요"
                disabled
                style={{ width: '300px' }}
              />
            </div>
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Populated</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <FloatingTextField
                value="user@example.com"
                placeholder="이메일을 입력하세요"
                style={{ width: '300px' }}
              />
              <FocusedExample value="user@example.com" placeholder="이메일을 입력하세요" />
              <FloatingTextField
                value="user@example.com"
                placeholder="이메일을 입력하세요"
                disabled
                style={{ width: '300px' }}
              />
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
        width: '1000px',
      }}
    >
      <div>
        <h4 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 'bold' }}>Error: false</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Empty</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <FloatingTextField
                placeholder="이메일을 입력하세요"
                error={false}
                style={{ width: '300px' }}
              />
              <FocusedExample placeholder="이메일을 입력하세요" error={false} />
              <FloatingTextField
                placeholder="이메일을 입력하세요"
                error={false}
                disabled
                style={{ width: '300px' }}
              />
            </div>
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Populated</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <FloatingTextField
                value="user@example.com"
                placeholder="이메일을 입력하세요"
                error={false}
                style={{ width: '300px' }}
              />
              <FocusedExample
                value="user@example.com"
                placeholder="이메일을 입력하세요"
                error={false}
              />
              <FloatingTextField
                value="user@example.com"
                placeholder="이메일을 입력하세요"
                error={false}
                disabled
                style={{ width: '300px' }}
              />
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
              <FloatingTextField
                placeholder="이메일을 입력하세요"
                error={true}
                style={{ width: '300px' }}
              />
              <FocusedExample placeholder="이메일을 입력하세요" error={true} />
              <FloatingTextField
                placeholder="이메일을 입력하세요"
                error={true}
                disabled
                style={{ width: '300px' }}
              />
            </div>
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Populated</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <FloatingTextField
                value="user@example.com"
                placeholder="이메일을 입력하세요"
                error={true}
                style={{ width: '300px' }}
              />
              <FocusedExample
                value="user@example.com"
                placeholder="이메일을 입력하세요"
                error={true}
              />
              <FloatingTextField
                value="user@example.com"
                placeholder="이메일을 입력하세요"
                error={true}
                disabled
                style={{ width: '300px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const ClearButton: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>
          ClearButton은 포커스되고 값이 있을 때만 표시됩니다 (onFocused)
        </p>
        <FloatingTextField placeholder="이메일을 입력하세요" style={{ width: '300px' }} />
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>
          값이 있는 경우 (포커스 필요)
        </p>
        <FloatingTextField
          value="user@example.com"
          placeholder="이메일을 입력하세요"
          style={{ width: '300px' }}
        />
      </div>
    </div>
  ),
}

export const 디자인QA = {
  args: {
    placeholder: 'Enter text',
    disabled: false,
    error: false,
    width: '300px',
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  render: ({ width, ...args }: any) => <FloatingTextField {...args} style={{ width }} />,
}

// Chakra FormControl 패턴: 에러 + 헬퍼 텍스트 조합
const FormControlExample = ({
  label,
  helperText,
  errorText,
  isError,
  value,
  onChange,
}: {
  label: string
  helperText?: string
  errorText?: string
  isError: boolean
  value: string
  onChange: (v: string) => void
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '320px' }}>
    <FloatingTextField
      placeholder={label}
      value={value}
      error={isError}
      onChange={(e) => onChange(e.target.value)}
      style={{ width: '100%' }}
    />
    {isError && errorText ? (
      <span style={{ fontSize: '12px', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px' }}>
        <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444', color: '#fff', fontSize: '9px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>!</span>
        {errorText}
      </span>
    ) : helperText ? (
      <span style={{ fontSize: '12px', color: '#64748b' }}>{helperText}</span>
    ) : null}
  </div>
)

// Chakra FormControl 패턴: 실시간 유효성 검사 데모
const ValidationDemoRender = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [touched, setTouched] = useState({ email: false, password: false })

  const emailError = touched.email && email.length > 0 && !email.includes('@')
  const emailEmpty = touched.email && email.length === 0
  const passwordError = touched.password && password.length > 0 && password.length < 8
  const passwordEmpty = touched.password && password.length === 0

  const isEmailError = emailError || emailEmpty
  const isPasswordError = passwordError || passwordEmpty

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '400px', padding: '32px', background: '#fff', borderRadius: '16px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
      <div>
        <h3 style={{ margin: '0 0 4px', fontSize: '20px', fontWeight: '700', color: '#0f172a' }}>실시간 유효성 검사</h3>
        <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>Chakra UI FormControl 패턴 적용</p>
      </div>
      <FormControlExample
        label="이메일 주소"
        helperText="유효한 이메일 주소를 입력하세요"
        errorText={emailEmpty ? '이메일을 입력해주세요' : '올바른 이메일 형식이 아닙니다'}
        isError={isEmailError}
        value={email}
        onChange={(v) => {
          setEmail(v)
          setTouched((prev) => ({ ...prev, email: true }))
        }}
      />
      <FormControlExample
        label="비밀번호"
        helperText="8자 이상의 비밀번호를 입력하세요"
        errorText={passwordEmpty ? '비밀번호를 입력해주세요' : '비밀번호는 8자 이상이어야 합니다'}
        isError={isPasswordError}
        value={password}
        onChange={(v) => {
          setPassword(v)
          setTouched((prev) => ({ ...prev, password: true }))
        }}
      />
      <div style={{
        padding: '10px 14px',
        borderRadius: '8px',
        background: isEmailError || isPasswordError ? 'rgba(239,68,68,0.05)' : 'rgba(16,185,129,0.05)',
        border: `1px solid ${isEmailError || isPasswordError ? 'rgba(239,68,68,0.2)' : 'rgba(16,185,129,0.2)'}`,
        fontSize: '12px',
        color: isEmailError || isPasswordError ? '#ef4444' : '#10b981',
        fontWeight: 500,
      }}>
        {isEmailError || isPasswordError ? '입력값을 다시 확인하세요' : email && password ? '입력이 유효합니다' : '모든 필드를 입력해주세요'}
      </div>
    </div>
  )
}

export const 실시간유효성검사: Story = {
  render: () => <ValidationDemoRender />,
}

// 로그인 폼 레이아웃 (Chakra 필드 그룹 패턴)
const LoginFormRender = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: '20px',
      width: '420px', padding: '40px', background: '#fff',
      borderRadius: '20px', boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '8px' }}>
        <div style={{
          width: '40px', height: '40px', borderRadius: '12px',
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontSize: '18px', fontWeight: '800', marginBottom: '12px',
        }}>O</div>
        <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.02em' }}>로그인</h2>
        <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>계정에 로그인하여 계속하세요</p>
      </div>

      {/* Email field */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <FloatingTextField
          placeholder="이메일 주소"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%' }}
        />
        <span style={{ fontSize: '11px', color: '#94a3b8' }}>가입 시 사용한 이메일을 입력하세요</span>
      </div>

      {/* Password field */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <FloatingTextField
          placeholder="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', color: '#94a3b8' }}>8자 이상</span>
          <a href="#" style={{ fontSize: '12px', color: '#6366f1', textDecoration: 'none', fontWeight: 500 }}>비밀번호 찾기</a>
        </div>
      </div>

      {/* Submit */}
      <button style={{
        padding: '14px', borderRadius: '12px', border: 'none', cursor: 'pointer',
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        color: '#fff', fontSize: '15px', fontWeight: '700',
        boxShadow: '0 4px 14px rgba(99,102,241,0.4)',
        transition: 'opacity 0.2s',
      }}>
        로그인
      </button>

      <p style={{ margin: 0, textAlign: 'center', fontSize: '13px', color: '#64748b' }}>
        계정이 없으신가요?{' '}
        <a href="#" style={{ color: '#6366f1', textDecoration: 'none', fontWeight: 600 }}>회원가입</a>
      </p>
    </div>
  )
}

export const 로그인폼: Story = {
  render: () => <LoginFormRender />,
}

/* --------------------------------------------------------------------------
   Tailwind UI 벤치마크: 결제 정보 입력 폼
   Tailwind UI checkout form 패턴 — 카드 번호/만료일/CVV 인라인 그룹
-------------------------------------------------------------------------- */
function PaymentFormRender() {
  const [cardNum, setCardNum] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [name, setName] = useState('')

  const formatCard = (val: string) =>
    val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 4)
    if (digits.length >= 2) return `${digits.slice(0, 2)} / ${digits.slice(2)}`
    return digits
  }

  const isCardValid = cardNum.replace(/\s/g, '').length === 16
  const isExpiryValid = expiry.replace(/\s\/\s/g, '').length === 4
  const isCvvValid = cvv.length === 3
  const isNameValid = name.length >= 2
  const canSubmit = isCardValid && isExpiryValid && isCvvValid && isNameValid

  return (
    <div style={{ width: 360, padding: '28px', background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
      <div style={{ fontSize: 16, fontWeight: 700, color: '#1e293b', marginBottom: 4 }}>결제 정보</div>

      <FloatingTextField
        placeholder="카드 소유자 이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={name.length > 0 && !isNameValid}
      />

      <FloatingTextField
        placeholder="카드 번호"
        value={cardNum}
        onChange={(e) => setCardNum(formatCard(e.target.value))}
        error={cardNum.length > 0 && !isCardValid}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <FloatingTextField
          placeholder="MM / YY"
          value={expiry}
          onChange={(e) => setExpiry(formatExpiry(e.target.value))}
          error={expiry.length > 0 && !isExpiryValid}
        />
        <FloatingTextField
          placeholder="CVV"
          value={cvv}
          onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
          error={cvv.length > 0 && !isCvvValid}
        />
      </div>

      <button
        disabled={!canSubmit}
        style={{
          padding: '13px', borderRadius: '10px', border: 'none',
          background: canSubmit ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : '#e2e8f0',
          color: canSubmit ? '#fff' : '#94a3b8',
          fontSize: '14px', fontWeight: '700', cursor: canSubmit ? 'pointer' : 'not-allowed',
          transition: 'all 0.2s',
        }}
      >
        {canSubmit ? '결제하기' : '정보를 입력해 주세요'}
      </button>
      <div style={{ fontSize: 11, color: '#94a3b8', textAlign: 'center' }}>
        Tailwind UI checkout form 패턴 — 카드 번호 포맷팅 + 유효성 검사
      </div>
    </div>
  )
}

export const Tailwind_결제_정보_폼: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Tailwind UI checkout form 패턴. 카드 번호 자동 포맷팅(4자리 공백 구분), MM/YY 마스킹, CVV 3자리 제한. 모든 필드가 유효할 때만 제출 버튼이 활성화됩니다.',
      },
    },
  },
  render: () => <PaymentFormRender />,
}

/* --------------------------------------------------------------------------
   Mantine 벤치마크: 문자 수 카운터 + 힌트 텍스트
   Mantine TextInput rightSection + description 패턴 — 실시간 글자 수 표시
-------------------------------------------------------------------------- */
function CharCounterRender() {
  const [bio, setBio] = useState('')
  const [username, setUsername] = useState('')
  const [website, setWebsite] = useState('')

  const MAX_BIO = 160
  const MAX_USERNAME = 20

  const bioRemaining = MAX_BIO - bio.length
  const usernameValid = /^[a-z0-9_]{3,20}$/.test(username) || username.length === 0
  const websiteValid = website.length === 0 || website.startsWith('https://')

  return (
    <div style={{ width: 380, padding: '24px', background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ fontSize: 15, fontWeight: 700, color: '#1e293b' }}>프로필 편집</div>

      {/* Username with counter */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <FloatingTextField
          placeholder="사용자 이름 (영문, 숫자, _)"
          value={username}
          onChange={(e) => setUsername(e.target.value.slice(0, MAX_USERNAME))}
          error={!usernameValid}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 11, color: usernameValid ? '#94a3b8' : '#ef4444' }}>
            {!usernameValid ? '3~20자, 영문/숫자/_ 만 허용' : '고유한 URL로 사용됩니다'}
          </span>
          <span style={{ fontSize: 11, color: username.length >= MAX_USERNAME ? '#ef4444' : '#94a3b8' }}>
            {username.length}/{MAX_USERNAME}
          </span>
        </div>
      </div>

      {/* Website */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <FloatingTextField
          placeholder="웹사이트 URL"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          error={!websiteValid}
        />
        {!websiteValid && (
          <span style={{ fontSize: 11, color: '#ef4444' }}>https:// 로 시작해야 합니다</span>
        )}
      </div>

      {/* Bio with char counter */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ position: 'relative' }}>
          <textarea
            placeholder="자기소개"
            value={bio}
            onChange={(e) => setBio(e.target.value.slice(0, MAX_BIO))}
            rows={3}
            style={{
              width: '100%', padding: '14px 16px', borderRadius: '10px', resize: 'none',
              border: `1.5px solid ${bioRemaining < 0 ? '#ef4444' : '#e2e8f0'}`,
              fontSize: '14px', color: '#1e293b', boxSizing: 'border-box', outline: 'none',
              fontFamily: 'inherit', lineHeight: 1.5,
            }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 11, color: '#94a3b8' }}>검색 프로필에 노출됩니다</span>
          <span style={{ fontSize: 11, color: bioRemaining <= 20 ? (bioRemaining < 0 ? '#ef4444' : '#f59e0b') : '#94a3b8', fontWeight: bioRemaining <= 20 ? 700 : 400 }}>
            {bioRemaining}자 남음
          </span>
        </div>
      </div>
      <div style={{ fontSize: 11, color: '#94a3b8', textAlign: 'center' }}>
        Mantine TextInput description + rightSection 패턴 — 실시간 글자 수 카운터
      </div>
    </div>
  )
}

export const Mantine_글자수_카운터: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Mantine TextInput의 description + rightSection 패턴 응용. 사용자 이름 포맷 검증, URL 형식 검사, 자기소개 글자 수 카운터를 조합한 프로필 편집 폼입니다.',
      },
    },
  },
  render: () => <CharCounterRender />,
}

/* --------------------------------------------------------------------------
   Tailwind UI + Mantine 벤치마크: 주소 입력 멀티 스텝 폼
   Tailwind UI의 단계별 주소 입력 + Mantine autocomplete hint 조합
-------------------------------------------------------------------------- */
function AddressFormRender() {
  const [step, setStep] = useState<0 | 1 | 2>(0)
  const [addr, setAddr] = useState({ zipcode: '', city: '', street: '', detail: '' })

  const update = (field: keyof typeof addr) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setAddr((prev) => ({ ...prev, [field]: e.target.value }))

  const STEPS = [
    { label: '우편번호', field: 'zipcode' as const, placeholder: '우편번호 (5자리)', hint: '우편번호 검색 후 자동 입력됩니다', type: 'text' },
    { label: '도시 / 구', field: 'city' as const, placeholder: '서울시 강남구', hint: '광역시 및 구/군 단위 입력', type: 'text' },
    { label: '도로명 주소', field: 'street' as const, placeholder: '테헤란로 152', hint: '건물명 또는 번지 포함', type: 'text' },
  ]

  const canNext = step === 0 ? /^\d{5}$/.test(addr.zipcode) : step === 1 ? addr.city.length >= 2 : addr.street.length >= 2

  return (
    <div style={{ width: 360, padding: '24px', background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: 20, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
      <div style={{ fontSize: 15, fontWeight: 700, color: '#1e293b' }}>주소 입력</div>

      {/* Progress */}
      <div style={{ display: 'flex', gap: 6 }}>
        {STEPS.map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1, height: 4, borderRadius: 2,
              background: i <= step ? '#6366f1' : '#e2e8f0',
              transition: 'background 0.2s',
            }}
          />
        ))}
      </div>

      {step < 3 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#6366f1' }}>
            단계 {step + 1}/3 — {STEPS[step].label}
          </div>
          <FloatingTextField
            key={step}
            placeholder={STEPS[step].placeholder}
            value={addr[STEPS[step].field]}
            onChange={update(STEPS[step].field)}
            error={addr[STEPS[step].field].length > 0 && !canNext}
          />
          <div style={{ fontSize: 11, color: '#94a3b8' }}>{STEPS[step].hint}</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
            {step > 0 && (
              <button
                onClick={() => setStep((s) => (s - 1) as 0 | 1 | 2)}
                style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#fff', color: '#374151', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}
              >
                이전
              </button>
            )}
            <button
              disabled={!canNext}
              onClick={() => { if (canNext) setStep((s) => (s + 1) as 0 | 1 | 2) }}
              style={{
                flex: 2, padding: '10px', borderRadius: '8px', border: 'none',
                background: canNext ? '#6366f1' : '#e2e8f0',
                color: canNext ? '#fff' : '#94a3b8',
                fontSize: '13px', fontWeight: 600, cursor: canNext ? 'pointer' : 'not-allowed',
                transition: 'all 0.15s',
              }}
            >
              다음
            </button>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <FloatingTextField
            placeholder="상세 주소 (선택)"
            value={addr.detail}
            onChange={update('detail')}
          />
          <div style={{ padding: '12px 14px', borderRadius: '8px', background: '#f8fafc', border: '1px solid #e2e8f0', fontSize: 12, color: '#374151', lineHeight: 1.7 }}>
            <div style={{ color: '#94a3b8', marginBottom: 4, fontSize: 11 }}>입력된 주소</div>
            <strong>{addr.zipcode}</strong> {addr.city} {addr.street} {addr.detail}
          </div>
          <button
            onClick={() => setStep(0)}
            style={{ padding: '10px', borderRadius: '8px', border: '1px solid #6366f1', background: '#fff', color: '#6366f1', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
          >
            다시 입력
          </button>
        </div>
      )}
      <div style={{ fontSize: 11, color: '#94a3b8', textAlign: 'center' }}>
        Tailwind UI 다단계 폼 + Mantine 힌트 텍스트 조합 패턴
      </div>
    </div>
  )
}

export const Tailwind_Mantine_주소_멀티스텝: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Tailwind UI 다단계 폼 + Mantine description hint 조합. 우편번호 → 도시 → 도로명 순서로 단계별 입력을 유도하며, 각 단계마다 유효성 검사와 힌트를 제공합니다.',
      },
    },
  },
  render: () => <AddressFormRender />,
}

/* --------------------------------------------------------------------------
   Radix UI — 접근성 강화 검색 필드
   aria-label, autocomplete, 실시간 결과 카운트
-------------------------------------------------------------------------- */
const SEARCH_ITEMS = ['Button', 'TextField', 'Modal', 'Dropdown', 'Carousel', 'Avatar', 'Checkbox', 'Switch', 'Slider', 'Tooltip']

const RadixSearchFieldDemo = () => {
  const [query, setQuery] = useState('')
  const results = SEARCH_ITEMS.filter((s) => s.toLowerCase().includes(query.toLowerCase()))
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 320 }}>
      <div role="search">
        <FloatingTextField
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="컴포넌트 검색..."
          aria-label="컴포넌트 검색"
          aria-autocomplete="list"
        />
      </div>
      {query && (
        <div style={{ fontSize: 12, color: '#64748b' }}>
          {results.length}개 결과
        </div>
      )}
      {query && results.length > 0 && (
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {results.map((r) => (
            <li key={r} style={{ padding: '8px 12px', borderRadius: 6, background: '#f8fafc', fontSize: 14, color: '#0f172a', cursor: 'pointer' }}>
              {r}
            </li>
          ))}
        </ul>
      )}
      {query && results.length === 0 && (
        <div style={{ fontSize: 13, color: '#94a3b8', textAlign: 'center', padding: '16px 0' }}>
          검색 결과가 없습니다
        </div>
      )}
      <p style={{ fontSize: 11, color: '#94a3b8' }}>Radix UI 접근성 패턴 — role, aria-* 속성 활용</p>
    </div>
  )
}

export const Radix_접근성_검색_필드: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Radix UI의 접근성 강화 패턴. aria-label, role="combobox", aria-expanded, autocomplete 속성을 활용한 시맨틱 검색 입력 필드. 입력 시 실시간으로 필터링 결과 개수를 표시합니다.',
      },
    },
  },
  render: () => <RadixSearchFieldDemo />,
}

/* --------------------------------------------------------------------------
   Chakra UI — 비밀번호 강도 측정 필드
   실시간 강도 측정 + 색상 피드백
-------------------------------------------------------------------------- */
const calcStrength = (pw: string): { score: number; label: string; color: string } => {
  let score = 0
  if (pw.length >= 8) score++
  if (/[A-Z]/.test(pw)) score++
  if (/[0-9]/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++
  const map = [
    { score: 0, label: '입력해주세요', color: '#e2e8f0' },
    { score: 1, label: '매우 약함', color: '#ef4444' },
    { score: 2, label: '약함', color: '#f59e0b' },
    { score: 3, label: '보통', color: '#3b82f6' },
    { score: 4, label: '강함', color: '#10b981' },
  ]
  return map[score]
}

const ChakraPasswordStrengthDemo = () => {
  const [pw, setPw] = useState('')
  const strength = calcStrength(pw)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: 320 }}>
      <FloatingTextField
        value={pw}
        onChange={(e) => setPw(e.target.value)}
        placeholder="비밀번호"
        error={pw.length > 0 && strength.score < 2}
      />
      <div style={{ display: 'flex', gap: 4 }}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= strength.score ? strength.color : '#e2e8f0', transition: 'background 0.3s' }} />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
        <span style={{ color: strength.color, fontWeight: 600 }}>{strength.label}</span>
        <span style={{ color: '#94a3b8' }}>{pw.length} / 32</span>
      </div>
      <div style={{ fontSize: 11, color: '#94a3b8' }}>
        영문 대문자, 숫자, 특수문자 포함 시 강도 증가
      </div>
      <p style={{ fontSize: 11, color: '#94a3b8' }}>Chakra UI 비밀번호 강도 측정 패턴</p>
    </div>
  )
}

export const Chakra_비밀번호_강도_측정: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Chakra UI의 PasswordInput + 강도 측정 패턴. 영문 대문자, 숫자, 특수문자 포함 여부에 따라 4단계 강도를 색상과 레이블로 즉시 피드백합니다.',
      },
    },
  },
  render: () => <ChakraPasswordStrengthDemo />,
}

/* --------------------------------------------------------------------------
   Radix + Chakra — OTP 입력 필드
   6자리 코드 분할 입력 UX 패턴
-------------------------------------------------------------------------- */
const OtpInputDemo = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const ref0 = React.useRef<HTMLInputElement>(null)
  const ref1 = React.useRef<HTMLInputElement>(null)
  const ref2 = React.useRef<HTMLInputElement>(null)
  const ref3 = React.useRef<HTMLInputElement>(null)
  const ref4 = React.useRef<HTMLInputElement>(null)
  const ref5 = React.useRef<HTMLInputElement>(null)
  const refs = [ref0, ref1, ref2, ref3, ref4, ref5]
  const handleChange = (i: number, val: string) => {
    const digit = val.replace(/\D/g, '').slice(-1)
    const next = [...otp]
    next[i] = digit
    setOtp(next)
    if (digit && i < 5) refs[i + 1].current?.focus()
  }
  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) refs[i - 1].current?.focus()
  }
  const isComplete = otp.every((d) => d !== '')
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center', width: 320 }}>
      <p style={{ fontSize: 14, fontWeight: 600, color: '#0f172a', margin: 0 }}>인증 코드 입력</p>
      <p style={{ fontSize: 13, color: '#64748b', margin: 0, textAlign: 'center' }}>이메일로 전송된 6자리 코드를 입력하세요</p>
      <div style={{ display: 'flex', gap: 8 }}>
        {otp.map((val, i) => (
          <input
            key={i}
            ref={refs[i]}
            value={val}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            maxLength={1}
            inputMode="numeric"
            style={{ width: 40, height: 48, borderRadius: 8, border: `2px solid ${val ? '#6366f1' : '#e2e8f0'}`, textAlign: 'center', fontSize: 20, fontWeight: 700, color: '#0f172a', outline: 'none', transition: 'border-color 0.2s' }}
          />
        ))}
      </div>
      {isComplete && (
        <div style={{ padding: '8px 20px', borderRadius: 8, background: '#dcfce7', color: '#15803d', fontSize: 13, fontWeight: 600 }}>
          인증 코드: {otp.join('')}
        </div>
      )}
      <p style={{ fontSize: 11, color: '#94a3b8' }}>Radix 포커스 관리 + Chakra 단순 Props — 자동 포커스 이동 OTP 입력</p>
    </div>
  )
}

export const Radix_Chakra_OTP_입력: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Radix UI 포커스 관리 + Chakra UI 단순 props 철학 조합. 6자리 OTP를 개별 입력 필드로 분리하여 자동 포커스 이동을 구현합니다.',
      },
    },
  },
  render: () => <OtpInputDemo />,
}

/* --------------------------------------------------------------------------
   shadcn/ui — 인라인 편집 필드
   클릭하여 편집 전환 + 저장/취소 패턴
-------------------------------------------------------------------------- */
const SHADCN_FIELDS = [
  { key: 'name', label: '프로젝트명', value: 'Orbit UI' },
  { key: 'slug', label: 'URL 슬러그', value: 'orbit-ui' },
  { key: 'desc', label: '설명', value: '다계층 React 디자인 시스템' },
]

function ShadcnInlineEditRender() {
  const [editing, setEditing] = useState<string | null>(null)
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(SHADCN_FIELDS.map((f) => [f.key, f.value]))
  )
  const [drafts, setDrafts] = useState<Record<string, string>>({})

  const startEdit = (key: string) => {
    setEditing(key)
    setDrafts((prev) => ({ ...prev, [key]: values[key] }))
  }
  const save = (key: string) => {
    setValues((prev) => ({ ...prev, [key]: drafts[key] ?? prev[key] }))
    setEditing(null)
  }
  const cancel = () => setEditing(null)

  return (
    <div style={{ width: 340, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>프로젝트 설정</div>
      {SHADCN_FIELDS.map((field) => (
        <div key={field.key}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#64748b', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{field.label}</div>
          {editing === field.key ? (
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
              <FloatingTextField
                placeholder={field.label}
                value={drafts[field.key] ?? ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDrafts((prev) => ({ ...prev, [field.key]: e.target.value }))
                }
                autoFocus
              />
              <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                <button onClick={() => save(field.key)} style={{ padding: '6px 12px', borderRadius: 6, border: 'none', background: '#6366f1', color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>저장</button>
                <button onClick={cancel} style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #e2e8f0', background: '#fff', fontSize: 12, color: '#64748b', cursor: 'pointer' }}>취소</button>
              </div>
            </div>
          ) : (
            <div
              onClick={() => startEdit(field.key)}
              style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid transparent', fontSize: 13, color: '#0f172a', cursor: 'text', transition: 'border-color 0.15s', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = '#e2e8f0'; (e.currentTarget as HTMLDivElement).style.background = '#f8fafc' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = 'transparent'; (e.currentTarget as HTMLDivElement).style.background = 'transparent' }}
            >
              <span>{values[field.key]}</span>
              <span style={{ fontSize: 11, color: '#94a3b8', opacity: 0 }} className="edit-hint">수정</span>
            </div>
          )}
        </div>
      ))}
      <div style={{ fontSize: 11, color: '#94a3b8' }}>shadcn/ui 인라인 편집 패턴 — 클릭하여 FloatingTextField로 전환</div>
    </div>
  )
}

export const shadcn_인라인_편집_필드: Story = {
  name: 'shadcn/ui — 인라인 편집 필드 (Click-to-edit)',
  parameters: {
    docs: {
      description: {
        story: 'shadcn/ui의 Editable 컴포넌트 패턴. 정적 텍스트를 클릭하면 FloatingTextField로 전환되고, 저장/취소로 확정합니다. Notion/Linear 인라인 편집 UX와 동일한 패턴.',
      },
    },
  },
  render: () => <ShadcnInlineEditRender />,
}

/* --------------------------------------------------------------------------
   Linear Design — 이슈 제목 + 설명 입력 폼
   미니멀 컴팩트 + 빠른 입력 패턴
-------------------------------------------------------------------------- */
const LINEAR_PRIORITIES = [
  { value: 'urgent', label: '긴급', color: '#ef4444' },
  { value: 'high', label: '높음', color: '#f59e0b' },
  { value: 'medium', label: '중간', color: '#6366f1' },
  { value: 'low', label: '낮음', color: '#94a3b8' },
]

function LinearIssueFormRender() {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [priority, setPriority] = useState('medium')
  const [submitted, setSubmitted] = useState(false)

  const submit = async () => {
    if (!title.trim()) return
    setSubmitted(true)
    await new Promise((r) => setTimeout(r, 800))
    setSubmitted(false)
    setTitle('')
    setDesc('')
    setPriority('medium')
  }

  const pr = LINEAR_PRIORITIES.find((p) => p.value === priority)!

  return (
    <div style={{ width: 400, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
        <div style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${pr.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: pr.color }} />
        </div>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>새 이슈</span>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 600, color: pr.color, border: `1px solid ${pr.color}30`, background: `${pr.color}10`, borderRadius: 6, padding: '3px 8px', cursor: 'pointer', outline: 'none' }}
        >
          {LINEAR_PRIORITIES.map((p) => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </select>
      </div>
      <FloatingTextField
        placeholder="이슈 제목..."
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
        onKeyDown={(e: React.KeyboardEvent) => { if (e.key === 'Enter') submit() }}
      />
      <FloatingTextField
        placeholder="설명 (선택 사항)..."
        value={desc}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDesc(e.target.value)}
      />
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', paddingTop: 4 }}>
        <button
          onClick={submit}
          disabled={!title.trim() || submitted}
          style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: title.trim() ? '#0f172a' : '#e2e8f0', color: title.trim() ? '#fff' : '#94a3b8', fontSize: 13, fontWeight: 600, cursor: title.trim() ? 'pointer' : 'not-allowed', transition: 'all 0.15s' }}
        >
          {submitted ? '저장 중...' : '이슈 생성'}
        </button>
        <span style={{ fontSize: 11, color: '#94a3b8' }}>Enter로 빠른 저장</span>
      </div>
      <div style={{ fontSize: 11, color: '#94a3b8' }}>Linear 이슈 입력 패턴 — 우선순위 선택 + 제목/설명 FloatingTextField</div>
    </div>
  )
}

export const Linear_이슈_생성_폼: Story = {
  name: 'Linear Design — 이슈 생성 폼 (컴팩트 입력)',
  parameters: {
    docs: {
      description: {
        story: 'Linear 이슈 생성 UI 패턴. 우선순위 컬러 선택기 + 제목 FloatingTextField + 설명 FloatingTextField + Enter 단축키 제출. Linear의 미니멀 컴팩트 입력 패턴 구현.',
      },
    },
  },
  render: () => <LinearIssueFormRender />,
}

/* --------------------------------------------------------------------------
   shadcn/ui + Linear — 검색 + 필터 복합 인풋
   커맨드 팔레트 스타일 입력 패턴
-------------------------------------------------------------------------- */
const CMD_ITEMS = [
  { id: 1, type: 'issue', label: 'ORB-241 Toggle onCheckedChange 타입 수정', status: 'in-progress' },
  { id: 2, type: 'component', label: 'FloatingTextField 스토리 추가', status: 'done' },
  { id: 3, type: 'issue', label: 'ORB-238 DataTable 정렬 로직 개선', status: 'todo' },
  { id: 4, type: 'doc', label: 'BenchmarkComparison.mdx Cycle 112 반영', status: 'done' },
  { id: 5, type: 'component', label: 'PageIndicator 신규 스토리 3종', status: 'in-progress' },
]

const STATUS_COLORS: Record<string, string> = { 'todo': '#94a3b8', 'in-progress': '#6366f1', 'done': '#10b981' }
const TYPE_ICONS: Record<string, string> = { issue: '#', component: '◻', doc: '▤' }

function ShadcnLinearSearchRender() {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)

  const results = query.trim()
    ? CMD_ITEMS.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()))
    : []

  return (
    <div style={{ width: 380, position: 'relative' }}>
      <FloatingTextField
        placeholder="이슈, 컴포넌트, 문서 검색..."
        value={query}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 150)}
      />
      {focused && query.trim() && (
        <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4, borderRadius: 10, border: '1px solid #e2e8f0', background: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.12)', zIndex: 10, overflow: 'hidden' }}>
          {results.length === 0 ? (
            <div style={{ padding: '16px', fontSize: 13, color: '#94a3b8', textAlign: 'center' }}>결과 없음</div>
          ) : (
            results.map((item) => (
              <div key={item.id} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '10px 14px', cursor: 'pointer', borderBottom: '1px solid #f1f5f9', transition: 'background 0.1s' }} onMouseEnter={(e) => (e.currentTarget.style.background = '#f8fafc')} onMouseLeave={(e) => (e.currentTarget.style.background = '#fff')}>
                <span style={{ fontSize: 14, color: '#94a3b8', fontFamily: 'monospace', flexShrink: 0 }}>{TYPE_ICONS[item.type]}</span>
                <span style={{ flex: 1, fontSize: 13, color: '#0f172a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.label}</span>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: STATUS_COLORS[item.status], flexShrink: 0 }} />
              </div>
            ))
          )}
          <div style={{ padding: '6px 14px', fontSize: 11, color: '#94a3b8', background: '#f8fafc', borderTop: '1px solid #f1f5f9' }}>
            {results.length}개 결과 · ↑↓ 탐색 · Enter 선택
          </div>
        </div>
      )}
      <div style={{ marginTop: results.length > 0 && focused ? 8 : 48, fontSize: 11, color: '#94a3b8' }}>shadcn/ui + Linear — 커맨드 팔레트 스타일 검색 FloatingTextField</div>
    </div>
  )
}

export const shadcn_Linear_커맨드_팔레트_검색: Story = {
  name: 'shadcn/ui + Linear — 커맨드 팔레트 스타일 검색',
  parameters: {
    docs: {
      description: {
        story: 'shadcn/ui Command + Linear 검색바 패턴 조합. FloatingTextField에 포커스 시 드롭다운 결과가 노출되고, 타입 아이콘과 상태 도트로 결과를 구분합니다. 커맨드 팔레트 UX.',
      },
    },
  },
  render: () => <ShadcnLinearSearchRender />,
}
