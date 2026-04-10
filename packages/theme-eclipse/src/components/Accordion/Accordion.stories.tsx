import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { Accordion } from './Accordion'
import { LabelBadge } from '../LabelBadge'
import { Switch } from '../Switch'
import { GhostButton } from '../GhostButton'

const meta = {
  title: 'eclipse/Data Display/Accordion',
  component: Accordion,
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

export const 기본: Story = {
  args: {
    type: 'multiple',
  },
  render: (args) => (
    <Accordion {...args} className="w-full">
      <Accordion.Item value="item-1">
        <Accordion.Trigger>신청 취소는 어떻게 진행되나요?</Accordion.Trigger>
        <Accordion.Content>
          관리자가 요청을 승인하기 전이라면, [이용내역]에서 취소할 수 있습니다. 이미 서비스 처리가
          시작되었다면 고객센터를 통해 문의해주세요.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger>서비스 이용료 기준이 궁금해요.</Accordion.Trigger>
        <Accordion.Content>
          거리, 시간대, 지역, 서비스 방식, 할인, 혜택, 사용하는 요금제 등에 따라 서비스 정책에 따라
          차이가 있을 수 있습니다. 최종 결제 전 최종 이용료을 확인할 수 있습니다.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-3">
        <Accordion.Trigger>등록된 수단을 변경할 수 있나요?</Accordion.Trigger>
        <Accordion.Content>
          처리가 완료된 후에는 수단을 변경할 수 없습니다. 주문을 취소한 뒤 새로운 결제 수단으로 다시
          신청해 주세요.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
}

/* --------------------------------------------------------------------------
   FAQ 패턴 (단일 열기, MUI Accordion controlled 패턴)
   하나만 열리는 FAQ 목록 - single type Accordion
-------------------------------------------------------------------------- */
const faqItems = [
  {
    value: 'faq-1',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        <path d="M12 8v4m0 4h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    question: 'Orbit UI는 어떤 프레임워크와 호환되나요?',
    answer: 'React 18 이상, Next.js 13+ App Router, Vite 기반 프로젝트와 호환됩니다. TypeScript를 기본 지원하며 CommonJS / ESM 모두 제공합니다.',
  },
  {
    value: 'faq-2',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    question: '다크 모드는 어떻게 설정하나요?',
    answer: 'EclipseProvider의 mode prop을 "dark"로 설정하면 됩니다. 런타임에서 동적으로 전환도 가능하며, CSS variables 기반으로 동작하여 SSR 환경에서도 플리커 없이 작동합니다.',
  },
  {
    value: 'faq-3',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    question: '토큰을 커스터마이즈할 수 있나요?',
    answer: 'CSS 변수 직접 override, theme prop을 통한 컴포넌트별 토큰 주입, vanilla-extract createTheme을 통한 새 테마 클래스 생성 등 3가지 방법을 지원합니다.',
  },
  {
    value: 'faq-4',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M13 10V3L4 14h7v7l9-11h-7z"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    question: '번들 크기는 얼마나 되나요?',
    answer: '트리 셰이킹을 완벽 지원하여 사용한 컴포넌트만 포함됩니다. 코어 패키지 기준 gzip 압축 후 약 12KB이며, 테마 레이어는 추가로 약 8KB입니다.',
  },
]

const FaqAccordionRender = () => {
  const [openItem, setOpenItem] = useState<string>('')

  return (
    <div style={{ width: '600px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: '700', color: '#1e293b' }}>
          자주 묻는 질문
        </h3>
        <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
          하나의 항목만 열립니다 (single type, MUI controlled 패턴)
        </p>
      </div>
      <Accordion
        type="single"
        collapsible
        value={openItem}
        onValueChange={setOpenItem}
        className="w-full"
      >
        {faqItems.map((item) => (
          <Accordion.Item key={item.value} value={item.value}>
            <Accordion.Trigger>
              <span style={{ display: 'flex', alignItems: 'center', gap: '10px', color: openItem === item.value ? '#6366f1' : '#1e293b' }}>
                <span style={{ color: openItem === item.value ? '#6366f1' : '#94a3b8', flexShrink: 0 }}>
                  {item.icon}
                </span>
                {item.question}
              </span>
            </Accordion.Trigger>
            <Accordion.Content>{item.answer}</Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

export const FAQ패턴: Story = {
  args: { type: 'single' },
  render: () => <FaqAccordionRender />,
}

/* --------------------------------------------------------------------------
   중첩 Accordion 패턴
   카테고리 > 세부 항목으로 2단계 계층 구조 표현
-------------------------------------------------------------------------- */
export const 중첩Accordion: Story = {
  args: { type: 'single' },
  render: () => (
    <div style={{ width: '600px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: '700', color: '#1e293b' }}>
          서비스 도움말 센터
        </h3>
        <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
          카테고리 선택 후 세부 항목을 확인하세요
        </p>
      </div>
      <Accordion type="single" collapsible className="w-full">
        <Accordion.Item value="cat-1">
          <Accordion.Trigger>
            <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              계정 및 보안
            </span>
          </Accordion.Trigger>
          <Accordion.Content>
            <Accordion type="multiple" className="w-full" style={{ paddingLeft: '24px' }}>
              <Accordion.Item value="sub-1-1">
                <Accordion.Trigger>비밀번호 변경 방법</Accordion.Trigger>
                <Accordion.Content>
                  설정 &gt; 보안 &gt; 비밀번호 변경에서 현재 비밀번호 확인 후 새 비밀번호를 입력하세요.
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value="sub-1-2">
                <Accordion.Trigger>2단계 인증 설정</Accordion.Trigger>
                <Accordion.Content>
                  설정 &gt; 보안 &gt; 2단계 인증에서 SMS 또는 앱 인증을 선택하여 활성화하세요.
                </Accordion.Content>
              </Accordion.Item>
            </Accordion>
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="cat-2">
          <Accordion.Trigger>
            <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              결제 및 청구
            </span>
          </Accordion.Trigger>
          <Accordion.Content>
            <Accordion type="multiple" className="w-full" style={{ paddingLeft: '24px' }}>
              <Accordion.Item value="sub-2-1">
                <Accordion.Trigger>결제 수단 추가</Accordion.Trigger>
                <Accordion.Content>
                  결제 설정 메뉴에서 신용카드, 체크카드, 계좌이체 등 다양한 수단을 추가할 수 있습니다.
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value="sub-2-2">
                <Accordion.Trigger>환불 정책 안내</Accordion.Trigger>
                <Accordion.Content>
                  결제 후 7일 이내에는 전액 환불, 7~30일은 50% 환불, 30일 초과는 환불이 불가합니다.
                </Accordion.Content>
              </Accordion.Item>
            </Accordion>
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="cat-3">
          <Accordion.Trigger>
            <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              서비스 이용
            </span>
          </Accordion.Trigger>
          <Accordion.Content>
            <Accordion type="multiple" className="w-full" style={{ paddingLeft: '24px' }}>
              <Accordion.Item value="sub-3-1">
                <Accordion.Trigger>API 키 발급 방법</Accordion.Trigger>
                <Accordion.Content>
                  개발자 설정 &gt; API 키 관리에서 새 API 키를 생성하고 권한 범위를 지정하세요.
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value="sub-3-2">
                <Accordion.Trigger>사용량 제한 정책</Accordion.Trigger>
                <Accordion.Content>
                  무료 플랜은 월 1,000건, Pro 플랜은 월 100,000건, Enterprise는 무제한으로 제공됩니다.
                </Accordion.Content>
              </Accordion.Item>
            </Accordion>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
}

/* --------------------------------------------------------------------------
   Vercel 스타일: 프로젝트 설정 패널
   Vercel Dashboard의 Project Settings처럼 섹션별 설정을 Accordion으로 구성
-------------------------------------------------------------------------- */
const VercelSettingsRender = () => {
  const [domainEnabled, setDomainEnabled] = useState(true)
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false)
  const [previewEnabled, setPreviewEnabled] = useState(true)

  return (
    <div style={{ width: '640px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ margin: '0 0 4px', fontSize: '20px', fontWeight: '700', color: '#0f172a' }}>
          프로젝트 설정
        </h2>
        <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
          Vercel Dashboard 스타일 - 섹션별 설정 그룹화 패턴
        </p>
      </div>
      <Accordion type="multiple" className="w-full">
        <Accordion.Item value="domains">
          <Accordion.Trigger>
            <span style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <span style={{ flex: 1 }}>도메인</span>
              <LabelBadge color="benefit"><LabelBadge.Label>3개 연결됨</LabelBadge.Label></LabelBadge>
            </span>
          </Accordion.Trigger>
          <Accordion.Content>
            <div style={{ padding: '4px 0 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['orbit-ui.vercel.app', 'orbit-ui.com', 'www.orbit-ui.com'].map((domain, i) => (
                <div
                  key={domain}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '12px 14px', borderRadius: '8px',
                    border: '1px solid #e2e8f0', background: '#f8fafc',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      width: '8px', height: '8px', borderRadius: '50%',
                      background: i === 0 ? '#f59e0b' : '#22c55e', flexShrink: 0,
                    }} />
                    <code style={{ fontSize: '13px', color: '#1e293b', fontFamily: 'monospace' }}>{domain}</code>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {i === 0 && <LabelBadge color="gray"><LabelBadge.Label>기본</LabelBadge.Label></LabelBadge>}
                    <Switch
                      checked={domainEnabled}
                      onChange={() => setDomainEnabled((v) => !v)}
                    />
                  </div>
                </div>
              ))}
              <button style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '10px 14px', borderRadius: '8px',
                border: '1.5px dashed #cbd5e1', background: 'transparent',
                color: '#6366f1', fontSize: '13px', fontWeight: '600', cursor: 'pointer',
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                도메인 추가
              </button>
            </div>
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="analytics">
          <Accordion.Trigger>
            <span style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M3 3v18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M18 9l-5 5-2-2-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ flex: 1 }}>Analytics</span>
              <LabelBadge color={analyticsEnabled ? 'benefit' : 'gray'}>
                <LabelBadge.Label>{analyticsEnabled ? '활성화됨' : '비활성화'}</LabelBadge.Label>
              </LabelBadge>
            </span>
          </Accordion.Trigger>
          <Accordion.Content>
            <div style={{ padding: '4px 0 16px' }}>
              <div style={{
                padding: '16px', borderRadius: '10px',
                background: analyticsEnabled ? 'rgba(16,185,129,0.05)' : '#f8fafc',
                border: `1px solid ${analyticsEnabled ? 'rgba(16,185,129,0.2)' : '#e2e8f0'}`,
                marginBottom: '12px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>
                    Vercel Analytics 활성화
                  </span>
                  <Switch
                    checked={analyticsEnabled}
                    onChange={() => setAnalyticsEnabled((v) => !v)}
                  />
                </div>
                <p style={{ margin: 0, fontSize: '12px', color: '#64748b', lineHeight: '1.5' }}>
                  실시간 방문자 수, 페이지뷰, 성능 지표를 대시보드에서 확인하세요.
                  무료 플랜은 월 2,500 이벤트를 제공합니다.
                </p>
              </div>
            </div>
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="preview">
          <Accordion.Trigger>
            <span style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <span style={{ flex: 1 }}>Preview 배포</span>
            </span>
          </Accordion.Trigger>
          <Accordion.Content>
            <div style={{ padding: '4px 0 16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'PR Preview 자동 생성', desc: 'PR 생성 시 Preview URL을 자동으로 배포합니다.' },
                { label: 'Preview URL 비밀번호 보호', desc: 'Preview URL에 접근하려면 비밀번호가 필요합니다.' },
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
                  gap: '12px', padding: '12px 14px', borderRadius: '8px',
                  border: '1px solid #e2e8f0', background: '#f8fafc',
                }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b', marginBottom: '2px' }}>{item.label}</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>{item.desc}</div>
                  </div>
                  <Switch
                    checked={i === 0 ? previewEnabled : false}
                    onChange={i === 0 ? () => setPreviewEnabled((v) => !v) : undefined}
                  />
                </div>
              ))}
            </div>
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="danger">
          <Accordion.Trigger>
            <span style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#ef4444' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              위험 영역
            </span>
          </Accordion.Trigger>
          <Accordion.Content>
            <div style={{ padding: '4px 0 16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['프로젝트 전송', '프로젝트 삭제'].map((action) => (
                <div key={action} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '12px 14px', borderRadius: '8px',
                  border: '1px solid rgba(239,68,68,0.2)', background: 'rgba(239,68,68,0.03)',
                }}>
                  <span style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>{action}</span>
                  <button style={{
                    padding: '6px 14px', borderRadius: '6px', border: '1px solid #ef4444',
                    background: 'transparent', color: '#ef4444',
                    fontSize: '12px', fontWeight: '600', cursor: 'pointer',
                  }}>{action}</button>
                </div>
              ))}
            </div>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  )
}

export const Vercel_설정패널: Story = {
  args: { type: 'multiple' },
  render: () => <VercelSettingsRender />,
}

/* --------------------------------------------------------------------------
   shadcn/ui 스타일: 기능 비교표 Accordion
   가격 플랜별 포함 기능을 Accordion으로 상세 설명하는 패턴
-------------------------------------------------------------------------- */
const featureSections = [
  {
    category: '핵심 기능',
    icon: '⚡',
    features: [
      { name: '컴포넌트 라이브러리', free: true, pro: true, enterprise: true },
      { name: '다크 모드 지원', free: true, pro: true, enterprise: true },
      { name: '커스텀 테마', free: false, pro: true, enterprise: true },
      { name: '피그마 연동', free: false, pro: true, enterprise: true },
    ],
  },
  {
    category: '팀 협업',
    icon: '👥',
    features: [
      { name: '팀 멤버', free: '최대 3명', pro: '최대 15명', enterprise: '무제한' },
      { name: '공유 라이브러리', free: false, pro: true, enterprise: true },
      { name: '버전 관리', free: false, pro: true, enterprise: true },
    ],
  },
  {
    category: '지원 및 보안',
    icon: '🛡️',
    features: [
      { name: '커뮤니티 지원', free: true, pro: true, enterprise: true },
      { name: '우선 지원', free: false, pro: true, enterprise: true },
      { name: 'SSO / SAML', free: false, pro: false, enterprise: true },
      { name: 'SLA 보장', free: false, pro: false, enterprise: true },
    ],
  },
]

const CheckIcon = ({ checked }: { checked: boolean | string }) => {
  if (typeof checked === 'string') {
    return <span style={{ fontSize: '12px', color: '#6366f1', fontWeight: '600' }}>{checked}</span>
  }
  if (checked) {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#22c55e" />
        <path d="M8 12l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#e2e8f0" />
      <path d="M8 12h8" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export const 플랜별_기능비교: Story = {
  args: { type: 'multiple' },
  render: () => (
    <div style={{ width: '640px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ margin: '0 0 4px', fontSize: '20px', fontWeight: '700', color: '#0f172a' }}>
          플랜별 기능 비교
        </h2>
        <p style={{ margin: '0 0 16px', fontSize: '13px', color: '#64748b' }}>
          shadcn/ui 스타일 — 카테고리별 기능을 Accordion으로 그룹화
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0', padding: '10px 0', borderBottom: '2px solid #e2e8f0', marginLeft: 'auto', marginRight: '0', width: '55%', textAlign: 'center' }}>
          {['Free', 'Pro', 'Enterprise'].map((plan) => (
            <div key={plan} style={{ fontSize: '12px', fontWeight: '700', color: plan === 'Pro' ? '#6366f1' : '#64748b' }}>
              {plan}
            </div>
          ))}
        </div>
      </div>
      <Accordion type="multiple" defaultValue={['feat-0', 'feat-1', 'feat-2']} className="w-full">
        {featureSections.map((section, si) => (
          <Accordion.Item key={si} value={`feat-${si}`}>
            <Accordion.Trigger>
              <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '16px' }}>{section.icon}</span>
                {section.category}
              </span>
            </Accordion.Trigger>
            <Accordion.Content>
              <div style={{ paddingBottom: '8px' }}>
                {section.features.map((feature, fi) => (
                  <div
                    key={fi}
                    style={{
                      display: 'flex', alignItems: 'center',
                      padding: '10px 4px', borderBottom: '1px solid #f1f5f9',
                    }}
                  >
                    <span style={{ flex: 1, fontSize: '13px', color: '#334155' }}>{feature.name}</span>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', width: '55%', textAlign: 'center' }}>
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <CheckIcon checked={feature.free} />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <CheckIcon checked={feature.pro} />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <CheckIcon checked={feature.enterprise} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  ),
}

/* --------------------------------------------------------------------------
   Notion 벤치마크: 페이지 섹션 토글 블록 패턴
   Notion 토글 블록 영감 — 문서/위키 섹션을 접을 수 있는 패턴
-------------------------------------------------------------------------- */
const PAGE_SECTIONS = [
  {
    title: '기술 스택',
    badge: 'sale' as const,
    content: (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, paddingTop: 4 }}>
        {['React 18', 'TypeScript 5.7', 'vanilla-extract', 'Vite', 'Storybook 8', 'pnpm'].map((tech) => (
          <span
            key={tech}
            style={{
              display: 'inline-block',
              padding: '2px 10px',
              borderRadius: 20,
              background: '#f1f5f9',
              border: '1px solid #e2e8f0',
              fontSize: 12,
              fontWeight: 600,
              color: '#475569',
            }}
          >
            {tech}
          </span>
        ))}
      </div>
    ),
  },
  {
    title: '팀 소개',
    badge: 'benefit' as const,
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 4 }}>
        {[
          { name: 'HJ Kim', role: 'Design System Lead', initial: 'H' },
          { name: 'Frontend Team', role: 'Component Development', initial: 'F' },
        ].map((member) => (
          <div key={member.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: '#6366f1',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 13,
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {member.initial}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{member.name}</div>
              <div style={{ fontSize: 11, color: '#94a3b8' }}>{member.role}</div>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: '로드맵',
    badge: 'gray' as const,
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 4 }}>
        {[
          { q: 'Q1 2026', item: '3-Tier 토큰 시스템 완성', done: true },
          { q: 'Q2 2026', item: '다크 모드 + 플랫폼 토큰', done: false },
          { q: 'Q3 2026', item: '모션/애니메이션 토큰', done: false },
        ].map((row) => (
          <div key={row.q} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: row.done ? '#10b981' : '#e2e8f0',
                border: row.done ? 'none' : '1px solid #94a3b8',
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: 11, color: '#94a3b8', minWidth: 64 }}>{row.q}</span>
            <span style={{ fontSize: 13, color: row.done ? '#1e293b' : '#64748b' }}>{row.item}</span>
            {row.done && (
              <LabelBadge color="benefit">
                <LabelBadge.Label>완료</LabelBadge.Label>
              </LabelBadge>
            )}
          </div>
        ))}
      </div>
    ),
  },
]

export const Notion_페이지_섹션_토글 = {
  name: 'Notion - 페이지 섹션 토글 블록 패턴',
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: '#1e293b', marginBottom: 16 }}>
        Orbit UI 프로젝트 개요
      </div>
      <Accordion type="multiple" defaultValue={['section-0']}>
        {PAGE_SECTIONS.map((section, i) => (
          <Accordion.Item key={i} value={`section-${i}`}>
            <Accordion.Trigger>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {section.title}
                <LabelBadge color={section.badge}>
                  <LabelBadge.Label>{section.badge === 'sale' ? '기술' : section.badge === 'benefit' ? '팀' : '계획'}</LabelBadge.Label>
                </LabelBadge>
              </span>
            </Accordion.Trigger>
            <Accordion.Content>
              {section.content}
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>
      <div style={{ marginTop: 12, fontSize: 11, color: '#94a3b8' }}>
        Notion 토글 블록 패턴 — type=multiple로 여러 섹션 동시 열기 가능
      </div>
    </div>
  ),
}

/* --------------------------------------------------------------------------
   Figma Plugin 벤치마크: 컴팩트 설정 패널 패턴
   Figma 플러그인 속성 패널 스타일 — 최소 간격, 컴팩트 밀도
-------------------------------------------------------------------------- */
export const Figma_플러그인_설정_패널 = {
  name: 'Figma Plugin - 컴팩트 설정 패널 패턴',
  render: function Render() {
    const [settings, setSettings] = useState({
      autoSync: true,
      exportPNG: false,
      exportSVG: true,
      shortcutA: 'Cmd+Shift+A',
      shortcutE: 'Cmd+Shift+E',
    })

    return (
      <div
        style={{
          width: 280,
          borderRadius: 8,
          border: '1px solid #e2e8f0',
          overflow: 'hidden',
          fontFamily: '-apple-system, sans-serif',
        }}
      >
        <div
          style={{
            padding: '8px 12px',
            background: '#f8fafc',
            borderBottom: '1px solid #e2e8f0',
            fontSize: 11,
            fontWeight: 700,
            color: '#475569',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          Orbit UI Plugin Settings
        </div>
        <Accordion type="multiple" defaultValue={['general']}>
          <Accordion.Item value="general">
            <Accordion.Trigger>
              <span style={{ fontSize: 12 }}>일반 설정</span>
            </Accordion.Trigger>
            <Accordion.Content>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '4px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 12, color: '#475569' }}>자동 동기화</span>
                  <Switch
                    checked={settings.autoSync}
                    onCheckedChange={(v) => setSettings((p) => ({ ...p, autoSync: v }))}
                  />
                </div>
              </div>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="export">
            <Accordion.Trigger>
              <span style={{ fontSize: 12 }}>내보내기</span>
            </Accordion.Trigger>
            <Accordion.Content>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '4px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 12, color: '#475569' }}>PNG 내보내기</span>
                  <Switch
                    checked={settings.exportPNG}
                    onCheckedChange={(v) => setSettings((p) => ({ ...p, exportPNG: v }))}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 12, color: '#475569' }}>SVG 내보내기</span>
                  <Switch
                    checked={settings.exportSVG}
                    onCheckedChange={(v) => setSettings((p) => ({ ...p, exportSVG: v }))}
                  />
                </div>
              </div>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="shortcuts">
            <Accordion.Trigger>
              <span style={{ fontSize: 12 }}>단축키</span>
            </Accordion.Trigger>
            <Accordion.Content>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '4px 0' }}>
                {[
                  { label: '토큰 적용', key: settings.shortcutA },
                  { label: '내보내기', key: settings.shortcutE },
                ].map((sc) => (
                  <div key={sc.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 12, color: '#475569' }}>{sc.label}</span>
                    <span
                      style={{
                        fontSize: 10,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        padding: '2px 6px',
                        borderRadius: 4,
                        border: '1px solid #e2e8f0',
                        background: '#f8fafc',
                        color: '#475569',
                      }}
                    >
                      {sc.key}
                    </span>
                  </div>
                ))}
              </div>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   FAQ 아코디언 패턴 (Exclusive 모드)
   한 번에 하나만 열리는 FAQ 목록 — Controlled 방식
-------------------------------------------------------------------------- */
const FAQ_ITEMS = [
  {
    q: 'Orbit UI는 어떤 프레임워크를 지원하나요?',
    a: 'React 18 이상을 지원합니다. Next.js App Router, Remix, Vite+React 등 모든 React 기반 환경에서 사용 가능합니다.',
  },
  {
    q: '다크 모드는 어떻게 적용하나요?',
    a: 'EclipseProvider의 mode prop을 "dark"로 설정하면 됩니다. 런타임에 mode를 변경하면 즉시 전체 테마가 전환됩니다.',
  },
  {
    q: 'shadcn/ui에서 마이그레이션하는 방법은?',
    a: 'Orbit UI는 Compound Component 패턴을 사용합니다. Button → SolidButton/OutlineButton/GhostButton으로 매핑되며, MigrationGuide.mdx를 참고하세요.',
  },
  {
    q: '커스텀 테마는 어떻게 만드나요?',
    a: '3-Tier 토큰 시스템을 통해 Reference → Semantic → Component 토큰을 순서대로 오버라이드합니다. CustomizationGuide.mdx에 단계별 가이드가 있습니다.',
  },
  {
    q: '번들 크기는 얼마나 되나요?',
    a: 'vanilla-extract zero-runtime CSS를 사용하여 런타임 오버헤드가 없습니다. Tree-shaking이 완전히 지원되어 사용한 컴포넌트만 포함됩니다.',
  },
]

// ─── MUI 벤치마크: Accordion + Summary 요약 표시 패턴 ─────────────────────────
// MUI Accordion은 닫힌 상태에서 AccordionSummary에 핵심 정보를 표시합니다.
// 설정 패널에서 현재 값을 요약으로 보여주는 패턴을 구현합니다.

const MUI_SETTINGS = [
  {
    id: 'appearance',
    title: '외관',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    summary: '다크 모드 · 컴팩트 밀도',
    fields: [
      { label: '테마', value: '다크 모드' },
      { label: '밀도', value: '컴팩트' },
      { label: '폰트 크기', value: '14px' },
    ],
  },
  {
    id: 'notifications',
    title: '알림',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    summary: '푸시 켜짐 · 이메일 꺼짐',
    fields: [
      { label: '푸시 알림', value: '켜짐' },
      { label: '이메일', value: '꺼짐' },
      { label: '소리', value: '켜짐' },
    ],
  },
  {
    id: 'security',
    title: '보안',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    summary: '2FA 활성화 · 세션 14일',
    fields: [
      { label: '2단계 인증', value: '활성화' },
      { label: '세션 만료', value: '14일' },
      { label: '로그인 알림', value: '켜짐' },
    ],
  },
]

function MuiSummaryAccordionRender() {
  const [open, setOpen] = useState<string | null>(null)
  return (
    <div style={{ width: 480, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', marginBottom: 14 }}>
        계정 설정 — MUI Summary 패턴
      </div>
      <Accordion
        type="single"
        collapsible
        value={open ?? ''}
        onValueChange={(v) => setOpen(v || null)}
        className="w-full"
      >
        {MUI_SETTINGS.map((setting) => (
          <Accordion.Item key={setting.id} value={setting.id}>
            <Accordion.Trigger>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingRight: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  {setting.icon}
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>{setting.title}</span>
                </div>
                {open !== setting.id && (
                  <span style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'monospace' }}>
                    {setting.summary}
                  </span>
                )}
              </div>
            </Accordion.Trigger>
            <Accordion.Content>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '4px 0 8px' }}>
                {setting.fields.map((field) => (
                  <div key={field.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 13, color: '#64748b' }}>{field.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{field.value}</span>
                  </div>
                ))}
                <button
                  style={{
                    marginTop: 4,
                    alignSelf: 'flex-end',
                    padding: '5px 12px',
                    borderRadius: 6,
                    border: '1px solid #e2e8f0',
                    background: '#fff',
                    fontSize: 12,
                    fontWeight: 600,
                    color: '#6366f1',
                    cursor: 'pointer',
                  }}
                >
                  편집
                </button>
              </div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

export const MUI_요약_표시_아코디언 = {
  name: 'MUI - Summary 요약 표시 패턴 (닫힌 상태에서 현재 값 표시)',
  render: () => <MuiSummaryAccordionRender />,
}

// ─── Raycast 벤치마크: 커맨드 섹션 그루핑 패턴 ────────────────────────────────
// Raycast Extensions UI: 커맨드들을 섹션별로 묶고 섹션을 Accordion으로 접을 수 있음.
// 키보드 단축키가 우측에 표시되는 컴팩트 리스트가 특징입니다.

const RAYCAST_SECTIONS = [
  {
    id: 'recent',
    title: '최근 사용',
    count: 3,
    commands: [
      { label: 'Toggle Dark Mode', shortcut: 'D', desc: '다크/라이트 전환' },
      { label: 'Open Storybook', shortcut: 'S', desc: '로컬 Storybook 열기' },
      { label: 'Run Typecheck', shortcut: 'T', desc: 'tsc --noEmit 실행' },
    ],
  },
  {
    id: 'dev',
    title: '개발 도구',
    count: 4,
    commands: [
      { label: 'Git Status', shortcut: 'G S', desc: '변경사항 확인' },
      { label: 'Git Commit', shortcut: 'G C', desc: '커밋 생성' },
      { label: 'Build Storybook', shortcut: 'B', desc: 'pnpm build:storybook' },
      { label: 'Deploy Vercel', shortcut: 'V D', desc: 'Vercel 배포' },
    ],
  },
  {
    id: 'navigation',
    title: '네비게이션',
    count: 3,
    commands: [
      { label: 'Go to Components', shortcut: 'C', desc: 'src/components 열기' },
      { label: 'Go to Templates', shortcut: 'T', desc: 'Templates.stories.tsx' },
      { label: 'Go to MDX Docs', shortcut: 'M', desc: 'MDX 문서 폴더' },
    ],
  },
]

function RaycastSectionsRender() {
  const [openSections, setOpenSections] = useState<string[]>(['recent', 'dev'])

  return (
    <div
      style={{
        width: 400,
        background: '#1c1c27',
        borderRadius: 12,
        border: '1px solid #2a2a3e',
        overflow: 'hidden',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <div
        style={{
          padding: '10px 14px',
          borderBottom: '1px solid #2a2a3e',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="8" stroke="#64748b" strokeWidth="2" />
          <path d="m21 21-4.35-4.35" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span style={{ fontSize: 13, color: '#64748b' }}>명령어 검색...</span>
      </div>
      <Accordion
        type="multiple"
        value={openSections}
        onValueChange={setOpenSections}
        className="w-full"
        style={{ background: 'transparent' }}
      >
        {RAYCAST_SECTIONS.map((section) => (
          <Accordion.Item key={section.id} value={section.id} style={{ border: 'none', borderBottom: '1px solid #2a2a3e' }}>
            <Accordion.Trigger style={{ padding: '6px 14px', background: '#252535', fontSize: 11 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingRight: 6 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {section.title}
                </span>
                <span
                  style={{
                    fontSize: 9,
                    color: '#5e6ad2',
                    background: '#2d2d4e',
                    padding: '1px 5px',
                    borderRadius: 4,
                    fontWeight: 700,
                  }}
                >
                  {section.count}
                </span>
              </div>
            </Accordion.Trigger>
            <Accordion.Content>
              <div style={{ background: '#1c1c27' }}>
                {section.commands.map((cmd) => (
                  <div
                    key={cmd.label}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 14px',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = '#252535' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'transparent' }}
                  >
                    <div>
                      <div style={{ fontSize: 13, color: '#e2e8f0', fontWeight: 500 }}>{cmd.label}</div>
                      <div style={{ fontSize: 11, color: '#475569' }}>{cmd.desc}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 3 }}>
                      {cmd.shortcut.split(' ').map((key) => (
                        <span
                          key={key}
                          style={{
                            fontSize: 11,
                            fontFamily: 'monospace',
                            color: '#94a3b8',
                            background: '#2a2a3e',
                            border: '1px solid #3a3a4e',
                            borderRadius: 4,
                            padding: '2px 5px',
                          }}
                        >
                          {key}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

export const Raycast_커맨드_섹션_그루핑 = {
  name: 'Raycast - 커맨드 섹션 그루핑 패턴 (단축키 포함)',
  render: () => <RaycastSectionsRender />,
}

// ─── MUI 벤치마크: Dense 아코디언 릴리즈 노트 ────────────────────────────────
// MUI dense 모드처럼 줄간격을 줄이고 tight한 레이아웃으로 많은 항목을 표시합니다.
// LabelBadge를 활용해 변경 유형(feat/fix/docs)을 시각적으로 구분합니다.

const RELEASE_ITEMS = [
  {
    version: 'v2.0.0-beta.16',
    date: '2026-04-10',
    type: 'major' as const,
    changes: [
      { kind: 'feat' as const, text: 'FileBrowser 템플릿 추가' },
      { kind: 'feat' as const, text: 'SearchBar Chakra/M3 패턴 스토리' },
      { kind: 'feat' as const, text: 'ChangelogPage 템플릿 추가' },
    ],
  },
  {
    version: 'v2.0.0-beta.15',
    date: '2026-04-09',
    type: 'minor' as const,
    changes: [
      { kind: 'feat' as const, text: 'NotifCenter 템플릿' },
      { kind: 'fix' as const, text: 'Toggle onChange 타입 수정' },
    ],
  },
  {
    version: 'v2.0.0-beta.14',
    date: '2026-04-08',
    type: 'patch' as const,
    changes: [
      { kind: 'fix' as const, text: 'TextArea style prop 제거' },
      { kind: 'docs' as const, text: 'AccessibilityGuide 추가' },
    ],
  },
]

const KIND_COLOR = { feat: '#10b981', fix: '#ef4444', docs: '#3b82f6' } as const
const KIND_LABEL = { feat: 'FEAT', fix: 'FIX', docs: 'DOCS' } as const
const TYPE_BADGE = { major: { bg: '#eff6ff', color: '#6366f1', label: 'MAJOR' }, minor: { bg: '#f0fdf4', color: '#10b981', label: 'MINOR' }, patch: { bg: '#fefce8', color: '#f59e0b', label: 'PATCH' } } as const

export const MUI_Dense_릴리즈_노트 = {
  name: 'MUI Dense - 릴리즈 노트 아코디언 (LabelBadge 조합)',
  render: function Render() {
    const [open, setOpen] = useState<string>('v2.0.0-beta.16')
    return (
      <div style={{ width: 480 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', marginBottom: 12 }}>
          릴리즈 노트
        </div>
        <Accordion
          type="single"
          collapsible
          value={open}
          onValueChange={(v) => setOpen(v)}
          className="w-full"
        >
          {RELEASE_ITEMS.map((release) => {
            const badge = TYPE_BADGE[release.type]
            return (
              <Accordion.Item key={release.version} value={release.version}>
                <Accordion.Trigger>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingRight: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 12, fontFamily: 'monospace', fontWeight: 700, color: '#0f172a' }}>
                        {release.version}
                      </span>
                      <span
                        style={{
                          fontSize: 9,
                          padding: '1px 6px',
                          borderRadius: 4,
                          fontWeight: 800,
                          background: badge.bg,
                          color: badge.color,
                          letterSpacing: '0.05em',
                        }}
                      >
                        {badge.label}
                      </span>
                    </div>
                    <span style={{ fontSize: 11, color: '#94a3b8' }}>{release.date}</span>
                  </div>
                </Accordion.Trigger>
                <Accordion.Content>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '4px 0 8px' }}>
                    {release.changes.map((change, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span
                          style={{
                            fontSize: 9,
                            padding: '1px 5px',
                            borderRadius: 3,
                            fontWeight: 800,
                            background: `${KIND_COLOR[change.kind]}18`,
                            color: KIND_COLOR[change.kind],
                            letterSpacing: '0.05em',
                          }}
                        >
                          {KIND_LABEL[change.kind]}
                        </span>
                        <LabelBadge>{change.text}</LabelBadge>
                      </div>
                    ))}
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            )
          })}
        </Accordion>
      </div>
    )
  },
}

export const FAQ_아코디언_패턴 = {
  name: 'FAQ 아코디언 (Exclusive 모드)',
  render: function Render() {
    const [openItem, setOpenItem] = useState<string>('')

    return (
      <div style={{ maxWidth: 520 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#1e293b', marginBottom: 16 }}>
          자주 묻는 질문
        </div>
        <Accordion
          type="single"
          value={openItem}
          onValueChange={(val) => setOpenItem(val)}
          collapsible
        >
          {FAQ_ITEMS.map((item, i) => (
            <Accordion.Item key={i} value={`faq-${i}`}>
              <Accordion.Trigger>
                <span style={{ textAlign: 'left', fontWeight: openItem === `faq-${i}` ? 700 : 500 }}>
                  {item.q}
                </span>
              </Accordion.Trigger>
              <Accordion.Content>
                <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.7, marginBottom: 8 }}>
                  {item.a}
                </p>
                <GhostButton color="black" size="small">
                  <GhostButton.Center>자세히 보기</GhostButton.Center>
                </GhostButton>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion>
        <div style={{ marginTop: 12, fontSize: 11, color: '#94a3b8' }}>
          type=single + collapsible — 한 번에 하나만 열림
        </div>
      </div>
    )
  },
}

// --- Cycle 75: shadcn/ui + Vercel Design 벤치마크 ---

const ShadcnChangelogRender = () => {
  const [openItems, setOpenItems] = useState<string[]>(['v0.3.0'])

  const CHANGELOG = [
    {
      version: 'v0.3.0',
      date: '2026-04-10',
      type: 'major',
      changes: [
        { kind: 'feat', text: 'Command 팔레트 컴포넌트 추가 (cmdk 기반)' },
        { kind: 'feat', text: 'Toggle 컴포넌트 Radix Primitive 기반으로 재구현' },
        { kind: 'fix', text: 'Modal 포커스 트랩 누락 수정 (ORB-130)' },
      ],
    },
    {
      version: 'v0.2.5',
      date: '2026-03-22',
      type: 'minor',
      changes: [
        { kind: 'feat', text: 'SearchBar 자동완성 드롭다운 패턴 추가' },
        { kind: 'fix', text: 'Button disabled 상태 커서 수정' },
        { kind: 'chore', text: 'Storybook 8.6으로 업그레이드' },
      ],
    },
    {
      version: 'v0.2.0',
      date: '2026-02-14',
      type: 'minor',
      changes: [
        { kind: 'feat', text: 'DataTable 정렬/필터/페이지네이션 완성' },
        { kind: 'feat', text: 'EclipseProvider 다크모드 지원' },
        { kind: 'fix', text: 'FloatingTextField placeholder 색상 WCAG AA 수정' },
      ],
    },
  ]

  const TYPE_COLOR = { major: '#ef4444', minor: '#f59e0b', patch: '#22c55e' } as const
  const KIND_COLOR = { feat: '#6366f1', fix: '#f59e0b', chore: '#94a3b8' } as const
  type ChangeKind = keyof typeof KIND_COLOR

  const toggle = (v: string) =>
    setOpenItems((prev) => prev.includes(v) ? prev.filter((i) => i !== v) : [...prev, v])

  return (
    <div style={{ width: 500, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>변경 이력 (Changelog)</div>
      <Accordion type="multiple" value={openItems} onValueChange={setOpenItems}>
        {CHANGELOG.map((release) => (
          <Accordion.Item key={release.version} value={release.version}>
            <Accordion.Trigger onClick={() => toggle(release.version)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
                <span style={{ fontWeight: 700, fontSize: 14, fontFamily: 'monospace' }}>{release.version}</span>
                <span style={{
                  fontSize: 9, padding: '1px 6px', borderRadius: 3, fontWeight: 700,
                  background: TYPE_COLOR[release.type as keyof typeof TYPE_COLOR] + '20',
                  color: TYPE_COLOR[release.type as keyof typeof TYPE_COLOR],
                }}>
                  {release.type.toUpperCase()}
                </span>
                <span style={{ marginLeft: 'auto', fontSize: 11, color: '#94a3b8', marginRight: 8 }}>{release.date}</span>
              </div>
            </Accordion.Trigger>
            <Accordion.Content>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {release.changes.map((c, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <span style={{
                      fontSize: 9, padding: '2px 6px', borderRadius: 3, fontWeight: 700, flexShrink: 0, marginTop: 1,
                      background: KIND_COLOR[c.kind as ChangeKind] + '20',
                      color: KIND_COLOR[c.kind as ChangeKind],
                    }}>
                      {c.kind}
                    </span>
                    <span style={{ fontSize: 13, color: '#475569', lineHeight: 1.5 }}>{c.text}</span>
                  </div>
                ))}
              </div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>
      <div style={{ marginTop: 10, fontSize: 11, color: '#94a3b8' }}>
        shadcn/ui — Changelog Accordion 패턴 (버전 타입 배지 + 변경 종류 태그)
      </div>
    </div>
  )
}

export const shadcn_Changelog_아코디언: Story = {
  name: 'shadcn/ui - Changelog 버전 아코디언',
  args: { type: 'multiple' },
  parameters: {
    docs: {
      description: {
        story:
          'shadcn/ui Accordion 벤치마크. 버전별 릴리즈 타입(major/minor) 배지, feat/fix/chore 변경 종류 태그, type="multiple"로 복수 열기 지원.',
      },
    },
  },
  render: () => <ShadcnChangelogRender />,
}

const VercelProjectSettingsRender = () => {
  const [openSection, setOpenSection] = useState('general')

  const SECTIONS = [
    {
      id: 'general',
      title: '일반',
      desc: '프로젝트 이름, URL, 삭제',
      content: [
        { label: '프로젝트 이름', value: 'orbit-ui-storybook', editable: true },
        { label: '프레임워크', value: 'Vite', editable: false },
        { label: '루트 디렉토리', value: 'packages/theme-eclipse', editable: true },
      ],
    },
    {
      id: 'domains',
      title: '도메인',
      desc: '커스텀 도메인 연결',
      content: [
        { label: '프로덕션 도메인', value: 'orbit-ui.vercel.app', editable: false },
        { label: '브랜치 도메인', value: '*.vercel.app', editable: false },
      ],
    },
    {
      id: 'build',
      title: '빌드 & 배포',
      desc: '빌드 명령어, 출력 디렉토리',
      content: [
        { label: '빌드 명령어', value: 'pnpm build:storybook', editable: true },
        { label: '출력 디렉토리', value: 'storybook-static', editable: true },
        { label: 'Node.js 버전', value: '20.x', editable: false },
      ],
    },
    {
      id: 'env',
      title: '환경 변수',
      desc: '시크릿 및 환경 설정',
      content: [
        { label: 'STORYBOOK_ENV', value: 'production', editable: false },
        { label: 'NODE_ENV', value: 'production', editable: false },
      ],
    },
  ]

  return (
    <div style={{ width: 520, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 2 }}>프로젝트 설정</div>
        <div style={{ fontSize: 12, color: '#94a3b8' }}>orbit-ui-storybook</div>
      </div>
      <Accordion type="single" value={openSection} onValueChange={(v) => setOpenSection(v ?? '')} collapsible>
        {SECTIONS.map((s) => (
          <Accordion.Item key={s.id} value={s.id}>
            <Accordion.Trigger>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{s.title}</div>
                <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2, fontWeight: 400 }}>{s.desc}</div>
              </div>
            </Accordion.Trigger>
            <Accordion.Content>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {s.content.map((item) => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 500, color: '#1e293b' }}>{item.label}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <code style={{
                        fontFamily: 'monospace', fontSize: 11, background: '#f1f5f9',
                        padding: '3px 8px', borderRadius: 4, color: '#475569',
                      }}>
                        {item.value}
                      </code>
                      {item.editable && (
                        <GhostButton color="gray" size="small">
                          <GhostButton.Center>수정</GhostButton.Center>
                        </GhostButton>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>
      <div style={{ marginTop: 10, fontSize: 11, color: '#94a3b8' }}>
        Vercel 프로젝트 설정 패널 — 섹션별 Accordion + 수정 버튼
      </div>
    </div>
  )
}

export const Vercel_프로젝트_설정_패널: Story = {
  name: 'Vercel - 프로젝트 설정 섹션 아코디언',
  args: { type: 'single' },
  parameters: {
    docs: {
      description: {
        story:
          'Vercel Project Settings 벤치마크. type=single collapsible, 섹션 제목+설명, 내부 코드 뱃지, 편집 가능 항목에 GhostButton 표시 패턴.',
      },
    },
  },
  render: () => <VercelProjectSettingsRender />,
}

const ShadcnVercelPricingRender = () => {
  const [openPlan, setOpenPlan] = useState('pro')

  const PLANS = [
    {
      id: 'hobby',
      name: 'Hobby',
      price: '무료',
      badge: null,
      features: [
        '개인 프로젝트 무제한',
        '100회/일 배포',
        '공유 컴퓨팅',
        '기본 분석',
      ],
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$20/월',
      badge: '추천',
      features: [
        '팀 협업 지원',
        '무제한 배포',
        '전용 컴퓨팅',
        '고급 분석 + 커스텀 도메인',
        '우선 지원',
      ],
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '문의',
      badge: null,
      features: [
        'Pro 모든 기능 포함',
        'SLA 보장 (99.99%)',
        '전용 인프라',
        'SSO/SAML 통합',
        '전담 지원팀',
      ],
    },
  ]

  return (
    <div style={{ width: 480, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>플랜 선택</div>
      <Accordion type="single" value={openPlan} onValueChange={(v) => setOpenPlan(v ?? openPlan)} collapsible={false}>
        {PLANS.map((plan) => (
          <Accordion.Item key={plan.id} value={plan.id}>
            <Accordion.Trigger>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
                <div style={{
                  width: 16, height: 16, borderRadius: '50%', flexShrink: 0,
                  border: openPlan === plan.id ? '5px solid #0f172a' : '2px solid #e2e8f0',
                  transition: 'all 0.2s',
                }} />
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{plan.name}</span>
                    {plan.badge && (
                      <span style={{ fontSize: 9, background: '#0f172a', color: '#fff', padding: '1px 6px', borderRadius: 10, fontWeight: 700 }}>
                        {plan.badge}
                      </span>
                    )}
                  </div>
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginRight: 8 }}>{plan.price}</span>
              </div>
            </Accordion.Trigger>
            <Accordion.Content>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingLeft: 26 }}>
                {plan.features.map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: '#22c55e', fontSize: 12, flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: 12, color: '#475569' }}>{f}</span>
                  </div>
                ))}
                <div style={{ marginTop: 10 }}>
                  <Switch
                    id={`annual-${plan.id}`}
                    checked={false}
                    onCheckedChange={() => {}}
                  />
                  <label htmlFor={`annual-${plan.id}`} style={{ fontSize: 11, color: '#94a3b8', marginLeft: 6 }}>
                    연간 결제 시 20% 할인
                  </label>
                </div>
              </div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>
      <div style={{ marginTop: 10, fontSize: 11, color: '#94a3b8' }}>
        shadcn + Vercel Pricing — 라디오 선택 Accordion + 기능 체크리스트 + Switch 연간 결제 토글
      </div>
    </div>
  )
}

export const shadcn_Vercel_플랜_선택_아코디언: Story = {
  name: 'shadcn + Vercel - 플랜 선택 라디오 아코디언',
  args: { type: 'single' },
  parameters: {
    docs: {
      description: {
        story:
          'shadcn/ui Accordion + Vercel Pricing 패턴 조합. 라디오 스타일 선택 인디케이터, 기능 체크리스트, Switch 연간/월간 결제 토글, 추천 배지.',
      },
    },
  },
  render: () => <ShadcnVercelPricingRender />,
}

/* --------------------------------------------------------------------------
   MUI — 확장 패널 설정 그룹 (Cycle 117)
   MUI Accordion의 controlled expansion panel 패턴
-------------------------------------------------------------------------- */
function MuiExpansionPanelSettingsRender() {
  const [expanded, setExpanded] = useState<string | false>('panel-general')
  function toggle(panel: string) {
    return () => setExpanded((prev) => (prev === panel ? false : panel))
  }
  const sections = [
    {
      id: 'panel-general',
      title: '일반 설정',
      icon: '⚙️',
      fields: [
        { label: '프로젝트 이름', value: 'Orbit UI' },
        { label: '설명', value: 'React 디자인 시스템' },
        { label: '표시 언어', value: '한국어' },
      ],
    },
    {
      id: 'panel-security',
      title: '보안',
      icon: '🔒',
      fields: [
        { label: '2단계 인증', value: '활성화됨' },
        { label: '세션 타임아웃', value: '30분' },
        { label: '로그인 기록', value: '최근 10회' },
      ],
    },
    {
      id: 'panel-billing',
      title: '결제 정보',
      icon: '💳',
      fields: [
        { label: '플랜', value: 'Pro' },
        { label: '청구 주기', value: '연간' },
        { label: '다음 결제일', value: '2026-05-01' },
      ],
    },
  ]
  return (
    <div style={{ width: 480 }}>
      <div style={{ marginBottom: 16, fontSize: 14, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>설정 패널 (MUI Expansion Pattern)</div>
      <Accordion type="single" value={expanded || undefined} className="w-full">
        {sections.map((sec) => (
          <Accordion.Item key={sec.id} value={sec.id} onClick={toggle(sec.id)}>
            <Accordion.Trigger>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>{sec.icon}</span>
                <span>{sec.title}</span>
              </span>
            </Accordion.Trigger>
            <Accordion.Content>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {sec.fields.map((f) => (
                  <div key={f.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 13, color: 'var(--sem-eclipse-color-foregroundSecondary)' }}>{f.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>{f.value}</span>
                  </div>
                ))}
                <div style={{ marginTop: 4, display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                  <GhostButton size="small" color="black">
                    <GhostButton.Center>취소</GhostButton.Center>
                  </GhostButton>
                  <GhostButton size="small" color="black">
                    <GhostButton.Center>저장</GhostButton.Center>
                  </GhostButton>
                </div>
              </div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

export const MUI_확장_패널_설정_그룹: Story = {
  name: 'MUI — 확장 패널 설정 그룹 (Cycle 117)',
  args: { type: 'single' },
  parameters: {
    docs: {
      description: {
        story:
          'MUI Accordion의 controlled expansion panel 패턴. 설정 섹션을 아코디언으로 그룹화하여 한 번에 하나씩 펼침. 필드-값 쌍, 인라인 액션 버튼 포함.',
      },
    },
  },
  render: () => <MuiExpansionPanelSettingsRender />,
}

/* --------------------------------------------------------------------------
   Chakra UI — 스텝 가이드 아코디언 (Cycle 117)
   Chakra의 step-by-step accordion guide 패턴
-------------------------------------------------------------------------- */
function ChakraStepGuideRender() {
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set(['step-1']))
  function toggleStep(step: string) {
    setCompletedSteps((prev) => {
      const next = new Set(prev)
      if (next.has(step)) next.delete(step)
      else next.add(step)
      return next
    })
  }
  const steps = [
    { id: 'step-1', title: '프로젝트 생성', desc: '새 Orbit UI 프로젝트를 초기화합니다.', code: 'pnpm create orbit-app my-app' },
    { id: 'step-2', title: 'EclipseProvider 설정', desc: '앱 루트에 EclipseProvider를 추가합니다.', code: '<EclipseProvider mode="light">' },
    { id: 'step-3', title: '컴포넌트 임포트', desc: '필요한 컴포넌트를 임포트합니다.', code: "import { SolidButton } from '@heejun-com/theme-eclipse'" },
    { id: 'step-4', title: '스토리북 실행', desc: 'Storybook을 실행해 컴포넌트를 확인합니다.', code: 'pnpm dev' },
  ]
  return (
    <div style={{ width: 500 }}>
      <div style={{ marginBottom: 12, fontSize: 13, color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>
        완료: {completedSteps.size}/{steps.length}단계
      </div>
      <Accordion type="multiple" className="w-full">
        {steps.map((step, i) => (
          <Accordion.Item key={step.id} value={step.id}>
            <Accordion.Trigger>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%' }}>
                <span style={{
                  width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 700,
                  background: completedSteps.has(step.id) ? '#10b981' : 'var(--sem-eclipse-color-backgroundSecondary)',
                  color: completedSteps.has(step.id) ? '#fff' : 'var(--sem-eclipse-color-foregroundSecondary)',
                  border: '1.5px solid',
                  borderColor: completedSteps.has(step.id) ? '#10b981' : 'var(--sem-eclipse-color-borderDefault)',
                }}>
                  {completedSteps.has(step.id) ? '✓' : i + 1}
                </span>
                <span>{step.title}</span>
                {completedSteps.has(step.id) && (
                  <LabelBadge color="sale" style={{ marginLeft: 'auto' }}>
                    <LabelBadge.Label>완료</LabelBadge.Label>
                  </LabelBadge>
                )}
              </span>
            </Accordion.Trigger>
            <Accordion.Content>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <p style={{ margin: 0, fontSize: 13, color: 'var(--sem-eclipse-color-foregroundSecondary)' }}>{step.desc}</p>
                <code style={{ display: 'block', padding: '8px 12px', borderRadius: 6, background: 'var(--sem-eclipse-color-backgroundSecondary)', fontSize: 12, fontFamily: 'monospace', color: 'var(--sem-eclipse-color-foregroundPrimary)', border: '1px solid var(--sem-eclipse-color-borderSubtle)' }}>
                  {step.code}
                </code>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Switch checked={completedSteps.has(step.id)} onCheckedChange={() => toggleStep(step.id)} />
                  <span style={{ fontSize: 12, color: 'var(--sem-eclipse-color-foregroundTertiary)', marginLeft: 8 }}>완료로 표시</span>
                </div>
              </div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

export const Chakra_스텝_가이드_아코디언: Story = {
  name: 'Chakra UI — 스텝 가이드 아코디언 (Cycle 117)',
  args: { type: 'multiple' },
  parameters: {
    docs: {
      description: {
        story:
          'Chakra UI의 step-by-step 아코디언 가이드 패턴. 완료 상태 인디케이터, 코드 블록, Switch로 완료 표시, LabelBadge로 상태 시각화.',
      },
    },
  },
  render: () => <ChakraStepGuideRender />,
}

/* --------------------------------------------------------------------------
   MUI + Chakra — 이슈 트래커 아코디언 (Cycle 117)
   이슈를 카테고리로 그룹화하는 프로젝트 관리 패턴
-------------------------------------------------------------------------- */
function MuiChakraIssueTrackerRender() {
  const categories = [
    {
      id: 'bug',
      label: '버그',
      color: '#ef4444',
      badge: 3,
      issues: [
        { id: 'BUG-042', title: 'Toggle 다크모드 색상 오류', priority: '높음' },
        { id: 'BUG-041', title: 'TextField placeholder 클리핑', priority: '중간' },
        { id: 'BUG-039', title: 'Accordion 중첩 렌더 문제', priority: '낮음' },
      ],
    },
    {
      id: 'feature',
      label: '기능 요청',
      color: '#6366f1',
      badge: 2,
      issues: [
        { id: 'FEAT-018', title: 'DatePicker 컴포넌트 추가', priority: '높음' },
        { id: 'FEAT-016', title: 'Combobox 다중 선택 지원', priority: '중간' },
      ],
    },
    {
      id: 'improvement',
      label: '개선',
      color: '#f59e0b',
      badge: 4,
      issues: [
        { id: 'IMP-027', title: 'SolidButton 로딩 애니메이션', priority: '중간' },
        { id: 'IMP-025', title: 'HoverCard 지연 시간 옵션', priority: '낮음' },
        { id: 'IMP-023', title: 'ScrollableTabGroup 스크롤 인디케이터', priority: '낮음' },
        { id: 'IMP-021', title: 'Avatar 그룹 오버랩 옵션', priority: '낮음' },
      ],
    },
  ]
  const priorityColor: Record<string, string> = {
    높음: '#ef4444', 중간: '#f59e0b', 낮음: '#94a3b8',
  }
  return (
    <div style={{ width: 480 }}>
      <Accordion type="multiple" defaultValue={['bug']} className="w-full">
        {categories.map((cat) => (
          <Accordion.Item key={cat.id} value={cat.id}>
            <Accordion.Trigger>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: cat.color, flexShrink: 0 }} />
                <span>{cat.label}</span>
                <LabelBadge color="gray" style={{ marginLeft: 'auto' }}>
                  <LabelBadge.Label>{cat.badge}</LabelBadge.Label>
                </LabelBadge>
              </span>
            </Accordion.Trigger>
            <Accordion.Content>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {cat.issues.map((issue) => (
                  <div key={issue.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 6, background: 'var(--sem-eclipse-color-backgroundSecondary)', border: '1px solid var(--sem-eclipse-color-borderSubtle)' }}>
                    <code style={{ fontSize: 11, color: 'var(--sem-eclipse-color-foregroundTertiary)', fontFamily: 'monospace', flexShrink: 0 }}>{issue.id}</code>
                    <span style={{ fontSize: 13, color: 'var(--sem-eclipse-color-foregroundPrimary)', flex: 1 }}>{issue.title}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: priorityColor[issue.priority], flexShrink: 0 }}>{issue.priority}</span>
                  </div>
                ))}
              </div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

export const MUI_Chakra_이슈_트래커_아코디언: Story = {
  name: 'MUI + Chakra — 이슈 트래커 아코디언 (Cycle 117)',
  args: { type: 'multiple' },
  parameters: {
    docs: {
      description: {
        story:
          'MUI + Chakra UI의 그룹 아코디언 패턴을 이슈 트래커에 적용. 카테고리(버그/기능/개선) 그룹화, LabelBadge 카운트, 우선순위 색상 코딩.',
      },
    },
  },
  render: () => <MuiChakraIssueTrackerRender />,
}

// Cycle 142 - Apple HIG + Google Material 3 benchmark

function AppleHIGSettingsGroup142Render() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>({
    darkMode: true,
    pushNotif: false,
    biometric: true,
    autoUpdate: true,
    analytics: false,
  })

  const toggle = (key: string) => setEnabled((e) => ({ ...e, [key]: !e[key] }))

  const groups = [
    {
      title: '화면 및 디스플레이',
      items: [
        { key: 'darkMode', label: '다크 모드', desc: '어두운 테마 사용' },
      ],
    },
    {
      title: '알림',
      items: [
        { key: 'pushNotif', label: '푸시 알림', desc: '앱 알림 수신 허용' },
      ],
    },
    {
      title: '보안',
      items: [
        { key: 'biometric', label: '생체 인증', desc: 'Face ID / Touch ID 사용' },
      ],
    },
    {
      title: '시스템',
      items: [
        { key: 'autoUpdate', label: '자동 업데이트', desc: '앱 자동 업데이트 허용' },
        { key: 'analytics', label: '사용 분석 공유', desc: '익명 사용 통계 전송' },
      ],
    },
  ]

  return (
    <div style={{ width: 360, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: '#0f172a' }}>설정</div>
        <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>Apple HIG — 설정 그룹 아코디언</div>
      </div>
      <Accordion type="multiple" defaultValue={['화면 및 디스플레이', '보안', '시스템']}>
        {groups.map((group) => (
          <Accordion.Item key={group.title} value={group.title}>
            <Accordion.Trigger>{group.title}</Accordion.Trigger>
            <Accordion.Content>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {group.items.map((item, i) => (
                  <div
                    key={item.key}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i < group.items.length - 1 ? '1px solid var(--sem-eclipse-color-borderSubtle)' : 'none' }}
                  >
                    <div>
                      <div style={{ fontSize: 13, color: 'var(--sem-eclipse-color-foregroundPrimary)', fontWeight: 500 }}>{item.label}</div>
                      <div style={{ fontSize: 11, color: 'var(--sem-eclipse-color-foregroundTertiary)', marginTop: 2 }}>{item.desc}</div>
                    </div>
                    <Switch
                      checked={enabled[item.key]}
                      onCheckedChange={() => toggle(item.key)}
                    />
                  </div>
                ))}
              </div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

export const Apple_HIG_설정_그룹_아코디언: Story = {
  name: 'Apple HIG — 설정 그룹 아코디언 (Cycle 142)',
  args: { type: 'multiple' },
  parameters: {
    docs: {
      description: {
        story: 'Apple HIG 설정 화면 패턴. multiple 타입 아코디언으로 카테고리 그룹화, Switch 토글로 옵션 제어. iOS 설정 앱 UX.',
      },
    },
  },
  render: () => <AppleHIGSettingsGroup142Render />,
}

function M3ExpansionPanel142Render() {
  const [openItem, setOpenItem] = useState<string | null>('design')

  const panels = [
    {
      id: 'design',
      title: 'Design Tokens',
      subtitle: '3단계 토큰 시스템',
      badge: '완료',
      color: '#6750a4',
      content: '레퍼런스 → 시맨틱 → 컴포넌트 토큰의 3단계 계층 구조. vanilla-extract CSS-in-JS로 완전한 타입 안전성 보장. 런타임 오버헤드 없는 제로-런타임 스타일링.',
    },
    {
      id: 'components',
      title: 'Core Components',
      subtitle: '기반 컴포넌트 세트',
      badge: '개발 중',
      color: '#0284c7',
      content: '비스타일 기반 컴포넌트(core 패키지)와 Eclipse 테마 컴포넌트의 분리. forwardRef, compound component 패턴 전면 적용. WAI-ARIA 접근성 기본 탑재.',
    },
    {
      id: 'theming',
      title: 'Eclipse Theme',
      subtitle: '프로덕션 레디 테마',
      badge: 'v2 Beta',
      color: '#059669',
      content: 'Figma 디자인 시스템과 1:1 매핑. 다크모드 CSS 변수 기반 자동 전환. 커스텀 테마 확장 API 제공. Storybook 141+ 사이클 스토리 포함.',
    },
  ]

  const badgeColor: Record<string, string> = { '완료': '#10b981', '개발 중': '#f59e0b', 'v2 Beta': '#6750a4' }

  return (
    <div style={{ width: 400, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ marginBottom: 14, fontSize: 11, color: '#64748b' }}>Google Material 3 — Expansion Panel 패턴</div>
      <Accordion type="single" value={openItem ?? ''} onValueChange={(v) => setOpenItem(v || null)}>
        {panels.map((panel) => (
          <Accordion.Item key={panel.id} value={panel.id} style={{ marginBottom: 8, border: `1px solid ${openItem === panel.id ? panel.color + '40' : 'var(--sem-eclipse-color-borderDefault)'}`, borderRadius: 12, overflow: 'hidden', transition: 'border-color 0.2s' }}>
            <Accordion.Trigger style={{ background: openItem === panel.id ? `${panel.color}08` : 'transparent' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: panel.color, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--sem-eclipse-color-foregroundPrimary)', textAlign: 'left' }}>{panel.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--sem-eclipse-color-foregroundTertiary)', textAlign: 'left' }}>{panel.subtitle}</div>
                </div>
                <span style={{ marginLeft: 'auto', marginRight: 8, fontSize: 10, fontWeight: 700, color: badgeColor[panel.badge], background: `${badgeColor[panel.badge]}15`, padding: '2px 8px', borderRadius: 10 }}>
                  {panel.badge}
                </span>
              </div>
            </Accordion.Trigger>
            <Accordion.Content>
              <div style={{ fontSize: 13, color: 'var(--sem-eclipse-color-foregroundSecondary)', lineHeight: 1.7, padding: '4px 0 8px' }}>
                {panel.content}
              </div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

export const M3_익스팬션_패널: Story = {
  name: 'Material 3 — Expansion Panel (Cycle 142)',
  args: { type: 'single' },
  parameters: {
    docs: {
      description: {
        story: 'Google Material 3 Expansion Panel 패턴. single 타입으로 하나만 열림. 활성 패널 테마 색상 보더/배경 강조, 배지 상태 표시.',
      },
    },
  },
  render: () => <M3ExpansionPanel142Render />,
}

function AppleM3FAQ142Render() {
  const faqs = [
    { q: 'Orbit UI는 Next.js에서 사용할 수 있나요?', a: '네. theme-eclipse 패키지의 server/ 디렉토리에 서버 컴포넌트 래퍼가 포함되어 있습니다. Next.js 13+ App Router와 완전히 호환됩니다.' },
    { q: '기존 Tailwind CSS 프로젝트에 적용하려면?', a: 'pnpm add @heejun-com/theme-eclipse 후, tailwind.config.ts에 orbit-ui 프리셋을 추가하세요. 기존 클래스와 충돌 없이 사용할 수 있습니다.' },
    { q: '커스텀 테마를 만들려면 어떻게 하나요?', a: 'EclipseProvider에 theme prop으로 토큰 오버라이드 객체를 전달하세요. CSS 변수 기반이라 런타임에서도 동적 변경이 가능합니다.' },
    { q: 'TypeScript 없이도 사용 가능한가요?', a: 'JavaScript로도 import 가능하나, 타입 추론과 자동완성의 이점을 위해 TypeScript 사용을 권장합니다.' },
    { q: '아이콘은 어떻게 사용하나요?', a: '@heejun-com/icons 패키지를 별도 설치하세요. 모든 아이콘은 SVG 기반 React 컴포넌트로 tree-shaking을 지원합니다.' },
  ]

  return (
    <div style={{ width: 420, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>자주 묻는 질문</div>
        <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 3 }}>Apple HIG + M3 — FAQ 아코디언 패턴</div>
      </div>
      <Accordion type="single">
        {faqs.map((faq, i) => (
          <Accordion.Item key={i} value={String(i)}>
            <Accordion.Trigger>
              <span style={{ textAlign: 'left', fontSize: 13, fontWeight: 500 }}>{faq.q}</span>
            </Accordion.Trigger>
            <Accordion.Content>
              <div style={{ fontSize: 13, color: 'var(--sem-eclipse-color-foregroundSecondary)', lineHeight: 1.7, padding: '4px 0 8px' }}>
                {faq.a}
              </div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

export const Apple_M3_FAQ_아코디언: Story = {
  name: 'Apple HIG + Material 3 — FAQ 아코디언 (Cycle 142)',
  args: { type: 'single' },
  parameters: {
    docs: {
      description: {
        story: 'Apple HIG + Material 3 FAQ 패턴. single 타입 아코디언으로 하나만 펼쳐지는 표준 FAQ UI. Orbit UI 실제 사용법 Q&A로 구성.',
      },
    },
  },
  render: () => <AppleM3FAQ142Render />,
}
