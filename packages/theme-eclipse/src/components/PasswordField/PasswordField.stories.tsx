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
