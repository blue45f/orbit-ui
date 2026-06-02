import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { forwardRef, HTMLAttributes, KeyboardEvent, ReactNode, Ref, useState } from 'react'

import { cn } from '../../styles'

export interface DataTableProps<TData, TValue> extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'children'
> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  /** 로딩 상태 */
  loading?: boolean
  /** 로딩 시 표시할 스켈레톤 행 개수 */
  skeletonCount?: number
  /** 정렬 기능 활성화 여부 */
  enableSorting?: boolean
  /** 선택 기능 활성화 여부 (컬럼 설정 필요) */
  enableRowSelection?: boolean
  /** 페이지네이션 기능 활성화 여부 */
  enablePagination?: boolean
  /** 페이지당 행 개수 */
  pageSize?: number
  /** 에러 상태. true 이면 errorMessage 가 표 본문에 노출된다 (loading 다음 우선순위) */
  error?: boolean
  /** 에러 상태에서 표 본문에 노출되는 메시지 (role="alert") @default "데이터를 불러오지 못했습니다." */
  errorMessage?: ReactNode
  /** 표 설명 (스크린 리더용 caption) */
  caption?: ReactNode
  /** aria-label - caption 대신 사용할 수 있는 접근 가능한 이름 */
  'aria-label'?: string
  /** 빈 상태 메시지 @default "검색 결과가 없습니다." */
  emptyMessage?: ReactNode
}

const FOCUS_RING =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--sem-base-focus-ring-color)] focus-visible:outline-offset-2'

const FOCUS_RING_INSET =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--sem-base-focus-ring-color)] focus-visible:outline-offset-[-2px]'

/**
 * DataTable - tanstack/react-table 기반의 접근 가능한 데이터 테이블
 *
 * 접근성:
 * - WAI-ARIA Grid Pattern 준수
 * - 정렬 헤더는 Enter/Space로 토글 가능
 * - aria-sort 속성 지원
 * - 행 선택 시 aria-selected 표기
 * - 키보드 네비 가능한 페이지네이션 버튼
 *
 * @example
 * ```tsx
 * <DataTable
 *   columns={columns}
 *   data={users}
 *   aria-label="사용자 목록"
 *   enablePagination
 * />
 * ```
 */
function DataTableInner<TData, TValue>(
  {
    columns,
    data,
    className,
    loading = false,
    skeletonCount = 5,
    error = false,
    errorMessage = '데이터를 불러오지 못했습니다.',
    enableSorting = true,
    enableRowSelection = true,
    enablePagination = false,
    pageSize = 10,
    caption,
    emptyMessage = '검색 결과가 없습니다.',
    'aria-label': ariaLabel,
    ...rest
  }: DataTableProps<TData, TValue>,
  ref: Ref<HTMLDivElement>
) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState({})

  // TanStack Table의 useReactTable는 메모이즈 불가 함수를 반환하므로 React Compiler가 이 컴포넌트
  // 메모이제이션을 건너뛴다(third-party 라이브러리 한계, 의도된 동작). 권고성 경고를 명시적으로 억제.
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    state: { sorting, rowSelection },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableSorting,
    enableRowSelection,
    initialState: { pagination: { pageSize } },
  })

  const totalPages = table.getPageCount()
  const currentPage = table.getState().pagination.pageIndex + 1
  const selectedCount = table.getFilteredSelectedRowModel().rows.length
  const totalCount = table.getFilteredRowModel().rows.length

  return (
    <div ref={ref} className={cn('w-full flex flex-col gap-4', className)} {...rest}>
      <div className="w-full overflow-auto rounded-xl border border-border-secondary bg-fill-none">
        <table
          aria-label={ariaLabel}
          aria-busy={loading}
          aria-rowcount={data.length}
          className="w-full caption-bottom text-sm"
        >
          {caption ? (
            <caption className="text-xs text-foreground-secondary py-2">{caption}</caption>
          ) : null}

          <thead className="bg-fill-primary">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-border-secondary">
                {headerGroup.headers.map((header) => {
                  const canSort = enableSorting && header.column.getCanSort()
                  const sorted = header.column.getIsSorted()
                  const ariaSort: 'ascending' | 'descending' | 'none' =
                    sorted === 'asc' ? 'ascending' : sorted === 'desc' ? 'descending' : 'none'

                  const handleSortKey = (e: KeyboardEvent<HTMLTableCellElement>) => {
                    if (!canSort) return
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      header.column.toggleSorting()
                    }
                  }

                  return (
                    <th
                      key={header.id}
                      scope="col"
                      role="columnheader"
                      aria-sort={canSort ? ariaSort : undefined}
                      tabIndex={canSort ? 0 : undefined}
                      onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                      onKeyDown={canSort ? handleSortKey : undefined}
                      className={cn(
                        'h-12 px-4 text-left align-middle font-semibold transition-colors text-foreground-secondary',
                        canSort && [
                          'cursor-pointer select-none hover:bg-fill-secondary',
                          FOCUS_RING_INSET,
                        ]
                      )}
                    >
                      <span className="flex items-center gap-2">
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                        {canSort && <SortIndicator state={sorted as 'asc' | 'desc' | false} />}
                      </span>
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>

          <tbody className="[&_tr:last-child]:border-0">
            {loading ? (
              Array.from({ length: skeletonCount }).map((_, i) => (
                <tr
                  key={`skeleton-${i}`}
                  aria-hidden="true"
                  className="border-b border-border-tertiary animate-pulse motion-reduce:animate-none"
                >
                  {columns.map((_, j) => (
                    <td key={j} className="p-4 align-middle">
                      <div className="h-4 rounded w-full bg-fill-secondary" />
                    </td>
                  ))}
                </tr>
              ))
            ) : error ? (
              <tr>
                <td
                  colSpan={columns.length}
                  role="alert"
                  className="h-32 text-center align-middle font-medium text-status-negative"
                >
                  {errorMessage}
                </td>
              </tr>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                const selected = row.getIsSelected()
                return (
                  <tr
                    key={row.id}
                    aria-selected={enableRowSelection ? selected : undefined}
                    data-state={selected ? 'selected' : undefined}
                    className={cn(
                      'border-b border-border-tertiary transition-colors hover:bg-fill-primary',
                      selected && 'bg-fill-secondary'
                    )}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="p-4 align-middle text-foreground-primary">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                )
              })
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="h-32 text-center align-middle font-medium text-foreground-tertiary"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {enablePagination && (
        <nav
          aria-label="페이지네이션"
          className="flex items-center justify-between px-2 gap-2 flex-wrap"
        >
          <div className="text-xs text-foreground-tertiary" aria-live="polite">
            {enableRowSelection ? (
              <>
                <span className="font-semibold">{selectedCount}</span>
                <span> / {totalCount}개 선택됨</span>
              </>
            ) : (
              <>
                전체 <span className="font-semibold">{totalCount}</span>개
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            <PageButton
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              ariaLabel="이전 페이지"
            >
              이전
            </PageButton>
            <span
              className="text-sm font-medium tabular-nums text-foreground-primary"
              aria-current="page"
              aria-label={`현재 ${currentPage}페이지, 전체 ${totalPages}페이지`}
            >
              {currentPage} / {totalPages || 1}
            </span>
            <PageButton
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              ariaLabel="다음 페이지"
            >
              다음
            </PageButton>
          </div>
        </nav>
      )}
    </div>
  )
}

/* ─── Sort indicator ─────────────────────────────────────────────────── */

const SortIndicator = ({ state }: { state: 'asc' | 'desc' | false }) => (
  <span
    aria-hidden="true"
    className="inline-flex w-4 h-4 items-center justify-center text-[10px] leading-none opacity-60 transition-opacity"
  >
    {state === 'asc' ? '▲' : state === 'desc' ? '▼' : '⇅'}
  </span>
)

/* ─── Pagination button ──────────────────────────────────────────────── */

const PageButton = ({
  onClick,
  disabled,
  ariaLabel,
  children,
}: {
  onClick: () => void
  disabled?: boolean
  ariaLabel: string
  children: ReactNode
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    aria-label={ariaLabel}
    className={cn(
      'px-3 py-1 text-sm rounded-md transition-colors',
      'border border-border-secondary hover:bg-fill-primary',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      FOCUS_RING
    )}
  >
    {children}
  </button>
)

/* ─── forwardRef export with generics preserved ──────────────────────── */

// React.forwardRef 의 render.length === 2 검증을 안정적으로 통과시키기 위해
// function 키워드 + 명명 함수 + 명시적 params 로 작성한다.
// generics 는 외부 cast 로 사용자 측 추론을 보존.
const DataTableForwarded = forwardRef(function DataTableRender(
  props: DataTableProps<unknown, unknown>,
  ref: Ref<HTMLDivElement>
) {
  return DataTableInner(props, ref)
})

export const DataTable = DataTableForwarded as <TData, TValue>(
  props: DataTableProps<TData, TValue> & { ref?: Ref<HTMLDivElement> }
) => ReturnType<typeof DataTableInner>
