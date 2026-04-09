import {
  polymorphic,
  BaseTextProps,
  ForcedBaseTextStyle,
  BaseText,
  BaseTextContext,
} from '@heejun-com/core'
import React, { JSX, useContext } from 'react'

import { VAR_NAME as TEXT_STYLE_VAR_NAME } from '../../styles/text-style-token'

export type TextProps = BaseTextProps

export const ForcedTextStyle: React.FC<React.PropsWithChildren<TextProps>> = (props) => {
  const { children, ...rest } = props

  return <ForcedBaseTextStyle {...rest}>{children}</ForcedBaseTextStyle>
}

export const Text = polymorphic<'span', keyof JSX.IntrinsicElements, TextProps>((props) => {
  const externalContext = useContext(BaseTextContext)

  return (
    <ForcedBaseTextStyle
      {...externalContext}
      vars={{ ...TEXT_STYLE_VAR_NAME, ...externalContext.vars }}
    >
      <BaseText {...props} />
    </ForcedBaseTextStyle>
  )
})
