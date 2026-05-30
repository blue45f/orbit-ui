import { afterEach, describe, expect, test, vi } from 'vitest'

import { cleanup, fireEvent, render, screen } from '../../test-utils'

import { Editor } from './Editor'

describe('Editor (eclipse) - smoke tests', () => {
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  test('렌더링 시 에러 없이 마운트된다', () => {
    const { container } = render(<Editor placeholder="내용 입력" />)
    expect(container.firstChild).toBeTruthy()
  })

  test('content prop으로 초기 HTML이 표시된다', () => {
    const { container } = render(<Editor content="<p>Hello Orbit</p>" />)
    // TipTap이 ProseMirror 컨테이너를 렌더링
    expect(container.querySelector('.tiptap-orbit')).toBeInTheDocument()
  })

  test('toolbar prop으로 툴바를 렌더링한다', () => {
    render(<Editor toolbar={<Editor.Toolbar />} />)
    expect(screen.getByTitle('굵게 (Ctrl+B)')).toBeInTheDocument()
    expect(screen.getByTitle('기울임 (Ctrl+I)')).toBeInTheDocument()
  })

  test('footer prop으로 CharacterCount를 렌더링한다', () => {
    render(<Editor footer={<Editor.CharacterCount />} />)
    // 문자 수가 0자로 시작
    expect(screen.getByText(/0자/)).toBeInTheDocument()
  })

  test('CharacterCount에 max를 전달하면 0 / max 형식으로 렌더링된다', () => {
    render(<Editor maxCharacters={100} footer={<Editor.CharacterCount max={100} />} />)
    expect(screen.getByText('0 / 100')).toBeInTheDocument()
  })

  test('editable=false 모드로 렌더링할 수 있다', () => {
    const { container } = render(<Editor editable={false} content="<p>읽기 전용</p>" />)
    expect(container.querySelector('.tiptap-orbit')).toBeInTheDocument()
  })

  test('error 상태로 렌더링할 수 있다', () => {
    const { container } = render(<Editor error />)
    expect(container.firstChild).toBeTruthy()
  })

  test('minHeight 옵션이 적용된다', () => {
    const { container } = render(<Editor minHeight={200} />)
    // 두 번째 div (에디터 영역)이 min-height를 가지고 있는지 확인
    const contentArea = container.querySelector('.tiptap-orbit')?.parentElement
    expect(contentArea?.style.minHeight).toBe('200px')
  })

  test('Link extension을 중복 등록하지 않는다', () => {
    const consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => undefined)

    render(<Editor placeholder="내용 입력" />)

    expect(consoleWarn.mock.calls.flat().join(' ')).not.toContain('Duplicate extension names')
  })

  test('비활성 툴바 버튼에 hover 시 배경이 강조되고 leave 시 복원된다', () => {
    render(<Editor toolbar={<Editor.Toolbar />} />)
    const boldButton = screen.getByTitle('굵게 (Ctrl+B)')

    // 비활성 상태의 초기 배경
    expect(boldButton.style.background).toBe('transparent')

    fireEvent.mouseEnter(boldButton)
    expect(boldButton.style.background).toBe('var(--sem-eclipse-color-backgroundTertiary)')

    fireEvent.mouseLeave(boldButton)
    expect(boldButton.style.background).toBe('transparent')
  })
})
