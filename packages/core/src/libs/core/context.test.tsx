import { render, cleanup } from '@testing-library/react'
import { afterEach, beforeAll, expect, test, vi } from 'vitest'

import { setupContext } from './context'

beforeAll(() => {
  console.error = vi.fn()
})

afterEach(() => cleanup())

type TestContext = {
  a: number
  b: string
}

const [, useRequiredConsumer] = setupContext<TestContext>('RequiredRoot')
const [, useOptionalProvider] = setupContext<TestContext>('OptionalRoot', { a: 33, b: 'boya' })

const Consume = ({ useCtx }: { useCtx: (name: string) => TestContext }) => {
  const { a, b } = useCtx('Consumer')

  return (
    <div>
      <span data-testid='a'>{a}</span>
      <span data-testid='b'>{b}</span>
    </div>
  )
}

test('필수 컨텍스트는 프로바이더가 없으면 오류를 던진다', () => {
  // Arrange
  // 여기서 바로 render()를 하면 테스트 케이스 레벨에서 오류가 발생함
  const lazyRender = () => render(<Consume useCtx={useRequiredConsumer} />)

  // Act
  // noop

  // Assert
  expect(lazyRender).toThrowError()
})

test('선택 컨텍스트는 프로바이더가 없으면 기본 값을 반환한다', async () => {
  // Arrange
  const screen = render(<Consume useCtx={useOptionalProvider} />)

  // Act
  // noop

  // Assert
  expect(await screen.findByTestId('a')).toHaveTextContent('33')
  expect(await screen.findByTestId('b')).toHaveTextContent('boya')
})
