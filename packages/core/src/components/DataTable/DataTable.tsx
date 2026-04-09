import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'

import { cn } from '../../styles'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  className?: string
  /**
   * 로딩 상태
   */
  loading?: boolean
  /**
   * 로딩 시 표시할 스켈레톤 개수
   */
  skeletonCount?: number
  /**
   * 정렬 기능 활성화 여부
   */
  enableSorting?: boolean
  /**
   * 선택 기능 활성화 여부 (컬럼 설정 필요)
   */
  enableRowSelection?: boolean
  /**
   * 페이지네이션 기능 활성화 여부
   */
  enablePagination?: boolean
  /**
   * 페이지당 행 개수
   */
  pageSize?: number
}

export function DataTable<TData, TValue>({
  columns,
  data,
  className,
  loading = false,
  skeletonCount = 5,
  enableSorting = true,
  enableRowSelection = true,
  enablePagination = false,
  pageSize = 10,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      rowSelection,
    },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableSorting,
    enableRowSelection,
    initialState: {
      pagination: {
        pageSize,
      },
    },
  })

  return (
    <div className={cn('w-full flex flex-col gap-4', className)}>
      <div className="w-full overflow-auto rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <table className="w-full caption-bottom text-sm">
          <thead className="bg-slate-50/50 dark:bg-slate-900/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-slate-200 dark:border-slate-800">
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      className={cn(
                        'h-12 px-4 text-left align-middle font-semibold text-slate-600 dark:text-slate-300 transition-colors',
                        header.column.getCanSort() &&
                          'cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800'
                      )}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center gap-2">
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <div className="w-4 h-4 flex flex-col justify-center items-center opacity-40 group-hover:opacity-100 transition-opacity">
                            {{
                              asc: '↑',
                              desc: '↓',
                            }[header.column.getIsSorted() as string] ?? '⇅'}
                          </div>
                        )}
                      </div>
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
                  key={i}
                  className="border-b border-slate-100 dark:border-slate-800/50 animate-pulse"
                >
                  {columns.map((_, j) => (
                    <td key={j} className="p-4 align-middle">
                      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full" />
                    </td>
                  ))}
                </tr>
              ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className={cn(
                    'border-b border-slate-100 dark:border-slate-800/50 transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-900/50',
                    row.getIsSelected() && 'bg-slate-50 dark:bg-slate-900'
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-4 align-middle text-slate-700 dark:text-slate-400">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="h-32 text-center align-middle text-slate-500 font-medium"
                >
                  검색 결과가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {enablePagination && (
        <div className="flex items-center justify-between px-2">
          <div className="text-xs text-slate-500">
            {table.getFilteredSelectedRowModel().rows.length} of{' '}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1 text-sm rounded border border-slate-200 hover:bg-slate-50 disabled:opacity-50"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              이전
            </button>
            <span className="text-sm font-medium">
              {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
            </span>
            <button
              className="px-3 py-1 text-sm rounded border border-slate-200 hover:bg-slate-50 disabled:opacity-50"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              다음
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
