import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import {
  SettingLineIcon,
  StarLineIcon,
  NotificationLineIcon,
  SearchIcon,
  HomeLineIcon,
  OnePersonLineIcon,
  CircleInfoLineIcon,
  ArrowRightIcon,
  CheckIcon,
  DeleteLineIcon,
} from '@heejun-com/icons'

import { Command } from './Command'

const meta = {
  title: 'eclipse/Navigation/Command',
  component: Command,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Command는 shadcn/ui Command 패턴을 구현한 검색/명령 팔레트 컴포넌트입니다. ' +
          'cmdk 기반으로 키보드 네비게이션(Arrow, Enter, Escape)을 완벽 지원합니다.',
      },
    },
  },
} satisfies Meta<typeof Command>

export default meta
type Story = StoryObj<typeof meta>

/* --------------------------------------------------------------------------
   기본 스토리 — shadcn/ui Combobox 기본 패턴
-------------------------------------------------------------------------- */
export const 기본: Story = {
  render: () => (
    <Command className="rounded-lg border shadow-md max-w-md mx-auto">
      <Command.Input placeholder="무엇이든 입력해 보세요..." />
      <Command.List>
        <Command.Empty>검색 결과가 없습니다.</Command.Empty>
        <Command.Group heading="제안">
          <Command.Item>
            <StarLineIcon className="mr-2 h-4 w-4" />
            <span>즐겨찾기</span>
          </Command.Item>
          <Command.Item>
            <NotificationLineIcon className="mr-2 h-4 w-4" />
            <span>알림</span>
          </Command.Item>
        </Command.Group>
        <Command.Separator />
        <Command.Group heading="설정">
          <Command.Item>
            <SettingLineIcon className="mr-2 h-4 w-4" />
            <span>환경설정</span>
          </Command.Item>
        </Command.Group>
      </Command.List>
    </Command>
  ),
}

/* --------------------------------------------------------------------------
   Cmd+K 글로벌 팔레트 패턴
   shadcn/ui Dialog 내부에 Command를 삽입하는 공식 패턴.
   여기서는 Dialog 없이 팔레트 UI 자체를 인라인으로 시연합니다.
-------------------------------------------------------------------------- */

const allCommands = [
  { group: '페이지', icon: <HomeLineIcon className="h-4 w-4" />, label: '대시보드로 이동', shortcut: 'G D' },
  { group: '페이지', icon: <CircleInfoLineIcon className="h-4 w-4" />, label: '문서 목록', shortcut: 'G L' },
  { group: '페이지', icon: <OnePersonLineIcon className="h-4 w-4" />, label: '팀 관리', shortcut: 'G T' },
  { group: '액션', icon: <CircleInfoLineIcon className="h-4 w-4" />, label: '새 이슈 만들기', shortcut: 'C' },
  { group: '액션', icon: <SettingLineIcon className="h-4 w-4" />, label: '설정 열기', shortcut: 'G S' },
  { group: '액션', icon: <StarLineIcon className="h-4 w-4" />, label: '즐겨찾기 추가', shortcut: 'F' },
  { group: '최근', icon: <ArrowRightIcon className="h-4 w-4" />, label: '토큰 아키텍처 문서', shortcut: '' },
  { group: '최근', icon: <ArrowRightIcon className="h-4 w-4" />, label: 'DataTable 고도화 PR', shortcut: '' },
]

const CmdKPaletteDemo = () => {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, padding: '40px 24px' }}>
      {/* Trigger hint */}
      <button
        onClick={() => setOpen(true)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 16px',
          borderRadius: 10,
          border: '1px solid #e2e8f0',
          background: '#f8fafc',
          color: '#64748b',
          fontSize: 13,
          cursor: 'pointer',
          fontWeight: 500,
        }}
      >
        <SearchIcon className="h-4 w-4" />
        <span>명령 팔레트 열기</span>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 3,
            marginLeft: 8,
            padding: '1px 6px',
            borderRadius: 5,
            background: '#e2e8f0',
            fontSize: 11,
            fontWeight: 700,
            color: '#475569',
            fontFamily: 'monospace',
          }}
        >
          Cmd K
        </span>
      </button>

      {/* Inline palette (shadcn/ui Cmd+K Dialog 패턴 시연) */}
      {open && (
        <div
          role="dialog"
          aria-label="명령 팔레트"
          style={{
            position: 'relative',
            width: 520,
            borderRadius: 14,
            border: '1px solid #e2e8f0',
            boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
            overflow: 'hidden',
            background: '#fff',
          }}
        >
          {/* Close button */}
          <button
            onClick={() => setOpen(false)}
            aria-label="닫기"
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              zIndex: 10,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#94a3b8',
              display: 'flex',
              padding: 4,
              borderRadius: 4,
            }}
          >
            <DeleteLineIcon className="h-4 w-4" />
          </button>

          <Command>
            <Command.Input placeholder="명령 또는 페이지 검색..." />
            <Command.List>
              <Command.Empty>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, color: '#94a3b8' }}>
                  <SearchIcon className="h-8 w-8" />
                  <span>검색 결과가 없습니다.</span>
                </div>
              </Command.Empty>

              {['페이지', '액션', '최근'].map((group) => {
                const items = allCommands.filter((c) => c.group === group)
                return (
                  <Command.Group key={group} heading={group}>
                    {items.map((cmd) => (
                      <Command.Item
                        key={cmd.label}
                        onSelect={() => {
                          setSelected(cmd.label)
                          setOpen(false)
                        }}
                      >
                        <span style={{ color: '#6366f1', marginRight: 8 }}>{cmd.icon}</span>
                        <span style={{ flex: 1 }}>{cmd.label}</span>
                        {cmd.shortcut && (
                          <span
                            style={{
                              fontSize: 10,
                              fontFamily: 'monospace',
                              fontWeight: 700,
                              padding: '2px 6px',
                              borderRadius: 4,
                              border: '1px solid #e2e8f0',
                              background: '#f8fafc',
                              color: '#64748b',
                            }}
                          >
                            {cmd.shortcut}
                          </span>
                        )}
                      </Command.Item>
                    ))}
                  </Command.Group>
                )
              })}
            </Command.List>
          </Command>
        </div>
      )}

      {selected && (
        <div
          style={{
            padding: '10px 16px',
            borderRadius: 8,
            background: '#f0fdf4',
            border: '1px solid #bbf7d0',
            fontSize: 13,
            color: '#15803d',
          }}
        >
          선택됨: <strong>{selected}</strong>
        </div>
      )}
      <p style={{ margin: 0, fontSize: 12, color: '#94a3b8' }}>
        Arrow 키로 탐색, Enter로 선택 (shadcn/ui Cmd+K 패턴)
      </p>
    </div>
  )
}

export const CmdK_팔레트: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'shadcn/ui 공식 Cmd+K 패턴. 그룹화된 명령 목록 + 키보드 단축키 힌트 + 빈 상태 표시를 포함합니다. ' +
          '실무에서는 Dialog 안에 삽입하여 사용합니다.',
      },
    },
  },
  render: () => <CmdKPaletteDemo />,
}

/* --------------------------------------------------------------------------
   설정 검색 패턴
   Radix Combobox / shadcn Settings search 패턴
-------------------------------------------------------------------------- */

const settingsItems = [
  { section: '계정', label: '프로필 편집', desc: '이름, 이메일, 사진 변경' },
  { section: '계정', label: '비밀번호 변경', desc: '현재 비밀번호 확인 후 변경' },
  { section: '계정', label: '2단계 인증', desc: 'SMS 또는 인증 앱으로 보안 강화' },
  { section: '알림', label: '이메일 알림', desc: '주요 활동에 대한 이메일 수신 설정' },
  { section: '알림', label: '푸시 알림', desc: '브라우저 푸시 알림 허용 여부' },
  { section: '알림', label: '알림 요약', desc: '일간/주간 요약 이메일 수신' },
  { section: '외관', label: '다크 모드', desc: '시스템 설정 또는 수동 전환' },
  { section: '외관', label: '언어 설정', desc: '인터페이스 언어 선택' },
  { section: '외관', label: '폰트 크기', desc: '편안한 읽기를 위한 글자 크기 조절' },
  { section: '통합', label: 'Slack 연결', desc: 'Slack 워크스페이스 연동' },
  { section: '통합', label: 'GitHub 연결', desc: 'GitHub 리포지토리 연동 관리' },
]

const SettingsSearchDemo = () => {
  const [recent, setRecent] = useState<string[]>([])

  const handleSelect = (label: string) => {
    setRecent((prev) => [label, ...prev.filter((l) => l !== label)].slice(0, 3))
  }

  return (
    <div style={{ padding: '32px', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: 480 }}>
        <div style={{ marginBottom: 12 }}>
          <p style={{ margin: '0 0 4px', fontSize: 14, fontWeight: 700, color: '#1e293b' }}>설정 검색</p>
          <p style={{ margin: 0, fontSize: 12, color: '#94a3b8' }}>
            설정 항목을 검색하세요. 선택하면 최근 항목에 추가됩니다.
          </p>
        </div>
        <Command
          className="rounded-xl border shadow-sm"
          style={{ maxHeight: 420 }}
        >
          <Command.Input placeholder="설정 항목 검색..." />
          <Command.List>
            <Command.Empty>해당하는 설정 항목이 없습니다.</Command.Empty>

            {recent.length > 0 && (
              <>
                <Command.Group heading="최근 방문">
                  {recent.map((label) => {
                    const item = settingsItems.find((s) => s.label === label)
                    return (
                      <Command.Item key={label} onSelect={() => handleSelect(label)}>
                        <ArrowRightIcon className="mr-2 h-3.5 w-3.5 text-slate-400" />
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600 }}>{label}</div>
                          <div style={{ fontSize: 11, color: '#94a3b8' }}>{item?.desc}</div>
                        </div>
                      </Command.Item>
                    )
                  })}
                </Command.Group>
                <Command.Separator />
              </>
            )}

            {['계정', '알림', '외관', '통합'].map((section) => {
              const items = settingsItems.filter((s) => s.section === section)
              return (
                <Command.Group key={section} heading={section}>
                  {items.map((item) => (
                    <Command.Item key={item.label} onSelect={() => handleSelect(item.label)}>
                      <SettingLineIcon className="mr-2 h-4 w-4 text-slate-400" />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 500 }}>{item.label}</div>
                        <div style={{ fontSize: 11, color: '#94a3b8' }}>{item.desc}</div>
                      </div>
                      <ArrowRightIcon className="h-3.5 w-3.5 text-slate-300" />
                    </Command.Item>
                  ))}
                </Command.Group>
              )
            })}
          </Command.List>
        </Command>
        {recent.length > 0 && (
          <p style={{ marginTop: 8, fontSize: 11, color: '#94a3b8' }}>
            최근 선택: {recent.join(', ')}
          </p>
        )}
      </div>
    </div>
  )
}

export const 설정_검색: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Radix Combobox 패턴 응용. 설정 항목을 섹션별로 그룹화하고 최근 방문 항목을 상단에 표시합니다. ' +
          '선택 이벤트(onSelect)를 통해 상태를 업데이트합니다.',
      },
    },
  },
  render: () => <SettingsSearchDemo />,
}

/* --------------------------------------------------------------------------
   멀티-셀렉트 필터 패턴
   Radix Combobox multi-select 패턴 (shadcn/ui Fancy Multi Select 영감)
-------------------------------------------------------------------------- */

const filterOptions = [
  { value: 'urgent', label: 'Urgent', color: '#ef4444' },
  { value: 'high', label: 'High', color: '#f59e0b' },
  { value: 'medium', label: 'Medium', color: '#6366f1' },
  { value: 'low', label: 'Low', color: '#10b981' },
  { value: 'in-progress', label: 'In Progress', color: '#8b5cf6' },
  { value: 'todo', label: 'Todo', color: '#64748b' },
  { value: 'done', label: 'Done', color: '#22c55e' },
  { value: 'cancelled', label: 'Cancelled', color: '#94a3b8' },
]

const MultiSelectFilterDemo = () => {
  const [selected, setSelected] = useState<string[]>(['urgent', 'in-progress'])

  const toggle = (value: string) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    )
  }

  return (
    <div style={{ padding: '32px', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: 400 }}>
        <div style={{ marginBottom: 12 }}>
          <p style={{ margin: '0 0 4px', fontSize: 14, fontWeight: 700, color: '#1e293b' }}>
            필터 선택 (멀티 셀렉트)
          </p>
          <p style={{ margin: 0, fontSize: 12, color: '#94a3b8' }}>
            항목을 클릭해 토글합니다. 선택된 항목은 체크 표시됩니다.
          </p>
        </div>

        {/* Selected tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12, minHeight: 32 }}>
          {selected.map((v) => {
            const opt = filterOptions.find((o) => o.value === v)
            if (!opt) return null
            return (
              <span
                key={v}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  padding: '2px 8px 2px 10px',
                  borderRadius: 20,
                  background: `${opt.color}1a`,
                  border: `1px solid ${opt.color}44`,
                  fontSize: 12,
                  fontWeight: 600,
                  color: opt.color,
                }}
              >
                {opt.label}
                <button
                  onClick={() => toggle(v)}
                  aria-label={`${opt.label} 제거`}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 1,
                    display: 'flex',
                    color: opt.color,
                    opacity: 0.7,
                  }}
                >
                  <DeleteLineIcon className="h-3 w-3" />
                </button>
              </span>
            )
          })}
          {selected.length === 0 && (
            <span style={{ fontSize: 12, color: '#94a3b8', lineHeight: '28px' }}>
              필터 없음
            </span>
          )}
        </div>

        <Command className="rounded-xl border shadow-sm">
          <Command.Input placeholder="필터 검색..." />
          <Command.List>
            <Command.Empty>해당하는 필터가 없습니다.</Command.Empty>
            <Command.Group heading="우선순위">
              {filterOptions.slice(0, 4).map((opt) => {
                const isSelected = selected.includes(opt.value)
                return (
                  <Command.Item
                    key={opt.value}
                    onSelect={() => toggle(opt.value)}
                    aria-selected={isSelected}
                  >
                    <span
                      style={{
                        display: 'inline-block',
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        background: opt.color,
                        marginRight: 10,
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ flex: 1, fontSize: 13 }}>{opt.label}</span>
                    {isSelected && (
                      <CheckIcon className="h-4 w-4" style={{ color: '#6366f1' }} />
                    )}
                  </Command.Item>
                )
              })}
            </Command.Group>
            <Command.Separator />
            <Command.Group heading="상태">
              {filterOptions.slice(4).map((opt) => {
                const isSelected = selected.includes(opt.value)
                return (
                  <Command.Item
                    key={opt.value}
                    onSelect={() => toggle(opt.value)}
                    aria-selected={isSelected}
                  >
                    <span
                      style={{
                        display: 'inline-block',
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        background: opt.color,
                        marginRight: 10,
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ flex: 1, fontSize: 13 }}>{opt.label}</span>
                    {isSelected && (
                      <CheckIcon className="h-4 w-4" style={{ color: '#6366f1' }} />
                    )}
                  </Command.Item>
                )
              })}
            </Command.Group>
          </Command.List>
        </Command>

        <p style={{ marginTop: 10, fontSize: 11, color: '#94a3b8' }}>
          선택된 필터 {selected.length}개 | Arrow / Enter 키보드 지원
        </p>
      </div>
    </div>
  )
}

export const 멀티셀렉트_필터: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'shadcn/ui Fancy Multi Select 패턴. Command.Item의 onSelect를 활용해 체크 토글 상태를 관리합니다. ' +
          '선택된 항목은 상단에 태그로 표시되며 개별 제거가 가능합니다.',
      },
    },
  },
  render: () => <MultiSelectFilterDemo />,
}

/* --------------------------------------------------------------------------
   Raycast 스포트라이트 런처 패턴
   앱/파일/액션을 빠르게 실행하는 macOS Spotlight 스타일
-------------------------------------------------------------------------- */

const spotlightItems = [
  { category: '최근', icon: '🕒', label: '스탠드업 미팅', sub: '오늘 오전 10:00', action: '참여' },
  { category: '최근', icon: '📄', label: 'Q4 리뷰 문서', sub: '어제 수정됨', action: '열기' },
  { category: '앱', icon: '💬', label: 'Slack', sub: '메시지 앱', action: '실행' },
  { category: '앱', icon: '🎨', label: 'Figma', sub: '디자인 도구', action: '실행' },
  { category: '앱', icon: '🖥️', label: 'VS Code', sub: '코드 에디터', action: '실행' },
  { category: '액션', icon: '📋', label: '클립보드 기록 보기', sub: 'Cmd+Shift+V', action: '실행' },
  { category: '액션', icon: '🔍', label: '웹에서 검색', sub: 'Google 검색', action: '검색' },
]

const RaycastSpotlightDemo = () => {
  const [result, setResult] = useState<string | null>(null)
  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <div
        style={{
          width: 560,
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 32px 64px rgba(0,0,0,0.24)',
          border: '1px solid rgba(255,255,255,0.08)',
          background: '#1c1c1e',
        }}
      >
        <Command style={{ background: 'transparent', color: '#f5f5f5' }}>
          <Command.Input
            placeholder="앱, 파일, 액션 검색..."
            style={{ background: 'transparent', color: '#f5f5f5', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
          />
          <Command.List style={{ maxHeight: 360 }}>
            <Command.Empty style={{ color: '#888', textAlign: 'center', padding: '24px 0' }}>
              결과 없음
            </Command.Empty>
            {['최근', '앱', '액션'].map((cat) => {
              const items = spotlightItems.filter((i) => i.category === cat)
              return (
                <Command.Group
                  key={cat}
                  heading={cat}
                  style={{ color: '#666' }}
                >
                  {items.map((item) => (
                    <Command.Item
                      key={item.label}
                      onSelect={() => setResult(`${item.action}: ${item.label}`)}
                      style={{ borderRadius: 8, margin: '1px 4px' }}
                    >
                      <span style={{ fontSize: 18, marginRight: 12, width: 28, textAlign: 'center' }}>{item.icon}</span>
                      <span style={{ flex: 1 }}>
                        <span style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#f5f5f5' }}>
                          {item.label}
                        </span>
                        <span style={{ display: 'block', fontSize: 11, color: '#888', marginTop: 1 }}>
                          {item.sub}
                        </span>
                      </span>
                      <span
                        style={{
                          fontSize: 11,
                          color: '#666',
                          padding: '3px 8px',
                          borderRadius: 6,
                          border: '1px solid rgba(255,255,255,0.1)',
                          background: 'rgba(255,255,255,0.05)',
                        }}
                      >
                        {item.action}
                      </span>
                    </Command.Item>
                  ))}
                </Command.Group>
              )
            })}
          </Command.List>
          <div
            style={{
              display: 'flex',
              gap: 16,
              padding: '8px 16px',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              fontSize: 11,
              color: '#555',
            }}
          >
            <span>↑↓ 탐색</span>
            <span>↵ 실행</span>
            <span>Esc 닫기</span>
          </div>
        </Command>
      </div>
      {result && (
        <div style={{ fontSize: 12, color: '#6366f1', fontWeight: 600 }}>
          ✓ {result}
        </div>
      )}
    </div>
  )
}

export const Raycast_스포트라이트_런처: Story = {
  name: 'Raycast - 다크 스포트라이트 런처 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Raycast macOS 런처 스타일. 다크 배경 + 앱/파일/액션 카테고리 그룹 + 아이콘 + 서브 텍스트 + 단축키 힌트 ' +
          '하단 푸터를 갖춘 풀 스포트라이트 UI입니다.',
      },
    },
  },
  render: () => <RaycastSpotlightDemo />,
}

/* --------------------------------------------------------------------------
   Linear 퀵 스위처 패턴
   프로젝트/팀 전환을 위한 Linear-style quick switcher
-------------------------------------------------------------------------- */

const workspaces = [
  { type: '팀', icon: '🚀', label: 'Platform', sub: '12개 이슈', color: '#6366f1' },
  { type: '팀', icon: '🎨', label: 'Design System', sub: '8개 이슈', color: '#8b5cf6' },
  { type: '팀', icon: '📱', label: 'Mobile', sub: '23개 이슈', color: '#06b6d4' },
  { type: '프로젝트', icon: '📌', label: 'Q4 OKR', sub: '완료 72%', color: '#10b981' },
  { type: '프로젝트', icon: '🔧', label: 'Auth 리팩토링', sub: '진행 중', color: '#f59e0b' },
  { type: '뷰', icon: '👁️', label: '내 이슈', sub: '5개', color: '#64748b' },
  { type: '뷰', icon: '📅', label: '이번 주 마감', sub: '3개', color: '#ef4444' },
]

const LinearQuickSwitcherDemo = () => {
  const [active, setActive] = useState('Design System')
  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4 }}>
        현재 워크스페이스: <strong style={{ color: '#6366f1' }}>{active}</strong>
      </div>
      <div style={{ width: 440, borderRadius: 12, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.12)', border: '1px solid #e2e8f0' }}>
        <Command>
          <Command.Input placeholder="팀, 프로젝트, 뷰 전환..." />
          <Command.List style={{ maxHeight: 320 }}>
            <Command.Empty>
              <span style={{ color: '#94a3b8', fontSize: 13 }}>일치하는 워크스페이스 없음</span>
            </Command.Empty>
            {['팀', '프로젝트', '뷰'].map((type) => {
              const items = workspaces.filter((w) => w.type === type)
              return (
                <Command.Group key={type} heading={type}>
                  {items.map((ws) => (
                    <Command.Item
                      key={ws.label}
                      onSelect={() => setActive(ws.label)}
                    >
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 28,
                          height: 28,
                          borderRadius: 8,
                          background: `${ws.color}1a`,
                          marginRight: 10,
                          fontSize: 14,
                          flexShrink: 0,
                        }}
                      >
                        {ws.icon}
                      </span>
                      <span style={{ flex: 1 }}>
                        <span style={{ display: 'block', fontSize: 13, fontWeight: ws.label === active ? 700 : 500, color: ws.label === active ? ws.color : '#1e293b' }}>
                          {ws.label}
                        </span>
                        <span style={{ display: 'block', fontSize: 11, color: '#94a3b8' }}>{ws.sub}</span>
                      </span>
                      {ws.label === active && (
                        <CheckIcon className="h-4 w-4" style={{ color: ws.color }} />
                      )}
                    </Command.Item>
                  ))}
                </Command.Group>
              )
            })}
          </Command.List>
        </Command>
      </div>
    </div>
  )
}

export const Linear_퀵_스위처: Story = {
  name: 'Linear - 팀/프로젝트/뷰 퀵 스위처 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Linear 퀵 스위처 패턴. 팀·프로젝트·뷰를 그룹으로 분리, 선택된 항목은 컬러 체크 표시. ' +
          '워크스페이스 컨텍스트 전환 UX에 최적화된 Command 활용법입니다.',
      },
    },
  },
  render: () => <LinearQuickSwitcherDemo />,
}

/* --------------------------------------------------------------------------
   Vercel 글로벌 검색 패턴
   배포/도메인/팀/프로젝트를 한 곳에서 검색하는 Vercel Dashboard 패턴
-------------------------------------------------------------------------- */

const vercelResults = [
  { type: '배포', icon: '🚀', label: 'orbit-ui – main', sub: 'prod • 2분 전', status: 'READY', statusColor: '#10b981' },
  { type: '배포', icon: '🚀', label: 'orbit-ui – feat/tokens', sub: 'preview • 10분 전', status: 'BUILDING', statusColor: '#f59e0b' },
  { type: '프로젝트', icon: '📦', label: 'orbit-ui', sub: 'blue45fs-projects', status: '', statusColor: '' },
  { type: '프로젝트', icon: '📦', label: 'orbit-landing', sub: 'blue45fs-projects', status: '', statusColor: '' },
  { type: '도메인', icon: '🌐', label: 'orbit-ui.vercel.app', sub: '프로덕션 도메인', status: 'ACTIVE', statusColor: '#10b981' },
]

const VercelGlobalSearchDemo = () => {
  const [picked, setPicked] = useState<string | null>(null)
  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <div style={{ width: 520, borderRadius: 12, overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
        <Command>
          <Command.Input placeholder="배포, 프로젝트, 도메인 검색..." />
          <Command.List style={{ maxHeight: 360 }}>
            <Command.Empty>
              <span style={{ color: '#94a3b8', fontSize: 13 }}>검색 결과 없음</span>
            </Command.Empty>
            {['배포', '프로젝트', '도메인'].map((type) => {
              const items = vercelResults.filter((r) => r.type === type)
              return (
                <Command.Group key={type} heading={type}>
                  {items.map((item) => (
                    <Command.Item
                      key={item.label}
                      onSelect={() => setPicked(item.label)}
                    >
                      <span style={{ fontSize: 16, marginRight: 10, width: 24, textAlign: 'center' }}>{item.icon}</span>
                      <span style={{ flex: 1 }}>
                        <span style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#111827' }}>{item.label}</span>
                        <span style={{ display: 'block', fontSize: 11, color: '#9ca3af' }}>{item.sub}</span>
                      </span>
                      {item.status && (
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            color: item.statusColor,
                            padding: '2px 8px',
                            borderRadius: 20,
                            background: `${item.statusColor}18`,
                            border: `1px solid ${item.statusColor}44`,
                            letterSpacing: '0.03em',
                          }}
                        >
                          {item.status}
                        </span>
                      )}
                    </Command.Item>
                  ))}
                </Command.Group>
              )
            })}
          </Command.List>
          <div style={{ padding: '8px 16px', borderTop: '1px solid #f3f4f6', display: 'flex', gap: 16, fontSize: 11, color: '#9ca3af' }}>
            <span>↑↓ 탐색</span>
            <span>↵ 선택</span>
          </div>
        </Command>
      </div>
      {picked && (
        <div style={{ fontSize: 12, color: '#6366f1', fontWeight: 600 }}>
          ✓ 선택됨: {picked}
        </div>
      )}
    </div>
  )
}

export const Vercel_글로벌_검색: Story = {
  name: 'Vercel - 배포/프로젝트/도메인 글로벌 검색 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Vercel Dashboard 글로벌 검색 패턴. 배포 상태 뱃지(READY/BUILDING/ACTIVE)를 컬러 필로 표시, ' +
          '프로젝트·도메인 그룹화, 간결한 결과 리스트가 특징입니다.',
      },
    },
  },
  render: () => <VercelGlobalSearchDemo />,
}
