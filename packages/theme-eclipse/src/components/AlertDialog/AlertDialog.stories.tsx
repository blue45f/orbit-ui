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
