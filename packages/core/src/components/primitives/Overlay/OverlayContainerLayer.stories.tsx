import { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { Text } from '../../Text/Text'
import { ContentLayer } from '../Layer'

import { OverlayContainerLayer, OverlayContainerLayerProps } from './OverlayContainerLayer'

OverlayContainerLayer.displayName = 'OverlayContainerLayer'

const meta = {
  title: 'utils/OverlayContainerLayer',
  component: OverlayContainerLayer,
} satisfies Meta<typeof OverlayContainerLayer>

type Story = StoryObj<typeof meta>

export default meta

export const 기본 = {
  render: () => <Basic />,
} satisfies Story

const Basic = () => {
  const [open, setOpen] = React.useState(false)
  const openButtonRef = React.useRef(null)

  const [dismissOnEscape, setDismissOnEscape] = React.useState(false)
  const [dismissOnPointerDownOutside, setDismissOnPointerDownOutside] = React.useState(false)
  const [dismissOnFocusOutside, setDismissOnFocusOutside] = React.useState(false)

  return (
    <div style={{ fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>OverlayContainer</h1>

      <div style={{ display: 'inline-block', textAlign: 'left', marginBottom: 20 }}>
        <label style={{ display: 'block' }}>
          <input
            type='checkbox'
            checked={dismissOnEscape}
            onChange={(event) => setDismissOnEscape(event.target.checked)}
          />{' '}
          <code>escape</code> 키로 닫기
        </label>

        <label style={{ display: 'block' }}>
          <input
            type='checkbox'
            checked={dismissOnPointerDownOutside}
            onChange={(event) => setDismissOnPointerDownOutside(event.target.checked)}
          />{' '}
          포인터가 바깥쪽에서 눌렸을 때 닫기
        </label>

        <label style={{ display: 'block' }}>
          <input
            type='checkbox'
            checked={dismissOnFocusOutside}
            onChange={(event) => setDismissOnFocusOutside(event.target.checked)}
          />{' '}
          포커스가 바깥쪽으로 이동했을 때 닫기
        </label>

        <hr />
      </div>

      <div style={{ marginBottom: 20 }}>
        <button ref={openButtonRef} type='button' onClick={() => setOpen((v) => !v)}>
          {open ? 'Close' : 'Open'} layer
        </button>
      </div>

      {open ? (
        <OverlayContainerLayer
          dismissOnEscape={dismissOnEscape}
          dismissOnClickOutside={dismissOnPointerDownOutside}
          dismissOnFocusOutside={dismissOnFocusOutside}
          onDismiss={() => setOpen(false)}
          style={{
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',
            verticalAlign: 'middle',
            width: 400,
            height: 300,
            backgroundColor: 'black',
            borderRadius: 10,
            marginBottom: 20,
            color: 'white',
          }}
        >
          <ContentLayer direction='vertical'>
            <Text textStyle='titleLarge' color='white'>
              Header
            </Text>
            <input type='text' />
            <Text textStyle='titleSmall' color='white'>
              Footer
            </Text>
          </ContentLayer>
        </OverlayContainerLayer>
      ) : null}

      <div style={{ marginBottom: 20 }}>
        <input type='text' defaultValue='hello' style={{ marginRight: 20 }} />
        <button type='button' onMouseDown={() => alert('hey!')}>
          hey!
        </button>
      </div>
    </div>
  )
}

export const 중첩: React.FC = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>OverlayContainer (nested)</h1>
      <OverlayBox />
    </div>
  )
}

export const OverlayProtected_예제: React.FC = () => {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <h2>OverlayProtected</h2>
      <button type='button' onClick={() => setOpen((v) => !v)}>
        {open ? 'Close' : 'Open'} layer
      </button>
      <div>
        <OverlayContainerLayer.Protected
          style={{
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',
            verticalAlign: 'middle',
            width: 400,
            height: 300,
            backgroundColor: '#915454',
            borderRadius: 10,
            marginBottom: 20,
          }}
        >
          빨간 부분을 클릭해도 안닫혀요
          <input type='text' />
        </OverlayContainerLayer.Protected>
      </div>
      {open && (
        <OverlayContainerLayer
          style={{
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',
            verticalAlign: 'middle',
            width: 400,
            height: 300,
            backgroundColor: '#549159',
            borderRadius: 10,
            marginBottom: 20,
            color: 'white',
          }}
          onDismiss={() => setOpen(false)}
        >
          <ContentLayer direction='vertical'>
            <span>Header</span>
            <span>열린 OverlayContainer</span>
            <span>Footer</span>
          </ContentLayer>
        </OverlayContainerLayer>
      )}
    </>
  )
}

function OverlayBox(props: OverlayContainerLayerProps) {
  const [open, setOpen] = React.useState(false)
  const openButtonRef = React.useRef(null)

  return (
    <OverlayContainerLayer
      {...props}
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: 10,
        marginTop: 20,
        ...props.style,
      }}
    >
      <ContentLayer direction='vertical'>
        <div>
          <button ref={openButtonRef} type='button' onClick={() => setOpen((v) => !v)}>
            {open ? 'Close' : 'Open'} new layer
          </button>
        </div>

        {open ? <OverlayBox dismissOnFocusOutside={false} onDismiss={() => setOpen(false)} /> : null}
      </ContentLayer>
    </OverlayContainerLayer>
  )
}
