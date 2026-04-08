import { Meta } from '@storybook/react'

import { Flex } from '../primitives/Flex'

import { ForcedBaseTextStyle, Text } from './Text'

Text.displayName = 'Text'

const meta: Meta<React.ComponentProps<typeof Text>> = {
  title: 'internal/Text',
  component: Text,
  args: {
    variant: 'body1',
    as: 'span',
    children: 'Children에 값을 입력하여, Text 컴포넌트의 텍스트를 확인해보세요.',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body1', 'body2', 'caption', 'overline'],
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
}

export default meta

export const 기본 = {
  render: function DefaultStory(args: React.ComponentProps<typeof Text>): React.ReactElement {
    return (
      <div style={{ width: '300px' }}>
        <Text {...args}>{args.children}</Text>
      </div>
    )
  },
}

export const 최대_줄_수_제한 = {
  args: {
    children:
      '여러줄으로 넘어가야하지만 기본 값 기준 최대 1줄까지만 표기 되어야해요. 여러줄으로 넘어가야하지만 기본 값 기준 최대 1줄까지만 표기 되어야해요. 여러줄으로 넘어가야하지만 기본 값 기준 최대 1줄까지만 표기 되어야해요.',
  },
  render: function MaxLinesStory(args: React.ComponentProps<typeof Text>): React.ReactElement {
    return (
      <div
        style={{
          width: '400px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        <Text {...args}>{args.children}</Text>
      </div>
    )
  },
}

export const 스타일_상위_제어 = {
  args: {
    children:
      '스타일이 고정되어 있어서 텍스트 스타일이 변경되지 않아요. 스타일이 고정되어 있어서 텍스트 스타일이 변경되지 않아요.',
  },
  render: function ForcedTypographyStyleStory(
    args: React.ComponentProps<typeof Text>
  ): React.ReactElement {
    return (
      <>
        <p>
          Context Setting: textStyle=&apos;titleLarge&apos; color=&apos;primary5&apos;
          maxLines=&#123;1&#125;
        </p>
        <ForcedBaseTextStyle textStyle="titleLarge" color="primary5" maxLines={1}>
          <div style={{ width: '600px' }}>
            <Text {...args}>{args.children}</Text>
          </div>
        </ForcedBaseTextStyle>
      </>
    )
  },
}

export const 디자인_QA = {
  args: {
    as: 'p',
    children: undefined,
  },

  argTypes: {
    children: {
      control: 'text',
    },
  },
  render: function DesignQA(args: React.ComponentProps<typeof Text>): React.ReactElement {
    const variants = [
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'body1',
      'body2',
      'caption',
      'overline',
    ] as const

    return (
      <Flex flexDirection="column" rowGap="20px">
        {variants.map((variant) => (
          <Text key={variant} {...args} as={args.as} variant={variant}>
            {args.children ? (
              <>
                {variant}: {args.children}
              </>
            ) : (
              variant
            )}
          </Text>
        ))}
      </Flex>
    )
  },
}
