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

/* --------------------------------------------------------------------------
   Radix UI 벤치마크: onOpenChange 패턴 — 실시간 프리뷰 + 제어 에디터
   Radix의 제어 컴포넌트 패턴(value + onValueChange)을 에디터에 적용.
   에디터 내용이 변경될 때마다 프리뷰가 실시간으로 동기화됩니다.
-------------------------------------------------------------------------- */
const RadixControlledPreviewDemo = () => {
  const [content, setContent] = useState('<p>내용을 작성하면 오른쪽 프리뷰에 실시간으로 반영됩니다.</p>')
  const [wordCount, setWordCount] = useState(0)

  const handleChange = (html: string) => {
    setContent(html)
    const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
    setWordCount(text ? text.split(' ').length : 0)
  }

  return (
    <div style={{ maxWidth: 700, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>
        Radix 제어 컴포넌트 패턴: value + onValueChange
      </div>
      <div style={{ fontSize: 11, fontFamily: 'monospace', padding: '6px 10px', borderRadius: 4, background: 'var(--sem-eclipse-color-backgroundSecondary)', color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>
        {`<Editor content={content} onChange={handleChange} /> // 제어(Controlled)`}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundTertiary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            편집 (에디터)
          </div>
          <Editor content={content} onChange={handleChange} minHeight={180} />
          <div style={{ fontSize: 11, color: 'var(--sem-eclipse-color-foregroundQuaternary)' }}>단어 수: {wordCount}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundTertiary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            프리뷰 (읽기 전용)
          </div>
          <div
            style={{
              minHeight: 180,
              padding: '12px 14px',
              borderRadius: 8,
              border: '1px solid var(--sem-eclipse-color-borderSubtle)',
              background: 'var(--sem-eclipse-color-backgroundSecondary)',
              fontSize: 13,
              color: 'var(--sem-eclipse-color-foregroundPrimary)',
              lineHeight: 1.6,
            }}
            dangerouslySetInnerHTML={{ __html: content || '<em style="color:#94a3b8">내용 없음</em>' }}
          />
          <div style={{ fontSize: 11, color: 'var(--sem-eclipse-color-foregroundQuaternary)' }}>onChange → 실시간 동기화</div>
        </div>
      </div>
    </div>
  )
}

export const Radix_제어_에디터_실시간_프리뷰: Story = {
  name: 'Radix UI — 제어 에디터 + 실시간 프리뷰 (value + onValueChange)',
  parameters: {
    docs: {
      description: {
        story:
          'Radix의 제어 컴포넌트 패턴(content + onChange)을 에디터에 적용. ' +
          '에디터 내용(HTML)이 상태로 관리되고, onChange 콜백으로 프리뷰가 실시간 동기화됩니다. ' +
          '단어 수 카운팅도 동일 콜백에서 처리합니다.',
      },
    },
  },
  render: () => <RadixControlledPreviewDemo />,
}

/* --------------------------------------------------------------------------
   Radix UI 벤치마크: 조합 컴포넌트 파트 분리 패턴
   Radix의 Root/Trigger/Content 파트 분리처럼,
   Editor.Toolbar, Editor.CharacterCount가 독립적으로 조합됩니다.
-------------------------------------------------------------------------- */
const RadixCompoundEditorDemo = () => {
  const [mode, setMode] = useState<'write' | 'preview'>('write')
  const [content, setContent] = useState('')

  return (
    <div style={{ maxWidth: 580, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>
        Radix 조합 파트 분리: Editor.Toolbar + Editor.CharacterCount
      </div>
      <div style={{ fontSize: 11, fontFamily: 'monospace', padding: '6px 10px', borderRadius: 4, background: 'var(--sem-eclipse-color-backgroundSecondary)', color: 'var(--sem-eclipse-color-foregroundTertiary)', lineHeight: 1.7 }}>
        {`<Editor>`}<br />
        {`  <Editor.Toolbar />`}{' // Root 안의 독립 파트'}<br />
        {`  <Editor.CharacterCount max={200} />`}{' // 별도 파트'}<br />
        {`</Editor>`}
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: -4 }}>
        {(['write', 'preview'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            style={{
              padding: '4px 12px',
              borderRadius: '6px 6px 0 0',
              fontSize: 12,
              fontWeight: mode === m ? 700 : 400,
              border: `1px solid ${mode === m ? 'var(--sem-eclipse-color-borderDefault)' : 'transparent'}`,
              borderBottom: mode === m ? '1px solid var(--sem-eclipse-color-backgroundPrimary)' : '1px solid var(--sem-eclipse-color-borderDefault)',
              background: mode === m ? 'var(--sem-eclipse-color-backgroundPrimary)' : 'transparent',
              color: mode === m ? 'var(--sem-eclipse-color-foregroundPrimary)' : 'var(--sem-eclipse-color-foregroundTertiary)',
              cursor: 'pointer',
            }}
          >
            {m === 'write' ? '작성' : '미리보기'}
          </button>
        ))}
      </div>

      {mode === 'write' ? (
        <Editor
          content={content}
          onChange={setContent}
          placeholder="내용을 작성하세요..."
          maxCharacters={200}
          toolbar={<Editor.Toolbar />}
          footer={<Editor.CharacterCount max={200} />}
          minHeight={160}
        />
      ) : (
        <div style={{ minHeight: 160, padding: '12px 14px', borderRadius: 8, border: '1px solid var(--sem-eclipse-color-borderDefault)', fontSize: 13, color: 'var(--sem-eclipse-color-foregroundPrimary)', lineHeight: 1.7 }}
          dangerouslySetInnerHTML={{ __html: content || '<em style="color:#94a3b8">미리보기할 내용이 없습니다.</em>' }}
        />
      )}
    </div>
  )
}

export const Radix_조합_파트_에디터: Story = {
  name: 'Radix UI — 조합 파트 에디터 (Root/Toolbar/CharacterCount 분리)',
  parameters: {
    docs: {
      description: {
        story:
          'Radix UI의 Root/Trigger/Content 파트 분리 패턴을 에디터에 적용. ' +
          'Editor.Toolbar와 Editor.CharacterCount가 독립 파트로 조합됩니다. ' +
          'Write/Preview 탭 전환은 Radix Tabs 패턴을 시뮬레이션합니다.',
      },
    },
  },
  render: () => <RadixCompoundEditorDemo />,
}

/* --------------------------------------------------------------------------
   Radix UI 벤치마크: onOpenAutoFocus + focus 관리 패턴
   Radix Dialog에서 마운트 시 자동 포커스 설정처럼,
   에디터 활성화 시점에 포커스 + 콘텍스트 정보를 제공합니다.
-------------------------------------------------------------------------- */
const RAW_TEMPLATES = [
  { key: 'bug', label: '버그 리포트', content: '<h2>버그 요약</h2><p>어디서, 어떤 상황에서 발생했는지 서술하세요.</p><ul><li>재현 단계</li><li>예상 동작</li><li>실제 동작</li></ul>' },
  { key: 'feature', label: '기능 제안', content: '<h2>기능 제안</h2><p>어떤 문제를 해결하는 기능인지 설명하세요.</p><ul><li>배경</li><li>제안 내용</li><li>기대 효과</li></ul>' },
  { key: 'meeting', label: '회의록', content: '<h2>회의록</h2><p>일시: <br/>참석자: </p><h3>안건</h3><ul><li></li></ul><h3>결정사항</h3><ul><li></li></ul>' },
]

const RadixFocusManagementDemo = () => {
  const [activeTemplate, setActiveTemplate] = useState<string | null>(null)
  const [content, setContent] = useState('')

  const selectTemplate = (key: string) => {
    const tpl = RAW_TEMPLATES.find((t) => t.key === key)
    if (tpl) {
      setActiveTemplate(key)
      setContent(tpl.content)
    }
  }

  return (
    <div style={{ maxWidth: 560, display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)', marginBottom: 4 }}>
          Radix 포커스 관리: 템플릿 선택 후 자동 에디터 활성화
        </div>
        <div style={{ fontSize: 11, fontFamily: 'monospace', padding: '6px 10px', borderRadius: 4, background: 'var(--sem-eclipse-color-backgroundSecondary)', color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>
          {`// Radix onOpenAutoFocus → 마운트 시 포커스 자동 이동`}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        {RAW_TEMPLATES.map((tpl) => (
          <button
            key={tpl.key}
            onClick={() => selectTemplate(tpl.key)}
            style={{
              flex: 1,
              padding: '8px 10px',
              borderRadius: 8,
              fontSize: 12,
              fontWeight: activeTemplate === tpl.key ? 700 : 400,
              border: `1px solid ${activeTemplate === tpl.key ? 'var(--sem-eclipse-color-fillPrimary)' : 'var(--sem-eclipse-color-borderDefault)'}`,
              background: activeTemplate === tpl.key ? 'color-mix(in srgb, var(--sem-eclipse-color-fillPrimary) 8%, var(--sem-eclipse-color-backgroundPrimary))' : 'var(--sem-eclipse-color-backgroundPrimary)',
              color: activeTemplate === tpl.key ? 'var(--sem-eclipse-color-fillPrimary)' : 'var(--sem-eclipse-color-foregroundSecondary)',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {tpl.label}
          </button>
        ))}
      </div>

      {activeTemplate ? (
        <Editor
          key={activeTemplate}
          content={content}
          onChange={setContent}
          placeholder="내용을 입력하세요..."
          toolbar={<Editor.Toolbar />}
          minHeight={200}
        />
      ) : (
        <div style={{ minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, border: '1px dashed var(--sem-eclipse-color-borderSubtle)', background: 'var(--sem-eclipse-color-backgroundSecondary)' }}>
          <span style={{ fontSize: 13, color: 'var(--sem-eclipse-color-foregroundQuaternary)' }}>위에서 템플릿을 선택하면 에디터가 활성화됩니다</span>
        </div>
      )}
    </div>
  )
}

export const Radix_포커스_관리_템플릿_에디터: Story = {
  name: 'Radix UI — 포커스 관리 패턴 (onOpenAutoFocus, 템플릿 선택 에디터)',
  parameters: {
    docs: {
      description: {
        story:
          'Radix Dialog의 onOpenAutoFocus 패턴에 대응. 템플릿 버튼 클릭 시 에디터가 마운트되고 ' +
          '(key prop으로 remount), 내용이 초기화됩니다. ' +
          '포커스 자동 이동과 초기 콘텐츠 주입을 동시에 처리하는 패턴입니다.',
      },
    },
  },
  render: () => <RadixFocusManagementDemo />,
}

/* ── Ant Design: 단계별 폼 에디터 ── */
const AntStepFormDemo = () => {
  const [step, setStep] = useState(0)
  const [values, setValues] = useState({ title: '', content: '', summary: '' })

  const steps = ['제목 작성', '본문 편집', '요약 확인']

  return (
    <div style={{ maxWidth: 640 }}>
      {/* Step indicator */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
        {steps.map((s, i) => (
          <div key={s} style={{ display: 'flex', alignItems: 'center', flex: i < steps.length - 1 ? 1 : 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: i < step ? '#10b981' : i === step ? '#6366f1' : 'var(--sem-eclipse-color-backgroundSecondary)', color: i <= step ? '#fff' : 'var(--sem-eclipse-color-foregroundTertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0, transition: 'background 0.2s' }}>
                {i < step ? '✓' : i + 1}
              </div>
              <span style={{ fontSize: 13, fontWeight: i === step ? 700 : 400, color: i === step ? '#6366f1' : i < step ? '#10b981' : 'var(--sem-eclipse-color-foregroundTertiary)', whiteSpace: 'nowrap' }}>{s}</span>
            </div>
            {i < steps.length - 1 && <div style={{ flex: 1, height: 2, background: i < step ? '#10b981' : 'var(--sem-eclipse-color-borderSubtle)', margin: '0 8px', transition: 'background 0.2s' }} />}
          </div>
        ))}
      </div>

      {/* Step content */}
      {step === 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>게시물 제목을 입력하세요</div>
          <input
            value={values.title}
            onChange={(e) => setValues((v) => ({ ...v, title: e.target.value }))}
            placeholder="제목 (최대 100자)"
            style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid var(--sem-eclipse-color-borderDefault)', fontSize: 14, outline: 'none', color: 'var(--sem-eclipse-color-foregroundPrimary)', background: 'var(--sem-eclipse-color-backgroundPrimary)' }}
          />
          <div style={{ fontSize: 11, color: 'var(--sem-eclipse-color-foregroundTertiary)', textAlign: 'right' }}>{values.title.length}/100</div>
        </div>
      )}
      {step === 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>본문을 작성하세요</div>
          <Editor placeholder="본문 내용 입력..." toolbar={<Editor.Toolbar />} footer={<Editor.CharacterCount max={2000} />} onChange={(html) => setValues((v) => ({ ...v, content: html }))} />
        </div>
      )}
      {step === 2 && (
        <div style={{ padding: '16px', borderRadius: 8, border: '1px solid var(--sem-eclipse-color-borderDefault)', background: 'var(--sem-eclipse-color-backgroundSecondary)', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>작성 완료 확인</div>
          {[['제목', values.title || '(미입력)'], ['본문 길이', values.content ? `${values.content.replace(/<[^>]+>/g, '').length}자` : '(미입력)']].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', gap: 12 }}>
              <span style={{ fontSize: 12, color: 'var(--sem-eclipse-color-foregroundTertiary)', minWidth: 60 }}>{k}</span>
              <span style={{ fontSize: 12, color: 'var(--sem-eclipse-color-foregroundPrimary)', fontWeight: 500 }}>{v}</span>
            </div>
          ))}
        </div>
      )}

      {/* Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
        <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} style={{ padding: '8px 20px', borderRadius: 6, border: '1px solid var(--sem-eclipse-color-borderDefault)', background: 'var(--sem-eclipse-color-backgroundPrimary)', color: step === 0 ? 'var(--sem-eclipse-color-foregroundTertiary)' : 'var(--sem-eclipse-color-foregroundPrimary)', cursor: step === 0 ? 'not-allowed' : 'pointer', fontSize: 13 }}>이전</button>
        {step < steps.length - 1 ? (
          <button onClick={() => setStep((s) => s + 1)} style={{ padding: '8px 20px', borderRadius: 6, border: 'none', background: '#6366f1', color: '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>다음</button>
        ) : (
          <button onClick={() => setStep(0)} style={{ padding: '8px 20px', borderRadius: 6, border: 'none', background: '#10b981', color: '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>게시하기</button>
        )}
      </div>
    </div>
  )
}

export const Ant_단계별_폼_에디터: Story = {
  name: 'Ant Design — 단계별 폼 에디터',
  render: () => <AntStepFormDemo />,
}

/* ── Ant Design: 동적 탭 에디터 ── */
const AntTabEditorDemo = () => {
  const [tabs, setTabs] = useState([
    { id: 't1', title: 'README.md', content: '' },
    { id: 't2', title: 'CHANGELOG.md', content: '' },
  ])
  const [activeTab, setActiveTab] = useState('t1')

  const addTab = () => {
    const id = `t${Date.now()}`
    setTabs((prev) => [...prev, { id, title: `새 파일 ${prev.length + 1}.md`, content: '' }])
    setActiveTab(id)
  }

  const closeTab = (id: string) => {
    setTabs((prev) => {
      const next = prev.filter((t) => t.id !== id)
      if (activeTab === id && next.length > 0) setActiveTab(next[next.length - 1].id)
      return next
    })
  }

  const updateContent = (html: string) => {
    setTabs((prev) => prev.map((t) => (t.id === activeTab ? { ...t, content: html } : t)))
  }

  const active = tabs.find((t) => t.id === activeTab)

  return (
    <div style={{ maxWidth: 640 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)', marginBottom: 12 }}>문서 탭 에디터 (Ant Design 동적 탭 패턴)</div>
      {/* Tabs */}
      <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid var(--sem-eclipse-color-borderSubtle)', marginBottom: 0, overflowX: 'auto' }}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderBottom: `2px solid ${activeTab === tab.id ? '#6366f1' : 'transparent'}`, cursor: 'pointer', fontSize: 13, fontWeight: activeTab === tab.id ? 700 : 400, color: activeTab === tab.id ? '#6366f1' : 'var(--sem-eclipse-color-foregroundSecondary)', whiteSpace: 'nowrap', transition: 'color 0.12s', flexShrink: 0 }}
            onClick={() => setActiveTab(tab.id)}
          >
            <span>{tab.title}</span>
            <button onClick={(e) => { e.stopPropagation(); closeTab(tab.id) }} disabled={tabs.length === 1} style={{ fontSize: 12, color: 'var(--sem-eclipse-color-foregroundTertiary)', background: 'none', border: 'none', cursor: tabs.length === 1 ? 'not-allowed' : 'pointer', opacity: tabs.length === 1 ? 0.3 : 1, padding: '0 2px' }}>x</button>
          </div>
        ))}
        <button onClick={addTab} style={{ padding: '8px 12px', fontSize: 18, color: 'var(--sem-eclipse-color-foregroundTertiary)', background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0 }}>+</button>
      </div>
      {active && (
        <Editor key={active.id} placeholder={`${active.title} 내용 입력...`} toolbar={<Editor.Toolbar />} footer={<Editor.CharacterCount max={5000} />} onChange={updateContent} />
      )}
    </div>
  )
}

export const Ant_동적_탭_에디터: Story = {
  name: 'Ant Design — 동적 탭 에디터',
  render: () => <AntTabEditorDemo />,
}

/* ── Ant Design: 폼 유효성 검사 에디터 ── */
const AntValidationEditorDemo = () => {
  const [value, setValue] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const text = value.replace(/<[^>]+>/g, '').trim()
  const charCount = text.length
  const MIN = 50
  const MAX = 1000

  const isValid = charCount >= MIN && charCount <= MAX
  const status = submitted && !isValid ? 'error' : charCount > 0 && charCount < MIN ? 'warning' : 'default'
  const statusMsg = status === 'error' ? `최소 ${MIN}자 이상 입력하세요 (현재 ${charCount}자)` : status === 'warning' ? `${MIN - charCount}자 더 필요합니다` : null

  return (
    <div style={{ maxWidth: 640 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)', marginBottom: 4 }}>리뷰 작성 (Ant Design 유효성 검사 패턴)</div>
      <div style={{ fontSize: 12, color: 'var(--sem-eclipse-color-foregroundTertiary)', marginBottom: 12 }}>최소 {MIN}자 이상, 최대 {MAX}자 이하로 작성하세요.</div>
      <div style={{ border: `2px solid ${status === 'error' ? '#ef4444' : status === 'warning' ? '#f59e0b' : 'var(--sem-eclipse-color-borderDefault)'}`, borderRadius: 8, overflow: 'hidden', transition: 'border-color 0.15s' }}>
        <Editor placeholder="솔직하고 상세한 리뷰를 작성해주세요..." toolbar={<Editor.Toolbar />} footer={<Editor.CharacterCount max={MAX} />} onChange={setValue} />
      </div>
      {statusMsg && (
        <div style={{ marginTop: 6, fontSize: 12, color: status === 'error' ? '#ef4444' : '#f59e0b', display: 'flex', alignItems: 'center', gap: 4 }}>
          <span>{status === 'error' ? '!' : '△'}</span> {statusMsg}
        </div>
      )}
      <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ height: 4, flex: 1, borderRadius: 2, background: 'var(--sem-eclipse-color-borderSubtle)', overflow: 'hidden', marginRight: 12 }}>
          <div style={{ height: '100%', width: `${Math.min(100, (charCount / MIN) * 100)}%`, background: isValid ? '#10b981' : status === 'warning' ? '#f59e0b' : '#6366f1', transition: 'width 0.2s, background 0.2s', borderRadius: 2 }} />
        </div>
        <button onClick={() => setSubmitted(true)} disabled={submitted && !isValid} style={{ padding: '8px 20px', borderRadius: 6, border: 'none', background: isValid ? '#6366f1' : 'var(--sem-eclipse-color-backgroundSecondary)', color: isValid ? '#fff' : 'var(--sem-eclipse-color-foregroundTertiary)', cursor: isValid ? 'pointer' : 'not-allowed', fontSize: 13, fontWeight: 600, transition: 'all 0.15s' }}>
          {submitted && isValid ? '제출 완료!' : '리뷰 제출'}
        </button>
      </div>
    </div>
  )
}

export const Ant_폼_유효성_검사_에디터: Story = {
  name: 'Ant Design — 폼 유효성 검사 에디터',
  render: () => <AntValidationEditorDemo />,
}

/* ── Mantine: 협업 메모 에디터 ── */
const MantineColabEditorDemo = () => {
  const [content, setContent] = useState('')
  const [collaborators] = useState([
    { name: 'HJ', color: '#6366f1' },
    { name: 'SY', color: '#10b981' },
    { name: 'JW', color: '#f59e0b' },
  ])
  const [saving, setSaving] = useState(false)

  const save = async () => {
    setSaving(true)
    await new Promise((r) => setTimeout(r, 800))
    setSaving(false)
  }

  const charCount = content.replace(/<[^>]+>/g, '').trim().length

  return (
    <div style={{ maxWidth: 640 }}>
      {/* 헤더 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <div style={{ flex: 1, fontSize: 14, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>협업 메모</div>
        {/* 협업자 아바타 */}
        <div style={{ display: 'flex', gap: -4 }}>
          {collaborators.map((c) => (
            <div key={c.name} style={{ width: 26, height: 26, borderRadius: '50%', background: c.color, color: '#fff', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff', marginLeft: -6 }}>{c.name}</div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {charCount > 0 && <span style={{ fontSize: 11, color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>{charCount}자</span>}
          <button onClick={save} disabled={charCount === 0 || saving} style={{ padding: '6px 12px', borderRadius: 6, border: 'none', background: charCount > 0 ? '#0f172a' : '#e2e8f0', color: charCount > 0 ? '#fff' : '#94a3b8', fontSize: 12, fontWeight: 600, cursor: charCount > 0 ? 'pointer' : 'not-allowed' }}>
            {saving ? '저장 중...' : '저장'}
          </button>
        </div>
      </div>
      <Editor
        placeholder="팀 메모를 작성하세요... (Mantine 협업 에디터 패턴)"
        toolbar={<Editor.Toolbar />}
        footer={<Editor.CharacterCount />}
        onChange={setContent}
      />
      <p style={{ fontSize: 11, color: 'var(--sem-eclipse-color-foregroundDisabled)', marginTop: 8 }}>Mantine RTE 협업 메모 패턴 — 협업자 아바타 + 자동 저장</p>
    </div>
  )
}

export const Mantine_협업_메모_에디터: Story = {
  name: 'Mantine — 협업 메모 에디터 (실시간 저장)',
  parameters: {
    docs: {
      description: {
        story: 'Mantine Rich Text Editor 패턴. 협업자 아바타 중첩 표시, 실시간 글자 수 카운트, 저장 버튼 비활성화(내용 없을 때), 저장 애니메이션 패턴.',
      },
    },
  },
  render: () => <MantineColabEditorDemo />,
}

/* ── Notion Design: 블록 에디터 스타일 ── */
const NotionBlockEditorDemo = () => {
  const [blocks, setBlocks] = useState([
    { id: 'h1', type: 'h1' as const, content: '' },
    { id: 'body', type: 'body' as const, content: '' },
  ])
  const [activeBlock, setActiveBlock] = useState<string | null>('h1')

  const addBlock = () => setBlocks((prev) => [...prev, { id: `b${Date.now()}`, type: 'body' as const, content: '' }])

  return (
    <div style={{ maxWidth: 640 }}>
      {/* Notion 스타일 헤더 */}
      <div style={{ padding: '12px 0 8px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid var(--sem-eclipse-color-borderSubtle)', marginBottom: 12 }}>
        <span style={{ fontSize: 11, color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>/ 명령어로 블록 추가</span>
        <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>마지막 편집: 방금 전</span>
      </div>

      {/* 블록 에디터 목록 */}
      {blocks.map((block, i) => (
        <div key={block.id} style={{ marginBottom: 8, position: 'relative' }} onClick={() => setActiveBlock(block.id)}>
          {activeBlock === block.id && (
            <div style={{ position: 'absolute', left: -24, top: '50%', transform: 'translateY(-50%)', width: 3, height: '60%', borderRadius: 2, background: '#6366f1' }} />
          )}
          {i === 0 ? (
            <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>
              <Editor
                placeholder="제목 없음"
                toolbar={null}
                onChange={(html) => setBlocks((prev) => prev.map((b) => b.id === block.id ? { ...b, content: html } : b))}
              />
            </div>
          ) : (
            <Editor
              placeholder={`블록 ${i} — 텍스트를 입력하세요`}
              toolbar={i === 1 ? <Editor.Toolbar /> : null}
              footer={i === blocks.length - 1 ? <Editor.CharacterCount /> : null}
              onChange={(html) => setBlocks((prev) => prev.map((b) => b.id === block.id ? { ...b, content: html } : b))}
            />
          )}
        </div>
      ))}

      <button onClick={addBlock} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px', borderRadius: 6, border: '1px dashed var(--sem-eclipse-color-borderSubtle)', background: 'transparent', color: 'var(--sem-eclipse-color-foregroundTertiary)', fontSize: 12, cursor: 'pointer', marginTop: 8 }}>
        + 새 블록 추가
      </button>
      <p style={{ fontSize: 11, color: 'var(--sem-eclipse-color-foregroundDisabled)', marginTop: 12 }}>Notion 블록 에디터 패턴 — 포커스 인디케이터 + 블록 추가</p>
    </div>
  )
}

export const Notion_블록_에디터_스타일: Story = {
  name: 'Notion Design — 블록 에디터 스타일',
  parameters: {
    docs: {
      description: {
        story: 'Notion 페이지 편집기 패턴. 제목 블록(대형 폰트) + 본문 블록 분리, 포커스 블록 좌측 인디케이터, 새 블록 추가 버튼, / 명령어 힌트.',
      },
    },
  },
  render: () => <NotionBlockEditorDemo />,
}

/* ── Mantine + Notion: 이슈 설명 에디터 ── */
const MantineNotionIssueEditorDemo = () => {
  const [content, setContent] = useState('')
  const [pinned, setPinned] = useState(false)
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium')

  const PRIORITY_COLORS: Record<string, string> = { low: '#94a3b8', medium: '#f59e0b', high: '#ef4444' }
  const textLen = content.replace(/<[^>]+>/g, '').trim().length
  const isReady = textLen >= 20

  return (
    <div style={{ maxWidth: 640, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {/* 이슈 메타 헤더 */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: '#6366f1', fontWeight: 700, background: '#6366f108', padding: '2px 8px', borderRadius: 4 }}>ORB-256</span>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
          style={{ fontSize: 11, fontWeight: 700, color: PRIORITY_COLORS[priority], border: `1px solid ${PRIORITY_COLORS[priority]}40`, background: `${PRIORITY_COLORS[priority]}10`, borderRadius: 6, padding: '3px 8px', outline: 'none', cursor: 'pointer' }}
        >
          <option value="low">낮음</option>
          <option value="medium">중간</option>
          <option value="high">높음</option>
        </select>
        <button onClick={() => setPinned((v) => !v)} style={{ marginLeft: 'auto', fontSize: 11, color: pinned ? '#f59e0b' : 'var(--sem-eclipse-color-foregroundTertiary)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>
          {pinned ? '★ 고정됨' : '☆ 고정'}
        </button>
      </div>
      {/* 에디터 */}
      <div style={{ border: `2px solid ${isReady ? '#10b981' : 'var(--sem-eclipse-color-borderDefault)'}`, borderRadius: 8, overflow: 'hidden', transition: 'border-color 0.2s' }}>
        <Editor
          placeholder="이슈 설명을 작성하세요... (최소 20자)"
          toolbar={<Editor.Toolbar />}
          footer={<Editor.CharacterCount />}
          onChange={setContent}
        />
      </div>
      {/* 상태 피드백 */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <span style={{ fontSize: 11, color: isReady ? '#10b981' : 'var(--sem-eclipse-color-foregroundTertiary)' }}>
          {isReady ? '설명 충분함' : `${Math.max(0, 20 - textLen)}자 더 입력하세요`}
        </span>
        <button disabled={!isReady} style={{ marginLeft: 'auto', padding: '7px 16px', borderRadius: 8, border: 'none', background: isReady ? `${PRIORITY_COLORS[priority]}` : '#e2e8f0', color: isReady ? '#fff' : '#94a3b8', fontSize: 12, fontWeight: 700, cursor: isReady ? 'pointer' : 'not-allowed', transition: 'all 0.2s' }}>
          이슈 생성
        </button>
      </div>
      <p style={{ fontSize: 11, color: 'var(--sem-eclipse-color-foregroundDisabled)' }}>Mantine + Notion 이슈 설명 에디터 — 우선순위 + 최소 길이 검증</p>
    </div>
  )
}

export const Mantine_Notion_이슈_설명_에디터: Story = {
  name: 'Mantine + Notion — 이슈 설명 에디터 (우선순위 + 검증)',
  parameters: {
    docs: {
      description: {
        story: 'Mantine RTE + Notion 이슈 UI 패턴 조합. 우선순위 컬러 셀렉터, 고정 토글, 최소 20자 입력 시 border 녹색 전환 및 이슈 생성 버튼 활성화. 이슈 생성 폼 패턴.',
      },
    },
  },
  render: () => <MantineNotionIssueEditorDemo />,
}
