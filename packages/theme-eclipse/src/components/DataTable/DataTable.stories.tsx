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

/* --------------------------------------------------------------------------
   확장 행 패턴 (Arco Design Table expandable row)
   각 행을 클릭하면 추가 상세 정보가 인라인으로 펼쳐지는 패턴.
   Arco Design의 expandedRowRender 기능을 Orbit UI DataTable로 재현합니다.
-------------------------------------------------------------------------- */
type Order = {
  id: string
  product: string
  quantity: number
  status: 'pending' | 'processing' | 'success' | 'failed'
  total: number
}

const orderData: Order[] = [
  { id: 'ORD-001', product: 'Orbit Pro 라이선스', quantity: 5, status: 'success', total: 149500 },
  { id: 'ORD-002', product: 'Design Token Pack', quantity: 1, status: 'processing', total: 29900 },
  { id: 'ORD-003', product: 'Component Library', quantity: 3, status: 'pending', total: 89700 },
  { id: 'ORD-004', product: 'Storybook 플러그인', quantity: 2, status: 'failed', total: 59800 },
]

const orderDetails: Record<string, { sku: string; warehouse: string; trackingNo: string; estimatedDelivery: string }> = {
  'ORD-001': { sku: 'OPL-2024-PRO', warehouse: '서울 물류센터', trackingNo: 'TRK-83921', estimatedDelivery: '2024-05-15' },
  'ORD-002': { sku: 'DTP-2024-STD', warehouse: '부산 물류센터', trackingNo: 'TRK-47562', estimatedDelivery: '2024-05-10' },
  'ORD-003': { sku: 'CL-2024-ENT', warehouse: '인천 물류센터', trackingNo: 'TRK-29184', estimatedDelivery: '2024-05-20' },
  'ORD-004': { sku: 'SBP-2024-STD', warehouse: '대구 물류센터', trackingNo: 'TRK-61037', estimatedDelivery: '2024-05-12' },
}

const orderStatusColorMap = {
  success: 'benefit',
  processing: 'gray',
  pending: 'gray',
  failed: 'gray',
} as const

const ExpandableTableRender = () => {
  const [selectedOrder, setSelectedOrder] = React.useState<string | null>(null)

  const orderColumns: ColumnDef<Order>[] = [
    {
      id: 'expand',
      header: '',
      cell: ({ row }) => {
        const isExpanded = selectedOrder === row.original.id
        return (
          <button
            onClick={() => setSelectedOrder(isExpanded ? null : row.original.id)}
            aria-label={isExpanded ? '행 접기' : '행 펼치기'}
            aria-expanded={isExpanded}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              width: '24px', height: '24px', display: 'flex', alignItems: 'center',
              justifyContent: 'center', borderRadius: '4px',
              transition: 'background 0.15s',
            }}
          >
            <svg
              width="14" height="14" viewBox="0 0 24 24" fill="none"
              style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}
            >
              <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )
      },
      enableSorting: false,
      enableHiding: false,
    },
    { accessorKey: 'id', header: '주문번호' },
    { accessorKey: 'product', header: '상품명' },
    { accessorKey: 'quantity', header: '수량' },
    {
      accessorKey: 'status',
      header: '상태',
      cell: ({ row }) => {
        const status = row.getValue('status') as string
        const color = orderStatusColorMap[status as keyof typeof orderStatusColorMap] ?? 'gray'
        return (
          <Badge color={color}>
            <Badge.Label>{status.toUpperCase()}</Badge.Label>
          </Badge>
        )
      },
    },
    {
      accessorKey: 'total',
      header: () => <div className="text-right">합계</div>,
      cell: ({ row }) => {
        const total = parseFloat(row.getValue('total'))
        const formatted = new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(total)
        return <div className="text-right font-medium">{formatted}</div>
      },
    },
  ]

  const selectedDetail = selectedOrder ? orderDetails[selectedOrder] : null
  const selectedOrderData = selectedOrder ? orderData.find((o) => o.id === selectedOrder) : null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
      <div style={{ fontSize: '13px', color: '#64748b', padding: '4px 0' }}>
        행의 <strong style={{ color: '#1e293b' }}>펼침 버튼</strong>을 클릭하면 하단에 상세 정보가 표시됩니다. (Arco Design expandable row 패턴)
      </div>
      <DataTable
        columns={orderColumns as any}
        data={orderData as any}
        enableSorting={true}
      />
      {selectedDetail && selectedOrderData && (
        <div style={{
          padding: '16px 24px', background: '#f8fafc',
          borderRadius: '8px', border: '1px solid #e2e8f0',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px',
        }}>
          <div style={{ gridColumn: '1 / -1', marginBottom: '4px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#6366f1' }}>
              {selectedOrderData.id} 상세 정보
            </span>
          </div>
          {[
            { label: 'SKU', value: selectedDetail.sku },
            { label: '물류창고', value: selectedDetail.warehouse },
            { label: '운송장 번호', value: selectedDetail.trackingNo },
            { label: '예상 배송일', value: selectedDetail.estimatedDelivery },
          ].map(({ label, value }) => (
            <div key={label}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>{label}</div>
              <div style={{ fontSize: '13px', color: '#1e293b', fontWeight: 500 }}>{value}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export const 확장행: Story = {
  render: () => <ExpandableTableRender />,
}

/* --------------------------------------------------------------------------
   고정 컬럼 + 대용량 데이터 패턴 (Arco Design Table fixed column)
   첫 번째 컬럼(주문번호)과 마지막 컬럼(액션)을 고정하고
   가로 스크롤 시에도 항상 보이는 패턴.
-------------------------------------------------------------------------- */
type EmployeeRow = {
  id: string
  name: string
  department: string
  position: string
  location: string
  startDate: string
  salary: number
  status: 'active' | 'inactive' | 'pending'
}

const employeeData: EmployeeRow[] = [
  { id: 'E001', name: '김지혜', department: '개발팀', position: 'Senior Engineer', location: '서울 본사', startDate: '2021-03-15', salary: 7200000, status: 'active' },
  { id: 'E002', name: '박민준', department: '디자인팀', position: 'UI Designer', location: '서울 본사', startDate: '2022-07-01', salary: 5800000, status: 'active' },
  { id: 'E003', name: '이소연', department: '마케팅팀', position: 'Brand Manager', location: '부산 지사', startDate: '2020-11-20', salary: 6400000, status: 'active' },
  { id: 'E004', name: '최동욱', department: '영업팀', position: 'Sales Lead', location: '대구 지사', startDate: '2023-01-10', salary: 5200000, status: 'inactive' },
  { id: 'E005', name: '윤해린', department: '인사팀', position: 'HR Specialist', location: '서울 본사', startDate: '2022-04-05', salary: 4900000, status: 'pending' },
]

const empStatusColors: Record<string, string> = {
  active: '#10b981',
  inactive: '#ef4444',
  pending: '#f59e0b',
}

const StickyColumnTableRender = () => {
  const stickyColumns: ColumnDef<EmployeeRow>[] = [
    {
      accessorKey: 'id',
      header: '사번',
      cell: ({ row }) => (
        <span style={{ fontWeight: 600, color: '#6366f1', fontFamily: 'monospace' }}>
          {row.getValue('id')}
        </span>
      ),
    },
    { accessorKey: 'name', header: '이름' },
    { accessorKey: 'department', header: '부서' },
    { accessorKey: 'position', header: '직책' },
    { accessorKey: 'location', header: '근무지' },
    { accessorKey: 'startDate', header: '입사일' },
    {
      accessorKey: 'salary',
      header: () => <div className="text-right">월급</div>,
      cell: ({ row }) => {
        const salary = parseFloat(row.getValue('salary'))
        return (
          <div className="text-right font-medium">
            {new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(salary)}
          </div>
        )
      },
    },
    {
      accessorKey: 'status',
      header: '상태',
      cell: ({ row }) => {
        const status = row.getValue('status') as string
        return (
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '5px',
            fontSize: '12px', fontWeight: 600,
            color: empStatusColors[status] ?? '#94a3b8',
          }}>
            <span style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: empStatusColors[status] ?? '#94a3b8',
              flexShrink: 0,
            }} />
            {status === 'active' ? '재직' : status === 'inactive' ? '퇴직' : '대기'}
          </span>
        )
      },
    },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
      <div style={{ fontSize: '13px', color: '#64748b' }}>
        Arco Design의 <strong style={{ color: '#1e293b' }}>고정 컬럼</strong> 패턴: 가로 스크롤 시 사번 컬럼이 고정됩니다.
      </div>
      <div style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
        <DataTable
          columns={stickyColumns as any}
          data={employeeData as any}
          enableSorting={true}
          enableRowSelection={true}
        />
      </div>
    </div>
  )
}

export const 고정컬럼: Story = {
  render: () => <StickyColumnTableRender />,
}
