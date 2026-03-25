import { Flex, TextStyleBaseSize } from '@orbit-ui/core'
import { Meta, StoryObj } from '@storybook/react'

import { vars } from '../../styles/theme.css'
import { EclipseProvider } from '../EclipseProvider'

import { ForcedTextStyle, Text } from './Text'

Text.displayName = 'Text'

const meta = {
  title: 'eclipse/Data Display/Text',
  component: Text,
  args: {
    textStyle: 'bodyLarge',
    children: 'Children에 값을 입력하여, Text 컴포넌트의 텍스트를 확인해보세요.',
  },
  argTypes: {
    color: {
      control: 'select',
      options: Object.keys(vars.sem.color).filter((key) => key.startsWith('foreground')),
    },
    textStyle: {
      control: 'select',
      options: [
        'bodyLarge',
        ...Object.keys(vars.sem.textStyle).map((key) =>
          key.replace(/LineHeight|Size|Weight|Tracking|Face/g, '')
        ),
      ],
    },
    as: {
      control: 'select',
      options: [
        'span',
        'p',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'strong',
        's',
        'i',
        'em',
        'div',
        'label',
        'a',
      ],
    },
    theme: {
      control: 'object',
    },
  },
} satisfies Meta<React.ComponentProps<typeof Text>>

type Story = StoryObj<typeof meta>

export default meta

export const 기본 = {
  render: (args: React.ComponentProps<typeof Text>) => {
    const { children, ...rest } = args
    return <Text {...rest}>{children}</Text>
  },
} satisfies Story

export const 모든_사이즈 = {
  render: (args: React.ComponentProps<typeof Text>) => {
    const { children: _children, textStyle: _textStyle, ...rest } = args
    const typographyStyles = Object.keys(vars.sem.textStyle)
      .map((key) => key.replace(/LineHeight|Size|Weight|Tracking|Face/g, ''))
      .filter((key, index, arr) => arr.indexOf(key) === index)

    return (
      <Flex flexDirection="column" rowGap={vars.ref.spacing[200]}>
        {typographyStyles.map((style) => (
          <Text key={style} {...rest} textStyle={style as string}>
            {style} 사이즈의 텍스트입니다.
          </Text>
        ))}
      </Flex>
    )
  },
} satisfies Story

export const 텍스트_스타일_강제 = {
  render: (args: React.ComponentProps<typeof Text>) => {
    const { children, textStyle, ...rest } = args
    return (
      <ForcedTextStyle color="primary5">
        <Text {...rest} textStyle={textStyle as string}>
          {children}
        </Text>
      </ForcedTextStyle>
    )
  },
} satisfies Story

export const 디자인_QA = {
  args: {
    baseSize: 'medium',
    textStyle: 'bodyLarge',
    children: '텍스트입니다',
  },
  argTypes: {
    baseSize: {
      control: 'select',
      options: ['xSmall', 'small', 'medium', 'large', 'xLarge', 'xxLarge', 'xxxLarge'],
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  render: ({ baseSize, children, textStyle, ...rest }: any) => {
    return (
      <EclipseProvider baseTextSize={baseSize as TextStyleBaseSize}>
        <Text {...rest} textStyle={textStyle as string}>
          {textStyle}사이즈: {children}
        </Text>
      </EclipseProvider>
    )
  },
}
