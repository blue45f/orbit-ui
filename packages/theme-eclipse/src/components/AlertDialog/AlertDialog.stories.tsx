import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { DeleteLineIcon, AlertLineIcon, NotificationCheckFillIcon } from '@heejun-com/icons'

import { FilledButton as Button } from '../SolidButton'
import { TextField } from '../TextField'

import { Alert } from './AlertDialog'

const meta = {
  title: 'eclipse/Feedback/Alert',
  component: Alert,
  tags: ['autodocs'],
  args: {
    defaultIsPresented: false,
  },
  argTypes: {},
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const 기본: Story = {
  render: (args: React.ComponentProps<typeof Alert>) => (
    <div style={{ padding: '40px', display: 'flex', justifyContent: 'center' }}>
      <Alert {...args}>
        <Alert.Trigger asChild>
          <Button color="primary" size="medium">
            <Button.Center>열기</Button.Center>
          </Button>
        </Alert.Trigger>
        <Alert.Top>
          <Alert.Title>이용 정책이 업데이트되었습니다.</Alert.Title>
          <Alert.Description>내용을 확인하신 후 동의해 주세요.</Alert.Description>
        </Alert.Top>
        <Alert.Bottom direction="horizontal">
          <Alert.Close asChild>
            <Button color="black" size="large" width="100%">
              <Button.Center>확인</Button.Center>
            </Button>
          </Alert.Close>
        </Alert.Bottom>
      </Alert>
    </div>
  ),
}

export const 컨펌: Story = {
  render: (args: React.ComponentProps<typeof Alert>) => {
    return (
      <div style={{ padding: '40px', display: 'flex', justifyContent: 'center' }}>
        <Alert {...args}>
          <Alert.Trigger asChild>
            <Button color="primary" size="medium">
              <Button.Center>열기</Button.Center>
            </Button>
          </Alert.Trigger>
          <Alert.Top>
            <Alert.Title>요청을 취소하시겠어요?</Alert.Title>
            <form
              id="orbit-form"
              onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.target as HTMLFormElement)
                const reason = formData.get('reason')
                alert(`Form 제출 완료. ${reason?.toString()}`)
              }}
            >
              <Alert.Description>
                요청 취소 사유를 입력하시려면 아래에 사유를 입력해 주세요.
              </Alert.Description>
              <div style={{ height: 16 }} />
              <TextField placeholder="예) 이번 달 예산 초과" name="reason" />
            </form>
          </Alert.Top>
          <Alert.Bottom direction="horizontal">
            <Alert.Close asChild>
              <Button color="gray" size="large" width="100%">
                <Button.Center>작성 취소</Button.Center>
              </Button>
            </Alert.Close>
            <Alert.Action asChild>
              <Button type="submit" form="orbit-form" color="black" size="large" width="100%">
                <Button.Center>제출하기</Button.Center>
              </Button>
            </Alert.Action>
          </Alert.Bottom>
        </Alert>
      </div>
    )
  },
}

export const 버튼세로정렬: Story = {
  render: (args: React.ComponentProps<typeof Alert>) => {
    return (
      <div style={{ padding: '40px', display: 'flex', justifyContent: 'center' }}>
        <Alert {...args}>
          <Alert.Trigger asChild>
            <Button color="primary" size="medium">
              <Button.Center>열기</Button.Center>
            </Button>
          </Alert.Trigger>
          <Alert.Top>
            <Alert.Title>공유 계정 사용을 활성화할까요?</Alert.Title>
            <Alert.Description>
              공유 계정을 사용하면 멤버십 혜택을 받을 수 없어요.
            </Alert.Description>
          </Alert.Top>
          <Alert.Bottom direction="vertical">
            <Alert.Action asChild>
              <Button color="black" size="large" width="100%">
                <Button.Center>공유 계정 활성화</Button.Center>
              </Button>
            </Alert.Action>
            <Alert.Close asChild>
              <Button color="gray" size="large" width="100%">
                <Button.Center>취소</Button.Center>
              </Button>
            </Alert.Close>
          </Alert.Bottom>
        </Alert>
      </div>
    )
  },
}

export const 디자인QA = {
  args: {
    footerDirection: 'horizontal',
    titleText: '공유 계정 사용을 활성화할까요?',
    descriptionText: '공유 계정을 사용하면 멤버십 혜택을 받을 수 없어요.',
    buttonText: '공유 계정 활성화',
    buttonCount: 2,
  },
  argTypes: {
    footerDirection: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'] as const,
    },
    buttonCount: {
      control: 'number',
      min: 1,
      max: 2,
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  render: ({
    footerDirection,
    titleText,
    descriptionText,
    buttonText,
    buttonCount,
    ...rest
  }: any) => {
    return (
      <div style={{ padding: '40px', display: 'flex', justifyContent: 'center' }}>
        <Alert {...rest}>
          <Alert.Trigger asChild>
            <Button color="primary" size="medium">
              <Button.Center>열기</Button.Center>
            </Button>
          </Alert.Trigger>
          <Alert.Top>
            <Alert.Title>{titleText}</Alert.Title>
            <Alert.Description>{descriptionText}</Alert.Description>
          </Alert.Top>
          <Alert.Bottom direction={footerDirection}>
            <Alert.Action asChild>
              <Button color="black" size="large" width="100%">
                <Button.Center>{buttonText}</Button.Center>
              </Button>
            </Alert.Action>
            {buttonCount === 2 && (
              <Alert.Close asChild>
                <Button color="gray" size="large" width="100%">
                  <Button.Center>취소</Button.Center>
                </Button>
              </Alert.Close>
            )}
          </Alert.Bottom>
        </Alert>
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   Ant Design 벤치마크: 파괴적 액션 확인 다이얼로그
   Ant Design의 Popconfirm/Modal.confirm 패턴 — 삭제/영구 제거 등
   위험 액션에 대한 명확한 경고와 의도 확인 UX를 Orbit UI로 구현
-------------------------------------------------------------------------- */
const AntDestructiveDemo = () => {
  const [deleted, setDeleted] = useState(false)

  return (
    <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      {deleted ? (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '14px 20px', borderRadius: 10,
          background: '#fef2f2', border: '1px solid #fecaca',
          fontSize: 14, color: '#dc2626', fontWeight: 500,
        }}>
          <DeleteLineIcon style={{ width: 18, height: 18 }} />
          프로젝트가 영구 삭제되었습니다.
        </div>
      ) : (
        <Alert defaultIsPresented={false}>
          <Alert.Trigger asChild>
            <Button
              color="primary"
              size="medium"
              style={{ background: '#ef4444', borderColor: '#ef4444' }}
            >
              <Button.Center>프로젝트 삭제</Button.Center>
            </Button>
          </Alert.Trigger>
          <Alert.Top>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: '#fef2f2', border: '2px solid #fecaca',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <DeleteLineIcon style={{ width: 18, height: 18, color: '#ef4444' }} />
              </div>
              <Alert.Title>프로젝트를 삭제하시겠습니까?</Alert.Title>
            </div>
            <Alert.Description>
              이 작업은 되돌릴 수 없습니다. 프로젝트와 연결된 모든 데이터, 이슈, 코멘트가 영구적으로 삭제됩니다.
            </Alert.Description>
          </Alert.Top>
          <Alert.Bottom direction="horizontal">
            <Alert.Close asChild>
              <Button color="gray" size="large" width="100%">
                <Button.Center>취소</Button.Center>
              </Button>
            </Alert.Close>
            <Alert.Action asChild>
              <Button
                color="primary"
                size="large"
                width="100%"
                style={{ background: '#ef4444', borderColor: '#ef4444' }}
                onClick={() => setDeleted(true)}
              >
                <Button.Center>영구 삭제</Button.Center>
              </Button>
            </Alert.Action>
          </Alert.Bottom>
        </Alert>
      )}
      <p style={{ margin: 0, fontSize: 12, color: '#94a3b8', textAlign: 'center' }}>
        Ant Design Modal.confirm 패턴 — 파괴적 액션에 위험 경고 아이콘과 적색 CTA
      </p>
    </div>
  )
}

export const Ant_파괴적_액션_확인: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Ant Design의 Modal.confirm 패턴. 삭제/영구 제거 등 파괴적 액션 전 위험 아이콘 + 적색 버튼으로 의도적 마찰을 제공합니다. ' +
          'Alert.Action onSelect 후 상태를 업데이트해 결과를 시각화합니다.',
      },
    },
  },
  render: () => <AntDestructiveDemo />,
}

/* --------------------------------------------------------------------------
   Mantine 벤치마크: 단계별 확인 다이얼로그 (입력 검증 포함)
   Mantine의 confirmModal + 입력 검증 패턴 — 민감한 작업에 
   사용자가 특정 텍스트를 입력해야만 실행되도록 하는 UX
-------------------------------------------------------------------------- */
const ManitneConfirmTypingDemo = () => {
  const [inputVal, setInputVal] = useState('')
  const [confirmed, setConfirmed] = useState(false)
  const targetText = 'DELETE'

  const isMatch = inputVal.trim().toUpperCase() === targetText

  return (
    <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      {confirmed ? (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '14px 20px', borderRadius: 10,
          background: '#f0fdf4', border: '1px solid #bbf7d0',
          fontSize: 14, color: '#15803d', fontWeight: 500,
        }}>
          <NotificationCheckFillIcon style={{ width: 18, height: 18 }} />
          작업이 실행되었습니다.
        </div>
      ) : (
        <Alert defaultIsPresented={false}>
          <Alert.Trigger asChild>
            <Button color="primary" size="medium">
              <Button.Center>계정 초기화</Button.Center>
            </Button>
          </Alert.Trigger>
          <Alert.Top>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: '#fffbeb', border: '2px solid #fde68a',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <AlertLineIcon style={{ width: 18, height: 18, color: '#d97706' }} />
              </div>
              <Alert.Title>정말 계속하시겠습니까?</Alert.Title>
            </div>
            <Alert.Description>
              이 작업은 계정의 모든 설정과 데이터를 초기화합니다. 계속하려면 아래에{' '}
              <strong style={{ color: '#ef4444', fontFamily: 'monospace' }}>DELETE</strong>를 입력하세요.
            </Alert.Description>
            <div style={{ marginTop: 14 }}>
              <TextField
                placeholder="DELETE 입력"
                value={inputVal}
                onChange={(e) => setInputVal((e.target as HTMLInputElement).value)}
              />
              {inputVal.length > 0 && !isMatch && (
                <p style={{ margin: '6px 0 0', fontSize: 12, color: '#ef4444' }}>
                  정확히 DELETE를 입력해 주세요.
                </p>
              )}
            </div>
          </Alert.Top>
          <Alert.Bottom direction="horizontal">
            <Alert.Close asChild>
              <Button color="gray" size="large" width="100%" onClick={() => setInputVal('')}>
                <Button.Center>취소</Button.Center>
              </Button>
            </Alert.Close>
            <Alert.Action asChild>
              <Button
                color="primary"
                size="large"
                width="100%"
                disabled={!isMatch}
                style={isMatch ? { background: '#ef4444', borderColor: '#ef4444' } : {}}
                onClick={() => { if (isMatch) setConfirmed(true) }}
              >
                <Button.Center>초기화 실행</Button.Center>
              </Button>
            </Alert.Action>
          </Alert.Bottom>
        </Alert>
      )}
      <p style={{ margin: 0, fontSize: 12, color: '#94a3b8', textAlign: 'center' }}>
        Mantine confirmModal 패턴 — 민감한 작업에 텍스트 입력 검증으로 의도 확인
      </p>
    </div>
  )
}

export const Mantine_입력검증_확인: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Mantine의 confirmModal 패턴 변형. 위험 작업 실행 전 사용자가 "DELETE"를 직접 입력해야만 실행 버튼이 활성화됩니다. ' +
          'GitHub 저장소 삭제, Vercel 프로젝트 제거 등 고위험 작업에 적용되는 UX 패턴입니다.',
      },
    },
  },
  render: () => <ManitneConfirmTypingDemo />,
}

/* --------------------------------------------------------------------------
   Ant Design 벤치마크: 비동기 작업 확인 다이얼로그 (로딩 상태)
   Ant Design Modal의 okButtonProps.loading 패턴 — 서버 요청 중
   버튼을 비활성화하고 로딩 상태로 전환하는 UX
-------------------------------------------------------------------------- */
const AsyncConfirmDemo = () => {
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const handleConfirm = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setDone(true)
    }, 1800)
  }

  return (
    <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      {done ? (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '14px 20px', borderRadius: 10,
          background: '#f0fdf4', border: '1px solid #bbf7d0',
          fontSize: 14, color: '#15803d', fontWeight: 500,
        }}>
          <NotificationCheckFillIcon style={{ width: 18, height: 18 }} />
          요청이 성공적으로 처리되었습니다.
        </div>
      ) : (
        <Alert defaultIsPresented={false}>
          <Alert.Trigger asChild>
            <Button color="primary" size="medium">
              <Button.Center>배포 요청</Button.Center>
            </Button>
          </Alert.Trigger>
          <Alert.Top>
            <Alert.Title>운영 환경에 배포하시겠습니까?</Alert.Title>
            <Alert.Description>
              현재 스테이징 빌드(v2.4.1-rc.3)를 운영 환경에 배포합니다.
              배포 완료까지 최대 5분이 소요될 수 있습니다.
            </Alert.Description>
            <div style={{
              marginTop: 14, padding: '10px 14px', borderRadius: 8,
              background: '#f8fafc', border: '1px solid #e2e8f0', fontSize: 12,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ color: '#64748b' }}>빌드</span>
                <code style={{ color: '#6366f1', fontWeight: 600 }}>v2.4.1-rc.3</code>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ color: '#64748b' }}>브랜치</span>
                <code style={{ color: '#475569' }}>main</code>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>환경</span>
                <span style={{ color: '#15803d', fontWeight: 600 }}>Production</span>
              </div>
            </div>
          </Alert.Top>
          <Alert.Bottom direction="horizontal">
            <Alert.Close asChild>
              <Button color="gray" size="large" width="100%" disabled={loading}>
                <Button.Center>취소</Button.Center>
              </Button>
            </Alert.Close>
            <Alert.Action asChild>
              <Button
                color="primary"
                size="large"
                width="100%"
                disabled={loading}
                onClick={handleConfirm}
              >
                <Button.Center>{loading ? '배포 중...' : '배포 시작'}</Button.Center>
              </Button>
            </Alert.Action>
          </Alert.Bottom>
        </Alert>
      )}
      <p style={{ margin: 0, fontSize: 12, color: '#94a3b8', textAlign: 'center' }}>
        Ant Design Modal loading 패턴 — 비동기 처리 중 버튼 비활성화 및 상태 피드백
      </p>
    </div>
  )
}

export const Ant_비동기_배포_확인: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Ant Design Modal의 okButtonProps.loading 패턴. 서버 요청 중 버튼을 비활성화하고 로딩 텍스트로 전환합니다. ' +
          '배포 정보 요약 카드를 포함해 사용자가 액션 내용을 한눈에 확인할 수 있습니다.',
      },
    },
  },
  render: () => <AsyncConfirmDemo />,
}

/* --------------------------------------------------------------------------
   Vercel Design 벤치마크: 팀 멤버 제거 확인
   Vercel 팀 설정에서 멤버 제거 시 나타나는 확인 다이얼로그 패턴
   구성원 이름과 권한을 다이얼로그에 명시해 실수를 방지하는 UX
-------------------------------------------------------------------------- */
const VercelRemoveMemberDemo = () => {
  const [removed, setRemoved] = useState(false)

  const member = { name: '이서연', email: 'seoyeon@example.com', role: 'Developer' }

  return (
    <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      {removed ? (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '14px 20px', borderRadius: 10,
          background: '#f0fdf4', border: '1px solid #bbf7d0',
          fontSize: 14, color: '#15803d', fontWeight: 500,
        }}>
          <NotificationCheckFillIcon style={{ width: 18, height: 18 }} />
          {member.name}님이 팀에서 제거되었습니다.
        </div>
      ) : (
        <Alert defaultIsPresented={false}>
          <Alert.Trigger asChild>
            <Button color="primary" size="medium">
              <Button.Center>멤버 제거</Button.Center>
            </Button>
          </Alert.Trigger>
          <Alert.Top>
            <Alert.Title>팀 멤버를 제거하시겠습니까?</Alert.Title>
            <Alert.Description>
              아래 멤버가 팀에서 제거되며, 모든 프로젝트 접근 권한을 잃게 됩니다.
            </Alert.Description>
            <div style={{
              marginTop: 14, padding: '12px 16px', borderRadius: 8,
              background: '#f8fafc', border: '1px solid #e2e8f0',
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 700, fontSize: 15, flexShrink: 0,
              }}>
                {member.name[0]}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{member.name}</div>
                <div style={{ fontSize: 12, color: '#64748b' }}>{member.email}</div>
              </div>
              <div style={{
                marginLeft: 'auto', fontSize: 11, fontWeight: 600,
                padding: '2px 8px', borderRadius: 6,
                background: '#e0e7ff', color: '#4338ca',
              }}>
                {member.role}
              </div>
            </div>
          </Alert.Top>
          <Alert.Bottom direction="horizontal">
            <Alert.Close asChild>
              <Button color="gray" size="large" width="100%">
                <Button.Center>취소</Button.Center>
              </Button>
            </Alert.Close>
            <Alert.Action asChild>
              <Button
                color="primary"
                size="large"
                width="100%"
                style={{ background: '#ef4444', borderColor: '#ef4444' }}
                onClick={() => setRemoved(true)}
              >
                <Button.Center>제거 확인</Button.Center>
              </Button>
            </Alert.Action>
          </Alert.Bottom>
        </Alert>
      )}
      <p style={{ margin: 0, fontSize: 12, color: '#94a3b8', textAlign: 'center' }}>
        Vercel 팀 설정 패턴 — 멤버 정보 카드를 다이얼로그 내에 표시해 실수 방지
      </p>
    </div>
  )
}

export const Vercel_팀_멤버_제거: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Vercel 팀 설정의 멤버 제거 확인 다이얼로그 패턴. 제거할 대상의 이름·이메일·권한을 카드로 명시해 의도치 않은 삭제를 방지합니다.',
      },
    },
  },
  render: () => <VercelRemoveMemberDemo />,
}

/* --------------------------------------------------------------------------
   Vercel Design 벤치마크: 요금제 다운그레이드 경고
   Vercel Pro → Hobby 다운그레이드 시 손실되는 기능 목록을 명시하는 패턴
-------------------------------------------------------------------------- */
const VercelDowngradeDemo = () => {
  const [downgraded, setDowngraded] = useState(false)

  const lostFeatures = [
    '팀 협업 기능 (멤버 초대 불가)',
    '커스텀 도메인 무제한',
    'Analytics 대시보드',
    '우선 지원 (Priority Support)',
  ]

  return (
    <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      {downgraded ? (
        <div style={{
          padding: '16px 20px', borderRadius: 10,
          background: '#fffbeb', border: '1px solid #fde68a',
          fontSize: 14, color: '#92400e', fontWeight: 500, maxWidth: 320, textAlign: 'center',
        }}>
          Hobby 플랜으로 변경되었습니다. 일부 기능이 비활성화됩니다.
        </div>
      ) : (
        <Alert defaultIsPresented={false}>
          <Alert.Trigger asChild>
            <Button color="primary" size="medium">
              <Button.Center>Hobby로 다운그레이드</Button.Center>
            </Button>
          </Alert.Trigger>
          <Alert.Top>
            <Alert.Title>Pro 플랜을 해지하시겠습니까?</Alert.Title>
            <Alert.Description>
              다운그레이드 시 다음 기능들을 더 이상 사용할 수 없습니다.
            </Alert.Description>
            <ul style={{ margin: '14px 0 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {lostFeatures.map((feature) => (
                <li
                  key={feature}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    fontSize: 13, color: '#475569',
                  }}
                >
                  <span style={{
                    width: 16, height: 16, borderRadius: '50%',
                    background: '#fef2f2', border: '1px solid #fecaca',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 9, color: '#ef4444', fontWeight: 700, flexShrink: 0,
                  }}>
                    ✕
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </Alert.Top>
          <Alert.Bottom direction="vertical">
            <Alert.Close asChild>
              <Button color="black" size="large" width="100%">
                <Button.Center>Pro 플랜 유지</Button.Center>
              </Button>
            </Alert.Close>
            <Alert.Action asChild>
              <Button color="gray" size="large" width="100%" onClick={() => setDowngraded(true)}>
                <Button.Center>Hobby로 변경</Button.Center>
              </Button>
            </Alert.Action>
          </Alert.Bottom>
        </Alert>
      )}
      <p style={{ margin: 0, fontSize: 12, color: '#94a3b8', textAlign: 'center' }}>
        Vercel 요금제 다운그레이드 패턴 — 손실 기능 목록 명시 + 유지 CTA 강조
      </p>
    </div>
  )
}

export const Vercel_요금제_다운그레이드: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Vercel 요금제 다운그레이드 확인 패턴. 손실되는 기능 목록을 체크리스트로 명시하고, 기본 CTA는 플랜 유지(긍정적 행동)로 배치합니다.',
      },
    },
  },
  render: () => <VercelDowngradeDemo />,
}

/* --------------------------------------------------------------------------
   Ant Design 벤치마크: 연속 단계 확인 (Multi-step confirm)
   Ant Design의 Steps + Modal 조합 패턴 — 위험 작업을 단계별로 확인
-------------------------------------------------------------------------- */
const AntMultiStepConfirmDemo = () => {
  const [step, setStep] = useState<0 | 1 | 2>(0)
  const [agreed, setAgreed] = useState(false)

  const STEPS = ['내용 확인', '약관 동의', '최종 확인']

  const reset = () => { setStep(0); setAgreed(false) }

  return (
    <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      {step === 2 && agreed ? (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '14px 20px', borderRadius: 10,
          background: '#f0fdf4', border: '1px solid #bbf7d0',
          fontSize: 14, color: '#15803d', fontWeight: 500,
        }}>
          <NotificationCheckFillIcon style={{ width: 18, height: 18 }} />
          법인 계좌 해지가 완료되었습니다.
        </div>
      ) : (
        <Alert defaultIsPresented={false} onOpenChange={(open) => { if (!open) reset() }}>
          <Alert.Trigger asChild>
            <Button color="primary" size="medium">
              <Button.Center>법인 계좌 해지</Button.Center>
            </Button>
          </Alert.Trigger>
          <Alert.Top>
            {/* Step indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 16 }}>
              {STEPS.map((label, i) => (
                <React.Fragment key={label}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <div style={{
                      width: 24, height: 24, borderRadius: '50%',
                      background: i <= step ? '#6366f1' : '#e2e8f0',
                      color: i <= step ? '#fff' : '#94a3b8',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 11, fontWeight: 700, transition: 'all 0.2s',
                    }}>
                      {i + 1}
                    </div>
                    <span style={{ fontSize: 10, color: i <= step ? '#6366f1' : '#94a3b8', whiteSpace: 'nowrap' }}>{label}</span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div style={{
                      flex: 1, height: 2, margin: '0 4px', marginBottom: 18,
                      background: i < step ? '#6366f1' : '#e2e8f0', transition: 'background 0.2s',
                    }} />
                  )}
                </React.Fragment>
              ))}
            </div>

            {step === 0 && (
              <>
                <Alert.Title>법인 계좌 해지 안내</Alert.Title>
                <Alert.Description>
                  해지 시 모든 자동이체가 중단되며, 잔여 포인트는 환급되지 않습니다. 계속하시려면 다음을 클릭하세요.
                </Alert.Description>
              </>
            )}
            {step === 1 && (
              <>
                <Alert.Title>약관 동의</Alert.Title>
                <Alert.Description>
                  해지 약관에 동의하셔야 다음 단계로 진행할 수 있습니다.
                </Alert.Description>
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 14, cursor: 'pointer', fontSize: 13, color: '#374151' }}>
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    style={{ width: 16, height: 16, cursor: 'pointer' }}
                  />
                  해지 약관 및 유의사항을 확인하였으며, 이에 동의합니다.
                </label>
              </>
            )}
            {step === 2 && (
              <>
                <Alert.Title>최종 확인</Alert.Title>
                <Alert.Description>
                  법인 계좌 해지를 최종 실행합니다. 이 작업은 되돌릴 수 없습니다.
                </Alert.Description>
              </>
            )}
          </Alert.Top>
          <Alert.Bottom direction="horizontal">
            {step === 0 ? (
              <Alert.Close asChild>
                <Button color="gray" size="large" width="100%">
                  <Button.Center>취소</Button.Center>
                </Button>
              </Alert.Close>
            ) : (
              <Button color="gray" size="large" width="100%" onClick={() => setStep((s) => (s - 1) as 0 | 1 | 2)}>
                <Button.Center>이전</Button.Center>
              </Button>
            )}
            {step < 2 ? (
              <Button
                color="primary"
                size="large"
                width="100%"
                disabled={step === 1 && !agreed}
                onClick={() => setStep((s) => (s + 1) as 0 | 1 | 2)}
              >
                <Button.Center>다음</Button.Center>
              </Button>
            ) : (
              <Alert.Action asChild>
                <Button
                  color="primary"
                  size="large"
                  width="100%"
                  style={{ background: '#ef4444', borderColor: '#ef4444' }}
                  onClick={() => setAgreed(true)}
                >
                  <Button.Center>해지 실행</Button.Center>
                </Button>
              </Alert.Action>
            )}
          </Alert.Bottom>
        </Alert>
      )}
      <p style={{ margin: 0, fontSize: 12, color: '#94a3b8', textAlign: 'center' }}>
        Ant Design Steps + Modal 패턴 — 위험 작업을 단계별 확인으로 분리
      </p>
    </div>
  )
}

export const Ant_다단계_확인_플로우: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Ant Design Steps + Modal 조합 패턴. 고위험 작업을 3단계로 분리해 각 단계에서 명시적 동의를 받습니다. 약관 동의 단계에서는 체크박스가 선택되어야 다음으로 진행됩니다.',
      },
    },
  },
  render: () => <AntMultiStepConfirmDemo />,
}

/* --------------------------------------------------------------------------
   Tailwind UI — 뉴스레터 구독 해지 확인
   단순 두 버튼 패턴, 파괴적 액션에 빨간색 강조
-------------------------------------------------------------------------- */
export const Tailwind_구독_해지_확인: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Tailwind UI modal 패턴. 파괴적 액션(구독 해지)을 명확한 색상(red)으로 강조하고, 취소 버튼을 왼쪽에 배치해 실수를 방지합니다.',
      },
    },
  },
  render: (args: React.ComponentProps<typeof Alert>) => (
    <div style={{ padding: '40px', display: 'flex', justifyContent: 'center' }}>
      <Alert {...args}>
        <Alert.Trigger asChild>
          <Button color="gray" size="medium">
            <Button.Center>구독 해지</Button.Center>
          </Button>
        </Alert.Trigger>
        <Alert.Top>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <span style={{ width: 36, height: 36, borderRadius: '50%', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <AlertLineIcon style={{ width: 18, height: 18, color: '#dc2626' }} />
            </span>
            <Alert.Title>뉴스레터 구독을 해지하시겠습니까?</Alert.Title>
          </div>
          <Alert.Description>
            구독 해지 시 주간 업데이트, 제품 소식 등 모든 이메일 수신이 중단됩니다. 언제든지 다시 구독할 수 있습니다.
          </Alert.Description>
        </Alert.Top>
        <Alert.Bottom direction="horizontal">
          <Alert.Close asChild>
            <Button color="gray" size="large" width="100%">
              <Button.Center>취소</Button.Center>
            </Button>
          </Alert.Close>
          <Alert.Action asChild>
            <Button
              color="black"
              size="large"
              width="100%"
              style={{ background: '#dc2626', borderColor: '#dc2626' }}
            >
              <Button.Center>구독 해지</Button.Center>
            </Button>
          </Alert.Action>
        </Alert.Bottom>
      </Alert>
    </div>
  ),
}

/* --------------------------------------------------------------------------
   Tailwind UI — 파일 영구 삭제 (입력 검증 패턴)
   파일명 직접 입력으로 실수 방지
-------------------------------------------------------------------------- */
const FileDeleteDemo = () => {
  const [inputVal, setInputVal] = React.useState('')
  const TARGET = 'project-final'
  const confirmed = inputVal === TARGET
  return (
    <div style={{ padding: '40px', display: 'flex', justifyContent: 'center' }}>
      <Alert defaultIsPresented={false}>
        <Alert.Trigger asChild>
          <Button color="gray" size="medium">
            <Button.Leading><DeleteLineIcon /></Button.Leading>
            <Button.Center>파일 삭제</Button.Center>
          </Button>
        </Alert.Trigger>
        <Alert.Top>
          <Alert.Title>파일을 영구 삭제하시겠습니까?</Alert.Title>
          <Alert.Description>
            이 작업은 취소할 수 없습니다. <b style={{ color: '#dc2626' }}>project-final</b> 폴더와 모든 하위 파일이 영구 삭제됩니다.
          </Alert.Description>
          <div style={{ marginTop: 16 }}>
            <p style={{ fontSize: 13, color: '#64748b', marginBottom: 6 }}>
              확인을 위해 <b>project-final</b>을 입력하세요
            </p>
            <div style={{ width: '100%' }}>
              <TextField
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="project-final"
              />
            </div>
          </div>
        </Alert.Top>
        <Alert.Bottom direction="horizontal">
          <Alert.Close asChild>
            <Button color="gray" size="large" width="100%">
              <Button.Center>취소</Button.Center>
            </Button>
          </Alert.Close>
          <Alert.Action asChild>
            <Button
              color="black"
              size="large"
              width="100%"
              disabled={!confirmed}
              style={confirmed ? { background: '#dc2626', borderColor: '#dc2626' } : {}}
            >
              <Button.Center>영구 삭제</Button.Center>
            </Button>
          </Alert.Action>
        </Alert.Bottom>
      </Alert>
      <p style={{ marginLeft: 16, fontSize: 12, color: '#94a3b8', alignSelf: 'center' }}>
        Tailwind UI 파일 삭제 패턴 — 텍스트 입력 검증으로 실수 방지
      </p>
    </div>
  )
}

export const Tailwind_파일_영구_삭제: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Tailwind UI 파괴적 작업 확인 패턴. 사용자가 삭제 대상 이름을 직접 입력해야 삭제 버튼이 활성화됩니다. GitHub 저장소 삭제 등에 활용되는 높은 위험도 작업 UX.',
      },
    },
  },
  render: () => <FileDeleteDemo />,
}

/* --------------------------------------------------------------------------
   Ant Design — 폼 저장 전 이탈 경고
   변경 사항 저장 여부를 3개 버튼으로 제시
-------------------------------------------------------------------------- */
const LeaveWarningDemo = () => {
  const [saved, setSaved] = React.useState<string | null>(null)
  return (
    <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      {saved && (
        <div style={{ padding: '10px 20px', borderRadius: 8, background: saved === 'saved' ? '#dcfce7' : '#fef9c3', fontSize: 13, color: saved === 'saved' ? '#15803d' : '#854d0e' }}>
          {saved === 'saved' ? '변경 사항이 저장되었습니다.' : '변경 사항이 저장되지 않고 이동합니다.'}
        </div>
      )}
      <Alert defaultIsPresented={false}>
        <Alert.Trigger asChild>
          <Button color="gray" size="medium">
            <Button.Center>페이지 이탈 (변경 사항 있음)</Button.Center>
          </Button>
        </Alert.Trigger>
        <Alert.Top>
          <Alert.Title>변경 사항을 저장하시겠습니까?</Alert.Title>
          <Alert.Description>
            저장하지 않으면 이 페이지에서 변경한 내용이 모두 사라집니다. 계속 진행하기 전에 저장 여부를 선택해 주세요.
          </Alert.Description>
        </Alert.Top>
        <Alert.Bottom direction="vertical">
          <Alert.Action asChild>
            <Button color="primary" size="large" width="100%" onClick={() => setSaved('saved')}>
              <Button.Center>저장 후 이동</Button.Center>
            </Button>
          </Alert.Action>
          <Alert.Action asChild>
            <Button color="gray" size="large" width="100%" onClick={() => setSaved('discard')}>
              <Button.Center>저장하지 않고 이동</Button.Center>
            </Button>
          </Alert.Action>
          <Alert.Close asChild>
            <Button color="gray" size="large" width="100%" style={{ background: 'transparent', borderColor: 'transparent', color: '#64748b' }}>
              <Button.Center>계속 편집</Button.Center>
            </Button>
          </Alert.Close>
        </Alert.Bottom>
      </Alert>
      <p style={{ fontSize: 12, color: '#94a3b8' }}>
        Ant Design Leave Warning 패턴 — 3개 선택지로 사용자 의도 명확화
      </p>
    </div>
  )
}

export const Ant_폼_이탈_경고: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Ant Design의 Leave Warning 패턴. 폼 편집 중 페이지를 이탈할 때 "저장 후 이동 / 저장하지 않고 이동 / 계속 편집" 세 가지 선택지를 제시해 사용자 데이터 손실을 방지합니다.',
      },
    },
  },
  render: () => <LeaveWarningDemo />,
}

/* --------------------------------------------------------------------------
   Tailwind UI 벤치마크: 구독 업그레이드 확인
   Tailwind UI의 upgrade confirmation 패턴 — 현재 플랜과 업그레이드 플랜을
   나란히 비교해 사용자의 결정을 돕는 인지 부하 최소화 패턴.
-------------------------------------------------------------------------- */
const TailwindUpgradeRender = () => {
  const [confirmed, setConfirmed] = useState(false)

  return (
    <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <Alert>
        <Alert.Trigger asChild>
          <Button color="primary" size="medium">
            <Button.Center>Pro로 업그레이드</Button.Center>
          </Button>
        </Alert.Trigger>
        <Alert.Top>
          <Alert.Title>Pro 플랜으로 업그레이드하시겠어요?</Alert.Title>
          <Alert.Description>
            <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
              {[
                { label: 'Free (현재)', items: ['컴포넌트 50개', '1 워크스페이스', '커뮤니티 지원'], highlight: false },
                { label: 'Pro', items: ['무제한 컴포넌트', '팀 워크스페이스', '우선 지원'], highlight: true },
              ].map((plan) => (
                <div
                  key={plan.label}
                  style={{
                    flex: 1, padding: '12px', borderRadius: 10,
                    border: plan.highlight ? '2px solid #6366f1' : '1px solid #e2e8f0',
                    background: plan.highlight ? '#eff6ff' : '#f8fafc',
                  }}
                >
                  <div style={{ fontSize: 12, fontWeight: 700, color: plan.highlight ? '#6366f1' : '#64748b', marginBottom: 8 }}>
                    {plan.label}
                  </div>
                  {plan.items.map((item) => (
                    <div key={item} style={{ fontSize: 11, color: '#475569', display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
                      <span style={{ color: plan.highlight ? '#6366f1' : '#94a3b8' }}>
                        {plan.highlight ? '✓' : '·'}
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div style={{ marginTop: 12, padding: '8px 12px', borderRadius: 8, background: '#fffbeb', border: '1px solid #fde68a', fontSize: 11, color: '#92400e' }}>
              월 ₩29,000 추가 청구. 현재 결제 방법으로 즉시 청구됩니다.
            </div>
          </Alert.Description>
        </Alert.Top>
        <Alert.Bottom direction="horizontal">
          <Alert.Close asChild>
            <Button color="gray" size="large" width="100%">
              <Button.Center>취소</Button.Center>
            </Button>
          </Alert.Close>
          <Alert.Action asChild>
            <Button color="primary" size="large" width="100%" onClick={() => setConfirmed(true)}>
              <Button.Center>업그레이드</Button.Center>
            </Button>
          </Alert.Action>
        </Alert.Bottom>
      </Alert>
      {confirmed && (
        <p style={{ fontSize: 13, color: '#10b981', fontWeight: 600 }}>
          Pro 플랜으로 업그레이드 완료!
        </p>
      )}
    </div>
  )
}

export const Tailwind_구독_업그레이드_확인: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Tailwind UI upgrade confirmation 패턴. 현재/업그레이드 플랜을 나란히 비교해 인지 부하를 줄이고, 청구 금액을 경고 박스로 강조합니다.',
      },
    },
  },
  render: () => <TailwindUpgradeRender />,
}

/* --------------------------------------------------------------------------
   Mantine 벤치마크: 데이터 내보내기 옵션 확인
   Mantine의 modal with settings 패턴 — 내보내기 포맷/범위 선택 후 확인하는 패턴.
   선택 가능한 옵션을 AlertDialog 내부에서 직접 구성하는 인터랙티브 패턴.
-------------------------------------------------------------------------- */
const MantineExportRender = () => {
  const [format, setFormat] = useState<'json' | 'csv' | 'xlsx'>('json')
  const [scope, setScope] = useState<'all' | 'filtered' | 'selected'>('all')
  const [exported, setExported] = useState(false)

  const FORMAT_OPTS = [
    { value: 'json' as const, label: 'JSON', ext: '.json', desc: '개발자 친화적' },
    { value: 'csv' as const, label: 'CSV', ext: '.csv', desc: '스프레드시트 호환' },
    { value: 'xlsx' as const, label: 'Excel', ext: '.xlsx', desc: 'Microsoft Excel' },
  ]
  const SCOPE_OPTS = [
    { value: 'all' as const, label: '전체 데이터', count: 1248 },
    { value: 'filtered' as const, label: '필터된 데이터', count: 342 },
    { value: 'selected' as const, label: '선택한 항목', count: 15 },
  ]

  return (
    <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <Alert>
        <Alert.Trigger asChild>
          <Button color="primary" size="medium">
            <Button.Center>데이터 내보내기</Button.Center>
          </Button>
        </Alert.Trigger>
        <Alert.Top>
          <Alert.Title>데이터 내보내기</Alert.Title>
          <Alert.Description>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 12 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
                  포맷 선택
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {FORMAT_OPTS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setFormat(opt.value)}
                      style={{
                        flex: 1, padding: '8px 4px', borderRadius: 8, cursor: 'pointer',
                        border: format === opt.value ? '2px solid #6366f1' : '1px solid #e2e8f0',
                        background: format === opt.value ? '#eff6ff' : '#fafafa',
                      }}
                    >
                      <div style={{ fontSize: 12, fontWeight: 700, color: format === opt.value ? '#6366f1' : '#1e293b' }}>
                        {opt.label}
                      </div>
                      <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 2 }}>{opt.ext}</div>
                      <div style={{ fontSize: 10, color: '#94a3b8' }}>{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
                  내보낼 범위
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {SCOPE_OPTS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setScope(opt.value)}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '8px 12px', borderRadius: 8, cursor: 'pointer',
                        border: scope === opt.value ? '1.5px solid #6366f1' : '1px solid #e2e8f0',
                        background: scope === opt.value ? '#eff6ff' : '#fafafa',
                        textAlign: 'left',
                      }}
                    >
                      <span style={{ fontSize: 12, fontWeight: scope === opt.value ? 700 : 400, color: scope === opt.value ? '#6366f1' : '#1e293b' }}>
                        {opt.label}
                      </span>
                      <span style={{ fontSize: 11, color: '#94a3b8' }}>{opt.count.toLocaleString()}개</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Alert.Description>
        </Alert.Top>
        <Alert.Bottom direction="horizontal">
          <Alert.Close asChild>
            <Button color="gray" size="large" width="100%">
              <Button.Center>취소</Button.Center>
            </Button>
          </Alert.Close>
          <Alert.Action asChild>
            <Button color="primary" size="large" width="100%" onClick={() => setExported(true)}>
              <Button.Center>내보내기</Button.Center>
            </Button>
          </Alert.Action>
        </Alert.Bottom>
      </Alert>
      {exported && (
        <p style={{ fontSize: 13, color: '#10b981', fontWeight: 600 }}>
          {SCOPE_OPTS.find((o) => o.value === scope)?.count.toLocaleString()}개 항목을 {format.toUpperCase()}로 내보내는 중...
        </p>
      )}
    </div>
  )
}

export const Mantine_데이터_내보내기_옵션: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Mantine의 modal with interactive settings 패턴. AlertDialog 내부에서 포맷(JSON/CSV/Excel)과 범위(전체/필터/선택)를 직접 선택한 후 내보내기 확인합니다.',
      },
    },
  },
  render: () => <MantineExportRender />,
}

/* --------------------------------------------------------------------------
   Tailwind UI 벤치마크: 세션 만료 타이머 경고
   Tailwind UI의 session timeout warning 패턴 — 카운트다운으로 긴박감을 주고
   "연장" / "로그아웃" 두 선택지만 명확히 제시하는 패턴.
-------------------------------------------------------------------------- */
const TailwindSessionTimeoutRender = () => {
  const [seconds, setSeconds] = useState(30)
  const [isOpen, setIsOpen] = useState(false)
  const [loggedOut, setLoggedOut] = useState(false)

  React.useEffect(() => {
    if (!isOpen) {
      setSeconds(30)
      return
    }
    if (seconds <= 0) {
      setLoggedOut(true)
      setIsOpen(false)
      return
    }
    const timer = setTimeout(() => setSeconds((s) => s - 1), 1000)
    return () => clearTimeout(timer)
  }, [isOpen, seconds])

  if (loggedOut) {
    return (
      <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <div style={{ fontSize: 13, color: '#ef4444', fontWeight: 600 }}>세션이 만료되어 로그아웃되었습니다.</div>
        <Button color="primary" size="medium" onClick={() => { setLoggedOut(false); setSeconds(30) }}>
          <Button.Center>다시 시뮬레이션</Button.Center>
        </Button>
      </div>
    )
  }

  return (
    <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <Alert open={isOpen} onOpenChange={setIsOpen}>
        <Alert.Trigger asChild>
          <Button color="primary" size="medium" onClick={() => setIsOpen(true)}>
            <Button.Center>세션 만료 시뮬레이션</Button.Center>
          </Button>
        </Alert.Trigger>
        <Alert.Top>
          <Alert.Title>세션이 곧 만료됩니다</Alert.Title>
          <Alert.Description>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: '8px 0' }}>
              <div
                style={{
                  width: 80, height: 80, borderRadius: '50%',
                  border: `4px solid ${seconds <= 10 ? '#ef4444' : '#f59e0b'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 28, fontWeight: 800,
                  color: seconds <= 10 ? '#ef4444' : '#f59e0b',
                  transition: 'color 0.3s, border-color 0.3s',
                }}
              >
                {seconds}
              </div>
              <div style={{ fontSize: 13, color: '#64748b', textAlign: 'center' }}>
                보안을 위해 <strong style={{ color: seconds <= 10 ? '#ef4444' : '#1e293b' }}>{seconds}초</strong> 후 자동으로 로그아웃됩니다.
                <br />지금 세션을 연장하시겠어요?
              </div>
            </div>
          </Alert.Description>
        </Alert.Top>
        <Alert.Bottom direction="horizontal">
          <Alert.Action asChild>
            <Button color="gray" size="large" width="100%" onClick={() => { setIsOpen(false); setLoggedOut(true) }}>
              <Button.Center>로그아웃</Button.Center>
            </Button>
          </Alert.Action>
          <Alert.Action asChild>
            <Button color="primary" size="large" width="100%" onClick={() => { setIsOpen(false); setSeconds(30) }}>
              <Button.Center>세션 연장</Button.Center>
            </Button>
          </Alert.Action>
        </Alert.Bottom>
      </Alert>
    </div>
  )
}

export const Tailwind_세션_만료_경고: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Tailwind UI session timeout warning 패턴. 원형 카운트다운 타이머로 긴박감을 시각화하고, 10초 이하에서 색상을 빨간색으로 전환합니다. "로그아웃 / 세션 연장" 두 선택지만 명확히 제시합니다.',
      },
    },
  },
  render: () => <TailwindSessionTimeoutRender />,
}

// ============================================================
// Cycle 134 — Mantine + Arco Design 벤치마크 반영
// ============================================================

// Mantine 스타일 — 멀티스텝 확인 다이얼로그 (modals.openConfirmModal 패턴)
function MantineMultiStepConfirmRender() {
  const [step, setStep] = useState<'confirm' | 'review' | null>(null)
  const [done, setDone] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center', fontFamily: 'system-ui, sans-serif' }}>
      <Button color="primary" size="large" onClick={() => { setStep('confirm'); setDone(false) }}>
        <Button.Center>계정 삭제 시작</Button.Center>
      </Button>
      {done && (
        <div style={{ padding: '8px 16px', background: '#dcfce7', borderRadius: 8, fontSize: 12, color: '#16a34a', fontWeight: 600 }}>
          삭제 처리가 접수되었습니다
        </div>
      )}
      {/* 1단계 */}
      <Alert isPresented={step === 'confirm'} onIsPresentedChange={(open) => { if (!open) setStep(null) }}>
        <Alert.Top>
          <Alert.Title>정말 계정을 삭제하시겠습니까?</Alert.Title>
          <Alert.Description>
            이 작업은 되돌릴 수 없습니다. 모든 데이터, 프로젝트, 설정이 영구적으로 삭제됩니다.
          </Alert.Description>
        </Alert.Top>
        <Alert.Bottom direction="horizontal">
          <Alert.Close asChild>
            <Button color="gray" size="large" width="100%">
              <Button.Center>취소</Button.Center>
            </Button>
          </Alert.Close>
          <Alert.Action asChild>
            <Button color="primary" size="large" width="100%" onClick={() => setStep('review')}>
              <Button.Center>계속</Button.Center>
            </Button>
          </Alert.Action>
        </Alert.Bottom>
      </Alert>
      {/* 2단계 */}
      <Alert isPresented={step === 'review'} onIsPresentedChange={(open) => { if (!open) setStep(null) }}>
        <Alert.Top>
          <Alert.Title>최종 확인</Alert.Title>
          <Alert.Description>
            아래 항목이 모두 삭제됩니다:{'\n'}• 14개 프로젝트 • 2,841개 파일 • 팀 멤버십 3개{'\n\n'}
            정말 진행하시겠습니까?
          </Alert.Description>
        </Alert.Top>
        <Alert.Bottom direction="horizontal">
          <Alert.Action asChild>
            <Button color="gray" size="large" width="100%" onClick={() => setStep('confirm')}>
              <Button.Center>이전</Button.Center>
            </Button>
          </Alert.Action>
          <Alert.Action asChild>
            <Button color="primary" size="large" width="100%" onClick={() => { setStep(null); setDone(true) }}>
              <Button.Center>영구 삭제</Button.Center>
            </Button>
          </Alert.Action>
        </Alert.Bottom>
      </Alert>
    </div>
  )
}

export const Mantine_멀티스텝_확인_다이얼로그: Story = {
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story:
          'Mantine modals.openConfirmModal 패턴. 계정 삭제를 2단계로 나눠 실수 방지. ' +
          '1단계(위험 경고) → 2단계(삭제 항목 목록 최종 확인) → 완료 피드백.',
      },
    },
  },
  render: () => <MantineMultiStepConfirmRender />,
}

// Arco Design 스타일 — 폼 입력 유효성 검사 다이얼로그
function ArcoFormValidationRender() {
  const [isOpen, setIsOpen] = useState(false)
  const [reason, setReason] = useState('')
  const [error, setError] = useState('')
  const REASONS = ['기능 불만', '성능 문제', '비용 문제', '서비스 종료', '기타']
  const handleSubmit = () => {
    if (!reason) { setError('사유를 선택해 주세요.'); return }
    setIsOpen(false)
    setReason('')
    setError('')
  }
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif' }}>
      <Button color="primary" size="large" onClick={() => setIsOpen(true)}>
        <Button.Center>구독 취소</Button.Center>
      </Button>
      <Alert isPresented={isOpen} onIsPresentedChange={(open) => { setIsOpen(open); if (!open) { setReason(''); setError('') } }}>
        <Alert.Top>
          <Alert.Title>구독을 취소하시겠습니까?</Alert.Title>
          <Alert.Description>취소 사유를 알려주시면 서비스 개선에 도움이 됩니다.</Alert.Description>
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {REASONS.map((r) => (
              <label key={r} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 7, border: `1.5px solid ${reason === r ? '#0f172a' : '#e2e8f0'}`, cursor: 'pointer', background: reason === r ? '#f8fafc' : '#fff', fontSize: 13, color: '#0f172a' }} onClick={() => { setReason(r); setError('') }}>
                <span style={{ width: 14, height: 14, borderRadius: '50%', border: `2px solid ${reason === r ? '#0f172a' : '#cbd5e1'}`, background: reason === r ? '#0f172a' : '#fff', flexShrink: 0 }} />
                {r}
              </label>
            ))}
            {error && <span style={{ fontSize: 11, color: '#ef4444', marginTop: 2 }}>{error}</span>}
          </div>
        </Alert.Top>
        <Alert.Bottom direction="horizontal">
          <Alert.Close asChild>
            <Button color="gray" size="large" width="100%">
              <Button.Center>유지하기</Button.Center>
            </Button>
          </Alert.Close>
          <Alert.Action asChild>
            <Button color="primary" size="large" width="100%" onClick={handleSubmit}>
              <Button.Center>취소 제출</Button.Center>
            </Button>
          </Alert.Action>
        </Alert.Bottom>
      </Alert>
    </div>
  )
}

export const Arco_폼_유효성_구독_취소_다이얼로그: Story = {
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story:
          'Arco Design 인라인 폼 유효성 패턴. 다이얼로그 내 라디오 그룹 선택 필수 검증. ' +
          '미선택 시 에러 표시, 선택 후 submit. 구독 취소 사유 수집 UX.',
      },
    },
  },
  render: () => <ArcoFormValidationRender />,
}

// Mantine + Arco — 비동기 작업 진행 다이얼로그
function MantineArcoAsyncConfirmRender() {
  const [isOpen, setIsOpen] = useState(false)
  const [status, setStatus] = useState<'idle' | 'running' | 'done' | 'error'>('idle')
  const [progress, setProgress] = useState(0)
  const handleStart = () => {
    setStatus('running')
    setProgress(0)
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval)
          setStatus('done')
          return 100
        }
        return p + Math.floor(Math.random() * 15 + 5)
      })
    }, 300)
  }
  const handleClose = () => { setIsOpen(false); setStatus('idle'); setProgress(0) }
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif' }}>
      <Button color="primary" size="large" onClick={() => { setIsOpen(true); setStatus('idle') }}>
        <Button.Center>데이터 마이그레이션</Button.Center>
      </Button>
      <Alert isPresented={isOpen} onIsPresentedChange={(open) => { if (!open && status !== 'running') handleClose() }}>
        <Alert.Top>
          <Alert.Title>
            {status === 'idle' && '데이터 마이그레이션'}
            {status === 'running' && '마이그레이션 진행 중...'}
            {status === 'done' && '마이그레이션 완료'}
            {status === 'error' && '오류 발생'}
          </Alert.Title>
          <Alert.Description>
            {status === 'idle' && '3,200개 레코드를 새 스키마로 이전합니다. 완료까지 약 30초 소요됩니다.'}
            {status === 'running' && `진행 중: ${Math.min(progress, 100)}% (진행 중에는 창을 닫지 마세요)`}
            {status === 'done' && '모든 데이터가 성공적으로 이전되었습니다.'}
            {status === 'error' && '마이그레이션 중 오류가 발생했습니다. 다시 시도해 주세요.'}
          </Alert.Description>
          {(status === 'running' || status === 'done') && (
            <div style={{ marginTop: 12, height: 6, background: '#f1f5f9', borderRadius: 99, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${Math.min(progress, 100)}%`, background: status === 'done' ? '#22c55e' : '#6366f1', borderRadius: 99, transition: 'width 200ms ease' }} />
            </div>
          )}
        </Alert.Top>
        <Alert.Bottom direction="horizontal">
          {status === 'idle' && (
            <>
              <Alert.Close asChild>
                <Button color="gray" size="large" width="100%">
                  <Button.Center>취소</Button.Center>
                </Button>
              </Alert.Close>
              <Alert.Action asChild>
                <Button color="primary" size="large" width="100%" onClick={handleStart}>
                  <Button.Center>시작</Button.Center>
                </Button>
              </Alert.Action>
            </>
          )}
          {status === 'running' && (
            <Button color="gray" size="large" width="100%" disabled>
              <Button.Center>진행 중...</Button.Center>
            </Button>
          )}
          {(status === 'done' || status === 'error') && (
            <Alert.Action asChild>
              <Button color="primary" size="large" width="100%" onClick={handleClose}>
                <Button.Center>확인</Button.Center>
              </Button>
            </Alert.Action>
          )}
        </Alert.Bottom>
      </Alert>
    </div>
  )
}

export const Mantine_Arco_비동기_진행_다이얼로그: Story = {
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story:
          'Mantine + Arco 비동기 작업 진행 패턴. idle → running(진행 바) → done 상태 전환. ' +
          '진행 중 닫기 방지, 완료 후 확인 버튼으로 전환. 데이터 마이그레이션 UX.',
      },
    },
  },
  render: () => <MantineArcoAsyncConfirmRender />,
}

/* --------------------------------------------------------------------------
   Cycle 160 — MUI + Mantine
   MUI: 계정 삭제 최종 확인 다이얼로그 패턴
-------------------------------------------------------------------------- */
function MuiAccountDeleteRender() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [deleting, setDeleting] = useState(false)
  const CONFIRM_TEXT = 'DELETE'

  const handleDelete = () => {
    setDeleting(true)
    setTimeout(() => { setDeleting(false); setOpen(false); setInput('') }, 1800)
  }

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif' }}>
      <button
        onClick={() => setOpen(true)}
        style={{ padding: '8px 18px', fontSize: 13, borderRadius: 8, border: 'none', background: '#ef4444', color: '#fff', cursor: 'pointer', fontWeight: 600 }}
      >
        계정 삭제
      </button>
      <Alert
        isPresented={open}
        onIsPresentedChange={setOpen}
      >
        <Alert.Top>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '4px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <DeleteLineIcon size={20} style={{ color: '#ef4444' }} />
              <span style={{ fontSize: 15, fontWeight: 700, color: '#1e293b' }}>계정을 삭제하시겠습니까?</span>
            </div>
            <p style={{ fontSize: 12, color: '#64748b', lineHeight: 1.6, margin: 0 }}>
              이 작업은 되돌릴 수 없습니다. 모든 데이터, 프로젝트, 결제 정보가 영구적으로 삭제됩니다.
            </p>
            <div style={{ padding: '10px 12px', borderRadius: 8, background: '#fef2f2', border: '1px solid #fecaca' }}>
              <p style={{ fontSize: 11, color: '#991b1b', margin: '0 0 8px', fontWeight: 600 }}>확인을 위해 {CONFIRM_TEXT}를 입력하세요</p>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={CONFIRM_TEXT}
                style={{ width: '100%', padding: '6px 10px', fontSize: 12, borderRadius: 6, border: `1.5px solid ${input === CONFIRM_TEXT ? '#22c55e' : '#fca5a5'}`, outline: 'none', boxSizing: 'border-box', fontFamily: 'monospace', fontWeight: 700 }}
              />
            </div>
            {deleting && (
              <div style={{ padding: '8px', borderRadius: 8, background: '#f8fafc', textAlign: 'center', fontSize: 11, color: '#64748b' }}>
                삭제 중...
              </div>
            )}
          </div>
        </Alert.Top>
        <Alert.Bottom direction="horizontal">
          <Alert.Close asChild>
            <Button color="gray" size="large" width="100%">
              <Button.Center>취소</Button.Center>
            </Button>
          </Alert.Close>
          <Alert.Action asChild>
            <Button
              color="primary"
              size="large"
              width="100%"
              disabled={input !== CONFIRM_TEXT || deleting}
              onClick={handleDelete}
            >
              <Button.Center>{deleting ? '삭제 중...' : '영구 삭제'}</Button.Center>
            </Button>
          </Alert.Action>
        </Alert.Bottom>
      </Alert>
    </div>
  )
}

export const MUI_계정_삭제_최종_확인: Story = {
  name: 'MUI — 계정 삭제 최종 확인 다이얼로그 패턴',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'MUI의 Dangerous Action Confirmation 패턴. "DELETE" 텍스트 입력 확인 + 진행 상태 표시로 계정 삭제 의도를 명확히 검증합니다.',
      },
    },
  },
  render: () => <MuiAccountDeleteRender />,
}

/* --------------------------------------------------------------------------
   Mantine: 결제 정보 변경 확인 다이얼로그 패턴
-------------------------------------------------------------------------- */
const MANTINE_PLANS = [
  { id: 'free', label: 'Free', price: '무료', color: '#64748b' },
  { id: 'pro', label: 'Pro', price: '₩29,000/월', color: '#6366f1' },
  { id: 'enterprise', label: 'Enterprise', price: '문의', color: '#f59e0b' },
]

function MantinePaymentChangeRender() {
  const [open, setOpen] = useState(false)
  const [currentPlan] = useState('free')
  const [targetPlan, setTargetPlan] = useState('pro')
  const [agreed, setAgreed] = useState(false)

  const current = MANTINE_PLANS.find(p => p.id === currentPlan)
  const target = MANTINE_PLANS.find(p => p.id === targetPlan)

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', gap: 6 }}>
        {MANTINE_PLANS.filter(p => p.id !== currentPlan).map(p => (
          <button
            key={p.id}
            onClick={() => { setTargetPlan(p.id); setAgreed(false) }}
            style={{ padding: '6px 12px', fontSize: 11, borderRadius: 7, border: `1.5px solid ${targetPlan === p.id ? p.color : '#e2e8f0'}`, background: targetPlan === p.id ? `${p.color}15` : '#fff', color: targetPlan === p.id ? p.color : '#64748b', cursor: 'pointer', fontWeight: targetPlan === p.id ? 700 : 400 }}
          >
            {p.label}으로 변경
          </button>
        ))}
      </div>
      <button onClick={() => { setOpen(true); setAgreed(false) }} style={{ padding: '8px 18px', fontSize: 13, borderRadius: 8, border: 'none', background: '#6366f1', color: '#fff', cursor: 'pointer', fontWeight: 600, alignSelf: 'flex-start' }}>
        플랜 변경 확인
      </button>
      <Alert isPresented={open} onIsPresentedChange={setOpen}>
        <Alert.Top>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#1e293b' }}>플랜 변경 확인</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderRadius: 8, background: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <div style={{ textAlign: 'center', flex: 1 }}>
                <div style={{ fontSize: 10, color: '#94a3b8', marginBottom: 2 }}>현재</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: current?.color }}>{current?.label}</div>
                <div style={{ fontSize: 10, color: '#94a3b8' }}>{current?.price}</div>
              </div>
              <div style={{ fontSize: 16, color: '#94a3b8' }}>→</div>
              <div style={{ textAlign: 'center', flex: 1 }}>
                <div style={{ fontSize: 10, color: '#94a3b8', marginBottom: 2 }}>변경 후</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: target?.color }}>{target?.label}</div>
                <div style={{ fontSize: 10, color: '#94a3b8' }}>{target?.price}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, cursor: 'pointer' }} onClick={() => setAgreed(!agreed)}>
              <div style={{ width: 16, height: 16, borderRadius: 4, border: `2px solid ${agreed ? '#6366f1' : '#cbd5e1'}`, background: agreed ? '#6366f1' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                {agreed && <span style={{ fontSize: 10, color: '#fff' }}>✓</span>}
              </div>
              <span style={{ fontSize: 11, color: '#475569', lineHeight: 1.5 }}>변경 약관에 동의하며, 즉시 청구가 발생할 수 있음을 이해합니다</span>
            </div>
          </div>
        </Alert.Top>
        <Alert.Bottom direction="horizontal">
          <Alert.Close asChild>
            <Button color="gray" size="large" width="100%">
              <Button.Center>취소</Button.Center>
            </Button>
          </Alert.Close>
          <Alert.Action asChild>
            <Button color="primary" size="large" width="100%" disabled={!agreed}>
              <Button.Center>변경 확인</Button.Center>
            </Button>
          </Alert.Action>
        </Alert.Bottom>
      </Alert>
    </div>
  )
}

export const Mantine_결제_플랜_변경_확인: Story = {
  name: 'Mantine — 결제 플랜 변경 확인 다이얼로그 패턴',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Mantine의 Confirmation with Agreement 패턴. 플랜 선택 → 변경 내용 요약 → 약관 동의 체크박스로 결제 플랜 변경을 확인합니다.',
      },
    },
  },
  render: () => <MantinePaymentChangeRender />,
}

/* --------------------------------------------------------------------------
   MUI + Mantine: 워크스페이스 이관 확인 복합 다이얼로그 패턴
-------------------------------------------------------------------------- */
const WORKSPACE_MEMBERS = [
  { name: '김민준', role: 'Admin' },
  { name: '이서연', role: 'Editor' },
  { name: '박지후', role: 'Viewer' },
]

function MuiMantineWorkspaceTransferRender() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<'select' | 'confirm'>('select')
  const [selected, setSelected] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [done, setDone] = useState(false)

  const reset = () => { setStep('select'); setSelected(''); setAgreed(false) }

  const handleConfirm = () => {
    setDone(true)
    setTimeout(() => { setOpen(false); setDone(false); reset() }, 1500)
  }

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif' }}>
      <button onClick={() => { setOpen(true); reset() }} style={{ padding: '8px 18px', fontSize: 13, borderRadius: 8, border: 'none', background: '#1e293b', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>
        워크스페이스 소유권 이관
      </button>
      <Alert isPresented={open} onIsPresentedChange={v => { if (!done) setOpen(v) }}>
        <Alert.Top>
          {done ? (
            <div style={{ textAlign: 'center', padding: '8px 0' }}>
              <NotificationCheckFillIcon size={32} style={{ color: '#22c55e' }} />
              <p style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', marginTop: 8 }}>이관 완료</p>
            </div>
          ) : step === 'select' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#1e293b' }}>소유권 이관 대상 선택</div>
              <p style={{ fontSize: 11, color: '#64748b', margin: 0 }}>새 소유자를 선택하세요. 이관 후 관리자 권한이 이전됩니다.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {WORKSPACE_MEMBERS.map(m => (
                  <div
                    key={m.name}
                    onClick={() => setSelected(m.name)}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 8, border: `1.5px solid ${selected === m.name ? '#6366f1' : '#e2e8f0'}`, background: selected === m.name ? '#f0eeff' : '#fff', cursor: 'pointer' }}
                  >
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#fff', fontWeight: 700 }}>{m.name[0]}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#1e293b' }}>{m.name}</div>
                      <div style={{ fontSize: 10, color: '#94a3b8' }}>{m.role}</div>
                    </div>
                    {selected === m.name && <span style={{ fontSize: 14, color: '#6366f1' }}>●</span>}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#1e293b' }}>이관 최종 확인</div>
              <div style={{ padding: '10px 12px', borderRadius: 8, background: '#fef3c7', border: '1px solid #fde68a', fontSize: 11, color: '#92400e', lineHeight: 1.6 }}>
                <strong>{selected}</strong>에게 워크스페이스 소유권을 이관합니다. 이 작업은 되돌릴 수 없습니다.
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, cursor: 'pointer' }} onClick={() => setAgreed(!agreed)}>
                <div style={{ width: 16, height: 16, borderRadius: 4, border: `2px solid ${agreed ? '#6366f1' : '#cbd5e1'}`, background: agreed ? '#6366f1' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                  {agreed && <span style={{ fontSize: 10, color: '#fff' }}>✓</span>}
                </div>
                <span style={{ fontSize: 11, color: '#475569', lineHeight: 1.5 }}>이 결정을 이해하며 동의합니다</span>
              </div>
            </div>
          )}
        </Alert.Top>
        {!done && (
          <Alert.Bottom direction="horizontal">
            {step === 'select' ? (
              <>
                <Alert.Close asChild>
                  <Button color="gray" size="large" width="100%">
                    <Button.Center>취소</Button.Center>
                  </Button>
                </Alert.Close>
                <Alert.Action asChild>
                  <Button color="primary" size="large" width="100%" disabled={!selected} onClick={() => setStep('confirm')}>
                    <Button.Center>다음</Button.Center>
                  </Button>
                </Alert.Action>
              </>
            ) : (
              <>
                <Button color="gray" size="large" width="100%" onClick={() => { setStep('select'); setAgreed(false) }}>
                  <Button.Center>이전</Button.Center>
                </Button>
                <Alert.Action asChild>
                  <Button color="primary" size="large" width="100%" disabled={!agreed} onClick={handleConfirm}>
                    <Button.Center>이관 확인</Button.Center>
                  </Button>
                </Alert.Action>
              </>
            )}
          </Alert.Bottom>
        )}
      </Alert>
    </div>
  )
}

export const MUI_Mantine_워크스페이스_이관_확인: Story = {
  name: 'MUI + Mantine — 워크스페이스 소유권 이관 확인 다이얼로그',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'MUI + Mantine 복합 패턴. 멤버 선택 → 최종 확인(약관 동의) 2단계 이관 플로우. 완료 상태 피드백과 되돌리기 불가 경고를 포함합니다.',
      },
    },
  },
  render: () => <MuiMantineWorkspaceTransferRender />,
}
