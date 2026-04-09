import { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { Text } from '../../Text/Text'
import { ContentLayer } from '../Layer'

import { OverlayContainerLayer, OverlayContainerLayerProps } from './OverlayContainerLayer'

OverlayContainerLayer.displayName = 'OverlayContainerLayer'

const meta = {
  title: 'Utils/OverlayContainerLayer',
  component: OverlayContainerLayer,
  parameters: {
    docs: {
      description: {
        component: `**OverlayContainerLayer**는 모달, 드롭다운, 팝오버 등 오버레이 UI를 구현하기 위한 Primitive입니다.

- **Escape 키** 닫기, **외부 클릭** 닫기, **포커스 이탈** 닫기를 옵션으로 제어
- **중첩(Nested)** 오버레이를 지원하여 오버레이 안에서 또 다른 오버레이를 열 수 있음
- **Protected** 영역을 설정하면 해당 영역 클릭 시 오버레이가 닫히지 않음
- Theme Layer의 Modal, Drawer, Popover 등이 내부적으로 이 Primitive를 사용합니다.`,
      },
    },
  },
} satisfies Meta<typeof OverlayContainerLayer>

type Story = StoryObj<typeof meta>

export default meta

const labelStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: '8px',
  fontSize: '14px', cursor: 'pointer', padding: '4px 0',
}

const btnStyle: React.CSSProperties = {
  padding: '8px 16px', borderRadius: '8px', border: '1px solid #d1d5db',
  background: '#ffffff', fontSize: '14px', fontWeight: '500', cursor: 'pointer',
}

const btnPrimaryStyle: React.CSSProperties = {
  ...btnStyle, background: '#6366f1', color: '#ffffff', border: '1px solid #6366f1',
}

const inputStyle: React.CSSProperties = {
  padding: '8px 12px', borderRadius: '6px', border: '1px solid #d1d5db',
  fontSize: '14px', outline: 'none', width: '200px',
}

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
    <div style={{ fontFamily: 'sans-serif', maxWidth: '600px' }}>
      <Text as="h2" style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>
        OverlayContainerLayer
      </Text>
      <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, margin: '0 0 20px' }}>
        오버레이 닫기 동작을 제어합니다. 아래 옵션을 켜고 오버레이를 열어 테스트해보세요.
      </p>

      <div style={{
        padding: '16px 20px', borderRadius: '12px', border: '1px solid #e5e7eb',
        marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '8px',
      }}>
        <label style={labelStyle}>
          <input
            type="checkbox"
            checked={dismissOnEscape}
            onChange={(event) => setDismissOnEscape(event.target.checked)}
          />
          <code style={{ fontSize: '13px', background: '#f3f4f6', padding: '2px 6px', borderRadius: '4px' }}>escape</code> 키로 닫기
        </label>
        <label style={labelStyle}>
          <input
            type="checkbox"
            checked={dismissOnPointerDownOutside}
            onChange={(event) => setDismissOnPointerDownOutside(event.target.checked)}
          />
          포인터가 바깥에서 눌렸을 때 닫기
        </label>
        <label style={labelStyle}>
          <input
            type="checkbox"
            checked={dismissOnFocusOutside}
            onChange={(event) => setDismissOnFocusOutside(event.target.checked)}
          />
          포커스가 바깥으로 이동했을 때 닫기
        </label>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button ref={openButtonRef} type="button" onClick={() => setOpen((v) => !v)} style={open ? btnPrimaryStyle : btnStyle}>
          {open ? 'Close' : 'Open'} Layer
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
            height: 280,
            backgroundColor: '#1e293b',
            borderRadius: '16px',
            marginBottom: 20,
            color: 'white',
            boxShadow: '0 20px 60px -12px rgba(0, 0, 0, 0.25)',
          }}
        >
          <ContentLayer direction="vertical" style={{ gap: '16px', alignItems: 'center', padding: '24px' }}>
            <Text as="h2" style={{ color: 'white', fontSize: '18px', fontWeight: '700', margin: 0 }}>
              Overlay Header
            </Text>
            <input type="text" placeholder="Type something..." style={{ ...inputStyle, border: '1px solid #475569', background: '#0f172a', color: '#e2e8f0' }} />
            <Text as="span" style={{ color: '#94a3b8', fontSize: '13px' }}>
              Overlay Footer
            </Text>
          </ContentLayer>
        </OverlayContainerLayer>
      ) : null}

      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <input type="text" defaultValue="hello" style={inputStyle} />
        <button type="button" onMouseDown={() => alert('hey!')} style={btnStyle}>
          hey!
        </button>
      </div>
    </div>
  )
}

export const 중첩: React.FC = () => {
  return (
    <div>
      <Text as="h2" style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px' }}>
        OverlayContainer (Nested)
      </Text>
      <OverlayBox />
    </div>
  )
}

export const OverlayProtected_예제: React.FC = () => {
  const [open, setOpen] = React.useState(false)

  return (
    <div>
      <Text as="h2" style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>
        OverlayProtected
      </Text>
      <div style={{ marginBottom: '16px' }}>
        <button type="button" onClick={() => setOpen((v) => !v)} style={btnStyle}>
          {open ? 'Close' : 'Open'} Layer
        </button>
      </div>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <OverlayContainerLayer.Protected
          style={{
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 360,
            height: 240,
            backgroundColor: '#dc2626',
            borderRadius: '16px',
            color: '#ffffff',
            fontSize: '14px',
            fontWeight: '500',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          Protected 영역 (클릭해도 닫히지 않음)
          <input type="text" style={{ ...inputStyle, border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(0,0,0,0.2)', color: '#ffffff' }} />
        </OverlayContainerLayer.Protected>
        {open && (
          <OverlayContainerLayer
            style={{
              display: 'inline-flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: 360,
              height: 240,
              backgroundColor: '#16a34a',
              borderRadius: '16px',
              color: '#ffffff',
              boxShadow: '0 20px 60px -12px rgba(0, 0, 0, 0.25)',
            }}
            onDismiss={() => setOpen(false)}
          >
            <ContentLayer direction="vertical" style={{ gap: '12px', alignItems: 'center' }}>
              <span style={{ fontSize: '16px', fontWeight: '600' }}>Header</span>
              <span style={{ fontSize: '14px' }}>Dismissible Overlay</span>
              <span style={{ fontSize: '13px', opacity: 0.8 }}>Footer</span>
            </ContentLayer>
          </OverlayContainerLayer>
        )}
      </div>
    </div>
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
        padding: 24,
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        borderRadius: '16px',
        marginTop: 16,
        border: '1px solid rgba(99, 102, 241, 0.2)',
        ...props.style,
      }}
    >
      <ContentLayer direction="vertical" style={{ gap: '12px' }}>
        <div>
          <button ref={openButtonRef} type="button" onClick={() => setOpen((v) => !v)} style={btnStyle}>
            {open ? 'Close' : 'Open'} Nested Layer
          </button>
        </div>

        {open ? (
          <OverlayBox dismissOnFocusOutside={false} onDismiss={() => setOpen(false)} />
        ) : null}
      </ContentLayer>
    </OverlayContainerLayer>
  )
}
