import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ColumnDef } from '@tanstack/react-table'

import { DataTable } from './DataTable'
import { LabelBadge as Badge } from '../LabelBadge'
import { Checkbox } from '../Checkbox'

const meta = {
  title: 'eclipse/Data Display/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  args: {
    columns: [],
    data: [],
  },
} satisfies Meta<typeof DataTable>

export default meta
type Story = StoryObj<typeof meta>

type Payment = {
  id: string
  amount: number
  status: 'pending' | 'processing' | 'success' | 'failed'
  email: string
}

const data: Payment[] = [
  { id: 'm5gr84i9', amount: 316, status: 'success', email: 'ken99@yahoo.com' },
  { id: '3u1reuv4', amount: 242, status: 'success', email: 'Abe45@gmail.com' },
  { id: 'derv1ws0', amount: 837, status: 'processing', email: 'Monserrat44@gmail.com' },
  { id: '5kma53ae', amount: 874, status: 'success', email: 'Silas22@gmail.com' },
  { id: 'bhqecj4p', amount: 721, status: 'failed', email: 'carmella@hotmail.com' },
]

const statusColorMap = {
  success: 'benefit',
  processing: 'gray',
  pending: 'gray',
  failed: 'gray',
} as const

const columns: ColumnDef<Payment>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onChange={(e: any) => table.toggleAllPageRowsSelected(e.target.checked)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onChange={(e: any) => row.toggleSelected(e.target.checked)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'status',
    header: '상태',
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      const color = statusColorMap[status as keyof typeof statusColorMap] ?? 'gray'
      return (
        <Badge color={color}>
          <Badge.Label>{status.toUpperCase()}</Badge.Label>
        </Badge>
      )
    },
  },
  {
    accessorKey: 'email',
    header: '이메일',
  },
  {
    accessorKey: 'amount',
    header: () => <div className="text-right">금액</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
]

export const 기본: Story = {
  args: {
    columns: columns as any,
    data: data as any,
    enableSorting: true,
    enableRowSelection: true,
  },
  render: (args) => <DataTable {...args} />,
}

export const 로딩_상태: Story = {
  args: {
    columns: columns as any,
    data: [],
    loading: true,
    skeletonCount: 5,
  },
  render: (args) => <DataTable {...args} />,
}

export const 페이지네이션: Story = {
  args: {
    columns: columns as any,
    data: [...data, ...data, ...data] as any,
    enablePagination: true,
    pageSize: 5,
  },
  render: (args) => <DataTable {...args} />,
}

export const 정렬: Story = {
  args: {
    columns: columns as any,
    data: data as any,
    enableSorting: true,
  },
  render: (args) => <DataTable {...args} />,
}

/* --------------------------------------------------------------------------
   컬럼 필터링 패턴
   shadcn/ui Data Table 패턴: 이메일 검색 입력 + 컬럼 필터 연동.
   getFilteredRowModel()과 onColumnFiltersChange를 활용합니다.
-------------------------------------------------------------------------- */
const largeData: Payment[] = [
  { id: 'm5gr84i9', amount: 316, status: 'success', email: 'ken99@yahoo.com' },
  { id: '3u1reuv4', amount: 242, status: 'success', email: 'abe45@gmail.com' },
  { id: 'derv1ws0', amount: 837, status: 'processing', email: 'monserrat44@gmail.com' },
  { id: '5kma53ae', amount: 874, status: 'success', email: 'silas22@gmail.com' },
  { id: 'bhqecj4p', amount: 721, status: 'failed', email: 'carmella@hotmail.com' },
  { id: 'xk3j29qn', amount: 540, status: 'pending', email: 'james.doe@company.com' },
  { id: 'mp2x91vw', amount: 199, status: 'processing', email: 'olivia.kim@company.com' },
  { id: 'yz7t48rb', amount: 1200, status: 'success', email: 'noah.park@company.com' },
  { id: 'cd6g03lz', amount: 430, status: 'failed', email: 'emma.lee@company.com' },
  { id: 'pq1f82ws', amount: 675, status: 'success', email: 'liam.choi@company.com' },
]

const FilterableTableRender = () => {
  const [filterValue, setFilterValue] = React.useState('')
  const filtered = filterValue
    ? largeData.filter((row) =>
        row.email.toLowerCase().includes(filterValue.toLowerCase())
      )
    : largeData

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <input
          placeholder="이메일로 검색..."
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          aria-label="이메일 필터"
          style={{
            padding: '8px 12px',
            borderRadius: '8px',
            border: '1.5px solid #e2e8f0',
            fontSize: '13px',
            width: '240px',
            outline: 'none',
          }}
        />
        {filterValue && (
          <button
            onClick={() => setFilterValue('')}
            aria-label="필터 초기화"
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1.5px solid #e2e8f0',
              background: '#fff',
              fontSize: '13px',
              color: '#64748b',
              cursor: 'pointer',
            }}
          >
            초기화
          </button>
        )}
        <span style={{ fontSize: '12px', color: '#94a3b8', marginLeft: 'auto' }}>
          {filtered.length}개 / 전체 {largeData.length}개
        </span>
      </div>
      <DataTable
        columns={columns as any}
        data={filtered as any}
        enableSorting={true}
        enableRowSelection={true}
      />
    </div>
  )
}

export const 컬럼필터링: Story = {
  render: () => <FilterableTableRender />,
}

/* --------------------------------------------------------------------------
   상태 필터 + 행 선택 조합 패턴
   shadcn/ui 패턴: 상태별 탭 필터와 다중 선택, 선택된 행 카운트 표시.
   Row selection: "X of Y row(s) selected" 패턴 반영.
-------------------------------------------------------------------------- */
const StatusFilterRender = () => {
  const statuses = ['all', 'success', 'processing', 'pending', 'failed'] as const
  type StatusFilter = typeof statuses[number]
  const [activeStatus, setActiveStatus] = React.useState<StatusFilter>('all')

  const filtered = activeStatus === 'all'
    ? largeData
    : largeData.filter((row) => row.status === activeStatus)

  const statusColors: Record<string, string> = {
    all: '#6366f1',
    success: '#10b981',
    processing: '#f59e0b',
    pending: '#94a3b8',
    failed: '#ef4444',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
        {statuses.map((s) => {
          const count = s === 'all' ? largeData.length : largeData.filter((r) => r.status === s).length
          const active = activeStatus === s
          return (
            <button
              key={s}
              onClick={() => setActiveStatus(s)}
              aria-pressed={active}
              style={{
                padding: '5px 12px',
                borderRadius: '20px',
                border: `1.5px solid ${active ? statusColors[s] : '#e2e8f0'}`,
                background: active ? `${statusColors[s]}18` : '#fff',
                color: active ? statusColors[s] : '#64748b',
                fontWeight: active ? 700 : 400,
                fontSize: '12px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {s.toUpperCase()} ({count})
            </button>
          )
        })}
      </div>
      <DataTable
        columns={columns as any}
        data={filtered as any}
        enableSorting={true}
        enableRowSelection={true}
        enablePagination={true}
        pageSize={5}
      />
    </div>
  )
}

export const 상태필터링: Story = {
  render: () => <StatusFilterRender />,
}
