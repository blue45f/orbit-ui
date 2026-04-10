import { Flex } from '@heejun-com/core'
import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { vars } from '../../styles'
import { FilledButton as Button } from '../SolidButton'
import { OutlineButton } from '../OutlineButton'
import { Typography } from '../Text'
import { FloatingTextField } from '../FloatingTextField'

import { Dialog } from './Modal'

const meta = {
  title: 'eclipse/Feedback/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  args: {
    defaultIsPresented: false,
  },
  argTypes: {},
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const 기본: Story = {
  render: (args: React.ComponentProps<typeof Dialog>) => (
    <Dialog {...args}>
      <Dialog.Trigger asChild>
        <Button color="primary" size="medium">
          <Button.Center>열기</Button.Center>
        </Button>
      </Dialog.Trigger>
      <Dialog.Top>
        <Typography textStyle="subheadingSmall" maxLines={2}>
          서비스 이용 정책은 무엇인가요?
        </Typography>
        <Typography textStyle="descriptionLarge">
          거리, 시간대, 지역, 서비스 방식, 할인, 에이더 멤버십 혜택, 업체별 적용 멤버십 등에 따라
          서비스 정책에 따라 차이가 있을 수 있습니다.
        </Typography>
      </Dialog.Top>
      <Dialog.Bottom direction="horizontal">
        <Dialog.Close asChild>
          <Button color="black" size="medium" width="100%">
            <Button.Center>확인</Button.Center>
          </Button>
        </Dialog.Close>
      </Dialog.Bottom>
    </Dialog>
  ),
}

export const 바디스크롤: Story = {
  render: (args) => {
    return (
      <Dialog {...args}>
        <Dialog.Trigger asChild>
          <Button color="primary" size="medium">
            <Button.Center>열기</Button.Center>
          </Button>
        </Dialog.Trigger>
        <Dialog.Top>
          <div>
            <Typography textStyle="subheadingSmall" maxLines={2}>
              서비스 이용 정책은 무엇인가요?
            </Typography>
          </div>
          <Flex flexDirection="column" className="max-h-64 overflow-y-auto pr-2">
            <Typography textStyle="descriptionLarge">
              거리, 시간대, 지역, 서비스 방식, 할인, 에이더 멤버십 혜택, 업체별 적용 멤버십 등에
              따라 서비스 정책에 따라 차이가 있을 수 있습니다.
            </Typography>
            <div
              style={{
                height: '1px',
                backgroundColor: vars.sem.color.foregroundSecondary,
                paddingTop: vars.ref.spacing[50],
                paddingBottom: vars.ref.spacing[50],
              }}
            />
            <Flex justifyContent="space-between" style={{ width: '100%' }}>
              <Typography textStyle="descriptionLarge"> 이용금액(17,500원)</Typography>
              <Typography textStyle="descriptionLarge"> 1,000원</Typography>
            </Flex>
            <Flex justifyContent="space-between" style={{ width: '100%' }}>
              <Typography textStyle="descriptionLarge"> 추가거리(0.2km)</Typography>
              <Typography textStyle="descriptionLarge">+500원</Typography>
            </Flex>
            <Flex justifyContent="space-between" style={{ width: '100%' }}>
              <Typography textStyle="descriptionLarge">
                <b>최종 이용료</b>
              </Typography>
              <Typography textStyle="descriptionLarge">
                <b>1,500원</b>
              </Typography>
            </Flex>
            <Typography textStyle="descriptionLarge">
              진짜 긴 텍스트가 필요해서 복붙하겠습니다. 현재 표시된 혜택가는 할인 행사 정책에 따라
              일부 회원에게만 적용될 수 있습니다. 현재 표시된 혜택가는 할인 행사 정책에 따라 일부
              회원에게만 적용될 수 있습니다. 현재 표시된 혜택가는 할인 행사 정책에 따라 일부
              회원에게만 적용될 수 있습니다. 현재 표시된 혜택가는 할인 행사 정책에 따라 일부
              회원에게만 적용될 수 있습니다. 현재 표시된 혜택가는 할인 행사 정책에 따라 일부
              회원에게만 적용될 수 있습니다. 현재 표시된 혜택가는 할인 행사 정책에 따라 일부
              회원에게만 적용될 수 있습니다. 현재 표시된 혜택가는 할인 행사 정책에 따라 일부
              회원에게만 적용될 수 있습니다. 현재 표시된 혜택가는 할인 행사 정책에 따라 일부
              회원에게만 적용될 수 있습니다. 현재 표시된 혜택가는 할인 행사 정책에 따라 일부
              회원에게만 적용될 수 있습니다. 현재 표시된 혜택가는 할인 행사 정책에 따라 일부
              회원에게만 적용될 수 있습니다.{' '}
            </Typography>
          </Flex>
        </Dialog.Top>
        <Dialog.Bottom direction="horizontal">
          <Dialog.Close asChild>
            <Button color="gray" size="medium" width="100%">
              <Button.Center>작성 취소</Button.Center>
            </Button>
          </Dialog.Close>
          <Button type="submit" form="orbit-form" color="black" size="medium" width="100%">
            <Button.Center>제출</Button.Center>
          </Button>
        </Dialog.Bottom>
      </Dialog>
    )
  },
}

export const 디자인QA = {
  args: {
    footerDirection: 'horizontal',
    headerText: '서비스 이용 정책은 무엇인가요?',
    bodyText:
      '거리, 시간대, 지역, 서비스 방식, 할인, 에이더 멤버십 혜택, 업체별 적용 멤버십 등에 따라 서비스 정책에 따라 차이가 있을 수 있습니다.',
    buttonText: '확인',
    buttonCount: 1,
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
  render: ({ footerDirection, headerText, bodyText, buttonText, buttonCount, ...rest }: any) => (
    <Dialog {...rest}>
      <Dialog.Trigger asChild>
        <Button color="primary" size="medium">
          <Button.Center>열기</Button.Center>
        </Button>
      </Dialog.Trigger>
      <Dialog.Top>
        <Typography textStyle="subheadingSmall" maxLines={2}>
          {headerText}
        </Typography>
        <Typography textStyle="descriptionLarge">{bodyText}</Typography>
      </Dialog.Top>
      <Dialog.Bottom direction={footerDirection}>
        <Button color="black" size="medium" width="100%">
          <Button.Center>{buttonText}</Button.Center>
        </Button>
        {buttonCount === 2 && (
          <Dialog.Close asChild>
            <Button color="gray" size="medium" width="100%">
              <Button.Center>취소</Button.Center>
            </Button>
          </Dialog.Close>
        )}
      </Dialog.Bottom>
    </Dialog>
  ),
}

/* --------------------------------------------------------------------------
   폼 다이얼로그 (MUI Dialog 폼 패턴)
   TextField 포함, 제출 버튼, 실시간 유효성 검사
-------------------------------------------------------------------------- */
const FormDialogRender = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const isEmailValid = email.includes('@') && email.includes('.')
  const isNameValid = name.trim().length >= 2
  const canSubmit = isEmailValid && isNameValid && !isSubmitting

  const handleSubmit = () => {
    if (!canSubmit) return
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      setName('')
      setEmail('')
    }, 1500)
  }

  return (
    <Dialog onIsPresentedChange={() => setSubmitted(false)}>
      <Dialog.Trigger asChild>
        <Button color="primary" size="medium">
          <Button.Center>팀원 초대</Button.Center>
        </Button>
      </Dialog.Trigger>
      <Dialog.Top>
        <Typography textStyle="subheadingSmall">팀원 초대</Typography>
        {submitted ? (
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: '12px', padding: '16px 0',
          }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '50%',
              background: 'rgba(16,185,129,0.1)', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <Typography textStyle="descriptionLarge" style={{ textAlign: 'center', color: '#10b981' }}>
              초대 이메일이 발송되었습니다.
            </Typography>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingTop: '8px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <FloatingTextField
                placeholder="이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={name.length > 0 && !isNameValid}
                style={{ width: '100%' }}
              />
              {name.length > 0 && !isNameValid && (
                <span style={{ fontSize: '12px', color: '#ef4444' }}>이름은 2자 이상이어야 합니다</span>
              )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <FloatingTextField
                placeholder="이메일 주소"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={email.length > 0 && !isEmailValid}
                style={{ width: '100%' }}
              />
              {email.length > 0 && !isEmailValid && (
                <span style={{ fontSize: '12px', color: '#ef4444' }}>올바른 이메일 형식을 입력하세요</span>
              )}
            </div>
          </div>
        )}
      </Dialog.Top>
      <Dialog.Bottom direction="horizontal">
        <Dialog.Close asChild>
          <OutlineButton color="black" size="medium" width="100%">
            <OutlineButton.Center>취소</OutlineButton.Center>
          </OutlineButton>
        </Dialog.Close>
        <Button
          color="primary"
          size="medium"
          width="100%"
          disabled={!canSubmit}
          onClick={handleSubmit}
        >
          <Button.Center>{isSubmitting ? '처리 중...' : '초대 보내기'}</Button.Center>
        </Button>
      </Dialog.Bottom>
    </Dialog>
  )
}

export const 폼다이얼로그: Story = {
  render: () => <FormDialogRender />,
}

/* --------------------------------------------------------------------------
   위험 동작 확인 다이얼로그 (MUI Dialog destructive action 패턴)
   취소/삭제 버튼 조합, 삭제 대상 명시, 복구 불가 경고
-------------------------------------------------------------------------- */
export const 위험동작확인: Story = {
  render: (args) => (
    <Dialog {...args}>
      <Dialog.Trigger asChild>
        <Button color="black" size="medium">
          <Button.Center>계정 삭제</Button.Center>
        </Button>
      </Dialog.Trigger>
      <Dialog.Top>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{
            width: '40px', height: '40px', borderRadius: '50%',
            background: 'rgba(239,68,68,0.1)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <Typography textStyle="subheadingSmall">계정을 삭제하시겠습니까?</Typography>
          <Typography textStyle="descriptionLarge">
            이 작업은 <strong>되돌릴 수 없습니다.</strong> 계정과 관련된 모든 데이터,
            설정, 이력이 영구적으로 삭제됩니다.
          </Typography>
          <div style={{
            padding: '10px 14px', borderRadius: '8px',
            background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)',
          }}>
            <Typography textStyle="descriptionLarge" style={{ color: '#ef4444', fontSize: '12px' }}>
              삭제 대상: user@example.com
            </Typography>
          </div>
        </div>
      </Dialog.Top>
      <Dialog.Bottom direction="horizontal">
        <Dialog.Close asChild>
          <OutlineButton color="black" size="medium" width="100%">
            <OutlineButton.Center>취소</OutlineButton.Center>
          </OutlineButton>
        </Dialog.Close>
        <Dialog.Close asChild>
          <Button color="black" size="medium" width="100%">
            <Button.Center>삭제 확인</Button.Center>
          </Button>
        </Dialog.Close>
      </Dialog.Bottom>
    </Dialog>
  ),
}

/* --------------------------------------------------------------------------
   로딩 상태 다이얼로그 (MUI Dialog 제출 중 버튼 disabled 패턴)
   제출 버튼 클릭 후 로딩 상태 표시 및 버튼 비활성화
-------------------------------------------------------------------------- */
const LoadingDialogRender = (args: React.ComponentProps<typeof Dialog>) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isDone, setIsDone] = useState(false)

  const handleConfirm = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsDone(true)
    }, 2000)
  }

  const handleReset = () => {
    setIsDone(false)
    setIsLoading(false)
  }

  return (
    <Dialog {...args} onIsPresentedChange={handleReset}>
      <Dialog.Trigger asChild>
        <Button color="primary" size="medium">
          <Button.Center>보고서 생성</Button.Center>
        </Button>
      </Dialog.Trigger>
      <Dialog.Top>
        <Typography textStyle="subheadingSmall">월간 보고서 생성</Typography>
        {isDone ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '8px 0' }}>
            <Typography textStyle="descriptionLarge" style={{ color: '#10b981' }}>
              보고서가 성공적으로 생성되었습니다.
            </Typography>
            <Typography textStyle="descriptionLarge">
              이메일로 다운로드 링크를 발송했습니다.
            </Typography>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Typography textStyle="descriptionLarge">
              2024년 4월 전체 거래 데이터를 포함한 보고서를 생성합니다.
              처리 시간은 약 1~2분 소요됩니다.
            </Typography>
            {isLoading && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 0' }}>
                <div style={{
                  width: '16px', height: '16px', borderRadius: '50%',
                  border: '2px solid #e2e8f0', borderTopColor: '#6366f1',
                  animation: 'spin 0.8s linear infinite',
                }} />
                <Typography textStyle="descriptionLarge" style={{ color: '#6366f1' }}>
                  보고서 생성 중...
                </Typography>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </div>
            )}
          </div>
        )}
      </Dialog.Top>
      <Dialog.Bottom direction="horizontal">
        {!isDone && (
          <Dialog.Close asChild>
            <OutlineButton color="black" size="medium" width="100%" disabled={isLoading}>
              <OutlineButton.Center>취소</OutlineButton.Center>
            </OutlineButton>
          </Dialog.Close>
        )}
        {isDone ? (
          <Dialog.Close asChild>
            <Button color="primary" size="medium" width="100%">
              <Button.Center>닫기</Button.Center>
            </Button>
          </Dialog.Close>
        ) : (
          <Button
            color="primary"
            size="medium"
            width="100%"
            disabled={isLoading}
            onClick={handleConfirm}
          >
            <Button.Center>{isLoading ? '생성 중...' : '생성 시작'}</Button.Center>
          </Button>
        )}
      </Dialog.Bottom>
    </Dialog>
  )
}

export const 로딩상태: Story = {
  render: (args) => <LoadingDialogRender {...args} />,
}

/* --------------------------------------------------------------------------
   멀티스텝 다이얼로그 (Headless UI 단계별 진행 패턴)
   단계 표시 인디케이터, 이전/다음 버튼, 단계별 콘텐츠
-------------------------------------------------------------------------- */
const STEPS = ['약관 동의', '기본 정보', '완료'] as const

const MultiStepDialogRender = (args: React.ComponentProps<typeof Dialog>) => {
  const [step, setStep] = useState(0)
  const [agreed, setAgreed] = useState(false)
  const [nickname, setNickname] = useState('')

  const handleReset = () => {
    setStep(0)
    setAgreed(false)
    setNickname('')
  }

  const canProceed = step === 0 ? agreed : step === 1 ? nickname.trim().length >= 2 : true

  const renderStepContent = () => {
    if (step === 0) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            background: '#f8fafc',
            maxHeight: '120px',
            overflowY: 'auto',
          }}>
            <Typography textStyle="descriptionLarge" style={{ color: '#64748b', lineHeight: '1.6' }}>
              본 서비스 이용약관에 동의하시면 회원가입이 완료됩니다.
              수집된 개인정보는 서비스 제공 목적으로만 사용되며,
              제3자에게 제공되지 않습니다. 언제든지 탈퇴 및 정보 삭제를 요청할 수 있습니다.
            </Typography>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAgreed(e.target.checked)}
              style={{ width: '16px', height: '16px', accentColor: '#6366f1' }}
            />
            <Typography textStyle="descriptionLarge">위 약관에 동의합니다</Typography>
          </label>
        </div>
      )
    }
    if (step === 1) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingTop: '4px' }}>
          <Typography textStyle="descriptionLarge" style={{ color: '#64748b' }}>
            서비스에서 사용할 닉네임을 입력해주세요. (2자 이상)
          </Typography>
          <FloatingTextField
            placeholder="닉네임"
            value={nickname}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNickname(e.target.value)}
            error={nickname.length > 0 && nickname.trim().length < 2}
            style={{ width: '100%' }}
          />
          {nickname.length > 0 && nickname.trim().length < 2 && (
            <span style={{ fontSize: '12px', color: '#ef4444' }}>닉네임은 2자 이상이어야 합니다</span>
          )}
        </div>
      )
    }
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '8px 0' }}>
        <div style={{
          width: '52px', height: '52px', borderRadius: '50%',
          background: 'rgba(99,102,241,0.1)', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <Typography textStyle="descriptionLarge" style={{ textAlign: 'center' }}>
          <strong>{nickname}</strong>님, 가입이 완료되었습니다!
        </Typography>
      </div>
    )
  }

  return (
    <Dialog {...args} onIsPresentedChange={handleReset}>
      <Dialog.Trigger asChild>
        <Button color="primary" size="medium">
          <Button.Center>회원가입</Button.Center>
        </Button>
      </Dialog.Trigger>
      <Dialog.Top>
        {/* 단계 인디케이터 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0', marginBottom: '4px' }}>
          {STEPS.map((label, i) => (
            <React.Fragment key={label}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <div style={{
                  width: '24px', height: '24px', borderRadius: '50%',
                  background: i <= step ? '#6366f1' : '#e2e8f0',
                  color: i <= step ? 'white' : '#94a3b8',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '11px', fontWeight: 600, transition: 'background 0.2s',
                }}>
                  {i < step ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : i + 1}
                </div>
                <span style={{ fontSize: '10px', color: i <= step ? '#6366f1' : '#94a3b8', whiteSpace: 'nowrap' }}>
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div style={{
                  flex: 1, height: '2px', marginBottom: '16px', marginLeft: '4px', marginRight: '4px',
                  background: i < step ? '#6366f1' : '#e2e8f0',
                  transition: 'background 0.2s',
                }} />
              )}
            </React.Fragment>
          ))}
        </div>
        <Typography textStyle="subheadingSmall">{STEPS[step]}</Typography>
        {renderStepContent()}
      </Dialog.Top>
      <Dialog.Bottom direction="horizontal">
        {step > 0 && step < STEPS.length - 1 && (
          <OutlineButton color="black" size="medium" width="100%" onClick={() => setStep((s) => s - 1)}>
            <OutlineButton.Center>이전</OutlineButton.Center>
          </OutlineButton>
        )}
        {step < STEPS.length - 1 ? (
          <Button
            color="primary"
            size="medium"
            width="100%"
            disabled={!canProceed}
            onClick={() => setStep((s) => s + 1)}
          >
            <Button.Center>다음</Button.Center>
          </Button>
        ) : (
          <Dialog.Close asChild>
            <Button color="primary" size="medium" width="100%" onClick={handleReset}>
              <Button.Center>시작하기</Button.Center>
            </Button>
          </Dialog.Close>
        )}
      </Dialog.Bottom>
    </Dialog>
  )
}

export const 멀티스텝: Story = {
  render: (args) => <MultiStepDialogRender {...args} />,
}

/* --------------------------------------------------------------------------
   shadcn/ui 벤치마크: 삭제 확인 다이얼로그 패턴
   shadcn/ui AlertDialog — 위험 작업 전 이중 확인 패턴
-------------------------------------------------------------------------- */
function DeleteConfirmRender() {
  const [isOpen, setIsOpen] = useState(false)
  const [deleted, setDeleted] = useState(false)

  const handleDelete = () => {
    setDeleted(true)
    setIsOpen(false)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      {deleted ? (
        <div style={{ padding: '12px 16px', borderRadius: 8, background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', fontSize: 14, fontWeight: 600 }}>
          항목이 삭제되었습니다.
        </div>
      ) : (
        <Dialog isPresented={isOpen} onIsPresentedChange={() => setIsOpen(false)}>
          <Dialog.Trigger asChild>
            <button
              onClick={() => setIsOpen(true)}
              style={{ padding: '10px 20px', borderRadius: 8, background: '#ef4444', color: '#fff', border: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
            >
              항목 삭제
            </button>
          </Dialog.Trigger>
          <Dialog.Top>
            <div style={{ padding: '4px 0' }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>정말 삭제하시겠습니까?</div>
              <div style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6 }}>
                이 작업은 되돌릴 수 없습니다. 해당 항목과 모든 관련 데이터가 영구적으로 삭제됩니다.
              </div>
            </div>
          </Dialog.Top>
          <Dialog.Bottom direction="horizontal">
            <Dialog.Close asChild>
              <OutlineButton color="black" size="medium" width="100%">
                <OutlineButton.Center>취소</OutlineButton.Center>
              </OutlineButton>
            </Dialog.Close>
            <Button
              color="primary"
              size="medium"
              width="100%"
              onClick={handleDelete}
              style={{ background: '#ef4444' }}
            >
              <Button.Center>삭제 확인</Button.Center>
            </Button>
          </Dialog.Bottom>
        </Dialog>
      )}
      <div style={{ fontSize: 11, color: '#94a3b8' }}>shadcn/ui AlertDialog 패턴 — 위험 작업 전 이중 확인</div>
    </div>
  )
}

export const shadcn_삭제_확인_다이얼로그: Story = {
  name: 'shadcn/ui - 삭제 확인 다이얼로그 패턴',
  render: () => <DeleteConfirmRender />,
}

/* --------------------------------------------------------------------------
   Mantine 벤치마크: 이미지 뷰어 모달 패턴
   Mantine Modal — 전체화면 이미지 미리보기 lightbox 패턴
-------------------------------------------------------------------------- */
const GALLERY_ITEMS = [
  { id: 1, title: 'Orbit UI Components', color: '#6366f1', label: 'Components' },
  { id: 2, title: 'Design Tokens', color: '#f59e0b', label: 'Tokens' },
  { id: 3, title: 'Typography Scale', color: '#10b981', label: 'Typography' },
]

function ImageViewerRender() {
  const [selected, setSelected] = useState<typeof GALLERY_ITEMS[0] | null>(null)

  return (
    <div>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', marginBottom: 12 }}>갤러리</div>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {GALLERY_ITEMS.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelected(item)}
            style={{
              width: 140,
              height: 100,
              borderRadius: 12,
              background: item.color + '20',
              border: `1px solid ${item.color}40`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              gap: 6,
            }}
          >
            <div style={{ width: 48, height: 48, borderRadius: 8, background: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 13 }}>
              {item.label[0]}
            </div>
            <div style={{ fontSize: 11, fontWeight: 600, color: item.color }}>{item.label}</div>
          </div>
        ))}
      </div>
      {selected && (
        <Dialog isPresented={true} onIsPresentedChange={() => setSelected(null)}>
          <Dialog.Top>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: '8px 0' }}>
              <div style={{ width: '100%', height: 200, borderRadius: 12, background: selected.color + '20', border: `2px solid ${selected.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 80, height: 80, borderRadius: 16, background: selected.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 24 }}>
                  {selected.label[0]}
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a' }}>{selected.title}</div>
                <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>{selected.label} · Orbit UI 2026</div>
              </div>
            </div>
          </Dialog.Top>
          <Dialog.Bottom direction="horizontal">
            <Dialog.Close asChild>
              <OutlineButton color="black" size="medium" width="100%">
                <OutlineButton.Center>닫기</OutlineButton.Center>
              </OutlineButton>
            </Dialog.Close>
          </Dialog.Bottom>
        </Dialog>
      )}
      <div style={{ marginTop: 12, fontSize: 11, color: '#94a3b8' }}>Mantine Modal — 썸네일 클릭 시 라이트박스 미리보기</div>
    </div>
  )
}

export const Mantine_이미지_뷰어_모달: Story = {
  name: 'Mantine - 이미지 뷰어 라이트박스 패턴',
  render: () => <ImageViewerRender />,
}

/* --------------------------------------------------------------------------
   Ant Design 벤치마크: 폼 제출 다이얼로그 패턴
   Ant Design Modal + Form — 인라인 폼 포함 모달 패턴
-------------------------------------------------------------------------- */
function FormModalRender() {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (name && email) {
      setSubmitted(true)
      setIsOpen(false)
      setName('')
      setEmail('')
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      {submitted && (
        <div style={{ padding: '12px 16px', borderRadius: 8, background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#16a34a', fontSize: 14, fontWeight: 600 }}>
          초대가 발송되었습니다.
        </div>
      )}
      <Dialog isPresented={isOpen} onIsPresentedChange={() => setIsOpen(false)}>
        <Dialog.Trigger asChild>
          <button
            onClick={() => setIsOpen(true)}
            style={{ padding: '10px 20px', borderRadius: 8, background: '#6366f1', color: '#fff', border: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
          >
            멤버 초대
          </button>
        </Dialog.Trigger>
        <Dialog.Top>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#0f172a' }}>팀 멤버 초대</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>이름</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="홍길동"
                  style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>이메일</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="hong@example.com"
                  style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
            </div>
          </div>
        </Dialog.Top>
        <Dialog.Bottom direction="horizontal">
          <Dialog.Close asChild>
            <OutlineButton color="black" size="medium" width="100%">
              <OutlineButton.Center>취소</OutlineButton.Center>
            </OutlineButton>
          </Dialog.Close>
          <Button
            color="primary"
            size="medium"
            width="100%"
            disabled={!name || !email}
            onClick={handleSubmit}
          >
            <Button.Center>초대 발송</Button.Center>
          </Button>
        </Dialog.Bottom>
      </Dialog>
      <div style={{ fontSize: 11, color: '#94a3b8' }}>Ant Design Modal + Form 패턴 — 인라인 입력 폼이 포함된 모달</div>
    </div>
  )
}

export const Ant_폼_제출_다이얼로그: Story = {
  name: 'Ant Design - 폼 제출 다이얼로그 패턴',
  render: () => <FormModalRender />,
}

/* --------------------------------------------------------------------------
   Radix UI — 이미지 미리보기 라이트박스
   비제어 모달 패턴 + ESC/배경 클릭 닫기
-------------------------------------------------------------------------- */
const LIGHTBOX_ITEMS = [
  { id: 'g1', label: 'Dashboard Overview', w: 320, h: 200, bg: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' },
  { id: 'g2', label: 'Analytics Report', w: 320, h: 200, bg: 'linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)' },
  { id: 'g3', label: 'Settings Panel', w: 320, h: 200, bg: 'linear-gradient(135deg, #10b981 0%, #0ea5e9 100%)' },
]

const LightboxRender = () => {
  const [selected, setSelected] = React.useState<typeof LIGHTBOX_ITEMS[0] | null>(null)
  return (
    <div style={{ padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
      <div style={{ display: 'flex', gap: 12 }}>
        {LIGHTBOX_ITEMS.map((item) => (
          <button key={item.id} onClick={() => setSelected(item)} style={{ border: 'none', padding: 0, cursor: 'pointer', borderRadius: 10, overflow: 'hidden', background: item.bg, width: 100, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 600, transition: 'transform 0.2s', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
            {item.label}
          </button>
        ))}
      </div>
      {selected && (
        <Dialog defaultIsPresented={true}>
          <Dialog.Top>
            <Typography style={{ fontWeight: 700, marginBottom: 12 }}>{selected.label}</Typography>
            <div style={{ width: '100%', height: 160, borderRadius: 10, background: selected.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 18, fontWeight: 700 }}>
              {selected.label}
            </div>
          </Dialog.Top>
          <Dialog.Bottom direction="horizontal">
            <Dialog.Close asChild>
              <Button color="gray" size="large" width="100%" onClick={() => setSelected(null)}>
                <Button.Center>닫기</Button.Center>
              </Button>
            </Dialog.Close>
          </Dialog.Bottom>
        </Dialog>
      )}
      <p style={{ fontSize: 12, color: '#94a3b8' }}>Radix UI Dialog — 비제어 라이트박스, 썸네일 클릭으로 미리보기</p>
    </div>
  )
}

export const Radix_라이트박스_이미지_미리보기: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Radix UI의 비제어(uncontrolled) Dialog 패턴. 썸네일 클릭 시 라이트박스 모달 오픈. ESC 키 또는 배경 클릭으로 닫기를 지원합니다.',
      },
    },
  },
  render: () => <LightboxRender />,
}

/* --------------------------------------------------------------------------
   Chakra UI — 사용자 프로필 편집 모달
   단순하고 직관적인 폼 UX 패턴
-------------------------------------------------------------------------- */
const ProfileEditRender = () => {
  const [name, setName] = React.useState('김지훈')
  const [bio, setBio] = React.useState('Design Systems Engineer')
  const [saved, setSaved] = React.useState(false)
  return (
    <div style={{ padding: 40, display: 'flex', justifyContent: 'center' }}>
      <Dialog defaultIsPresented={false}>
        <Dialog.Trigger asChild>
          <Button color="gray" size="medium">
            <Button.Center>프로필 편집</Button.Center>
          </Button>
        </Dialog.Trigger>
        <Dialog.Top>
          <Typography style={{ fontWeight: 700, marginBottom: 16 }}>프로필 편집</Typography>
          {saved && (
            <div style={{ padding: '8px 12px', borderRadius: 8, background: '#dcfce7', color: '#15803d', fontSize: 13, marginBottom: 12 }}>
              변경 사항이 저장되었습니다.
            </div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>이름</label>
              <FloatingTextField value={name} onChange={(e) => { setName(e.target.value); setSaved(false) }} placeholder="이름을 입력하세요" />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>직함</label>
              <FloatingTextField value={bio} onChange={(e) => { setBio(e.target.value); setSaved(false) }} placeholder="직함을 입력하세요" />
            </div>
          </div>
        </Dialog.Top>
        <Dialog.Bottom direction="horizontal">
          <Dialog.Close asChild>
            <Button color="gray" size="large" width="100%">
              <Button.Center>취소</Button.Center>
            </Button>
          </Dialog.Close>
          <Dialog.Close asChild>
            <Button color="primary" size="large" width="100%" onClick={() => setSaved(true)}>
              <Button.Center>저장</Button.Center>
            </Button>
          </Dialog.Close>
        </Dialog.Bottom>
      </Dialog>
      <p style={{ marginLeft: 16, fontSize: 12, color: '#94a3b8', alignSelf: 'center' }}>Chakra UI 프로필 편집 패턴 — 심플 폼, 즉시 피드백</p>
    </div>
  )
}

export const Chakra_프로필_편집_모달: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Chakra UI Modal의 단순 폼 패턴. 이름, 직함을 인라인 편집하고 저장 시 성공 배너를 즉시 표시합니다. props API의 단순함과 즉각적인 사용자 피드백이 특징입니다.',
      },
    },
  },
  render: () => <ProfileEditRender />,
}

/* --------------------------------------------------------------------------
   Radix + Chakra — 권한 설정 모달
   체크박스 목록 + 역할 선택 패턴
-------------------------------------------------------------------------- */
const PERM_LIST = [
  { id: 'read', label: '읽기', desc: '데이터 조회 권한' },
  { id: 'write', label: '쓰기', desc: '데이터 수정 권한' },
  { id: 'delete', label: '삭제', desc: '데이터 삭제 권한' },
  { id: 'admin', label: '관리자', desc: '모든 설정 변경 권한' },
]

const PermModalRender = () => {
  const [perms, setPerms] = React.useState<string[]>(['read'])
  const toggle = (id: string) => setPerms((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id])
  return (
    <div style={{ padding: 40, display: 'flex', justifyContent: 'center' }}>
      <Dialog defaultIsPresented={false}>
        <Dialog.Trigger asChild>
          <Button color="gray" size="medium">
            <Button.Center>권한 설정</Button.Center>
          </Button>
        </Dialog.Trigger>
        <Dialog.Top>
          <Typography style={{ fontWeight: 700, marginBottom: 4 }}>사용자 권한 설정</Typography>
          <Typography style={{ fontSize: 13, color: '#64748b', marginBottom: 16 }}>
            이 사용자에게 부여할 권한을 선택하세요.
          </Typography>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {PERM_LIST.map((p) => {
              const checked = perms.includes(p.id)
              return (
                <button key={p.id} onClick={() => toggle(p.id)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 8, border: `1px solid ${checked ? '#6366f1' : '#e2e8f0'}`, background: checked ? '#eef2ff' : '#fff', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}>
                  <span style={{ width: 18, height: 18, borderRadius: 4, border: `2px solid ${checked ? '#6366f1' : '#cbd5e1'}`, background: checked ? '#6366f1' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 11, color: '#fff', fontWeight: 700 }}>{checked ? 'v' : ''}</span>
                  <span style={{ flex: 1 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#0f172a', display: 'block' }}>{p.label}</span>
                    <span style={{ fontSize: 12, color: '#64748b' }}>{p.desc}</span>
                  </span>
                </button>
              )
            })}
          </div>
        </Dialog.Top>
        <Dialog.Bottom direction="horizontal">
          <Dialog.Close asChild>
            <Button color="gray" size="large" width="100%">
              <Button.Center>취소</Button.Center>
            </Button>
          </Dialog.Close>
          <Dialog.Close asChild>
            <Button color="primary" size="large" width="100%">
              <Button.Center>권한 저장 ({perms.length})</Button.Center>
            </Button>
          </Dialog.Close>
        </Dialog.Bottom>
      </Dialog>
      <p style={{ marginLeft: 16, fontSize: 12, color: '#94a3b8', alignSelf: 'center' }}>
        Radix + Chakra — 권한 체크리스트 + 카운트 표시
      </p>
    </div>
  )
}

export const Radix_Chakra_권한_설정_모달: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Radix UI Dialog + Chakra UI Checkbox 패턴 조합. 권한 목록을 토글 카드로 표현하고, 선택된 권한 수를 버튼에 실시간으로 표시합니다.',
      },
    },
  },
  render: () => <PermModalRender />,
}

/* --------------------------------------------------------------------------
   Tailwind UI 벤치마크: 알림 설정 모달
   Tailwind UI Notification preferences dialog 패턴
-------------------------------------------------------------------------- */
type TwNotifKey = 'email' | 'push' | 'slack' | 'sms'
type TwNotifCategory = 'mentions' | 'comments' | 'releases' | 'billing'

const TW_NOTIF_CHANNELS: { id: TwNotifKey; label: string; icon: string }[] = [
  { id: 'email', label: '이메일', icon: '✉' },
  { id: 'push', label: '푸시 알림', icon: '🔔' },
  { id: 'slack', label: 'Slack', icon: '#' },
  { id: 'sms', label: 'SMS', icon: '💬' },
]

const TW_NOTIF_CATEGORIES: { id: TwNotifCategory; label: string; desc: string }[] = [
  { id: 'mentions', label: '멘션', desc: '나를 태그하거나 언급한 경우' },
  { id: 'comments', label: '댓글', desc: '내 게시물에 댓글이 달린 경우' },
  { id: 'releases', label: '릴리즈', desc: '새로운 버전이 배포된 경우' },
  { id: 'billing', label: '결제', desc: '청구 및 결제 관련 알림' },
]

const TwNotifRender = () => {
  const [prefs, setPrefs] = React.useState<Record<TwNotifCategory, TwNotifKey[]>>({
    mentions: ['email', 'push'],
    comments: ['email'],
    releases: ['slack'],
    billing: ['email', 'sms'],
  })
  const [saved, setSaved] = React.useState(false)

  const toggle = (category: TwNotifCategory, channel: TwNotifKey) => {
    setSaved(false)
    setPrefs((prev) => {
      const current = prev[category]
      if (current.includes(channel)) {
        return { ...prev, [category]: current.filter((c) => c !== channel) }
      } else {
        return { ...prev, [category]: [...current, channel] }
      }
    })
  }

  return (
    <div style={{ padding: 40, display: 'flex', justifyContent: 'center' }}>
      <Dialog defaultIsPresented={false}>
        <Dialog.Trigger asChild>
          <Button color="primary" size="medium">
            <Button.Center>알림 설정</Button.Center>
          </Button>
        </Dialog.Trigger>
        <Dialog.Top>
          <Typography style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>알림 환경설정</Typography>
          <Typography style={{ fontSize: 12, color: '#64748b', marginBottom: 16 }}>
            카테고리별로 수신할 알림 채널을 선택하세요
          </Typography>

          {/* 채널 헤더 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr repeat(4, 48px)', gap: 0, marginBottom: 4 }}>
            <div />
            {TW_NOTIF_CHANNELS.map((ch) => (
              <div key={ch.id} style={{ textAlign: 'center', fontSize: 10, fontWeight: 700, color: '#94a3b8', letterSpacing: 0.5 }}>
                {ch.icon}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {TW_NOTIF_CATEGORIES.map((cat) => (
              <div key={cat.id} style={{ display: 'grid', gridTemplateColumns: '1fr repeat(4, 48px)', alignItems: 'center', padding: '10px 8px', borderRadius: 8, background: '#f8fafc' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{cat.label}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8' }}>{cat.desc}</div>
                </div>
                {TW_NOTIF_CHANNELS.map((ch) => {
                  const isOn = prefs[cat.id].includes(ch.id)
                  return (
                    <div key={ch.id} style={{ display: 'flex', justifyContent: 'center' }}>
                      <button
                        onClick={() => toggle(cat.id, ch.id)}
                        style={{
                          width: 20, height: 20, borderRadius: 4, border: `2px solid ${isOn ? '#6366f1' : '#cbd5e1'}`,
                          background: isOn ? '#6366f1' : '#fff', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 10, color: '#fff', fontWeight: 700, transition: 'all 0.15s',
                        }}
                      >
                        {isOn ? '✓' : ''}
                      </button>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>

          {saved && (
            <div style={{ marginTop: 12, padding: '8px 12px', borderRadius: 8, background: '#f0fdf4', border: '1px solid #bbf7d0', fontSize: 12, color: '#15803d', textAlign: 'center' }}>
              ✓ 알림 설정이 저장되었습니다
            </div>
          )}
        </Dialog.Top>
        <Dialog.Bottom direction="horizontal">
          <Dialog.Close asChild>
            <Button color="gray" size="large" width="100%">
              <Button.Center>취소</Button.Center>
            </Button>
          </Dialog.Close>
          <Button color="primary" size="large" width="100%" onClick={() => setSaved(true)}>
            <Button.Center>설정 저장</Button.Center>
          </Button>
        </Dialog.Bottom>
      </Dialog>
    </div>
  )
}

export const TailwindUI_알림_설정_모달: Story = {
  name: 'Tailwind UI — 알림 채널 환경설정 모달',
  parameters: {
    docs: {
      description: {
        story:
          'Tailwind UI Notification preferences dialog 패턴. ' +
          '카테고리(멘션/댓글/릴리즈/결제) × 채널(이메일/푸시/Slack/SMS) 체크박스 매트릭스로 ' +
          '세밀한 알림 설정을 지원. 저장 시 인라인 성공 배너 표시.',
      },
    },
  },
  render: () => <TwNotifRender />,
}

/* --------------------------------------------------------------------------
   Ant Design 벤치마크: 일괄 작업 확인 모달
   Ant Design Popconfirm / Modal.confirm 패턴
-------------------------------------------------------------------------- */
type AntBulkItem = { id: number; name: string; status: string; checked: boolean }

const AntBulkRender = () => {
  const [items, setItems] = React.useState<AntBulkItem[]>([
    { id: 1, name: 'user_data_2023.csv', status: '업로드 완료', checked: true },
    { id: 2, name: 'analytics_report.pdf', status: '처리 중', checked: true },
    { id: 3, name: 'legacy_backup.zip', status: '오류', checked: false },
    { id: 4, name: 'config_snapshot.json', status: '업로드 완료', checked: true },
  ])
  const [step, setStep] = React.useState<'idle' | 'confirm' | 'done'>('idle')

  const checkedItems = items.filter((i) => i.checked)

  const toggleItem = (id: number) => {
    setItems((prev) => prev.map((item) => item.id === id ? { ...item, checked: !item.checked } : item))
  }

  const handleDelete = () => {
    setItems((prev) => prev.filter((i) => !i.checked))
    setStep('done')
  }

  const statusColor: Record<string, string> = {
    '업로드 완료': '#10b981',
    '처리 중': '#f59e0b',
    '오류': '#ef4444',
  }

  return (
    <div style={{ padding: 40, display: 'flex', justifyContent: 'center' }}>
      <Dialog defaultIsPresented={false}>
        <Dialog.Trigger asChild>
          <Button color="primary" size="medium">
            <Button.Center>파일 관리</Button.Center>
          </Button>
        </Dialog.Trigger>
        <Dialog.Top>
          {step === 'done' ? (
            <div style={{ padding: '20px 0', textAlign: 'center' }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>🗑</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>삭제 완료</div>
              <div style={{ fontSize: 12, color: '#64748b' }}>선택한 파일이 삭제되었습니다.</div>
            </div>
          ) : step === 'confirm' ? (
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#dc2626', marginBottom: 8 }}>
                ⚠ 일괄 삭제 확인
              </div>
              <div style={{ fontSize: 13, color: '#475569', marginBottom: 16, lineHeight: 1.6 }}>
                선택한 <strong>{checkedItems.length}개</strong> 파일을 삭제하시겠습니까?<br />
                이 작업은 되돌릴 수 없습니다.
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {checkedItems.map((item) => (
                  <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 6, background: '#fef2f2', border: '1px solid #fecaca' }}>
                    <span style={{ fontSize: 14 }}>📄</span>
                    <span style={{ fontSize: 12, color: '#7f1d1d', flex: 1 }}>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <Typography style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>파일 목록</Typography>
              <Typography style={{ fontSize: 12, color: '#64748b', marginBottom: 14 }}>
                삭제할 파일을 선택하세요
              </Typography>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {items.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8,
                      border: `1px solid ${item.checked ? '#fecaca' : '#e2e8f0'}`,
                      background: item.checked ? '#fff5f5' : '#fff', cursor: 'pointer',
                    }}
                  >
                    <span style={{ width: 16, height: 16, borderRadius: 3, border: `2px solid ${item.checked ? '#ef4444' : '#cbd5e1'}`, background: item.checked ? '#ef4444' : '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#fff', fontWeight: 700, flexShrink: 0 }}>
                      {item.checked ? '✓' : ''}
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, color: '#0f172a', fontWeight: 500 }}>{item.name}</div>
                    </div>
                    <span style={{ fontSize: 10, fontWeight: 600, color: statusColor[item.status] ?? '#94a3b8' }}>{item.status}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Dialog.Top>
        <Dialog.Bottom direction="horizontal">
          {step === 'idle' && (
            <>
              <Dialog.Close asChild>
                <Button color="gray" size="large" width="100%">
                  <Button.Center>닫기</Button.Center>
                </Button>
              </Dialog.Close>
              <Button
                color="primary" size="large" width="100%"
                disabled={checkedItems.length === 0}
                onClick={() => setStep('confirm')}
              >
                <Button.Center>
                  {checkedItems.length > 0 ? `${checkedItems.length}개 삭제` : '항목 선택 필요'}
                </Button.Center>
              </Button>
            </>
          )}
          {step === 'confirm' && (
            <>
              <Button color="gray" size="large" width="100%" onClick={() => setStep('idle')}>
                <Button.Center>돌아가기</Button.Center>
              </Button>
              <Button color="primary" size="large" width="100%" onClick={handleDelete}>
                <Button.Center>삭제 확인</Button.Center>
              </Button>
            </>
          )}
          {step === 'done' && (
            <Dialog.Close asChild>
              <Button color="primary" size="large" width="100%">
                <Button.Center>완료</Button.Center>
              </Button>
            </Dialog.Close>
          )}
        </Dialog.Bottom>
      </Dialog>
    </div>
  )
}

export const Ant_일괄_삭제_확인_모달: Story = {
  name: 'Ant Design — 일괄 작업 확인 Modal.confirm 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Ant Design Modal.confirm 패턴. 파일 목록에서 다중 선택 후 삭제 확인 단계를 거치는 ' +
          '3단계 플로우(선택→확인→완료). 위험 작업의 이중 확인 UX를 구현합니다.',
      },
    },
  },
  render: () => <AntBulkRender />,
}

/* --------------------------------------------------------------------------
   Tailwind UI 벤치마크: 공유 설정 모달
   Tailwind UI Share dialog 패턴 — 링크 공유 + 권한 관리
-------------------------------------------------------------------------- */
type TwShareRole = 'viewer' | 'editor' | 'admin'

const TW_SHARE_ROLE_LABELS: Record<TwShareRole, string> = {
  viewer: '보기만 가능',
  editor: '편집 가능',
  admin: '관리자',
}

type TwShareMember = { id: number; name: string; email: string; role: TwShareRole; initials: string; color: string }

const TwShareRender = () => {
  const [members, setMembers] = React.useState<TwShareMember[]>([
    { id: 1, name: '김지수', email: 'jisu@orbit.dev', role: 'admin', initials: '김', color: '#3b82f6' },
    { id: 2, name: '이민준', email: 'minjun@orbit.dev', role: 'editor', initials: '이', color: '#8b5cf6' },
    { id: 3, name: '박서연', email: 'seoyeon@orbit.dev', role: 'viewer', initials: '박', color: '#10b981' },
  ])
  const [linkCopied, setLinkCopied] = React.useState(false)
  const [inviteEmail, setInviteEmail] = React.useState('')

  const changeRole = (id: number, role: TwShareRole) => {
    setMembers((prev) => prev.map((m) => m.id === id ? { ...m, role } : m))
  }

  const handleCopy = () => {
    setLinkCopied(true)
    setTimeout(() => setLinkCopied(false), 2000)
  }

  const handleInvite = () => {
    if (inviteEmail.trim() && inviteEmail.includes('@')) {
      const parts = inviteEmail.split('@')
      setMembers((prev) => [...prev, {
        id: Date.now(), name: parts[0], email: inviteEmail,
        role: 'viewer', initials: parts[0][0].toUpperCase(), color: '#94a3b8',
      }])
      setInviteEmail('')
    }
  }

  return (
    <div style={{ padding: 40, display: 'flex', justifyContent: 'center' }}>
      <Dialog defaultIsPresented={false}>
        <Dialog.Trigger asChild>
          <Button color="primary" size="medium">
            <Button.Center>공유</Button.Center>
          </Button>
        </Dialog.Trigger>
        <Dialog.Top>
          <Typography style={{ fontWeight: 700, fontSize: 15, marginBottom: 14 }}>접근 권한 관리</Typography>

          {/* 초대 */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
            <input
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { handleInvite() } }}
              placeholder="이메일로 초대..."
              style={{ flex: 1, padding: '8px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12, outline: 'none' }}
            />
            <button
              onClick={handleInvite}
              disabled={!inviteEmail.includes('@')}
              style={{
                padding: '8px 14px', borderRadius: 8, border: 'none', fontSize: 12, fontWeight: 600, cursor: inviteEmail.includes('@') ? 'pointer' : 'not-allowed',
                background: inviteEmail.includes('@') ? '#6366f1' : '#e2e8f0',
                color: inviteEmail.includes('@') ? '#fff' : '#94a3b8',
              }}
            >
              초대
            </button>
          </div>

          {/* 멤버 목록 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
            {members.map((m) => (
              <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 30, height: 30, borderRadius: '50%', background: m.color, color: '#fff', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {m.initials}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{m.name}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8' }}>{m.email}</div>
                </div>
                <select
                  value={m.role}
                  onChange={(e) => changeRole(m.id, e.target.value as TwShareRole)}
                  style={{ fontSize: 11, border: '1px solid #e2e8f0', borderRadius: 6, padding: '3px 6px', color: '#374151', background: '#fff', cursor: 'pointer' }}
                >
                  {(Object.keys(TW_SHARE_ROLE_LABELS) as TwShareRole[]).map((role) => (
                    <option key={role} value={role}>{TW_SHARE_ROLE_LABELS[role]}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          {/* 링크 공유 */}
          <div style={{ padding: '10px 12px', borderRadius: 8, background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 12, color: '#64748b', flex: 1 }}>https://orbit.dev/share/abc123</span>
            <button
              onClick={handleCopy}
              style={{ padding: '4px 10px', borderRadius: 6, border: 'none', background: linkCopied ? '#10b981' : '#6366f1', color: '#fff', fontSize: 11, fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s' }}
            >
              {linkCopied ? '복사됨 ✓' : '링크 복사'}
            </button>
          </div>
        </Dialog.Top>
        <Dialog.Bottom direction="horizontal">
          <Dialog.Close asChild>
            <Button color="gray" size="large" width="100%">
              <Button.Center>닫기</Button.Center>
            </Button>
          </Dialog.Close>
          <Dialog.Close asChild>
            <Button color="primary" size="large" width="100%">
              <Button.Center>완료</Button.Center>
            </Button>
          </Dialog.Close>
        </Dialog.Bottom>
      </Dialog>
    </div>
  )
}

export const TailwindUI_공유_권한_모달: Story = {
  name: 'Tailwind UI — 공유 권한 관리 Share Dialog',
  parameters: {
    docs: {
      description: {
        story:
          'Tailwind UI Share dialog 패턴. 이메일 초대 + 멤버별 역할 선택(드롭다운) + ' +
          '링크 복사 기능이 통합된 공유 권한 관리 모달. ' +
          '초대 즉시 목록에 추가되며 역할은 인라인에서 변경 가능합니다.',
      },
    },
  },
  render: () => <TwShareRender />,
}

// ============================================================
// Cycle 135 — shadcn/ui + Ant Design 벤치마크 반영
// ============================================================

// shadcn/ui 스타일 — 이미지 갤러리 모달 (라이트박스 패턴)
const GALLERY_ITEMS_135 = [
  { id: 1, title: 'Button 컴포넌트 설계', desc: '3-tier 토큰 아키텍처 다이어그램', color: '#6366f1' },
  { id: 2, title: 'Toast 알림 UI', desc: '4방향 위치 + 다크모드 스크린샷', color: '#10b981' },
  { id: 3, title: 'DataTable 필터링', desc: '멀티 컬럼 정렬 + 페이지네이션', color: '#f59e0b' },
  { id: 4, title: 'Command 팔레트', desc: 'Spotlight 스타일 검색 UI', color: '#ec4899' },
  { id: 5, title: 'Modal 다이얼로그', desc: '스크롤 영역 + 폼 레이아웃', color: '#8b5cf6' },
  { id: 6, title: 'Carousel 뷰어', desc: '터치 스와이프 + 도트 인디케이터', color: '#0ea5e9' },
]

function ShadcnLightboxRender() {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(0)
  const item = GALLERY_ITEMS_135[selected]
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif' }}>
      {/* 썸네일 그리드 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 120px)', gap: 8 }}>
        {GALLERY_ITEMS_135.map((g, i) => (
          <div
            key={g.id}
            onClick={() => { setSelected(i); setIsOpen(true) }}
            style={{
              height: 80, borderRadius: 8, background: g.color + '22', border: `2px solid ${g.color}44`,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'transform 150ms', overflow: 'hidden',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.04)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
          >
            <div style={{ width: 32, height: 32, borderRadius: 6, background: g.color, marginBottom: 4 }} />
            <span style={{ fontSize: 10, color: g.color, fontWeight: 600, textAlign: 'center', padding: '0 4px' }}>{g.title}</span>
          </div>
        ))}
      </div>
      {/* 라이트박스 모달 */}
      <Dialog isPresented={isOpen} onIsPresentedChange={setIsOpen}>
        <Dialog.Top>
          <h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 700, color: '#0f172a' }}>{item.title}</h3>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 0' }}>
            <div style={{ width: 200, height: 140, borderRadius: 12, background: item.color + '22', border: `2px solid ${item.color}44`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
              <div style={{ width: 60, height: 60, borderRadius: 12, background: item.color }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: item.color }}>{item.title}</span>
            </div>
          </div>
          <Typography textStyle="bodySmall" style={{ color: vars.sem.color.foregroundSecondary, textAlign: 'center' }}>
            {item.desc}
          </Typography>
        </Dialog.Top>
        <Dialog.Bottom direction="horizontal">
          <Button
            color="gray" size="large" width="50%"
            disabled={selected === 0}
            onClick={() => setSelected((s) => Math.max(0, s - 1))}
          >
            <Button.Center>이전</Button.Center>
          </Button>
          <Button
            color="primary" size="large" width="50%"
            disabled={selected === GALLERY_ITEMS_135.length - 1}
            onClick={() => setSelected((s) => Math.min(GALLERY_ITEMS_135.length - 1, s + 1))}
          >
            <Button.Center>다음</Button.Center>
          </Button>
        </Dialog.Bottom>
      </Dialog>
    </div>
  )
}

export const Shadcn_라이트박스_갤러리_모달: Story = {
  name: 'shadcn/ui - 라이트박스 갤러리 모달',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story:
          'shadcn/ui Dialog 라이트박스 패턴. 썸네일 그리드 클릭 → 모달에서 상세 보기. ' +
          '이전/다음 버튼으로 항목 순회. 호버 시 썸네일 scale 애니메이션.',
      },
    },
  },
  render: () => <ShadcnLightboxRender />,
}

// Ant Design 스타일 — 상세 정보 드로어 스타일 모달 (SlideIn 패턴)
type ProjectDetail = { name: string; owner: string; status: string; health: number; members: string[]; tags: string[]; desc: string }

const PROJECT_DETAIL: ProjectDetail = {
  name: 'orbit-ui',
  owner: '김희준',
  status: '진행 중',
  health: 87,
  members: ['HJ', 'JS', 'MJ', 'SH'],
  tags: ['React', 'TypeScript', 'Storybook'],
  desc: 'Figma 기반 React 디자인 시스템. 3-tier 토큰 구조와 vanilla-extract 테마 시스템을 활용한 컴포넌트 라이브러리.',
}

function AntDetailDrawerRender() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif' }}>
      <OutlineButton color="black" size="medium" onClick={() => setIsOpen(true)}>
        <OutlineButton.Center>프로젝트 상세</OutlineButton.Center>
      </OutlineButton>
      <Dialog isPresented={isOpen} onIsPresentedChange={setIsOpen}>
        <Dialog.Top>
          <h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 700, color: '#0f172a' }}>{PROJECT_DETAIL.name}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 8 }}>
            {/* 헬스 게이지 */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#475569', marginBottom: 4 }}>
                <span>프로젝트 건강도</span>
                <span style={{ fontWeight: 700, color: PROJECT_DETAIL.health >= 80 ? '#22c55e' : '#f59e0b' }}>{PROJECT_DETAIL.health}%</span>
              </div>
              <div style={{ height: 6, background: '#f1f5f9', borderRadius: 99 }}>
                <div style={{ height: '100%', width: `${PROJECT_DETAIL.health}%`, background: PROJECT_DETAIL.health >= 80 ? '#22c55e' : '#f59e0b', borderRadius: 99 }} />
              </div>
            </div>
            {/* 메타 정보 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 2 }}>담당자</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{PROJECT_DETAIL.owner}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 2 }}>상태</div>
                <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 99, background: '#dcfce7', color: '#16a34a' }}>{PROJECT_DETAIL.status}</span>
              </div>
            </div>
            {/* 멤버 */}
            <div>
              <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 6 }}>팀원 ({PROJECT_DETAIL.members.length}명)</div>
              <div style={{ display: 'flex', gap: 6 }}>
                {PROJECT_DETAIL.members.map((m, i) => (
                  <div key={i} style={{ width: 32, height: 32, borderRadius: '50%', background: ['#6366f1', '#10b981', '#f59e0b', '#ec4899'][i % 4], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff' }}>
                    {m}
                  </div>
                ))}
              </div>
            </div>
            {/* 태그 */}
            <div>
              <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 6 }}>기술 스택</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {PROJECT_DETAIL.tags.map((t) => (
                  <span key={t} style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, background: '#f1f5f9', color: '#0f172a', border: '1px solid #e2e8f0' }}>{t}</span>
                ))}
              </div>
            </div>
            {/* 설명 */}
            <Typography textStyle="bodySmall" style={{ color: vars.sem.color.foregroundSecondary, lineHeight: 1.7 }}>
              {PROJECT_DETAIL.desc}
            </Typography>
          </div>
        </Dialog.Top>
        <Dialog.Bottom direction="horizontal">
          <Dialog.Close asChild>
            <Button color="gray" size="large" width="100%">
              <Button.Center>닫기</Button.Center>
            </Button>
          </Dialog.Close>
        </Dialog.Bottom>
      </Dialog>
    </div>
  )
}

export const Ant_프로젝트_상세_정보_모달: Story = {
  name: 'Ant Design - 프로젝트 상세 정보 모달',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story:
          'Ant Design Drawer 패턴을 Modal로 구현. 프로젝트 건강도 게이지, ' +
          '메타 정보(담당자/상태), 팀원 아바타, 기술 스택 태그, 설명 복합 레이아웃.',
      },
    },
  },
  render: () => <AntDetailDrawerRender />,
}

// shadcn/ui + Ant — 멀티스텝 폼 모달 (Wizard 패턴)
type WizardStep135 = 'basic' | 'config' | 'review'

function ShadcnAntWizardModalRender() {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState<WizardStep135>('basic')
  const [data, setData] = useState({ name: '', type: '', region: '', confirm: false })
  const STEPS: WizardStep135[] = ['basic', 'config', 'review']
  const stepIdx = STEPS.indexOf(step)
  const stepLabel: Record<WizardStep135, string> = { basic: '기본 정보', config: '환경 설정', review: '검토' }
  const canNext = step === 'basic' ? data.name.length > 0 : step === 'config' ? data.type.length > 0 : data.confirm
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif' }}>
      <Button color="primary" size="large" onClick={() => { setIsOpen(true); setStep('basic') }}>
        <Button.Center>프로젝트 생성</Button.Center>
      </Button>
      <Dialog isPresented={isOpen} onIsPresentedChange={(open) => { setIsOpen(open); if (!open) setStep('basic') }}>
        <Dialog.Top>
          <h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 700, color: '#0f172a' }}>새 프로젝트 생성</h3>
          {/* 진행 바 */}
          <div style={{ display: 'flex', gap: 4, marginTop: 8, marginBottom: 16 }}>
            {STEPS.map((s, i) => (
              <div key={s} style={{ flex: 1 }}>
                <div style={{ height: 3, borderRadius: 99, background: i <= stepIdx ? '#0f172a' : '#e2e8f0', transition: 'background 250ms' }} />
                <div style={{ fontSize: 10, color: i <= stepIdx ? '#0f172a' : '#94a3b8', marginTop: 4, fontWeight: i === stepIdx ? 700 : 400 }}>{stepLabel[s]}</div>
              </div>
            ))}
          </div>
          {/* 단계 콘텐츠 */}
          {step === 'basic' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <FloatingTextField
                placeholder="프로젝트 이름"
                value={data.name}
                onChange={(e) => setData((d) => ({ ...d, name: (e.target as HTMLInputElement).value }))}
              />
            </div>
          )}
          {step === 'config' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 4 }}>프레임워크 선택</div>
              {['Next.js', 'Vite + React', 'Remix'].map((t) => (
                <label key={t} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px', borderRadius: 8, border: `1.5px solid ${data.type === t ? '#0f172a' : '#e2e8f0'}`, cursor: 'pointer' }} onClick={() => setData((d) => ({ ...d, type: t }))}>
                  <span style={{ width: 14, height: 14, borderRadius: '50%', border: `2px solid ${data.type === t ? '#0f172a' : '#cbd5e1'}`, background: data.type === t ? '#0f172a' : '#fff', flexShrink: 0 }} />
                  <span style={{ fontSize: 13, fontWeight: data.type === t ? 600 : 400, color: '#0f172a' }}>{t}</span>
                </label>
              ))}
            </div>
          )}
          {step === 'review' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ padding: '12px', borderRadius: 8, background: '#f8fafc', border: '1px solid #e2e8f0', fontSize: 13 }}>
                <div><span style={{ color: '#94a3b8' }}>이름:</span> <span style={{ fontWeight: 600 }}>{data.name}</span></div>
                <div style={{ marginTop: 4 }}><span style={{ color: '#94a3b8' }}>프레임워크:</span> <span style={{ fontWeight: 600 }}>{data.type}</span></div>
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 12, color: '#475569' }}>
                <input type="checkbox" checked={data.confirm} onChange={(e) => setData((d) => ({ ...d, confirm: e.target.checked }))} />
                입력 정보를 확인했습니다.
              </label>
            </div>
          )}
        </Dialog.Top>
        <Dialog.Bottom direction="horizontal">
          {stepIdx > 0 && (
            <OutlineButton color="black" size="large" width="50%" onClick={() => setStep(STEPS[stepIdx - 1] as WizardStep135)}>
              <OutlineButton.Center>이전</OutlineButton.Center>
            </OutlineButton>
          )}
          {step !== 'review' ? (
            <Button color="primary" size="large" width={stepIdx > 0 ? '50%' : '100%'} disabled={!canNext} onClick={() => setStep(STEPS[stepIdx + 1] as WizardStep135)}>
              <Button.Center>다음</Button.Center>
            </Button>
          ) : (
            <Button color="primary" size="large" width={stepIdx > 0 ? '50%' : '100%'} disabled={!canNext} onClick={() => { setIsOpen(false); setStep('basic'); setData({ name: '', type: '', region: '', confirm: false }) }}>
              <Button.Center>생성 완료</Button.Center>
            </Button>
          )}
        </Dialog.Bottom>
      </Dialog>
    </div>
  )
}

export const Shadcn_Ant_멀티스텝_폼_모달: Story = {
  name: 'shadcn/ui + Ant Design - 멀티스텝 폼 모달',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story:
          'shadcn/ui + Ant Design Steps 결합. 기본 정보 → 환경 설정 → 검토 3단계 위저드. ' +
          '단계별 진행 바, 라디오 카드 선택, 최종 검토 확인 체크박스. 각 단계 유효성 검증 후 다음 허용.',
      },
    },
  },
  render: () => <ShadcnAntWizardModalRender />,
}

/* --------------------------------------------------------------------------
   Cycle 164 — Google Material 3 + shadcn/ui
   Material 3: 피드백 다이얼로그 패턴 (Alert Dialog with tonal surface)
-------------------------------------------------------------------------- */
const M3_RISK_LEVELS = [
  { level: 'info', label: '안내', color: '#2196f3', bg: '#e3f2fd', icon: 'ℹ' },
  { level: 'warning', label: '경고', color: '#ff9800', bg: '#fff3e0', icon: '⚠' },
  { level: 'critical', label: '위험', color: '#f44336', bg: '#ffebee', icon: '⛔' },
]

function M3FeedbackDialogRender() {
  const [open, setOpen] = useState(false)
  const [riskLevel, setRiskLevel] = useState<'info' | 'warning' | 'critical'>('warning')
  const [confirmed, setConfirmed] = useState(false)

  const risk = M3_RISK_LEVELS.find(r => r.level === riskLevel) ?? M3_RISK_LEVELS[1]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: 8 }}>
        {M3_RISK_LEVELS.map(r => (
          <button key={r.level} onClick={() => setRiskLevel(r.level as 'info' | 'warning' | 'critical')} style={{ padding: '6px 14px', borderRadius: 20, border: `1.5px solid ${riskLevel === r.level ? r.color : '#e5e7eb'}`, background: riskLevel === r.level ? r.bg : '#fff', color: riskLevel === r.level ? r.color : '#64748b', fontSize: 12, fontWeight: riskLevel === r.level ? 700 : 400, cursor: 'pointer', transition: 'all 150ms' }}>
            {r.icon} {r.label}
          </button>
        ))}
      </div>

      <Dialog onOpenChange={(o) => { if (!o) { setOpen(false); setConfirmed(false) } }}>
        <Dialog.Trigger asChild>
          <Button color="primary" size="medium" onClick={() => setOpen(true)}>
            <Button.Center>Material 3 다이얼로그 열기</Button.Center>
          </Button>
        </Dialog.Trigger>
        <Dialog.Top>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, textAlign: 'center' }}>
            <div style={{ width: 52, height: 52, borderRadius: '50%', background: risk.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>{risk.icon}</div>
            <Typography textStyle="subheadingSmall">{risk.label} — 작업 확인 필요</Typography>
            <Typography textStyle="descriptionLarge">
              이 작업은 {risk.label === '위험' ? '되돌릴 수 없습니다.' : '일부 영향을 줄 수 있습니다.'} 계속 진행하기 전에 내용을 확인해주세요. Material 3의 Tonal Surface 패턴으로 중요도를 시각적으로 구분합니다.
            </Typography>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderRadius: 10, background: risk.bg, width: '100%', cursor: 'pointer' }} onClick={() => setConfirmed(c => !c)}>
              <div style={{ width: 18, height: 18, borderRadius: 4, border: `2px solid ${risk.color}`, background: confirmed ? risk.color : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 150ms' }}>
                {confirmed && <span style={{ color: '#fff', fontSize: 11, fontWeight: 700 }}>✓</span>}
              </div>
              <span style={{ fontSize: 12, color: risk.color, fontWeight: 600 }}>확인하고 진행합니다</span>
            </div>
          </div>
        </Dialog.Top>
        <Dialog.Bottom direction="horizontal">
          <Dialog.Close asChild>
            <OutlineButton color="gray" size="medium" width="100%">
              <OutlineButton.Center>취소</OutlineButton.Center>
            </OutlineButton>
          </Dialog.Close>
          <Dialog.Close asChild>
            <Button color="primary" size="medium" width="100%" disabled={!confirmed}>
              <Button.Center>확인</Button.Center>
            </Button>
          </Dialog.Close>
        </Dialog.Bottom>
      </Dialog>

      {open && confirmed && <div style={{ fontSize: 12, color: '#22c55e', fontWeight: 600 }}>작업이 확인되었습니다</div>}
    </div>
  )
}

export const Material3_피드백_다이얼로그: Story = {
  name: 'Google Material 3 — 피드백 다이얼로그 (Tonal Surface)',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Material 3 Alert Dialog + Tonal Surface 패턴. 안내/경고/위험 3가지 위험 레벨 전환, 중앙 아이콘 서클, 확인 체크박스 필수 선택 후 확인 버튼 활성화. M3 색상 역할 시스템 반영.',
      },
    },
  },
  render: () => <M3FeedbackDialogRender />,
}

/* --------------------------------------------------------------------------
   shadcn/ui: 커맨드 팔레트 트리거 모달 패턴
-------------------------------------------------------------------------- */
const SHADCN_QUICK_ACTIONS = [
  { group: '생성', items: [
    { icon: '📝', label: '새 파일', shortcut: '⌘ N' },
    { icon: '📁', label: '새 폴더', shortcut: '⌘ ⇧ N' },
    { icon: '🔗', label: '새 링크', shortcut: '⌘ K' },
  ]},
  { group: '이동', items: [
    { icon: '🏠', label: '대시보드', shortcut: 'G D' },
    { icon: '⚙️', label: '설정', shortcut: 'G S' },
    { icon: '👤', label: '프로필', shortcut: 'G P' },
  ]},
]

function ShadcnCommandModalRender() {
  const [query, setQuery] = useState('')
  const [chosen, setChosen] = useState<string | null>(null)

  const allItems = SHADCN_QUICK_ACTIONS.flatMap(g => g.items.map(i => ({ ...i, group: g.group })))
  const filtered = query ? allItems.filter(i => i.label.includes(query) || i.group.includes(query)) : allItems
  const grouped = filtered.reduce<Record<string, typeof allItems>>((acc, item) => {
    if (!acc[item.group]) { acc[item.group] = [] }
    acc[item.group].push(item)
    return acc
  }, {})

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
      <Dialog>
        <Dialog.Trigger asChild>
          <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#f8fafc', color: '#64748b', fontSize: 13, cursor: 'pointer', fontFamily: 'system-ui' }}>
            <span>빠른 실행...</span>
            <span style={{ marginLeft: 'auto', fontSize: 11, padding: '2px 6px', borderRadius: 4, background: '#e5e7eb', color: '#64748b', fontFamily: 'monospace' }}>⌘ K</span>
          </button>
        </Dialog.Trigger>
        <Dialog.Top>
          <FloatingTextField
            placeholder="명령 검색..."
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setQuery(e.target.value)}
          />
          <div style={{ marginTop: 8, maxHeight: 220, overflowY: 'auto' }}>
            {Object.entries(grouped).map(([group, items]) => (
              <div key={group}>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.07em', padding: '8px 4px 4px' }}>{group}</div>
                {items.map((item) => (
                  <Dialog.Close key={item.label} asChild>
                    <div onClick={() => setChosen(item.label)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px', borderRadius: 7, cursor: 'pointer', transition: 'background 100ms' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = '#f8fafc' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'transparent' }}>
                      <span style={{ fontSize: 15 }}>{item.icon}</span>
                      <span style={{ fontSize: 13, flex: 1, color: '#1e293b' }}>{item.label}</span>
                      {item.shortcut && <span style={{ fontSize: 10, color: '#94a3b8', fontFamily: 'monospace', background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>{item.shortcut}</span>}
                    </div>
                  </Dialog.Close>
                ))}
              </div>
            ))}
            {filtered.length === 0 && <div style={{ padding: '20px', textAlign: 'center', fontSize: 12, color: '#94a3b8' }}>결과 없음</div>}
          </div>
        </Dialog.Top>
      </Dialog>
      {chosen && <div style={{ fontSize: 12, color: '#6366f1', fontWeight: 600 }}>실행: {chosen}</div>}
    </div>
  )
}

export const Shadcn_커맨드_팔레트_모달: Story = {
  name: 'shadcn/ui — 커맨드 팔레트 트리거 모달',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'shadcn/ui cmdk 패턴. ⌘K 트리거 버튼 → Dialog 내 FloatingTextField 검색 + 그룹별 액션 목록. 선택 시 Dialog 자동 닫힘. 실무에서 가장 많이 사용되는 Command Palette 구현 패턴.',
      },
    },
  },
  render: () => <ShadcnCommandModalRender />,
}

/* --------------------------------------------------------------------------
   Material 3 + shadcn/ui: 이미지 크롭 / 파일 업로드 모달 복합 패턴
-------------------------------------------------------------------------- */
type UploadStep = 'select' | 'preview' | 'done'

const FILE_TYPES = [
  { ext: 'PNG', color: '#6366f1', size: '2.4 MB' },
  { ext: 'SVG', color: '#22c55e', size: '84 KB' },
  { ext: 'PDF', color: '#f59e0b', size: '1.1 MB' },
]

function M3ShadcnFileUploadModalRender() {
  const [step, setStep] = useState<UploadStep>('select')
  const [selectedFile, setSelectedFile] = useState<number | null>(null)
  const [quality, setQuality] = useState(80)

  const file = selectedFile !== null ? FILE_TYPES[selectedFile] : null

  const handleConfirm = () => {
    if (step === 'select' && selectedFile !== null) { setStep('preview') }
    else if (step === 'preview') { setStep('done') }
  }

  const handleClose = () => { setStep('select'); setSelectedFile(null); setQuality(80) }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <Dialog onOpenChange={(o) => { if (!o) { handleClose() } }}>
        <Dialog.Trigger asChild>
          <Button color="primary" size="medium">
            <Button.Center>파일 업로드</Button.Center>
          </Button>
        </Dialog.Trigger>
        <Dialog.Top>
          <Typography textStyle="subheadingSmall" style={{ marginBottom: 16 }}>
            {step === 'select' ? '파일 선택' : step === 'preview' ? '미리보기 & 설정' : '업로드 완료'}
          </Typography>

          {/* Step indicator — M3 패턴 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 20 }}>
            {(['select', 'preview', 'done'] as UploadStep[]).map((s, i) => (
              <React.Fragment key={s}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: step === s ? '#6366f1' : ((['select', 'preview', 'done'] as UploadStep[]).indexOf(step) > i ? '#6366f1' : '#e5e7eb'), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: ((['select', 'preview', 'done'] as UploadStep[]).indexOf(step) >= i ? '#fff' : '#94a3b8'), transition: 'all 200ms' }}>{i + 1}</div>
                {i < 2 && <div style={{ flex: 1, height: 2, background: (['select', 'preview', 'done'] as UploadStep[]).indexOf(step) > i ? '#6366f1' : '#e5e7eb', transition: 'background 200ms' }} />}
              </React.Fragment>
            ))}
          </div>

          {step === 'select' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Typography textStyle="descriptionLarge">파일 형식을 선택하세요</Typography>
              {FILE_TYPES.map((f, i) => (
                <div key={f.ext} onClick={() => setSelectedFile(i)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 10, border: `2px solid ${selectedFile === i ? f.color : '#e5e7eb'}`, background: selectedFile === i ? f.color + '10' : '#fff', cursor: 'pointer', transition: 'all 150ms' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: f.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: f.color }}>{f.ext}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{f.ext} 파일</div>
                    <div style={{ fontSize: 11, color: '#94a3b8' }}>예상 크기: {f.size}</div>
                  </div>
                  {selectedFile === i && <span style={{ marginLeft: 'auto', fontSize: 16, color: f.color }}>✓</span>}
                </div>
              ))}
            </div>
          )}

          {step === 'preview' && file && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ padding: '20px', borderRadius: 12, background: file.color + '10', border: `2px dashed ${file.color}50`, textAlign: 'center' }}>
                <div style={{ fontSize: 32, fontWeight: 800, color: file.color, marginBottom: 6 }}>{file.ext}</div>
                <div style={{ fontSize: 11, color: '#64748b' }}>{file.size}</div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#475569' }}>품질 설정 (M3 슬라이더 패턴)</span>
                  <span style={{ fontSize: 12, color: file.color, fontWeight: 700 }}>{quality}%</span>
                </div>
                <input type="range" min={20} max={100} step={5} value={quality} onChange={e => setQuality(Number(e.target.value))} style={{ width: '100%', accentColor: file.color }} />
              </div>
            </div>
          )}

          {step === 'done' && file && (
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
              <Typography textStyle="subheadingSmall">{file.ext} 업로드 완료</Typography>
              <Typography textStyle="descriptionLarge">{file.size} · 품질 {quality}%</Typography>
            </div>
          )}
        </Dialog.Top>
        <Dialog.Bottom direction="horizontal">
          <Dialog.Close asChild>
            <OutlineButton color="gray" size="medium" width="100%" onClick={handleClose}>
              <OutlineButton.Center>닫기</OutlineButton.Center>
            </OutlineButton>
          </Dialog.Close>
          {step !== 'done' && (
            <Button color="primary" size="medium" width="100%" disabled={step === 'select' && selectedFile === null} onClick={handleConfirm}>
              <Button.Center>{step === 'select' ? '다음' : '업로드'}</Button.Center>
            </Button>
          )}
        </Dialog.Bottom>
      </Dialog>
    </div>
  )
}

export const M3_Shadcn_파일_업로드_모달: Story = {
  name: 'Material 3 + shadcn/ui — 파일 업로드 멀티스텝 모달',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Material 3 Step Indicator + shadcn/ui Dialog 패턴. 선택 → 미리보기 → 완료 3단계, 파일 형식 카드 선택, M3 슬라이더 품질 설정, 단계별 버튼 상태 제어. M3 색상 역할(Primary/Tonal) 반영.',
      },
    },
  },
  render: () => <M3ShadcnFileUploadModalRender />,
}
