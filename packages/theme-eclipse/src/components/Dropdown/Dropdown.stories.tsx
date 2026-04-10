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
