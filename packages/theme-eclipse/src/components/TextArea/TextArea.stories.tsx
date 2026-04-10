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

/* --------------------------------------------------------------------------
   shadcn/ui 벤치마크: 코멘트 리치 텍스트 에디터 패턴
   shadcn Textarea + 리치 에디터 패턴 — 서식 툴바 + 멘션 힌트 + 글자 수 제한
-------------------------------------------------------------------------- */
const MAX_COMMENT_LEN = 500

function ShadcnCommentEditorRender() {
  const [value, setValue] = useState('')
  const [mode, setMode] = useState<'write' | 'preview'>('write')
  const [submitted, setSubmitted] = useState(false)

  const remaining = MAX_COMMENT_LEN - value.length
  const isOver = remaining < 0

  const handleSubmit = () => {
    if (!value.trim() || isOver) return
    setSubmitted(true)
    setTimeout(() => { setSubmitted(false); setValue('') }, 2000)
  }

  return (
    <div style={{ width: 480, display: 'flex', flexDirection: 'column', gap: 0, border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden' }}>
      {/* Header tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid #f1f5f9', background: '#fafafa' }}>
        {(['write', 'preview'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            style={{
              padding: '10px 16px', background: 'none', border: 'none', cursor: 'pointer',
              fontSize: 13, fontWeight: mode === m ? 700 : 500,
              color: mode === m ? '#1e293b' : '#94a3b8',
              borderBottom: mode === m ? '2px solid #6366f1' : '2px solid transparent',
              transition: 'all 0.15s',
            }}
          >
            {m === 'write' ? '작성' : '미리보기'}
          </button>
        ))}
      </div>

      {/* Content area */}
      <div style={{ background: '#fff', padding: 12 }}>
        {mode === 'write' ? (
          <TextArea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="코멘트를 작성하세요. @멘션으로 팀원을 태그할 수 있습니다."
            minimumLine={5}
            error={isOver}
          />
        ) : (
          <div style={{
            minHeight: 120, padding: '10px 14px', fontSize: 14, color: '#1e293b', lineHeight: 1.7,
            background: '#f8fafc', borderRadius: 8,
          }}>
            {value || <span style={{ color: '#94a3b8' }}>미리보기할 내용이 없습니다.</span>}
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ padding: '8px 12px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fafafa' }}>
        <span style={{
          fontSize: 11, fontWeight: 600,
          color: isOver ? '#ef4444' : remaining <= 50 ? '#f59e0b' : '#94a3b8',
        }}>
          {remaining < 0 ? `-${Math.abs(remaining)}` : remaining}자 남음
        </span>
        <div style={{ display: 'flex', gap: 6 }}>
          <button
            onClick={() => setValue('')}
            style={{ padding: '6px 12px', borderRadius: 7, border: '1px solid #e2e8f0', background: '#fff', color: '#64748b', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
          >
            초기화
          </button>
          <button
            onClick={handleSubmit}
            disabled={!value.trim() || isOver}
            style={{
              padding: '6px 14px', borderRadius: 7, border: 'none',
              background: submitted ? '#10b981' : (!value.trim() || isOver) ? '#e2e8f0' : '#6366f1',
              color: submitted || (!value.trim() && !isOver) ? (submitted ? '#fff' : '#94a3b8') : '#fff',
              fontSize: 12, fontWeight: 700, cursor: (!value.trim() || isOver) ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {submitted ? '제출됨!' : '코멘트 제출'}
          </button>
        </div>
      </div>
    </div>
  )
}

export const Shadcn_코멘트_리치_에디터: Story = {
  name: 'shadcn/ui - 코멘트 리치 에디터 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'shadcn/ui Textarea + 리치 에디터 패턴. 작성/미리보기 탭 전환, 글자 수 제한 표시(500자), ' +
          '초과 시 에러 상태, 제출 성공 피드백 애니메이션 포함.',
      },
    },
  },
  render: () => <ShadcnCommentEditorRender />,
}

/* --------------------------------------------------------------------------
   Vercel 벤치마크: 환경변수 멀티라인 편집기 패턴
   Vercel Env Vars 편집기 — .env 형식 파싱 + 검증 + 추가 UI
-------------------------------------------------------------------------- */
const ENV_PLACEHOLDER = `NEXT_PUBLIC_API_URL=https://api.example.com
DATABASE_URL=postgresql://user:pass@localhost:5432/db
NEXTAUTH_SECRET=your-secret-key-here
REDIS_URL=redis://localhost:6379`

function VercelEnvEditorRender() {
  const [raw, setRaw] = useState(ENV_PLACEHOLDER)
  const [parsed, setParsed] = useState<{ key: string; value: string; valid: boolean }[]>([])
  const [showParsed, setShowParsed] = useState(false)

  const parseEnv = () => {
    const lines = raw.split('\n').filter((l) => l.trim() && !l.startsWith('#'))
    const result = lines.map((line) => {
      const eqIdx = line.indexOf('=')
      if (eqIdx === -1) return { key: line, value: '', valid: false }
      const key = line.slice(0, eqIdx).trim()
      const value = line.slice(eqIdx + 1).trim()
      const validKey = /^[A-Z][A-Z0-9_]*$/.test(key)
      return { key, value, valid: validKey && value.length > 0 }
    })
    setParsed(result)
    setShowParsed(true)
  }

  const validCount = parsed.filter((p) => p.valid).length
  const errorCount = parsed.filter((p) => !p.valid).length

  return (
    <div style={{ width: 480, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#1e293b' }}>환경 변수 일괄 입력</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 7, background: '#f8fafc', border: '1px solid #e2e8f0', fontSize: 11, color: '#64748b' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
          .env 형식
        </div>
      </div>

      <div style={{ fontFamily: 'monospace', fontSize: 12 }}>
        <TextArea
          value={raw}
          onChange={(e) => { setRaw(e.target.value); setShowParsed(false) }}
          minimumLine={6}
          placeholder="KEY=value 형식으로 입력 (한 줄에 하나씩)"
        />
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <button
          onClick={parseEnv}
          style={{ flex: 1, padding: '9px', borderRadius: 8, border: 'none', background: '#6366f1', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}
        >
          파싱 & 검증
        </button>
        <button
          onClick={() => { setRaw(''); setShowParsed(false) }}
          style={{ padding: '9px 16px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', color: '#64748b', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
        >
          초기화
        </button>
      </div>

      {showParsed && parsed.length > 0 && (
        <div style={{ border: '1px solid #e2e8f0', borderRadius: 10, overflow: 'hidden' }}>
          <div style={{ padding: '8px 14px', background: '#f8fafc', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#1e293b' }}>파싱 결과 ({parsed.length}개)</span>
            <div style={{ display: 'flex', gap: 10, fontSize: 11 }}>
              {validCount > 0 && <span style={{ color: '#10b981', fontWeight: 700 }}>유효 {validCount}</span>}
              {errorCount > 0 && <span style={{ color: '#ef4444', fontWeight: 700 }}>오류 {errorCount}</span>}
            </div>
          </div>
          {parsed.map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '8px 14px',
                borderBottom: i < parsed.length - 1 ? '1px solid #f8fafc' : 'none',
                background: item.valid ? '#fff' : '#fef2f2',
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: item.valid ? '#10b981' : '#ef4444', flexShrink: 0 }} />
              <span style={{ fontSize: 12, fontFamily: 'monospace', fontWeight: 700, color: '#1e293b', minWidth: 160 }}>{item.key}</span>
              <span style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {item.value ? item.value.slice(0, 30) + (item.value.length > 30 ? '...' : '') : '(값 없음)'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export const Vercel_환경변수_멀티라인_편집기: Story = {
  name: 'Vercel - 환경변수 멀티라인 편집기 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Vercel 환경변수 일괄 입력 패턴. .env 형식으로 붙여넣기 후 파싱 & 검증, ' +
          'monospace 폰트로 코드 에디터 느낌, KEY/VALUE 분리 + 유효성 표시.',
      },
    },
  },
  render: () => <VercelEnvEditorRender />,
}

/* --------------------------------------------------------------------------
   Linear 벤치마크: 이슈 설명 자동저장 에디터 패턴
   Linear 이슈 설명 필드 — 자동저장 상태 표시, Markdown 힌트
-------------------------------------------------------------------------- */
type AutoSaveStatus = 'idle' | 'saving' | 'saved' | 'error'

function LinearAutoSaveEditorRender() {
  const [desc, setDesc] = useState('이슈 재현 단계:\n1. Storybook을 실행한다\n2. Chip 컴포넌트로 이동한다\n3. 클릭 이벤트 확인')
  const [status, setStatus] = useState<AutoSaveStatus>('saved')
  const timerRef = { current: null as ReturnType<typeof setTimeout> | null }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDesc(e.target.value)
    setStatus('idle')
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setStatus('saving')
      setTimeout(() => setStatus('saved'), 600)
    }, 1000)
  }

  const STATUS_LABEL: Record<AutoSaveStatus, string> = {
    idle: '변경됨',
    saving: '저장 중...',
    saved: '저장됨',
    error: '저장 실패',
  }

  const STATUS_COLOR: Record<AutoSaveStatus, string> = {
    idle: '#94a3b8',
    saving: '#f59e0b',
    saved: '#10b981',
    error: '#ef4444',
  }

  const wordCount = desc.trim() ? desc.trim().split(/\s+/).length : 0

  return (
    <div style={{ width: 480, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>이슈 설명</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: STATUS_COLOR[status], display: 'inline-block', transition: 'background 0.2s' }} />
          <span style={{ fontSize: 11, color: STATUS_COLOR[status], fontWeight: 600, transition: 'color 0.2s' }}>
            {STATUS_LABEL[status]}
          </span>
        </div>
      </div>

      <TextArea
        value={desc}
        onChange={handleChange}
        minimumLine={8}
        placeholder="이슈를 자세히 설명해 주세요. Markdown 문법을 지원합니다."
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 10px', borderRadius: 8, background: '#f8fafc', border: '1px solid #f1f5f9' }}>
        <div style={{ display: 'flex', gap: 14, fontSize: 11, color: '#94a3b8' }}>
          <span><strong style={{ color: '#64748b' }}>{desc.length}</strong>자</span>
          <span><strong style={{ color: '#64748b' }}>{wordCount}</strong>단어</span>
          <span><strong style={{ color: '#64748b' }}>{desc.split('\n').length}</strong>줄</span>
        </div>
        <span style={{ fontSize: 11, color: '#94a3b8' }}>Ctrl+Enter로 제출</span>
      </div>
    </div>
  )
}

export const Linear_이슈_설명_자동저장: Story = {
  name: 'Linear - 이슈 설명 자동저장 에디터 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Linear 이슈 설명 자동저장 패턴. 1초 debounce 후 "저장 중..." → "저장됨" 상태 전환, ' +
          '글자 수/단어 수/줄 수 실시간 카운터, 상태 점(indicator dot) 색상 전환.',
      },
    },
  },
  render: () => <LinearAutoSaveEditorRender />,
}

function MantineFeedbackFormRender() {
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (rating > 0 && feedback.trim().length >= 10) {
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <div style={{ width: 440, padding: 32, borderRadius: 12, background: '#f0fdf4', border: '1px solid #bbf7d0', textAlign: 'center' }}>
        <div style={{ fontSize: 36, marginBottom: 12 }}>🎉</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: '#15803d', marginBottom: 6 }}>피드백 감사합니다!</div>
        <div style={{ fontSize: 13, color: '#4ade80' }}>소중한 의견을 반영하겠습니다.</div>
        <button
          onClick={() => { setRating(0); setFeedback(''); setSubmitted(false) }}
          style={{ marginTop: 20, padding: '8px 20px', borderRadius: 8, border: 'none', background: '#16a34a', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
        >
          다시 작성
        </button>
      </div>
    )
  }

  return (
    <div style={{ width: 440, display: 'flex', flexDirection: 'column', gap: 20, padding: 24, borderRadius: 12, border: '1px solid #e2e8f0', background: '#fff' }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#1e293b', marginBottom: 4 }}>서비스 만족도</div>
        <div style={{ fontSize: 12, color: '#94a3b8' }}>전반적인 경험을 평가해 주세요</div>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            style={{ background: 'none', border: 'none', fontSize: 28, cursor: 'pointer', opacity: star <= rating ? 1 : 0.3, transition: 'opacity 0.15s', lineHeight: 1 }}
          >
            ★
          </button>
        ))}
        {rating > 0 && (
          <span style={{ fontSize: 12, color: '#64748b', alignSelf: 'center', marginLeft: 4 }}>
            {['', '매우 불만족', '불만족', '보통', '만족', '매우 만족'][rating]}
          </span>
        )}
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>상세 피드백</div>
          <div style={{ fontSize: 11, color: feedback.length < 10 ? '#ef4444' : '#10b981' }}>
            {feedback.length}/500 {feedback.length < 10 ? `(최소 ${10 - feedback.length}자 더 필요)` : '✓'}
          </div>
        </div>
        <TextArea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          minimumLine={5}
          error={feedback.length > 0 && feedback.length < 10}
          placeholder="서비스 이용 중 불편한 점이나 개선하면 좋겠다고 생각한 기능을 자세히 알려주세요."
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={rating === 0 || feedback.trim().length < 10}
        style={{
          padding: '10px 0',
          borderRadius: 8,
          border: 'none',
          background: rating > 0 && feedback.length >= 10 ? '#3b82f6' : '#e2e8f0',
          color: rating > 0 && feedback.length >= 10 ? '#fff' : '#94a3b8',
          fontSize: 14,
          fontWeight: 600,
          cursor: rating > 0 && feedback.length >= 10 ? 'pointer' : 'not-allowed',
          transition: 'background 0.2s, color 0.2s',
        }}
      >
        피드백 제출
      </button>
    </div>
  )
}

export const Mantine_피드백_폼_별점: Story = {
  name: 'Mantine - 별점 + 피드백 폼 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Mantine Rating + Textarea 조합 패턴. 별점 선택 후 최소 10자 입력 시 제출 활성화, ' +
          '실시간 글자 수 검증, 에러 상태 표시, 제출 완료 후 성공 화면으로 전환.',
      },
    },
  },
  render: () => <MantineFeedbackFormRender />,
}

function ArcoCodeReviewRender() {
  type ReviewLine = { line: number; code: string; comment: string; setComment: (v: string) => void; severity: 'info' | 'warn' | 'error' }
  const [comment1, setComment1] = useState('')
  const [comment2, setComment2] = useState('')
  const [comment3, setComment3] = useState('')
  const [active, setActive] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState<number[]>([])

  const reviewLines: ReviewLine[] = [
    { line: 42, code: 'const data = JSON.parse(req.body)', comment: comment1, setComment: setComment1, severity: 'error' },
    { line: 67, code: 'await Promise.all(requests.map(fetch))', comment: comment2, setComment: setComment2, severity: 'warn' },
    { line: 91, code: 'return res.send(result)', comment: comment3, setComment: setComment3, severity: 'info' },
  ]

  const severityColor = { error: '#ef4444', warn: '#f59e0b', info: '#3b82f6' }
  const severityLabel = { error: 'Critical', warn: 'Warning', info: 'Suggestion' }

  return (
    <div style={{ width: 520, display: 'flex', flexDirection: 'column', gap: 0, borderRadius: 10, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
      <div style={{ background: '#1e293b', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', letterSpacing: 1 }}>CODE REVIEW</span>
        <span style={{ marginLeft: 'auto', fontSize: 11, color: '#475569' }}>api/handler.ts</span>
      </div>
      {reviewLines.map((r, idx) => (
        <div key={r.line} style={{ borderTop: idx === 0 ? 'none' : '1px solid #f1f5f9' }}>
          <div
            onClick={() => setActive(active === r.line ? null : r.line)}
            style={{ display: 'flex', alignItems: 'center', gap: 0, cursor: 'pointer', background: active === r.line ? '#fafafa' : '#fff', transition: 'background 0.1s' }}
          >
            <div style={{ width: 40, padding: '10px 0', textAlign: 'center', fontSize: 11, color: '#94a3b8', background: '#f8fafc', borderRight: '1px solid #f1f5f9', flexShrink: 0 }}>{r.line}</div>
            <div style={{ flex: 1, padding: '10px 14px', fontFamily: 'monospace', fontSize: 12, color: '#334155' }}>{r.code}</div>
            <div style={{ padding: '0 12px', flexShrink: 0 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: severityColor[r.severity], background: `${severityColor[r.severity]}18`, padding: '2px 7px', borderRadius: 4 }}>
                {severityLabel[r.severity]}
              </span>
            </div>
          </div>

          {active === r.line && (
            <div style={{ padding: '10px 14px 12px', background: '#f8fafc', borderTop: '1px solid #f1f5f9' }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 6 }}>
                리뷰 코멘트 {submitted.includes(r.line) && <span style={{ color: '#10b981', fontWeight: 400 }}>✓ 제출됨</span>}
              </div>
              <TextArea
                value={r.comment}
                onChange={(e) => r.setComment(e.target.value)}
                minimumLine={2}
                placeholder={`${r.line}번째 줄에 대한 코드 리뷰를 작성하세요...`}
              />
              <div style={{ display: 'flex', gap: 8, marginTop: 8, justifyContent: 'flex-end' }}>
                <button
                  onClick={() => setActive(null)}
                  style={{ padding: '5px 14px', borderRadius: 6, border: '1px solid #e2e8f0', background: '#fff', fontSize: 12, cursor: 'pointer', color: '#64748b' }}
                >
                  취소
                </button>
                <button
                  disabled={!r.comment.trim()}
                  onClick={() => { setSubmitted((prev) => [...prev, r.line]); setActive(null) }}
                  style={{ padding: '5px 14px', borderRadius: 6, border: 'none', background: r.comment.trim() ? severityColor[r.severity] : '#e2e8f0', color: r.comment.trim() ? '#fff' : '#94a3b8', fontSize: 12, fontWeight: 600, cursor: r.comment.trim() ? 'pointer' : 'not-allowed' }}
                >
                  코멘트 추가
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
      <div style={{ padding: '10px 16px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 11, color: '#94a3b8' }}>{submitted.length}개 코멘트 작성됨</span>
        <button
          disabled={submitted.length === 0}
          style={{ padding: '5px 16px', borderRadius: 6, border: 'none', background: submitted.length > 0 ? '#3b82f6' : '#e2e8f0', color: submitted.length > 0 ? '#fff' : '#94a3b8', fontSize: 12, fontWeight: 600, cursor: submitted.length > 0 ? 'pointer' : 'not-allowed' }}
        >
          리뷰 완료
        </button>
      </div>
    </div>
  )
}

export const Arco_코드_리뷰_인라인_코멘트: Story = {
  name: 'Arco - 코드 리뷰 인라인 코멘트 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Arco Design 코드 리뷰 UI 패턴. 코드 라인별 severity 뱃지(Critical/Warning/Suggestion), ' +
          '라인 클릭 시 인라인 TextArea 확장, 개별 코멘트 제출, 완료 카운터.',
      },
    },
  },
  render: () => <ArcoCodeReviewRender />,
}

function MantineCollaborativeNotesRender() {
  type Collaborator = { id: number; name: string; color: string; avatar: string }
  const collaborators: Collaborator[] = [
    { id: 1, name: '김지수', color: '#3b82f6', avatar: '김' },
    { id: 2, name: '이민준', color: '#8b5cf6', avatar: '이' },
    { id: 3, name: '박서연', color: '#10b981', avatar: '박' },
  ]
  const [notes, setNotes] = useState('# 스프린트 계획 회의\n\n## 목표\n- 로그인 플로우 개선\n- 대시보드 v2 설계\n\n## 논의 사항\n')
  const [typingId, setTypingId] = useState<number | null>(null)
  const [version, setVersion] = useState(1)

  const handleEdit = (val: string) => {
    setNotes(val)
    const randomCollaborator = collaborators[Math.floor(Math.random() * collaborators.length)]
    setTypingId(randomCollaborator.id)
    setVersion((v) => v + 1)
    setTimeout(() => setTypingId(null), 1200)
  }

  const lineCount = notes.split('\n').length
  const wordCount = notes.trim() ? notes.trim().split(/\s+/).length : 0

  return (
    <div style={{ width: 500, borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden', background: '#fff' }}>
      <div style={{ padding: '12px 16px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', flex: 1 }}>공유 노트</div>
        <div style={{ display: 'flex', gap: -4 }}>
          {collaborators.map((c) => (
            <div
              key={c.id}
              title={c.name}
              style={{
                width: 26, height: 26, borderRadius: '50%', background: c.color, color: '#fff', fontSize: 11, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '2px solid #fff', marginLeft: -6,
                opacity: typingId === c.id ? 1 : 0.6,
                transform: typingId === c.id ? 'scale(1.15)' : 'scale(1)',
                transition: 'opacity 0.2s, transform 0.2s',
              }}
            >
              {c.avatar}
            </div>
          ))}
        </div>
        <div style={{ fontSize: 10, color: '#94a3b8', background: '#fff', border: '1px solid #e2e8f0', borderRadius: 4, padding: '2px 7px' }}>
          v{version}
        </div>
      </div>

      <div style={{ padding: '12px 16px' }}>
        {typingId !== null && (
          <div style={{ fontSize: 11, color: collaborators.find((c) => c.id === typingId)?.color, marginBottom: 6, height: 16, transition: 'opacity 0.2s' }}>
            {collaborators.find((c) => c.id === typingId)?.name}님이 편집 중...
          </div>
        )}
        {typingId === null && <div style={{ height: 16, marginBottom: 6 }} />}
        <TextArea
          value={notes}
          onChange={(e) => handleEdit(e.target.value)}
          minimumLine={10}
          placeholder="팀 공유 노트를 작성하세요. Markdown을 지원합니다."
        />
      </div>

      <div style={{ padding: '8px 16px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', display: 'flex', gap: 16, fontSize: 11, color: '#94a3b8' }}>
        <span>{lineCount}줄</span>
        <span>{wordCount}단어</span>
        <span>{notes.length}자</span>
        <span style={{ marginLeft: 'auto' }}>마지막 편집: 방금 전</span>
      </div>
    </div>
  )
}

export const Mantine_협업_공유_노트_에디터: Story = {
  name: 'Mantine - 협업 공유 노트 에디터 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Mantine Collaborative editing UI 패턴. 3명 협업자 아바타 + 타이핑 인디케이터, ' +
          '편집 시 랜덤 협업자 활성화 효과(scale/opacity), 버전 카운터, 줄/단어/글자 수 통계.',
      },
    },
  },
  render: () => <MantineCollaborativeNotesRender />,
}

/* --------------------------------------------------------------------------
   shadcn/ui 벤치마크: 인라인 편집 모드 전환 패턴
   shadcn Textarea + 뷰/편집 토글 — Notion 스타일 클릭해서 편집하기
-------------------------------------------------------------------------- */
function ShadcnInlineEditRender() {
  const [editing, setEditing] = useState(false)
  const [text, setText] = useState('클릭하여 편집하세요. shadcn/ui는 뷰 모드와 편집 모드를 명확히 분리해 사용자가 실수로 편집하는 것을 방지합니다.')
  const [draft, setDraft] = useState(text)

  const save = () => {
    setText(draft)
    setEditing(false)
  }

  const cancel = () => {
    setDraft(text)
    setEditing(false)
  }

  return (
    <div style={{ width: 400, fontFamily: 'Inter, system-ui, sans-serif', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>설명</div>
      {editing ? (
        <>
          <TextArea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            minimumLine={4}
            autoFocus
          />
          <div style={{ display: 'flex', gap: 6 }}>
            <button
              onClick={save}
              style={{ padding: '6px 14px', fontSize: 12, fontWeight: 600, background: '#18181b', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}
            >
              저장
            </button>
            <button
              onClick={cancel}
              style={{ padding: '6px 14px', fontSize: 12, fontWeight: 500, background: 'transparent', color: '#64748b', border: '1px solid #e2e8f0', borderRadius: 6, cursor: 'pointer' }}
            >
              취소
            </button>
          </div>
        </>
      ) : (
        <div
          onClick={() => setEditing(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && setEditing(true)}
          style={{
            padding: '10px 12px',
            fontSize: 14,
            color: '#475569',
            lineHeight: 1.6,
            borderRadius: 8,
            border: '1px dashed #e2e8f0',
            cursor: 'text',
            minHeight: 80,
            transition: 'border-color 0.15s, background 0.15s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#94a3b8'
            e.currentTarget.style.background = '#f8fafc'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#e2e8f0'
            e.currentTarget.style.background = 'transparent'
          }}
        >
          {text}
        </div>
      )}
      <div style={{ fontSize: 11, color: '#94a3b8' }}>클릭하면 편집 모드로 전환 — shadcn/ui 인라인 편집 패턴</div>
    </div>
  )
}

export const Shadcn_인라인_편집_모드_전환: Story = {
  name: 'shadcn/ui - 인라인 편집 모드 전환 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'shadcn/ui Textarea 패턴. 뷰 모드(dashed border)와 편집 모드(Textarea)를 명확히 분리합니다. ' +
          '클릭 또는 Enter 키로 편집 활성화, 저장/취소로 완료합니다. Notion 인라인 편집 UX와 동일한 패턴입니다.',
      },
    },
  },
  render: () => <ShadcnInlineEditRender />,
}

/* --------------------------------------------------------------------------
   Radix UI 벤치마크: 마크다운 미리보기 분할 편집기 패턴
   Radix Tabs + Textarea — 편집/미리보기 탭 전환
-------------------------------------------------------------------------- */
function RadixMarkdownEditorRender() {
  const [tab, setTab] = useState<'write' | 'preview'>('write')
  const [md, setMd] = useState(`## 릴리즈 노트 v2.0\n\n**주요 변경사항:**\n- 신규 토큰 시스템 적용\n- 스토리 고도화 완료\n- TypeScript 5.7 업그레이드\n\n> 이 버전은 Breaking Change를 포함합니다.`)

  const renderMd = (raw: string) =>
    raw
      .replace(/^## (.+)$/gm, '<h2 style="font-size:15px;font-weight:700;color:#1e293b;margin:12px 0 6px">$1</h2>')
      .replace(/^> (.+)$/gm, '<blockquote style="border-left:3px solid #6366f1;padding:6px 10px;color:#64748b;margin:8px 0;font-size:12px">$1</blockquote>')
      .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#1e293b">$1</strong>')
      .replace(/^- (.+)$/gm, '<li style="font-size:13px;color:#475569;margin:3px 0;list-style:disc;margin-left:16px">$1</li>')
      .replace(/\n/g, '<br/>')

  return (
    <div style={{ width: 440, fontFamily: 'Inter, system-ui, sans-serif', border: '1px solid #e2e8f0', borderRadius: 10, overflow: 'hidden' }}>
      {/* 탭 헤더 */}
      <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', background: '#fafafa' }}>
        {(['write', 'preview'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: '8px 16px',
              fontSize: 12,
              fontWeight: tab === t ? 600 : 400,
              color: tab === t ? '#18181b' : '#94a3b8',
              background: 'none',
              border: 'none',
              borderBottom: tab === t ? '2px solid #18181b' : '2px solid transparent',
              cursor: 'pointer',
            }}
          >
            {t === 'write' ? '작성' : '미리보기'}
          </button>
        ))}
        <div style={{ marginLeft: 'auto', padding: '6px 12px', fontSize: 11, color: '#94a3b8', display: 'flex', alignItems: 'center' }}>
          {md.length}자
        </div>
      </div>
      {/* 콘텐츠 */}
      <div style={{ padding: 12 }}>
        {tab === 'write' ? (
          <TextArea
            value={md}
            onChange={(e) => setMd(e.target.value)}
            minimumLine={8}
            placeholder="Markdown으로 작성하세요..."
          />
        ) : (
          <div
            style={{ minHeight: 160, fontSize: 13, color: '#475569', lineHeight: 1.7, padding: '4px 2px' }}
            dangerouslySetInnerHTML={{ __html: renderMd(md) }}
          />
        )}
      </div>
      <div style={{ padding: '6px 12px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', fontSize: 11, color: '#94a3b8' }}>
        Radix Tabs 패턴 — 작성/미리보기 분할 에디터
      </div>
    </div>
  )
}

export const Radix_마크다운_미리보기_분할_에디터: Story = {
  name: 'Radix UI - 마크다운 미리보기 분할 에디터',
  parameters: {
    docs: {
      description: {
        story:
          'Radix UI Tabs + Textarea 조합 패턴. 작성 탭과 미리보기 탭을 전환하면서 실시간으로 마크다운 렌더링을 확인합니다. ' +
          'Radix의 비제어 탭 패턴(각 탭이 독립적으로 콘텐츠를 마운트)을 간소화해 구현합니다.',
      },
    },
  },
  render: () => <RadixMarkdownEditorRender />,
}

/* --------------------------------------------------------------------------
   shadcn + Radix 복합: 폼 초안 자동저장 + 글자 수 제한 패턴
   shadcn Textarea + Radix ScrollArea — 실시간 저장 상태 표시
-------------------------------------------------------------------------- */
function ShadcnRadixAutoSaveRender() {
  const MAX = 280
  const [text, setText] = useState('')
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved'>('idle')
  const timerRef = { current: null as ReturnType<typeof setTimeout> | null }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const val = e.target.value.slice(0, MAX)
    setText(val)
    setSaveState('saving')
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setSaveState('saved'), 1200)
  }

  const remaining = MAX - text.length
  const pct = (text.length / MAX) * 100
  const ringColor = remaining <= 20 ? '#ef4444' : remaining <= 60 ? '#f59e0b' : '#22c55e'

  return (
    <div style={{ width: 400, fontFamily: 'Inter, system-ui, sans-serif', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>게시물 작성</span>
        <span style={{
          fontSize: 11,
          color: saveState === 'saving' ? '#f59e0b' : saveState === 'saved' ? '#22c55e' : '#94a3b8',
          transition: 'color 0.3s',
        }}>
          {saveState === 'saving' ? '저장 중...' : saveState === 'saved' ? '자동 저장됨' : ''}
        </span>
      </div>
      <TextArea
        value={text}
        onChange={handleChange}
        minimumLine={5}
        placeholder="무슨 생각을 하고 계신가요? (최대 280자)"
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* 원형 게이지 */}
        <div style={{ position: 'relative', width: 24, height: 24 }}>
          <svg width={24} height={24} viewBox="0 0 24 24" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx={12} cy={12} r={9} fill="none" stroke="#f1f5f9" strokeWidth={3} />
            <circle
              cx={12} cy={12} r={9}
              fill="none"
              stroke={ringColor}
              strokeWidth={3}
              strokeDasharray={`${2 * Math.PI * 9}`}
              strokeDashoffset={`${2 * Math.PI * 9 * (1 - pct / 100)}`}
              style={{ transition: 'stroke-dashoffset 0.2s, stroke 0.3s' }}
            />
          </svg>
          {remaining <= 20 && (
            <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7, fontWeight: 700, color: ringColor }}>
              {remaining}
            </span>
          )}
        </div>
        <button
          disabled={!text.trim()}
          style={{
            padding: '7px 20px',
            fontSize: 13,
            fontWeight: 600,
            background: text.trim() ? '#18181b' : '#f1f5f9',
            color: text.trim() ? '#fff' : '#94a3b8',
            border: 'none',
            borderRadius: 999,
            cursor: text.trim() ? 'pointer' : 'not-allowed',
            transition: 'background 0.2s, color 0.2s',
          }}
        >
          게시
        </button>
      </div>
      <div style={{ fontSize: 11, color: '#94a3b8' }}>shadcn/ui + Radix — 280자 제한 + 원형 게이지 + 자동저장</div>
    </div>
  )
}

export const Shadcn_Radix_자동저장_글자수_제한_에디터: Story = {
  name: 'shadcn/ui + Radix UI - 자동저장 + 글자 수 제한 에디터',
  parameters: {
    docs: {
      description: {
        story:
          'shadcn/ui + Radix UI 복합 패턴. Twitter/X 스타일의 280자 제한 에디터. ' +
          '원형 SVG 게이지로 남은 글자 수 시각화, 1.2초 디바운스 자동저장 상태 표시, 입력 없으면 게시 버튼 비활성화.',
      },
    },
  },
  render: () => <ShadcnRadixAutoSaveRender />,
}

/* --------------------------------------------------------------------------
   Cycle 159 — Vercel Design + Ant Design
   Vercel: 환경 변수 bulk 편집 + 실시간 파싱 패턴
-------------------------------------------------------------------------- */
function VercelEnvBulkEditorRender() {
  const defaultVal = `NEXT_PUBLIC_API_URL=https://api.example.com\nNEXT_PUBLIC_WS_URL=wss://ws.example.com\nDATABASE_URL=postgresql://localhost:5432/db\nSECRET_KEY=\nNODE_ENV=production`
  const [value, setValue] = useState(defaultVal)
  const [saved, setSaved] = useState(false)

  const lines = value.split('\n').filter(Boolean)
  const parsed = lines.map(l => {
    const [k, ...v] = l.split('=')
    return { key: k?.trim(), value: v.join('=').trim(), valid: !!k?.trim() }
  })
  const validCount = parsed.filter(p => p.valid && p.value).length
  const missingCount = parsed.filter(p => p.valid && !p.value).length

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div style={{ width: 420, fontFamily: 'system-ui, sans-serif', background: '#0f172a', borderRadius: 14, overflow: 'hidden', border: '1px solid #1e293b' }}>
      <div style={{ padding: '12px 16px', borderBottom: '1px solid #1e293b', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#f1f5f9' }}>환경 변수 bulk 편집</span>
        <span style={{ marginLeft: 'auto', fontSize: 10, color: '#64748b' }}>KEY=VALUE 형식</span>
      </div>
      <div style={{ padding: '12px 16px' }}>
        <TextArea
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder={'KEY=VALUE\nAPI_URL=https://...'}
          rows={8}
        />
        <div style={{ marginTop: 10, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 4, background: '#14532d', color: '#4ade80' }}>{validCount}개 설정됨</span>
          {missingCount > 0 && <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 4, background: '#7c2d12', color: '#fca5a5' }}>{missingCount}개 값 없음</span>}
          <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 4, background: '#1e293b', color: '#64748b' }}>{parsed.length}개 변수</span>
        </div>
      </div>
      <div style={{ padding: '10px 16px', borderTop: '1px solid #1e293b', display: 'flex', gap: 8 }}>
        <button onClick={() => setValue('')} style={{ flex: 1, padding: '8px', fontSize: 11, borderRadius: 8, border: '1px solid #334155', background: '#1e293b', color: '#64748b', cursor: 'pointer' }}>초기화</button>
        <button onClick={handleSave} style={{ flex: 2, padding: '8px', fontSize: 12, borderRadius: 8, border: 'none', background: saved ? '#14532d' : '#fff', color: saved ? '#4ade80' : '#0f172a', cursor: 'pointer', fontWeight: 700, transition: 'all 0.2s' }}>{saved ? '저장 완료' : '저장'}</button>
      </div>
    </div>
  )
}

export const Vercel_환경변수_벌크_편집기: Story = {
  name: 'Vercel Design — 환경 변수 Bulk 편집 + 실시간 파싱 패턴',
  parameters: {
    docs: {
      description: {
        story: 'Vercel의 Environment Variables 편집기 패턴. TextArea에 KEY=VALUE 형식으로 입력하면 실시간으로 파싱해 설정/누락 상태를 표시합니다.',
      },
    },
  },
  render: () => <VercelEnvBulkEditorRender />,
}

/* --------------------------------------------------------------------------
   Ant Design: 티켓/이슈 설명 작성 폼 패턴
-------------------------------------------------------------------------- */
const ANT_CATEGORIES = ['버그', '기능 요청', '개선', '질문', '기타']

function AntIssueFormRender() {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('버그')
  const [desc, setDesc] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const maxLen = 500
  const remaining = maxLen - desc.length
  const isValid = title.trim().length >= 5 && desc.trim().length >= 10

  const handleSubmit = () => {
    if (isValid) { setSubmitted(true); setTimeout(() => setSubmitted(false), 2500) }
  }

  return (
    <div style={{ width: 400, fontFamily: 'system-ui, sans-serif' }}>
      <p style={{ fontSize: 14, fontWeight: 700, color: '#1e293b', marginBottom: 16 }}>이슈 등록</p>
      <div style={{ marginBottom: 12 }}>
        <label style={{ fontSize: 11, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 4 }}>제목 <span style={{ color: '#ef4444' }}>*</span></label>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="이슈 제목을 입력하세요 (5자 이상)"
          style={{ width: '100%', padding: '8px 12px', fontSize: 13, borderRadius: 8, border: `1.5px solid ${title.length > 0 && title.trim().length < 5 ? '#ef4444' : '#e2e8f0'}`, outline: 'none', boxSizing: 'border-box' }}
        />
        {title.length > 0 && title.trim().length < 5 && <p style={{ fontSize: 11, color: '#ef4444', marginTop: 3 }}>최소 5자 이상 입력해주세요</p>}
      </div>
      <div style={{ marginBottom: 12 }}>
        <label style={{ fontSize: 11, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 4 }}>카테고리</label>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {ANT_CATEGORIES.map(c => (
            <button key={c} onClick={() => setCategory(c)} style={{ padding: '5px 10px', fontSize: 11, borderRadius: 6, border: `1.5px solid ${category === c ? '#6366f1' : '#e2e8f0'}`, background: category === c ? '#f0eeff' : '#fff', color: category === c ? '#6366f1' : '#64748b', cursor: 'pointer', fontWeight: category === c ? 700 : 400 }}>{c}</button>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
          <label style={{ fontSize: 11, fontWeight: 600, color: '#475569' }}>설명 <span style={{ color: '#ef4444' }}>*</span></label>
          <span style={{ fontSize: 10, color: remaining < 50 ? '#ef4444' : '#94a3b8' }}>{desc.length}/{maxLen}</span>
        </div>
        <TextArea
          value={desc}
          onChange={e => setDesc(e.target.value.slice(0, maxLen))}
          placeholder="이슈 내용을 자세히 설명해주세요 (10자 이상)&#10;재현 방법, 예상 동작, 실제 동작 등을 포함하면 빠른 처리에 도움이 됩니다."
          error={desc.length > 0 && desc.trim().length < 10}
          rows={5}
        />
        {desc.length > 0 && desc.trim().length < 10 && <p style={{ fontSize: 11, color: '#ef4444', marginTop: 3 }}>최소 10자 이상 입력해주세요</p>}
      </div>
      <button
        disabled={!isValid}
        onClick={handleSubmit}
        style={{ width: '100%', padding: '10px', fontSize: 13, fontWeight: 700, borderRadius: 8, border: 'none', background: submitted ? '#22c55e' : isValid ? '#6366f1' : '#e2e8f0', color: isValid ? '#fff' : '#94a3b8', cursor: isValid ? 'pointer' : 'not-allowed', transition: 'all 0.2s' }}
      >
        {submitted ? '이슈 등록 완료!' : '이슈 등록'}
      </button>
    </div>
  )
}

export const Ant_이슈_등록_폼: Story = {
  name: 'Ant Design — 이슈 등록 폼 (제목 + 카테고리 + TextArea 유효성)',
  parameters: {
    docs: {
      description: {
        story: 'Ant Design의 Form Validation 패턴. 제목+카테고리+TextArea 조합으로 이슈 등록 폼을 구현하며 실시간 유효성 검사를 제공합니다.',
      },
    },
  },
  render: () => <AntIssueFormRender />,
}

/* --------------------------------------------------------------------------
   Vercel + Ant: 배포 노트 + 릴리즈 설명 복합 편집 패턴
-------------------------------------------------------------------------- */
const RELEASE_TEMPLATES = [
  { label: '버그 수정', body: '## 버그 수정\n\n- [ ] 재현 경로\n- [ ] 수정 내용\n- [ ] 테스트 결과' },
  { label: '기능 추가', body: '## 새 기능\n\n### 변경 사항\n\n### 사용 방법\n\n```tsx\n// 코드 예시\n```' },
  { label: '중단 변경', body: '## Breaking Changes\n\n### 영향 범위\n\n### 마이그레이션 가이드\n\n### 이전 동작 / 이후 동작' },
]

function VercelAntReleaseNoteRender() {
  const [note, setNote] = useState('')
  const [version, setVersion] = useState('2.1.0')
  const [charCount, setCharCount] = useState(0)
  const [preview, setPreview] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNote(e.target.value)
    setCharCount(e.target.value.length)
  }

  return (
    <div style={{ width: 440, fontFamily: 'system-ui, sans-serif', border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden' }}>
      <div style={{ padding: '12px 16px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>릴리즈 노트</span>
        <input
          value={version}
          onChange={e => setVersion(e.target.value)}
          style={{ width: 70, fontSize: 12, padding: '3px 8px', borderRadius: 6, border: '1px solid #e2e8f0', background: '#fff', fontFamily: 'monospace', fontWeight: 600, color: '#6366f1', textAlign: 'center' }}
        />
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
          <button
            onClick={() => setPreview(!preview)}
            style={{ padding: '4px 10px', fontSize: 11, borderRadius: 6, border: `1px solid ${preview ? '#6366f1' : '#e2e8f0'}`, background: preview ? '#f0eeff' : '#fff', color: preview ? '#6366f1' : '#64748b', cursor: 'pointer', fontWeight: preview ? 700 : 400 }}
          >
            {preview ? '편집' : '미리보기'}
          </button>
        </div>
      </div>
      <div style={{ padding: '10px 14px 6px', background: '#fff', borderBottom: '1px solid #f1f5f9', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {RELEASE_TEMPLATES.map(t => (
          <button
            key={t.label}
            onClick={() => setNote(t.body)}
            style={{ padding: '3px 8px', fontSize: 10, borderRadius: 5, border: '1px solid #e2e8f0', background: '#f8fafc', color: '#64748b', cursor: 'pointer', fontWeight: 500 }}
          >
            {t.label} 템플릿
          </button>
        ))}
      </div>
      <div style={{ padding: '12px 16px' }}>
        {preview ? (
          <div style={{ minHeight: 150, fontSize: 12, color: '#1e293b', lineHeight: 1.8, whiteSpace: 'pre-wrap', background: '#f8fafc', borderRadius: 8, padding: '10px 12px', border: '1px solid #f1f5f9' }}>
            {note || <span style={{ color: '#94a3b8' }}>미리보기할 내용이 없습니다</span>}
          </div>
        ) : (
          <TextArea
            value={note}
            onChange={handleChange}
            placeholder={'릴리즈 노트를 작성하세요.\n상단 템플릿 버튼으로 빠르게 시작할 수 있습니다.'}
            rows={7}
          />
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
          <span style={{ fontSize: 10, color: '#94a3b8' }}>Markdown 지원</span>
          <span style={{ fontSize: 10, color: charCount > 2000 ? '#ef4444' : '#94a3b8' }}>{charCount}자</span>
        </div>
      </div>
      <div style={{ padding: '10px 16px', borderTop: '1px solid #e2e8f0', display: 'flex', gap: 8 }}>
        <button onClick={() => setNote('')} style={{ padding: '7px 14px', fontSize: 11, borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', color: '#64748b', cursor: 'pointer' }}>초기화</button>
        <button
          disabled={!note.trim()}
          style={{ flex: 1, padding: '7px', fontSize: 12, borderRadius: 8, border: 'none', background: note.trim() ? '#1e293b' : '#e2e8f0', color: note.trim() ? '#fff' : '#94a3b8', cursor: note.trim() ? 'pointer' : 'not-allowed', fontWeight: 600 }}
        >
          v{version} 배포 노트 게시
        </button>
      </div>
    </div>
  )
}

export const Vercel_Ant_릴리즈_노트_에디터: Story = {
  name: 'Vercel + Ant Design — 릴리즈 노트 + 배포 설명 편집 패턴',
  parameters: {
    docs: {
      description: {
        story: 'Vercel Design + Ant Design 복합 패턴. 버전 입력 + 템플릿 선택 + TextArea 편집/미리보기 전환으로 릴리즈 노트를 작성합니다.',
      },
    },
  },
  render: () => <VercelAntReleaseNoteRender />,
}
