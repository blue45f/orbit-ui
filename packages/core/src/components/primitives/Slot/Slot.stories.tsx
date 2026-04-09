import { Plug, slotted } from './Slot'

export default {
  args: {},
  title: 'Internal/Slot',
}

const codeStyle: React.CSSProperties = {
  padding: '2px 6px', borderRadius: '4px', background: '#f1f5f9',
  fontSize: '12px', fontWeight: 600, fontFamily: '"JetBrains Mono", monospace', color: '#6366f1',
}

const Card = slotted(['icon', 'title', 'actions'], ({ slots }) => {
  return (
    <div style={{
      padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0',
      display: 'flex', alignItems: 'center', gap: '12px',
    }}>
      {slots.icon && <div style={{ flexShrink: 0 }}>{slots.icon}</div>}
      <div style={{ flex: 1 }}>
        {slots.title && <div style={{ fontSize: '15px', fontWeight: 600, marginBottom: '4px' }}>{slots.title}</div>}
        {slots.default}
      </div>
      {slots.actions && <div style={{ flexShrink: 0 }}>{slots.actions}</div>}
    </div>
  )
})

export const 기본: React.FC = () => {
  return (
    <div style={{ maxWidth: '640px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 8px' }}>Slot System</h2>
        <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
          Slot은 컴포넌트 내부의 특정 위치에 콘텐츠를 주입하는 패턴입니다.
          <code style={codeStyle}>slotted()</code>로 슬롯을 정의하고, <code style={codeStyle}>{'<Plug>'}</code>로 콘텐츠를 배치합니다.
        </p>
      </div>

      {/* Demo */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '13px', fontWeight: 600, color: '#64748b', marginBottom: '12px' }}>Live Example</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Full slots */}
          <Card>
            <Plug key="icon" name="icon">
              <div style={{
                width: '36px', height: '36px', borderRadius: '8px', background: '#6366f1',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '14px', fontWeight: 700,
              }}>A</div>
            </Plug>
            <Plug key="title" name="title">Card with all slots</Plug>
            <span style={{ fontSize: '13px', color: '#64748b' }}>Default slot content goes here</span>
            <Plug key="actions" name="actions">
              <button style={{
                padding: '6px 12px', borderRadius: '6px', border: '1px solid #e2e8f0',
                background: '#fff', fontSize: '12px', fontWeight: 500, cursor: 'pointer',
              }}>Action</button>
            </Plug>
          </Card>

          {/* Partial slots */}
          <Card>
            <Plug key="title" name="title">Title only (no icon, no actions)</Plug>
            <span style={{ fontSize: '13px', color: '#64748b' }}>Slots are optional - components adapt gracefully</span>
          </Card>

          {/* Default only */}
          <Card>
            <span style={{ fontSize: '13px', color: '#64748b' }}>Only default slot - no named slots used</span>
          </Card>
        </div>
      </div>

      {/* Code */}
      <div>
        <div style={{ fontSize: '13px', fontWeight: 600, color: '#64748b', marginBottom: '12px' }}>Code</div>
        <pre style={{
          padding: '20px', borderRadius: '12px', background: '#0f172a', color: '#e2e8f0',
          fontSize: '12px', lineHeight: 1.8, fontFamily: '"JetBrains Mono", monospace',
          overflow: 'auto', border: '1px solid #1e293b', margin: 0,
        }}>
{`// 1. Define slots
const Card = slotted(['icon', 'title', 'actions'], ({ slots }) => (
  <div>
    {slots.icon}
    {slots.title}
    {slots.default}
    {slots.actions}
  </div>
))

// 2. Use with <Plug>
<Card>
  <Plug name="icon"><UserIcon /></Plug>
  <Plug name="title">Card Title</Plug>
  <span>Default content</span>
  <Plug name="actions"><Button>Edit</Button></Plug>
</Card>`}
        </pre>
      </div>
    </div>
  )
}
