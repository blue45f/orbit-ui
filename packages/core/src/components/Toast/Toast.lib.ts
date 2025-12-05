import { ControllableStateSetter } from '../../libs'
import { setupContext } from '../../libs/core/context'

export type SnackbarContextValue = {
  id: string
  isPresented: boolean
  changeIsPresented: ControllableStateSetter<boolean, [boolean]>
}

export const [SnackbarProvider, useSnackbarContext] = setupContext<SnackbarContextValue>('Toast')
