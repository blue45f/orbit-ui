import { ChevronRightLineIcon, SearchIcon } from '@heejun-com/icons'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { useState } from 'react'

import { Dropdown } from './Dropdown'

const meta = {
  title: 'eclipse/Inputs/Pickers/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    value: '',
    placeholder: '선택하세요',
    activated: false,
    disabled: false,
    onClick: fn(),
  },
  argTypes: {
    value: {
      control: 'text',
      description: '선택된 값 (있으면 selected 상태)',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder 텍스트',
    },
  },
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

export const 기본: Story = {
  parameters: {
    controls: {
      exclude: ['theme', 'className', 'style'],
    },
  },
  render: (args) => <Dropdown {...args} />,
}

const WithLeadingExample = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Dropdown value="Option 1" activated={isOpen} onClick={() => setIsOpen(!isOpen)}>
      <Dropdown.Leading>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </Dropdown.Leading>
    </Dropdown>
  )
}

export const 기본_Leading: Story = {
  render: () => <WithLeadingExample />,
}

const WithCustomTrailingExample = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Dropdown value="Option 1" activated={isOpen} onClick={() => setIsOpen(!isOpen)}>
      <Dropdown.Trailing>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 5L15 12L9 19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Dropdown.Trailing>
    </Dropdown>
  )
}

export const 커스텀_Trailing: Story = {
  render: () => <WithCustomTrailingExample />,
}

const LongTextExample = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div style={{ width: '200px' }}>
      <Dropdown
        value="This is a very long text that should be truncated when it exceeds the available space"
        activated={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Dropdown.Leading>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
          </svg>
        </Dropdown.Leading>
      </Dropdown>
    </div>
  )
}

export const 긴텍스트: Story = {
  render: () => <LongTextExample />,
}

const FocusedExample = ({ value, placeholder }: { value?: string; placeholder?: string }) => {
  const [isFocused, setIsFocused] = useState(false)
  return (
    <div>
      <Dropdown
        value={value}
        placeholder={placeholder}
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
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
        width: '900px',
      }}
    >
      <div>
        <h4 style={{ marginBottom: '8px' }}>Unselected (value 없음)</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Dropdown placeholder="Enabled" />
          <FocusedExample placeholder="Focused" />
          <Dropdown placeholder="Activated" activated />
          <Dropdown placeholder="Disabled" disabled />
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: '8px' }}>Dropdowned (value 있음)</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Dropdown value="Enabled" />
          <FocusedExample value="Focused" />
          <Dropdown value="Activated" activated />
          <Dropdown value="Disabled" disabled />
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: '8px' }}>Error</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Dropdown placeholder="Error (Unselected)" error />
          <Dropdown value="Error (Dropdowned)" error />
          <Dropdown placeholder="Error (Activated)" error activated />
          <Dropdown placeholder="Error (Disabled)" error disabled />
        </div>
      </div>
    </div>
  ),
}

export const 디자인QA = {
  args: {
    value: 'Option 1',
    placeholder: '선택하세요',
    activated: false,
    disabled: false,
    leading: true,
    trailing: true,
  },
  parameters: {
    controls: {
      exclude: ['theme', 'className', 'style'],
    },
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  render: ({ leading, trailing, ...args }: any) => {
    return (
      <Dropdown {...args}>
        {leading && (
          <Dropdown.Leading>
            <SearchIcon size={24} />
          </Dropdown.Leading>
        )}
        {trailing && (
          <Dropdown.Trailing>
            <ChevronRightLineIcon size={24} />
          </Dropdown.Trailing>
        )}
      </Dropdown>
    )
  },
}

// MUI Select 패턴: 폼 내 드롭다운 조합
const MUISelectFormDemo = () => {
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [role, setRole] = useState('')
  const [countryOpen, setCountryOpen] = useState(false)
  const [cityOpen, setCityOpen] = useState(false)
  const [roleOpen, setRoleOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const countries = ['대한민국', '미국', '일본', '영국', '캐나다', '호주']
  const citiesByCountry: Record<string, string[]> = {
    '대한민국': ['서울', '부산', '대구', '인천', '광주'],
    '미국': ['뉴욕', '로스앤젤레스', '시카고', '휴스턴'],
    '일본': ['도쿄', '오사카', '교토', '삿포로'],
    '영국': ['런던', '맨체스터', '버밍엄'],
    '캐나다': ['토론토', '밴쿠버', '몬트리올'],
    '호주': ['시드니', '멜버른', '브리즈번'],
  }
  const roles = ['프론트엔드 개발자', '백엔드 개발자', '풀스택 개발자', 'UI/UX 디자이너', '프로덕트 매니저', '데이터 사이언티스트']

  const cities = country ? (citiesByCountry[country] ?? []) : []
  const isFormValid = country && city && role

  const handleCountrySelect = (c: string) => {
    setCountry(c)
    setCity('')
    setCountryOpen(false)
  }

  const SimpleMenu = ({
    isOpen,
    items,
    onSelect,
  }: {
    isOpen: boolean
    items: string[]
    onSelect: (item: string) => void
    onClose?: () => void
  }) => {
    if (!isOpen) return null
    return (
      <div style={{
        position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 100,
        marginTop: '4px', borderRadius: '12px',
        background: '#fff', border: '1px solid #e2e8f0',
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        overflow: 'hidden',
      }}>
        {items.map((item) => (
          <button
            key={item}
            onClick={() => onSelect(item)}
            style={{
              display: 'block', width: '100%', padding: '11px 16px',
              textAlign: 'left', border: 'none', background: 'transparent',
              fontSize: '14px', color: '#374151', cursor: 'pointer',
              borderBottom: '1px solid #f8fafc',
              transition: 'background 0.1s',
            }}
            onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.background = '#f8fafc' }}
            onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.background = 'transparent' }}
          >
            {item}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div style={{
      width: '460px', padding: '36px', background: '#fff',
      borderRadius: '20px', boxShadow: '0 8px 40px rgba(0,0,0,0.1)',
    }}>
      <div style={{ marginBottom: '28px' }}>
        <div style={{ fontSize: '11px', fontWeight: '700', color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
          MUI Select Pattern
        </div>
        <h2 style={{ margin: '0 0 6px', fontSize: '22px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.02em' }}>
          프로필 설정
        </h2>
        <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
          국가 선택 시 도시 목록이 자동으로 업데이트됩니다
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* 국가 선택 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', display: 'flex', gap: '4px' }}>
            국가 <span style={{ color: '#ef4444', fontSize: '12px' }}>*</span>
          </label>
          <div style={{ position: 'relative' }}>
            <Dropdown
              value={country}
              placeholder="국가를 선택하세요"
              activated={countryOpen}
              onClick={() => setCountryOpen(!countryOpen)}
            />
            <SimpleMenu
              isOpen={countryOpen}
              items={countries}
              onSelect={handleCountrySelect}
            />
          </div>
        </div>

        {/* 도시 선택 (국가 선택 후 활성화) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: '600', color: country ? '#374151' : '#94a3b8', display: 'flex', gap: '4px' }}>
            도시 <span style={{ color: '#ef4444', fontSize: '12px' }}>*</span>
          </label>
          <div style={{ position: 'relative' }}>
            <Dropdown
              value={city}
              placeholder={country ? '도시를 선택하세요' : '국가를 먼저 선택하세요'}
              activated={cityOpen}
              disabled={!country}
              onClick={() => country && setCityOpen(!cityOpen)}
            />
            <SimpleMenu
              isOpen={cityOpen}
              items={cities}
              onSelect={(c) => { setCity(c); setCityOpen(false) }}
            />
          </div>
          {country && (
            <span style={{ fontSize: '12px', color: '#94a3b8' }}>
              {country}의 {cities.length}개 도시 중 선택
            </span>
          )}
        </div>

        {/* 직무 선택 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', display: 'flex', gap: '4px' }}>
            직무 <span style={{ color: '#ef4444', fontSize: '12px' }}>*</span>
          </label>
          <div style={{ position: 'relative' }}>
            <Dropdown
              value={role}
              placeholder="직무를 선택하세요"
              activated={roleOpen}
              onClick={() => setRoleOpen(!roleOpen)}
            />
            <SimpleMenu
              isOpen={roleOpen}
              items={roles}
              onSelect={(r) => { setRole(r); setRoleOpen(false) }}
            />
          </div>
        </div>
      </div>

      {submitted && isFormValid && (
        <div style={{
          marginTop: '16px', padding: '12px 16px', borderRadius: '10px',
          background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)',
          fontSize: '13px', color: '#10b981',
        }}>
          프로필이 저장되었습니다: {country} / {city} / {role}
        </div>
      )}

      <button
        onClick={() => { if (isFormValid) setSubmitted(true) }}
        style={{
          marginTop: '24px', width: '100%', padding: '14px', borderRadius: '12px',
          border: 'none', cursor: isFormValid ? 'pointer' : 'not-allowed',
          background: isFormValid ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : '#e2e8f0',
          color: isFormValid ? '#fff' : '#94a3b8',
          fontSize: '14px', fontWeight: '700', transition: 'all 0.2s',
        }}
      >
        저장하기
      </button>
    </div>
  )
}

export const MUI_Select_폼패턴: Story = {
  name: 'MUI Select 패턴 (종속 드롭다운 폼)',
  render: () => <MUISelectFormDemo />,
}

// Chakra Menu 패턴: 다중 필터 드롭다운
const ChakraFilterMenuDemo = () => {
  const [statusOpen, setStatusOpen] = useState(false)
  const [priorityOpen, setPriorityOpen] = useState(false)
  const [assigneeOpen, setAssigneeOpen] = useState(false)
  const [status, setStatus] = useState('')
  const [priority, setPriority] = useState('')
  const [assignee, setAssignee] = useState('')

  const statusOptions = ['전체', '진행 중', '완료', '보류', '취소']
  const priorityOptions = ['전체', '긴급', '높음', '보통', '낮음']
  const assigneeOptions = ['전체', '김지혜', '박민준', '이수아', '최동훈']

  const tasks = [
    { id: 1, title: 'API 엔드포인트 설계', status: '진행 중', priority: '높음', assignee: '김지혜' },
    { id: 2, title: '로그인 화면 구현', status: '완료', priority: '긴급', assignee: '박민준' },
    { id: 3, title: '다크모드 지원', status: '보류', priority: '보통', assignee: '이수아' },
    { id: 4, title: '성능 최적화', status: '진행 중', priority: '보통', assignee: '최동훈' },
    { id: 5, title: '접근성 개선', status: '진행 중', priority: '낮음', assignee: '김지혜' },
    { id: 6, title: '단위 테스트 작성', status: '취소', priority: '낮음', assignee: '박민준' },
  ]

  const filtered = tasks.filter((t) => {
    const matchStatus = !status || status === '전체' || t.status === status
    const matchPriority = !priority || priority === '전체' || t.priority === priority
    const matchAssignee = !assignee || assignee === '전체' || t.assignee === assignee
    return matchStatus && matchPriority && matchAssignee
  })

  const priorityColor: Record<string, string> = {
    '긴급': '#ef4444', '높음': '#f59e0b', '보통': '#6366f1', '낮음': '#94a3b8',
  }

  const statusColor: Record<string, string> = {
    '진행 중': '#6366f1', '완료': '#10b981', '보류': '#f59e0b', '취소': '#94a3b8',
  }

  const SimpleMenuDropdown = ({
    isOpen,
    items,
    onSelect,
  }: {
    isOpen: boolean
    items: string[]
    onSelect: (item: string) => void
  }) => {
    if (!isOpen) return null
    return (
      <div style={{
        position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 100,
        marginTop: '4px', borderRadius: '10px',
        background: '#fff', border: '1px solid #e2e8f0',
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        overflow: 'hidden',
      }}>
        {items.map((item) => (
          <button
            key={item}
            onClick={() => onSelect(item)}
            style={{
              display: 'block', width: '100%', padding: '9px 14px',
              textAlign: 'left', border: 'none', background: 'transparent',
              fontSize: '13px', color: '#374151', cursor: 'pointer',
              borderBottom: '1px solid #f8fafc',
            }}
          >
            {item}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div style={{ width: '600px' }}>
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontSize: '11px', fontWeight: '700', color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
          Chakra Menu Pattern
        </div>
        <h3 style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>
          태스크 목록
        </h3>
      </div>

      {/* 필터 드롭다운 그룹 */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Dropdown
            value={status && status !== '전체' ? status : ''}
            placeholder="상태"
            activated={statusOpen}
            onClick={() => { setStatusOpen(!statusOpen); setPriorityOpen(false); setAssigneeOpen(false) }}
          />
          <SimpleMenuDropdown
            isOpen={statusOpen}
            items={statusOptions}
            onSelect={(v) => { setStatus(v); setStatusOpen(false) }}
          />
        </div>
        <div style={{ position: 'relative', flex: 1 }}>
          <Dropdown
            value={priority && priority !== '전체' ? priority : ''}
            placeholder="우선순위"
            activated={priorityOpen}
            onClick={() => { setPriorityOpen(!priorityOpen); setStatusOpen(false); setAssigneeOpen(false) }}
          />
          <SimpleMenuDropdown
            isOpen={priorityOpen}
            items={priorityOptions}
            onSelect={(v) => { setPriority(v); setPriorityOpen(false) }}
          />
        </div>
        <div style={{ position: 'relative', flex: 1 }}>
          <Dropdown
            value={assignee && assignee !== '전체' ? assignee : ''}
            placeholder="담당자"
            activated={assigneeOpen}
            onClick={() => { setAssigneeOpen(!assigneeOpen); setStatusOpen(false); setPriorityOpen(false) }}
          />
          <SimpleMenuDropdown
            isOpen={assigneeOpen}
            items={assigneeOptions}
            onSelect={(v) => { setAssignee(v); setAssigneeOpen(false) }}
          />
        </div>
      </div>

      {/* 결과 카운트 */}
      <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '10px' }}>
        {filtered.length}개의 태스크
      </div>

      {/* 태스크 목록 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {filtered.map((task) => (
          <div key={task.id} style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '14px 16px', borderRadius: '10px',
            background: '#fff', border: '1px solid #f1f5f9',
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          }}>
            <div style={{ flex: 1, fontSize: '14px', fontWeight: '500', color: '#0f172a' }}>
              {task.title}
            </div>
            <span style={{
              padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '600',
              background: `${statusColor[task.status] ?? '#94a3b8'}18`,
              color: statusColor[task.status] ?? '#94a3b8',
            }}>
              {task.status}
            </span>
            <span style={{
              padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '600',
              background: `${priorityColor[task.priority] ?? '#94a3b8'}18`,
              color: priorityColor[task.priority] ?? '#94a3b8',
            }}>
              {task.priority}
            </span>
            <span style={{ fontSize: '12px', color: '#64748b', minWidth: '48px', textAlign: 'right' }}>
              {task.assignee.slice(0, 3)}
            </span>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{
            padding: '32px', textAlign: 'center',
            fontSize: '14px', color: '#94a3b8',
            background: '#f8fafc', borderRadius: '12px',
          }}>
            해당 조건의 태스크가 없습니다
          </div>
        )}
      </div>
    </div>
  )
}

export const Chakra_Menu_필터패턴: Story = {
  name: 'Chakra Menu 패턴 (다중 필터 드롭다운)',
  render: () => <ChakraFilterMenuDemo />,
}

/* --------------------------------------------------------------------------
   Figma 벤치마크: 레이어 속성 드롭다운 패턴
   Figma 속성 패널 — 레이어 블렌드 모드 + 폰트 선택 드롭다운 UI
-------------------------------------------------------------------------- */
const BLEND_MODES = ['Normal', 'Multiply', 'Screen', 'Overlay', 'Darken', 'Lighten', 'Color Dodge', 'Color Burn']
const FONT_FAMILIES = ['Inter', 'Pretendard', 'Noto Sans KR', 'Roboto', 'SF Pro', 'Helvetica']

export const Figma_레이어_속성_드롭다운: Story = {
  name: 'Figma - 레이어 속성 드롭다운 패턴',
  render: function Render() {
    const [blend, setBlend] = useState('Normal')
    const [font, setFont] = useState('Inter')

    return (
      <div
        style={{
          width: 240,
          borderRadius: 8,
          border: '1px solid #e2e8f0',
          background: '#fff',
          overflow: 'hidden',
        }}
      >
        {/* 헤더 */}
        <div style={{ padding: '6px 12px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', fontSize: 11, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Layer Properties
        </div>
        {/* Blend mode */}
        <div style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9' }}>
          <span style={{ fontSize: 12, color: '#64748b' }}>Blend</span>
          <Dropdown
            value={blend}
            placeholder="Blend mode"
            activated={false}
            onClick={() => {}}
            style={{ width: 120 }}
          />
        </div>
        {/* 값 표시 목록 */}
        <div style={{ padding: '6px 0' }}>
          {BLEND_MODES.slice(0, 5).map((mode) => (
            <div
              key={mode}
              onClick={() => setBlend(mode)}
              style={{
                padding: '6px 12px',
                fontSize: 12,
                cursor: 'pointer',
                background: blend === mode ? '#6366f108' : 'transparent',
                color: blend === mode ? '#6366f1' : '#1e293b',
                fontWeight: blend === mode ? 600 : 400,
              }}
            >
              {mode}
            </div>
          ))}
        </div>
        {/* Font family */}
        <div style={{ padding: '8px 12px', borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 12, color: '#64748b' }}>Font</span>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#1e293b', display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}
            onClick={() => {
              const idx = FONT_FAMILIES.indexOf(font)
              setFont(FONT_FAMILIES[(idx + 1) % FONT_FAMILIES.length])
            }}
          >
            {font}
            <ChevronRightLineIcon width={12} height={12} style={{ color: '#94a3b8', transform: 'rotate(90deg)' }} />
          </div>
        </div>
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   Material 3 벤치마크: 노출된 드롭다운 메뉴 패턴
   Material 3 ExposedDropdownMenu — outlined + filled 스타일 선택 UI
-------------------------------------------------------------------------- */
const COUNTRIES = ['대한민국', '미국', '일본', '영국', '프랑스', '독일', '캐나다', '호주']
const LANGUAGES = ['한국어', 'English', '日本語', '中文', 'Español', 'Français']

export const Material3_노출_드롭다운: Story = {
  name: 'Material 3 - 노출된 드롭다운 메뉴 패턴',
  render: function Render() {
    const [country, setCountry] = useState('')
    const [language, setLanguage] = useState('')

    return (
      <div style={{ maxWidth: 380, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>M3 ExposedDropdownMenu 패턴</div>

        {/* Outlined style */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#475569' }}>국가 (Outlined)</label>
          <Dropdown
            value={country}
            placeholder="국가를 선택하세요"
            activated={false}
            onClick={() => setCountry(COUNTRIES[0])}
          />
          {/* 선택 목록 미리보기 */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {COUNTRIES.slice(0, 4).map((c) => (
              <div
                key={c}
                onClick={() => setCountry(c)}
                style={{
                  padding: '4px 10px',
                  borderRadius: 20,
                  fontSize: 11,
                  cursor: 'pointer',
                  border: `1px solid ${country === c ? '#6366f1' : '#e2e8f0'}`,
                  color: country === c ? '#6366f1' : '#64748b',
                  background: country === c ? '#6366f108' : 'transparent',
                  fontWeight: country === c ? 600 : 400,
                }}
              >
                {c}
              </div>
            ))}
          </div>
        </div>

        {/* Filled style */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#475569' }}>언어 (Filled)</label>
          <Dropdown
            value={language}
            placeholder="언어를 선택하세요"
            activated={false}
            onClick={() => setLanguage(LANGUAGES[0])}
          />
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {LANGUAGES.map((l) => (
              <div
                key={l}
                onClick={() => setLanguage(l)}
                style={{
                  padding: '4px 10px',
                  borderRadius: 20,
                  fontSize: 11,
                  cursor: 'pointer',
                  border: `1px solid ${language === l ? '#10b981' : '#e2e8f0'}`,
                  color: language === l ? '#10b981' : '#64748b',
                  background: language === l ? '#10b98108' : 'transparent',
                  fontWeight: language === l ? 600 : 400,
                }}
              >
                {l}
              </div>
            ))}
          </div>
        </div>

        {(country || language) && (
          <div style={{ padding: '10px 14px', borderRadius: 8, background: '#f8fafc', border: '1px solid #e2e8f0', fontSize: 13, color: '#475569' }}>
            선택: <strong>{country || '미선택'}</strong> · <strong>{language || '미선택'}</strong>
          </div>
        )}
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   Cycle 69: Linear Design + Google Material 3 벤치마크
-------------------------------------------------------------------------- */

/* Linear — 이슈 상태 선택 드롭다운
   Linear의 이슈 상태 선택기 패턴. 상태 아이콘 + 레이블 + 색상 도트로
   현재 상태를 직관적으로 표시. 컴팩트하고 밀도 높은 상태 관리 UX.
-------------------------------------------------------------------------- */
const LINEAR_STATUSES = [
  { value: 'backlog', label: '백로그', color: '#94a3b8', dot: '○' },
  { value: 'todo', label: '할 일', color: '#64748b', dot: '◐' },
  { value: 'in_progress', label: '진행 중', color: '#f59e0b', dot: '◑' },
  { value: 'in_review', label: '검토 중', color: '#6366f1', dot: '◕' },
  { value: 'done', label: '완료', color: '#22c55e', dot: '●' },
  { value: 'cancelled', label: '취소됨', color: '#ef4444', dot: '✕' },
]

export const Linear_이슈_상태_선택기: Story = {
  name: 'Linear — 이슈 상태 선택기',
  parameters: {
    docs: {
      description: {
        story: 'Linear 이슈 상태 선택 패턴. 색상 도트 + 상태 레이블로 현재 상태를 표시. 상태별 시맨틱 색상으로 한눈에 진행 상황 파악. 컴팩트 밀도의 상태 드롭다운.',
      },
    },
  },
  render: function LinearStatusSelector() {
    const [status, setStatus] = useState('in_progress')
    const current = LINEAR_STATUSES.find((s) => s.value === status) ?? LINEAR_STATUSES[0]

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '8px 0', fontFamily: 'system-ui, sans-serif', width: 360 }}>
        <div style={{ fontSize: 13, color: '#64748b' }}>Linear 스타일 이슈 상태 선택기</div>

        {/* 드롭다운 트리거 */}
        <div style={{ position: 'relative' }}>
          <Dropdown
            value={current.label}
            activated={false}
            onClick={() => {}}
          >
            <Dropdown.Leading>
              <span style={{ fontSize: 14, color: current.color }}>{current.dot}</span>
            </Dropdown.Leading>
          </Dropdown>

          {/* 커스텀 옵션 목록 */}
          <div style={{ marginTop: 4, background: '#fff', borderRadius: 10, border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
            {LINEAR_STATUSES.map((s) => (
              <div
                key={s.value}
                onClick={() => setStatus(s.value)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '8px 14px',
                  cursor: 'pointer', background: status === s.value ? '#f8fafc' : '#fff',
                  borderLeft: `3px solid ${status === s.value ? s.color : 'transparent'}`,
                  transition: 'all 0.1s',
                }}
              >
                <span style={{ fontSize: 13, color: s.color, minWidth: 16, textAlign: 'center' }}>{s.dot}</span>
                <span style={{ fontSize: 13, color: status === s.value ? '#0f172a' : '#374151', fontWeight: status === s.value ? 600 : 400 }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ fontSize: 12, color: '#94a3b8', textAlign: 'center' }}>
          선택된 상태: <strong style={{ color: current.color }}>{current.label}</strong>
        </div>
      </div>
    )
  },
}

/* Linear — 우선순위 선택 드롭다운
   Linear의 이슈 우선순위 선택기. 4단계 우선순위를 아이콘과 색상으로 구분.
   긴급/높음/보통/낮음/없음의 명확한 시각적 계층.
-------------------------------------------------------------------------- */
const LINEAR_PRIORITIES = [
  { value: 'urgent', label: '긴급', icon: '!!', color: '#ef4444' },
  { value: 'high', label: '높음', icon: '!', color: '#f59e0b' },
  { value: 'medium', label: '보통', icon: '~', color: '#6366f1' },
  { value: 'low', label: '낮음', icon: '↓', color: '#94a3b8' },
  { value: 'none', label: '없음', icon: '-', color: '#cbd5e1' },
]

export const Linear_우선순위_선택_드롭다운: Story = {
  name: 'Linear — 우선순위 선택 드롭다운',
  parameters: {
    docs: {
      description: {
        story: 'Linear 이슈 우선순위 선택 패턴. 긴급/높음/보통/낮음/없음 5단계를 아이콘+색상으로 구분. Dropdown.Leading에 우선순위 아이콘 배치.',
      },
    },
  },
  render: function LinearPriorityDropdown() {
    const [priority, setPriority] = useState('medium')
    const [open, setOpen] = useState(false)
    const current = LINEAR_PRIORITIES.find((p) => p.value === priority) ?? LINEAR_PRIORITIES[2]

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontFamily: 'system-ui, sans-serif', width: 300 }}>
        <div style={{ fontSize: 12, color: '#94a3b8' }}>Linear 우선순위 선택기</div>
        <div style={{ position: 'relative' }}>
          <div onClick={() => setOpen((o) => !o)}>
            <Dropdown
              value={current.label}
              activated={open}
              onClick={() => {}}
            >
              <Dropdown.Leading>
                <span style={{ fontSize: 12, fontWeight: 800, color: current.color, minWidth: 16, textAlign: 'center', fontFamily: 'monospace' }}>
                  {current.icon}
                </span>
              </Dropdown.Leading>
            </Dropdown>
          </div>
          {open && (
            <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, background: '#fff', borderRadius: 10, border: '1px solid #e2e8f0', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', zIndex: 10, overflow: 'hidden' }}>
              {LINEAR_PRIORITIES.map((p) => (
                <div
                  key={p.value}
                  onClick={() => { setPriority(p.value); setOpen(false) }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10, padding: '9px 14px',
                    cursor: 'pointer', transition: 'background 0.1s',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#f8fafc' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#fff' }}
                >
                  <span style={{ fontSize: 12, fontWeight: 800, color: p.color, minWidth: 16, textAlign: 'center', fontFamily: 'monospace' }}>{p.icon}</span>
                  <span style={{ fontSize: 13, color: priority === p.value ? '#0f172a' : '#374151', fontWeight: priority === p.value ? 600 : 400 }}>{p.label}</span>
                  {priority === p.value && <span style={{ marginLeft: 'auto', fontSize: 10, color: '#6366f1' }}>선택됨</span>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  },
}

/* Google Material 3 — 노출 드롭다운 (Exposed Dropdown Menu)
   Material 3의 Exposed Dropdown Menu 패턴. 아웃라인 필드처럼 생긴 선택기.
   선택 시 레이블이 상단으로 올라가는 floating label 효과 + 옵션 목록.
-------------------------------------------------------------------------- */
const M3_SORT_OPTIONS = [
  { value: 'latest', label: '최신순' },
  { value: 'popular', label: '인기순' },
  { value: 'price_asc', label: '가격 낮은순' },
  { value: 'price_desc', label: '가격 높은순' },
  { value: 'rating', label: '평점순' },
]

export const Material3_Exposed_드롭다운_메뉴: Story = {
  name: 'Google Material 3 — Exposed Dropdown Menu',
  parameters: {
    docs: {
      description: {
        story: 'Material Design 3 Exposed Dropdown Menu 패턴. 아웃라인 필드에 chevron 트리거를 조합. 선택된 값이 필드 내부에 표시. 폼 내 정렬/분류 선택에 적합.',
      },
    },
  },
  render: function M3ExposedDropdown() {
    const [sort, setSort] = useState('')
    const [open, setOpen] = useState(false)
    const current = M3_SORT_OPTIONS.find((o) => o.value === sort)

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontFamily: 'system-ui, sans-serif', width: 320 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#374151' }}>검색 결과 설정</div>

        {/* M3 Exposed Dropdown */}
        <div style={{ position: 'relative' }}>
          <div
            onClick={() => setOpen((o) => !o)}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '12px 14px', borderRadius: 8,
              border: `1.5px solid ${open ? '#6366f1' : '#e2e8f0'}`,
              background: '#fff', cursor: 'pointer', transition: 'border-color 0.15s',
            }}
          >
            <div>
              {sort ? (
                <>
                  <div style={{ fontSize: 10, fontWeight: 600, color: '#6366f1', marginBottom: 2 }}>정렬 기준</div>
                  <div style={{ fontSize: 13, color: '#0f172a', fontWeight: 500 }}>{current?.label}</div>
                </>
              ) : (
                <div style={{ fontSize: 13, color: '#94a3b8' }}>정렬 기준 선택...</div>
              )}
            </div>
            <ChevronRightLineIcon />
          </div>
          {open && (
            <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, background: '#fff', borderRadius: 10, border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', zIndex: 10, overflow: 'hidden' }}>
              {M3_SORT_OPTIONS.map((opt) => (
                <div
                  key={opt.value}
                  onClick={() => { setSort(opt.value); setOpen(false) }}
                  style={{
                    padding: '10px 16px', cursor: 'pointer', fontSize: 13,
                    color: sort === opt.value ? '#6366f1' : '#374151',
                    fontWeight: sort === opt.value ? 600 : 400,
                    background: sort === opt.value ? '#eff6ff' : '#fff',
                    borderLeft: `3px solid ${sort === opt.value ? '#6366f1' : 'transparent'}`,
                    transition: 'all 0.1s',
                  }}
                >
                  {opt.label}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ padding: '10px 14px', borderRadius: 8, background: '#f8fafc', border: '1px solid #e2e8f0', fontSize: 12, color: '#64748b' }}>
          선택된 정렬: <strong style={{ color: '#0f172a' }}>{current?.label ?? '없음'}</strong>
        </div>
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   Tailwind UI 벤치마크: 태그 멀티 선택 드롭다운
   여러 항목을 선택해 인라인 태그로 표시하는 패턴
-------------------------------------------------------------------------- */
const TW_TAG_OPTIONS = [
  { value: 'react', label: 'React' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'tailwind', label: 'Tailwind CSS' },
  { value: 'nextjs', label: 'Next.js' },
  { value: 'storybook', label: 'Storybook' },
  { value: 'vitest', label: 'Vitest' },
  { value: 'playwright', label: 'Playwright' },
  { value: 'figma', label: 'Figma' },
]

export const TailwindUI_태그_멀티선택_드롭다운: Story = {
  name: 'Tailwind UI — 태그 멀티 선택 드롭다운',
  parameters: {
    docs: {
      description: {
        story:
          'Tailwind UI Combobox(Multi) 패턴. 선택한 항목이 인라인 태그(chip)으로 트리거 내부에 표시되고, ' +
          '태그별 삭제 버튼으로 개별 제거 가능. 검색 필터로 옵션 실시간 탐색.',
      },
    },
  },
  render: function TwTagMultiSelect() {
    const [selected, setSelected] = useState<string[]>([])
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState('')

    const toggle = (value: string) => {
      if (selected.includes(value)) {
        setSelected(selected.filter((v) => v !== value))
      } else {
        setSelected([...selected, value])
      }
    }

    const filtered = TW_TAG_OPTIONS.filter((opt) =>
      opt.label.toLowerCase().includes(query.toLowerCase())
    )

    return (
      <div style={{ width: 360, fontFamily: 'system-ui, sans-serif', position: 'relative' }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 6 }}>기술 스택 선택</div>

        {/* Trigger */}
        <div
          onClick={() => setOpen((o) => !o)}
          style={{
            minHeight: 42, padding: '6px 10px', borderRadius: 8,
            border: `1.5px solid ${open ? '#6366f1' : '#e2e8f0'}`,
            background: '#fff', cursor: 'pointer', display: 'flex', flexWrap: 'wrap', gap: 4, alignItems: 'center',
            transition: 'border-color 0.15s',
          }}
        >
          {selected.length === 0 && (
            <span style={{ fontSize: 13, color: '#94a3b8' }}>기술 스택을 선택하세요...</span>
          )}
          {selected.map((v) => {
            const opt = TW_TAG_OPTIONS.find((o) => o.value === v)
            return (
              <span
                key={v}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  padding: '2px 8px', borderRadius: 20,
                  background: '#eff6ff', color: '#3b82f6', fontSize: 11, fontWeight: 600,
                }}
              >
                {opt?.label}
                <span
                  onClick={(e) => { e.stopPropagation(); toggle(v) }}
                  style={{ cursor: 'pointer', fontSize: 13, lineHeight: 1, color: '#6366f1' }}
                >
                  ×
                </span>
              </span>
            )
          })}
          <span style={{ marginLeft: 'auto', color: '#94a3b8', fontSize: 14 }}>
            <ChevronRightLineIcon />
          </span>
        </div>

        {/* Dropdown */}
        {open && (
          <div style={{
            position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0,
            background: '#fff', borderRadius: 10, border: '1px solid #e2e8f0',
            boxShadow: '0 8px 24px rgba(0,0,0,0.08)', zIndex: 20, overflow: 'hidden',
          }}>
            <div style={{ padding: '8px 10px', borderBottom: '1px solid #f1f5f9' }}>
              <input
                placeholder="검색..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                style={{ width: '100%', border: 'none', outline: 'none', fontSize: 12, color: '#374151' }}
              />
            </div>
            {filtered.length === 0 ? (
              <div style={{ padding: '12px 14px', fontSize: 12, color: '#94a3b8' }}>검색 결과 없음</div>
            ) : (
              filtered.map((opt) => {
                const isSelected = selected.includes(opt.value)
                return (
                  <div
                    key={opt.value}
                    onClick={(e) => { e.stopPropagation(); toggle(opt.value) }}
                    style={{
                      padding: '9px 14px', cursor: 'pointer', fontSize: 13,
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      background: isSelected ? '#eff6ff' : '#fff',
                      color: isSelected ? '#3b82f6' : '#374151',
                      fontWeight: isSelected ? 600 : 400,
                    }}
                  >
                    {opt.label}
                    {isSelected && <span style={{ fontSize: 11, color: '#6366f1' }}>✓</span>}
                  </div>
                )
              })
            )}
            <div style={{ padding: '8px 12px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 11, color: '#94a3b8' }}>{selected.length}개 선택됨</span>
              <button
                onClick={(e) => { e.stopPropagation(); setSelected([]); setQuery('') }}
                style={{ fontSize: 11, color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                전체 해제
              </button>
            </div>
          </div>
        )}
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   Ant Design 벤치마크: 계층형 카테고리 선택기
   Ant Design Cascader 패턴 — 부모-자식 카테고리 2단 선택
-------------------------------------------------------------------------- */
type AntCategory = { value: string; label: string; children?: { value: string; label: string }[] }
const ANT_CATEGORIES: AntCategory[] = [
  {
    value: 'frontend', label: '프론트엔드',
    children: [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
      { value: 'svelte', label: 'Svelte' },
    ],
  },
  {
    value: 'backend', label: '백엔드',
    children: [
      { value: 'node', label: 'Node.js' },
      { value: 'python', label: 'Python' },
      { value: 'go', label: 'Go' },
    ],
  },
  {
    value: 'design', label: '디자인',
    children: [
      { value: 'ui', label: 'UI 디자인' },
      { value: 'ux', label: 'UX 리서치' },
      { value: 'motion', label: '모션 디자인' },
    ],
  },
  {
    value: 'devops', label: 'DevOps',
    children: [
      { value: 'docker', label: 'Docker' },
      { value: 'k8s', label: 'Kubernetes' },
      { value: 'ci', label: 'CI/CD' },
    ],
  },
]

export const Ant_계층형_카테고리_선택기: Story = {
  name: 'Ant Design — 계층형 카테고리 Cascader',
  parameters: {
    docs: {
      description: {
        story:
          'Ant Design Cascader 패턴. 1단계 카테고리 선택 시 오른쪽에 하위 항목 컬럼이 펼쳐지는 ' +
          '2단 계층형 선택 UI. 선택 경로를 breadcrumb 형태로 표시.',
      },
    },
  },
  render: function AntCascader() {
    const [open, setOpen] = useState(false)
    const [parent, setParent] = useState<string | null>(null)
    const [selected, setSelected] = useState<{ parent: string; child: string } | null>(null)

    const parentItem = ANT_CATEGORIES.find((c) => c.value === parent)
    const displayLabel = selected
      ? `${ANT_CATEGORIES.find((c) => c.value === selected.parent)?.label} / ${parentItem?.children?.find((c) => c.value === selected.child)?.label ?? ''}`
      : ''

    return (
      <div style={{ width: 320, fontFamily: 'system-ui, sans-serif', position: 'relative' }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 6 }}>직무 카테고리</div>

        <div
          onClick={() => setOpen((o) => !o)}
          style={{
            padding: '10px 14px', borderRadius: 8, border: `1.5px solid ${open ? '#6366f1' : '#e2e8f0'}`,
            background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            transition: 'border-color 0.15s',
          }}
        >
          <span style={{ fontSize: 13, color: selected ? '#0f172a' : '#94a3b8', fontWeight: selected ? 500 : 400 }}>
            {displayLabel || '카테고리를 선택하세요'}
          </span>
          <ChevronRightLineIcon />
        </div>

        {open && (
          <div style={{
            position: 'absolute', top: 'calc(100% + 4px)', left: 0,
            display: 'flex', borderRadius: 10, border: '1px solid #e2e8f0',
            boxShadow: '0 8px 24px rgba(0,0,0,0.08)', zIndex: 20, overflow: 'hidden',
          }}>
            {/* 1단계 */}
            <div style={{ width: 140, background: '#fff', borderRight: '1px solid #f1f5f9' }}>
              {ANT_CATEGORIES.map((cat) => (
                <div
                  key={cat.value}
                  onMouseEnter={() => setParent(cat.value)}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    padding: '9px 14px', cursor: 'pointer', fontSize: 13,
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    background: parent === cat.value ? '#eff6ff' : '#fff',
                    color: parent === cat.value ? '#6366f1' : '#374151',
                    fontWeight: parent === cat.value ? 600 : 400,
                  }}
                >
                  {cat.label}
                  <span style={{ fontSize: 10, color: '#94a3b8' }}>›</span>
                </div>
              ))}
            </div>

            {/* 2단계 */}
            {parentItem && (
              <div style={{ width: 140, background: '#fff' }}>
                {parentItem.children?.map((child) => (
                  <div
                    key={child.value}
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelected({ parent: parentItem.value, child: child.value })
                      setOpen(false)
                    }}
                    style={{
                      padding: '9px 14px', cursor: 'pointer', fontSize: 13,
                      background: selected?.child === child.value && selected?.parent === parentItem.value ? '#eff6ff' : '#fff',
                      color: selected?.child === child.value && selected?.parent === parentItem.value ? '#6366f1' : '#374151',
                      fontWeight: selected?.child === child.value && selected?.parent === parentItem.value ? 600 : 400,
                    }}
                  >
                    {child.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {selected && (
          <div style={{ marginTop: 8, padding: '6px 10px', borderRadius: 6, background: '#eff6ff', border: '1px solid #c7d2fe', fontSize: 11, color: '#4f46e5' }}>
            선택: {displayLabel}
          </div>
        )}
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   Tailwind UI 벤치마크: 인원 배정 선택기
   Tailwind UI Combobox(with avatar) 패턴
-------------------------------------------------------------------------- */
type TwAssignee = { id: number; name: string; role: string; initials: string; color: string }
const TW_ASSIGNEES: TwAssignee[] = [
  { id: 1, name: '김지수', role: '디자이너', initials: '김', color: '#3b82f6' },
  { id: 2, name: '이민준', role: '프론트엔드', initials: '이', color: '#8b5cf6' },
  { id: 3, name: '박서연', role: '백엔드', initials: '박', color: '#10b981' },
  { id: 4, name: '최현우', role: '프로덕트 매니저', initials: '최', color: '#f59e0b' },
  { id: 5, name: '정유나', role: 'QA 엔지니어', initials: '정', color: '#ef4444' },
]

export const TailwindUI_인원_배정_드롭다운: Story = {
  name: 'Tailwind UI — 인원 배정 아바타 Combobox',
  parameters: {
    docs: {
      description: {
        story:
          'Tailwind UI Combobox with Avatar 패턴. 아바타 + 이름 + 직책으로 구성된 인원 목록에서 ' +
          '담당자를 배정하는 드롭다운. 선택된 인원이 트리거에 아바타로 표시됩니다.',
      },
    },
  },
  render: function TwAssigneeDropdown() {
    const [open, setOpen] = useState(false)
    const [assignee, setAssignee] = useState<TwAssignee | null>(null)
    const [query, setQuery] = useState('')

    const filtered = TW_ASSIGNEES.filter((a) =>
      a.name.includes(query) || a.role.toLowerCase().includes(query.toLowerCase())
    )

    return (
      <div style={{ width: 300, fontFamily: 'system-ui, sans-serif', position: 'relative' }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 6 }}>담당자 배정</div>

        <div
          onClick={() => setOpen((o) => !o)}
          style={{
            padding: '8px 12px', borderRadius: 8,
            border: `1.5px solid ${open ? '#6366f1' : '#e2e8f0'}`,
            background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10,
            transition: 'border-color 0.15s',
          }}
        >
          {assignee ? (
            <>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: assignee.color, color: '#fff', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {assignee.initials}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{assignee.name}</div>
                <div style={{ fontSize: 11, color: '#64748b' }}>{assignee.role}</div>
              </div>
            </>
          ) : (
            <span style={{ fontSize: 13, color: '#94a3b8', flex: 1 }}>담당자를 선택하세요</span>
          )}
          <ChevronRightLineIcon />
        </div>

        {open && (
          <div style={{
            position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0,
            background: '#fff', borderRadius: 10, border: '1px solid #e2e8f0',
            boxShadow: '0 8px 24px rgba(0,0,0,0.1)', zIndex: 20, overflow: 'hidden',
          }}>
            <div style={{ padding: '8px 10px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 6 }}>
              <SearchIcon />
              <input
                placeholder="이름 또는 직책 검색"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                style={{ border: 'none', outline: 'none', fontSize: 12, flex: 1, color: '#374151' }}
              />
            </div>
            {filtered.map((a) => (
              <div
                key={a.id}
                onClick={(e) => { e.stopPropagation(); setAssignee(a); setOpen(false); setQuery('') }}
                style={{
                  padding: '10px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10,
                  background: assignee?.id === a.id ? '#eff6ff' : '#fff',
                  borderLeft: `3px solid ${assignee?.id === a.id ? '#6366f1' : 'transparent'}`,
                  transition: 'background 0.1s',
                }}
              >
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: a.color, color: '#fff', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {a.initials}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{a.name}</div>
                  <div style={{ fontSize: 11, color: '#64748b' }}>{a.role}</div>
                </div>
                {assignee?.id === a.id && <span style={{ marginLeft: 'auto', fontSize: 12, color: '#6366f1' }}>✓</span>}
              </div>
            ))}
            {assignee && (
              <div style={{ padding: '8px 12px', borderTop: '1px solid #f1f5f9' }}>
                <button
                  onClick={(e) => { e.stopPropagation(); setAssignee(null); setOpen(false) }}
                  style={{ width: '100%', padding: '6px', borderRadius: 6, border: '1px solid #e2e8f0', background: '#fff', fontSize: 11, color: '#64748b', cursor: 'pointer' }}
                >
                  배정 해제
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    )
  },
}

// ============================================================
// Cycle 138 — Vercel Design + Chakra UI 벤치마크 반영
// ============================================================

// Vercel 스타일 — 배포 환경 선택기 (Production/Preview/Development)
const VERCEL_ENVS_138 = [
  { value: 'production', label: 'Production', desc: '메인 브랜치 (main)', color: '#22c55e', badge: 'LIVE' },
  { value: 'preview', label: 'Preview', desc: '모든 PR 브랜치 자동 배포', color: '#6366f1', badge: 'BETA' },
  { value: 'development', label: 'Development', desc: '로컬 개발 환경', color: '#f59e0b', badge: 'DEV' },
]

export const Vercel_배포_환경_선택기: Story = {
  name: 'Vercel Design — 배포 환경 선택기 (Cycle 138)',
  parameters: {
    docs: {
      description: {
        story:
          'Vercel Environment Selector 패턴. Production/Preview/Development 환경별 색상 배지 + 설명 서브텍스트. ' +
          '선택된 환경은 트리거에 색상 도트와 배지로 표시. 모노크롬 컴팩트 밀도.',
      },
    },
  },
  render: function VercelEnvSelectorRender() {
    const [open, setOpen] = useState(false)
    const [env, setEnv] = useState('production')
    const current = VERCEL_ENVS_138.find((e) => e.value === env) ?? VERCEL_ENVS_138[0]

    return (
      <div style={{ width: 320, fontFamily: 'system-ui, sans-serif', position: 'relative' }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#64748b', marginBottom: 6, letterSpacing: 0.5 }}>ENVIRONMENT</div>
        <Dropdown
          value={current.label}
          activated={open}
          onClick={() => setOpen((v) => !v)}
        >
          <Dropdown.Leading>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: current.color }} />
          </Dropdown.Leading>
          <Dropdown.Trailing>
            <span style={{ fontSize: 10, fontWeight: 700, padding: '1px 5px', borderRadius: 3, background: current.color + '22', color: current.color }}>{current.badge}</span>
          </Dropdown.Trailing>
        </Dropdown>
        {open && (
          <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, zIndex: 10, background: '#fff', borderRadius: 10, border: '1px solid #e2e8f0', boxShadow: '0 8px 24px rgba(0,0,0,0.10)', overflow: 'hidden' }}>
            {VERCEL_ENVS_138.map((e) => (
              <div
                key={e.value}
                onClick={() => { setEnv(e.value); setOpen(false) }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', cursor: 'pointer',
                  background: env === e.value ? '#f8fafc' : '#fff', borderBottom: '1px solid #f1f5f9',
                  transition: 'background 100ms',
                }}
              >
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: e.color, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: env === e.value ? 700 : 500, color: '#0f172a' }}>{e.label}</span>
                    <span style={{ fontSize: 10, fontWeight: 700, padding: '1px 5px', borderRadius: 3, background: e.color + '18', color: e.color }}>{e.badge}</span>
                  </div>
                  <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 1 }}>{e.desc}</div>
                </div>
                {env === e.value && <span style={{ color: '#0f172a', fontSize: 12 }}>✓</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  },
}

// Chakra UI 스타일 — 배포 지역 선택기 (멀티 지역)
const CHAKRA_REGIONS_138 = [
  { value: 'iad1', label: 'Washington D.C.', region: 'us-east-1', latency: 12 },
  { value: 'sfo1', label: 'San Francisco', region: 'us-west-2', latency: 98 },
  { value: 'icn1', label: 'Seoul', region: 'ap-northeast-2', latency: 6 },
  { value: 'nrt1', label: 'Tokyo', region: 'ap-northeast-1', latency: 22 },
  { value: 'fra1', label: 'Frankfurt', region: 'eu-central-1', latency: 188 },
  { value: 'sin1', label: 'Singapore', region: 'ap-southeast-1', latency: 75 },
]

function getLatencyColor(ms: number) {
  if (ms < 30) return '#22c55e'
  if (ms < 100) return '#f59e0b'
  return '#ef4444'
}

export const Chakra_배포_지역_선택기: Story = {
  name: 'Chakra UI — 배포 지역 선택기 (Cycle 138)',
  parameters: {
    docs: {
      description: {
        story:
          'Chakra UI Select + 지역 선택 패턴. 지역별 레이턴시 ms 표시 + 색상 코딩(녹/황/적). ' +
          '현재 지역은 체크 표시 + 굵은 글씨. 레이턴시 기준 정렬 제안 UX.',
      },
    },
  },
  render: function ChakraRegionSelectorRender() {
    const [open, setOpen] = useState(false)
    const [region, setRegion] = useState('icn1')
    const current = CHAKRA_REGIONS_138.find((r) => r.value === region) ?? CHAKRA_REGIONS_138[0]

    return (
      <div style={{ width: 340, fontFamily: 'system-ui, sans-serif', position: 'relative' }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#64748b', marginBottom: 6, letterSpacing: 0.5 }}>PRIMARY REGION</div>
        <Dropdown
          value={`${current.label} (${current.region})`}
          activated={open}
          onClick={() => setOpen((v) => !v)}
        >
          <Dropdown.Trailing>
            <span style={{ fontSize: 11, fontWeight: 600, color: getLatencyColor(current.latency) }}>{current.latency}ms</span>
          </Dropdown.Trailing>
        </Dropdown>
        {open && (
          <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, zIndex: 10, background: '#fff', borderRadius: 10, border: '1px solid #e2e8f0', boxShadow: '0 8px 24px rgba(0,0,0,0.10)', overflow: 'hidden' }}>
            <div style={{ padding: '8px 12px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#64748b' }}>지역 선택</span>
              <span style={{ fontSize: 10, color: '#94a3b8' }}>레이턴시 기준 정렬</span>
            </div>
            {[...CHAKRA_REGIONS_138].sort((a, b) => a.latency - b.latency).map((r) => (
              <div
                key={r.value}
                onClick={() => { setRegion(r.value); setOpen(false) }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', cursor: 'pointer',
                  background: region === r.value ? '#f8fafc' : '#fff', borderBottom: '1px solid #f8fafc',
                  transition: 'background 100ms',
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: region === r.value ? 700 : 400, color: '#0f172a' }}>{r.label}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 1 }}>{r.region}</div>
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: getLatencyColor(r.latency), minWidth: 40, textAlign: 'right' }}>{r.latency}ms</span>
                {region === r.value && <span style={{ fontSize: 12, color: '#22c55e', marginLeft: 4 }}>✓</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  },
}

// Vercel + Chakra — 팀 & 프로젝트 계층 선택기
const TEAMS_138 = [
  { id: 't1', name: 'blue45fs-projects', type: 'team', members: 3, projects: 12, avatar: 'B', color: '#6366f1' },
  { id: 't2', name: 'Personal Account', type: 'personal', members: 1, projects: 4, avatar: 'H', color: '#0ea5e9' },
]

const PROJECTS_138: Record<string, { id: string; name: string; env: string }[]> = {
  t1: [
    { id: 'p1', name: 'orbit-ui', env: 'Production' },
    { id: 'p2', name: 'orbit-docs', env: 'Preview' },
    { id: 'p3', name: 'orbit-playground', env: 'Development' },
  ],
  t2: [
    { id: 'p4', name: 'portfolio', env: 'Production' },
    { id: 'p5', name: 'blog', env: 'Preview' },
  ],
}

export const Vercel_Chakra_팀_프로젝트_선택기: Story = {
  name: 'Vercel + Chakra — 팀/프로젝트 계층 선택기 (Cycle 138)',
  parameters: {
    docs: {
      description: {
        story:
          'Vercel + Chakra UI 계층형 선택 드롭다운. 1단계 팀 선택 → 2단계 프로젝트 선택. ' +
          '팀 아바타 + 멤버/프로젝트 수 표시. 선택 완료 시 "팀/프로젝트" 조합 트리거에 표시.',
      },
    },
  },
  render: function VercelChakraTeamProjectRender() {
    const [open, setOpen] = useState(false)
    const [step, setStep] = useState<'team' | 'project'>('team')
    const [teamId, setTeamId] = useState<string | null>(null)
    const [projectId, setProjectId] = useState<string | null>(null)

    const team = TEAMS_138.find((t) => t.id === teamId)
    const project = PROJECTS_138[teamId ?? '']?.find((p) => p.id === projectId)

    const displayValue = team && project ? `${team.name} / ${project.name}` : team ? `${team.name} / 프로젝트 선택` : '팀 선택'

    function selectTeam(id: string) {
      setTeamId(id)
      setProjectId(null)
      setStep('project')
    }

    function selectProject(id: string) {
      setProjectId(id)
      setOpen(false)
      setStep('team')
    }

    return (
      <div style={{ width: 360, fontFamily: 'system-ui, sans-serif', position: 'relative' }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#64748b', marginBottom: 6, letterSpacing: 0.5 }}>SCOPE</div>
        <Dropdown
          value={displayValue}
          activated={open}
          onClick={() => { setOpen((v) => !v); setStep('team') }}
        >
          {team && (
            <Dropdown.Leading>
              <div style={{ width: 18, height: 18, borderRadius: 4, background: team.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#fff' }}>
                {team.avatar}
              </div>
            </Dropdown.Leading>
          )}
        </Dropdown>
        {open && (
          <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, zIndex: 10, background: '#fff', borderRadius: 10, border: '1px solid #e2e8f0', boxShadow: '0 8px 24px rgba(0,0,0,0.10)', overflow: 'hidden' }}>
            <div style={{ padding: '8px 12px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 6 }}>
              {step === 'project' && (
                <button onClick={() => setStep('team')} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: '0 4px 0 0', color: '#94a3b8', fontSize: 13 }}>←</button>
              )}
              <span style={{ fontSize: 11, fontWeight: 600, color: '#64748b' }}>{step === 'team' ? '팀 선택' : `${team?.name} - 프로젝트`}</span>
            </div>
            {step === 'team' && TEAMS_138.map((t) => (
              <div key={t.id} onClick={() => selectTeam(t.id)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', cursor: 'pointer', background: teamId === t.id ? '#f8fafc' : '#fff', borderBottom: '1px solid #f8fafc', transition: 'background 100ms' }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>{t.avatar}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{t.name}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8' }}>{t.members}명 · {t.projects}개 프로젝트</div>
                </div>
                <span style={{ marginLeft: 'auto', fontSize: 12, color: '#94a3b8' }}>→</span>
              </div>
            ))}
            {step === 'project' && teamId && PROJECTS_138[teamId]?.map((p) => (
              <div key={p.id} onClick={() => selectProject(p.id)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', cursor: 'pointer', background: projectId === p.id ? '#f8fafc' : '#fff', borderBottom: '1px solid #f8fafc', transition: 'background 100ms' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: p.env === 'Production' ? '#22c55e' : p.env === 'Preview' ? '#6366f1' : '#f59e0b', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: projectId === p.id ? 700 : 400, color: '#0f172a' }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8' }}>{p.env}</div>
                </div>
                {projectId === p.id && <span style={{ fontSize: 12, color: '#22c55e' }}>✓</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  },
}
