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
