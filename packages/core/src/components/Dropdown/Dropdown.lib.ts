import { setupContext } from '../../libs/core/context'

export type SelectContextValue = {
  disabled?: boolean
  focused?: boolean
  activated?: boolean
  selected?: boolean
}

export const [SelectProvider, useSelectContext] = setupContext<SelectContextValue>('Dropdown')
