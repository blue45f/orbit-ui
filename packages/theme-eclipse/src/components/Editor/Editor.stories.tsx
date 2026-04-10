import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Editor } from './Editor'

const meta: Meta<typeof Editor> = {
  title: 'eclipse/Inputs/Editor',
  component: Editor,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof Editor>

/* ── 기본 ─────────────────────────────────────────────────── */

export const 기본: Story = {
  render: () => (
    <div style={{ maxWidth: 640 }}>
      <Editor
        placeholder="내용을 입력하세요..."
        toolbar={<Editor.Toolbar />}
        footer={<Editor.CharacterCount />}
        onChange={(html) => console.log(html)}
      />
    </div>
  ),
}

/* ── 툴바 없음 ────────────────────────────────────────────── */

export const 툴바_없음: Story = {
  name: '툴바 없음 (간단 메모)',
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <Editor
        placeholder="메모를 남겨주세요..."
        minHeight={80}
        onChange={(html) => console.log(html)}
      />
    </div>
  ),
}

/* ── 글자 수 제한 ─────────────────────────────────────────── */

const CharLimitDemo = () => {
  const max = 200
  return (
    <div style={{ maxWidth: 560 }}>
      <Editor
        placeholder="자기소개를 입력하세요 (최대 200자)"
        maxCharacters={max}
        toolbar={<Editor.Toolbar />}
        footer={<Editor.CharacterCount max={max} />}
        minHeight={100}
      />
    </div>
  )
}

export const 글자수_제한: Story = {
  name: '글자 수 제한',
  render: () => <CharLimitDemo />,
}

/* ── 에러 상태 ────────────────────────────────────────────── */

const ErrorStateDemo = () => {
  const [value, setValue] = useState('')
  const isEmpty = value === '' || value === '<p></p>'
  return (
    <div style={{ maxWidth: 560, display: 'flex', flexDirection: 'column', gap: 6 }}>
      <Editor
        placeholder="필수 입력 항목입니다..."
        error={isEmpty}
        onChange={setValue}
        toolbar={<Editor.Toolbar />}
      />
      {isEmpty && (
        <span style={{ fontSize: 12, color: 'var(--sem-eclipse-color-systemError)' }}>
          내용을 입력해주세요.
        </span>
      )}
    </div>
  )
}

export const 에러_상태: Story = {
  name: '에러 상태',
  render: () => <ErrorStateDemo />,
}

/* ── 초기 내용 ────────────────────────────────────────────── */

export const 초기_내용: Story = {
  name: '초기 내용 설정',
  render: () => (
    <div style={{ maxWidth: 640 }}>
      <Editor
        content={`<h2>프로젝트 소개</h2>
<p>Orbit UI는 Figma 기반의 React 디자인 시스템입니다.</p>
<ul>
  <li><strong>3단계 토큰 시스템</strong> — Reference → Semantic → Component</li>
  <li><em>헤드리스 아키텍처</em> — 베이스 + 테마 레이어 분리</li>
  <li>TipTap 기반의 리치 텍스트 편집기 내장</li>
</ul>
<blockquote>디자이너와 개발자가 함께 만드는 일관된 UI</blockquote>`}
        toolbar={<Editor.Toolbar />}
        footer={<Editor.CharacterCount />}
      />
    </div>
  ),
}

/* ── 읽기 전용 ────────────────────────────────────────────── */

export const 읽기_전용: Story = {
  name: '읽기 전용',
  render: () => (
    <div style={{ maxWidth: 600 }}>
      <Editor
        editable={false}
        content={`<h3>릴리즈 노트 v2.0</h3>
<p>이번 업데이트에서 다음 기능이 추가되었습니다:</p>
<ol>
  <li>리치 텍스트 <strong>Editor 컴포넌트</strong> 추가 (TipTap 기반)</li>
  <li>다크 모드 최적화</li>
  <li>67개 템플릿 스토리 제공</li>
</ol>`}
        style={{ opacity: 0.85 }}
      />
    </div>
  ),
}

/* ── 블로그 에디터 (조합 예시) ──────────────────────────── */

const BlogEditorDemo = () => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const maxBody = 3000

  return (
    <div style={{ maxWidth: 720, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <label
          style={{
            display: 'block',
            fontSize: 12,
            fontWeight: 600,
            color: 'var(--sem-eclipse-color-foregroundSecondary)',
            marginBottom: 6,
          }}
        >
          제목
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="포스트 제목을 입력하세요"
          style={{
            width: '100%',
            padding: '10px 14px',
            fontSize: 18,
            fontWeight: 700,
            border: '1px solid var(--sem-eclipse-color-borderDefault)',
            borderRadius: 8,
            background: 'var(--sem-eclipse-color-backgroundPrimary)',
            color: 'var(--sem-eclipse-color-foregroundPrimary)',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      </div>

      <div>
        <label
          style={{
            display: 'block',
            fontSize: 12,
            fontWeight: 600,
            color: 'var(--sem-eclipse-color-foregroundSecondary)',
            marginBottom: 6,
          }}
        >
          본문
        </label>
        <Editor
          placeholder="포스트 내용을 작성하세요..."
          maxCharacters={maxBody}
          toolbar={<Editor.Toolbar />}
          footer={<Editor.CharacterCount max={maxBody} />}
          minHeight={240}
          onChange={setBody}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
        <button
          style={{
            padding: '8px 16px',
            borderRadius: 6,
            border: '1px solid var(--sem-eclipse-color-borderDefault)',
            background: 'transparent',
            color: 'var(--sem-eclipse-color-foregroundSecondary)',
            fontSize: 14,
            cursor: 'pointer',
          }}
        >
          임시 저장
        </button>
        <button
          disabled={!title || !body || body === '<p></p>'}
          style={{
            padding: '8px 20px',
            borderRadius: 6,
            border: 'none',
            background:
              !title || !body || body === '<p></p>'
                ? 'var(--sem-eclipse-color-backgroundTertiary)'
                : 'var(--sem-eclipse-color-fillPrimary)',
            color:
              !title || !body || body === '<p></p>'
                ? 'var(--sem-eclipse-color-foregroundQuaternary)'
                : 'var(--sem-eclipse-color-backgroundPrimary)',
            fontSize: 14,
            fontWeight: 600,
            cursor: !title || !body || body === '<p></p>' ? 'not-allowed' : 'pointer',
          }}
        >
          게시하기
        </button>
      </div>
    </div>
  )
}

export const 블로그_에디터: Story = {
  name: '블로그 에디터 (조합 예시)',
  render: () => <BlogEditorDemo />,
}
