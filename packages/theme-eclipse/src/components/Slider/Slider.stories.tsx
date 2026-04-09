import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Slider } from './Slider'

const meta = {
  title: 'eclipse/Inputs/Pickers/Slider',
  component: Slider,
  tags: ['autodocs'],
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const 기본: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 1,
  },
  render: (args) => (
    <div style={{ width: '300px' }}>
      <Slider {...args} />
    </div>
  ),
}

/* --------------------------------------------------------------------------
   범위 선택 (Range Selection)
   Radix Slider 패턴: 두 개의 thumb으로 범위를 지정하는 패턴.
   가격 필터, 날짜 범위 등에서 활용됩니다.
-------------------------------------------------------------------------- */
const RangeSelectionRender = () => {
  const [range, setRange] = useState([20, 80])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '320px' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>가격 범위</span>
          <span style={{ fontSize: '13px', color: '#6366f1', fontWeight: 700 }}>
            {range[0].toLocaleString()}원 ~ {range[1].toLocaleString()}원
          </span>
        </div>
        <Slider
          value={range}
          onValueChange={setRange}
          min={0}
          max={100}
          step={1}
          aria-label="가격 범위"
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
          <span style={{ fontSize: '11px', color: '#94a3b8' }}>0원</span>
          <span style={{ fontSize: '11px', color: '#94a3b8' }}>100원</span>
        </div>
      </div>

      <div style={{
        padding: '12px 16px',
        borderRadius: '10px',
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        fontSize: '13px',
        color: '#64748b',
      }}>
        선택된 범위: <strong style={{ color: '#1e293b' }}>{range[0]}</strong> ~ <strong style={{ color: '#1e293b' }}>{range[1]}</strong>
        &nbsp;(총 {range[1] - range[0]} 단위)
      </div>
    </div>
  )
}

export const 범위선택: Story = {
  render: () => <RangeSelectionRender />,
}

/* --------------------------------------------------------------------------
   볼륨 컨트롤 패턴
   Radix Slider + 접근성 패턴: aria-label, aria-valuetext를 활용한 시각적 피드백.
   키보드(좌/우 방향키)로 조절 가능하며 스크린리더에 값 변화를 알립니다.
-------------------------------------------------------------------------- */
const VolumeControlRender = () => {
  const [volume, setVolume] = useState([60])
  const [muted, setMuted] = useState(false)

  const displayVolume = muted ? 0 : volume[0]

  const getVolumeIcon = () => {
    if (displayVolume === 0) return '(음소거)'
    if (displayVolume < 40) return '(낮음)'
    if (displayVolume < 75) return '(보통)'
    return '(높음)'
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '300px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          onClick={() => setMuted((m) => !m)}
          aria-label={muted ? '음소거 해제' : '음소거'}
          aria-pressed={muted}
          style={{
            width: '36px', height: '36px',
            borderRadius: '8px',
            border: '1.5px solid #e2e8f0',
            background: muted ? '#fee2e2' : '#f8fafc',
            color: muted ? '#ef4444' : '#64748b',
            cursor: 'pointer',
            fontSize: '16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {displayVolume === 0 ? 'X' : 'V'}
        </button>
        <div style={{ flex: 1 }}>
          <Slider
            value={[displayVolume]}
            onValueChange={(v) => {
              setMuted(false)
              setVolume(v)
            }}
            min={0}
            max={100}
            step={1}
            aria-label="볼륨"
            aria-valuetext={`볼륨 ${displayVolume}% ${getVolumeIcon()}`}
          />
        </div>
        <span style={{
          width: '36px',
          fontSize: '13px',
          fontWeight: 700,
          color: displayVolume === 0 ? '#94a3b8' : '#1e293b',
          textAlign: 'right',
          flexShrink: 0,
        }}>
          {displayVolume}
        </span>
      </div>

      <div style={{
        padding: '10px 14px',
        borderRadius: '8px',
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        fontSize: '12px',
        color: '#94a3b8',
      }}>
        키보드: 좌/우 방향키로 1씩 조절 | Home/End로 최소/최대
      </div>
    </div>
  )
}

export const 볼륨컨트롤: Story = {
  render: () => <VolumeControlRender />,
}

/* --------------------------------------------------------------------------
   단계별 설정 슬라이더
   값에 따라 레이블이 변하는 패턴 (품질 설정, 난이도 조절 등)
-------------------------------------------------------------------------- */
const StepLabelRender = () => {
  const [quality, setQuality] = useState([2])

  const labels = ['낮음', '보통', '높음', '최고']
  const colors = ['#94a3b8', '#f59e0b', '#6366f1', '#10b981']

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>영상 품질</span>
        <span style={{
          fontSize: '13px',
          fontWeight: 700,
          color: colors[quality[0]],
          padding: '2px 10px',
          borderRadius: '20px',
          background: `${colors[quality[0]]}18`,
        }}>
          {labels[quality[0]]}
        </span>
      </div>
      <Slider
        value={quality}
        onValueChange={setQuality}
        min={0}
        max={3}
        step={1}
        aria-label="영상 품질 선택"
        aria-valuetext={labels[quality[0]]}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {labels.map((l, i) => (
          <span key={l} style={{ fontSize: '11px', color: i === quality[0] ? colors[i] : '#94a3b8', fontWeight: i === quality[0] ? 700 : 400 }}>
            {l}
          </span>
        ))}
      </div>
    </div>
  )
}

export const 단계별설정: Story = {
  render: () => <StepLabelRender />,
}

/* --------------------------------------------------------------------------
   Raycast 스타일 키보드 단축키 설정
   Raycast 패턴: 슬라이더로 수치를 조정하고 키보드 단축키로도 제어 가능.
   Up/Down 화살표로 값 조정 + 슬라이더 조합. Compact UI 밀도.
-------------------------------------------------------------------------- */
const RaycastSettingsRender = () => {
  const [windowOpacity, setWindowOpacity] = useState([90])
  const [fontSize, setFontSize] = useState([14])
  const [animationSpeed, setAnimationSpeed] = useState([2])

  const animLabels = ['Off', 'Slow', 'Normal', 'Fast']
  const animColors = ['#94a3b8', '#6366f1', '#10b981', '#f59e0b']

  return (
    <div style={{
      width: '360px', borderRadius: '12px', border: '1px solid #e2e8f0',
      background: '#fff', overflow: 'hidden',
      boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
    }}>
      {/* Header */}
      <div style={{
        padding: '14px 16px',
        borderBottom: '1px solid #f1f5f9',
        background: '#fafafa',
        display: 'flex', alignItems: 'center', gap: '10px',
      }}>
        <div style={{
          width: '28px', height: '28px', borderRadius: '7px',
          background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="3" stroke="#fff" strokeWidth="1.5" />
            <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </div>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Appearance</div>
          <div style={{ fontSize: '11px', color: '#94a3b8' }}>Raycast Settings</div>
        </div>
      </div>

      {/* Settings rows */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {/* Window Opacity */}
        <div style={{ padding: '14px 16px', borderBottom: '1px solid #f8fafc' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 500, color: '#0f172a' }}>Window Opacity</div>
              <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                Press{' '}
                <kbd style={{ padding: '1px 4px', borderRadius: '3px', background: '#f1f5f9', border: '1px solid #e2e8f0', fontSize: '10px', fontFamily: 'monospace', color: '#475569' }}>
                  Shift+Up/Down
                </kbd>
                {' '}to adjust
              </div>
            </div>
            <span style={{
              fontSize: '13px', fontWeight: 700, color: '#0f172a',
              minWidth: '36px', textAlign: 'right',
            }}>
              {windowOpacity[0]}%
            </span>
          </div>
          <Slider
            value={windowOpacity}
            onValueChange={setWindowOpacity}
            min={60}
            max={100}
            step={5}
            aria-label="Window opacity"
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
            <span style={{ fontSize: '10px', color: '#cbd5e1' }}>60%</span>
            <span style={{ fontSize: '10px', color: '#cbd5e1' }}>100%</span>
          </div>
        </div>

        {/* Font Size */}
        <div style={{ padding: '14px 16px', borderBottom: '1px solid #f8fafc' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 500, color: '#0f172a' }}>Font Size</div>
              <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                Preview:{' '}
                <span style={{ fontSize: `${fontSize[0]}px`, fontWeight: 600, color: '#6366f1' }}>Aa</span>
              </div>
            </div>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', minWidth: '36px', textAlign: 'right' }}>
              {fontSize[0]}px
            </span>
          </div>
          <Slider
            value={fontSize}
            onValueChange={setFontSize}
            min={11}
            max={20}
            step={1}
            aria-label="Font size"
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
            <span style={{ fontSize: '10px', color: '#cbd5e1' }}>11px</span>
            <span style={{ fontSize: '10px', color: '#cbd5e1' }}>20px</span>
          </div>
        </div>

        {/* Animation Speed */}
        <div style={{ padding: '14px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 500, color: '#0f172a' }}>Animation Speed</div>
              <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>Controls UI transition speed</div>
            </div>
            <span style={{
              fontSize: '12px', fontWeight: 700,
              color: animColors[animationSpeed[0]],
              padding: '2px 8px', borderRadius: '4px',
              background: `${animColors[animationSpeed[0]]}12`,
            }}>
              {animLabels[animationSpeed[0]]}
            </span>
          </div>
          <Slider
            value={animationSpeed}
            onValueChange={setAnimationSpeed}
            min={0}
            max={3}
            step={1}
            aria-label="Animation speed"
            aria-valuetext={animLabels[animationSpeed[0]]}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
            {animLabels.map((label, i) => (
              <span key={label} style={{
                fontSize: '10px',
                color: i === animationSpeed[0] ? animColors[i] : '#cbd5e1',
                fontWeight: i === animationSpeed[0] ? 700 : 400,
                transition: 'color 0.2s',
              }}>
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export const Raycast_설정패널: Story = {
  render: () => <RaycastSettingsRender />,
}
