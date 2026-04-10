import { Flex } from '@heejun-com/core'
import { ChatLineIcon, ChevronRightLineIcon } from '@heejun-com/icons'
import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { OutlineButton, OutlineButtonProps } from '.'

const iconSize: Record<OutlineButtonProps['size'], number> = {
  small: 12,
  medium: 14,
  large: 16,
}

OutlineButton.displayName = 'OutlineButton'
OutlineButton.Leading.displayName = 'OutlineButton.Leading'
OutlineButton.Center.displayName = 'OutlineButton.Center'
OutlineButton.Trailing.displayName = 'OutlineButton.Trailing'

const meta = {
  title: 'eclipse/Actions/Buttons/OutlineButton',
  component: OutlineButton,
  args: { color: 'black', size: 'medium', disabled: false },
  argTypes: {
    onClick: { action: 'clicked' },
    color: {
      control: 'select',
      options: ['black', 'primary', 'gray'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
  parameters: {
    controls: {
      exclude: ['children'],
    },
  },
} satisfies Meta<typeof OutlineButton>

type Story = StoryObj<typeof meta>

export default meta

export const 색상 = {
  args: {
    size: 'large',
  },
  render: (prop: OutlineButtonProps) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <h4 style={{ margin: 0, fontSize: '14px', color: '#888' }}>Outline Colors</h4>
        <Flex columnGap="24px" alignItems="center" flexWrap="wrap" rowGap="16px">
          <OutlineButton {...prop} color="black">
            <OutlineButton.Center>Black</OutlineButton.Center>
          </OutlineButton>
          <OutlineButton {...prop} color="primary">
            <OutlineButton.Center>Primary</OutlineButton.Center>
          </OutlineButton>
          <OutlineButton {...prop} color="gray">
            <OutlineButton.Center>Gray</OutlineButton.Center>
          </OutlineButton>
        </Flex>
      </div>
    )
  },
} satisfies Story

export const 사이즈 = {
  args: {
    color: 'black',
  },
  render: (prop: OutlineButtonProps) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <h4 style={{ margin: 0, fontSize: '14px', color: '#888' }}>Outline Sizes</h4>
        <Flex columnGap="24px" alignItems="flex-end" flexWrap="wrap" rowGap="16px">
          <OutlineButton {...prop} size="small">
            <OutlineButton.Leading>
              <ChatLineIcon />
            </OutlineButton.Leading>
            <OutlineButton.Center>Small</OutlineButton.Center>
            <OutlineButton.Trailing>
              <ChevronRightLineIcon size={iconSize.small} />
            </OutlineButton.Trailing>
          </OutlineButton>
          <OutlineButton {...prop} size="medium">
            <OutlineButton.Leading>
              <ChatLineIcon />
            </OutlineButton.Leading>
            <OutlineButton.Center>Medium</OutlineButton.Center>
            <OutlineButton.Trailing>
              <ChevronRightLineIcon size={iconSize.medium} />
            </OutlineButton.Trailing>
          </OutlineButton>
          <OutlineButton {...prop} size="large">
            <OutlineButton.Leading>
              <ChatLineIcon />
            </OutlineButton.Leading>
            <OutlineButton.Center>Large</OutlineButton.Center>
            <OutlineButton.Trailing>
              <ChevronRightLineIcon size={iconSize.large} />
            </OutlineButton.Trailing>
          </OutlineButton>
        </Flex>
      </div>
    )
  },
} satisfies Story

export const 디자인QA = {
  args: {
    leading: true,
    trailing: true,
    loading: false,
    color: 'black',
    size: 'medium',
    disabled: false,
  },
  parameters: {
    controls: {
      exclude: ['as', 'children', 'onClick'],
    },
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  render: ({ leading, trailing, color, size, loading, ...rest }: any) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '2rem' }}>
        <h4 style={{ margin: 0, fontSize: '14px', color: '#888' }}>Interactive Playground</h4>
        <OutlineButton {...rest} color={color} size={size} loading={loading}>
          {leading && (
            <OutlineButton.Leading>
              <ChatLineIcon />
            </OutlineButton.Leading>
          )}
          <OutlineButton.Center>Black</OutlineButton.Center>
          {trailing && (
            <OutlineButton.Trailing>
              <ChevronRightLineIcon size={iconSize[size as OutlineButtonProps['size']]} />
            </OutlineButton.Trailing>
          )}
        </OutlineButton>
      </div>
    )
  },
}

// ─── Material 3: Tonal / Outlined / Text 버튼 역할 분리 ──────────────────────
// M3에서 Outlined Button은 Secondary 액션을 표현합니다.
// 상태 레이어(State Layer): Hover 8%, Pressed 12% 불투명도로 피드백을 줍니다.
export const Material3_버튼_역할_분리: Story = {
  name: 'Material 3 - Outlined vs Filled 역할 분리',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '560px' }}>
      <div>
        <p style={{ margin: '0 0 6px', fontSize: '12px', fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          M3 Button Type Roles
        </p>
        <p style={{ margin: '0 0 20px', fontSize: '13px', color: '#64748b', lineHeight: 1.6 }}>
          M3는 Elevated / Filled / Tonal / Outlined / Text 5단계 버튼을 정의합니다.
          OutlineButton은 Outlined 역할로 중간 강조의 보조 액션에 사용합니다.
        </p>
      </div>

      {/* 역할별 비교 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {[
          { label: 'Filled (Highest emphasis)', desc: '주요 액션 1개만', component: null, isSolid: true },
          { label: 'Outlined (Medium emphasis)', desc: '보조 액션, Secondary', component: null, isSolid: false },
        ].map((row) => (
          <div key={row.label} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', marginBottom: '2px' }}>{row.label}</div>
              <div style={{ fontSize: '11px', color: '#94a3b8' }}>{row.desc}</div>
            </div>
            {row.isSolid
              ? null
              : (
                <OutlineButton color="primary" size="medium">
                  <OutlineButton.Center>보조 액션</OutlineButton.Center>
                </OutlineButton>
              )
            }
          </div>
        ))}
      </div>

      {/* 실전: 폼 하단 버튼 쌍 */}
      <div style={{ background: '#f8fafc', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0' }}>
        <p style={{ margin: '0 0 4px', fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>M3 실전: 폼 하단 버튼 쌍</p>
        <p style={{ margin: '0 0 20px', fontSize: '12px', color: '#64748b' }}>
          Outlined(취소) + Filled(저장) 조합이 M3 권장 패턴입니다.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', background: '#fff', borderRadius: '12px', padding: '24px', border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>프로필 편집</div>
          <div style={{ height: '1px', background: '#f1f5f9' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151' }}>표시 이름</label>
              <input style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none' }} defaultValue="Heejun Kim" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151' }}>소개</label>
              <textarea style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none', resize: 'vertical', minHeight: '60px' }} defaultValue="Frontend Engineer & Design System Architect" />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
            <OutlineButton color="gray" size="medium">
              <OutlineButton.Center>취소 (Outlined)</OutlineButton.Center>
            </OutlineButton>
            <OutlineButton color="primary" size="medium">
              <OutlineButton.Center>저장 (Outlined Primary)</OutlineButton.Center>
            </OutlineButton>
          </div>
        </div>
      </div>

      {/* 실전: 3단계 버튼 계층 */}
      <div style={{ background: '#f8fafc', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0' }}>
        <p style={{ margin: '0 0 4px', fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>M3 실전: 알림 카드 + 3단계 액션</p>
        <p style={{ margin: '0 0 20px', fontSize: '12px', color: '#64748b' }}>
          중요도에 따라 Filled, Outlined, Text 버튼을 계층적으로 배치합니다.
        </p>
        <div style={{ background: '#fff', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a', marginBottom: '4px' }}>새 버전 업데이트 가능</div>
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '16px', lineHeight: 1.5 }}>
              Orbit UI v3.2.0이 출시되었습니다. 새로운 Material 3 컴포넌트와 성능 개선이 포함되어 있습니다.
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <OutlineButton color="black" size="small">
                <OutlineButton.Center>릴리즈 노트</OutlineButton.Center>
              </OutlineButton>
              <OutlineButton color="primary" size="small">
                <OutlineButton.Center>나중에</OutlineButton.Center>
              </OutlineButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}

// ─── Mantine: useDisclosure 패턴 (확인/취소 인터랙션) ─────────────────────────
// Mantine의 useDisclosure 훅은 열기/닫기 상태를 관리하는 패턴입니다.
// OutlineButton을 활용한 모달 트리거 + 확인 흐름을 구현합니다.
const DisclosurePatternRender = () => {
  const [step, setStep] = useState<'idle' | 'confirming' | 'done'>('idle')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '360px' }}>
      <p style={{ margin: 0, fontSize: '12px', fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        Mantine useDisclosure 패턴
      </p>

      {step === 'idle' && (
        <div style={{ padding: '24px', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>계정 삭제</div>
          <div style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5 }}>
            이 작업을 수행하기 전에 확인이 필요합니다. Outlined 버튼으로 첫 단계를 시작합니다.
          </div>
          <OutlineButton color="black" size="medium" onClick={() => setStep('confirming')}>
            <OutlineButton.Center>계정 삭제 요청</OutlineButton.Center>
          </OutlineButton>
        </div>
      )}

      {step === 'confirming' && (
        <div style={{ padding: '24px', background: '#fff', borderRadius: '12px', border: '2px solid #ef4444', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#dc2626' }}>정말 삭제하시겠습니까?</div>
          <div style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5 }}>
            이 작업은 되돌릴 수 없습니다. 모든 데이터가 영구 삭제됩니다.
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <OutlineButton color="gray" size="medium" onClick={() => setStep('idle')}>
              <OutlineButton.Center>취소</OutlineButton.Center>
            </OutlineButton>
            <OutlineButton color="black" size="medium" onClick={() => setStep('done')}>
              <OutlineButton.Center>삭제 확인</OutlineButton.Center>
            </OutlineButton>
          </div>
        </div>
      )}

      {step === 'done' && (
        <div style={{ padding: '24px', background: '#f0fdf4', borderRadius: '12px', border: '1px solid #86efac', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ width: '48px', height: '48px', background: '#dcfce7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M20 6 9 17l-5-5" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#15803d' }}>삭제 요청 완료</div>
          <div style={{ fontSize: '12px', color: '#64748b' }}>30일 이내 계정이 삭제됩니다.</div>
          <OutlineButton color="gray" size="small" onClick={() => setStep('idle')}>
            <OutlineButton.Center>처음으로</OutlineButton.Center>
          </OutlineButton>
        </div>
      )}
    </div>
  )
}

export const Mantine_useDisclosure_패턴: Story = {
  name: 'Mantine - useDisclosure 패턴 (단계별 확인 흐름)',
  render: () => <DisclosurePatternRender />,
}

// ─── Tailwind UI: 버튼 그룹 패턴 ────────────────────────────────────────────
// Tailwind UI Button Group 패턴: 연관된 액션을 인라인으로 묶어 컴팩트하게 표시합니다.
// 파일 시스템 툴바, 에디터 포맷 버튼, 페이지 네비게이션에 활용됩니다.
export const Tailwind_버튼_그룹: Story = {
  name: 'Tailwind UI - 버튼 그룹 패턴 (인접 버튼 묶음)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '560px' }}>
      <div>
        <p
          style={{
            color: '#94a3b8',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.06em',
            marginBottom: '12px',
            textTransform: 'uppercase',
          }}
        >
          Pagination Controls
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
          <OutlineButton
            color="black"
            size="medium"
            style={{ borderRadius: '8px 0 0 8px', borderRight: 'none' }}
          >
            <OutlineButton.Center>이전</OutlineButton.Center>
          </OutlineButton>
          <OutlineButton
            color="black"
            size="medium"
            style={{ borderRadius: 0, borderRight: 'none' }}
          >
            <OutlineButton.Center>1</OutlineButton.Center>
          </OutlineButton>
          <OutlineButton
            color="primary"
            size="medium"
            style={{ borderRadius: 0, borderRight: 'none' }}
          >
            <OutlineButton.Center>2</OutlineButton.Center>
          </OutlineButton>
          <OutlineButton
            color="black"
            size="medium"
            style={{ borderRadius: 0, borderRight: 'none' }}
          >
            <OutlineButton.Center>3</OutlineButton.Center>
          </OutlineButton>
          <OutlineButton
            color="black"
            size="medium"
            style={{ borderRadius: '0 8px 8px 0' }}
          >
            <OutlineButton.Center>다음</OutlineButton.Center>
          </OutlineButton>
        </div>
      </div>

      <div>
        <p
          style={{
            color: '#94a3b8',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.06em',
            marginBottom: '12px',
            textTransform: 'uppercase',
          }}
        >
          Action Toolbar
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <OutlineButton color="black" size="small">
            <OutlineButton.Center>내보내기</OutlineButton.Center>
          </OutlineButton>
          <OutlineButton color="black" size="small">
            <OutlineButton.Center>필터</OutlineButton.Center>
          </OutlineButton>
          <OutlineButton color="black" size="small">
            <OutlineButton.Center>정렬</OutlineButton.Center>
          </OutlineButton>
          <div style={{ width: '1px', height: '20px', background: '#e2e8f0', margin: '0 4px' }} />
          <OutlineButton color="gray" size="small">
            <OutlineButton.Center>초기화</OutlineButton.Center>
          </OutlineButton>
        </div>
      </div>
    </div>
  ),
}

// ─── Tailwind UI: 3열 레이아웃 폼 내 보조 액션 패턴 ─────────────────────────
// Tailwind UI Form Layout의 레이블 + 설명 + 액션 3열 구조에서
// OutlineButton은 보조 액션(취소, 초기화)을 담당합니다.
function FormLayoutRender() {
  const [saved, setSaved] = useState(false)
  const [name, setName] = useState('김준혁')
  const [email, setEmail] = useState('hjun@example.com')
  const [bio, setBio] = useState('')

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleReset = () => {
    setName('김준혁')
    setEmail('hjun@example.com')
    setBio('')
  }

  return (
    <div style={{ maxWidth: '640px', display: 'flex', flexDirection: 'column', gap: '0' }}>
      <div
        style={{
          borderBottom: '1px solid #e2e8f0',
          marginBottom: '24px',
          paddingBottom: '16px',
        }}
      >
        <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>프로필 설정</div>
        <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
          공개 프로필 정보를 관리합니다.
        </div>
      </div>

      {[
        {
          label: '이름',
          desc: '공개 프로필에 표시됩니다.',
          input: (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '14px',
                color: '#0f172a',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          ),
        },
        {
          label: '이메일',
          desc: '계정 알림을 수신합니다.',
          input: (
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '14px',
                color: '#0f172a',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          ),
        },
        {
          label: '자기소개',
          desc: '300자 이내로 작성하세요.',
          input: (
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '14px',
                color: '#0f172a',
                outline: 'none',
                resize: 'vertical',
                boxSizing: 'border-box',
              }}
            />
          ),
        },
      ].map((field) => (
        <div
          key={field.label}
          style={{
            display: 'grid',
            gridTemplateColumns: '160px 1fr',
            gap: '16px',
            marginBottom: '20px',
            alignItems: 'start',
          }}
        >
          <div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>{field.label}</div>
            <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>{field.desc}</div>
          </div>
          <div>{field.input}</div>
        </div>
      ))}

      <div
        style={{
          borderTop: '1px solid #e2e8f0',
          display: 'flex',
          gap: '8px',
          justifyContent: 'flex-end',
          paddingTop: '20px',
        }}
      >
        <OutlineButton color="gray" size="medium" onClick={handleReset}>
          <OutlineButton.Center>초기화</OutlineButton.Center>
        </OutlineButton>
        <OutlineButton color="black" size="medium">
          <OutlineButton.Center>취소</OutlineButton.Center>
        </OutlineButton>
        <OutlineButton color="primary" size="medium" onClick={handleSave}>
          <OutlineButton.Center>{saved ? '저장됨' : '저장'}</OutlineButton.Center>
        </OutlineButton>
      </div>
    </div>
  )
}

export const Tailwind_폼_레이아웃_보조_액션: Story = {
  name: 'Tailwind UI - 3열 폼 레이아웃 내 보조 액션 패턴',
  render: () => <FormLayoutRender />,
}

// ─── Mantine: 로딩 상태 패턴 ─────────────────────────────────────────────────
// Mantine의 Button loading prop 패턴: 비동기 작업 실행 중 버튼 비활성 + 스피너 표시
// OutlineButton의 loading prop으로 동일한 UX를 구현합니다.
function LoadingPatternRender() {
  const [loadingKey, setLoadingKey] = useState<string | null>(null)

  const simulateAction = (key: string, delay: number) => {
    setLoadingKey(key)
    setTimeout(() => setLoadingKey(null), delay)
  }

  const actions: { key: string; label: string; desc: string; color: OutlineButtonProps['color']; delay: number }[] = [
    { key: 'export', label: '내보내기', desc: 'CSV/JSON 파일 생성', color: 'black', delay: 2000 },
    { key: 'sync', label: '동기화', desc: '원격 서버와 데이터 동기화', color: 'primary', delay: 1500 },
    { key: 'validate', label: '유효성 검사', desc: '폼 데이터 서버 검증', color: 'gray', delay: 1000 },
  ]

  return (
    <div style={{ maxWidth: 400 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>
        Mantine Button loading prop 패턴
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {actions.map((action) => {
          const isLoading = loadingKey === action.key
          return (
            <div
              key={action.key}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: '14px 16px',
                borderRadius: 10,
                border: '1px solid #e2e8f0',
                background: '#fff',
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{action.label}</div>
                <div style={{ fontSize: 11, color: '#94a3b8' }}>{action.desc}</div>
              </div>
              <OutlineButton
                color={action.color}
                size="small"
                loading={isLoading}
                onClick={() => simulateAction(action.key, action.delay)}
                disabled={loadingKey !== null && loadingKey !== action.key}
              >
                <OutlineButton.Center>
                  {isLoading ? '처리 중...' : action.label}
                </OutlineButton.Center>
              </OutlineButton>
            </div>
          )
        })}
      </div>
      <div style={{ marginTop: 12, fontSize: 11, color: '#94a3b8' }}>
        Mantine — loading prop으로 버튼 스피너 + 비활성화 동시 처리
      </div>
    </div>
  )
}

export const Mantine_로딩_상태_패턴: Story = {
  name: 'Mantine - 로딩 상태 패턴 (비동기 액션 피드백)',
  render: () => <LoadingPatternRender />,
}

// ─── Ant Design: 뷰 전환 도구 모음 ───────────────────────────────────────────
// Ant Design의 Radio.Group + Button 조합: 목록/그리드/표 뷰 전환
// OutlineButton을 선택 그룹처럼 사용하는 Segmented-like 패턴
type ViewMode = 'list' | 'grid' | 'table'

function ViewSwitcherRender() {
  const [view, setView] = useState<ViewMode>('grid')
  const [sort, setSort] = useState<string>('newest')

  const views: { key: ViewMode; icon: string; label: string }[] = [
    { key: 'list', icon: '≡', label: '목록' },
    { key: 'grid', icon: '⊞', label: '그리드' },
    { key: 'table', icon: '⊟', label: '표' },
  ]

  const sortOptions = ['newest', 'oldest', 'name', 'size']
  const sortLabels: Record<string, string> = { newest: '최신순', oldest: '오래된순', name: '이름순', size: '크기순' }

  const mockItems = Array.from({ length: 6 }, (_, i) => ({ id: i + 1, name: `컴포넌트 ${i + 1}`, type: i % 3 === 0 ? 'Layout' : i % 3 === 1 ? 'Input' : 'Display' }))

  return (
    <div style={{ maxWidth: 520 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>
        Ant Design Radio.Group — 뷰 전환 패턴
      </div>

      {/* Toolbar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
        padding: '10px 14px',
        borderRadius: 10,
        border: '1px solid #e2e8f0',
        background: '#f8fafc',
      }}>
        {/* View toggle */}
        <div style={{ display: 'flex', gap: 0 }}>
          {views.map((v, i) => (
            <OutlineButton
              key={v.key}
              color={view === v.key ? 'primary' : 'black'}
              size="small"
              onClick={() => setView(v.key)}
              style={{
                borderRadius: i === 0 ? '8px 0 0 8px' : i === views.length - 1 ? '0 8px 8px 0' : '0',
                borderRight: i < views.length - 1 ? 'none' : undefined,
              }}
            >
              <OutlineButton.Leading>
                <span style={{ fontSize: 12 }}>{v.icon}</span>
              </OutlineButton.Leading>
              <OutlineButton.Center>{v.label}</OutlineButton.Center>
            </OutlineButton>
          ))}
        </div>

        {/* Sort select */}
        <div style={{ display: 'flex', gap: 4 }}>
          {sortOptions.map((s) => (
            <button
              key={s}
              onClick={() => setSort(s)}
              style={{
                padding: '4px 8px',
                borderRadius: 6,
                border: 'none',
                background: sort === s ? '#6366f1' : 'transparent',
                color: sort === s ? '#fff' : '#64748b',
                fontSize: 11,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {sortLabels[s]}
            </button>
          ))}
        </div>
      </div>

      {/* Content area */}
      {view === 'grid' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {mockItems.map((item) => (
            <div key={item.id} style={{ padding: '14px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', marginBottom: 4 }}>{item.type}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{item.name}</div>
            </div>
          ))}
        </div>
      )}
      {view === 'list' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {mockItems.map((item) => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff' }}>
              <div style={{ width: 32, height: 32, borderRadius: 6, background: '#f0f1ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#6366f1' }}>{item.id}</div>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#1e293b', flex: 1 }}>{item.name}</span>
              <span style={{ fontSize: 11, color: '#94a3b8' }}>{item.type}</span>
            </div>
          ))}
        </div>
      )}
      {view === 'table' && (
        <div style={{ borderRadius: 8, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '40px 1fr 100px', background: '#f8fafc', padding: '8px 14px', fontSize: 11, fontWeight: 700, color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>
            <span>#</span><span>이름</span><span>유형</span>
          </div>
          {mockItems.map((item, i) => (
            <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '40px 1fr 100px', padding: '9px 14px', fontSize: 13, color: '#1e293b', borderBottom: i < mockItems.length - 1 ? '1px solid #f8fafc' : 'none', background: '#fff' }}>
              <span style={{ color: '#94a3b8' }}>{item.id}</span>
              <span style={{ fontWeight: 500 }}>{item.name}</span>
              <span style={{ color: '#64748b' }}>{item.type}</span>
            </div>
          ))}
        </div>
      )}
      <div style={{ marginTop: 10, fontSize: 11, color: '#94a3b8' }}>
        Ant Design — 버튼 그룹으로 뷰 전환 + 정렬 옵션 패턴
      </div>
    </div>
  )
}

export const Ant_뷰_전환_도구모음: Story = {
  name: 'Ant Design - 뷰 전환 도구 모음 (목록/그리드/표)',
  render: () => <ViewSwitcherRender />,
}

// ─── Mantine: 알림 액션 카드 패턴 ───────────────────────────────────────────
// Mantine의 Notification 컴포넌트처럼 알림 카드에 OutlineButton 액션 배치
function NotificationActionsRender() {
  const [dismissed, setDismissed] = useState<number[]>([])

  const notifications = [
    {
      id: 1,
      type: 'update',
      title: '업데이트 가능',
      message: 'Orbit UI 3.3.0이 출시되었습니다. 새 기능과 버그 수정이 포함됩니다.',
      actions: [
        { label: '지금 업데이트', color: 'primary' as const },
        { label: '나중에', color: 'gray' as const },
      ],
    },
    {
      id: 2,
      type: 'invite',
      title: '팀 초대',
      message: '김디자인님이 "Orbit UI Team"에 초대했습니다.',
      actions: [
        { label: '수락', color: 'primary' as const },
        { label: '거절', color: 'black' as const },
      ],
    },
    {
      id: 3,
      type: 'warning',
      title: '저장 공간 부족',
      message: '저장 공간의 90%가 사용 중입니다. 불필요한 파일을 삭제하세요.',
      actions: [
        { label: '관리하기', color: 'black' as const },
        { label: '무시', color: 'gray' as const },
      ],
    },
  ]

  const typeConfig: Record<string, { bg: string; border: string; dot: string }> = {
    update: { bg: '#f0f1ff', border: '#c7d2fe', dot: '#6366f1' },
    invite: { bg: '#f0fdf4', border: '#bbf7d0', dot: '#10b981' },
    warning: { bg: '#fffbeb', border: '#fde68a', dot: '#f59e0b' },
  }

  return (
    <div style={{ maxWidth: 400 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>
        Mantine Notification — 인라인 액션 OutlineButton 패턴
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {notifications
          .filter((n) => !dismissed.includes(n.id))
          .map((notif) => {
            const cfg = typeConfig[notif.type]
            return (
              <div
                key={notif.id}
                style={{
                  padding: '14px 16px',
                  borderRadius: 12,
                  border: `1px solid ${cfg.border}`,
                  background: cfg.bg,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: cfg.dot, marginTop: 4, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', marginBottom: 2 }}>{notif.title}</div>
                    <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.5 }}>{notif.message}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 6, paddingLeft: 18 }}>
                  {notif.actions.map((action) => (
                    <OutlineButton
                      key={action.label}
                      color={action.color}
                      size="small"
                      onClick={() => setDismissed((prev) => [...prev, notif.id])}
                    >
                      <OutlineButton.Center>{action.label}</OutlineButton.Center>
                    </OutlineButton>
                  ))}
                </div>
              </div>
            )
          })}
        {dismissed.length === notifications.length && (
          <div style={{ padding: '24px', textAlign: 'center', fontSize: 13, color: '#94a3b8' }}>
            모든 알림을 처리했습니다.
            <button
              onClick={() => setDismissed([])}
              style={{ display: 'block', margin: '8px auto 0', fontSize: 12, color: '#6366f1', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              초기화
            </button>
          </div>
        )}
      </div>
      <div style={{ marginTop: 10, fontSize: 11, color: '#94a3b8' }}>
        Mantine Notification — 알림 카드 인라인 OutlineButton 액션 패턴
      </div>
    </div>
  )
}

export const Mantine_알림_액션_카드: Story = {
  name: 'Mantine - 알림 카드 인라인 액션 OutlineButton 패턴',
  render: () => <NotificationActionsRender />,
}
