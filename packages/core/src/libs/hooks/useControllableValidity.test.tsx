import { afterEach, expect, test } from 'vitest'

import { screen, render, cleanup } from '../test-utils'

import { useControllableValidity } from './useControllableValidity'

afterEach(() => cleanup())

type InputProps = { invalid?: boolean } & React.HTMLAttributes<HTMLInputElement>

const Input: React.FC<InputProps> = ({ invalid, ...rest }) => {
  const refs = useControllableValidity<HTMLInputElement>(invalid)
  return <input ref={refs} {...rest} />
}

test('invalid prop으로 input 유효성을 제어할 수 있다', () => {
  // Arrange & Act
  const { rerender } = render(<Input aria-label='input' invalid />)

  // Assert
  expect(screen.getByLabelText<HTMLInputElement>('input').checkValidity()).toBe(false)

  rerender(<Input aria-label='input' invalid={false} />)

  expect(screen.getByLabelText<HTMLInputElement>('input').checkValidity()).toBe(true)
})

type TextareaProps = { invalid?: boolean } & React.HTMLAttributes<HTMLTextAreaElement>

const Textarea: React.FC<TextareaProps> = ({ invalid, ...rest }) => {
  const refs = useControllableValidity<HTMLTextAreaElement>(invalid)
  return <textarea ref={refs} {...rest} />
}

test('invalid prop으로 textarea 유효성을 제어할 수 있다', () => {
  // Arrange & Act
  const { rerender } = render(<Textarea aria-label='textarea' invalid />)

  // Assert
  expect(screen.getByLabelText<HTMLTextAreaElement>('textarea').checkValidity()).toBe(false)

  rerender(<Textarea aria-label='textarea' invalid={false} />)

  expect(screen.getByLabelText<HTMLTextAreaElement>('textarea').checkValidity()).toBe(true)
})

type SelectProps = { invalid?: boolean } & React.HTMLAttributes<HTMLSelectElement>

const Select: React.FC<SelectProps> = ({ invalid, ...rest }) => {
  const refs = useControllableValidity<HTMLSelectElement>(invalid)
  return <select ref={refs} {...rest} />
}

test('invalid prop으로 select 유효성을 제어할 수 있다', () => {
  // Arrange & Act
  const { rerender } = render(<Select aria-label='select' invalid />)

  // Assert
  expect(screen.getByLabelText<HTMLSelectElement>('select').checkValidity()).toBe(false)

  rerender(<Select aria-label='select' invalid={false} />)

  expect(screen.getByLabelText<HTMLSelectElement>('select').checkValidity()).toBe(true)
})
