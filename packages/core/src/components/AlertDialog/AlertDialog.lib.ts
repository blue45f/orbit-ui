import { ControllableStateSetter } from '../../libs'
import { setupContext } from '../../libs/core/context'

export type AlertContextValue = {
  id: string
  isPresented: boolean
  changeIsPresented: ControllableStateSetter<boolean, [boolean]>
  titleId: string
  descriptionId: string
}

export const [AlertProvider, useAlertContext] = setupContext<AlertContextValue>('AlertDialog')
