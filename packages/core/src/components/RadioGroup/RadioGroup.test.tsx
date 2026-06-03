import { createRef } from 'react'
import userEvent from '@testing-library/user-event'
import { afterEach, expect, test, vi } from 'vitest'

import { cleanup, expectNoA11yViolations, render, screen } from '../../test-utils'

import { RadioGroup } from './RadioGroup'

afterEach(() => cleanup())

const renderGroup = (props?: Partial<React.ComponentProps<typeof RadioGroup>>) =>
  render(
    <RadioGroup aria-label="음식" {...props}>
      <RadioGroup.Item value="피자" />
      <RadioGroup.Item value="치킨" />
      <RadioGroup.Item value="햄버거" />
    </RadioGroup>
  )

test('RadioGroup: role="radiogroup" 으로 렌더링된다', () => {
  renderGroup()
  expect(screen.getByRole('radiogroup')).toBeInTheDocument()
})

test('RadioGroup: aria-label 이 그룹에 적용된다', () => {
  renderGroup()
  expect(screen.getByRole('radiogroup', { name: '음식' })).toBeInTheDocument()
})

test('RadioGroup: 항목 수만큼 radio role 이 렌더링된다', () => {
  renderGroup()
  expect(screen.getAllByRole('radio')).toHaveLength(3)
})

test('RadioGroup: aria-orientation 기본값은 vertical 이다', () => {
  renderGroup()
  expect(screen.getByRole('radiogroup')).toHaveAttribute('aria-orientation', 'vertical')
})

test('RadioGroup: orientation="horizontal" 이 aria-orientation 에 반영된다', () => {
  renderGroup({ orientation: 'horizontal' })
  expect(screen.getByRole('radiogroup')).toHaveAttribute('aria-orientation', 'horizontal')
})

test('RadioGroup: defaultValue 에 해당하는 항목이 선택 상태(aria-checked)가 된다', () => {
  renderGroup({ defaultValue: '치킨' })
  const radios = screen.getAllByRole('radio')

  expect(radios[1]).toHaveAttribute('aria-checked', 'true')
  expect(radios[0]).toHaveAttribute('aria-checked', 'false')
})

test('RadioGroup: 항목 클릭 시 onChange 가 해당 값으로 호출된다', async () => {
  const onChange = vi.fn()
  renderGroup({ onChange })

  await userEvent.click(screen.getAllByRole('radio')[2])

  expect(onChange).toHaveBeenCalledWith('햄버거')
})

test('RadioGroup: 로빙 탭인덱스 — 선택값이 없으면 첫 항목만 tabIndex=0', () => {
  renderGroup()
  const radios = screen.getAllByRole('radio')

  expect(radios[0]).toHaveAttribute('tabindex', '0')
  expect(radios[1]).toHaveAttribute('tabindex', '-1')
  expect(radios[2]).toHaveAttribute('tabindex', '-1')
})

test('RadioGroup: 로빙 탭인덱스 — 선택된 항목만 tabIndex=0', () => {
  renderGroup({ defaultValue: '치킨' })
  const radios = screen.getAllByRole('radio')

  expect(radios[0]).toHaveAttribute('tabindex', '-1')
  expect(radios[1]).toHaveAttribute('tabindex', '0')
  expect(radios[2]).toHaveAttribute('tabindex', '-1')
})

test('RadioGroup: ArrowDown 으로 다음 항목으로 이동하고 즉시 선택된다', async () => {
  const onChange = vi.fn()
  renderGroup({ defaultValue: '피자', onChange })
  const radios = screen.getAllByRole('radio')

  radios[0].focus()
  await userEvent.keyboard('{ArrowDown}')

  expect(onChange).toHaveBeenLastCalledWith('치킨')
  expect(radios[1]).toHaveFocus()
})

test('RadioGroup: ArrowUp 은 이전 항목으로 이동한다(첫 항목에서 마지막으로 순환)', async () => {
  const onChange = vi.fn()
  renderGroup({ defaultValue: '피자', onChange })
  const radios = screen.getAllByRole('radio')

  radios[0].focus()
  await userEvent.keyboard('{ArrowUp}')

  expect(onChange).toHaveBeenLastCalledWith('햄버거')
  expect(radios[2]).toHaveFocus()
})

test('RadioGroup: horizontal 에서는 ArrowRight/ArrowLeft 로 이동한다', async () => {
  const onChange = vi.fn()
  renderGroup({ orientation: 'horizontal', defaultValue: '피자', onChange })
  const radios = screen.getAllByRole('radio')

  radios[0].focus()
  await userEvent.keyboard('{ArrowRight}')
  expect(radios[1]).toHaveFocus()
  expect(onChange).toHaveBeenLastCalledWith('치킨')

  await userEvent.keyboard('{ArrowLeft}')
  expect(radios[0]).toHaveFocus()
  expect(onChange).toHaveBeenLastCalledWith('피자')
})

test('RadioGroup: Home/End 키로 처음/마지막 항목으로 이동한다', async () => {
  const onChange = vi.fn()
  renderGroup({ defaultValue: '치킨', onChange })
  const radios = screen.getAllByRole('radio')

  radios[1].focus()
  await userEvent.keyboard('{End}')
  expect(radios[2]).toHaveFocus()
  expect(onChange).toHaveBeenLastCalledWith('햄버거')

  await userEvent.keyboard('{Home}')
  expect(radios[0]).toHaveFocus()
  expect(onChange).toHaveBeenLastCalledWith('피자')
})

test('RadioGroup: disabled 그룹은 키보드 내비게이션을 무시한다', async () => {
  const onChange = vi.fn()
  renderGroup({ defaultValue: '피자', disabled: true, onChange })
  const radios = screen.getAllByRole('radio')

  radios[0].focus()
  await userEvent.keyboard('{ArrowDown}')

  expect(onChange).not.toHaveBeenCalled()
})

test('RadioGroup: 제어 컴포넌트 — value/onChange 로 외부 상태를 따른다', async () => {
  const onChange = vi.fn()
  render(
    <RadioGroup aria-label="음식" value="피자" onChange={onChange}>
      <RadioGroup.Item value="피자" />
      <RadioGroup.Item value="치킨" />
    </RadioGroup>
  )
  const radios = screen.getAllByRole('radio')

  expect(radios[0]).toHaveAttribute('aria-checked', 'true')

  await userEvent.click(radios[1])
  expect(onChange).toHaveBeenCalledWith('치킨')
  // 제어 상태이므로 외부 value 가 그대로면 선택은 변하지 않는다.
  expect(radios[0]).toHaveAttribute('aria-checked', 'true')
})

test('RadioGroup: ref 를 루트 엘리먼트로 전달한다', () => {
  const ref = createRef<HTMLDivElement>()
  render(
    <RadioGroup aria-label="음식" ref={ref}>
      <RadioGroup.Item value="피자" />
    </RadioGroup>
  )

  expect(ref.current).toBeInstanceOf(HTMLDivElement)
  expect(ref.current).toHaveAttribute('role', 'radiogroup')
})

test('RadioGroup.Item: 그룹 외부에서 사용하면 에러를 던진다', () => {
  expect(() => render(<RadioGroup.Item value="x" />)).toThrow(/<RadioGroup> 내부에서만/)
})

test('RadioGroup(axe): 라디오 그룹에 serious/critical 위반이 없어야 한다', async () => {
  // 각 라디오 항목은 접근 가능한 이름(aria-label)을 가져야 한다.
  const { container } = render(
    <RadioGroup aria-label="음식">
      <RadioGroup.Item value="피자" aria-label="피자" />
      <RadioGroup.Item value="치킨" aria-label="치킨" />
      <RadioGroup.Item value="햄버거" aria-label="햄버거" />
    </RadioGroup>
  )
  await expectNoA11yViolations(container)
})
