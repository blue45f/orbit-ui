import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { useState } from 'react'

import { PasswordField } from './PasswordField'

const meta = {
  title: 'eclipse/Inputs/Text Fields/PasswordField',
  component: PasswordField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    placeholder: 'Enter password',
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
} satisfies Meta<typeof PasswordField>

export default meta
type Story = StoryObj<typeof meta>

export const 기본: Story = {
  parameters: {
    controls: {
      exclude: ['theme', 'className', 'style'],
    },
  },
  render: (args) => <PasswordField {...args} />,
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
      <PasswordField
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
            <PasswordField placeholder="Enter password" />
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Focused</p>
            <FocusedExample placeholder="Enter password" />
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Disabled</p>
            <PasswordField placeholder="Enter password" disabled />
          </div>
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 'bold' }}>Populated</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Empty</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <PasswordField placeholder="Enter password" />
              <FocusedExample placeholder="Enter password" />
              <PasswordField placeholder="Enter password" disabled />
            </div>
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Populated</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <PasswordField value="password123" placeholder="Enter password" />
              <FocusedExample value="password123" placeholder="Enter password" />
              <PasswordField value="password123" placeholder="Enter password" disabled />
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
              <PasswordField placeholder="Enter password" error={false} />
              <FocusedExample placeholder="Enter password" error={false} />
              <PasswordField placeholder="Enter password" error={false} disabled />
            </div>
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Populated</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <PasswordField value="password123" placeholder="Enter password" error={false} />
              <FocusedExample value="password123" placeholder="Enter password" error={false} />
              <PasswordField
                value="password123"
                placeholder="Enter password"
                error={false}
                disabled
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
              <PasswordField placeholder="Enter password" error={true} />
              <FocusedExample placeholder="Enter password" error={true} />
              <PasswordField placeholder="Enter password" error={true} disabled />
            </div>
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Populated</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <PasswordField value="password123" placeholder="Enter password" error={true} />
              <FocusedExample value="password123" placeholder="Enter password" error={true} />
              <PasswordField
                value="password123"
                placeholder="Enter password"
                error={true}
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}

/* --------------------------------------------------------------------------
   Vercel 스타일 비밀번호 강도 미터
   Vercel Design 패턴: 실시간 강도 측정 (weak/fair/good/strong) + 컬러 피드백.
   입력값에 따라 4단계 프로그레스 바와 레이블이 변합니다.
-------------------------------------------------------------------------- */
const getPasswordStrength = (pw: string): { level: number; label: string; color: string } => {
  if (pw.length === 0) return { level: 0, label: '', color: '#e2e8f0' }
  let score = 0
  if (pw.length >= 8) score++
  if (pw.length >= 12) score++
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++
  if (/[0-9]/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++

  if (score <= 1) return { level: 1, label: 'Weak', color: '#ef4444' }
  if (score === 2) return { level: 2, label: 'Fair', color: '#f59e0b' }
  if (score === 3) return { level: 3, label: 'Good', color: '#3b82f6' }
  return { level: 4, label: 'Strong', color: '#10b981' }
}

const StrengthMeterRender = () => {
  const [password, setPassword] = useState('')
  const strength = getPasswordStrength(password)
  const totalBars = 4

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: '16px',
      width: '360px', padding: '28px', background: '#fff',
      borderRadius: '16px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
      border: '1px solid #f1f5f9',
    }}>
      <div>
        <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>Create password</div>
        <div style={{ fontSize: '12px', color: '#94a3b8' }}>Use 8+ characters with mix of letters, numbers & symbols</div>
      </div>

      <PasswordField
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setPassword(e.target.value)}
        placeholder="Password"
        style={{ width: '100%' }}
      />

      {/* Strength bars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div style={{ display: 'flex', gap: '4px' }}>
          {Array.from({ length: totalBars }).map((_, i) => (
            <div
              key={i}
              style={{
                flex: 1, height: '4px', borderRadius: '2px',
                background: password.length > 0 && i < strength.level ? strength.color : '#e2e8f0',
                transition: 'background 0.3s ease',
              }}
            />
          ))}
        </div>
        {password.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>Password strength</span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: strength.color, transition: 'color 0.3s' }}>
              {strength.label}
            </span>
          </div>
        )}
      </div>

      {/* Requirements checklist */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {[
          { label: 'At least 8 characters', met: password.length >= 8 },
          { label: 'Upper and lowercase letters', met: /[A-Z]/.test(password) && /[a-z]/.test(password) },
          { label: 'At least one number', met: /[0-9]/.test(password) },
          { label: 'At least one special character', met: /[^A-Za-z0-9]/.test(password) },
        ].map(({ label, met }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '16px', height: '16px', borderRadius: '50%',
              background: met ? '#10b981' : '#e2e8f0',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, transition: 'background 0.2s',
            }}>
              <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span style={{ fontSize: '12px', color: met ? '#10b981' : '#94a3b8', transition: 'color 0.2s' }}>
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export const Vercel_강도미터: Story = {
  render: () => <StrengthMeterRender />,
}

/* --------------------------------------------------------------------------
   계정 생성 폼 (Vercel signup 패턴)
   Vercel Design 패턴: 이메일 + 비밀번호 + 확인 필드 조합.
   비밀번호 일치 여부를 실시간으로 검증합니다.
-------------------------------------------------------------------------- */
const SignupFormRender = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const mismatch = confirm.length > 0 && confirm !== password
  const isValid = email.includes('@') && password.length >= 8 && password === confirm

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: '20px',
      width: '380px', padding: '36px', background: '#fff',
      borderRadius: '16px', boxShadow: '0 8px 40px rgba(0,0,0,0.10)',
      border: '1px solid #f1f5f9',
    }}>
      {/* Logo area */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '4px' }}>
        <div style={{
          width: '36px', height: '36px', borderRadius: '10px',
          background: '#000', display: 'flex', alignItems: 'center',
          justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '16px', marginBottom: '16px',
        }}>O</div>
        <div style={{ fontSize: '22px', fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em' }}>Create your account</div>
        <div style={{ fontSize: '13px', color: '#64748b' }}>Start deploying with Orbit UI today.</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Email address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          style={{
            padding: '10px 14px', borderRadius: '8px',
            border: `1.5px solid ${submitted && !email.includes('@') ? '#ef4444' : '#e2e8f0'}`,
            fontSize: '14px', outline: 'none', width: '100%', boxSizing: 'border-box',
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Password</label>
        <PasswordField
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setPassword(e.target.value)}
          placeholder="Min. 8 characters"
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Confirm password</label>
        <PasswordField
          value={confirm}
          onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setConfirm(e.target.value)}
          placeholder="Re-enter password"
          error={mismatch}
          style={{ width: '100%' }}
        />
        {mismatch && (
          <span style={{ fontSize: '12px', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="#ef4444" strokeWidth="1.5" />
              <path d="M8 5v4" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="8" cy="11.5" r="0.75" fill="#ef4444" />
            </svg>
            Passwords do not match
          </span>
        )}
      </div>

      <button
        onClick={() => { setSubmitted(true) }}
        disabled={!isValid}
        style={{
          padding: '12px', borderRadius: '8px', border: 'none', cursor: isValid ? 'pointer' : 'not-allowed',
          background: isValid ? '#000' : '#e2e8f0',
          color: isValid ? '#fff' : '#94a3b8',
          fontSize: '14px', fontWeight: 600,
          transition: 'all 0.2s',
        }}
      >
        {submitted && isValid ? 'Account created!' : 'Continue'}
      </button>

      <div style={{ textAlign: 'center', fontSize: '12px', color: '#94a3b8' }}>
        Already have an account?{' '}
        <a href="#" onClick={(e) => e.preventDefault()} style={{ color: '#0f172a', fontWeight: 600, textDecoration: 'none' }}>Sign in</a>
      </div>
    </div>
  )
}

export const Vercel_계정생성폼: Story = {
  render: () => <SignupFormRender />,
}

export const 디자인QA = {
  args: {
    placeholder: 'Enter password',
    disabled: false,
    error: false,
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  render: ({ placeholder: _placeholder, disabled: _disabled, error: _error, ...args }: any) => (
    <PasswordField {...args} />
  ),
}
