import { Flex } from '@heejun-com/core'
import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { RadioButton } from './RadioButton'

RadioButton.displayName = 'RadioButton'

const meta = {
  title: 'eclipse/Inputs/Selection/RadioButton',
  component: RadioButton,
  args: {
    disabled: false,
  },
  argTypes: {
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof RadioButton>

type Story = StoryObj<typeof meta>

export default meta

export const 기본 = {
  render: function Render(args) {
    const [selected, setSelected] = useState('blue')
    return (
      <fieldset role="radiogroup">
        <RadioButton
          {...args}
          value="blue"
          name="color"
          checked={selected === 'blue'}
          onChange={() => setSelected('blue')}
        />
        <RadioButton
          {...args}
          value="foundation"
          name="color"
          checked={selected === 'foundation'}
          onChange={() => setSelected('foundation')}
        />
        <RadioButton
          {...args}
          value="primary"
          checked={selected === 'primary'}
          onChange={() => setSelected('primary')}
        />
      </fieldset>
    )
  },
} satisfies Story

export const 테마_재정의 = {
  render: function Render(args) {
    const [selected, setSelected] = useState('blue')
    return (
      <fieldset role="radiogroup">
        <RadioButton
          {...args}
          checked={selected === 'blue'}
          onChange={() => setSelected('blue')}
          theme={{
            enabledSelectedForegroundColor: 'red',
          }}
          value="blue"
        />
        <RadioButton
          {...args}
          value="foundation"
          checked={selected === 'foundation'}
          onChange={() => setSelected('foundation')}
          theme={{
            enabledSelectedForegroundColor: 'red',
          }}
        />
        <RadioButton
          {...args}
          value="primary"
          checked={selected === 'primary'}
          onChange={() => setSelected('primary')}
          theme={{
            enabledSelectedForegroundColor: 'red',
          }}
        />
      </fieldset>
    )
  },
} satisfies Story

export const 라벨_추가 = {
  render: function Render(args) {
    const [selected, setSelected] = useState('blue')
    return (
      <fieldset role="radiogroup">
        <Flex rowGap="25px" flexDirection={'column'}>
          <Flex columnGap="10px">
            <RadioButton
              {...args}
              value="blue"
              id="blue"
              checked={selected === 'blue'}
              onChange={() => setSelected('blue')}
            />
            <label htmlFor="blue">인디고</label>
          </Flex>
          <Flex columnGap="10px">
            <RadioButton
              {...args}
              value="foundation"
              disabled
              id="foundation"
              checked={selected === 'foundation'}
              onChange={() => setSelected('foundation')}
            />
            <label htmlFor="foundation">파운데이션</label>
          </Flex>
          <Flex columnGap="10px">
            <RadioButton
              {...args}
              value="primary"
              id="primary"
              checked={selected === 'primary'}
              onChange={() => setSelected('primary')}
            />
            <label htmlFor="primary">기본</label>
          </Flex>
        </Flex>
      </fieldset>
    )
  },
} satisfies Story

// 설정 페이지 라디오 그룹 (Chakra UI 실무 패턴)
export const 설정페이지라디오그룹 = {
  render: function Render(args) {
    const [theme, setTheme] = useState<string>('system')
    const [lang, setLang] = useState<string>('ko')
    const [density, setDensity] = useState<string>('comfortable')

    const themeOptions = [
      { value: 'light', label: '라이트 모드', desc: '밝은 배경의 테마' },
      { value: 'dark', label: '다크 모드', desc: '어두운 배경의 테마' },
      { value: 'system', label: '시스템 설정 따름', desc: '운영체제 설정에 따라 자동 변경' },
    ]

    const langOptions = [
      { value: 'ko', label: '한국어' },
      { value: 'en', label: 'English' },
      { value: 'ja', label: '日本語' },
    ]

    const densityOptions = [
      { value: 'compact', label: '컴팩트', desc: '좁은 간격' },
      { value: 'comfortable', label: '일반', desc: '기본 간격' },
      { value: 'spacious', label: '여유롭게', desc: '넓은 간격' },
    ]

    const SectionTitle = ({ children }: { children: string }) => (
      <div style={{ fontSize: '11px', fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
        {children}
      </div>
    )

    return (
      <div style={{
        width: '420px', padding: '28px', background: '#fff',
        borderRadius: '16px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        display: 'flex', flexDirection: 'column', gap: '28px',
      }}>
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>환경 설정</h3>

        {/* 테마 */}
        <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
          <SectionTitle>테마</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {themeOptions.map((opt) => (
              <label
                key={opt.value}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '12px 14px', borderRadius: '10px', cursor: 'pointer',
                  background: theme === opt.value ? 'rgba(99,102,241,0.05)' : 'transparent',
                  border: `1.5px solid ${theme === opt.value ? 'rgba(99,102,241,0.25)' : 'transparent'}`,
                  transition: 'all 0.15s',
                }}
              >
                <RadioButton
                  {...args}
                  value={opt.value}
                  name="theme"
                  checked={theme === opt.value}
                  onChange={() => setTheme(opt.value)}
                />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: theme === opt.value ? 600 : 400, color: '#0f172a' }}>{opt.label}</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '1px' }}>{opt.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </fieldset>

        {/* 언어 */}
        <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
          <SectionTitle>언어</SectionTitle>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {langOptions.map((opt) => (
              <label
                key={opt.value}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '8px 16px', borderRadius: '20px', cursor: 'pointer',
                  background: lang === opt.value ? 'rgba(99,102,241,0.08)' : '#f8fafc',
                  border: `1.5px solid ${lang === opt.value ? 'rgba(99,102,241,0.3)' : '#e2e8f0'}`,
                  fontSize: '13px', fontWeight: lang === opt.value ? 600 : 400,
                  color: lang === opt.value ? '#6366f1' : '#374151',
                  transition: 'all 0.15s',
                }}
              >
                <RadioButton
                  {...args}
                  value={opt.value}
                  name="lang"
                  checked={lang === opt.value}
                  onChange={() => setLang(opt.value)}
                />
                {opt.label}
              </label>
            ))}
          </div>
        </fieldset>

        {/* 밀도 */}
        <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
          <SectionTitle>화면 밀도</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {densityOptions.map((opt) => (
              <label
                key={opt.value}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '10px 14px', borderRadius: '8px', cursor: 'pointer',
                  transition: 'background 0.1s',
                }}
              >
                <RadioButton
                  {...args}
                  value={opt.value}
                  name="density"
                  checked={density === opt.value}
                  onChange={() => setDensity(opt.value)}
                />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: density === opt.value ? 600 : 400, color: '#0f172a' }}>{opt.label}</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>{opt.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </fieldset>

        <button style={{
          padding: '12px', borderRadius: '10px', border: 'none', cursor: 'pointer',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          color: '#fff', fontSize: '14px', fontWeight: '700',
        }}>
          설정 저장
        </button>
      </div>
    )
  },
} satisfies Story

export const 디자인QA = {
  args: {
    disabledAll: false,
    disabledSecond: false,
    flexDirection: 'column',
    rowGap: '25px',
    columnGap: '25px',
    labelText: '파운데이션',
  },
  argTypes: {
    disabled: {
      control: 'never',
    },
    flexDirection: {
      control: 'select',
      options: ['row', 'column'],
      description: '라디오 그룹 내부 라디오 배치 방식',
    },
    rowGap: {
      control: 'text',
      description: '라디오 그룹 내부 라디오 간격',
    },
    columnGap: {
      control: 'text',
      description: '라디오 그룹 내부 라디오 간격',
    },
    labelText: {
      control: 'text',
      description: '두 번째 라디오 라벨 텍스트',
    },
    disabledAll: {
      control: 'boolean',
      description: '라디오 그룹 전체 비활성화 여부',
    },
    disabledSecond: {
      control: 'boolean',
      description: '두 번째 라디오 비활성화 여부',
    },
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  render: function Render(args: any) {
    const [selected, setSelected] = useState('blue')
    return (
      <fieldset role="radiogroup">
        <div style={{ marginBottom: '25px' }}>첫 번째 라디오는 라벨이 없어요</div>
        <Flex rowGap={args.rowGap} columnGap={args.columnGap} flexDirection={args.flexDirection}>
          <Flex columnGap="10px">
            <RadioButton
              {...args}
              name="color"
              value="blue"
              checked={selected === 'blue'}
              onChange={() => setSelected('blue')}
            />
          </Flex>
          <Flex columnGap="10px">
            <RadioButton
              {...args}
              name="color"
              id="foundation"
              value="foundation"
              disabled={args.disabledSecond}
              checked={selected === 'foundation'}
              onChange={() => setSelected('foundation')}
            />
            <label htmlFor="foundation">{args.labelText}</label>
          </Flex>
          <Flex columnGap="10px">
            <RadioButton
              {...args}
              id="primary"
              name="color"
              value="primary"
              checked={selected === 'primary'}
              onChange={() => setSelected('primary')}
            />
            <label htmlFor="primary">기본</label>
          </Flex>
        </Flex>
      </fieldset>
    )
  },
}
