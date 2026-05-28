import { ColumnDef } from '@tanstack/react-table'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import { cleanup, render, screen } from '../../test-utils'

import { DataTable } from './DataTable'

beforeEach(() => {
  global.ResizeObserver = class {
    observe = vi.fn()
    unobserve = vi.fn()
    disconnect = vi.fn()
    constructor(_cb: ResizeObserverCallback) {}
  } as unknown as typeof ResizeObserver
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

type Row = { id: number; name: string; email: string }

const data: Row[] = [
  { id: 1, name: '김철수', email: 'cs@example.com' },
  { id: 2, name: '박영희', email: 'yh@example.com' },
  { id: 3, name: '이민수', email: 'ms@example.com' },
]

const columns: ColumnDef<Row, unknown>[] = [
  { id: 'name', accessorKey: 'name', header: '이름', enableSorting: true },
  { id: 'email', accessorKey: 'email', header: '이메일', enableSorting: false },
]


const Table = DataTable as any

describe('DataTable', () => {
  test('aria-label로 테이블이 식별된다', () => {
    render(<Table columns={columns} data={data} aria-label="사용자 목록" />)

    expect(screen.getByRole('table', { name: '사용자 목록' })).toBeInTheDocument()
  })

  test('컬럼 헤더가 렌더링된다', () => {
    render(<Table columns={columns} data={data} aria-label="users" />)

    expect(screen.getByRole('columnheader', { name: /이름/ })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: /이메일/ })).toBeInTheDocument()
  })

  test('행 데이터가 렌더링된다', () => {
    render(<Table columns={columns} data={data} aria-label="users" />)

    expect(screen.getByText('김철수')).toBeInTheDocument()
    expect(screen.getByText('박영희')).toBeInTheDocument()
    expect(screen.getByText('이민수')).toBeInTheDocument()
    expect(screen.getByText('cs@example.com')).toBeInTheDocument()
  })

  test('정렬 가능 헤더는 aria-sort 속성을 가진다', () => {
    render(<Table columns={columns} data={data} aria-label="users" />)

    const nameHeader = screen.getByRole('columnheader', { name: /이름/ })
    expect(nameHeader).toHaveAttribute('aria-sort', 'none')
  })

  test('빈 데이터일 때 emptyMessage가 노출된다', () => {
    render(
      <Table
        columns={columns}
        data={[]}
        aria-label="users"
        emptyMessage="데이터 없음"
      />
    )

    expect(screen.getByText('데이터 없음')).toBeInTheDocument()
  })

  test('caption이 렌더링된다', () => {
    render(
      <Table
        columns={columns}
        data={data}
        aria-label="users"
        caption="사용자 목록 캡션"
      />
    )

    expect(screen.getByText('사용자 목록 캡션')).toBeInTheDocument()
  })

  test('loading 상태에서 aria-busy=true가 적용된다', () => {
    render(
      <Table columns={columns} data={[]} aria-label="users" loading skeletonCount={2} />
    )

    const table = screen.getByRole('table')
    expect(table).toHaveAttribute('aria-busy', 'true')
  })

  test('forwardRef가 동작한다', () => {
    let captured: HTMLDivElement | null = null
    render(
      <Table
        ref={(el: HTMLDivElement | null) => {
          captured = el
        }}
        columns={columns}
        data={data}
        aria-label="users"
        data-testid="dt-root"
      />
    )

    expect(captured).not.toBeNull()
  })
})
