import { Flex } from '@prism-ui/core'
import { AlertLineIcon, CancelIcon } from '@prism-ui/icons'
import type { Meta, StoryObj } from '@storybook/react'

import { vars } from '../../styles'
import { FilledButton } from '../SolidButton'
import { OutlinedIconButton } from '../OutlineIconButton'

import { Toast } from './Toast'

const meta = {
  title: 'ocean/Toast',
  component: Toast,
  tags: ['autodocs'],
  args: {
    defaultIsPresented: false,
  },
  argTypes: {},
} satisfies Meta<typeof Toast>

export default meta
type Story = StoryObj<typeof meta>

export const 기본: Story = {
  render: (args) => (
    <Toast {...args}>
      <Toast.Trigger>
        <FilledButton color='black' size='medium'>
          <FilledButton.Center>열기</FilledButton.Center>
        </FilledButton>
      </Toast.Trigger>
      <Toast.Center>
        <div>Description Text</div>
      </Toast.Center>
    </Toast>
  ),
}

export const 모든_슬롯: Story = {
  render: (args) => (
    <Toast {...args}>
      <Toast.Trigger>
        <FilledButton color='black' size='medium'>
          <FilledButton.Center>열기</FilledButton.Center>
        </FilledButton>
      </Toast.Trigger>
      <Toast.Leading>
        <AlertLineIcon size={18} />
      </Toast.Leading>
      <Toast.Center>
        <div>타이틀입니다</div>
        <div>설명입니다</div>
      </Toast.Center>
      <Toast.Trailing>
        <Toast.Close>
          <OutlinedIconButton
            color='black'
            size='small'
            theme={{
              enabledFillColor: 'transparent',
              disabledFillColor: 'transparent',
            }}
          >
            <CancelIcon size={18} color={vars.ref.color.white} />
          </OutlinedIconButton>
        </Toast.Close>
      </Toast.Trailing>
    </Toast>
  ),
}

export const 디자인QA = {
  args: {
    headerText: '타이틀입니다',
    bodyText: '설명입니다',
    leading: true,
    trailing: true,
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  render: ({ headerText, bodyText, leading, trailing, ...args }: any) => (
    <Toast {...args}>
      <Toast.Trigger>
        <FilledButton color='black' size='medium'>
          <FilledButton.Center>열기</FilledButton.Center>
        </FilledButton>
      </Toast.Trigger>
      {leading && (
        <Toast.Leading>
          <AlertLineIcon size={18} />
        </Toast.Leading>
      )}
      <Toast.Center>
        <Flex flexDirection='column' rowGap={vars.ref.spacing[75]}>
          <div
            style={{
              fontSize: vars.sem.textStyle.labelMediumEmphasizedSize,
              fontWeight: vars.sem.textStyle.labelMediumEmphasizedWeight,
              lineHeight: vars.sem.textStyle.labelMediumEmphasizedLineHeight,
              letterSpacing: vars.sem.textStyle.labelMediumEmphasizedTracking,
              fontFamily: vars.sem.textStyle.labelMediumEmphasizedFace,
            }}
          >
            {headerText}
          </div>
          <div
            style={{
              fontSize: vars.sem.textStyle.captionLargeSize,
              fontWeight: vars.sem.textStyle.captionLargeWeight,
              lineHeight: vars.sem.textStyle.captionLargeLineHeight,
              letterSpacing: vars.sem.textStyle.captionLargeTracking,
              fontFamily: vars.sem.textStyle.captionLargeFace,
            }}
          >
            {bodyText}
          </div>
        </Flex>
      </Toast.Center>
      {trailing && (
        <Toast.Trailing>
          <Toast.Close>
            <OutlinedIconButton
              color='black'
              size='small'
              theme={{
                enabledFillColor: 'transparent',
                disabledFillColor: 'transparent',
              }}
            >
              <CancelIcon size={18} color={vars.ref.color.white} />
            </OutlinedIconButton>
          </Toast.Close>
        </Toast.Trailing>
      )}
    </Toast>
  ),
}
