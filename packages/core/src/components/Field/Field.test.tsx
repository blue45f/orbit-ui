import { createRef } from 'react'
import { afterEach, expect, test } from 'vitest'

import { cleanup, render, screen } from '../../test-utils'
import { UniqueIDProvider } from '../primitives/UniqueIDProvider'

import { Field } from './Field'

afterEach(() => cleanup())

const renderField = (ui: React.ReactElement) => render(<UniqueIDProvider>{ui}</UniqueIDProvider>)

test('Field: role="group" 으로 렌더링된다', () => {
  renderField(
    <Field>
      <Field.Label>이름</Field.Label>
      <Field.Control>
        <input />
      </Field.Control>
    </Field>
  )

  expect(screen.getByRole('group')).toBeInTheDocument()
})

test('Field: label[for] 와 control[id] 가 연결된다', () => {
  renderField(
    <Field>
      <Field.Label>이메일</Field.Label>
      <Field.Control>
        <input type="email" />
      </Field.Control>
    </Field>
  )

  // 라벨 텍스트로 접근 가능한 이름이 input 에 연결되어야 한다.
  const input = screen.getByLabelText('이메일')
  expect(input).toBeInstanceOf(HTMLInputElement)

  const label = screen.getByText('이메일').closest('label') as HTMLLabelElement
  expect(label.htmlFor).toBe(input.id)
  expect(input.id).not.toBe('')
})

test('Field: description 이 있으면 aria-describedby 로 연결된다', () => {
  renderField(
    <Field>
      <Field.Label>비밀번호</Field.Label>
      <Field.Control>
        <input type="password" />
      </Field.Control>
      <Field.Description>8자 이상 입력하세요.</Field.Description>
    </Field>
  )

  const input = screen.getByLabelText('비밀번호')
  const description = screen.getByText('8자 이상 입력하세요.')

  expect(input.getAttribute('aria-describedby')).toContain(description.id)
})

test('Field: error 가 있으면 aria-describedby 에 포함되고 role="alert" 가 적용된다', () => {
  renderField(
    <Field invalid>
      <Field.Label>이메일</Field.Label>
      <Field.Control>
        <input type="email" />
      </Field.Control>
      <Field.Error>올바른 이메일이 아니에요.</Field.Error>
    </Field>
  )

  const input = screen.getByLabelText('이메일')
  const error = screen.getByRole('alert')

  expect(error).toHaveTextContent('올바른 이메일이 아니에요.')
  expect(input.getAttribute('aria-describedby')).toContain(error.id)
})

test('Field: description 과 error 가 모두 있으면 둘 다 aria-describedby 에 결합된다', () => {
  renderField(
    <Field invalid>
      <Field.Label>이메일</Field.Label>
      <Field.Control>
        <input type="email" />
      </Field.Control>
      <Field.Description>회사 이메일을 입력하세요.</Field.Description>
      <Field.Error>올바른 이메일이 아니에요.</Field.Error>
    </Field>
  )

  const input = screen.getByLabelText('이메일')
  const description = screen.getByText('회사 이메일을 입력하세요.')
  const error = screen.getByRole('alert')

  const describedBy = input.getAttribute('aria-describedby') ?? ''
  expect(describedBy.split(' ')).toEqual(expect.arrayContaining([description.id, error.id]))
})

test('Field: invalid 이면 컨트롤에 aria-invalid="true" 가 적용된다', () => {
  renderField(
    <Field invalid>
      <Field.Label>이메일</Field.Label>
      <Field.Control>
        <input type="email" />
      </Field.Control>
    </Field>
  )

  expect(screen.getByLabelText('이메일')).toHaveAttribute('aria-invalid', 'true')
})

test('Field: invalid 가 아니면 aria-invalid 가 설정되지 않는다', () => {
  renderField(
    <Field>
      <Field.Label>이메일</Field.Label>
      <Field.Control>
        <input type="email" />
      </Field.Control>
    </Field>
  )

  expect(screen.getByLabelText('이메일')).not.toHaveAttribute('aria-invalid')
})

test('Field: required 이면 컨트롤에 aria-required="true" 가 적용되고 라벨에 표식이 노출된다', () => {
  renderField(
    <Field required>
      <Field.Label>이름</Field.Label>
      <Field.Control>
        <input />
      </Field.Control>
    </Field>
  )

  expect(screen.getByLabelText(/이름/)).toHaveAttribute('aria-required', 'true')

  const marker = document.querySelector('[data-field-required-marker]')
  expect(marker).toBeInTheDocument()
  expect(marker).toHaveAttribute('aria-hidden', 'true')
})

test('Field: 컨트롤이 직접 지정한 aria-describedby 를 보존한다', () => {
  renderField(
    <Field>
      <Field.Label>이메일</Field.Label>
      <Field.Control>
        <input aria-describedby="external-hint" />
      </Field.Control>
      <Field.Description>설명</Field.Description>
    </Field>
  )

  const input = screen.getByLabelText('이메일')
  const description = screen.getByText('설명')

  const describedBy = input.getAttribute('aria-describedby') ?? ''
  expect(describedBy).toContain('external-hint')
  expect(describedBy).toContain(description.id)
})

test('Field: id prop 으로 컨트롤 id 를 지정할 수 있고 label[for] 와 일치한다', () => {
  renderField(
    <Field id="custom-id">
      <Field.Label>이메일</Field.Label>
      <Field.Control>
        <input />
      </Field.Control>
    </Field>
  )

  const input = screen.getByLabelText('이메일')
  expect(input.id).toBe('custom-id')

  const label = screen.getByText('이메일').closest('label') as HTMLLabelElement
  expect(label.htmlFor).toBe('custom-id')
})

test('Field: 내용이 없는 Error 는 렌더링되지 않는다', () => {
  renderField(
    <Field>
      <Field.Label>이메일</Field.Label>
      <Field.Control>
        <input />
      </Field.Control>
      <Field.Error>{null}</Field.Error>
    </Field>
  )

  expect(screen.queryByRole('alert')).not.toBeInTheDocument()
})

test('Field: ref 를 루트 엘리먼트로 전달한다', () => {
  const ref = createRef<HTMLDivElement>()

  renderField(
    <Field ref={ref}>
      <Field.Control>
        <input />
      </Field.Control>
    </Field>
  )

  expect(ref.current).toBeInstanceOf(HTMLDivElement)
  expect(ref.current).toHaveAttribute('role', 'group')
})

test('Field: 하위 컴포넌트를 Field 외부에서 사용하면 에러를 던진다', () => {
  // 콘솔 에러 출력 억제 후 throw 검증
  expect(() => render(<Field.Label>고립</Field.Label>)).toThrow(/<Field> 내부에서만/)
})
