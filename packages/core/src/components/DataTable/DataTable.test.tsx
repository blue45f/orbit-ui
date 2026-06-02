import { ColumnDef } from '@tanstack/react-table'
import { afterEach, expect, test, vi, describe } from 'vitest'

import { cleanup, fireEvent, render, screen, within } from '../../test-utils'

import { DataTable } from './DataTable'

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

describe('DataTable', () => {
  test('aria-label 이 설정되면 테이블에 적용된다', () => {
    render(<DataTable columns={columns} data={data} aria-label="사용자 목록" />)
    const table = screen.getByRole('table', { name: '사용자 목록' })
    expect(table).toBeInTheDocument()
  })

  test('정렬 가능 헤더는 aria-sort 속성을 가진다', () => {
    render(<DataTable columns={columns} data={data} aria-label="users" />)
    const nameHeader = screen.getByRole('columnheader', { name: /이름/ })
    expect(nameHeader).toHaveAttribute('aria-sort', 'none')
  })

  test('정렬 가능 헤더 클릭 시 aria-sort 가 ascending → descending 으로 토글된다', () => {
    render(<DataTable columns={columns} data={data} aria-label="users" />)
    const nameHeader = screen.getByRole('columnheader', { name: /이름/ })

    fireEvent.click(nameHeader)
    expect(nameHeader).toHaveAttribute('aria-sort', 'ascending')

    fireEvent.click(nameHeader)
    expect(nameHeader).toHaveAttribute('aria-sort', 'descending')
  })

  test('정렬 가능 헤더는 Enter 키로 토글할 수 있다', () => {
    render(<DataTable columns={columns} data={data} aria-label="users" />)
    const nameHeader = screen.getByRole('columnheader', { name: /이름/ })
    nameHeader.focus()
    fireEvent.keyDown(nameHeader, { key: 'Enter' })
    expect(nameHeader).toHaveAttribute('aria-sort', 'ascending')
  })

  test('정렬 가능 헤더는 Space 키로 토글할 수 있다', () => {
    render(<DataTable columns={columns} data={data} aria-label="users" />)
    const nameHeader = screen.getByRole('columnheader', { name: /이름/ })
    nameHeader.focus()
    fireEvent.keyDown(nameHeader, { key: ' ' })
    expect(nameHeader).toHaveAttribute('aria-sort', 'ascending')
  })

  test('정렬 불가 헤더는 tabIndex 와 aria-sort 가 없다', () => {
    render(<DataTable columns={columns} data={data} aria-label="users" />)
    const emailHeader = screen.getByRole('columnheader', { name: /이메일/ })
    expect(emailHeader).not.toHaveAttribute('aria-sort')
    expect(emailHeader).not.toHaveAttribute('tabindex')
  })

  test('loading 상태에서 aria-busy=true 가 적용되고 스켈레톤 행이 렌더된다', () => {
    render(<DataTable columns={columns} data={[]} aria-label="users" loading skeletonCount={3} />)
    const table = screen.getByRole('table')
    expect(table).toHaveAttribute('aria-busy', 'true')
    // skeleton 행은 aria-hidden이라 role=row 카운트에서 빠짐 → header만 노출
    const rows = within(table).getAllByRole('row')
    expect(rows.length).toBe(1) // header row only
  })

  test('빈 데이터일 때 emptyMessage 가 노출된다', () => {
    render(<DataTable columns={columns} data={[]} aria-label="users" emptyMessage="데이터 없음" />)
    expect(screen.getByText('데이터 없음')).toBeInTheDocument()
  })

  test('error 상태에서 errorMessage 가 role="alert" 로 노출된다', () => {
    render(
      <DataTable
        columns={columns}
        data={[]}
        aria-label="users"
        error
        errorMessage="불러오기 실패"
      />
    )
    const alert = screen.getByRole('alert')
    expect(alert).toHaveTextContent('불러오기 실패')
  })

  test('error 가 켜져도 데이터 대신 에러 메시지가 우선 노출된다', () => {
    render(<DataTable columns={columns} data={data} aria-label="users" error errorMessage="에러" />)
    expect(screen.getByText('에러')).toBeInTheDocument()
    expect(screen.queryByText('김철수')).not.toBeInTheDocument()
  })

  test('loading 이 error 보다 우선한다 (loading > error)', () => {
    render(
      <DataTable
        columns={columns}
        data={[]}
        aria-label="users"
        loading
        error
        errorMessage="에러"
        skeletonCount={2}
      />
    )
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    expect(screen.getByRole('table')).toHaveAttribute('aria-busy', 'true')
  })

  test('caption 이 전달되면 테이블 caption 으로 렌더된다', () => {
    render(
      <DataTable columns={columns} data={data} aria-label="users" caption="2026년 등록 사용자" />
    )
    expect(screen.getByText('2026년 등록 사용자')).toBeInTheDocument()
  })

  test('페이지네이션이 켜지면 nav 와 이전/다음 버튼이 노출된다', () => {
    render(
      <DataTable columns={columns} data={data} aria-label="users" enablePagination pageSize={2} />
    )
    expect(screen.getByRole('navigation', { name: '페이지네이션' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '이전 페이지' })).toBeDisabled()
    expect(screen.getByRole('button', { name: '다음 페이지' })).not.toBeDisabled()
  })

  test('forwardRef 가 동작해 외부에서 ref 로 div 에 접근할 수 있다', () => {
    let captured: HTMLDivElement | null = null
    render(
      <DataTable
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
    expect(captured!.getAttribute('data-testid')).toBe('dt-root')
  })
})
