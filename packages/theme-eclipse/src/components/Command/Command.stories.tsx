import React, { useState } from 'react'
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

/* --------------------------------------------------------------------------
   shadcn/ui 벤치마크: 최근 명령 히스토리 + 즐겨찾기 패턴
   shadcn/ui CMDK 공식 예제 — 최근 사용 항목을 상단에 표시하는 패턴
-------------------------------------------------------------------------- */
const RECENT_COMMANDS = [
  { id: 'r1', label: '대시보드로 이동', group: '최근', icon: <HomeLineIcon className="h-4 w-4" />, shortcut: 'G D' },
  { id: 'r2', label: '새 이슈 만들기', group: '최근', icon: <CircleInfoLineIcon className="h-4 w-4" />, shortcut: 'C' },
  { id: 'r3', label: '내 프로필', group: '최근', icon: <OnePersonLineIcon className="h-4 w-4" />, shortcut: 'G P' },
]

const ALL_COMMANDS = [
  { id: 'n1', label: '대시보드로 이동', group: '페이지', icon: <HomeLineIcon className="h-4 w-4" />, shortcut: 'G D' },
  { id: 'n2', label: '팀 관리', group: '페이지', icon: <OnePersonLineIcon className="h-4 w-4" />, shortcut: 'G T' },
  { id: 'n3', label: '설정 열기', group: '페이지', icon: <SettingLineIcon className="h-4 w-4" />, shortcut: 'G S' },
  { id: 'n4', label: '새 이슈 만들기', group: '액션', icon: <CircleInfoLineIcon className="h-4 w-4" />, shortcut: 'C' },
  { id: 'n5', label: '즐겨찾기 추가', group: '액션', icon: <StarLineIcon className="h-4 w-4" />, shortcut: 'F' },
  { id: 'n6', label: '알림 설정', group: '액션', icon: <NotificationLineIcon className="h-4 w-4" />, shortcut: 'N' },
]

function CommandHistoryDemo() {
  const [query, setQuery] = useState('')
  const [favorites, setFavorites] = useState<Set<string>>(new Set(['n1']))

  const filtered = query.length === 0
    ? { recent: RECENT_COMMANDS, all: [] }
    : {
      recent: [],
      all: ALL_COMMANDS.filter((c) =>
        c.label.toLowerCase().includes(query.toLowerCase()) ||
        c.group.toLowerCase().includes(query.toLowerCase())
      ),
    }

  const toggleFav = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div style={{ maxWidth: 480, margin: '0 auto' }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
        shadcn/ui CMDK — 최근 명령 히스토리 패턴
      </div>
      <Command className="rounded-lg border shadow-md">
        <Command.Input
          placeholder="명령어 검색..."
          value={query}
          onValueChange={setQuery}
        />
        <Command.List>
          <Command.Empty>검색 결과가 없습니다.</Command.Empty>

          {filtered.recent.length > 0 && (
            <Command.Group heading="최근 사용">
              {filtered.recent.map((cmd) => (
                <Command.Item key={cmd.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {cmd.icon}
                    <span>{cmd.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: 10, color: '#94a3b8', background: '#f1f5f9', padding: '1px 5px', borderRadius: 4 }}>
                      {cmd.shortcut}
                    </span>
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleFav(cmd.id) }}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px' }}
                    >
                      <StarLineIcon className="h-3 w-3" style={{ color: favorites.has(cmd.id) ? '#f59e0b' : '#cbd5e1' }} />
                    </button>
                  </div>
                </Command.Item>
              ))}
            </Command.Group>
          )}

          {query.length === 0 && (
            <Command.Group heading="즐겨찾기">
              {ALL_COMMANDS.filter((c) => favorites.has(c.id)).map((cmd) => (
                <Command.Item key={cmd.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {cmd.icon}
                    <span>{cmd.label}</span>
                  </div>
                  <StarLineIcon className="h-3 w-3" style={{ color: '#f59e0b' }} />
                </Command.Item>
              ))}
              {ALL_COMMANDS.filter((c) => favorites.has(c.id)).length === 0 && (
                <Command.Item disabled>
                  <span style={{ color: '#94a3b8', fontSize: 12 }}>즐겨찾기 항목이 없습니다. 별표를 눌러 추가하세요.</span>
                </Command.Item>
              )}
            </Command.Group>
          )}

          {filtered.all.length > 0 && (
            <>
              {['페이지', '액션'].map((group) => {
                const items = filtered.all.filter((c) => c.group === group)
                if (items.length === 0) return null
                return (
                  <Command.Group key={group} heading={group}>
                    {items.map((cmd) => (
                      <Command.Item key={cmd.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {cmd.icon}
                          <span>{cmd.label}</span>
                        </div>
                        <span style={{ fontSize: 10, color: '#94a3b8', background: '#f1f5f9', padding: '1px 5px', borderRadius: 4 }}>
                          {cmd.shortcut}
                        </span>
                      </Command.Item>
                    ))}
                  </Command.Group>
                )
              })}
            </>
          )}
        </Command.List>
      </Command>
      <p style={{ marginTop: 10, fontSize: 11, color: '#94a3b8' }}>
        shadcn/ui CMDK — 최근 명령 + 즐겨찾기 패턴 (별표로 즐겨찾기 토글)
      </p>
    </div>
  )
}

export const shadcn_최근_명령_히스토리: Story = {
  name: 'shadcn/ui - 최근 명령 히스토리 + 즐겨찾기 패턴',
  render: () => <CommandHistoryDemo />,
}

/* --------------------------------------------------------------------------
   Vercel 벤치마크: 팀 전환 명령 팔레트
   Vercel 팀 선택 + 최근 프로젝트 이동 패턴
-------------------------------------------------------------------------- */
type VercelTeam = { id: string; name: string; plan: 'free' | 'pro' | 'enterprise'; members: number }

const VERCEL_TEAMS: VercelTeam[] = [
  { id: 't1', name: 'Personal', plan: 'pro', members: 1 },
  { id: 't2', name: 'orbit-ui', plan: 'pro', members: 4 },
  { id: 't3', name: 'heejun-labs', plan: 'free', members: 2 },
  { id: 't4', name: 'enterprise-corp', plan: 'enterprise', members: 24 },
]

const VERCEL_PROJECTS = [
  { id: 'p1', name: 'orbit-ui-docs', team: 't2', status: 'READY' as const },
  { id: 'p2', name: 'personal-blog', team: 't1', status: 'READY' as const },
  { id: 'p3', name: 'design-tokens', team: 't2', status: 'BUILDING' as const },
  { id: 'p4', name: 'api-gateway', team: 't4', status: 'ERROR' as const },
]

const PLAN_CONFIG = {
  free: { color: '#94a3b8', label: 'Free' },
  pro: { color: '#6366f1', label: 'Pro' },
  enterprise: { color: '#f59e0b', label: 'Enterprise' },
}

const STATUS_CONFIG = {
  READY: { color: '#10b981', dot: '#10b981' },
  BUILDING: { color: '#f59e0b', dot: '#f59e0b' },
  ERROR: { color: '#ef4444', dot: '#ef4444' },
}

function VercelTeamSwitcherDemo() {
  const [query, setQuery] = useState('')
  const [activeTeam, setActiveTeam] = useState('t2')

  const teamFiltered = VERCEL_TEAMS.filter((t) =>
    t.name.toLowerCase().includes(query.toLowerCase())
  )
  const projectFiltered = VERCEL_PROJECTS.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div style={{ maxWidth: 480, margin: '0 auto' }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#000', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
        Vercel — 팀 전환 + 프로젝트 이동 팔레트
      </div>
      <Command className="rounded-lg border shadow-md" style={{ background: '#fff' }}>
        <Command.Input
          placeholder="팀 또는 프로젝트 검색..."
          value={query}
          onValueChange={setQuery}
        />
        <Command.List>
          <Command.Empty>검색 결과가 없습니다.</Command.Empty>

          <Command.Group heading="팀 전환">
            {teamFiltered.map((team) => {
              const plan = PLAN_CONFIG[team.plan]
              return (
                <Command.Item
                  key={team.id}
                  onSelect={() => setActiveTeam(team.id)}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div style={{
                      width: 20, height: 20, borderRadius: 4,
                      background: `${plan.color}20`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 10, fontWeight: 800, color: plan.color,
                    }}>
                      {team.name[0].toUpperCase()}
                    </div>
                    <span>{team.name}</span>
                    <span style={{ fontSize: 10, fontWeight: 700, color: plan.color, background: `${plan.color}15`, padding: '1px 5px', borderRadius: 3 }}>
                      {plan.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: 11, color: '#94a3b8' }}>{team.members}명</span>
                    {activeTeam === team.id && (
                      <CheckIcon className="h-4 w-4" style={{ color: '#6366f1' }} />
                    )}
                  </div>
                </Command.Item>
              )
            })}
          </Command.Group>

          <Command.Separator />

          <Command.Group heading="최근 프로젝트">
            {projectFiltered.map((project) => {
              const statusCfg = STATUS_CONFIG[project.status]
              const teamName = VERCEL_TEAMS.find((t) => t.id === project.team)?.name
              return (
                <Command.Item key={project.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ArrowRightIcon className="h-4 w-4" style={{ color: '#94a3b8' }} />
                    <span>{project.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: 11, color: '#94a3b8' }}>{teamName}</span>
                    <div style={{
                      width: 7, height: 7, borderRadius: '50%',
                      background: statusCfg.dot,
                    }} />
                    <span style={{ fontSize: 10, fontWeight: 700, color: statusCfg.color }}>
                      {project.status}
                    </span>
                  </div>
                </Command.Item>
              )
            })}
          </Command.Group>
        </Command.List>
      </Command>
      <p style={{ marginTop: 10, fontSize: 11, color: '#94a3b8' }}>
        Vercel — 팀 선택(체크마크 표시) + 배포 상태 색상 인디케이터 패턴
      </p>
    </div>
  )
}

export const Vercel_팀_전환_팔레트: Story = {
  name: 'Vercel - 팀 전환 + 프로젝트 이동 팔레트',
  render: () => <VercelTeamSwitcherDemo />,
}

/* --------------------------------------------------------------------------
   shadcn/ui 벤치마크: 다단계 드릴다운 팔레트
   shadcn/ui의 pages 패턴 — 하위 명령 선택 시 새 레벨로 전환
-------------------------------------------------------------------------- */
type DrillPage = 'root' | 'theme' | 'team' | 'account'

const DRILLDOWN_TREE: Record<DrillPage, { heading: string; items: { label: string; icon: React.ReactElement; target?: DrillPage; desc?: string }[] }> = {
  root: {
    heading: '명령',
    items: [
      { label: '테마 설정', icon: <SettingLineIcon className="h-4 w-4" />, target: 'theme', desc: '색상, 폰트 설정' },
      { label: '팀 관리', icon: <OnePersonLineIcon className="h-4 w-4" />, target: 'team', desc: '멤버, 권한 관리' },
      { label: '계정 설정', icon: <CircleInfoLineIcon className="h-4 w-4" />, target: 'account', desc: '프로필, 보안' },
      { label: '알림 센터', icon: <NotificationLineIcon className="h-4 w-4" />, desc: '알림 목록 보기' },
    ],
  },
  theme: {
    heading: '테마 설정',
    items: [
      { label: '라이트 모드 적용', icon: <StarLineIcon className="h-4 w-4" /> },
      { label: '다크 모드 적용', icon: <StarLineIcon className="h-4 w-4" /> },
      { label: '시스템 설정 따르기', icon: <SettingLineIcon className="h-4 w-4" /> },
    ],
  },
  team: {
    heading: '팀 관리',
    items: [
      { label: '멤버 초대', icon: <OnePersonLineIcon className="h-4 w-4" /> },
      { label: '권한 설정', icon: <SettingLineIcon className="h-4 w-4" /> },
      { label: '팀 삭제', icon: <DeleteLineIcon className="h-4 w-4" /> },
    ],
  },
  account: {
    heading: '계정 설정',
    items: [
      { label: '프로필 편집', icon: <OnePersonLineIcon className="h-4 w-4" /> },
      { label: '비밀번호 변경', icon: <SettingLineIcon className="h-4 w-4" /> },
      { label: '2단계 인증', icon: <CheckIcon className="h-4 w-4" /> },
    ],
  },
}

function CommandDrilldownDemo() {
  const [page, setPage] = useState<DrillPage>('root')
  const [query, setQuery] = useState('')

  const current = DRILLDOWN_TREE[page]

  const filtered = current.items.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div style={{ maxWidth: 480, margin: '0 auto' }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
        shadcn/ui — pages 패턴 (드릴다운 팔레트)
      </div>
      <Command className="rounded-lg border shadow-md">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderBottom: '1px solid #f1f5f9' }}>
          {page !== 'root' && (
            <button
              onClick={() => { setPage('root'); setQuery('') }}
              style={{
                padding: '2px 8px', borderRadius: 4, border: '1px solid #e2e8f0',
                background: '#fff', fontSize: 11, cursor: 'pointer', color: '#64748b',
              }}
            >
              ← 뒤로
            </button>
          )}
          <span style={{ fontSize: 12, fontWeight: 600, color: '#64748b' }}>{current.heading}</span>
        </div>
        <Command.Input
          placeholder={`${current.heading} 내 검색...`}
          value={query}
          onValueChange={setQuery}
        />
        <Command.List>
          <Command.Empty>검색 결과가 없습니다.</Command.Empty>
          <Command.Group>
            {filtered.map((item) => (
              <Command.Item
                key={item.label}
                onSelect={() => {
                  if (item.target) { setPage(item.target); setQuery('') }
                }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  {item.icon}
                  <div>
                    <div>{item.label}</div>
                    {item.desc && (
                      <div style={{ fontSize: 11, color: '#94a3b8' }}>{item.desc}</div>
                    )}
                  </div>
                </div>
                {item.target && (
                  <ArrowRightIcon className="h-3 w-3" style={{ color: '#94a3b8' }} />
                )}
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>
      </Command>
      <p style={{ marginTop: 10, fontSize: 11, color: '#94a3b8' }}>
        shadcn/ui — pages 드릴다운 패턴 (선택 시 하위 레벨 전환)
      </p>
    </div>
  )
}

export const shadcn_드릴다운_팔레트: Story = {
  name: 'shadcn/ui - pages 패턴 드릴다운 팔레트',
  render: () => <CommandDrilldownDemo />,
}

// --- Cycle 73: Mantine + Raycast benchmark ---

const MantineSpotlightRender = () => {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<string | null>(null)

  const RECENT = ['대시보드', '사용자 관리', '알림 설정']
  const ALL_ACTIONS = [
    { group: '페이지', icon: <HomeLineIcon className="h-4 w-4" />, label: '대시보드', desc: '메인 대시보드로 이동', shortcut: 'G D' },
    { group: '페이지', icon: <OnePersonLineIcon className="h-4 w-4" />, label: '사용자 관리', desc: '팀 멤버 관리', shortcut: 'G U' },
    { group: '페이지', icon: <SettingLineIcon className="h-4 w-4" />, label: '설정', desc: '계정 및 환경설정', shortcut: 'G S' },
    { group: '작업', icon: <StarLineIcon className="h-4 w-4" />, label: '즐겨찾기 추가', desc: '현재 페이지를 즐겨찾기', shortcut: 'Ctrl F' },
    { group: '작업', icon: <NotificationLineIcon className="h-4 w-4" />, label: '알림 설정', desc: '알림 환경설정 열기', shortcut: 'Ctrl N' },
    { group: '도움말', icon: <CircleInfoLineIcon className="h-4 w-4" />, label: '문서 보기', desc: 'Orbit UI 공식 문서', shortcut: '?' },
  ]

  const filtered = query
    ? ALL_ACTIONS.filter((a) =>
        a.label.toLowerCase().includes(query.toLowerCase()) ||
        a.desc.toLowerCase().includes(query.toLowerCase())
      )
    : ALL_ACTIONS

  const groups: Record<string, typeof ALL_ACTIONS> = {}
  for (const a of filtered) {
    if (!groups[a.group]) groups[a.group] = []
    groups[a.group].push(a)
  }

  return (
    <div style={{ width: 520, fontFamily: 'system-ui, sans-serif' }}>
      <Command className="rounded-xl border shadow-xl overflow-hidden">
        <div style={{ padding: '12px 16px 0', borderBottom: '1px solid #f1f5f9' }}>
          <Command.Input
            placeholder="작업 또는 페이지 검색..."
            value={query}
            onValueChange={setQuery}
            style={{ fontSize: 16, fontWeight: 500 }}
          />
        </div>
        <Command.List style={{ maxHeight: 380 }}>
          <Command.Empty>
            <div style={{ padding: '24px 0', textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>
              검색 결과 없음
            </div>
          </Command.Empty>
          {!query && (
            <Command.Group heading="최근 방문">
              {RECENT.map((r) => (
                <Command.Item key={r} onSelect={() => setSelected(r)} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 12, color: '#94a3b8' }}>↺</span>
                  <span>{r}</span>
                </Command.Item>
              ))}
            </Command.Group>
          )}
          {Object.entries(groups).map(([groupName, items]) => (
            <Command.Group key={groupName} heading={groupName}>
              {items.map((a) => (
                <Command.Item
                  key={a.label}
                  onSelect={() => setSelected(a.label)}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 30, height: 30, borderRadius: 7, background: '#f8fafc',
                      border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#475569',
                    }}>
                      {a.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>{a.label}</div>
                      <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 1 }}>{a.desc}</div>
                    </div>
                  </div>
                  <kbd style={{
                    fontSize: 10, fontFamily: 'monospace', background: '#f1f5f9',
                    border: '1px solid #e2e8f0', borderRadius: 4, padding: '2px 5px', color: '#64748b',
                  }}>
                    {a.shortcut}
                  </kbd>
                </Command.Item>
              ))}
            </Command.Group>
          ))}
        </Command.List>
        {selected && (
          <div style={{
            padding: '8px 16px', borderTop: '1px solid #f1f5f9',
            fontSize: 12, color: '#64748b', display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <CheckIcon className="h-3 w-3" style={{ color: '#22c55e' }} />
            <span>선택됨: <strong>{selected}</strong></span>
          </div>
        )}
      </Command>
      <p style={{ marginTop: 10, fontSize: 11, color: '#94a3b8' }}>
        Mantine Spotlight — 그룹별 단축키 + 최근 방문 패턴
      </p>
    </div>
  )
}

export const Mantine_Spotlight_팔레트: Story = {
  name: 'Mantine - Spotlight 그룹별 단축키 팔레트',
  parameters: {
    docs: {
      description: {
        story:
          'Mantine Spotlight 컴포넌트 벤치마크. 그룹별 액션 분류, 키보드 단축키 배지, 최근 방문 섹션을 조합한 생산성 팔레트 패턴.',
      },
    },
  },
  render: () => <MantineSpotlightRender />,
}

type RaycastActionCategory = 'all' | 'clipboard' | 'window' | 'system'

const RaycastActionPanelRender = () => {
  const [searchVal, setSearchVal] = useState('')
  const [activeCategory, setActiveCategory] = useState<RaycastActionCategory>('all')
  const [pinned, setPinned] = useState<string[]>(['클립보드 히스토리', '창 크기 조절'])

  const CATEGORIES: { id: RaycastActionCategory; label: string }[] = [
    { id: 'all', label: '전체' },
    { id: 'clipboard', label: '클립보드' },
    { id: 'window', label: '창 관리' },
    { id: 'system', label: '시스템' },
  ]

  const ACTIONS: { id: string; category: RaycastActionCategory; label: string; desc: string; shortcut: string }[] = [
    { id: 'clip-hist', category: 'clipboard', label: '클립보드 히스토리', desc: '최근 복사 항목 보기', shortcut: '⌘⇧V' },
    { id: 'clip-clear', category: 'clipboard', label: '클립보드 지우기', desc: '클립보드 내용 삭제', shortcut: '⌘⌥C' },
    { id: 'win-resize', category: 'window', label: '창 크기 조절', desc: '좌/우/전체 분할', shortcut: '⌃⌥→' },
    { id: 'win-focus', category: 'window', label: '다음 창으로 이동', desc: 'App 간 포커스 이동', shortcut: '⌘`' },
    { id: 'sys-sleep', category: 'system', label: '화면 잠금', desc: '화면을 즉시 잠금', shortcut: '⌃⌘Q' },
    { id: 'sys-vol', category: 'system', label: '볼륨 조절', desc: '시스템 볼륨 제어', shortcut: 'F10-12' },
  ]

  const filtered = ACTIONS
    .filter((a) => activeCategory === 'all' || a.category === activeCategory)
    .filter((a) =>
      !searchVal ||
      a.label.toLowerCase().includes(searchVal.toLowerCase()) ||
      a.desc.toLowerCase().includes(searchVal.toLowerCase())
    )

  const togglePin = (label: string) => {
    setPinned((prev) => prev.includes(label) ? prev.filter((p) => p !== label) : [...prev, label])
  }

  return (
    <div style={{ width: 480, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{
        background: '#0f172a', borderRadius: 12, overflow: 'hidden',
        border: '1px solid #1e293b', boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
      }}>
        <div style={{ padding: '10px 14px', borderBottom: '1px solid #1e293b', display: 'flex', gap: 8 }}>
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              style={{
                padding: '3px 10px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 11,
                background: activeCategory === c.id ? '#3b82f6' : 'transparent',
                color: activeCategory === c.id ? '#fff' : '#94a3b8',
                fontWeight: activeCategory === c.id ? 600 : 400,
              }}
            >
              {c.label}
            </button>
          ))}
        </div>
        <Command style={{ background: 'transparent' }}>
          <Command.Input
            placeholder="액션 검색..."
            value={searchVal}
            onValueChange={setSearchVal}
            style={{ background: 'transparent', color: '#f8fafc', fontSize: 14 }}
          />
          <Command.List style={{ maxHeight: 320 }}>
            <Command.Empty>
              <div style={{ padding: '20px 0', textAlign: 'center', color: '#475569', fontSize: 12 }}>
                액션 없음
              </div>
            </Command.Empty>
            {pinned.length > 0 && (
              <Command.Group heading="고정됨" style={{ color: '#475569' }}>
                {pinned.map((p) => (
                  <Command.Item key={p} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#f1f5f9' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <StarLineIcon className="h-3 w-3" style={{ color: '#f59e0b' }} />
                      <span style={{ fontSize: 13 }}>{p}</span>
                    </div>
                    <button onClick={() => togglePin(p)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#475569', fontSize: 11 }}>해제</button>
                  </Command.Item>
                ))}
              </Command.Group>
            )}
            <Command.Group heading="액션" style={{ color: '#475569' }}>
              {filtered.map((a) => (
                <Command.Item key={a.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#f1f5f9' }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{a.label}</div>
                    <div style={{ fontSize: 11, color: '#475569', marginTop: 1 }}>{a.desc}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <button
                      onClick={() => togglePin(a.label)}
                      style={{
                        background: 'none', border: 'none', cursor: 'pointer', fontSize: 10,
                        color: pinned.includes(a.label) ? '#f59e0b' : '#475569',
                      }}
                    >
                      {pinned.includes(a.label) ? '★' : '☆'}
                    </button>
                    <kbd style={{ fontSize: 10, fontFamily: 'monospace', color: '#64748b' }}>{a.shortcut}</kbd>
                  </div>
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>
        </Command>
      </div>
      <p style={{ marginTop: 10, fontSize: 11, color: '#94a3b8' }}>
        Raycast Action Panel — 다크 팔레트, 카테고리 필터, 핀 고정 패턴
      </p>
    </div>
  )
}

export const Raycast_액션_패널: Story = {
  name: 'Raycast - 액션 패널 (다크 + 카테고리 필터)',
  parameters: {
    docs: {
      description: {
        story:
          'Raycast Extension Action Panel 벤치마크. 다크 팔레트, 카테고리 탭 필터, 핀 고정(즐겨찾기), 단축키 오버레이 패턴.',
      },
    },
  },
  render: () => <RaycastActionPanelRender />,
}

const MantineCommandHistoryRender = () => {
  const [query, setQuery] = useState('')
  const [history, setHistory] = useState(['사용자 초대', '프로젝트 생성', '결제 내역 조회'])
  const [lastRun, setLastRun] = useState<string | null>(null)

  const COMMANDS = [
    { label: '새 프로젝트 생성', icon: <StarLineIcon className="h-3.5 w-3.5" />, tag: '빠른 작업', color: '#6366f1' },
    { label: '사용자 초대', icon: <OnePersonLineIcon className="h-3.5 w-3.5" />, tag: '팀', color: '#0ea5e9' },
    { label: '알림 일괄 읽음', icon: <NotificationLineIcon className="h-3.5 w-3.5" />, tag: '알림', color: '#f59e0b' },
    { label: '결제 내역 조회', icon: <SearchIcon className="h-3.5 w-3.5" />, tag: '관리', color: '#22c55e' },
    { label: '접근성 보고서', icon: <CircleInfoLineIcon className="h-3.5 w-3.5" />, tag: '분석', color: '#8b5cf6' },
    { label: '캐시 지우기', icon: <DeleteLineIcon className="h-3.5 w-3.5" />, tag: '시스템', color: '#ef4444' },
  ]

  const filtered = COMMANDS.filter((c) =>
    !query || c.label.toLowerCase().includes(query.toLowerCase())
  )

  const runCommand = (label: string) => {
    setLastRun(label)
    setHistory((prev) => [label, ...prev.filter((h) => h !== label)].slice(0, 5))
  }

  const historyFiltered = history.filter((h) => COMMANDS.some((c) => c.label === h))

  return (
    <div style={{ width: 460, fontFamily: 'system-ui, sans-serif' }}>
      <Command className="rounded-xl border shadow-lg">
        <Command.Input
          placeholder="명령 실행..."
          value={query}
          onValueChange={setQuery}
        />
        <Command.List style={{ maxHeight: 360 }}>
          <Command.Empty>
            <div style={{ padding: '20px 0', textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>
              명령을 찾을 수 없습니다
            </div>
          </Command.Empty>
          {!query && historyFiltered.length > 0 && (
            <Command.Group heading="최근 실행">
              {historyFiltered.map((h) => {
                const cmd = COMMANDS.find((c) => c.label === h)
                if (!cmd) return null
                return (
                  <Command.Item key={h} onSelect={() => runCommand(h)} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 11, color: '#94a3b8' }}>↺</span>
                    <span style={{ fontSize: 13 }}>{h}</span>
                    <span style={{
                      marginLeft: 'auto', fontSize: 10, padding: '1px 6px', borderRadius: 4,
                      background: '#f1f5f9', color: '#64748b',
                    }}>
                      {cmd.tag}
                    </span>
                  </Command.Item>
                )
              })}
            </Command.Group>
          )}
          <Command.Group heading="모든 명령">
            {filtered.map((c) => (
              <Command.Item
                key={c.label}
                onSelect={() => runCommand(c.label)}
                style={{ display: 'flex', alignItems: 'center', gap: 10 }}
              >
                <div style={{
                  width: 26, height: 26, borderRadius: 6,
                  background: c.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: c.color, flexShrink: 0,
                }}>
                  {c.icon}
                </div>
                <span style={{ fontSize: 13 }}>{c.label}</span>
                <span style={{
                  marginLeft: 'auto', fontSize: 10, padding: '1px 6px', borderRadius: 4,
                  background: '#f1f5f9', color: '#64748b',
                }}>
                  {c.tag}
                </span>
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>
        <div style={{
          padding: '8px 14px', borderTop: '1px solid #f1f5f9',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          fontSize: 11, color: '#94a3b8',
        }}>
          <span>↑↓ 이동 · Enter 실행 · Esc 닫기</span>
          {lastRun && (
            <span style={{ color: '#22c55e', display: 'flex', alignItems: 'center', gap: 4 }}>
              <CheckIcon className="h-3 w-3" />
              {lastRun} 실행됨
            </span>
          )}
        </div>
      </Command>
      <p style={{ marginTop: 10, fontSize: 11, color: '#94a3b8' }}>
        Mantine — 실행 히스토리 자동 업데이트 + 태그 배지 패턴
      </p>
    </div>
  )
}

export const Mantine_실행_히스토리_팔레트: Story = {
  name: 'Mantine - 실행 히스토리 자동 업데이트 팔레트',
  parameters: {
    docs: {
      description: {
        story:
          'Mantine useHotkeys + Spotlight history 벤치마크. 명령 실행 시 히스토리에 자동 추가되며 최근 실행 섹션에 표시. 태그 배지로 명령 분류.',
      },
    },
  },
  render: () => <MantineCommandHistoryRender />,
}

/* --------------------------------------------------------------------------
   Notion 벤치마크: /command 블록 유형 선택기
   Notion 슬래시 명령 메뉴 — 블록 타입을 키보드로 빠르게 선택
-------------------------------------------------------------------------- */
type NotionBlockType = {
  key: string
  label: string
  desc: string
  icon: string
  group: string
  shortcut: string
}

const NOTION_BLOCK_TYPES: NotionBlockType[] = [
  { key: 'h1', label: '제목 1', desc: '큰 섹션 제목', icon: 'H1', group: '기본 블록', shortcut: '#' },
  { key: 'h2', label: '제목 2', desc: '중간 섹션 제목', icon: 'H2', group: '기본 블록', shortcut: '##' },
  { key: 'h3', label: '제목 3', desc: '작은 섹션 제목', icon: 'H3', group: '기본 블록', shortcut: '###' },
  { key: 'todo', label: '할 일 목록', desc: '체크박스 목록', icon: '☑', group: '기본 블록', shortcut: '[]' },
  { key: 'bullet', label: '글머리 목록', desc: '순서 없는 목록', icon: '•', group: '기본 블록', shortcut: '-' },
  { key: 'numbered', label: '번호 목록', desc: '순서 있는 목록', icon: '1.', group: '기본 블록', shortcut: '1.' },
  { key: 'quote', label: '인용', desc: '인용 블록', icon: '"', group: '기본 블록', shortcut: '>' },
  { key: 'code', label: '코드', desc: '코드 블록', icon: '<>', group: '기본 블록', shortcut: '```' },
  { key: 'divider', label: '구분선', desc: '시각적 구분선', icon: '—', group: '기본 블록', shortcut: '---' },
  { key: 'callout', label: '콜아웃', desc: '강조 박스', icon: '!', group: '미디어', shortcut: '' },
  { key: 'image', label: '이미지', desc: '이미지 업로드 또는 URL', icon: 'IMG', group: '미디어', shortcut: '' },
  { key: 'table', label: '표', desc: '데이터 테이블', icon: '⊞', group: '미디어', shortcut: '' },
]

function NotionBlockSelectorRender() {
  const [blockQuery, setBlockQuery] = useState('')
  const [selected, setSelected] = useState('')

  const groups = Array.from(new Set(NOTION_BLOCK_TYPES.map((b) => b.group)))

  const filtered = NOTION_BLOCK_TYPES.filter(
    (b) => b.label.toLowerCase().includes(blockQuery.toLowerCase()) || b.shortcut.includes(blockQuery)
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, fontFamily: 'system-ui, sans-serif' }}>
      {selected ? (
        <div style={{ padding: '10px 16px', borderRadius: 8, background: '#eff6ff', border: '1px solid #c7d2fe', fontSize: 13, color: '#4f46e5', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>✓ 선택된 블록 유형:</span>
          <strong>{NOTION_BLOCK_TYPES.find((b) => b.key === selected)?.label}</strong>
          <button onClick={() => setSelected('')} style={{ marginLeft: 8, fontSize: 11, color: '#6366f1', background: 'none', border: 'none', cursor: 'pointer' }}>
            초기화
          </button>
        </div>
      ) : null}

      <Command style={{ width: 340, borderRadius: 12, boxShadow: '0 8px 32px rgba(0,0,0,0.12)', border: '1px solid #e2e8f0' }}>
        <Command.Input
          value={blockQuery}
          onValueChange={setBlockQuery}
          placeholder="블록 유형 검색 또는 '/' + 단축키..."
        />
        <Command.List>
          <Command.Empty>일치하는 블록 유형이 없습니다</Command.Empty>
          {groups.map((group) => {
            const items = filtered.filter((b) => b.group === group)
            if (items.length === 0) return null
            return (
              <Command.Group key={group} heading={group}>
                {items.map((block) => (
                  <Command.Item
                    key={block.key}
                    onSelect={() => setSelected(block.key)}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px' }}
                  >
                    <div style={{
                      width: 32, height: 32, borderRadius: 6, background: '#f1f5f9',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 12, fontWeight: 700, color: '#475569', flexShrink: 0, fontFamily: 'monospace',
                    }}>
                      {block.icon}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: '#0f172a' }}>{block.label}</div>
                      <div style={{ fontSize: 11, color: '#94a3b8' }}>{block.desc}</div>
                    </div>
                    {block.shortcut && (
                      <kbd style={{ fontSize: 10, padding: '2px 6px', borderRadius: 4, background: '#f8fafc', border: '1px solid #e2e8f0', color: '#64748b', fontFamily: 'monospace', flexShrink: 0 }}>
                        {block.shortcut}
                      </kbd>
                    )}
                  </Command.Item>
                ))}
              </Command.Group>
            )
          })}
        </Command.List>
        <div style={{ padding: '6px 12px', borderTop: '1px solid #f1f5f9', fontSize: 10, color: '#94a3b8', display: 'flex', gap: 10 }}>
          <span>↑↓ 이동</span><span>Enter 선택</span><span>Esc 닫기</span>
        </div>
      </Command>
      <p style={{ fontSize: 11, color: '#94a3b8', textAlign: 'center' }}>
        Notion — 슬래시(/) 명령으로 블록 유형 선택
      </p>
    </div>
  )
}

export const Notion_블록_유형_선택기: Story = {
  name: 'Notion — /command 블록 유형 선택기',
  parameters: {
    docs: {
      description: {
        story:
          'Notion 슬래시(/) 명령 메뉴 패턴. 블록 유형(제목/목록/코드/미디어)을 ' +
          '이름 또는 Markdown 단축키로 검색해 선택. 그룹 헤더, 단축키 kbd 배지, ' +
          '아이콘 + 설명 2줄 구조.',
      },
    },
  },
  render: () => <NotionBlockSelectorRender />,
}

/* --------------------------------------------------------------------------
   Raycast 벤치마크: 파일 빠른 열기
   Raycast File Search — 파일명, 경로, 수정일, 유형으로 빠른 탐색
-------------------------------------------------------------------------- */
type RaycastFile = {
  name: string
  path: string
  ext: string
  modified: string
  size: string
  pinned: boolean
}

const RAYCAST_FILES: RaycastFile[] = [
  { name: 'design-system-v2.fig', path: '~/Design/Orbit UI', ext: 'fig', modified: '방금', size: '12.4 MB', pinned: true },
  { name: 'CLAUDE.md', path: '~/WebstormProjects/orbit-ui', ext: 'md', modified: '1시간 전', size: '8.2 KB', pinned: true },
  { name: 'index.ts', path: '~/orbit-ui/packages/theme-eclipse/src', ext: 'ts', modified: '2시간 전', size: '3.1 KB', pinned: false },
  { name: 'package.json', path: '~/orbit-ui', ext: 'json', modified: '어제', size: '1.8 KB', pinned: false },
  { name: 'Templates.stories.tsx', path: '~/orbit-ui/packages/theme-eclipse/src/templates', ext: 'tsx', modified: '어제', size: '284 KB', pinned: false },
  { name: 'sprint-notes.md', path: '~/Documents/Team', ext: 'md', modified: '3일 전', size: '24 KB', pinned: false },
  { name: 'orbit-ui-cover.png', path: '~/Design/Assets', ext: 'png', modified: '1주 전', size: '2.1 MB', pinned: false },
]

const RAYCAST_EXT_COLOR: Record<string, string> = {
  fig: '#a259ff',
  md: '#0ea5e9',
  ts: '#3178c6',
  tsx: '#61dafb',
  json: '#f59e0b',
  png: '#10b981',
  default: '#64748b',
}

function RaycastFileSearchRender() {
  const [fileQuery, setFileQuery] = useState('')
  const [opened, setOpened] = useState<string | null>(null)

  const filtered = RAYCAST_FILES.filter(
    (f) => f.name.toLowerCase().includes(fileQuery.toLowerCase()) || f.path.toLowerCase().includes(fileQuery.toLowerCase())
  )

  const pinned = filtered.filter((f) => f.pinned)
  const recent = filtered.filter((f) => !f.pinned)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, fontFamily: 'system-ui, sans-serif' }}>
      {opened && (
        <div style={{ padding: '8px 14px', borderRadius: 8, background: '#0f172a', color: '#94a3b8', fontSize: 12, display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ color: '#22c55e' }}>✓</span>
          <span style={{ color: '#f8fafc', fontWeight: 600 }}>{opened}</span>
          <span>파일 열기됨</span>
          <button onClick={() => setOpened(null)} style={{ marginLeft: 6, background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', fontSize: 11 }}>닫기</button>
        </div>
      )}

      <Command style={{ width: 480, borderRadius: 12, boxShadow: '0 16px 48px rgba(0,0,0,0.18)', border: '1px solid #e2e8f0', background: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', padding: '10px 14px', gap: 8, borderBottom: '1px solid #f1f5f9' }}>
          <SearchIcon />
          <Command.Input
            value={fileQuery}
            onValueChange={setFileQuery}
            placeholder="파일 이름 또는 경로 검색..."
            style={{ border: 'none', outline: 'none', flex: 1, fontSize: 14 }}
          />
          {fileQuery && (
            <button onClick={() => setFileQuery('')} style={{ fontSize: 12, color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer' }}>×</button>
          )}
        </div>
        <Command.List style={{ maxHeight: 320 }}>
          <Command.Empty>파일을 찾을 수 없습니다</Command.Empty>
          {pinned.length > 0 && (
            <Command.Group heading="즐겨찾기">
              {pinned.map((file) => (
                <Command.Item
                  key={file.path + file.name}
                  onSelect={() => setOpened(file.name)}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 14px' }}
                >
                  <div style={{
                    width: 28, height: 28, borderRadius: 6,
                    background: (RAYCAST_EXT_COLOR[file.ext] ?? RAYCAST_EXT_COLOR['default']) + '18',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 9, fontWeight: 800, color: RAYCAST_EXT_COLOR[file.ext] ?? RAYCAST_EXT_COLOR['default'],
                    flexShrink: 0, letterSpacing: -0.5,
                  }}>
                    .{file.ext.toUpperCase()}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{file.name}</div>
                    <div style={{ fontSize: 11, color: '#94a3b8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.path}</div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: 10, color: '#94a3b8' }}>{file.modified}</div>
                    <div style={{ fontSize: 10, color: '#cbd5e1' }}>{file.size}</div>
                  </div>
                </Command.Item>
              ))}
            </Command.Group>
          )}
          {recent.length > 0 && (
            <Command.Group heading="최근 파일">
              {recent.map((file) => (
                <Command.Item
                  key={file.path + file.name}
                  onSelect={() => setOpened(file.name)}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 14px' }}
                >
                  <div style={{
                    width: 28, height: 28, borderRadius: 6,
                    background: (RAYCAST_EXT_COLOR[file.ext] ?? RAYCAST_EXT_COLOR['default']) + '18',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 9, fontWeight: 800, color: RAYCAST_EXT_COLOR[file.ext] ?? RAYCAST_EXT_COLOR['default'],
                    flexShrink: 0, letterSpacing: -0.5,
                  }}>
                    .{file.ext.toUpperCase()}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, color: '#0f172a' }}>{file.name}</div>
                    <div style={{ fontSize: 11, color: '#94a3b8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.path}</div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: 10, color: '#94a3b8' }}>{file.modified}</div>
                    <div style={{ fontSize: 10, color: '#cbd5e1' }}>{file.size}</div>
                  </div>
                </Command.Item>
              ))}
            </Command.Group>
          )}
        </Command.List>
        <div style={{ padding: '7px 14px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#94a3b8' }}>
          <div style={{ display: 'flex', gap: 10 }}>
            <span>↑↓ 탐색</span><span>Enter 열기</span>
          </div>
          <span>{filtered.length}개 파일</span>
        </div>
      </Command>
      <p style={{ fontSize: 11, color: '#94a3b8' }}>Raycast — 파일 빠른 열기 (즐겨찾기 우선 표시)</p>
    </div>
  )
}

export const Raycast_파일_빠른_열기: Story = {
  name: 'Raycast — 파일 빠른 열기 File Search',
  parameters: {
    docs: {
      description: {
        story:
          'Raycast File Search 패턴. 파일명/경로 실시간 필터링, 즐겨찾기(pinned) 섹션 우선 표시, ' +
          '확장자별 색상 배지, 수정 시각·파일 크기 메타 표시.',
      },
    },
  },
  render: () => <RaycastFileSearchRender />,
}

/* --------------------------------------------------------------------------
   Notion 벤치마크: 데이터베이스 속성 필터 팔레트
   Notion Filter — 속성별 필터 조건 설정 Command
-------------------------------------------------------------------------- */
type NotionFilterProp = { key: string; label: string; type: 'text' | 'select' | 'date' | 'checkbox' }
type NotionFilterOp = { key: string; label: string }

const NOTION_FILTER_PROPS: NotionFilterProp[] = [
  { key: 'name', label: '이름', type: 'text' },
  { key: 'status', label: '상태', type: 'select' },
  { key: 'assignee', label: '담당자', type: 'select' },
  { key: 'due', label: '마감일', type: 'date' },
  { key: 'done', label: '완료', type: 'checkbox' },
  { key: 'priority', label: '우선순위', type: 'select' },
  { key: 'created', label: '생성일', type: 'date' },
  { key: 'tags', label: '태그', type: 'select' },
]

const NOTION_TEXT_OPS: NotionFilterOp[] = [
  { key: 'contains', label: '포함' },
  { key: 'not_contains', label: '포함 안 함' },
  { key: 'starts_with', label: '시작 문자' },
  { key: 'is_empty', label: '비어 있음' },
]

const NOTION_SELECT_OPS: NotionFilterOp[] = [
  { key: 'is', label: '일치' },
  { key: 'is_not', label: '일치 안 함' },
  { key: 'is_empty', label: '비어 있음' },
]

const NOTION_DATE_OPS: NotionFilterOp[] = [
  { key: 'is', label: '날짜가' },
  { key: 'before', label: '이전' },
  { key: 'after', label: '이후' },
  { key: 'is_empty', label: '비어 있음' },
]

const NOTION_CHECKBOX_OPS: NotionFilterOp[] = [
  { key: 'is_checked', label: '체크됨' },
  { key: 'is_unchecked', label: '체크 안됨' },
]

type NotionFilterStep = 'property' | 'operator'

function NotionFilterPaletteRender() {
  const [filterStep, setFilterStep] = useState<NotionFilterStep>('property')
  const [propQuery, setPropQuery] = useState('')
  const [selectedProp, setSelectedProp] = useState<NotionFilterProp | null>(null)
  const [filters, setFilters] = useState<{ prop: string; op: string }[]>([])

  const filteredProps = NOTION_FILTER_PROPS.filter((p) =>
    p.label.toLowerCase().includes(propQuery.toLowerCase())
  )

  const getOpsForType = (type: NotionFilterProp['type']): NotionFilterOp[] => {
    if (type === 'text') return NOTION_TEXT_OPS
    if (type === 'date') return NOTION_DATE_OPS
    if (type === 'checkbox') return NOTION_CHECKBOX_OPS
    return NOTION_SELECT_OPS
  }

  const handlePropSelect = (prop: NotionFilterProp) => {
    setSelectedProp(prop)
    setFilterStep('operator')
    setPropQuery('')
  }

  const handleOpSelect = (op: NotionFilterOp) => {
    if (selectedProp) {
      setFilters((prev) => [...prev, { prop: selectedProp.label, op: op.label }])
    }
    setSelectedProp(null)
    setFilterStep('property')
  }

  const TYPE_LABEL: Record<NotionFilterProp['type'], string> = {
    text: 'Aa', select: '☰', date: 'cal', checkbox: '☑',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, fontFamily: 'system-ui, sans-serif' }}>
      {filters.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, padding: '8px 12px', borderRadius: 8, background: '#f8fafc', border: '1px solid #e2e8f0', maxWidth: 400 }}>
          {filters.map((f, i) => (
            <span key={i} style={{ padding: '3px 10px', borderRadius: 20, background: '#eff6ff', color: '#4f46e5', fontSize: 11, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
              {f.prop}: <em style={{ fontStyle: 'normal', color: '#6366f1' }}>{f.op}</em>
              <button
                onClick={() => setFilters((prev) => prev.filter((_, idx) => idx !== i))}
                style={{ marginLeft: 4, background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: '#a5b4fc', lineHeight: 1 }}
              >×</button>
            </span>
          ))}
          <button onClick={() => setFilters([])} style={{ fontSize: 10, color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer' }}>전체 제거</button>
        </div>
      )}

      <Command style={{ width: 340, borderRadius: 12, boxShadow: '0 8px 32px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
        <div style={{ padding: '8px 12px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#94a3b8' }}>
          {filterStep === 'operator' && selectedProp ? (
            <>
              <button onClick={() => { setFilterStep('property'); setSelectedProp(null) }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: '#6366f1' }}>←</button>
              <span style={{ color: '#0f172a', fontWeight: 600 }}>{selectedProp.label}</span>
              <span>›</span>
              <span>조건 선택</span>
            </>
          ) : (
            <span style={{ color: '#0f172a', fontWeight: 600 }}>필터 추가</span>
          )}
        </div>

        <Command.Input
          value={propQuery}
          onValueChange={setPropQuery}
          placeholder={filterStep === 'property' ? '속성 검색...' : '조건 검색...'}
        />

        <Command.List>
          <Command.Empty>결과 없음</Command.Empty>
          {filterStep === 'property' && (
            <Command.Group heading="속성 선택">
              {filteredProps.map((prop) => (
                <Command.Item
                  key={prop.key}
                  onSelect={() => handlePropSelect(prop)}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px' }}
                >
                  <span style={{ width: 24, height: 24, borderRadius: 4, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#64748b', fontFamily: 'monospace', flexShrink: 0 }}>
                    {TYPE_LABEL[prop.type]}
                  </span>
                  <span style={{ fontSize: 13, color: '#0f172a' }}>{prop.label}</span>
                  <span style={{ marginLeft: 'auto', fontSize: 10, color: '#94a3b8' }}>{prop.type}</span>
                </Command.Item>
              ))}
            </Command.Group>
          )}
          {filterStep === 'operator' && selectedProp && (
            <Command.Group heading="조건 선택">
              {getOpsForType(selectedProp.type).map((op) => (
                <Command.Item
                  key={op.key}
                  onSelect={() => handleOpSelect(op)}
                  style={{ padding: '8px 12px', fontSize: 13 }}
                >
                  {op.label}
                </Command.Item>
              ))}
            </Command.Group>
          )}
        </Command.List>
      </Command>
      <p style={{ fontSize: 11, color: '#94a3b8' }}>Notion — 속성 선택 → 조건 선택 드릴다운 필터</p>
    </div>
  )
}

export const Notion_데이터베이스_필터_팔레트: Story = {
  name: 'Notion — 데이터베이스 속성 필터 팔레트',
  parameters: {
    docs: {
      description: {
        story:
          'Notion Database Filter 드릴다운 패턴. 속성 선택 → 조건 선택 2단계 Command 플로우. ' +
          '속성 유형별 조건 목록(텍스트/선택/날짜/체크박스) 자동 전환, ' +
          '적용된 필터 태그 칩으로 표시 및 개별 제거.',
      },
    },
  },
  render: () => <NotionFilterPaletteRender />,
}

// ============================================================
// Cycle 134 — Mantine + Arco Design 벤치마크 반영
// ============================================================

// Mantine Spotlight 패턴 — 최근 항목 + 실시간 검색 + 단축키 힌트
type SpotlightItem = { id: string; label: string; desc: string; Icon: React.FC<{ size?: number }>; shortcut?: string; category: string }

const SPOTLIGHT_RECENT: SpotlightItem[] = [
  { id: 'home', label: '홈', desc: '대시보드 홈으로 이동', Icon: HomeLineIcon, shortcut: 'G H', category: '내비게이션' },
  { id: 'settings', label: '설정', desc: '계정 및 환경 설정', Icon: SettingLineIcon, shortcut: 'G S', category: '내비게이션' },
  { id: 'profile', label: '프로필', desc: '내 프로필 페이지', Icon: OnePersonLineIcon, shortcut: 'G P', category: '내비게이션' },
]

const SPOTLIGHT_ACTIONS: SpotlightItem[] = [
  { id: 'fav', label: '즐겨찾기 추가', desc: '현재 페이지 즐겨찾기', Icon: StarLineIcon, shortcut: '⌘D', category: '액션' },
  { id: 'notify', label: '알림 설정', desc: '알림 환경 설정 열기', Icon: NotificationLineIcon, shortcut: '⌘⇧N', category: '액션' },
  { id: 'info', label: '도움말', desc: '도움말 센터 열기', Icon: CircleInfoLineIcon, shortcut: '?', category: '액션' },
]

function MantineSpotlight134Render() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<string | null>(null)
  const allItems = [...SPOTLIGHT_RECENT, ...SPOTLIGHT_ACTIONS]
  const filtered = query.trim()
    ? allItems.filter((i) => i.label.includes(query) || i.desc.includes(query))
    : allItems
  return (
    <div style={{ width: 480, fontFamily: 'system-ui, sans-serif' }}>
      <Command>
        <Command.Input
          placeholder="무엇이든 검색하세요..."
          value={query}
          onValueChange={setQuery}
        />
        <Command.List>
          <Command.Empty>검색 결과가 없습니다.</Command.Empty>
          {!query && (
            <Command.Group heading="최근 방문">
              {SPOTLIGHT_RECENT.map((item) => (
                <Command.Item key={item.id} value={item.label} onSelect={() => setSelected(item.id)}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
                    <item.Icon size={16} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: '#0f172a' }}>{item.label}</div>
                      <div style={{ fontSize: 11, color: '#94a3b8' }}>{item.desc}</div>
                    </div>
                    {item.shortcut && (
                      <kbd style={{ fontSize: 10, padding: '2px 6px', background: '#f1f5f9', borderRadius: 4, color: '#64748b', fontFamily: 'monospace' }}>
                        {item.shortcut}
                      </kbd>
                    )}
                  </div>
                </Command.Item>
              ))}
            </Command.Group>
          )}
          {!query && <Command.Separator />}
          {!query && (
            <Command.Group heading="빠른 액션">
              {SPOTLIGHT_ACTIONS.map((item) => (
                <Command.Item key={item.id} value={item.label} onSelect={() => setSelected(item.id)}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
                    <item.Icon size={16} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: '#0f172a' }}>{item.label}</div>
                    </div>
                    {item.shortcut && (
                      <kbd style={{ fontSize: 10, padding: '2px 6px', background: '#f1f5f9', borderRadius: 4, color: '#64748b', fontFamily: 'monospace' }}>
                        {item.shortcut}
                      </kbd>
                    )}
                  </div>
                </Command.Item>
              ))}
            </Command.Group>
          )}
          {query && filtered.map((item) => (
            <Command.Item key={item.id} value={item.label} onSelect={() => setSelected(item.id)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
                <item.Icon size={16} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: '#0f172a' }}>{item.label}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8' }}>{item.desc}</div>
                </div>
                <span style={{ fontSize: 10, color: '#94a3b8', background: '#f8fafc', padding: '1px 6px', borderRadius: 99 }}>{item.category}</span>
              </div>
            </Command.Item>
          ))}
        </Command.List>
      </Command>
      {selected && (
        <div style={{ marginTop: 8, fontSize: 12, color: '#6366f1', textAlign: 'center' }}>
          선택됨: {allItems.find((i) => i.id === selected)?.label}
        </div>
      )}
    </div>
  )
}

export const Mantine_Spotlight_검색_팔레트: Story = {
  name: 'Mantine Spotlight - 검색 팔레트',
  parameters: {
    docs: {
      description: {
        story:
          'Mantine Spotlight 패턴. 최근 방문 + 빠른 액션 그룹 분리, 단축키 힌트 배지, ' +
          '검색 시 카테고리 태그 + 설명 표시. 쿼리 유무에 따라 그룹 레이아웃 전환.',
      },
    },
  },
  render: () => <MantineSpotlight134Render />,
}

// Arco Design 스타일 — 애플리케이션 메뉴 팔레트 (복합 액션 + 위험 액션 구분)
type ArcoAction = { id: string; label: string; desc: string; Icon: React.FC<{ size?: number }>; danger?: boolean; group: string }

const ARCO_ACTIONS: ArcoAction[] = [
  { id: 'profile', label: '프로필 편집', desc: '이름, 이메일, 아바타 변경', Icon: OnePersonLineIcon, group: '계정' },
  { id: 'settings', label: '환경설정', desc: '테마, 언어, 알림 설정', Icon: SettingLineIcon, group: '계정' },
  { id: 'search', label: '전체 검색', desc: '프로젝트 내 전체 검색', Icon: SearchIcon, group: '작업' },
  { id: 'star', label: '즐겨찾기 보기', desc: '즐겨찾기된 항목 모두 보기', Icon: StarLineIcon, group: '작업' },
  { id: 'notify', label: '알림 모두 읽음', desc: '미읽 알림 일괄 처리', Icon: NotificationLineIcon, group: '작업' },
  { id: 'delete', label: '프로젝트 삭제', desc: '현재 프로젝트 영구 삭제', Icon: DeleteLineIcon, danger: true, group: '위험' },
]

function ArcoAppMenuRender() {
  const [query, setQuery] = useState('')
  const groups = Array.from(new Set(ARCO_ACTIONS.map((a) => a.group)))
  const filtered = ARCO_ACTIONS.filter(
    (a) => !query || a.label.includes(query) || a.desc.includes(query)
  )
  return (
    <div style={{ width: 440, fontFamily: 'system-ui, sans-serif' }}>
      <Command>
        <Command.Input placeholder="액션 검색..." value={query} onValueChange={setQuery} />
        <Command.List>
          <Command.Empty>액션을 찾을 수 없습니다.</Command.Empty>
          {query
            ? filtered.map((action) => (
                <Command.Item key={action.id} value={action.label}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
                    <action.Icon size={16} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: action.danger ? '#ef4444' : '#0f172a' }}>{action.label}</div>
                      <div style={{ fontSize: 11, color: '#94a3b8' }}>{action.desc}</div>
                    </div>
                    {action.danger && (
                      <span style={{ fontSize: 10, color: '#ef4444', background: '#fef2f2', padding: '1px 6px', borderRadius: 99 }}>위험</span>
                    )}
                  </div>
                </Command.Item>
              ))
            : groups.map((group, gi) => (
                <div key={group}>
                  {gi > 0 && <Command.Separator />}
                  <Command.Group heading={group}>
                    {ARCO_ACTIONS.filter((a) => a.group === group).map((action) => (
                      <Command.Item key={action.id} value={action.label}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
                          <action.Icon size={16} />
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 13, fontWeight: 500, color: action.danger ? '#ef4444' : '#0f172a' }}>{action.label}</div>
                            <div style={{ fontSize: 11, color: '#94a3b8' }}>{action.desc}</div>
                          </div>
                          <ArrowRightIcon size={14} />
                        </div>
                      </Command.Item>
                    ))}
                  </Command.Group>
                </div>
              ))
          }
        </Command.List>
      </Command>
    </div>
  )
}

export const Arco_앱_메뉴_액션_팔레트: Story = {
  name: 'Arco Design - 앱 메뉴 액션 팔레트',
  parameters: {
    docs: {
      description: {
        story:
          'Arco Design Menu 패턴. 계정/작업/위험 그룹 구분, 위험 액션 빨간색 + 위험 배지. ' +
          '검색 시 그룹 헤더 없이 플랫 리스트로 전환.',
      },
    },
  },
  render: () => <ArcoAppMenuRender />,
}

// Mantine + Arco — 프로젝트 전환 팔레트 (최근 + 즐겨찾기 탭)
type ProjectItem = { id: string; name: string; desc: string; starred: boolean; color: string; lastVisited: string }

const PROJECT_LIST: ProjectItem[] = [
  { id: 'p1', name: 'orbit-ui', desc: 'React 디자인 시스템', starred: true, color: '#6366f1', lastVisited: '방금 전' },
  { id: 'p2', name: 'api-gateway', desc: 'REST API 게이트웨이', starred: true, color: '#10b981', lastVisited: '2시간 전' },
  { id: 'p3', name: 'marketing-site', desc: '마케팅 랜딩 페이지', starred: false, color: '#f59e0b', lastVisited: '1일 전' },
  { id: 'p4', name: 'analytics-dash', desc: '데이터 시각화 대시보드', starred: false, color: '#ec4899', lastVisited: '3일 전' },
  { id: 'p5', name: 'mobile-app', desc: 'React Native 앱', starred: true, color: '#8b5cf6', lastVisited: '1주 전' },
]

function MantineArcoProjectSwitcherRender() {
  const [tab, setTab] = useState<'recent' | 'starred'>('recent')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<string | null>(null)
  const displayed = tab === 'starred' ? PROJECT_LIST.filter((p) => p.starred) : PROJECT_LIST
  const filtered = query ? displayed.filter((p) => p.name.includes(query) || p.desc.includes(query)) : displayed
  return (
    <div style={{ width: 440, fontFamily: 'system-ui, sans-serif' }}>
      {/* 탭 */}
      <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', marginBottom: 4 }}>
        {(['recent', 'starred'] as const).map((t) => (
          <button
            key={t}
            onClick={() => { setTab(t); setQuery('') }}
            style={{
              padding: '8px 16px', fontSize: 12, fontWeight: tab === t ? 600 : 400,
              border: 'none', background: 'none', cursor: 'pointer',
              color: tab === t ? '#0f172a' : '#94a3b8',
              borderBottom: tab === t ? '2px solid #0f172a' : '2px solid transparent',
            }}
          >
            {t === 'recent' ? '최근' : '즐겨찾기'}
          </button>
        ))}
      </div>
      <Command>
        <Command.Input placeholder="프로젝트 검색..." value={query} onValueChange={setQuery} />
        <Command.List>
          <Command.Empty>프로젝트를 찾을 수 없습니다.</Command.Empty>
          <Command.Group heading={tab === 'recent' ? '최근 프로젝트' : '즐겨찾기'}>
            {filtered.map((p) => (
              <Command.Item key={p.id} value={p.name} onSelect={() => setSelected(p.id)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 6, background: p.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: p.color, flexShrink: 0 }}>
                    {p.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: selected === p.id ? 700 : 500, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 5 }}>
                      {p.name}
                      {p.starred && <StarLineIcon size={11} />}
                    </div>
                    <div style={{ fontSize: 11, color: '#94a3b8' }}>{p.desc}</div>
                  </div>
                  <span style={{ fontSize: 10, color: '#94a3b8' }}>{p.lastVisited}</span>
                </div>
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>
      </Command>
      {selected && (
        <div style={{ marginTop: 8, fontSize: 12, color: '#6366f1', textAlign: 'center' }}>
          선택됨: {PROJECT_LIST.find((p) => p.id === selected)?.name}
        </div>
      )}
    </div>
  )
}

export const Mantine_Arco_프로젝트_전환_팔레트: Story = {
  name: 'Mantine + Arco - 프로젝트 전환 팔레트',
  parameters: {
    docs: {
      description: {
        story:
          'Mantine Spotlight + Arco 탭 패턴. 최근/즐겨찾기 탭 전환, 아바타 이니셜 + 즐겨찾기 별, ' +
          '마지막 방문 시간. 검색으로 전체 항목 실시간 필터링.',
      },
    },
  },
  render: () => <MantineArcoProjectSwitcherRender />,
}

/* --------------------------------------------------------------------------
   Cycle 163 — Figma Plugin UI + Apple HIG
   Figma Plugin: 레이어 선택 팔레트 패턴 (Layer Picker)
-------------------------------------------------------------------------- */
const FIGMA_LAYERS = [
  { id: 'frame1', type: 'frame', name: 'Dashboard / Main', depth: 0, color: '#2563eb' },
  { id: 'group1', type: 'group', name: 'Header Group', depth: 1, color: '#7c3aed' },
  { id: 'text1', type: 'text', name: 'Title — 디자인 시스템', depth: 2, color: '#0891b2' },
  { id: 'icon1', type: 'vector', name: 'Icon / Bell', depth: 2, color: '#059669' },
  { id: 'group2', type: 'group', name: 'Content Area', depth: 1, color: '#7c3aed' },
  { id: 'comp1', type: 'component', name: 'Button / Primary', depth: 2, color: '#d97706' },
  { id: 'comp2', type: 'component', name: 'Card / Default', depth: 2, color: '#d97706' },
  { id: 'text2', type: 'text', name: 'Body Text — 설명', depth: 3, color: '#0891b2' },
  { id: 'rect1', type: 'rectangle', name: 'Background Fill', depth: 1, color: '#6b7280' },
]

const LAYER_TYPE_ICON: Record<string, string> = {
  frame: '▣',
  group: '◈',
  text: 'T',
  vector: '✦',
  component: '◆',
  rectangle: '■',
}

function FigmaLayerPickerRender() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<string[]>([])

  const filtered = query
    ? FIGMA_LAYERS.filter(l => l.name.toLowerCase().includes(query.toLowerCase()) || l.type.includes(query))
    : FIGMA_LAYERS

  const toggleLayer = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  return (
    <div style={{ width: 340, fontFamily: 'system-ui, sans-serif' }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>Figma Plugin UI — 레이어 선택 팔레트</p>
      <Command style={{ borderRadius: 10, border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        <Command.Input
          placeholder="레이어 검색..."
          value={query}
          onValueChange={setQuery}
        />
        <Command.List style={{ maxHeight: 280 }}>
          <Command.Group heading={`레이어 (${filtered.length})`}>
            {filtered.map(layer => (
              <Command.Item
                key={layer.id}
                value={layer.id}
                onSelect={() => toggleLayer(layer.id)}
                style={{ paddingLeft: 8 + layer.depth * 14 }}
              >
                <span style={{ fontSize: 11, fontWeight: 700, color: layer.color, marginRight: 6, fontFamily: 'monospace', minWidth: 14, display: 'inline-block' }}>{LAYER_TYPE_ICON[layer.type]}</span>
                <span style={{ fontSize: 12, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{layer.name}</span>
                {selected.includes(layer.id) && <CheckIcon className="h-3 w-3 text-blue-500" />}
              </Command.Item>
            ))}
            <Command.Empty>레이어를 찾을 수 없습니다</Command.Empty>
          </Command.Group>
        </Command.List>
      </Command>
      {selected.length > 0 && (
        <div style={{ marginTop: 8, padding: '6px 10px', borderRadius: 6, background: '#f0f4ff', fontSize: 11, color: '#2563eb', fontWeight: 600 }}>
          {selected.length}개 레이어 선택됨
        </div>
      )}
    </div>
  )
}

export const Figma_레이어_선택_팔레트: Story = {
  name: 'Figma Plugin UI — 레이어 선택 팔레트 패턴',
  parameters: {
    docs: {
      description: {
        story: 'Figma Plugin API의 레이어 탐색 패턴. 계층 깊이별 들여쓰기, 레이어 타입 아이콘(frame/group/text/vector/component), 다중 선택, 실시간 검색. Command.Item depth-based indent.',
      },
    },
  },
  render: () => <FigmaLayerPickerRender />,
}

/* --------------------------------------------------------------------------
   Apple HIG: Spotlight 스타일 앱 검색 팔레트 패턴
-------------------------------------------------------------------------- */
const APPLE_APPS = [
  { category: '앱', name: 'Orbit UI', desc: '디자인 시스템 스토리북', icon: '🎨', shortcut: '⌘ 1' },
  { category: '앱', name: 'Figma', desc: 'UI 디자인 툴', icon: '🖌️', shortcut: '⌘ 2' },
  { category: '앱', name: 'VS Code', desc: '코드 편집기', icon: '💻', shortcut: '⌘ 3' },
  { category: '파일', name: 'design-system.pdf', desc: '~/Downloads', icon: '📄', shortcut: '' },
  { category: '파일', name: 'orbit-ui-tokens.json', desc: '~/Projects', icon: '📦', shortcut: '' },
  { category: '웹', name: 'Orbit UI Storybook', desc: 'orbit-ui.vercel.app', icon: '🌐', shortcut: '' },
  { category: '연락처', name: '김희준', desc: 'hjunkim@orbit-ui.dev', icon: '👤', shortcut: '' },
]

function AppleSpotlightCommandRender() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<string | null>(null)

  const filtered = query
    ? APPLE_APPS.filter(a => a.name.toLowerCase().includes(query.toLowerCase()) || a.desc.toLowerCase().includes(query.toLowerCase()))
    : APPLE_APPS

  const grouped = filtered.reduce<Record<string, typeof APPLE_APPS>>((acc, item) => {
    if (!acc[item.category]) { acc[item.category] = [] }
    acc[item.category].push(item)
    return acc
  }, {})

  return (
    <div style={{ width: 380, fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>Apple HIG — Spotlight 스타일 검색 팔레트</p>
      <Command style={{ borderRadius: 14, border: 'none', background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(20px)', boxShadow: '0 8px 40px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid rgba(0,0,0,0.06)', gap: 10 }}>
          <SearchIcon className="h-5 w-5" style={{ color: '#8e8e93', flexShrink: 0 }} />
          <Command.Input
            placeholder="Spotlight 검색"
            value={query}
            onValueChange={setQuery}
            style={{ border: 'none', outline: 'none', fontSize: 17, fontWeight: 400, letterSpacing: '-0.01em', color: '#1c1c1e', background: 'transparent', flex: 1 }}
          />
        </div>
        <Command.List style={{ maxHeight: 300, padding: '6px 0' }}>
          {Object.entries(grouped).map(([cat, items]) => (
            <Command.Group key={cat} heading={cat}>
              {items.map(app => (
                <Command.Item
                  key={app.name}
                  value={app.name}
                  onSelect={() => setSelected(app.name)}
                  style={{ borderRadius: 8, margin: '1px 6px' }}
                >
                  <span style={{ fontSize: 20, marginRight: 10, flexShrink: 0 }}>{app.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: selected === app.name ? 600 : 400, color: '#1c1c1e', letterSpacing: '-0.01em' }}>{app.name}</div>
                    <div style={{ fontSize: 11, color: '#8e8e93', marginTop: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{app.desc}</div>
                  </div>
                  {app.shortcut && (
                    <span style={{ fontSize: 10, color: '#8e8e93', fontFamily: 'system-ui', background: 'rgba(0,0,0,0.06)', padding: '2px 6px', borderRadius: 4 }}>{app.shortcut}</span>
                  )}
                </Command.Item>
              ))}
            </Command.Group>
          ))}
          <Command.Empty>
            <span style={{ fontSize: 13, color: '#8e8e93' }}>&apos;{query}&apos;에 대한 결과 없음</span>
          </Command.Empty>
        </Command.List>
      </Command>
      {selected && (
        <div style={{ marginTop: 8, fontSize: 11, color: '#6366f1', textAlign: 'center', fontWeight: 600 }}>열기: {selected}</div>
      )}
    </div>
  )
}

export const Apple_Spotlight_앱_검색_팔레트: Story = {
  name: 'Apple HIG — Spotlight 스타일 앱 검색 팔레트',
  parameters: {
    docs: {
      description: {
        story: 'Apple HIG Spotlight 검색 패턴. 앱/파일/웹/연락처 카테고리별 그룹화, 앱 아이콘 + 이름 + 설명, 단축키 배지. 블러 배경 + 라운드 디자인. Command.Group 다중 카테고리 패턴.',
      },
    },
  },
  render: () => <AppleSpotlightCommandRender />,
}

/* --------------------------------------------------------------------------
   Figma + Apple HIG: 컴포넌트 속성 에디터 팔레트 복합 패턴
-------------------------------------------------------------------------- */
const FIGMA_COMPONENT_VARIANTS = [
  { prop: 'Type', options: ['Primary', 'Secondary', 'Ghost', 'Danger'], selected: 'Primary' },
  { prop: 'Size', options: ['Small', 'Medium', 'Large'], selected: 'Medium' },
  { prop: 'State', options: ['Default', 'Hover', 'Pressed', 'Disabled'], selected: 'Default' },
  { prop: 'Icon', options: ['None', 'Leading', 'Trailing', 'Both'], selected: 'Leading' },
]

function FigmaAppleComponentEditorRender() {
  const [variants, setVariants] = useState(FIGMA_COMPONENT_VARIANTS)
  const [searchProp, setSearchProp] = useState('')

  const updateVariant = (propName: string, value: string) => {
    setVariants(prev => prev.map(v => v.prop === propName ? { ...v, selected: value } : v))
  }

  const activeVariant = variants.find(v => v.prop === 'Type')?.selected ?? 'Primary'
  const activeSize = variants.find(v => v.prop === 'Size')?.selected ?? 'Medium'

  const filteredProps = searchProp
    ? variants.filter(v => v.prop.toLowerCase().includes(searchProp.toLowerCase()) || v.options.some(o => o.toLowerCase().includes(searchProp.toLowerCase())))
    : variants

  return (
    <div style={{ width: 340, fontFamily: 'system-ui, sans-serif' }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>Figma + Apple HIG — 컴포넌트 속성 에디터</p>

      {/* Preview */}
      <div style={{ marginBottom: 10, padding: '14px', borderRadius: 10, background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          padding: activeSize === 'Small' ? '5px 12px' : activeSize === 'Large' ? '11px 24px' : '8px 18px',
          borderRadius: 7,
          background: activeVariant === 'Primary' ? '#6366f1' : activeVariant === 'Secondary' ? '#e0e7ff' : activeVariant === 'Danger' ? '#fef2f2' : 'transparent',
          color: activeVariant === 'Primary' ? '#fff' : activeVariant === 'Secondary' ? '#4338ca' : activeVariant === 'Danger' ? '#dc2626' : '#475569',
          border: activeVariant === 'Ghost' ? '1.5px solid #e2e8f0' : 'none',
          fontSize: activeSize === 'Small' ? 11 : activeSize === 'Large' ? 15 : 13,
          fontWeight: 600,
        }}>
          {activeVariant} Button ({activeSize})
        </div>
      </div>

      <Command style={{ borderRadius: 10, border: '1px solid #e2e8f0' }}>
        <Command.Input
          placeholder="속성 검색..."
          value={searchProp}
          onValueChange={setSearchProp}
        />
        <Command.List style={{ maxHeight: 240 }}>
          {filteredProps.map(v => (
            <Command.Group key={v.prop} heading={`${v.prop} — ${v.selected}`}>
              {v.options.map(opt => (
                <Command.Item
                  key={opt}
                  value={`${v.prop}-${opt}`}
                  onSelect={() => updateVariant(v.prop, opt)}
                >
                  <span style={{ width: 14, height: 14, borderRadius: '50%', border: `2px solid ${v.selected === opt ? '#6366f1' : '#d1d5db'}`, background: v.selected === opt ? '#6366f1' : 'transparent', marginRight: 8, flexShrink: 0, display: 'inline-block' }} />
                  <span style={{ fontSize: 12, fontWeight: v.selected === opt ? 700 : 400, color: v.selected === opt ? '#6366f1' : '#374151' }}>{opt}</span>
                  {v.selected === opt && <CheckIcon className="h-3 w-3 ml-auto text-indigo-500" />}
                </Command.Item>
              ))}
            </Command.Group>
          ))}
          <Command.Empty>일치하는 속성 없음</Command.Empty>
        </Command.List>
      </Command>
    </div>
  )
}

export const Figma_Apple_컴포넌트_속성_에디터: Story = {
  name: 'Figma + Apple HIG — 컴포넌트 속성 에디터 팔레트',
  parameters: {
    docs: {
      description: {
        story: 'Figma Component Variant Inspector + Apple HIG Property Inspector 패턴. 속성(Type/Size/State/Icon)별 Command.Group, 라디오 스타일 선택, 실시간 미리보기. 검색으로 속성/옵션 필터링.',
      },
    },
  },
  render: () => <FigmaAppleComponentEditorRender />,
}
