import { Meta } from '@storybook/react'

import * as coreStyle from '../../../styles'

import { ContainerLayer, StateLayer, ContentLayer } from './Layer'
import * as styles from './Layer.stories.css'

ContainerLayer.displayName = 'ContainerLayer'
StateLayer.displayName = 'StateLayer'
ContentLayer.displayName = 'ContentLayer'

const meta = {
  title: '8. Internal/Layer',
  component: ContainerLayer,
  args: {
    children: '시작하기',
  },
} satisfies Meta<typeof ContainerLayer>

export default meta

export const 기본 = {
  args: {
    children: '커스텀',
  },
  // eslint-disable-next-line
  render: ({ children }: any) => {
    return (
      <ContainerLayer
        as="button"
        style={{
          ...coreStyle.reset.button,
          color: 'gray',
        }}
      >
        container영역은 hover되거나 active되면 가려짐
        <StateLayer className={styles.state} />
        <ContentLayer>콘텐츠영역은 hover되거나 active되어도 안가려짐</ContentLayer>
      </ContainerLayer>
    )
  },
}
