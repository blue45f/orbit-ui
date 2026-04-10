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

/* --------------------------------------------------------------------------
   Mantine 가격 필터 패턴
   Mantine RangeSlider: 최솟값/최댓값 입력 + 슬라이더 연동, 라이브 필터링
-------------------------------------------------------------------------- */
const MantinePriceFilterRender = () => {
  const [price, setPrice] = useState([15000, 85000])
  const [minInput, setMinInput] = useState(String(price[0]))
  const [maxInput, setMaxInput] = useState(String(price[1]))

  const applyInput = () => {
    const min = Math.min(Number(minInput), price[1] - 1000)
    const max = Math.max(Number(maxInput), price[0] + 1000)
    const clamped: [number, number] = [
      Math.max(0, Math.min(min, 99000)),
      Math.max(1000, Math.min(max, 100000)),
    ]
    setPrice(clamped)
    setMinInput(String(clamped[0]))
    setMaxInput(String(clamped[1]))
  }

  const products = [
    { name: '베이직 플랜', price: 9900 },
    { name: '스탠다드 플랜', price: 29000 },
    { name: '프로 플랜', price: 59000 },
    { name: '엔터프라이즈', price: 99000 },
    { name: '팀 플랜', price: 45000 },
  ]
  const filtered = products.filter((p) => p.price >= price[0] && p.price <= price[1])

  return (
    <div style={{ width: 340, display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: '#1e293b' }}>가격 필터</div>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <input
          type="number"
          value={minInput}
          onChange={(e) => setMinInput(e.target.value)}
          onBlur={applyInput}
          style={{
            flex: 1, padding: '6px 10px', borderRadius: 8, border: '1px solid #e2e8f0',
            fontSize: 13, fontWeight: 600, color: '#1e293b', outline: 'none',
          }}
          aria-label="최소 가격"
        />
        <span style={{ color: '#94a3b8', fontSize: 13 }}>~</span>
        <input
          type="number"
          value={maxInput}
          onChange={(e) => setMaxInput(e.target.value)}
          onBlur={applyInput}
          style={{
            flex: 1, padding: '6px 10px', borderRadius: 8, border: '1px solid #e2e8f0',
            fontSize: 13, fontWeight: 600, color: '#1e293b', outline: 'none',
          }}
          aria-label="최대 가격"
        />
      </div>

      <Slider
        value={price}
        onValueChange={(v) => {
          setPrice(v)
          setMinInput(String(v[0]))
          setMaxInput(String(v[1]))
        }}
        min={0}
        max={100000}
        step={1000}
        aria-label="가격 범위"
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
          {filtered.length}개 상품 매칭
        </div>
        {filtered.map((p) => (
          <div
            key={p.name}
            style={{
              display: 'flex', justifyContent: 'space-between',
              padding: '8px 12px', borderRadius: 8,
              border: '1px solid #e2e8f0', background: '#f8fafc',
            }}
          >
            <span style={{ fontSize: 13, color: '#1e293b', fontWeight: 500 }}>{p.name}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#6366f1' }}>
              {p.price.toLocaleString()}원
            </span>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ fontSize: 13, color: '#94a3b8', textAlign: 'center', padding: '16px 0' }}>
            해당 범위의 상품이 없습니다.
          </div>
        )}
      </div>
    </div>
  )
}

export const Mantine_가격_필터: Story = {
  name: 'Mantine - 가격 범위 입력 + 라이브 필터링 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Mantine RangeSlider 패턴. 텍스트 입력과 슬라이더를 양방향으로 연동하여 가격 범위를 설정합니다. ' +
          'blur 이벤트로 입력값 검증 후 슬라이더와 동기화합니다.',
      },
    },
  },
  render: () => <MantinePriceFilterRender />,
}

/* --------------------------------------------------------------------------
   Chakra UI 밝기/채도 조절 패턴
   Chakra Slider: 여러 슬라이더를 쌓아 이미지 편집 도구처럼 구성
-------------------------------------------------------------------------- */
const ChakraImageEditRender = () => {
  const [brightness, setBrightness] = useState([100])
  const [contrast, setContrast] = useState([100])
  const [saturation, setSaturation] = useState([100])

  const filter = `brightness(${brightness[0]}%) contrast(${contrast[0]}%) saturate(${saturation[0]}%)`

  const rows = [
    { label: '밝기', value: brightness, onChange: setBrightness, min: 0, max: 200, color: '#f59e0b' },
    { label: '대비', value: contrast, onChange: setContrast, min: 0, max: 200, color: '#6366f1' },
    { label: '채도', value: saturation, onChange: setSaturation, min: 0, max: 200, color: '#10b981' },
  ]

  return (
    <div style={{ width: 340, display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Image preview */}
      <div
        style={{
          height: 160,
          borderRadius: 12,
          overflow: 'hidden',
          border: '1px solid #e2e8f0',
          filter,
          transition: 'filter 0.1s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        }}
      >
        <span style={{ fontSize: 40, filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))' }}>
          {brightness[0] < 50 ? '🌑' : brightness[0] < 100 ? '🌒' : brightness[0] < 150 ? '🌕' : '☀️'}
        </span>
      </div>

      {rows.map((row) => (
        <div key={row.label}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{row.label}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: row.color }}>{row.value[0]}%</span>
          </div>
          <Slider
            value={row.value}
            onValueChange={row.onChange}
            min={row.min}
            max={row.max}
            step={1}
            aria-label={row.label}
          />
        </div>
      ))}

      <button
        onClick={() => { setBrightness([100]); setContrast([100]); setSaturation([100]) }}
        style={{
          padding: '8px 16px', borderRadius: 8, border: '1px solid #e2e8f0',
          background: '#f8fafc', color: '#64748b', fontSize: 12, fontWeight: 600,
          cursor: 'pointer', alignSelf: 'flex-end',
        }}
      >
        초기화
      </button>
    </div>
  )
}

export const Chakra_이미지_편집기: Story = {
  name: 'Chakra UI - 이미지 필터 편집기 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Chakra UI Slider 다중 스택 패턴. 밝기/대비/채도를 각각 슬라이더로 제어하며 CSS filter를 실시간 반영합니다. ' +
          '리셋 버튼으로 기본값 복귀를 지원합니다.',
      },
    },
  },
  render: () => <ChakraImageEditRender />,
}

/* --------------------------------------------------------------------------
   MUI 단계별 시간 슬라이더 패턴
   MUI Slider marks: 고정 스텝 구간에 레이블을 표시, 미팅 시간 조율 UI
-------------------------------------------------------------------------- */
const MuiTimeSliderRender = () => {
  const [duration, setDuration] = useState([30])

  const marks = [15, 30, 45, 60, 90, 120]
  const formatTime = (min: number) =>
    min >= 60 ? `${Math.floor(min / 60)}시간${min % 60 > 0 ? ` ${min % 60}분` : ''}` : `${min}분`

  return (
    <div style={{ width: 340, display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#1e293b', marginBottom: 4 }}>
          미팅 시간 설정
        </div>
        <div style={{ fontSize: 12, color: '#94a3b8' }}>
          슬라이더를 드래그하거나 구간을 클릭하세요
        </div>
      </div>

      <div
        style={{
          padding: '20px 24px 16px',
          borderRadius: 12,
          border: '1px solid #e2e8f0',
          background: '#f8fafc',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 36, fontWeight: 800, color: '#6366f1', letterSpacing: '-0.03em', marginBottom: 4 }}>
          {formatTime(duration[0])}
        </div>
        <div style={{ fontSize: 12, color: '#94a3b8' }}>미팅 소요 시간</div>
      </div>

      <div style={{ padding: '0 4px' }}>
        <Slider
          value={duration}
          onValueChange={setDuration}
          min={15}
          max={120}
          step={15}
          aria-label="미팅 시간"
          aria-valuetext={formatTime(duration[0])}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
          {marks.map((m) => (
            <span
              key={m}
              style={{
                fontSize: '10px',
                color: m === duration[0] ? '#6366f1' : '#cbd5e1',
                fontWeight: m === duration[0] ? 700 : 400,
                cursor: 'pointer',
              }}
              onClick={() => setDuration([m])}
            >
              {formatTime(m)}
            </span>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {[
          { label: '일반 미팅', duration: 30, color: '#6366f1' },
          { label: '1:1 미팅', duration: 45, color: '#8b5cf6' },
          { label: '스탠드업', duration: 15, color: '#10b981' },
          { label: '전략 회의', duration: 90, color: '#f59e0b' },
        ].map((preset) => (
          <button
            key={preset.label}
            onClick={() => setDuration([preset.duration])}
            style={{
              padding: '8px 12px', borderRadius: 8,
              border: `1.5px solid ${duration[0] === preset.duration ? preset.color : '#e2e8f0'}`,
              background: duration[0] === preset.duration ? `${preset.color}10` : '#fff',
              cursor: 'pointer', fontSize: 12, fontWeight: 600,
              color: duration[0] === preset.duration ? preset.color : '#64748b',
              transition: 'all 0.15s',
            }}
          >
            {preset.label} ({formatTime(preset.duration)})
          </button>
        ))}
      </div>
    </div>
  )
}

export const MUI_시간_슬라이더: Story = {
  name: 'MUI - 고정 구간 미팅 시간 설정 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'MUI Slider marks 패턴. 15분 단위 고정 스텝에 레이블을 표시하고 프리셋 버튼을 제공합니다. ' +
          '구간 클릭 + 프리셋 버튼으로 빠른 값 설정을 지원합니다.',
      },
    },
  },
  render: () => <MuiTimeSliderRender />,
}

/* --------------------------------------------------------------------------
   Radix UI 벤치마크: HSL 색상 편집기
   Radix Slider를 3개 조합해 Hue/Saturation/Lightness 색상 조절기 구현
-------------------------------------------------------------------------- */
function RadixHslEditorRender() {
  const [hsl, setHsl] = useState<[number, number, number]>([220, 70, 55])

  const [h, s, l] = hsl
  const hexFromHsl = (hue: number, sat: number, lig: number) => {
    const a = (sat * Math.min(lig, 100 - lig)) / 100
    const f = (n: number) => {
      const k = (n + hue / 30) % 12
      const color = lig - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
      return Math.round(255 * color / 100).toString(16).padStart(2, '0')
    }
    return `#${f(0)}${f(8)}${f(4)}`
  }

  const previewColor = `hsl(${h}, ${s}%, ${l}%)`
  const hexColor = hexFromHsl(h, s, l)

  const sliders: { label: string; key: 0 | 1 | 2; max: number; unit: string; gradient: string }[] = [
    {
      label: 'Hue',
      key: 0,
      max: 360,
      unit: '°',
      gradient: 'linear-gradient(to right, hsl(0,80%,55%), hsl(60,80%,55%), hsl(120,80%,55%), hsl(180,80%,55%), hsl(240,80%,55%), hsl(300,80%,55%), hsl(360,80%,55%))',
    },
    {
      label: 'Saturation',
      key: 1,
      max: 100,
      unit: '%',
      gradient: `linear-gradient(to right, hsl(${h},0%,${l}%), hsl(${h},100%,${l}%))`,
    },
    {
      label: 'Lightness',
      key: 2,
      max: 100,
      unit: '%',
      gradient: `linear-gradient(to right, hsl(${h},${s}%,0%), hsl(${h},${s}%,50%), hsl(${h},${s}%,100%))`,
    },
  ]

  return (
    <div style={{ width: 340, display: 'flex', flexDirection: 'column', gap: 24, padding: 24, background: '#fff', borderRadius: 14, border: '1px solid #e2e8f0' }}>
      <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
        <div style={{ width: 64, height: 64, borderRadius: 12, background: previewColor, border: '2px solid #e2e8f0', flexShrink: 0 }} />
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#1e293b', letterSpacing: '-0.02em' }}>{hexColor}</div>
          <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>hsl({h}, {s}%, {l}%)</div>
        </div>
      </div>
      {sliders.map((sl) => (
        <div key={sl.label}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#475569' }}>{sl.label}</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#1e293b' }}>{hsl[sl.key]}{sl.unit}</span>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: 0, right: 0, height: 8, borderRadius: 4, background: sl.gradient }} />
            <Slider
              value={[hsl[sl.key]]}
              max={sl.max}
              step={1}
              onValueChange={(val) => {
                const next: [number, number, number] = [hsl[0], hsl[1], hsl[2]]
                next[sl.key] = val[0]
                setHsl(next)
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export const Radix_HSL_색상_편집기: Story = {
  name: 'Radix UI - HSL 색상 편집기 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Radix Slider 3개를 조합한 HSL 색상 편집기. Hue/Saturation/Lightness를 독립적으로 제어하며 ' +
          '각 슬라이더의 트랙 배경을 그라데이션으로 현재 색상 범위를 시각화합니다.',
      },
    },
  },
  render: () => <RadixHslEditorRender />,
}

/* --------------------------------------------------------------------------
   Linear Design 벤치마크: 우선순위 스코어링 슬라이더
   Linear의 Impact x Urgency 매트릭스를 슬라이더 2개로 구현
-------------------------------------------------------------------------- */
function LinearPriorityRender() {
  const [impact, setImpact] = useState([50])
  const [urgency, setUrgency] = useState([30])

  const score = Math.round((impact[0] * 0.6 + urgency[0] * 0.4))

  const getPriorityLabel = (s: number) => {
    if (s >= 80) return { label: '긴급', color: '#ef4444', bg: '#fee2e2' }
    if (s >= 60) return { label: '높음', color: '#f97316', bg: '#ffedd5' }
    if (s >= 40) return { label: '보통', color: '#f59e0b', bg: '#fef3c7' }
    if (s >= 20) return { label: '낮음', color: '#6366f1', bg: '#eef2ff' }
    return { label: '없음', color: '#94a3b8', bg: '#f1f5f9' }
  }

  const priority = getPriorityLabel(score)

  return (
    <div style={{ width: 340, display: 'flex', flexDirection: 'column', gap: 20, padding: 24, background: '#fff', borderRadius: 14, border: '1px solid #e2e8f0' }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#1e293b', marginBottom: 4 }}>우선순위 산정</div>
        <div style={{ fontSize: 12, color: '#64748b' }}>Impact x Urgency 가중 평균 (6:4)</div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: 10, background: priority.bg, border: `1.5px solid ${priority.color}30` }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: priority.color, textTransform: 'uppercase', letterSpacing: '0.05em' }}>우선순위</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: priority.color }}>{priority.label}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 36, fontWeight: 900, color: priority.color, lineHeight: 1 }}>{score}</div>
          <div style={{ fontSize: 11, color: priority.color + 'aa' }}>/100</div>
        </div>
      </div>

      {[
        { label: 'Impact (영향도)', value: impact, onChange: setImpact, color: '#6366f1', desc: '비즈니스/사용자에 미치는 영향' },
        { label: 'Urgency (긴급도)', value: urgency, onChange: setUrgency, color: '#f97316', desc: '처리 시기의 긴급성' },
      ].map((item) => (
        <div key={item.label}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#1e293b' }}>{item.label}</span>
            <span style={{ fontSize: 16, fontWeight: 800, color: item.color }}>{item.value[0]}</span>
          </div>
          <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 8 }}>{item.desc}</div>
          <Slider
            value={item.value}
            max={100}
            step={5}
            onValueChange={item.onChange}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontSize: 10, color: '#cbd5e1' }}>
            <span>낮음</span><span>보통</span><span>높음</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export const Linear_우선순위_스코어링: Story = {
  name: 'Linear Design - Impact x Urgency 우선순위 스코어링',
  parameters: {
    docs: {
      description: {
        story:
          'Linear의 이슈 우선순위 결정 로직을 슬라이더 UI로 구현. ' +
          'Impact(60%)와 Urgency(40%) 가중 평균으로 0-100 점수를 계산하고 긴급/높음/보통/낮음/없음 등급을 자동 결정합니다.',
      },
    },
  },
  render: () => <LinearPriorityRender />,
}

/* --------------------------------------------------------------------------
   Linear Design 벤치마크: 피보나치 스토리 포인트 추정기
   개발 팀이 사용하는 1,2,3,5,8,13,21 피보나치 수열 기반 추정 슬라이더
-------------------------------------------------------------------------- */
const FIB_POINTS = [0, 1, 2, 3, 5, 8, 13, 21]

function LinearStoryPointsRender() {
  const [pointIdx, setPointIdx] = useState([3])
  const [selectedTask, setSelectedTask] = useState(0)

  const tasks = [
    { title: 'Slider 컴포넌트 리팩터링', current: 3, complexity: '중간' },
    { title: 'API 인증 미들웨어 추가', current: 5, complexity: '높음' },
    { title: 'README 오타 수정', current: 1, complexity: '낮음' },
  ]

  const currentPoints = FIB_POINTS[pointIdx[0]] ?? 0

  const complexityOf = (pts: number) => {
    if (pts >= 13) return { label: '매우 복잡', color: '#ef4444' }
    if (pts >= 8) return { label: '복잡', color: '#f97316' }
    if (pts >= 5) return { label: '높음', color: '#f59e0b' }
    if (pts >= 3) return { label: '중간', color: '#6366f1' }
    if (pts >= 1) return { label: '간단', color: '#10b981' }
    return { label: '미정', color: '#94a3b8' }
  }

  const cx = complexityOf(currentPoints)

  return (
    <div style={{ width: 360, display: 'flex', flexDirection: 'column', gap: 16, padding: 24, background: '#fff', borderRadius: 14, border: '1px solid #e2e8f0' }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: '#1e293b' }}>스토리 포인트 추정</div>

      {/* Task selector */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {tasks.map((task, i) => (
          <div
            key={task.title}
            onClick={() => {
              setSelectedTask(i)
              setPointIdx([FIB_POINTS.indexOf(task.current)])
            }}
            style={{
              padding: '10px 12px',
              borderRadius: 8,
              border: `1.5px solid ${selectedTask === i ? '#6366f1' : '#e2e8f0'}`,
              background: selectedTask === i ? '#eef2ff' : '#fff',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              transition: 'all 0.15s',
            }}
          >
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: selectedTask === i ? '#4f46e5' : '#1e293b' }}>{task.title}</div>
              <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>복잡도: {task.complexity}</div>
            </div>
            <div style={{ fontSize: 18, fontWeight: 800, color: selectedTask === i ? '#6366f1' : '#94a3b8' }}>{task.current}pt</div>
          </div>
        ))}
      </div>

      {/* Fibonacci slider */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#475569' }}>추정 포인트</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 24, fontWeight: 900, color: cx.color }}>{currentPoints}</span>
            <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 10, background: cx.color + '18', color: cx.color }}>{cx.label}</span>
          </div>
        </div>
        <Slider
          value={pointIdx}
          max={FIB_POINTS.length - 1}
          step={1}
          onValueChange={setPointIdx}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
          {FIB_POINTS.map((pt, i) => (
            <span
              key={pt}
              onClick={() => setPointIdx([i])}
              style={{
                fontSize: 11,
                fontWeight: pointIdx[0] === i ? 800 : 400,
                color: pointIdx[0] === i ? '#6366f1' : '#94a3b8',
                cursor: 'pointer',
                minWidth: 20,
                textAlign: 'center',
              }}
            >
              {pt}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export const Linear_피보나치_스토리포인트: Story = {
  name: 'Linear Design - 피보나치 스토리포인트 추정기',
  parameters: {
    docs: {
      description: {
        story:
          'Linear의 이슈 추정 UX 패턴. 0,1,2,3,5,8,13,21 피보나치 수열을 슬라이더 인덱스로 매핑해 ' +
          '비선형 포인트 입력을 구현합니다. 태스크 목록과 연동해 선택한 이슈의 포인트를 즉시 반영합니다.',
      },
    },
  },
  render: () => <LinearStoryPointsRender />,
}

/* ── Tailwind UI: 오디오 이퀄라이저 ── */
const EqualizerDemo = () => {
  const bands = ['32Hz', '64Hz', '125Hz', '250Hz', '500Hz', '1kHz', '2kHz', '4kHz', '8kHz', '16kHz']
  const [gains, setGains] = useState<number[]>([0, 0, 3, 2, 0, -1, 2, 4, 1, 0])

  const presets: Record<string, number[]> = {
    '플랫': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    '베이스 부스트': [6, 5, 4, 2, 0, 0, 0, 0, 0, 0],
    '보컬 강화': [0, 0, 0, 1, 3, 4, 3, 1, 0, 0],
    'Rock': [4, 3, 0, -1, -2, 0, 2, 4, 4, 3],
  }

  const setGain = (i: number, v: number[]) =>
    setGains((prev) => prev.map((g, idx) => (idx === i ? v[0] : g)))

  return (
    <div style={{ maxWidth: 480 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)', marginBottom: 12 }}>이퀄라이저 (Tailwind UI 수직 슬라이더 패턴)</div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
        {Object.entries(presets).map(([name, vals]) => (
          <button
            key={name}
            onClick={() => setGains(vals)}
            style={{ fontSize: 11, padding: '4px 10px', borderRadius: 6, border: '1px solid var(--sem-eclipse-color-borderDefault)', background: 'var(--sem-eclipse-color-backgroundPrimary)', color: 'var(--sem-eclipse-color-foregroundSecondary)', cursor: 'pointer', fontWeight: 500 }}
          >
            {name}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
        {bands.map((band, i) => (
          <div key={band} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flex: 1 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: gains[i] > 0 ? '#6366f1' : gains[i] < 0 ? '#ef4444' : 'var(--sem-eclipse-color-foregroundTertiary)', minWidth: 24, textAlign: 'center' }}>{gains[i] > 0 ? `+${gains[i]}` : gains[i]}</span>
            <Slider min={-12} max={12} step={1} value={[gains[i]]} onValueChange={(v) => setGain(i, v)} style={{ height: 80 }} />
            <span style={{ fontSize: 9, color: 'var(--sem-eclipse-color-foregroundTertiary)', textAlign: 'center', lineHeight: 1.2 }}>{band}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export const Tailwind_오디오_이퀄라이저: Story = {
  name: 'Tailwind UI — 오디오 이퀄라이저',
  render: () => <EqualizerDemo />,
}

/* ── Tailwind UI: 반응형 미디어 플레이어 컨트롤 ── */
const MediaPlayerDemo = () => {
  const [progress, setProgress] = useState(34)
  const [volume, setVolume] = useState(70)
  const [playing, setPlaying] = useState(false)

  const duration = 243
  const current = Math.round((progress / 100) * duration)
  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

  return (
    <div style={{ maxWidth: 400, padding: '20px', borderRadius: 12, border: '1px solid var(--sem-eclipse-color-borderDefault)', background: 'var(--sem-eclipse-color-backgroundPrimary)' }}>
      {/* Track info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
        <div style={{ width: 48, height: 48, borderRadius: 8, background: 'linear-gradient(135deg, #6366f1, #0ea5e9)', flexShrink: 0 }} />
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>Orbit UI Theme Song</div>
          <div style={{ fontSize: 12, color: 'var(--sem-eclipse-color-foregroundTertiary)', marginTop: 2 }}>Tailwind UI Patterns</div>
        </div>
      </div>
      {/* Progress */}
      <div style={{ marginBottom: 8 }}>
        <Slider min={0} max={100} step={1} value={[progress]} onValueChange={(v) => setProgress(v[0])} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--sem-eclipse-color-foregroundTertiary)', marginBottom: 14 }}>
        <span>{fmt(current)}</span>
        <span>{fmt(duration)}</span>
      </div>
      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 16 }}>
        <button style={{ fontSize: 18, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--sem-eclipse-color-foregroundSecondary)' }}>⏮</button>
        <button onClick={() => setPlaying((v) => !v)} style={{ width: 40, height: 40, borderRadius: '50%', background: '#6366f1', border: 'none', cursor: 'pointer', fontSize: 16, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {playing ? '⏸' : '▶'}
        </button>
        <button style={{ fontSize: 18, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--sem-eclipse-color-foregroundSecondary)' }}>⏭</button>
      </div>
      {/* Volume */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 13, color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>🔈</span>
        <div style={{ flex: 1 }}>
          <Slider min={0} max={100} step={1} value={[volume]} onValueChange={(v) => setVolume(v[0])} />
        </div>
        <span style={{ fontSize: 13, color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>🔊</span>
        <span style={{ fontSize: 12, color: 'var(--sem-eclipse-color-foregroundTertiary)', minWidth: 28, textAlign: 'right' }}>{volume}%</span>
      </div>
    </div>
  )
}

export const Tailwind_미디어_플레이어_컨트롤: Story = {
  name: 'Tailwind UI — 미디어 플레이어 컨트롤',
  render: () => <MediaPlayerDemo />,
}

/* ── Tailwind UI: 다중 범위 가격 필터 ── */
const PriceRangeDemo = () => {
  const [range, setRange] = useState([20, 80])
  const MIN = 0
  const MAX = 200
  const step = 5

  const products = [
    { name: 'Button 컴포넌트 팩', price: 29 },
    { name: 'Form 템플릿 세트', price: 49 },
    { name: 'Dashboard 스타터', price: 79 },
    { name: 'Enterprise 라이선스', price: 149 },
    { name: 'Custom 프리미엄 플러그인', price: 19 },
  ]

  const filtered = products.filter((p) => p.price >= range[0] && p.price <= range[1])

  return (
    <div style={{ maxWidth: 360 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)', marginBottom: 14 }}>가격 범위 필터 (Tailwind UI 패턴)</div>
      <div style={{ marginBottom: 6 }}>
        <Slider min={MIN} max={MAX} step={step} value={range} onValueChange={setRange} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--sem-eclipse-color-foregroundTertiary)', marginBottom: 16 }}>
        <span>₩{range[0].toLocaleString()}</span>
        <span>₩{range[1].toLocaleString()}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {products.map((p) => {
          const inRange = p.price >= range[0] && p.price <= range[1]
          return (
            <div
              key={p.name}
              style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', borderRadius: 6, border: `1px solid ${inRange ? 'var(--sem-eclipse-color-fillPrimary)' : 'var(--sem-eclipse-color-borderSubtle)'}`, background: inRange ? 'color-mix(in srgb, var(--sem-eclipse-color-fillPrimary) 5%, var(--sem-eclipse-color-backgroundPrimary))' : 'var(--sem-eclipse-color-backgroundSecondary)', opacity: inRange ? 1 : 0.4, transition: 'all 0.2s' }}
            >
              <span style={{ fontSize: 13, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>{p.name}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>₩{p.price.toLocaleString()}</span>
            </div>
          )
        })}
      </div>
      <div style={{ marginTop: 10, fontSize: 12, color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>
        {filtered.length}개 상품 표시 중
      </div>
    </div>
  )
}

export const Tailwind_가격_범위_필터: Story = {
  name: 'Tailwind UI — 다중 범위 가격 필터',
  render: () => <PriceRangeDemo />,
}

/* --------------------------------------------------------------------------
   Arco Design — 데이터 시각화 임계값 슬라이더 (Cycle 118)
   Arco의 데이터 차트 임계값 설정 UI 패턴
-------------------------------------------------------------------------- */
function ArcoThresholdSliderRender() {
  const [cpuThreshold, setCpuThreshold] = useState([70])
  const [memThreshold, setMemThreshold] = useState([80])
  const [diskThreshold, setDiskThreshold] = useState([90])

  function getSeverity(val: number) {
    if (val >= 90) return { label: '위험', color: '#ef4444' }
    if (val >= 70) return { label: '경고', color: '#f59e0b' }
    return { label: '정상', color: '#10b981' }
  }

  const metrics = [
    { label: 'CPU 사용률', value: cpuThreshold, onChange: setCpuThreshold, current: 58 },
    { label: '메모리 사용률', value: memThreshold, onChange: setMemThreshold, current: 74 },
    { label: '디스크 I/O', value: diskThreshold, onChange: setDiskThreshold, current: 33 },
  ]

  return (
    <div style={{ width: 400, display: 'flex', flexDirection: 'column', gap: 20, padding: 20 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>알림 임계값 설정</div>
      {metrics.map((m) => {
        const severity = getSeverity(m.value[0])
        const isAlert = m.current >= m.value[0]
        return (
          <div key={m.label} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 13, color: '#475569', fontWeight: 600 }}>{m.label}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 11, color: '#94a3b8' }}>현재: {m.current}%</span>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '1px 6px', borderRadius: 4, background: isAlert ? '#fef2f2' : '#f0fdf4', color: isAlert ? '#ef4444' : '#10b981' }}>
                  {isAlert ? '알림 발생' : '정상'}
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Slider
                value={m.value}
                onValueChange={m.onChange}
                min={0}
                max={100}
                step={5}
              />
              <span style={{ fontSize: 13, fontWeight: 700, color: severity.color, minWidth: 42 }}>
                {m.value[0]}%
              </span>
            </div>
            <div style={{ height: 3, borderRadius: 2, background: '#f1f5f9', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${m.current}%`, background: isAlert ? '#ef4444' : '#10b981', transition: 'width 0.3s, background 0.3s' }} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export const Arco_임계값_알림_슬라이더: Story = {
  name: 'Arco Design — 임계값 알림 슬라이더 (Cycle 118)',
  parameters: {
    docs: {
      description: {
        story:
          'Arco Design의 모니터링 대시보드 임계값 설정 패턴. CPU/메모리/디스크 알림 임계값을 Slider로 조정, 현재 사용률과 비교하여 알림 상태 실시간 표시.',
      },
    },
  },
  render: () => <ArcoThresholdSliderRender />,
}

/* --------------------------------------------------------------------------
   Apple HIG — iOS 스타일 컨트롤 슬라이더 (Cycle 118)
   HIG의 볼륨/밝기/색온도 컨트롤 패턴
-------------------------------------------------------------------------- */
function AppleHIGControlSliderRender() {
  const [brightness, setBrightness] = useState([70])
  const [volume, setVolume] = useState([55])
  const [colorTemp, setColorTemp] = useState([50])

  const controls = [
    {
      id: 'brightness',
      label: '밝기',
      iconMin: '🔅',
      iconMax: '🔆',
      value: brightness,
      onChange: setBrightness,
      formatValue: (v: number) => `${v}%`,
    },
    {
      id: 'volume',
      label: '볼륨',
      iconMin: '🔈',
      iconMax: '🔊',
      value: volume,
      onChange: setVolume,
      formatValue: (v: number) => `${v}%`,
    },
    {
      id: 'colorTemp',
      label: '색온도',
      iconMin: '🌡',
      iconMax: '☀️',
      value: colorTemp,
      onChange: setColorTemp,
      formatValue: (v: number) => v < 50 ? `차가움 ${50 - v}` : v > 50 ? `따뜻함 ${v - 50}` : '중립',
    },
  ]

  return (
    <div style={{
      width: 320, padding: 20, borderRadius: 16,
      background: 'linear-gradient(135deg, #1c1c1e, #2c2c2e)',
      display: 'flex', flexDirection: 'column', gap: 18,
    }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: '#8e8e93', textTransform: 'uppercase', letterSpacing: '0.08em' }}>제어 센터</div>
      {controls.map((ctrl) => (
        <div key={ctrl.id} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 13, color: '#f5f5f7', fontWeight: 500 }}>{ctrl.label}</span>
            <span style={{ fontSize: 12, color: '#8e8e93' }}>{ctrl.formatValue(ctrl.value[0])}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 16 }}>{ctrl.iconMin}</span>
            <div style={{ flex: 1 }}>
              <Slider
                value={ctrl.value}
                onValueChange={ctrl.onChange}
                min={0}
                max={100}
                step={1}
              />
            </div>
            <span style={{ fontSize: 16 }}>{ctrl.iconMax}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export const Apple_HIG_컨트롤_센터_슬라이더: Story = {
  name: 'Apple HIG — 컨트롤 센터 슬라이더 (Cycle 118)',
  parameters: {
    docs: {
      description: {
        story:
          'Apple HIG의 iOS 컨트롤 센터 UI 패턴. 밝기/볼륨/색온도를 Slider로 조정, 아이콘과 현재 값 표시, 다크 배경의 제어 패널 스타일.',
      },
    },
  },
  render: () => <AppleHIGControlSliderRender />,
}

/* --------------------------------------------------------------------------
   Arco + Apple — 시간대 범위 슬라이더 (Cycle 118)
   일정/예약 시스템의 시간 범위 선택 패턴
-------------------------------------------------------------------------- */
function ArcoAppleTimeRangeRender() {
  const [timeRange, setTimeRange] = useState([9, 18])
  const [days, setDays] = useState<Set<string>>(new Set(['Mon', 'Tue', 'Wed', 'Thu', 'Fri']))

  function formatHour(h: number) {
    const period = h < 12 ? 'AM' : 'PM'
    const hour = h % 12 === 0 ? 12 : h % 12
    return `${hour}:00 ${period}`
  }

  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const labels = ['월', '화', '수', '목', '금', '토', '일']

  function toggleDay(d: string) {
    setDays((prev) => {
      const next = new Set(prev)
      if (next.has(d)) next.delete(d)
      else next.add(d)
      return next
    })
  }

  const totalHours = timeRange[1] - timeRange[0]

  return (
    <div style={{ width: 380, display: 'flex', flexDirection: 'column', gap: 16, padding: 20 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>근무 시간 설정</div>
      <div style={{ display: 'flex', gap: 6 }}>
        {weekdays.map((d, i) => (
          <button
            key={d}
            onClick={() => toggleDay(d)}
            style={{
              flex: 1, padding: '6px 0', fontSize: 11, fontWeight: 600, borderRadius: 6, cursor: 'pointer',
              background: days.has(d) ? '#6366f1' : '#f1f5f9',
              color: days.has(d) ? '#fff' : '#94a3b8',
              border: 'none',
            }}
          >
            {labels[i]}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 13, color: '#475569', fontWeight: 600 }}>시간 범위</span>
          <span style={{ fontSize: 13, color: '#6366f1', fontWeight: 700 }}>
            {formatHour(timeRange[0])} - {formatHour(timeRange[1])}
          </span>
        </div>
        <Slider
          value={timeRange}
          onValueChange={setTimeRange}
          min={0}
          max={24}
          step={1}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#94a3b8' }}>
          {[0, 6, 12, 18, 24].map((h) => <span key={h}>{h}시</span>)}
        </div>
      </div>
      <div style={{ padding: '10px 14px', background: '#f0f4ff', borderRadius: 8, border: '1px solid #c7d2fe' }}>
        <div style={{ fontSize: 12, color: '#6366f1' }}>
          주 {days.size}일 · 하루 {totalHours}시간 = 주 {days.size * totalHours}시간
        </div>
      </div>
    </div>
  )
}

export const Arco_Apple_시간대_범위_슬라이더: Story = {
  name: 'Arco + Apple — 시간대 범위 슬라이더 (Cycle 118)',
  parameters: {
    docs: {
      description: {
        story:
          'Arco Design + Apple HIG의 시간 범위 선택 패턴. 근무 요일 토글 + Slider 범위 선택 + 자동 계산(주 총 근무 시간). 실무 스케줄러 UI.',
      },
    },
  },
  render: () => <ArcoAppleTimeRangeRender />,
}

// Cycle 144 - Linear Design + Vercel Design benchmark
function LinearIssuePriority144Render() {
  const [urgency, setUrgency] = useState(50)
  const [impact, setImpact] = useState(70)
  const [effort, setEffort] = useState(30)

  const score = Math.round((urgency * 0.4 + impact * 0.4 + (100 - effort) * 0.2))
  const priority = score >= 75 ? 'urgent' : score >= 55 ? 'high' : score >= 35 ? 'medium' : 'low'
  const priorityColor: Record<string, string> = { urgent: '#ef4444', high: '#f59e0b', medium: '#3b82f6', low: '#94a3b8' }

  const metrics = [
    { key: 'urgency', label: '긴급도', value: urgency, setValue: setUrgency, color: '#ef4444' },
    { key: 'impact', label: '영향도', value: impact, setValue: setImpact, color: '#8b5cf6' },
    { key: 'effort', label: '작업량', value: effort, setValue: setEffort, color: '#f59e0b' },
  ]

  return (
    <div style={{ width: 360, fontFamily: 'system-ui, sans-serif', border: '1px solid #e2e8f0', borderRadius: 10, padding: 20, background: '#fff' }}>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>이슈 우선순위 계산기</div>
        <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>Linear Design — RICE 스코어링 패턴</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 20 }}>
        {metrics.map((m) => (
          <div key={m.key}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: '#475569', fontWeight: 500 }}>{m.label}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: m.color }}>{m.value}</span>
            </div>
            <Slider
              value={[m.value]}
              onValueChange={(v) => m.setValue(v[0])}
              min={0}
              max={100}
              step={5}
            />
          </div>
        ))}
      </div>
      <div style={{ padding: '12px 16px', borderRadius: 8, background: `${priorityColor[priority]}10`, border: `1px solid ${priorityColor[priority]}30`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 11, color: '#64748b', marginBottom: 2 }}>RICE 점수</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: priorityColor[priority] }}>{score}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 10, color: '#94a3b8', marginBottom: 2 }}>우선순위</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: priorityColor[priority], textTransform: 'uppercase', letterSpacing: 0.5 }}>{priority}</div>
        </div>
      </div>
    </div>
  )
}

export const Linear_이슈_우선순위_계산기: Story = {
  name: 'Linear — 이슈 우선순위 계산기 (Cycle 144)',
  parameters: {
    docs: {
      description: {
        story: 'Linear RICE 스코어링 패턴. 긴급도/영향도/작업량 3개 Slider로 우선순위 자동 계산. 점수에 따라 urgent/high/medium/low 동적 판정.',
      },
    },
  },
  render: () => <LinearIssuePriority144Render />,
}

function VercelBandwidthSlider144Render() {
  const [bandwidth, setBandwidth] = useState([100])
  const [cache, setCache] = useState([72])
  const [functions, setFunctions] = useState([40])

  const total = bandwidth[0] + cache[0] + functions[0]
  const limit = 400
  const pct = Math.min(100, Math.round((total / limit) * 100))
  const isOver = total > limit

  return (
    <div style={{ width: 360, fontFamily: 'system-ui, sans-serif', border: '1px solid #e2e8f0', borderRadius: 10, padding: 20, background: '#fff' }}>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>리소스 할당</div>
        <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>Vercel Design — 사용량 슬라이더</div>
      </div>

      {[
        { label: '대역폭', value: bandwidth, set: setBandwidth, unit: 'GB', color: '#3b82f6', max: 200 },
        { label: '캐시', value: cache, set: setCache, unit: 'GB', color: '#8b5cf6', max: 150 },
        { label: '함수 실행', value: functions, set: setFunctions, unit: 'k', color: '#10b981', max: 100 },
      ].map((r) => (
        <div key={r.label} style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 12, color: '#475569' }}>{r.label}</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: r.color }}>{r.value[0]}{r.unit}</span>
          </div>
          <Slider
            value={r.value}
            onValueChange={(v) => r.set(v)}
            min={0}
            max={r.max}
            step={10}
          />
        </div>
      ))}

      <div style={{ padding: '10px 14px', borderRadius: 8, background: isOver ? '#fef2f2' : '#f8fafc', border: `1px solid ${isOver ? '#fecaca' : '#e2e8f0'}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontSize: 11, color: '#64748b' }}>총 사용량</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: isOver ? '#ef4444' : '#0f172a' }}>{total} / {limit}GB</span>
        </div>
        <div style={{ height: 4, borderRadius: 2, background: '#e2e8f0', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: isOver ? '#ef4444' : '#3b82f6', borderRadius: 2, transition: 'width 0.2s, background 0.2s' }} />
        </div>
        {isOver && <div style={{ fontSize: 10, color: '#ef4444', marginTop: 5 }}>한도 초과 — 플랜을 업그레이드하세요</div>}
      </div>
    </div>
  )
}

export const Vercel_리소스_할당_슬라이더: Story = {
  name: 'Vercel — 리소스 할당 슬라이더 (Cycle 144)',
  parameters: {
    docs: {
      description: {
        story: 'Vercel 리소스 할당 패턴. 대역폭/캐시/함수 실행량 3개 Slider 합산, 한도 초과 시 경고 표시 및 게이지 빨간색 전환.',
      },
    },
  },
  render: () => <VercelBandwidthSlider144Render />,
}

function LinearVercelABTest144Render() {
  const [splitA, setSplitA] = useState([60])
  const [confidence, setConfidence] = useState([95])
  const [duration, setDuration] = useState([14])

  const splitB = 100 - splitA[0]

  const visitorA = Math.round(10000 * (splitA[0] / 100))
  const visitorB = 10000 - visitorA

  const statusColor = confidence[0] >= 95 ? '#10b981' : confidence[0] >= 80 ? '#f59e0b' : '#ef4444'
  const statusLabel = confidence[0] >= 95 ? '통계적으로 유의함' : confidence[0] >= 80 ? '보통' : '신뢰도 부족'

  return (
    <div style={{ width: 380, fontFamily: 'system-ui, sans-serif', border: '1px solid #e2e8f0', borderRadius: 10, padding: 20, background: '#fff' }}>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>A/B 테스트 설정</div>
        <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>Linear + Vercel — 실험 파라미터</div>
      </div>

      <div style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontSize: 12, color: '#475569' }}>트래픽 분배</span>
          <span style={{ fontSize: 11, color: '#64748b' }}>A: {splitA[0]}% / B: {splitB}%</span>
        </div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 8 }}>
          <div style={{ flex: splitA[0], height: 16, background: '#3b82f6', borderRadius: '4px 0 0 4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 9, color: '#fff', fontWeight: 700 }}>A</span>
          </div>
          <div style={{ flex: splitB, height: 16, background: '#8b5cf6', borderRadius: '0 4px 4px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 9, color: '#fff', fontWeight: 700 }}>B</span>
          </div>
        </div>
        <Slider value={splitA} onValueChange={setSplitA} min={10} max={90} step={5} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontSize: 10, color: '#94a3b8' }}>
          <span>방문자 A: {visitorA.toLocaleString()}명</span>
          <span>방문자 B: {visitorB.toLocaleString()}명</span>
        </div>
      </div>

      <div style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontSize: 12, color: '#475569' }}>신뢰도 임계값</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: statusColor }}>{confidence[0]}%</span>
        </div>
        <Slider value={confidence} onValueChange={setConfidence} min={70} max={99} step={5} />
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontSize: 12, color: '#475569' }}>실험 기간</span>
          <span style={{ fontSize: 12, color: '#64748b' }}>{duration[0]}일</span>
        </div>
        <Slider value={duration} onValueChange={setDuration} min={3} max={30} step={1} />
      </div>

      <div style={{ padding: '10px 14px', borderRadius: 8, background: `${statusColor}10`, border: `1px solid ${statusColor}30`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: statusColor, fontWeight: 600 }}>{statusLabel}</span>
        <span style={{ fontSize: 11, color: '#64748b' }}>{duration[0]}일 후 결론</span>
      </div>
    </div>
  )
}

export const Linear_Vercel_AB_테스트_설정: Story = {
  name: 'Linear + Vercel — A/B 테스트 설정 (Cycle 144)',
  parameters: {
    docs: {
      description: {
        story: 'Linear + Vercel A/B 실험 파라미터 슬라이더. 트래픽 분배 / 신뢰도 임계값 / 기간 3개 Slider. 분배 시각화 바, 신뢰도 상태 색상 동적 변환.',
      },
    },
  },
  render: () => <LinearVercelABTest144Render />,
}
