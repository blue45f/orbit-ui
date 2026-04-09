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
