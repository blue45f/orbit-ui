import { useEditor, EditorContent, Editor as TiptapEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import CharacterCount from '@tiptap/extension-character-count'
import Link from '@tiptap/extension-link'
import {
  CSSProperties,
  ReactNode,
  useCallback,
  createContext,
  useContext,
} from 'react'

/* ── Context ─────────────────────────────────────────────── */

interface EditorContextValue {
  editor: TiptapEditor | null
}

const EditorContext = createContext<EditorContextValue>({ editor: null })

const useEditorContext = () => useContext(EditorContext)

/* ── Token colors ────────────────────────────────────────── */

const css = `
.tiptap-orbit {
  outline: none;
  padding: 12px 14px;
  min-height: 120px;
  font-size: 14px;
  line-height: 1.7;
  color: var(--sem-eclipse-color-foregroundPrimary);
  caret-color: var(--sem-eclipse-color-fillPrimary);
}

.tiptap-orbit p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: var(--sem-eclipse-color-foregroundQuaternary);
  pointer-events: none;
  height: 0;
}

.tiptap-orbit p { margin: 0 0 0.5em; }
.tiptap-orbit p:last-child { margin-bottom: 0; }
.tiptap-orbit h1 { font-size: 1.5em; font-weight: 700; margin: 0.75em 0 0.4em; }
.tiptap-orbit h2 { font-size: 1.25em; font-weight: 700; margin: 0.75em 0 0.4em; }
.tiptap-orbit h3 { font-size: 1.1em; font-weight: 600; margin: 0.75em 0 0.4em; }
.tiptap-orbit ul, .tiptap-orbit ol { padding-left: 1.5em; margin: 0.4em 0; }
.tiptap-orbit li { margin: 0.2em 0; }
.tiptap-orbit blockquote {
  border-left: 3px solid var(--sem-eclipse-color-fillPrimary);
  padding-left: 12px;
  color: var(--sem-eclipse-color-foregroundSecondary);
  margin: 0.5em 0;
}
.tiptap-orbit code {
  background: var(--sem-eclipse-color-backgroundSecondary);
  border-radius: 4px;
  padding: 1px 5px;
  font-family: "JetBrains Mono", monospace;
  font-size: 0.875em;
}
.tiptap-orbit pre {
  background: var(--sem-eclipse-color-backgroundSecondary);
  border-radius: 8px;
  padding: 12px 16px;
  overflow-x: auto;
  margin: 0.5em 0;
}
.tiptap-orbit pre code {
  background: none;
  padding: 0;
  font-size: 13px;
}
.tiptap-orbit a {
  color: var(--sem-eclipse-color-fillPrimary);
  text-decoration: underline;
}
.tiptap-orbit strong { font-weight: 700; }
.tiptap-orbit em { font-style: italic; }
.tiptap-orbit s { text-decoration: line-through; }
.tiptap-orbit hr {
  border: none;
  border-top: 1px solid var(--sem-eclipse-color-borderSubtle);
  margin: 1em 0;
}
`

const injectEditorStyles = () => {
  if (typeof document === 'undefined') return
  if (document.getElementById('orbit-editor-styles')) return
  const el = document.createElement('style')
  el.id = 'orbit-editor-styles'
  el.textContent = css
  document.head.appendChild(el)
}

/* ── Types ───────────────────────────────────────────────── */

export interface EditorProps {
  /** 초기 HTML 내용 */
  content?: string
  /** 플레이스홀더 텍스트 */
  placeholder?: string
  /** 최대 글자 수 (undefined면 무제한) */
  maxCharacters?: number
  /** 읽기 전용 모드 */
  editable?: boolean
  /** 내용 변경 콜백 (HTML 반환) */
  onChange?: (html: string) => void
  /** 에디터 영역 최소 높이 */
  minHeight?: number
  /** 인라인 스타일 오버라이드 */
  style?: CSSProperties
  /** 에러 상태 */
  error?: boolean
  /** 툴바 렌더 (EditorToolbar 컴포넌트 사용) */
  toolbar?: ReactNode
  /** 에디터 하단 추가 콘텐츠 (문자 수 등) */
  footer?: ReactNode
}

/* ── Root ────────────────────────────────────────────────── */

/**
 * ### Editor
 *
 * TipTap 기반의 리치 텍스트 에디터 컴포넌트입니다.
 * 복합 컴포넌트 패턴으로 설계되어 Toolbar, CharacterCount 등을
 * 선택적으로 조합할 수 있습니다.
 *
 * @example
 * ```tsx
 * <Editor
 *   placeholder="내용을 입력하세요..."
 *   onChange={(html) => console.log(html)}
 *   toolbar={<Editor.Toolbar />}
 *   footer={<Editor.CharacterCount max={500} />}
 * />
 * ```
 */
export const Editor = ({
  content = '',
  placeholder = '내용을 입력하세요...',
  maxCharacters,
  editable = true,
  onChange,
  minHeight = 120,
  style,
  error = false,
  toolbar,
  footer,
}: EditorProps) => {
  injectEditorStyles()

  const extensions = [
    StarterKit,
    Placeholder.configure({ placeholder }),
    Link.configure({ openOnClick: false }),
    ...(maxCharacters !== undefined
      ? [CharacterCount.configure({ limit: maxCharacters })]
      : [CharacterCount]),
  ]

  const editor = useEditor({
    extensions,
    content,
    editable,
    onUpdate: ({ editor: e }) => {
      onChange?.(e.getHTML())
    },
  })

  const borderColor = error
    ? 'var(--sem-eclipse-color-systemError)'
    : 'var(--sem-eclipse-color-borderDefault)'

  return (
    <EditorContext.Provider value={{ editor }}>
      <div
        style={{
          border: `1px solid ${borderColor}`,
          borderRadius: '8px',
          overflow: 'hidden',
          background: 'var(--sem-eclipse-color-backgroundPrimary)',
          transition: 'border-color 0.15s ease',
          ...style,
        }}
      >
        {toolbar && (
          <div
            style={{
              borderBottom: `1px solid var(--sem-eclipse-color-borderSubtle)`,
              background: 'var(--sem-eclipse-color-backgroundSecondary)',
            }}
          >
            {toolbar}
          </div>
        )}
        <div style={{ minHeight }}>
          <EditorContent editor={editor} className="tiptap-orbit" />
        </div>
        {footer && (
          <div
            style={{
              borderTop: `1px solid var(--sem-eclipse-color-borderSubtle)`,
              background: 'var(--sem-eclipse-color-backgroundSecondary)',
              padding: '6px 14px',
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </EditorContext.Provider>
  )
}

/* ── Toolbar ─────────────────────────────────────────────── */

export interface EditorToolbarProps {
  /** 커스텀 버튼 추가 */
  extra?: ReactNode
}

const ToolbarButton = ({
  active,
  disabled,
  onClick,
  title,
  children,
}: {
  active?: boolean
  disabled?: boolean
  onClick: () => void
  title: string
  children: ReactNode
}) => (
  <button
    type="button"
    title={title}
    disabled={disabled}
    onClick={onClick}
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 28,
      height: 28,
      borderRadius: 4,
      border: 'none',
      background: active
        ? 'var(--sem-eclipse-color-fillPrimary)'
        : 'transparent',
      color: active
        ? 'var(--sem-eclipse-color-backgroundPrimary)'
        : 'var(--sem-eclipse-color-foregroundSecondary)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      fontSize: 13,
      fontWeight: 600,
      fontFamily: 'inherit',
      transition: 'background 0.1s ease, color 0.1s ease',
    }}
    onMouseEnter={(e) => {
      if (!active && !disabled) {
        ;(e.currentTarget as HTMLButtonElement).style.background =
          'var(--sem-eclipse-color-backgroundTertiary)'
      }
    }}
    onMouseLeave={(e) => {
      if (!active) {
        ;(e.currentTarget as HTMLButtonElement).style.background = active
          ? 'var(--sem-eclipse-color-fillPrimary)'
          : 'transparent'
      }
    }}
  >
    {children}
  </button>
)

const Divider = () => (
  <div
    style={{
      width: 1,
      height: 20,
      background: 'var(--sem-eclipse-color-borderSubtle)',
      margin: '0 4px',
      flexShrink: 0,
    }}
  />
)

const EditorToolbar = ({ extra }: EditorToolbarProps) => {
  const { editor } = useEditorContext()

  const setLink = useCallback(() => {
    if (!editor) return
    const prev = editor.getAttributes('link').href
    const url = window.prompt('URL 입력', prev)
    if (url === null) return
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  if (!editor) return null

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        padding: '6px 8px',
        flexWrap: 'wrap',
      }}
    >
      {/* Heading */}
      <ToolbarButton
        title="제목 1"
        active={editor.isActive('heading', { level: 1 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        H1
      </ToolbarButton>
      <ToolbarButton
        title="제목 2"
        active={editor.isActive('heading', { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        H2
      </ToolbarButton>
      <ToolbarButton
        title="제목 3"
        active={editor.isActive('heading', { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        H3
      </ToolbarButton>

      <Divider />

      {/* Inline marks */}
      <ToolbarButton
        title="굵게 (Ctrl+B)"
        active={editor.isActive('bold')}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <span style={{ fontWeight: 700 }}>B</span>
      </ToolbarButton>
      <ToolbarButton
        title="기울임 (Ctrl+I)"
        active={editor.isActive('italic')}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <em>I</em>
      </ToolbarButton>
      <ToolbarButton
        title="취소선"
        active={editor.isActive('strike')}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <s>S</s>
      </ToolbarButton>
      <ToolbarButton
        title="코드"
        active={editor.isActive('code')}
        onClick={() => editor.chain().focus().toggleCode().run()}
      >
        {'</>'}
      </ToolbarButton>

      <Divider />

      {/* Lists */}
      <ToolbarButton
        title="순서 없는 목록"
        active={editor.isActive('bulletList')}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        ≡
      </ToolbarButton>
      <ToolbarButton
        title="순서 있는 목록"
        active={editor.isActive('orderedList')}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        1≡
      </ToolbarButton>

      <Divider />

      {/* Block */}
      <ToolbarButton
        title="인용구"
        active={editor.isActive('blockquote')}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        {'"'}
      </ToolbarButton>
      <ToolbarButton
        title="코드 블록"
        active={editor.isActive('codeBlock')}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      >
        {'{ }'}
      </ToolbarButton>

      <Divider />

      {/* Link */}
      <ToolbarButton
        title="링크 삽입"
        active={editor.isActive('link')}
        onClick={setLink}
      >
        🔗
      </ToolbarButton>

      <Divider />

      {/* History */}
      <ToolbarButton
        title="실행 취소 (Ctrl+Z)"
        disabled={!editor.can().undo()}
        onClick={() => editor.chain().focus().undo().run()}
      >
        ↩
      </ToolbarButton>
      <ToolbarButton
        title="다시 실행 (Ctrl+Y)"
        disabled={!editor.can().redo()}
        onClick={() => editor.chain().focus().redo().run()}
      >
        ↪
      </ToolbarButton>

      {extra && (
        <>
          <Divider />
          {extra}
        </>
      )}
    </div>
  )
}

/* ── CharacterCount ──────────────────────────────────────── */

export interface EditorCharacterCountProps {
  max?: number
}

const EditorCharacterCount = ({ max }: EditorCharacterCountProps) => {
  const { editor } = useEditorContext()
  if (!editor) return null

  const count = editor.storage.characterCount?.characters?.() ?? 0
  const isOver = max !== undefined && count > max
  const color = isOver
    ? 'var(--sem-eclipse-color-systemError)'
    : 'var(--sem-eclipse-color-foregroundTertiary)'

  return (
    <span style={{ fontSize: 12, color }}>
      {max !== undefined ? `${count} / ${max}` : `${count}자`}
    </span>
  )
}

/* ── Attach sub-components ───────────────────────────────── */

Editor.Toolbar = EditorToolbar
Editor.CharacterCount = EditorCharacterCount
