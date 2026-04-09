import { Meta } from '@storybook/react'

import * as coreStyle from '../../../styles'

import { ContainerLayer, StateLayer, ContentLayer } from './Layer'


ContainerLayer.displayName = 'ContainerLayer'
StateLayer.displayName = 'StateLayer'
ContentLayer.displayName = 'ContentLayer'

const meta = {
  title: 'Internal/Layer',
  component: ContainerLayer,
  parameters: {
    docs: {
      description: {
        component: `**Layer**는 Orbit UI 컴포넌트의 핵심 빌딩 블록입니다.

버튼, 카드 같은 UI 요소를 **4개의 물리적 레이어**로 분리하여, 각 레이어의 스타일과 상태를 독립적으로 제어합니다.

- **ContainerLayer** — 최외곽 래퍼. padding, border-radius, shadow 담당
- **StateLayer** — hover/press 시 반투명 오버레이로 상태 피드백 제공 (absolute 위치)
- **BorderLayer** — 테두리만 담당하는 전용 레이어
- **ContentLayer** — 텍스트, 아이콘 등 실제 콘텐츠를 Flex로 배치

예를 들어 \`SolidButton\`은 내부적으로 이 4개 레이어를 합성하여 구현됩니다.`,
      },
    },
  },
  args: {
    children: '시작하기',
  },
} satisfies Meta<typeof ContainerLayer>

export default meta

const codeStyle: React.CSSProperties = {
  padding: '2px 6px', borderRadius: '4px', background: '#f1f5f9',
  fontSize: '12px', fontWeight: 600, fontFamily: '"JetBrains Mono", monospace',
}

const sectionStyle: React.CSSProperties = {
  marginBottom: '32px',
}

const labelStyle: React.CSSProperties = {
  fontSize: '13px', fontWeight: 600, color: '#64748b', marginBottom: '12px',
}

export const 기본 = {
  // eslint-disable-next-line
  render: () => {
    return (
      <div style={{ maxWidth: '640px' }}>
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 8px' }}>Layer System</h2>
          <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
            Orbit UI의 모든 컴포넌트는 4개의 물리적 레이어로 구성됩니다.
            각 레이어는 독립적으로 스타일과 상태를 제어합니다.
          </p>
        </div>

        {/* Interactive Demo */}
        <div style={sectionStyle}>
          <div style={labelStyle}>Interactive Demo (hover & click)</div>
          <ContainerLayer
            as="button"
            style={{
              ...coreStyle.reset.button,
              padding: '16px 24px',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              cursor: 'pointer',
              width: '100%',
              textAlign: 'left',
            }}
          >
            <StateLayer style={{ backgroundColor: "rgba(0,0,0,0.1)", transition: "background-color 0.2s ease", borderRadius: "12px" }} />
            <ContentLayer direction="horizontal" style={{ gap: '12px', alignItems: 'center' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '10px',
                background: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: '16px', fontWeight: 700,
              }}>L</div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '2px' }}>ContainerLayer + StateLayer + ContentLayer</div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>Hover하면 StateLayer가 반응하고, ContentLayer는 가려지지 않습니다</div>
              </div>
            </ContentLayer>
          </ContainerLayer>
        </div>

        {/* Layer Breakdown */}
        <div style={sectionStyle}>
          <div style={labelStyle}>Layer Breakdown</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {[
              { name: 'ContainerLayer', desc: '최외곽 래퍼. border-radius, shadow, padding을 담당', color: '#64748b', code: '<ContainerLayer as="button">' },
              { name: 'StateLayer', desc: 'hover/press 시각 효과 오버레이. absolute로 컨테이너를 덮음', color: '#6366f1', code: '<StateLayer style={{ backgroundColor: "rgba(0,0,0,0.1)", transition: "background-color 0.2s ease", borderRadius: "12px" }} />' },
              { name: 'BorderLayer', desc: '테두리 전용 레이어. border-width/color를 독립 제어', color: '#3b82f6', code: '<BorderLayer />' },
              { name: 'ContentLayer', desc: '텍스트/아이콘 등 실제 콘텐츠. Flex 기반 레이아웃', color: '#10b981', code: '<ContentLayer direction="horizontal">' },
            ].map((l, i) => (
              <div key={i} style={{
                padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: l.color }} />
                  <span style={{ fontSize: '13px', fontWeight: 700 }}>{l.name}</span>
                </div>
                <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 8px', lineHeight: 1.5 }}>{l.desc}</p>
                <code style={{ ...codeStyle, color: l.color }}>{l.code}</code>
              </div>
            ))}
          </div>
        </div>

        {/* Code Example */}
        <div style={sectionStyle}>
          <div style={labelStyle}>Usage Example</div>
          <pre style={{
            padding: '20px', borderRadius: '12px', background: '#0f172a', color: '#e2e8f0',
            fontSize: '12px', lineHeight: 1.8, fontFamily: '"JetBrains Mono", monospace',
            overflow: 'auto', border: '1px solid #1e293b', margin: 0,
          }}>
{`<ContainerLayer as="button" style={{ padding: '12px 20px' }}>
  <StateLayer className={stateStyles} />
  <BorderLayer />
  <ContentLayer direction="horizontal">
    <Icon />
    <span>Button Text</span>
  </ContentLayer>
</ContainerLayer>`}
          </pre>
        </div>
      </div>
    )
  },
}
