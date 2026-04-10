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

/* --------------------------------------------------------------------------
   MUI 벤치마크: 비밀번호 변경 폼
   MUI TextField outlined variant 스타일 — 현재/새/확인 필드 조합
   실시간 일치 여부 + 강도 표시를 포함한 계정 설정 패턴입니다.
-------------------------------------------------------------------------- */
const PasswordChangeRender = () => {
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [confirm, setConfirm] = useState('')
  const [success, setSuccess] = useState(false)

  const nextStrength = (() => {
    let s = 0
    if (next.length >= 8) s++
    if (/[A-Z]/.test(next)) s++
    if (/[0-9]/.test(next)) s++
    if (/[^A-Za-z0-9]/.test(next)) s++
    return s
  })()
  const strengthColors = ['#e2e8f0', '#ef4444', '#f59e0b', '#3b82f6', '#10b981']
  const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong']

  const mismatch = confirm.length > 0 && confirm !== next
  const canSubmit = current.length >= 1 && nextStrength >= 3 && next === confirm && !success

  return (
    <div style={{ width: 380, padding: '32px', background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>비밀번호 변경</div>
      <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '24px' }}>
        MUI TextField outlined 스타일 비밀번호 변경 폼
      </div>

      {success ? (
        <div style={{ padding: '24px', textAlign: 'center', borderRadius: '12px', background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>✓</div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#15803d' }}>비밀번호가 변경되었습니다</div>
          <button onClick={() => { setSuccess(false); setCurrent(''); setNext(''); setConfirm('') }} style={{ marginTop: '12px', fontSize: '12px', color: '#64748b', background: 'none', border: 'none', cursor: 'pointer' }}>
            돌아가기
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>현재 비밀번호</label>
            <PasswordField
              value={current}
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setCurrent(e.target.value)}
              placeholder="현재 비밀번호 입력"
            />
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>새 비밀번호</label>
            <PasswordField
              value={next}
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setNext(e.target.value)}
              placeholder="새 비밀번호 (8자 이상)"
            />
            {next.length > 0 && (
              <div style={{ marginTop: '8px' }}>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} style={{ flex: 1, height: '3px', borderRadius: '2px', background: i <= nextStrength ? strengthColors[nextStrength] : '#e2e8f0', transition: 'background 0.2s' }} />
                  ))}
                </div>
                <div style={{ fontSize: '11px', color: strengthColors[nextStrength], fontWeight: 600 }}>
                  {strengthLabels[nextStrength]}
                </div>
              </div>
            )}
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>비밀번호 확인</label>
            <PasswordField
              value={confirm}
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setConfirm(e.target.value)}
              placeholder="새 비밀번호 재입력"
              error={mismatch}
            />
            {mismatch && <div style={{ fontSize: '11px', color: '#ef4444', marginTop: '4px' }}>비밀번호가 일치하지 않습니다.</div>}
          </div>

          <button
            disabled={!canSubmit}
            onClick={() => setSuccess(true)}
            style={{
              padding: '11px', borderRadius: '8px', border: 'none',
              background: canSubmit ? '#6366f1' : '#e2e8f0',
              color: canSubmit ? '#fff' : '#94a3b8',
              fontSize: '14px', fontWeight: 600, cursor: canSubmit ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s',
            }}
          >
            변경하기
          </button>
        </div>
      )}
    </div>
  )
}

export const MUI_비밀번호_변경_폼: Story = {
  render: () => <PasswordChangeRender />,
}

/* --------------------------------------------------------------------------
   Raycast 벤치마크: API 키 입력 패널
   Raycast Extensions 스타일 — 컴팩트한 API 키 관리 패널
   show/hide + 복사 + 재생성 버튼이 일체화된 개발자 설정 UI입니다.
-------------------------------------------------------------------------- */
const API_KEY_SERVICES = [
  { id: 'openai', name: 'OpenAI API', key: 'sk-proj-abc123...xyz', prefix: 'sk-proj-' },
  { id: 'vercel', name: 'Vercel Token', key: 'tok_abc123...xyz', prefix: 'tok_' },
  { id: 'github', name: 'GitHub PAT', key: 'ghp_abc123...xyz', prefix: 'ghp_' },
]

const ApiKeyPanelRender = () => {
  const [visible, setVisible] = useState<Record<string, boolean>>({})
  const [copied, setCopied] = useState<string | null>(null)

  const toggleVisible = (id: string) => setVisible((prev) => ({ ...prev, [id]: !prev[id] }))
  const handleCopy = (id: string) => {
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div style={{ width: 420, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: '#0f172a', borderRadius: '16px', overflow: 'hidden', border: '1px solid #1e293b' }}>
        <div style={{ padding: '14px 18px', borderBottom: '1px solid #1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#e2e8f0' }}>API 키 관리</div>
          <div style={{ marginLeft: 'auto', fontSize: '10px', color: '#475569', background: '#1e293b', padding: '2px 8px', borderRadius: '99px' }}>
            Raycast 스타일
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {API_KEY_SERVICES.map((svc, idx) => (
            <div
              key={svc.id}
              style={{
                padding: '14px 18px',
                borderBottom: idx < API_KEY_SERVICES.length - 1 ? '1px solid #1e293b' : 'none',
              }}
            >
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '8px' }}>
                {svc.name}
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <PasswordField
                    value={visible[svc.id] ? svc.key : `${svc.prefix}${'•'.repeat(16)}`}
                    placeholder="API 키를 입력하세요"
                    style={{ width: '100%', background: '#1e293b', color: '#e2e8f0', borderColor: '#334155' }}
                  />
                </div>
                <button
                  onClick={() => toggleVisible(svc.id)}
                  style={{
                    padding: '8px 10px', borderRadius: '8px', border: '1px solid #334155',
                    background: '#1e293b', color: '#94a3b8', fontSize: '11px', cursor: 'pointer', whiteSpace: 'nowrap',
                  }}
                >
                  {visible[svc.id] ? '숨기기' : '보기'}
                </button>
                <button
                  onClick={() => handleCopy(svc.id)}
                  style={{
                    padding: '8px 10px', borderRadius: '8px', border: `1px solid ${copied === svc.id ? '#10b981' : '#334155'}`,
                    background: copied === svc.id ? 'rgba(16,185,129,0.1)' : '#1e293b',
                    color: copied === svc.id ? '#10b981' : '#94a3b8', fontSize: '11px', cursor: 'pointer', whiteSpace: 'nowrap',
                    transition: 'all 0.2s',
                  }}
                >
                  {copied === svc.id ? '복사됨' : '복사'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ padding: '12px 18px', background: '#0a0f1a', borderTop: '1px solid #1e293b', display: 'flex', gap: '8px' }}>
          <button style={{ flex: 1, padding: '8px', borderRadius: '8px', border: '1px solid #334155', background: '#1e293b', color: '#6366f1', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
            + 새 키 추가
          </button>
          <button style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: '#6366f1', color: '#fff', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
            저장
          </button>
        </div>
      </div>
    </div>
  )
}

export const Raycast_API_키_입력_패널: Story = {
  render: () => <ApiKeyPanelRender />,
}

/* --------------------------------------------------------------------------
   MUI 벤치마크: 소셜 로그인 + 비밀번호 조합 폼
   MUI의 로그인 페이지 패턴 — OAuth 버튼 + divider + 이메일/비밀번호 폼
   계정 존재 여부에 따라 "로그인" / "회원가입" 모드 전환
-------------------------------------------------------------------------- */
const SocialLoginRender = () => {
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const oauthProviders = [
    { name: 'GitHub', icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    )},
    { name: 'Google', icon: (
      <svg width="16" height="16" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    )},
  ]

  return (
    <div style={{ width: 380, padding: '36px', background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 8px 32px rgba(0,0,0,0.08)', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: '4px' }}>
          {mode === 'login' ? '로그인' : '계정 만들기'}
        </div>
        <div style={{ fontSize: '13px', color: '#64748b' }}>
          MUI 로그인 페이지 패턴 — OAuth + 폼 조합
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {oauthProviders.map((p) => (
          <button
            key={p.name}
            style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              padding: '10px', borderRadius: '10px', border: '1.5px solid #e2e8f0',
              background: '#fff', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: '#374151',
            }}
          >
            {p.icon}
            {p.name}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <div style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
        <span style={{ fontSize: '12px', color: '#94a3b8', whiteSpace: 'nowrap' }}>또는 이메일로</span>
        <div style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
        <div>
          <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>이메일</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #e2e8f0', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151' }}>비밀번호</label>
            {mode === 'login' && (
              <a href="#" onClick={(e) => e.preventDefault()} style={{ fontSize: '11px', color: '#6366f1', textDecoration: 'none', fontWeight: 600 }}>
                비밀번호 찾기
              </a>
            )}
          </div>
          <PasswordField
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setPassword(e.target.value)}
            placeholder={mode === 'login' ? '비밀번호 입력' : '8자 이상 비밀번호'}
          />
        </div>
      </div>

      <button
        style={{ width: '100%', padding: '12px', borderRadius: '10px', border: 'none', background: '#6366f1', color: '#fff', fontSize: '14px', fontWeight: 700, cursor: 'pointer', marginBottom: '14px' }}
      >
        {mode === 'login' ? '로그인' : '계정 만들기'}
      </button>

      <div style={{ textAlign: 'center', fontSize: '13px', color: '#64748b' }}>
        {mode === 'login' ? '계정이 없으신가요? ' : '이미 계정이 있으신가요? '}
        <button
          onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
          style={{ color: '#6366f1', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px' }}
        >
          {mode === 'login' ? '회원가입' : '로그인'}
        </button>
      </div>
    </div>
  )
}

export const MUI_소셜_로그인_조합: Story = {
  render: () => <SocialLoginRender />,
}

/* --------------------------------------------------------------------------
   Google Material 3 벤치마크: 비밀번호 강도 + 조건 체크리스트
   M3의 지원 텍스트(Supporting Text) 패턴 — 입력 하단에 구체적 조건 피드백 표시
-------------------------------------------------------------------------- */
const M3_PASSWORD_RULES = [
  { key: 'length', label: '8자 이상', test: (v: string) => v.length >= 8 },
  { key: 'upper', label: '대문자 포함', test: (v: string) => /[A-Z]/.test(v) },
  { key: 'lower', label: '소문자 포함', test: (v: string) => /[a-z]/.test(v) },
  { key: 'digit', label: '숫자 포함', test: (v: string) => /[0-9]/.test(v) },
  { key: 'special', label: '특수문자 포함 (!@#$%)', test: (v: string) => /[!@#$%^&*]/.test(v) },
]

function M3PasswordStrengthRender() {
  const [value, setValue] = useState('')

  const passedCount = M3_PASSWORD_RULES.filter((r) => r.test(value)).length
  const strength = passedCount <= 1 ? 'weak' : passedCount <= 3 ? 'fair' : passedCount === 4 ? 'good' : 'strong'
  const strengthCfg: Record<string, { label: string; color: string; width: string }> = {
    weak: { label: '취약', color: '#ef4444', width: '20%' },
    fair: { label: '보통', color: '#f59e0b', width: '50%' },
    good: { label: '양호', color: '#3b82f6', width: '75%' },
    strong: { label: '강함', color: '#10b981', width: '100%' },
  }
  const sc = strengthCfg[strength]

  return (
    <div style={{ width: 340, display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: '#1e293b' }}>비밀번호 설정</div>
      <PasswordField
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="새 비밀번호를 입력하세요"
        error={value.length > 0 && passedCount < 3}
      />
      {value.length > 0 && (
        <>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#475569' }}>강도 지표</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: sc.color }}>{sc.label}</span>
            </div>
            <div style={{ height: 6, borderRadius: 3, background: '#f1f5f9', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: sc.width, background: sc.color, borderRadius: 3, transition: 'width 0.3s, background 0.3s' }} />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {M3_PASSWORD_RULES.map((rule) => {
              const passed = rule.test(value)
              return (
                <div key={rule.key} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
                  <div style={{ width: 16, height: 16, borderRadius: '50%', background: passed ? '#10b981' : '#f1f5f9', border: `2px solid ${passed ? '#10b981' : '#e2e8f0'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.15s' }}>
                    {passed && <span style={{ fontSize: 9, color: '#fff', fontWeight: 900 }}>✓</span>}
                  </div>
                  <span style={{ color: passed ? '#10b981' : '#94a3b8', fontWeight: passed ? 600 : 400, transition: 'color 0.15s' }}>{rule.label}</span>
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

export const M3_비밀번호_강도_조건_체크리스트: Story = {
  name: 'Google M3 - 비밀번호 강도 + 조건 체크리스트 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Google Material 3 Supporting Text 패턴. 비밀번호 입력 하단에 실시간 조건 체크리스트와 ' +
          '강도 프로그레스 바를 표시합니다. 조건 충족 시 초록색 체크로 즉각 피드백을 제공합니다.',
      },
    },
  },
  render: () => <M3PasswordStrengthRender />,
}

/* --------------------------------------------------------------------------
   Figma Plugin UI 벤치마크: API 키 입력 마스킹 패턴
   Figma 플러그인의 토큰/키 입력 UI — 저장 후 부분 마스킹 표시 + 복사 기능
-------------------------------------------------------------------------- */
type ApiKeyEntry = { id: string; name: string; value: string; created: string; masked: boolean }

function FigmaApiKeyPanelRender() {
  const [keys, setKeys] = useState<ApiKeyEntry[]>([
    { id: 'k1', name: 'Figma API Token', value: 'figd_KbXqwA-3pnR9mLvJ', created: '2026-01-15', masked: true },
    { id: 'k2', name: 'OpenAI API Key', value: 'sk-proj-ABCD1234efgh5678', created: '2026-03-02', masked: true },
  ])
  const [newKeyName, setNewKeyName] = useState('')
  const [newKeyValue, setNewKeyValue] = useState('')
  const [copied, setCopied] = useState<string | null>(null)

  const maskValue = (val: string) => `${val.slice(0, 6)}${'*'.repeat(val.length - 10)}${val.slice(-4)}`

  const toggleMask = (id: string) => {
    setKeys((prev) => prev.map((k) => (k.id === id ? { ...k, masked: !k.masked } : k)))
  }

  const copyKey = (id: string, val: string) => {
    void navigator.clipboard.writeText(val)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const addKey = () => {
    if (!newKeyName.trim() || !newKeyValue.trim()) return
    setKeys((prev) => [
      ...prev,
      { id: `k${Date.now()}`, name: newKeyName, value: newKeyValue, created: new Date().toISOString().slice(0, 10), masked: true },
    ])
    setNewKeyName('')
    setNewKeyValue('')
  }

  return (
    <div style={{ width: 380, display: 'flex', flexDirection: 'column', gap: 14, padding: 20, background: '#18181b', borderRadius: 12, border: '1px solid #27272a' }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#e4e4e7', marginBottom: 4 }}>API 키 관리</div>
      {keys.map((key) => (
        <div key={key.id} style={{ padding: '12px 14px', background: '#27272a', borderRadius: 8, border: '1px solid #3f3f46' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#a1a1aa' }}>{key.name}</span>
            <span style={{ fontSize: 10, color: '#52525b' }}>{key.created}</span>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <code style={{ flex: 1, fontSize: 11, color: '#d4d4d8', fontFamily: 'monospace', background: '#18181b', padding: '4px 8px', borderRadius: 6, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {key.masked ? maskValue(key.value) : key.value}
            </code>
            <button
              onClick={() => toggleMask(key.id)}
              style={{ padding: '4px 8px', borderRadius: 6, border: '1px solid #3f3f46', background: 'transparent', color: '#71717a', fontSize: 11, cursor: 'pointer' }}
            >
              {key.masked ? '표시' : '숨김'}
            </button>
            <button
              onClick={() => copyKey(key.id, key.value)}
              style={{ padding: '4px 8px', borderRadius: 6, border: '1px solid #3f3f46', background: copied === key.id ? '#166534' : 'transparent', color: copied === key.id ? '#4ade80' : '#71717a', fontSize: 11, cursor: 'pointer', transition: 'all 0.15s' }}
            >
              {copied === key.id ? '복사됨' : '복사'}
            </button>
          </div>
        </div>
      ))}
      <div style={{ borderTop: '1px solid #27272a', paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#71717a' }}>새 키 추가</div>
        <input
          value={newKeyName}
          onChange={(e) => setNewKeyName(e.target.value)}
          placeholder="키 이름 (예: Figma API Token)"
          style={{ padding: '7px 10px', borderRadius: 6, border: '1px solid #3f3f46', background: '#27272a', color: '#e4e4e7', fontSize: 12, outline: 'none' }}
        />
        <PasswordField
          value={newKeyValue}
          onChange={(e) => setNewKeyValue(e.target.value)}
          placeholder="API 키 또는 토큰 값"
        />
        <button
          onClick={addKey}
          disabled={!newKeyName.trim() || !newKeyValue.trim()}
          style={{ padding: '8px', borderRadius: 8, border: 'none', background: newKeyName && newKeyValue ? '#6366f1' : '#27272a', color: newKeyName && newKeyValue ? '#fff' : '#52525b', fontSize: 12, fontWeight: 700, cursor: newKeyName && newKeyValue ? 'pointer' : 'not-allowed', transition: 'all 0.15s' }}
        >
          키 저장
        </button>
      </div>
    </div>
  )
}

export const Figma_API키_마스킹_패널: Story = {
  name: 'Figma Plugin UI - API 키 마스킹 입력 패널 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Figma 플러그인 패널 스타일의 API 키 관리 UI. PasswordField로 신규 키를 입력하고 ' +
          '저장 후 부분 마스킹(앞 6자 + 뒤 4자)으로 표시합니다. 표시/숨김 토글과 클립보드 복사 기능을 포함합니다.',
      },
    },
  },
  render: () => <FigmaApiKeyPanelRender />,
}

/* --------------------------------------------------------------------------
   Google Material 3 벤치마크: 비밀번호 재설정 단계 폼
   M3의 Text Field + Button 조합 패턴 — 이메일 인증 → 새 비밀번호 2단계 플로우
-------------------------------------------------------------------------- */
type ResetStep = 'email' | 'code' | 'newpass' | 'done'

function M3PasswordResetRender() {
  const [step, setStep] = useState<ResetStep>('email')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [newPass, setNewPass] = useState('')
  const [confirm, setConfirm] = useState('')

  const STEPS: Record<ResetStep, number> = { email: 1, code: 2, newpass: 3, done: 4 }
  const currentStep = STEPS[step]

  const canNext = () => {
    if (step === 'email') return email.includes('@')
    if (step === 'code') return code.length === 6
    if (step === 'newpass') return newPass.length >= 8 && newPass === confirm
    return false
  }

  const next = () => {
    if (step === 'email') setStep('code')
    else if (step === 'code') setStep('newpass')
    else if (step === 'newpass') setStep('done')
  }

  return (
    <div style={{ width: 360, display: 'flex', flexDirection: 'column', gap: 20, padding: 24, background: '#fff', borderRadius: 14, border: '1.5px solid #e2e8f0' }}>
      <div>
        <div style={{ fontSize: 16, fontWeight: 800, color: '#1e293b', marginBottom: 4 }}>비밀번호 재설정</div>
        <div style={{ display: 'flex', gap: 4 }}>
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              style={{ height: 4, flex: 1, borderRadius: 2, background: n <= currentStep - 1 || (n === currentStep && step !== 'done') ? '#6366f1' : '#f1f5f9', transition: 'background 0.3s' }}
            />
          ))}
        </div>
        <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 6 }}>
          {step === 'email' && '1단계: 계정 이메일 입력'}
          {step === 'code' && '2단계: 인증 코드 확인 (이메일로 전송됨)'}
          {step === 'newpass' && '3단계: 새 비밀번호 설정'}
          {step === 'done' && '완료!'}
        </div>
      </div>

      {step === 'email' && (
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일 주소"
          style={{ padding: '10px 14px', borderRadius: 8, border: `1.5px solid ${email && !email.includes('@') ? '#ef4444' : '#e2e8f0'}`, fontSize: 13, outline: 'none', color: '#1e293b' }}
        />
      )}

      {step === 'code' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 12, color: '#64748b' }}>{email}로 6자리 코드를 전송했습니다</div>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            placeholder="123456"
            style={{ padding: '10px 14px', borderRadius: 8, border: `1.5px solid ${code.length > 0 && code.length < 6 ? '#f59e0b' : '#e2e8f0'}`, fontSize: 20, fontFamily: 'monospace', letterSpacing: '0.3em', textAlign: 'center', outline: 'none', color: '#1e293b' }}
          />
        </div>
      )}

      {step === 'newpass' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <PasswordField
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            placeholder="새 비밀번호 (8자 이상)"
            error={newPass.length > 0 && newPass.length < 8}
          />
          <PasswordField
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="비밀번호 확인"
            error={confirm.length > 0 && confirm !== newPass}
          />
          {confirm.length > 0 && confirm !== newPass && (
            <div style={{ fontSize: 12, color: '#ef4444' }}>비밀번호가 일치하지 않습니다</div>
          )}
        </div>
      )}

      {step === 'done' && (
        <div style={{ textAlign: 'center', padding: '12px 0' }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>&#10003;</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#10b981', marginBottom: 4 }}>비밀번호 재설정 완료</div>
          <div style={{ fontSize: 12, color: '#64748b' }}>새 비밀번호로 로그인하세요</div>
        </div>
      )}

      {step !== 'done' && (
        <button
          onClick={next}
          disabled={!canNext()}
          style={{ padding: '12px', borderRadius: 10, border: 'none', background: canNext() ? '#6366f1' : '#f1f5f9', color: canNext() ? '#fff' : '#94a3b8', fontSize: 14, fontWeight: 700, cursor: canNext() ? 'pointer' : 'not-allowed', transition: 'all 0.15s' }}
        >
          {step === 'email' ? '인증 코드 전송' : step === 'code' ? '코드 확인' : '비밀번호 변경'}
        </button>
      )}

      {step !== 'email' && step !== 'done' && (
        <button
          onClick={() => setStep('email')}
          style={{ background: 'none', border: 'none', fontSize: 12, color: '#94a3b8', cursor: 'pointer', textDecoration: 'underline' }}
        >
          처음으로
        </button>
      )}
    </div>
  )
}

export const M3_비밀번호_재설정_단계폼: Story = {
  name: 'Google M3 - 비밀번호 재설정 다단계 폼 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Google Material 3 Text Field + 단계 진행 패턴. 이메일 입력 → 인증 코드 → 새 비밀번호 3단계 플로우를 ' +
          '구현합니다. PasswordField의 error 상태로 실시간 유효성 피드백을 제공합니다.',
      },
    },
  },
  render: () => <M3PasswordResetRender />,
}

/* --------------------------------------------------------------------------
   Radix UI 벤치마크: 실시간 비밀번호 규칙 검증
   Radix Form + PasswordField — 비밀번호 조건 실시간 체크 패턴
-------------------------------------------------------------------------- */
const RADIX_PW_RULES = [
  { id: 'length', label: '최소 8자 이상', test: (v: string) => v.length >= 8 },
  { id: 'upper', label: '대문자 포함', test: (v: string) => /[A-Z]/.test(v) },
  { id: 'number', label: '숫자 포함', test: (v: string) => /\d/.test(v) },
  { id: 'special', label: '특수문자 포함 (!@#$...)', test: (v: string) => /[^A-Za-z0-9]/.test(v) },
]

const RadixPwValidationRender = () => {
  const [pw, setPw] = useState('')
  const [confirm, setConfirm] = useState('')

  const passed = RADIX_PW_RULES.filter((r) => r.test(pw)).length
  const strength = passed === 0 ? 0 : passed <= 1 ? 25 : passed <= 2 ? 50 : passed <= 3 ? 75 : 100
  const strengthColor = strength === 100 ? '#22c55e' : strength >= 50 ? '#f59e0b' : '#ef4444'
  const strengthLabel = strength === 100 ? '매우 강함' : strength >= 75 ? '강함' : strength >= 50 ? '보통' : strength > 0 ? '약함' : ''
  const matchOk = confirm.length > 0 && pw === confirm

  return (
    <div style={{ width: 360, fontFamily: 'system-ui, sans-serif', display: 'flex', flexDirection: 'column', gap: 20, padding: 28, borderRadius: 16, border: '1px solid #e2e8f0' }}>
      <div>
        <div style={{ fontSize: 16, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>새 비밀번호 설정</div>
        <div style={{ fontSize: 12, color: '#94a3b8' }}>Radix UI Form validation 패턴</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <label style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>비밀번호</label>
        <PasswordField
          placeholder="새 비밀번호 입력"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          error={pw.length > 0 && passed < 4}
        />
        {/* 강도 바 */}
        {pw.length > 0 && (
          <div>
            <div style={{ height: 4, background: '#f1f5f9', borderRadius: 2, overflow: 'hidden', marginBottom: 4 }}>
              <div style={{ height: '100%', width: `${strength}%`, background: strengthColor, borderRadius: 2, transition: 'width 0.2s, background 0.2s' }} />
            </div>
            <div style={{ fontSize: 11, color: strengthColor, fontWeight: 600 }}>{strengthLabel}</div>
          </div>
        )}
      </div>

      {/* 조건 체크리스트 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {RADIX_PW_RULES.map((rule) => {
          const ok = rule.test(pw)
          return (
            <div key={rule.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{
                width: 16, height: 16, borderRadius: '50%', flexShrink: 0,
                background: ok ? '#dcfce7' : '#f1f5f9',
                border: `1.5px solid ${ok ? '#22c55e' : '#e2e8f0'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 9, color: ok ? '#22c55e' : '#94a3b8', fontWeight: 800,
              }}>
                {ok ? '✓' : ''}
              </span>
              <span style={{ fontSize: 12, color: ok ? '#166534' : '#94a3b8', fontWeight: ok ? 600 : 400 }}>
                {rule.label}
              </span>
            </div>
          )
        })}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <label style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>비밀번호 확인</label>
        <PasswordField
          placeholder="비밀번호 재입력"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          error={confirm.length > 0 && !matchOk}
        />
        {confirm.length > 0 && (
          <div style={{ fontSize: 11, color: matchOk ? '#22c55e' : '#ef4444', fontWeight: 600 }}>
            {matchOk ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.'}
          </div>
        )}
      </div>

      <button
        disabled={passed < 4 || !matchOk}
        style={{
          padding: '11px 0', borderRadius: 8, border: 'none',
          background: passed === 4 && matchOk ? '#6366f1' : '#e2e8f0',
          color: passed === 4 && matchOk ? '#fff' : '#94a3b8',
          fontSize: 14, fontWeight: 700, cursor: passed === 4 && matchOk ? 'pointer' : 'not-allowed',
          transition: 'background 0.2s',
        }}
      >
        비밀번호 변경
      </button>
    </div>
  )
}

export const Radix_비밀번호_실시간_검증: Story = {
  name: 'Radix UI - 실시간 비밀번호 조건 검증',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story:
          'Radix UI Form 패턴. 비밀번호 입력 시 4가지 규칙(길이/대문자/숫자/특수문자)을 실시간으로 체크합니다. ' +
          '강도 바 + 조건 리스트 + 확인 입력 일치 여부를 복합 표시합니다.',
      },
    },
  },
  render: () => <RadixPwValidationRender />,
}

/* --------------------------------------------------------------------------
   Linear 벤치마크: 보안 설정 패널 비밀번호 변경
   Linear Settings → Security 패턴 — 현재/새 비밀번호 + 2FA 설정 섹션
-------------------------------------------------------------------------- */
const LinearSecurityPanelRender = () => {
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [saved, setSaved] = useState(false)

  const canSave = current.length >= 1 && next.length >= 8

  const handleSave = () => {
    if (!canSave) return
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    setCurrent('')
    setNext('')
  }

  return (
    <div style={{ width: 440, fontFamily: 'system-ui, sans-serif' }}>
      {/* 섹션 헤더 */}
      <div style={{ marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 2 }}>보안</div>
        <div style={{ fontSize: 12, color: '#94a3b8' }}>비밀번호 및 인증 설정을 관리합니다.</div>
      </div>

      {/* 비밀번호 변경 */}
      <div style={{ padding: '18px 0', borderBottom: '1px solid #f8fafc' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b', marginBottom: 2 }}>비밀번호 변경</div>
            <div style={{ fontSize: 11, color: '#94a3b8' }}>마지막 변경: 30일 전</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#64748b', marginBottom: 6 }}>현재 비밀번호</div>
            <PasswordField
              placeholder="현재 비밀번호"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
            />
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#64748b', marginBottom: 6 }}>새 비밀번호</div>
            <PasswordField
              placeholder="새 비밀번호 (8자 이상)"
              value={next}
              onChange={(e) => setNext(e.target.value)}
              error={next.length > 0 && next.length < 8}
            />
            {next.length > 0 && next.length < 8 && (
              <div style={{ fontSize: 11, color: '#ef4444', marginTop: 4 }}>최소 8자 이상 입력하세요.</div>
            )}
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
            <button
              onClick={handleSave}
              disabled={!canSave}
              style={{
                padding: '7px 16px', borderRadius: 6, border: 'none',
                background: canSave ? '#0f172a' : '#f1f5f9',
                color: canSave ? '#fff' : '#94a3b8',
                fontSize: 12, fontWeight: 600, cursor: canSave ? 'pointer' : 'not-allowed',
              }}
            >
              {saved ? '저장 완료' : '비밀번호 변경'}
            </button>
          </div>
        </div>
      </div>

      {/* 2FA 섹션 */}
      <div style={{ padding: '18px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b', marginBottom: 2 }}>2단계 인증 (2FA)</div>
            <div style={{ fontSize: 11, color: '#94a3b8' }}>계정 보안을 강화합니다.</div>
          </div>
          <div style={{
            padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700,
            background: '#fef9c3', color: '#92400e',
          }}>
            미설정
          </div>
        </div>
      </div>
    </div>
  )
}

export const Linear_보안_설정_패널: Story = {
  name: 'Linear - 보안 설정 패널',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story:
          'Linear Settings Security 패턴. 현재/새 비밀번호 변경 폼 + 2FA 상태 표시. ' +
          '비밀번호 최소 길이 실시간 검증, 조건 충족 시 저장 버튼 활성화.',
      },
    },
  },
  render: () => <LinearSecurityPanelRender />,
}

/* --------------------------------------------------------------------------
   Radix UI 벤치마크: 계정 삭제 확인 비밀번호 입력
   Radix AlertDialog + PasswordField — 위험 작업 전 비밀번호 재확인 패턴
-------------------------------------------------------------------------- */
const RadixDangerConfirmRender = () => {
  const [pw, setPw] = useState('')
  const [confirmed, setConfirmed] = useState(false)
  const [open, setOpen] = useState(false)

  const CORRECT = 'delete123'

  if (confirmed) {
    return (
      <div style={{ padding: 28, borderRadius: 12, background: '#fef2f2', border: '1px solid #fecaca', maxWidth: 360, textAlign: 'center', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ fontSize: 20, marginBottom: 8 }}>삭제 완료</div>
        <div style={{ fontSize: 13, color: '#ef4444', marginBottom: 12 }}>계정이 삭제되었습니다.</div>
        <button
          onClick={() => { setConfirmed(false); setPw(''); setOpen(false) }}
          style={{ padding: '7px 16px', borderRadius: 6, border: '1px solid #fca5a5', background: '#fff', fontSize: 12, color: '#ef4444', cursor: 'pointer' }}
        >
          초기화
        </button>
      </div>
    )
  }

  return (
    <div style={{ width: 360, fontFamily: 'system-ui, sans-serif' }}>
      <button
        onClick={() => setOpen(true)}
        style={{
          padding: '9px 18px', borderRadius: 8, border: '1px solid #fca5a5',
          background: '#fff', color: '#ef4444', fontSize: 13, fontWeight: 600, cursor: 'pointer',
        }}
      >
        계정 삭제
      </button>

      {open && (
        <div style={{
          marginTop: 16, padding: '20px 24px', borderRadius: 12,
          border: '1.5px solid #fca5a5', background: '#fff',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: '#0f172a', marginBottom: 6 }}>계정을 삭제하시겠습니까?</div>
          <div style={{ fontSize: 12, color: '#64748b', marginBottom: 16, lineHeight: 1.6 }}>
            이 작업은 취소할 수 없습니다. 계속하려면 비밀번호를 입력하세요.
            <br />
            <span style={{ fontSize: 11, color: '#94a3b8' }}>(데모용: <code>delete123</code>)</span>
          </div>
          <div style={{ marginBottom: 14 }}>
            <PasswordField
              placeholder="비밀번호 입력"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              error={pw.length > 0 && pw !== CORRECT}
            />
            {pw.length > 0 && pw !== CORRECT && (
              <div style={{ fontSize: 11, color: '#ef4444', marginTop: 4 }}>비밀번호가 올바르지 않습니다.</div>
            )}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => { setOpen(false); setPw('') }}
              style={{ flex: 1, padding: '9px 0', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', fontSize: 13, cursor: 'pointer', color: '#64748b' }}
            >
              취소
            </button>
            <button
              onClick={() => pw === CORRECT && setConfirmed(true)}
              disabled={pw !== CORRECT}
              style={{
                flex: 1, padding: '9px 0', borderRadius: 8, border: 'none',
                background: pw === CORRECT ? '#ef4444' : '#f1f5f9',
                color: pw === CORRECT ? '#fff' : '#94a3b8',
                fontSize: 13, fontWeight: 700, cursor: pw === CORRECT ? 'pointer' : 'not-allowed',
              }}
            >
              계정 삭제
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export const Radix_위험_작업_비밀번호_확인: Story = {
  name: 'Radix UI - 위험 작업 비밀번호 재확인',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story:
          'Radix AlertDialog 패턴. 계정 삭제 등 위험한 작업 전 비밀번호 재확인 UI. ' +
          '잘못된 입력 시 error 상태, 정확한 입력 시 삭제 버튼 활성화. ' +
          '데모용 비밀번호: delete123',
      },
    },
  },
  render: () => <RadixDangerConfirmRender />,
}

// ============================================================
// Cycle 132 — Linear Design + Vercel Design 벤치마크 반영
// ============================================================

// Linear 스타일 — 팀 멤버 초대 + 비밀번호 설정 온보딩
function LinearTeamOnboardingRender() {
  const [step, setStep] = useState<'invite' | 'password' | 'done'>('invite')
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [confirm, setConfirm] = useState('')
  const pwStrength = pw.length === 0 ? 0 : pw.length < 6 ? 1 : pw.length < 10 ? 2 : pw.length < 14 ? 3 : 4
  const strengthLabel = ['', '약함', '보통', '강함', '매우 강함']
  const strengthColor = ['', '#ef4444', '#f97316', '#22c55e', '#16a34a']
  const isMatch = pw === confirm && confirm.length > 0
  const canNext = step === 'invite' ? email.includes('@') : pwStrength >= 2 && isMatch
  return (
    <div style={{ width: 360, fontFamily: 'system-ui, sans-serif' }}>
      {/* 진행 단계 */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
        {(['invite', 'password', 'done'] as const).map((s, i) => (
          <div key={s} style={{ flex: 1, height: 3, borderRadius: 99, background: i <= (['invite', 'password', 'done'] as const).indexOf(step) ? '#0f172a' : '#e2e8f0', transition: 'background 250ms' }} />
        ))}
      </div>
      {step === 'invite' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#0f172a' }}>팀 워크스페이스 참가</div>
          <div style={{ fontSize: 13, color: '#64748b' }}>초대 이메일 주소를 입력하세요.</div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            style={{ padding: '9px 12px', fontSize: 13, borderRadius: 8, border: '1px solid #e2e8f0', outline: 'none', color: '#0f172a' }}
          />
          <button
            onClick={() => setStep('password')}
            disabled={!canNext}
            style={{ padding: '10px', fontSize: 13, fontWeight: 600, borderRadius: 8, border: 'none', background: canNext ? '#0f172a' : '#f1f5f9', color: canNext ? '#fff' : '#94a3b8', cursor: canNext ? 'pointer' : 'not-allowed', transition: 'all 150ms' }}
          >
            계속
          </button>
        </div>
      )}
      {step === 'password' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#0f172a' }}>비밀번호 설정</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <PasswordField
              value={pw}
              onChange={(e) => setPw((e.target as HTMLInputElement).value)}
              placeholder="새 비밀번호"
            />
            {pw.length > 0 && (
              <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} style={{ flex: 1, height: 3, borderRadius: 99, background: n <= pwStrength ? strengthColor[pwStrength] : '#e2e8f0', transition: 'background 200ms' }} />
                ))}
                <span style={{ fontSize: 11, color: strengthColor[pwStrength], marginLeft: 4, minWidth: 52 }}>{strengthLabel[pwStrength]}</span>
              </div>
            )}
          </div>
          <PasswordField
            value={confirm}
            onChange={(e) => setConfirm((e.target as HTMLInputElement).value)}
            placeholder="비밀번호 확인"
            error={confirm.length > 0 && !isMatch}
          />
          {confirm.length > 0 && !isMatch && (
            <span style={{ fontSize: 11, color: '#ef4444', marginTop: -8 }}>비밀번호가 일치하지 않습니다</span>
          )}
          <button
            onClick={() => setStep('done')}
            disabled={!canNext}
            style={{ padding: '10px', fontSize: 13, fontWeight: 600, borderRadius: 8, border: 'none', background: canNext ? '#0f172a' : '#f1f5f9', color: canNext ? '#fff' : '#94a3b8', cursor: canNext ? 'pointer' : 'not-allowed', transition: 'all 150ms' }}
          >
            완료
          </button>
        </div>
      )}
      {step === 'done' && (
        <div style={{ textAlign: 'center', padding: '32px 0' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>✓</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>설정 완료!</div>
          <div style={{ fontSize: 13, color: '#64748b' }}>{email} 으로 로그인하세요.</div>
          <button onClick={() => { setStep('invite'); setEmail(''); setPw(''); setConfirm('') }} style={{ marginTop: 20, fontSize: 12, color: '#6366f1', border: 'none', background: 'none', cursor: 'pointer' }}>
            다시 시작
          </button>
        </div>
      )}
    </div>
  )
}

export const Linear_팀_온보딩_비밀번호_설정: Story = {
  name: 'Linear - 팀 온보딩 비밀번호 설정',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story:
          'Linear 온보딩 UI 패턴. 이메일 확인 → 비밀번호 설정 → 완료 3단계. ' +
          '비밀번호 강도 게이지(4단계 색상)와 일치 검증, 진행 바 포함.',
      },
    },
  },
  render: () => <LinearTeamOnboardingRender />,
}

// Vercel 스타일 — API 토큰 생성 보안 폼
type TokenScope132 = 'read' | 'write' | 'admin'

function VercelTokenCreateRender() {
  const [name, setName] = useState('')
  const [scope, setScope] = useState<TokenScope132>('read')
  const [pw, setPw] = useState('')
  const [created, setCreated] = useState<string | null>(null)
  const [error, setPwError] = useState(false)
  const SCOPES: Array<{ key: TokenScope132; label: string; desc: string }> = [
    { key: 'read', label: '읽기', desc: '데이터 조회만 허용' },
    { key: 'write', label: '읽기/쓰기', desc: '데이터 조회 및 수정' },
    { key: 'admin', label: '전체 권한', desc: '삭제 포함 모든 작업' },
  ]
  const handleCreate = () => {
    if (pw.length < 6) { setPwError(true); return }
    setPwError(false)
    const token = `tok_${Math.random().toString(36).slice(2, 18)}`
    setCreated(token)
  }
  return (
    <div style={{ width: 380, fontFamily: 'system-ui, sans-serif' }}>
      {!created ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a' }}>새 API 토큰 생성</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#475569' }}>토큰 이름</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="my-ci-token"
              style={{ padding: '8px 12px', fontSize: 13, borderRadius: 7, border: '1px solid #e2e8f0', outline: 'none', color: '#0f172a' }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#475569' }}>권한 범위</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {SCOPES.map((s) => (
                <label key={s.key} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 7, border: `1.5px solid ${scope === s.key ? '#0f172a' : '#e2e8f0'}`, cursor: 'pointer', background: scope === s.key ? '#f8fafc' : '#fff' }} onClick={() => setScope(s.key)}>
                  <div style={{ width: 14, height: 14, borderRadius: '50%', border: `2px solid ${scope === s.key ? '#0f172a' : '#cbd5e1'}`, background: scope === s.key ? '#0f172a' : '#fff', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{s.label}</div>
                    <div style={{ fontSize: 11, color: '#64748b' }}>{s.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#475569' }}>계정 비밀번호 확인</label>
            <PasswordField
              value={pw}
              onChange={(e) => { setPw((e.target as HTMLInputElement).value); setPwError(false) }}
              placeholder="비밀번호 입력"
              error={error}
            />
            {error && <span style={{ fontSize: 11, color: '#ef4444' }}>비밀번호를 입력해 주세요</span>}
          </div>
          <button
            onClick={handleCreate}
            disabled={!name.trim()}
            style={{ padding: '10px', fontSize: 13, fontWeight: 600, borderRadius: 8, border: 'none', background: name.trim() ? '#0f172a' : '#f1f5f9', color: name.trim() ? '#fff' : '#94a3b8', cursor: name.trim() ? 'pointer' : 'not-allowed' }}
          >
            토큰 생성
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a' }}>토큰이 생성되었습니다</div>
          <div style={{ fontSize: 13, color: '#ef4444', fontWeight: 500 }}>이 화면을 벗어나면 다시 볼 수 없습니다.</div>
          <div style={{ padding: '10px 14px', background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0', fontFamily: 'monospace', fontSize: 12, wordBreak: 'break-all', color: '#0f172a' }}>
            {created}
          </div>
          <button onClick={() => { setCreated(null); setName(''); setPw(''); setScope('read') }} style={{ fontSize: 12, color: '#6366f1', border: 'none', background: 'none', cursor: 'pointer' }}>
            다시 생성
          </button>
        </div>
      )}
    </div>
  )
}

export const Vercel_API_토큰_생성_보안_폼: Story = {
  name: 'Vercel Design - API 토큰 생성 보안 폼',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story:
          'Vercel 토큰 생성 UI 패턴. 이름 + 권한 범위 선택(라디오) + 비밀번호 재확인. ' +
          '생성 후 일회성 토큰 표시 + 복사 경고 메시지.',
      },
    },
  },
  render: () => <VercelTokenCreateRender />,
}

// Linear + Vercel — 보안 설정 비밀번호 변경 + 세션 관리
type Session132 = { device: string; location: string; time: string; current: boolean }

const SESSIONS_132: Session132[] = [
  { device: 'MacBook Pro (Chrome)', location: '서울, KR', time: '지금', current: true },
  { device: 'iPhone 16 (Safari)', location: '서울, KR', time: '2시간 전', current: false },
  { device: 'Windows PC (Edge)', location: '부산, KR', time: '1일 전', current: false },
]

function LinearVercelSecurityPanelRender() {
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [sessions, setSessions] = useState<Session132[]>(SESSIONS_132)
  const [saved, setSaved] = useState(false)
  const canSave = current.length >= 6 && next.length >= 8
  const handleSave = () => { if (!canSave) return; setSaved(true); setTimeout(() => setSaved(false), 2000); setCurrent(''); setNext('') }
  return (
    <div style={{ width: 420, fontFamily: 'system-ui, sans-serif', display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* 비밀번호 변경 */}
      <div style={{ borderRadius: 10, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ padding: '14px 18px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', fontSize: 13, fontWeight: 700, color: '#0f172a' }}>비밀번호 변경</div>
        <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <PasswordField value={current} onChange={(e) => setCurrent((e.target as HTMLInputElement).value)} placeholder="현재 비밀번호" />
          <PasswordField value={next} onChange={(e) => setNext((e.target as HTMLInputElement).value)} placeholder="새 비밀번호 (8자 이상)" />
          <button
            onClick={handleSave}
            disabled={!canSave}
            style={{ padding: '9px', fontSize: 13, fontWeight: 600, borderRadius: 7, border: 'none', background: saved ? '#22c55e' : canSave ? '#0f172a' : '#f1f5f9', color: canSave ? '#fff' : '#94a3b8', cursor: canSave ? 'pointer' : 'not-allowed', transition: 'background 200ms' }}
          >
            {saved ? '저장됨' : '저장'}
          </button>
        </div>
      </div>
      {/* 세션 목록 */}
      <div style={{ borderRadius: 10, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ padding: '14px 18px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', fontSize: 13, fontWeight: 700, color: '#0f172a' }}>활성 세션</div>
        {sessions.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 18px', borderBottom: i < sessions.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
            <span style={{ fontSize: 18 }}>{s.device.includes('iPhone') ? '📱' : s.device.includes('Windows') ? '🖥️' : '💻'}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{s.device}</div>
              <div style={{ fontSize: 11, color: '#94a3b8' }}>{s.location} · {s.time}</div>
            </div>
            {s.current ? (
              <span style={{ fontSize: 11, padding: '2px 8px', background: '#dcfce7', color: '#16a34a', borderRadius: 99, fontWeight: 500 }}>현재</span>
            ) : (
              <button onClick={() => setSessions((prev) => prev.filter((_, j) => j !== i))} style={{ fontSize: 11, color: '#ef4444', border: '1px solid #fca5a5', background: '#fff', borderRadius: 5, padding: '2px 8px', cursor: 'pointer' }}>
                종료
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export const Linear_Vercel_보안_설정_패널: Story = {
  name: 'Linear + Vercel - 보안 설정 비밀번호 + 세션 관리',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story:
          'Linear 컴팩트 + Vercel 모노크롬 결합. 비밀번호 변경(현재/새 비밀번호 + 저장 피드백) + ' +
          '활성 세션 목록(디바이스/위치/시간 + 세션 종료 버튼).',
      },
    },
  },
  render: () => <LinearVercelSecurityPanelRender />,
}
