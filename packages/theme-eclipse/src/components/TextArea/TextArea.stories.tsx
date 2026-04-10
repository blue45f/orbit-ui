import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { useState } from 'react'

import { TextArea } from './TextArea'

const meta = {
  title: 'eclipse/Inputs/Text Fields/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    placeholder: 'Enter text',
    disabled: false,
    error: false,
    minimumLine: 3,
    onChange: fn(),
  },
  argTypes: {
    value: {
      control: 'text',
      description: '입력된 값 (있으면 Populated 상태)',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder 텍스트',
    },
    error: {
      control: 'boolean',
      description: '에러 상태',
    },
    minimumLine: {
      control: 'number',
      description: '최소 줄 수',
    },
    maximumLine: {
      control: 'number',
      description: '최대 줄 수',
    },
  },
} satisfies Meta<typeof TextArea>

export default meta
type Story = StoryObj<typeof meta>

export const 기본: Story = {
  parameters: {
    controls: {
      exclude: ['theme', 'className', 'style', 'axis'],
    },
  },
  render: (args) => <TextArea {...args} />,
}

const FocusedExample = ({
  value,
  placeholder,
  error,
  minimumLine,
}: {
  value?: string
  placeholder?: string
  error?: boolean
  minimumLine?: number
}) => {
  const [isFocused, setIsFocused] = useState(false)
  return (
    <div>
      <TextArea
        value={value}
        placeholder={placeholder}
        error={error}
        minimumLine={minimumLine}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <small style={{ display: 'block', marginTop: '4px', color: '#666' }}>
        {isFocused ? '(Focused - 클릭하여 포커스)' : '(클릭하여 포커스)'}
      </small>
    </div>
  )
}

export const 모든상태: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '24px',
        width: '800px',
      }}
    >
      <div>
        <h4 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 'bold' }}>State</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Enabled</p>
            <TextArea placeholder="Enter text" minimumLine={3} />
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Focused</p>
            <FocusedExample placeholder="Enter text" minimumLine={3} />
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Disabled</p>
            <TextArea placeholder="Enter text" minimumLine={3} disabled />
          </div>
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 'bold' }}>Populated</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Empty</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <TextArea placeholder="Enter text" minimumLine={3} />
              <FocusedExample placeholder="Enter text" minimumLine={3} />
              <TextArea placeholder="Enter text" minimumLine={3} disabled />
            </div>
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Populated</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <TextArea
                value={`Sample text\nLine 2\nLine 3`}
                placeholder="Enter text"
                minimumLine={3}
              />
              <FocusedExample
                value={`Sample text\nLine 2\nLine 3`}
                placeholder="Enter text"
                minimumLine={3}
              />
              <TextArea
                value={`Sample text\nLine 2\nLine 3`}
                placeholder="Enter text"
                minimumLine={3}
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const 에러상태: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '24px',
        width: '800px',
      }}
    >
      <div>
        <h4 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 'bold' }}>Error: false</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Empty</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <TextArea placeholder="Enter text" minimumLine={3} error={false} />
              <FocusedExample placeholder="Enter text" minimumLine={3} error={false} />
              <TextArea placeholder="Enter text" minimumLine={3} error={false} disabled />
            </div>
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Populated</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <TextArea
                value={`Sample text\nLine 2\nLine 3`}
                placeholder="Enter text"
                minimumLine={3}
                error={false}
              />
              <FocusedExample
                value={`Sample text\nLine 2\nLine 3`}
                placeholder="Enter text"
                minimumLine={3}
                error={false}
              />
              <TextArea
                value={`Sample text\nLine 2\nLine 3`}
                placeholder="Enter text"
                minimumLine={3}
                error={false}
                disabled
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 'bold' }}>Error: true</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Empty</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <TextArea placeholder="Enter text" minimumLine={3} error={true} />
              <FocusedExample placeholder="Enter text" minimumLine={3} error={true} />
              <TextArea placeholder="Enter text" minimumLine={3} error={true} disabled />
            </div>
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Populated</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <TextArea
                value={`Sample text\nLine 2\nLine 3`}
                placeholder="Enter text"
                minimumLine={3}
                error={true}
              />
              <FocusedExample
                value={`Sample text\nLine 2\nLine 3`}
                placeholder="Enter text"
                minimumLine={3}
                error={true}
              />
              <TextArea
                value={`Sample text\nLine 2\nLine 3`}
                placeholder="Enter text"
                minimumLine={3}
                error={true}
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const 디자인QA = {
  args: {
    placeholder: 'Enter text',
    disabled: false,
    error: false,
    minimumLine: 3,
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  render: ({ ...args }: any) => <TextArea {...args} />,
}

// MUI 문자 카운터 패턴
const CharCounterTextArea = ({
  label,
  maxLength,
  placeholder,
  required,
  helperText,
  onLengthChange,
}: {
  label: string
  maxLength: number
  placeholder?: string
  required?: boolean
  helperText?: string
  onLengthChange?: (len: number) => void
}) => {
  const [value, setValue] = useState('')
  const remaining = maxLength - value.length
  const isNearLimit = remaining <= maxLength * 0.1
  const isOver = remaining < 0
  const isError = isOver

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label style={{
        fontSize: '13px', fontWeight: '600',
        color: isError ? '#ef4444' : '#374151',
        display: 'flex', alignItems: 'center', gap: '4px',
      }}>
        {label}
        {required && <span style={{ color: '#ef4444', fontSize: '12px' }}>*</span>}
      </label>
      <TextArea
        value={value}
        placeholder={placeholder}
        error={isError}
        minimumLine={3}
        maximumLine={8}
        onChange={(e) => { setValue(e.target.value); onLengthChange?.(e.target.value.length) }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '12px', color: '#94a3b8' }}>{helperText}</span>
        <span style={{
          fontSize: '12px', fontWeight: '600',
          color: isOver ? '#ef4444' : isNearLimit ? '#f59e0b' : '#94a3b8',
          fontVariantNumeric: 'tabular-nums',
        }}>
          {value.length} / {maxLength}
        </span>
      </div>
    </div>
  )
}

const MultiFieldFormDemo = () => {
  const [title, setTitle] = useState('')
  const [contentLen, setContentLen] = useState(0)
  const [tags, setTags] = useState('')

  const titleError = title.length > 0 && title.length < 5
  const contentError = contentLen > 0 && contentLen < 20

  const isReady = title.length >= 5 && contentLen >= 20

  return (
    <div style={{
      width: '560px', padding: '36px', background: '#fff',
      borderRadius: '20px', boxShadow: '0 8px 40px rgba(0,0,0,0.1)',
    }}>
      <div style={{ marginBottom: '28px' }}>
        <div style={{ fontSize: '11px', fontWeight: '700', color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
          MUI TextArea Pattern
        </div>
        <h2 style={{ margin: '0 0 6px', fontSize: '22px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.02em' }}>
          새 글 작성
        </h2>
        <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
          제목과 내용을 입력하면 게시 버튼이 활성화됩니다
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* 제목 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{
            fontSize: '13px', fontWeight: '600',
            color: titleError ? '#ef4444' : '#374151',
            display: 'flex', alignItems: 'center', gap: '4px',
          }}>
            제목 <span style={{ color: '#ef4444', fontSize: '12px' }}>*</span>
          </label>
          <TextArea
            value={title}
            placeholder="제목을 입력하세요 (5자 이상)"
            error={titleError}
            minimumLine={1}
            maximumLine={3}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {titleError ? (
              <span style={{ fontSize: '12px', color: '#ef4444' }}>제목은 5자 이상이어야 합니다</span>
            ) : (
              <span style={{ fontSize: '12px', color: '#94a3b8' }}>게시물의 제목을 입력하세요</span>
            )}
            <span style={{
              fontSize: '12px', fontWeight: '600', fontVariantNumeric: 'tabular-nums',
              color: title.length > 80 ? '#ef4444' : '#94a3b8',
            }}>
              {title.length} / 100
            </span>
          </div>
        </div>

        {/* 본문 */}
        <CharCounterTextArea
          label="내용"
          required
          maxLength={500}
          placeholder="내용을 자세히 입력하세요 (20자 이상)"
          helperText={contentError ? '내용은 20자 이상이어야 합니다' : '마크다운 문법을 지원합니다'}
          onLengthChange={setContentLen}
        />

        {/* 태그 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>
            태그
          </label>
          <TextArea
            value={tags}
            placeholder="태그를 쉼표로 구분해서 입력하세요 (예: React, TypeScript, UI)"
            minimumLine={2}
            maximumLine={4}
            onChange={(e) => setTags(e.target.value)}
          />
          <span style={{ fontSize: '12px', color: '#94a3b8' }}>선택 사항 - 최대 5개</span>
        </div>
      </div>

      <button
        style={{
          marginTop: '28px', width: '100%', padding: '14px', borderRadius: '12px',
          border: 'none', cursor: isReady ? 'pointer' : 'not-allowed',
          background: isReady ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : '#e2e8f0',
          color: isReady ? '#fff' : '#94a3b8',
          fontSize: '14px', fontWeight: '700', transition: 'all 0.2s',
        }}
      >
        게시하기
      </button>
    </div>
  )
}

export const MUI_문자카운터패턴: Story = {
  name: 'MUI 문자 카운터 패턴 (게시글 작성)',
  render: () => <MultiFieldFormDemo />,
}

// Chakra 피드백/리뷰 폼 패턴
const FeedbackFormDemo = () => {
  const [rating, setRating] = useState<number | null>(null)
  const [feedback, setFeedback] = useState('')
  const [category, setCategory] = useState<string | null>(null)

  const categories = ['버그 신고', '기능 요청', '개선 의견', '기타']
  const maxLen = 300
  const remaining = maxLen - feedback.length
  const isError = feedback.length > 0 && feedback.length < 10

  return (
    <div style={{
      width: '420px', padding: '32px', background: '#fff',
      borderRadius: '20px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
    }}>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '11px', fontWeight: '700', color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
          Chakra Textarea Pattern
        </div>
        <h3 style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>피드백 보내기</h3>
        <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>서비스 개선에 도움이 됩니다</p>
      </div>

      {/* 카테고리 */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontSize: '12px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>카테고리</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat === category ? null : cat)}
              style={{
                padding: '6px 12px', borderRadius: '20px', cursor: 'pointer',
                fontSize: '12px', fontWeight: '600',
                background: category === cat ? 'rgba(99,102,241,0.1)' : '#f8fafc',
                color: category === cat ? '#6366f1' : '#64748b',
                border: `1.5px solid ${category === cat ? 'rgba(99,102,241,0.3)' : '#e2e8f0'}`,
                transition: 'all 0.15s',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 별점 */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontSize: '12px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>만족도</div>
        <div style={{ display: 'flex', gap: '4px' }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star === rating ? null : star)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: '28px', padding: '2px',
                color: rating !== null && star <= rating ? '#f59e0b' : '#e2e8f0',
                transition: 'color 0.15s',
              }}
            >
              {star <= (rating ?? 0) ? '★' : '☆'}
            </button>
          ))}
          {rating && (
            <span style={{ fontSize: '13px', color: '#64748b', alignSelf: 'center', marginLeft: '6px' }}>
              {['', '매우 불만족', '불만족', '보통', '만족', '매우 만족'][rating]}
            </span>
          )}
        </div>
      </div>

      {/* 피드백 텍스트 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px' }}>
        <label style={{ fontSize: '12px', fontWeight: '600', color: isError ? '#ef4444' : '#374151' }}>
          상세 내용
        </label>
        <TextArea
          value={feedback}
          placeholder="자유롭게 의견을 작성해주세요..."
          error={isError}
          minimumLine={4}
          maximumLine={10}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '12px', color: isError ? '#ef4444' : '#94a3b8' }}>
            {isError ? '10자 이상 입력해주세요' : '최소 10자 이상 입력하세요'}
          </span>
          <span style={{
            fontSize: '12px', fontWeight: '600', fontVariantNumeric: 'tabular-nums',
            color: remaining < 50 ? '#f59e0b' : remaining < 0 ? '#ef4444' : '#94a3b8',
          }}>
            {feedback.length} / {maxLen}
          </span>
        </div>
      </div>

      <button
        style={{
          width: '100%', padding: '13px', borderRadius: '12px', border: 'none',
          background: feedback.length >= 10 && rating !== null ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : '#e2e8f0',
          color: feedback.length >= 10 && rating !== null ? '#fff' : '#94a3b8',
          fontSize: '14px', fontWeight: '700',
          cursor: feedback.length >= 10 && rating !== null ? 'pointer' : 'not-allowed',
          transition: 'all 0.2s',
        }}
      >
        피드백 제출
      </button>
    </div>
  )
}

export const Chakra_피드백폼패턴: Story = {
  name: 'Chakra Textarea 패턴 (피드백/리뷰 폼)',
  render: () => <FeedbackFormDemo />,
}

/* --------------------------------------------------------------------------
   Radix UI 글자수 카운터 + 미리보기 패턴
   Radix Primitive TextArea: 잔여 글자수 색상 피드백 + 입력 내용 실시간 미리보기
-------------------------------------------------------------------------- */
const RadixCharCounterRender = () => {
  const [value, setValue] = useState('')
  const maxChars = 500
  const remaining = maxChars - value.length

  return (
    <div style={{ width: 400, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <label style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>소개글</label>
        <span style={{
          fontSize: 11,
          fontWeight: 600,
          color: remaining < 50 ? '#ef4444' : remaining < 100 ? '#f59e0b' : '#94a3b8',
        }}>
          {remaining}자 남음
        </span>
      </div>
      <TextArea
        value={value}
        onChange={(e) => { if (e.target.value.length <= maxChars) setValue(e.target.value) }}
        placeholder="자신을 소개해 보세요. 팀원들이 볼 수 있습니다..."
        minimumLine={3}
        maximumLine={10}
      />
      <div style={{ fontSize: 11, color: '#94a3b8' }}>
        {value.length > 0 ? `${value.length}자 입력됨` : '선택 사항입니다. 최대 500자까지 입력할 수 있습니다.'}
      </div>
      {value.length > 0 && (
        <div style={{
          padding: '10px 14px',
          borderRadius: 8,
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          fontSize: 13,
          color: '#475569',
          whiteSpace: 'pre-wrap',
          lineHeight: 1.6,
        }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', display: 'block', marginBottom: 4 }}>미리보기</span>
          {value}
        </div>
      )}
    </div>
  )
}

export const Radix_글자수_카운터_미리보기: Story = {
  name: 'Radix UI - 글자수 카운터 + 실시간 미리보기 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Radix Primitive autosize 패턴. 잔여 글자수를 색상(정상/경고/위험)으로 표시하고 ' +
          '입력 내용을 하단 미리보기 영역에 실시간 반영합니다.',
      },
    },
  },
  render: () => <RadixCharCounterRender />,
}

/* --------------------------------------------------------------------------
   Google Material 3 인라인 유효성 검사 패턴
   M3 TextField: 입력 즉시 error boolean + 안내 텍스트 전환으로 피드백
-------------------------------------------------------------------------- */
const M3InlineValidationRender = () => {
  const [email, setEmail] = useState('')
  const [url, setUrl] = useState('')
  const [bio, setBio] = useState('')

  const emailHasError = email.length > 0 && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  const urlHasError = url.length > 0 && !url.match(/^https?:\/\//)

  return (
    <div style={{ width: 400, display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: '#1e293b' }}>프로필 설정</div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: emailHasError ? '#ef4444' : '#475569' }}>이메일</label>
        </div>
        <TextArea
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="hello@example.com"
          error={emailHasError}
          minimumLine={1}
          maximumLine={1}
        />
        <div style={{ fontSize: 11, marginTop: 4, color: emailHasError ? '#ef4444' : '#94a3b8' }}>
          {emailHasError ? '올바른 이메일 형식을 입력해 주세요.' : '계정 알림을 받을 이메일 주소입니다.'}
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: urlHasError ? '#ef4444' : '#475569' }}>웹사이트 URL</label>
        </div>
        <TextArea
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://your-site.com"
          error={urlHasError}
          minimumLine={1}
          maximumLine={1}
        />
        <div style={{ fontSize: 11, marginTop: 4, color: urlHasError ? '#ef4444' : '#94a3b8' }}>
          {urlHasError ? 'URL은 http:// 또는 https://로 시작해야 합니다.' : '포트폴리오나 블로그 주소를 입력하세요.'}
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#475569' }}>자기소개</label>
          <span style={{ fontSize: 11, color: '#94a3b8' }}>{bio.length}/200</span>
        </div>
        <TextArea
          value={bio}
          onChange={(e) => { if (e.target.value.length <= 200) setBio(e.target.value) }}
          placeholder="간단한 소개를 작성해 주세요..."
          minimumLine={3}
          maximumLine={6}
        />
      </div>

      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <button
          style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #e2e8f0', background: 'none', cursor: 'pointer', fontSize: 13, color: '#64748b', fontWeight: 500 }}
          onClick={() => { setEmail(''); setUrl(''); setBio('') }}
        >
          초기화
        </button>
        <button
          disabled={emailHasError || urlHasError}
          style={{
            padding: '8px 20px', borderRadius: 8, border: 'none',
            background: emailHasError || urlHasError ? '#f1f5f9' : '#6366f1',
            color: emailHasError || urlHasError ? '#94a3b8' : '#fff',
            cursor: emailHasError || urlHasError ? 'not-allowed' : 'pointer',
            fontSize: 13, fontWeight: 700,
          }}
        >
          저장
        </button>
      </div>
    </div>
  )
}

export const M3_인라인_유효성_검사: Story = {
  name: 'Google Material 3 - 인라인 유효성 검사 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Google Material 3 TextField 패턴. 안내 텍스트가 에러 발생 시 빨간 에러 메시지로 ' +
          '전환됩니다. error prop(boolean)으로 TextArea 스타일을 제어합니다.',
      },
    },
  },
  render: () => <M3InlineValidationRender />,
}

/* --------------------------------------------------------------------------
   Radix UI 코드 에디터 스타일 입력 패턴
   JSON 코드 입력: monospace 폰트 + 라인 번호 오버레이 + 유효성 검증
-------------------------------------------------------------------------- */
const RadixCodeEditorRender = () => {
  const defaultJson = `{
  "name": "orbit-ui",
  "version": "2.0.0",
  "description": "Eclipse theme for Orbit UI"
}`
  const [code, setCode] = useState(defaultJson)
  const [isValid, setIsValid] = useState<boolean | null>(null)

  const validate = () => {
    try {
      JSON.parse(code)
      setIsValid(true)
    } catch {
      setIsValid(false)
    }
  }

  const lineCount = code.split('\n').length

  return (
    <div style={{ width: 440, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>JSON 설정</span>
          <span style={{ fontSize: 11, color: '#94a3b8', marginLeft: 8 }}>{lineCount}줄</span>
        </div>
        {isValid !== null && (
          <span style={{
            fontSize: 11, fontWeight: 700,
            color: isValid ? '#10b981' : '#ef4444',
            padding: '2px 8px', borderRadius: 20,
            background: isValid ? '#f0fdf4' : '#fef2f2',
          }}>
            {isValid ? '유효한 JSON' : 'JSON 오류'}
          </span>
        )}
      </div>

      <div style={{ position: 'relative' }}>
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            padding: '10px 8px',
            width: 32,
            textAlign: 'right',
            fontSize: 11,
            fontFamily: 'monospace',
            color: '#94a3b8',
            lineHeight: '20px',
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        <div style={{ fontFamily: 'monospace', fontSize: 13 }}>
          <TextArea
            value={code}
            onChange={(e) => { setCode(e.target.value); setIsValid(null) }}
            placeholder="{}"
            error={isValid === false}
            minimumLine={8}
            maximumLine={20}
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <button
          onClick={validate}
          style={{ padding: '7px 14px', borderRadius: 7, border: 'none', background: '#6366f1', color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
        >
          JSON 검증
        </button>
        <button
          onClick={() => { setCode(defaultJson); setIsValid(null) }}
          style={{ padding: '7px 14px', borderRadius: 7, border: '1px solid #e2e8f0', background: 'none', color: '#64748b', fontSize: 12, fontWeight: 500, cursor: 'pointer' }}
        >
          초기화
        </button>
      </div>
      <div style={{ fontSize: 11, color: '#94a3b8' }}>
        Radix UI Primitive 패턴 — monospace 폰트, 라인 번호, JSON 유효성 검증
      </div>
    </div>
  )
}

export const Radix_코드_에디터_입력: Story = {
  name: 'Radix UI - 코드 에디터 스타일 입력 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Radix Primitive TextArea를 코드 에디터처럼 활용. monospace 폰트, 라인 번호 오버레이, ' +
          'JSON 유효성 검사 버튼을 조합한 설정 편집 UI 패턴입니다.',
      },
    },
  },
  render: () => <RadixCodeEditorRender />,
}
