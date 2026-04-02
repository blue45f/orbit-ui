import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { FilledButton as Button } from '../SolidButton'
import { TextField } from '../TextField'

import { Alert } from './AlertDialog'

const meta = {
  title: 'ocean/Alert',
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
      <Alert.Trigger>
        <Button color='mint' size='medium'>
          <Button.Center>열기</Button.Center>
        </Button>
      </Alert.Trigger>
      <Alert.Top>
        <Alert.Title>수령방법이 변경됐어요.</Alert.Title>
        <Alert.Description>결제금액과 함께 확인 후 결제해주세요.</Alert.Description>
      </Alert.Top>
      <Alert.Bottom>
        <Alert.Close>
          <Button color='black' size='large' width='100%'>
            <Button.Center>버튼</Button.Center>
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
        <Alert.Trigger>
          <Button color='mint' size='medium'>
            <Button.Center>열기</Button.Center>
          </Button>
        </Alert.Trigger>
        <Alert.Top>
          <Alert.Title>결제를 거절하시겠어요?</Alert.Title>
          <form
            id='prism-form'
            onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.target as HTMLFormElement)
              const reason = formData.get('reason')
              alert(`Form 제출 완료. ${reason?.toString()}`)
            }}
          >
            <Alert.Description>결제요청을 거절하시려면 아래에 사유를 입력해 주세요.</Alert.Description>
            <TextField placeholder='예) 이번 달 예산 초과' name='reason' />
          </form>
        </Alert.Top>
        <Alert.Bottom>
          <Alert.Close>
            <Button color='gray' size='large' width='100%'>
              <Button.Center>작성 취소</Button.Center>
            </Button>
          </Alert.Close>
          <Button type='submit' form='prism-form' color='black' size='large' width='100%'>
            <Button.Center>버튼</Button.Center>
          </Button>
        </Alert.Bottom>
      </Alert>
    )
  },
}

export const 버튼세로정렬: Story = {
  render: (args: React.ComponentProps<typeof Alert>) => {
    return (
      <Alert {...args}>
        <Alert.Trigger>
          <Button color='mint' size='medium'>
            <Button.Center>열기</Button.Center>
          </Button>
        </Alert.Trigger>
        <Alert.Top>
          <Alert.Title>가족계정 결제를 선택할까요?</Alert.Title>
          <Alert.Description>가족계정으로 결제하면 샘플앱클럽 혜택을 받을 수 없어요.</Alert.Description>
        </Alert.Top>
        <Alert.Bottom direction='vertical'>
          <Button color='black' size='large' width='100%'>
            <Button.Center>가족계정 결제 선택</Button.Center>
          </Button>
          <Alert.Close>
            <Button color='gray' size='large' width='100%'>
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
    titleText: '가족계정 결제를 선택할까요?',
    descriptionText: '가족계정으로 결제하면 샘플앱클럽 혜택을 받을 수 없어요.',
    buttonText: '가족계정 결제 선택',
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
  render: ({ footerDirection, titleText, descriptionText, buttonText, buttonCount, ...rest }: any) => {
    return (
      <Alert {...rest}>
        <Alert.Trigger>
          <Button color='mint' size='medium'>
            <Button.Center>열기</Button.Center>
          </Button>
        </Alert.Trigger>
        <Alert.Top>
          <Alert.Title>{titleText}</Alert.Title>
          <Alert.Description>{descriptionText}</Alert.Description>
        </Alert.Top>
        <Alert.Bottom direction={footerDirection}>
          <Button color='black' size='large' width='100%'>
            <Button.Center>{buttonText}</Button.Center>
          </Button>
          {buttonCount === 2 && (
            <Alert.Close>
              <Button color='gray' size='large' width='100%'>
                <Button.Center>취소</Button.Center>
              </Button>
            </Alert.Close>
          )}
        </Alert.Bottom>
      </Alert>
    )
  },
}
