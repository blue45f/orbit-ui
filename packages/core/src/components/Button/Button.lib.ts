import { setupContext } from '../../libs'

export type ButtonContextValue = {
  disabled: boolean
  loading: boolean
}

export const [ButtonContext, useButtonContext] = setupContext<ButtonContextValue>('ButtonRoot')
