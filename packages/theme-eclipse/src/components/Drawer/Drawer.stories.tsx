import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { Drawer } from './Drawer'
import { FilledButton as Button } from '../SolidButton'
import { OutlineButton } from '../OutlineButton'
import { FloatingTextField } from '../FloatingTextField'
import { CheckboxWithLabel } from '../composites/CheckboxWithLabel'
import { RadioButtonWithLabel } from '../composites/RadioButtonWithLabel'
import { RadioGroup } from '../composites/RadioGroup'
import { Typography } from '../Text'

const meta = {
  title: 'eclipse/Feedback/Drawer',
  component: Drawer,
  tags: ['autodocs'],
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof meta>

export const 기본: Story = {
  render: () => (
    <Drawer>
      <Drawer.Trigger asChild>
        <Button color="primary" size="medium">
          <Button.Center>서랍 열기</Button.Center>
        </Button>
      </Drawer.Trigger>
      <Drawer.Content side="right">
        <Drawer.Header>
          <Drawer.Title>계정 설정</Drawer.Title>
          <Drawer.Description>
            여기서 프로필 정보와 보안 설정을 변경할 수 있습니다.
          </Drawer.Description>
        </Drawer.Header>
        <div className="py-4">
          <Typography textStyle="bodyMedium">
            여기에 다양한 설정 폼이나 리스트가 들어갑니다.
          </Typography>
        </div>
        <Drawer.Footer>
          <Drawer.Close asChild>
            <Button color="black" size="medium">
              <Button.Center>저장하기</Button.Center>
            </Button>
          </Drawer.Close>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  ),
}

// ─── 4방향 드로어 패턴 ────────────────────────────────────────────────────────
export const 방향_4가지: Story = {
  name: '방향 4가지 (right / left / top / bottom)',
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      {(['right', 'left', 'top', 'bottom'] as const).map((side) => (
        <Drawer key={side}>
          <Drawer.Trigger asChild>
            <Button color="gray" size="medium">
              <Button.Center>{side}</Button.Center>
            </Button>
          </Drawer.Trigger>
          <Drawer.Content side={side}>
            <Drawer.Header>
              <Drawer.Title>{side} Drawer</Drawer.Title>
              <Drawer.Description>{side} 방향에서 슬라이드 인합니다.</Drawer.Description>
            </Drawer.Header>
            <div style={{ padding: '16px 0' }}>
              <Typography textStyle="bodyMedium">
                이 드로어는 <strong>{side}</strong> 방향에서 열립니다.
              </Typography>
            </div>
            <Drawer.Footer>
              <Drawer.Close asChild>
                <Button color="black" size="medium">
                  <Button.Center>닫기</Button.Center>
                </Button>
              </Drawer.Close>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer>
      ))}
    </div>
  ),
}

// ─── 폼 포함 드로어 (Ant Design Form 인라인 에러 패턴) ─────────────────────────
// Ant Design Form의 validateStatus + help 메시지 패턴을 참고:
// 각 필드 아래에 인라인 에러 메시지를 즉시 표시합니다.
const DrawerFormRender = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [touched, setTouched] = useState({ name: false, email: false })

  const nameError = touched.name && name.trim().length === 0
  const emailError = touched.email && !email.includes('@')

  return (
    <Drawer>
      <Drawer.Trigger asChild>
        <Button color="primary" size="medium">
          <Button.Center>폼 드로어 열기</Button.Center>
        </Button>
      </Drawer.Trigger>
      <Drawer.Content side="right">
        <Drawer.Header>
          <Drawer.Title>프로필 편집</Drawer.Title>
          <Drawer.Description>
            Ant Design Form 패턴: 각 필드 아래 인라인 에러 메시지를 즉시 표시합니다.
          </Drawer.Description>
        </Drawer.Header>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px 0' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <FloatingTextField
              placeholder="이름"
              value={name}
              error={nameError}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
              style={{ width: '100%' }}
            />
            {nameError && (
              <span style={{ fontSize: '12px', color: '#ef4444', paddingLeft: '4px' }}>
                이름을 입력해주세요
              </span>
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <FloatingTextField
              placeholder="이메일"
              value={email}
              error={emailError}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
              style={{ width: '100%' }}
            />
            {emailError && (
              <span style={{ fontSize: '12px', color: '#ef4444', paddingLeft: '4px' }}>
                올바른 이메일 형식이 아닙니다
              </span>
            )}
            {!emailError && touched.email && email.includes('@') && (
              <span style={{ fontSize: '12px', color: '#10b981', paddingLeft: '4px' }}>
                올바른 이메일입니다
              </span>
            )}
          </div>
        </div>
        <Drawer.Footer>
          <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
            <Drawer.Close asChild>
              <OutlineButton color="black" size="medium" style={{ flex: 1 }}>
                <OutlineButton.Center>취소</OutlineButton.Center>
              </OutlineButton>
            </Drawer.Close>
            <Button
              color="primary"
              size="medium"
              disabled={nameError || emailError || !name || !email}
              style={{ flex: 1 }}
            >
              <Button.Center>저장</Button.Center>
            </Button>
          </div>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  )
}

export const 폼_포함_드로어: Story = {
  name: '폼 포함 드로어 (Ant Design 인라인 에러 패턴)',
  render: () => <DrawerFormRender />,
}

// ─── 필터 패널 드로어 ─────────────────────────────────────────────────────────
const DrawerFilterRender = () => {
  const [categories, setCategories] = useState<string[]>(['react'])
  const [sort, setSort] = useState('latest')

  const toggleCategory = (val: string) => {
    setCategories((prev) =>
      prev.includes(val) ? prev.filter((c) => c !== val) : [...prev, val]
    )
  }

  return (
    <Drawer>
      <Drawer.Trigger asChild>
        <Button color="black" size="medium">
          <Button.Center>필터 패널 열기</Button.Center>
        </Button>
      </Drawer.Trigger>
      <Drawer.Content side="left">
        <Drawer.Header>
          <Drawer.Title>필터</Drawer.Title>
          <Drawer.Description>카테고리와 정렬 옵션을 선택하세요.</Drawer.Description>
        </Drawer.Header>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '16px 0' }}>
          <div>
            <Typography textStyle="labelLarge" style={{ marginBottom: '12px', display: 'block' }}>
              카테고리
            </Typography>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { value: 'react', label: 'React' },
                { value: 'vue', label: 'Vue' },
                { value: 'angular', label: 'Angular' },
                { value: 'svelte', label: 'Svelte' },
              ].map(({ value, label }) => (
                <CheckboxWithLabel
                  key={value}
                  checked={categories.includes(value)}
                  onChange={() => toggleCategory(value)}
                >
                  {label}
                </CheckboxWithLabel>
              ))}
            </div>
          </div>
          <div>
            <Typography textStyle="labelLarge" style={{ marginBottom: '12px', display: 'block' }}>
              정렬
            </Typography>
            <RadioGroup name="sort-filter" value={sort} onChange={(e) => setSort(e.target.value)}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <RadioButtonWithLabel value="latest">최신순</RadioButtonWithLabel>
                <RadioButtonWithLabel value="popular">인기순</RadioButtonWithLabel>
                <RadioButtonWithLabel value="name">이름순</RadioButtonWithLabel>
              </div>
            </RadioGroup>
          </div>
        </div>
        <Drawer.Footer>
          <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
            <OutlineButton
              color="gray"
              size="medium"
              style={{ flex: 1 }}
              onClick={() => { setCategories([]); setSort('latest') }}
            >
              <OutlineButton.Center>초기화</OutlineButton.Center>
            </OutlineButton>
            <Drawer.Close asChild>
              <Button color="primary" size="medium" style={{ flex: 1 }}>
                <Button.Center>적용 ({categories.length})</Button.Center>
              </Button>
            </Drawer.Close>
          </div>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  )
}

export const 필터_패널_드로어: Story = {
  name: '필터 패널 드로어 (Checkbox + RadioButton + SolidButton)',
  render: () => <DrawerFilterRender />,
}
