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
