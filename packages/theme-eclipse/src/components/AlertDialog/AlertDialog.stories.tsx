import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { FilledButton as Button } from '../SolidButton'
import { TextField } from '../TextField'

import { Alert } from './AlertDialog'

const meta = {
  title: 'eclipse/Uncategorized/Alert',
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
    <Alert {...args}>
      <Alert.Trigger asChild>
        <Button color="mint" size="medium">
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
  ),
}

export const 컨펌: Story = {
  render: (args: React.ComponentProps<typeof Alert>) => {
    return (
      <Alert {...args}>
        <Alert.Trigger asChild>
          <Button color="mint" size="medium">
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
    )
  },
}

export const 버튼세로정렬: Story = {
  render: (args: React.ComponentProps<typeof Alert>) => {
    return (
      <Alert {...args}>
        <Alert.Trigger asChild>
          <Button color="mint" size="medium">
            <Button.Center>열기</Button.Center>
          </Button>
        </Alert.Trigger>
        <Alert.Top>
          <Alert.Title>공유 계정 사용을 활성화할까요?</Alert.Title>
          <Alert.Description>
            공유 계정을 사용하면 에이더 멤버십 혜택을 받을 수 없어요.
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
    )
  },
}

export const 디자인QA = {
  args: {
    footerDirection: 'horizontal',
    titleText: '공유 계정 사용을 활성화할까요?',
    descriptionText: '공유 계정을 사용하면 에이더 멤버십 혜택을 받을 수 없어요.',
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
      <Alert {...rest}>
        <Alert.Trigger asChild>
          <Button color="mint" size="medium">
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
    )
  },
}
