import { afterEach, describe, expect, test } from 'vitest'

import { render, screen, cleanup } from '../../test-utils'

import { SectionTitle } from './SectionTitle'

afterEach(() => cleanup())

describe('SectionTitle', () => {
  test('Title이 렌더된다', () => {
    render(
      <SectionTitle>
        <SectionTitle.Title>List Header</SectionTitle.Title>
      </SectionTitle>
    )
    expect(screen.getByText('List Header')).toBeInTheDocument()
  })

  test('Title과 Description이 함께 렌더된다', () => {
    render(
      <SectionTitle>
        <SectionTitle.Title>제목</SectionTitle.Title>
        <SectionTitle.Description>설명</SectionTitle.Description>
      </SectionTitle>
    )
    expect(screen.getByText('제목')).toBeInTheDocument()
    expect(screen.getByText('설명')).toBeInTheDocument()
  })

  test('Trailing 영역이 렌더된다', () => {
    render(
      <SectionTitle>
        <SectionTitle.Title>제목</SectionTitle.Title>
        <SectionTitle.Trailing>
          <button data-testid="trail-btn">Action</button>
        </SectionTitle.Trailing>
      </SectionTitle>
    )
    expect(screen.getByTestId('trail-btn')).toBeInTheDocument()
  })

  test('서브컴포넌트가 정의되어 있다', () => {
    expect(SectionTitle.Title).toBeDefined()
    expect(SectionTitle.Description).toBeDefined()
    expect(SectionTitle.Trailing).toBeDefined()
  })
})
