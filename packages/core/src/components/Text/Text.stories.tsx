import { Meta } from '@storybook/react'

import { TextStyleBaseSize, TextStyleTokenType } from '../../styles'
import { vars } from '../../styles/theme.css'
import { getColorTokenKeys, tokenKeysOf } from '../../styles/utils'
import { ClayRoot, useClayRootContext } from '../primitives/ClayRoot'
import { Flex } from '../primitives/Flex'

import { ForcedTextStyle, Text } from './Text'

Text.displayName = 'Text'

type ExtraProps = {
  baseSize: TextStyleBaseSize
}

const meta: Meta<React.ComponentProps<typeof Text> & ExtraProps> = {
  title: 'internal/Text',
  component: Text,
  args: {
    baseSize: 'medium',
    textStyle: 'bodyLarge',
    color: 'foregroundPrimary',
    theme: {
      textStyleLineHeight: undefined,
      textStyleSize: undefined,
      textStyleWeight: undefined,
      textStyleTracking: undefined,
      textStyleFace: undefined,
    },
    as: 'span',
    children: 'Children에 값을 입력하여, Text 컴포넌트의 텍스트를 확인해보세요.',
  },
  argTypes: {
    baseSize: {
      control: 'select',
      options: ['xSmall', 'small', 'medium', 'large', 'xLarge', 'xxLarge', 'xxxLarge'],
    },
    textStyle: {
      control: 'select',
      options: [
        'bodyLarge',
        ...Object.keys(vars.sem.textStyle).map((key) => key.replace(/LineHeight|Size|Weight|Tracking|Face/g, '')),
      ],
    },
    color: {
      control: 'select',
      options: [...tokenKeysOf('color', 'foreground'), ...getColorTokenKeys('palette'), ...getColorTokenKeys('state')],
    },
    maxLines: {
      control: 'number',
    },
    as: {
      control: 'select',
      options: ['span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 's', 'i', 'em', 'div', 'label', 'a'],
    },
    theme: {
      control: 'object',
    },
  },
}

export default meta

export const 기본 = {
  render: function DefaultStory(args: React.ComponentProps<typeof Text> & ExtraProps): React.ReactElement {
    const { baseSize, ...props } = args
    const { ...rest } = useClayRootContext('Text')

    return (
      <ClayRoot {...rest} themeClass='' baseTextSize={baseSize}>
        <div style={{ width: '300px' }}>
          <Text {...props}>{props.children}</Text>
        </div>
      </ClayRoot>
    )
  },
}

export const 최대_줄_수_제한 = {
  args: {
    maxLines: 1,
    children:
      '여러줄으로 넘어가야하지만 기본 값 기준 최대 1줄까지만 표기 되어야해요. 여러줄으로 넘어가야하지만 기본 값 기준 최대 1줄까지만 표기 되어야해요. 여러줄으로 넘어가야하지만 기본 값 기준 최대 1줄까지만 표기 되어야해요.',
  },
  render: function MaxLinesStory(args: React.ComponentProps<typeof Text> & ExtraProps): React.ReactElement {
    const { baseSize, ...props } = args
    const { ...rest } = useClayRootContext('Text')

    return (
      <ClayRoot {...rest} themeClass='' baseTextSize={baseSize}>
        <div style={{ width: '400px' }}>
          <Text {...props}>{props.children}</Text>
        </div>
      </ClayRoot>
    )
  },
}

export const 스타일_상위_제어 = {
  args: {
    maxLines: 2,
    children:
      '스타일이 고정되어 있어서 텍스트 스타일이 변경되지 않아요. 스타일이 고정되어 있어서 텍스트 스타일이 변경되지 않아요.',
  },
  render: function ForcedTypographyStyleStory(
    args: React.ComponentProps<typeof Text> & ExtraProps,
  ): React.ReactElement {
    const { baseSize, ...props } = args
    const { ...rest } = useClayRootContext('Text')

    return (
      <ClayRoot {...rest} themeClass='' baseTextSize={baseSize}>
        <p>Context Setting: textStyle=&apos;titleLarge&apos; color=&apos;mint5&apos; maxLines=&#123;1&#125;</p>
        <ForcedTextStyle textStyle='titleLarge' color='mint5' maxLines={1}>
          <div style={{ width: '600px' }}>
            <Text {...props}>{props.children}</Text>
          </div>
        </ForcedTextStyle>
      </ClayRoot>
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
  render: function DesignQA(args: React.ComponentProps<typeof Text> & ExtraProps): React.ReactElement {
    const { baseSize, ...props } = args

    const typographyStyles = Object.keys(vars.sem.textStyle)
      .map((key) => key.replace(/LineHeight|Size|Weight|Tracking|Face/g, ''))
      .filter((key, index, arr) => arr.indexOf(key) === index)

    const { ...rest } = useClayRootContext('Text')

    return (
      <ClayRoot {...rest} themeClass='' baseTextSize={baseSize}>
        <Flex flexDirection='column' rowGap='20px'>
          {typographyStyles.map((style) => (
            <Text key={style} {...props} as={props.as} textStyle={style as TextStyleTokenType}>
              {args.children ? (
                <>
                  {style}: {args.children}
                </>
              ) : (
                style
              )}
            </Text>
          ))}
        </Flex>
      </ClayRoot>
    )
  },
}
