import { Flex } from '@prism-ui/core'
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { vars } from '../../styles'
import { FilledButton as Button } from '../SolidButton'
import { Typography } from '../Text'

import { Dialog } from './Modal'

const meta = {
  title: 'mint/Dialog',
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
      <Dialog.Trigger>
        <Button color='mint' size='medium'>
          <Button.Center>열기</Button.Center>
        </Button>
      </Dialog.Trigger>
      <Dialog.Top>
        <Typography textStyle='subheadingSmall' maxLines={2}>
          배달팁은 어떻게 결정되나요?
        </Typography>
        <Typography textStyle='descriptionLarge'>
          거리, 시간대, 지역, 배달방식, 할인, 샘플앱클럽 혜택, 사장님이 사용하는 요금제 등에 따라 배달팁이 달라져요.
        </Typography>
      </Dialog.Top>
      <Dialog.Bottom>
        <Dialog.Close>
          <Button color='black' size='medium' width='100%'>
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
        <Dialog.Trigger>
          <Button color='mint' size='medium'>
            <Button.Center>열기</Button.Center>
          </Button>
        </Dialog.Trigger>
        <Dialog.Top>
          <div>
            <Typography textStyle='subheadingSmall' maxLines={2}>
              배달팁은 어떻게 결정되나요?
            </Typography>
          </div>
          <Flex flexDirection='column'>
            <Typography textStyle='descriptionLarge'>
              거리, 시간대, 지역, 배달방식, 할인, 샘플앱클럽 혜택, 사장님이 사용하는 요금제 등에 따라 배달팁이 달라져요.
            </Typography>
            <div
              style={{
                height: '1px',
                backgroundColor: vars.sem.color.foregroundSecondary,
                paddingTop: vars.ref.spacing[50],
                paddingBottom: vars.ref.spacing[50],
              }}
            />
            <Flex justifyContent='space-between' style={{ width: '100%' }}>
              <Typography textStyle='descriptionLarge'> 주문금액(17,500원)</Typography>
              <Typography textStyle='descriptionLarge'> 1,000원</Typography>
            </Flex>
            <Flex justifyContent='space-between' style={{ width: '100%' }}>
              <Typography textStyle='descriptionLarge'> 추가거리(0.2km)</Typography>
              <Typography textStyle='descriptionLarge'>+500원</Typography>
            </Flex>
            <Flex justifyContent='space-between' style={{ width: '100%' }}>
              <Typography textStyle='descriptionLarge'>
                <b>총 배달팁</b>
              </Typography>
              <Typography textStyle='descriptionLarge'>
                <b>1,500원</b>
              </Typography>
            </Flex>
            <Typography textStyle='descriptionLarge'>
              진짜 긴 텍스트가 필요해서 복붙하겠습니다. 현재 표시된 혜택가는 할인 행사 정책에 따라 일부 회원에게만
              적용될 수 있습니다. 현재 표시된 혜택가는 할인 행사 정책에 따라 일부 회원에게만 적용될 수 있습니다. 현재
              표시된 혜택가는 할인 행사 정책에 따라 일부 회원에게만 적용될 수 있습니다. 현재 표시된 혜택가는 할인 행사
              정책에 따라 일부 회원에게만 적용될 수 있습니다. 현재 표시된 혜택가는 할인 행사 정책에 따라 일부 회원에게만
              적용될 수 있습니다. 현재 표시된 혜택가는 할인 행사 정책에 따라 일부 회원에게만 적용될 수 있습니다. 현재
              표시된 혜택가는 할인 행사 정책에 따라 일부 회원에게만 적용될 수 있습니다. 현재 표시된 혜택가는 할인 행사
              정책에 따라 일부 회원에게만 적용될 수 있습니다. 현재 표시된 혜택가는 할인 행사 정책에 따라 일부 회원에게만
              적용될 수 있습니다. 현재 표시된 혜택가는 할인 행사 정책에 따라 일부 회원에게만 적용될 수 있습니다.{' '}
            </Typography>
          </Flex>
        </Dialog.Top>
        <Dialog.Bottom>
          <Dialog.Close>
            <Button color='gray' size='medium' width='100%'>
              <Button.Center>작성 취소</Button.Center>
            </Button>
          </Dialog.Close>
          <Button type='submit' form='prism-form' color='black' size='medium' width='100%'>
            <Button.Center>버튼</Button.Center>
          </Button>
        </Dialog.Bottom>
      </Dialog>
    )
  },
}

export const 디자인QA = {
  args: {
    footerDirection: 'horizontal',
    headerText: '배달팁은 어떻게 결정되나요?',
    bodyText:
      '거리, 시간대, 지역, 배달방식, 할인, 샘플앱클럽 혜택, 사장님이 사용하는 요금제 등에 따라 배달팁이 달라져요.',
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
    <Dialog {...rest} theme={{ overlayBodyPaddingHorizontal: vars.ref.spacing[250], ...rest.theme }}>
      <Dialog.Trigger>
        <Button color='mint' size='medium'>
          <Button.Center>열기</Button.Center>
        </Button>
      </Dialog.Trigger>
      <Dialog.Top>
        <Typography textStyle='subheadingSmall' maxLines={2}>
          {headerText}
        </Typography>
        <Typography textStyle='descriptionLarge'>{bodyText}</Typography>
      </Dialog.Top>
      <Dialog.Bottom direction={footerDirection}>
        <Button color='black' size='medium' width='100%'>
          <Button.Center>{buttonText}</Button.Center>
        </Button>
        {buttonCount === 2 && (
          <Dialog.Close>
            <Button color='gray' size='medium' width='100%'>
              <Button.Center>취소</Button.Center>
            </Button>
          </Dialog.Close>
        )}
      </Dialog.Bottom>
    </Dialog>
  ),
}
