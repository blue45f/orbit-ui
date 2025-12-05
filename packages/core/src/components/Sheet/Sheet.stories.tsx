import { Meta, StoryObj } from '@storybook/react'
import { useEffect, useRef, useState } from 'react'

import { composeRefs } from '../../libs'
import { Button } from '../Button'

import { Sheet, SheetProps } from './Sheet'
import { useResizable } from './Sheet.lib'

Sheet.displayName = 'Sheet'
Sheet.Header.displayName = 'SheetHeader'
Sheet.Body.displayName = 'SheetBody'
Sheet.Footer.displayName = 'SheetFooter'

const meta = {
  title: 'foundation/Sheet',
  component: Sheet,
  args: {
    isPresented: false,
    as: 'div',
  },
  argTypes: {
    as: {
      control: 'select',
      options: ['div', 'dialog', 'section'],
    },
  },
} satisfies Meta<typeof Sheet>

type Story = StoryObj<typeof meta>

export default meta

export const 제어 = {
  render: function Story(args: SheetProps) {
    const [isPresented, setIsPresented] = useState(args.isPresented ?? false)

    return (
      <>
        <button type='button' onClick={() => setIsPresented(true)}>
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
          <Sheet.Body>
            <div style={{ padding: '20px' }}>
              <p>Body Content</p>
              <button type='button' onClick={() => setIsPresented(false)}>
                닫기
              </button>
            </div>
          </Sheet.Body>
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
          <Sheet.Body>
            <div style={{ padding: '20px' }}>
              <p>Body Content</p>
              <Sheet.Close>
                <Button>닫기</Button>
              </Sheet.Close>
            </div>
          </Sheet.Body>
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
          width='100%'
          height='100%'
          radiusCorners='all'
          theme={{ radius: 'none' }}
        >
          <Sheet.Trigger>
            <Button>열기</Button>
          </Sheet.Trigger>
          <Sheet.Header>
            <div style={{ padding: '20px' }}>Sheet Title</div>
          </Sheet.Header>
          <Sheet.Body>
            <div style={{ padding: '20px' }}>
              <p>Body Content</p>
              <Sheet.Close>
                <Button>닫기</Button>
              </Sheet.Close>
            </div>
          </Sheet.Body>
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
          width='50%'
          height='60%'
          maxWidth='360px'
          alignment='center'
          radiusCorners='all'
          theme={{ fillColor: 'blue', foregroundColor: 'yellow', gap: '30px', radius: '50px' }}
        >
          <Sheet.Trigger>
            <Button>열기</Button>
          </Sheet.Trigger>
          <Sheet.Header>
            <div style={{ padding: '20px' }}>Sheet Title</div>
          </Sheet.Header>
          <Sheet.Body>
            <div style={{ padding: '20px' }}>
              <p>Body Content</p>
              <Sheet.Close>
                <Button>닫기</Button>
              </Sheet.Close>
            </div>
          </Sheet.Body>
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
          <Sheet.Grabber ref={handleElementRef} />

          <Sheet.Body>
            <div style={{ padding: '20px' }}>
              <p>Body Content</p>
              <Button onClick={() => setIsPresented(false)}>닫기</Button>
            </div>
          </Sheet.Body>
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
    alignment: 'end',
    width: '100%',
    height: 'fit-content',
    maxWidth: '360px',
    radiusCorners: 'top',
    fillColor: undefined,
    foregroundColor: undefined,
    gap: undefined,
    radius: undefined,
    showGrabber: true,
    showHeader: true,
    showBody: true,
    showFooter: true,
    dismissOnEscape: false,
    dismissOnClickOutside: false,
    dismissOnFocusOutside: false,
  } as SheetProps & {
    fillColor?: string
    foregroundColor?: string
    gap?: string
    radius?: string
    showGrabber?: boolean
    showHeader?: boolean
    showBody?: boolean
    showFooter?: boolean
  },
  // eslint-disable-next-line
  argTypes: {
    isPresented: {
      control: 'boolean',
      description: 'Sheet 표시 여부',
    },
    alignment: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'Sheet가 화면에서 노출될 위치',
    },
    width: {
      control: 'text',
      description: 'Sheet 너비',
    },
    height: {
      control: 'text',
      description: 'Sheet 높이',
    },
    maxWidth: {
      control: 'text',
      description: '최대 너비 제한',
    },
    radiusCorners: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right', 'all', 'top-left', 'top-right', 'bottom-right', 'bottom-left'],
      description: '모서리 곡선 적용 위치',
    },
    fillColor: {
      control: 'color',
      description: '배경색',
    },
    foregroundColor: {
      control: 'color',
      description: '전경색',
    },
    gap: {
      control: 'text',
      description: '간격',
    },
    radius: {
      control: 'text',
      description: '반지름',
    },
    showGrabber: {
      control: 'boolean',
      description: 'Grabber 표시 여부 (리사이즈 기능 포함)',
    },
    showHeader: {
      control: 'boolean',
      description: 'Header 표시 여부',
    },
    showBody: {
      control: 'boolean',
      description: 'Body 표시 여부',
    },
    showFooter: {
      control: 'boolean',
      description: 'Footer 표시 여부',
    },
    dismissOnEscape: {
      control: 'boolean',
      description: 'ESC 키로 닫힐지 여부',
    },
    dismissOnClickOutside: {
      control: 'boolean',
      description: '외부 영역 클릭 시 닫힐지 여부',
    },
    dismissOnFocusOutside: {
      control: 'boolean',
      description: '외부로 포커스 이동 시 닫힐지 여부',
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any,
  // eslint-disable-next-line
  render: function Story(args: any) {
    const {
      isPresented,
      alignment,
      width,
      height,
      maxWidth,
      radiusCorners,
      fillColor,
      foregroundColor,
      gap,
      radius,
      showGrabber,
      showHeader,
      showBody,
      showFooter,
      dismissOnEscape,
      dismissOnClickOutside,
      dismissOnFocusOutside,
    } = args

    const containerRef = useRef<HTMLDivElement>(null)
    const [sheetHeight, setSheetHeight] = useState<string | number | undefined>(height)
    const [isPresentedState, setIsPresentedState] = useState(isPresented)

    useEffect(() => {
      setIsPresentedState(isPresented)
    }, [isPresented])

    useEffect(() => {
      if (!showGrabber) {
        setSheetHeight(height)
      }
    }, [height, showGrabber])

    const { grabberElementRef: handleElementRef, containerElementRef } = useResizable<
      HTMLButtonElement,
      HTMLDivElement
    >({
      enabled: showGrabber,
      breakpoints: [100, 75, 50, 25, 'HIDDEN'],
      onChangeHeight: (heightPercent: number) => {
        if (heightPercent === 0) {
          setIsPresentedState(false)
          return
        }
        setSheetHeight(`${heightPercent}%`)
        if (containerRef.current) {
          containerRef.current.style.height = `${heightPercent}%`
        }
      },
    })

    const theme =
      fillColor || foregroundColor || gap || radius
        ? {
            ...(fillColor && { fillColor }),
            ...(foregroundColor && { foregroundColor }),
            ...(gap && { gap }),
            ...(radius && { radius }),
          }
        : undefined

    return (
      <>
        <p>컨트롤 패널을 통해 Sheet의 속성을 조절할 수 있어요.</p>
        <button type='button' onClick={() => setIsPresentedState(true)}>
          Sheet 열기
        </button>
        <Sheet
          isPresented={isPresentedState}
          onIsPresentedChange={(params) => setIsPresentedState(params.newValue)}
          alignment={alignment}
          width={width}
          height={showGrabber ? sheetHeight : height}
          maxWidth={maxWidth}
          radiusCorners={radiusCorners}
          theme={theme}
          ref={showGrabber ? composeRefs(containerElementRef, containerRef) : undefined}
          dismissOnEscape={dismissOnEscape}
          dismissOnClickOutside={dismissOnClickOutside}
          dismissOnFocusOutside={dismissOnFocusOutside}
        >
          {showGrabber && <Sheet.Grabber ref={handleElementRef} />}
          {showHeader && (
            <Sheet.Header>
              <div
                style={{ padding: '20px', borderBottom: '1px solid #e0e0e0', width: '100%', boxSizing: 'border-box' }}
              >
                <h3 style={{ fontSize: '20px', fontWeight: 700, margin: 0 }}>Sheet Header</h3>
              </div>
            </Sheet.Header>
          )}
          {showBody && (
            <Sheet.Body>
              <div style={{ padding: '20px', width: '100%', boxSizing: 'border-box' }}>
                <p style={{ margin: '0 0 16px 0' }}>Sheet Body Content</p>
                <p style={{ margin: '0 0 16px 0', fontSize: '14px', color: '#666' }}>
                  컨트롤을 통해 다양한 속성을 조절해보세요.
                </p>
                {showGrabber && (
                  <p style={{ margin: '16px 0 0 0', fontSize: '12px', color: '#999' }}>
                    💡 Grabber를 드래그하여 시트 크기를 조절할 수 있어요.
                  </p>
                )}
              </div>
            </Sheet.Body>
          )}
          {showFooter && (
            <Sheet.Footer>
              <div style={{ padding: '20px', borderTop: '1px solid #e0e0e0', width: '100%', boxSizing: 'border-box' }}>
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
