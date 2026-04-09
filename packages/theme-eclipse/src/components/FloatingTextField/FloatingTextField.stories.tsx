import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { useState } from 'react'

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
