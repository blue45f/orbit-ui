import { Meta, StoryObj } from '@storybook/react'
import { useEffect, useRef, useState } from 'react'

import { composeRefs } from '../../libs'
import { Button } from '../Button'

import { Sheet, SheetProps } from './Sheet'
import { useResizable } from './Sheet.lib'

Sheet.displayName = 'Sheet'
Sheet.Header.displayName = 'SheetHeader'
Sheet.Content.displayName = 'SheetContent'
Sheet.Footer.displayName = 'SheetFooter'

const meta = {
  title: 'foundation/Sheet',
  component: Sheet,
  args: {
    isPresented: false,
  },
} satisfies Meta<typeof Sheet>

type Story = StoryObj<typeof meta>

export default meta

export const 제어 = {
  render: function Story(args: SheetProps) {
    const [isPresented, setIsPresented] = useState(args.isPresented ?? false)

    return (
      <>
        <button type="button" onClick={() => setIsPresented(true)} style={{
          padding: '8px 16px', borderRadius: '8px', border: '1px solid #d1d5db',
          background: '#ffffff', fontSize: '14px', fontWeight: '500', cursor: 'pointer',
        }}>
          열기
        </button>
        <Sheet
          {...args}
          isPresented={isPresented}
          onIsPresentedChange={() => {
            setIsPresented(false)
          }}
        >
          <Sheet.Header>
            <div style={{ padding: '20px' }}>Sheet Title</div>
          </Sheet.Header>
          <Sheet.Content>
            <div style={{ padding: '20px' }}>
              <p>Body Content</p>
              <button type="button" onClick={() => setIsPresented(false)} style={{
                padding: '8px 16px', borderRadius: '8px', border: '1px solid #d1d5db',
                background: '#ffffff', fontSize: '14px', fontWeight: '500', cursor: 'pointer',
              }}>
                닫기
              </button>
            </div>
          </Sheet.Content>
          <Sheet.Footer>
            <div style={{ padding: '20px' }}>Footer Content</div>
          </Sheet.Footer>
        </Sheet>
      </>
    )
  },
} satisfies Story

export const 비제어 = {
  render: function Story(args: SheetProps) {
    return (
      <>
        <Sheet {...args} isPresented={undefined} defaultIsPresented={false}>
          <Sheet.Trigger>
            <Button>열기</Button>
          </Sheet.Trigger>
          <Sheet.Header>
            <div style={{ padding: '20px' }}>Sheet Title</div>
          </Sheet.Header>
          <Sheet.Content>
            <div style={{ padding: '20px' }}>
              <p>Body Content</p>
              <Sheet.Close>
                <Button>닫기</Button>
              </Sheet.Close>
            </div>
          </Sheet.Content>
          <Sheet.Footer>
            <div style={{ padding: '20px' }}>Footer Content</div>
          </Sheet.Footer>
        </Sheet>
      </>
    )
  },
} satisfies Story

export const 풀시트 = {
  render: function Story(args: SheetProps) {
    return (
      <>
        <Sheet
          {...args}
          isPresented={undefined}
          defaultIsPresented={false}
          width="100%"
          height="100%"
          theme={{ radius: '0' }}
        >
          <Sheet.Trigger>
            <Button>열기</Button>
          </Sheet.Trigger>
          <Sheet.Header>
            <div style={{ padding: '20px' }}>Sheet Title</div>
          </Sheet.Header>
          <Sheet.Content>
            <div style={{ padding: '20px' }}>
              <p>Body Content</p>
              <Sheet.Close>
                <Button>닫기</Button>
              </Sheet.Close>
            </div>
          </Sheet.Content>
          <Sheet.Footer>
            <div style={{ padding: '20px' }}>Footer Content</div>
          </Sheet.Footer>
        </Sheet>
      </>
    )
  },
} satisfies Story

export const 테마_변경 = {
  render: function Story(args: SheetProps) {
    return (
      <>
        <Sheet
          {...args}
          isPresented={undefined}
          defaultIsPresented={false}
          width="50%"
          height="60%"
          theme={{ fillColor: 'blue', foregroundColor: 'yellow', radius: '50px' }}
        >
          <Sheet.Trigger>
            <Button>열기</Button>
          </Sheet.Trigger>
          <Sheet.Header>
            <div style={{ padding: '20px' }}>Sheet Title</div>
          </Sheet.Header>
          <Sheet.Content>
            <div style={{ padding: '20px' }}>
              <p>Body Content</p>
              <Sheet.Close>
                <Button>닫기</Button>
              </Sheet.Close>
            </div>
          </Sheet.Content>
          <Sheet.Footer>
            <div style={{ padding: '20px' }}>Footer Content</div>
          </Sheet.Footer>
        </Sheet>
      </>
    )
  },
} satisfies Story

export const 크기조절 = {
  render: function Story(args: SheetProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [isPresented, setIsPresented] = useState(false)

    const { grabberElementRef: handleElementRef, containerElementRef } = useResizable<
      HTMLButtonElement,
      HTMLDivElement
    >({
      enabled: true,
      breakpoints: [100, 50, 25, 'HIDDEN'],
      onChangeHeight: (height: number) => {
        if (height === 0) {
          setIsPresented(false)
          return
        }
        containerRef.current!.style.height = `${height}%`
      },
    })

    return (
      <>
        <Button onClick={() => setIsPresented(true)}>열기</Button>
        <Sheet
          {...args}
          isPresented={isPresented}
          ref={composeRefs(containerElementRef, containerRef)}
          onIsPresentedChange={(params) => {
            setIsPresented(params.newValue)
          }}
        >
          <Sheet.Header>
            <button
              type="button"
              ref={handleElementRef}
              style={{ width: '100%', cursor: 'grab', padding: '12px', border: 'none', background: 'transparent', color: '#94a3b8', fontSize: '16px', letterSpacing: '4px' }}
            >
              ━━━
            </button>
          </Sheet.Header>

          <Sheet.Content>
            <div style={{ padding: '20px' }}>
              <p>Body Content</p>
              <Button onClick={() => setIsPresented(false)}>닫기</Button>
            </div>
          </Sheet.Content>
          <Sheet.Footer>
            <div style={{ padding: '20px' }}>Footer Content</div>
          </Sheet.Footer>
        </Sheet>
      </>
    )
  },
} satisfies Story

export const 디자인_QA = {
  // eslint-disable-next-line
  args: {
    isPresented: true,
    width: '100%',
    height: 'fit-content',
    fillColor: undefined,
    foregroundColor: undefined,
    radius: undefined,
    showHeader: true,
    showContent: true,
    showFooter: true,
  } as SheetProps & {
    fillColor?: string
    foregroundColor?: string
    radius?: string
    showHeader?: boolean
    showContent?: boolean
    showFooter?: boolean
  },
  // eslint-disable-next-line
  argTypes: {
    isPresented: {
      control: 'boolean',
      description: 'Sheet 표시 여부',
    },
    width: {
      control: 'text',
      description: 'Sheet 너비',
    },
    height: {
      control: 'text',
      description: 'Sheet 높이',
    },
    fillColor: {
      control: 'color',
      description: '배경색',
    },
    foregroundColor: {
      control: 'color',
      description: '전경색',
    },
    radius: {
      control: 'text',
      description: '반지름',
    },
    showHeader: {
      control: 'boolean',
      description: 'Header 표시 여부',
    },
    showContent: {
      control: 'boolean',
      description: 'Content 표시 여부',
    },
    showFooter: {
      control: 'boolean',
      description: 'Footer 표시 여부',
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any,
  // eslint-disable-next-line
  render: function Story(args: any) {
    const {
      isPresented,
      width,
      height,
      fillColor,
      foregroundColor,
      radius,
      showHeader,
      showContent,
      showFooter,
    } = args

    const [isPresentedState, setIsPresentedState] = useState(isPresented)

    useEffect(() => {
      setIsPresentedState(isPresented)
    }, [isPresented])

    const theme =
      fillColor || foregroundColor || radius
        ? {
            ...(fillColor && { fillColor }),
            ...(foregroundColor && { foregroundColor }),
            ...(radius && { radius }),
          }
        : undefined

    return (
      <>
        <p>컨트롤 패널을 통해 Sheet의 속성을 조절할 수 있어요.</p>
        <button type="button" onClick={() => setIsPresentedState(true)} style={{
          padding: '8px 16px', borderRadius: '8px', border: '1px solid #d1d5db',
          background: '#ffffff', fontSize: '14px', fontWeight: '500', cursor: 'pointer',
        }}>
          Sheet 열기
        </button>
        <Sheet
          isPresented={isPresentedState}
          onIsPresentedChange={(params) => setIsPresentedState(params.newValue)}
          width={width}
          height={height}
          theme={theme}
        >
          {showHeader && (
            <Sheet.Header>
              <div
                style={{
                  padding: '20px',
                  borderBottom: '1px solid #e0e0e0',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              >
                <h3 style={{ fontSize: '20px', fontWeight: 700, margin: 0 }}>Sheet Header</h3>
              </div>
            </Sheet.Header>
          )}
          {showContent && (
            <Sheet.Content>
              <div style={{ padding: '20px', width: '100%', boxSizing: 'border-box' }}>
                <p style={{ margin: '0 0 16px 0' }}>Sheet Content</p>
                <p style={{ margin: '0 0 16px 0', fontSize: '14px', color: '#666' }}>
                  컨트롤을 통해 다양한 속성을 조절해보세요.
                </p>
              </div>
            </Sheet.Content>
          )}
          {showFooter && (
            <Sheet.Footer>
              <div
                style={{
                  padding: '20px',
                  borderTop: '1px solid #e0e0e0',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              >
                <Button
                  onClick={() => {
                    alert('Footer Action')
                  }}
                >
                  Footer Action
                </Button>
              </div>
            </Sheet.Footer>
          )}
        </Sheet>
      </>
    )
  },
} satisfies Story
