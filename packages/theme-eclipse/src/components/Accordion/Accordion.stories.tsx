import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { Accordion } from './Accordion'

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
