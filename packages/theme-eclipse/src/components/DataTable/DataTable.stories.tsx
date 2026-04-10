import React, { useState as useDataTableState } from 'react'
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

/* --------------------------------------------------------------------------
   Vercel 스타일 배포 현황 테이블
   Vercel Design 패턴: 상태 dot indicator, 모노스페이스 해시, 시간 표시.
   컴팩트 밀도 + 모노크롬 팔레트로 배포 목록을 표현합니다.
-------------------------------------------------------------------------- */
type Deployment = {
  id: string
  commit: string
  branch: string
  author: string
  status: 'ready' | 'building' | 'error' | 'canceled'
  duration: string
  deployedAt: string
}

const deploymentData: Deployment[] = [
  { id: 'dpl_001', commit: 'a3f9b2c', branch: 'main', author: 'heejun', status: 'ready', duration: '1m 24s', deployedAt: '2m ago' },
  { id: 'dpl_002', commit: 'e71c4d8', branch: 'feat/slider', author: 'minji', status: 'building', duration: '--', deployedAt: '8m ago' },
  { id: 'dpl_003', commit: 'b50f912', branch: 'fix/toast', author: 'soyeon', status: 'error', duration: '0m 38s', deployedAt: '32m ago' },
  { id: 'dpl_004', commit: 'd2a8e61', branch: 'refactor/tokens', author: 'heejun', status: 'ready', duration: '2m 05s', deployedAt: '1h ago' },
  { id: 'dpl_005', commit: 'f9c3b47', branch: 'chore/deps', author: 'dongwook', status: 'canceled', duration: '--', deployedAt: '3h ago' },
  { id: 'dpl_006', commit: '77de021', branch: 'main', author: 'heejun', status: 'ready', duration: '1m 51s', deployedAt: '6h ago' },
]

const deployStatusConfig: Record<Deployment['status'], { color: string; label: string }> = {
  ready:    { color: '#10b981', label: 'Ready' },
  building: { color: '#f59e0b', label: 'Building' },
  error:    { color: '#ef4444', label: 'Error' },
  canceled: { color: '#94a3b8', label: 'Canceled' },
}

const DeploymentTableRender = () => {
  const [selectedStatus, setSelectedStatus] = React.useState<Deployment['status'] | 'all'>('all')

  const filtered = selectedStatus === 'all'
    ? deploymentData
    : deploymentData.filter((d) => d.status === selectedStatus)

  const deploymentColumns: ColumnDef<Deployment>[] = [
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as Deployment['status']
        const cfg = deployStatusConfig[status]
        return (
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            fontSize: '12px', fontWeight: 600, color: cfg.color,
          }}>
            <span style={{
              width: '7px', height: '7px', borderRadius: '50%',
              background: cfg.color,
              boxShadow: status === 'building' ? `0 0 0 2px ${cfg.color}30` : 'none',
              flexShrink: 0,
            }} />
            {cfg.label}
          </span>
        )
      },
    },
    {
      accessorKey: 'commit',
      header: 'Commit',
      cell: ({ row }) => (
        <code style={{
          fontFamily: '"JetBrains Mono", "Fira Code", monospace',
          fontSize: '12px',
          color: '#6366f1',
          background: 'rgba(99,102,241,0.08)',
          padding: '2px 6px',
          borderRadius: '4px',
          letterSpacing: '0.05em',
        }}>
          {row.getValue('commit')}
        </code>
      ),
    },
    {
      accessorKey: 'branch',
      header: 'Branch',
      cell: ({ row }) => (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#475569' }}>
          <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
            <path d="M11.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122V6A2.5 2.5 0 019 8.5H7A1 1 0 006 9.5v1.378a2.251 2.251 0 11-1.5 0V9.5A2.5 2.5 0 017 7h2a1 1 0 001-1v-.628A2.25 2.25 0 019.5 3.25zM4.25 12a.75.75 0 100 1.5.75.75 0 000-1.5z" />
          </svg>
          {row.getValue('branch')}
        </span>
      ),
    },
    {
      accessorKey: 'author',
      header: 'Author',
      cell: ({ row }) => (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#1e293b', fontWeight: 500 }}>
          <span style={{
            width: '20px', height: '20px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: '#fff', fontSize: '9px', fontWeight: 700,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            {(row.getValue('author') as string).charAt(0).toUpperCase()}
          </span>
          {row.getValue('author')}
        </span>
      ),
    },
    {
      accessorKey: 'duration',
      header: 'Duration',
      cell: ({ row }) => (
        <span style={{ fontFamily: 'monospace', fontSize: '12px', color: '#64748b' }}>
          {row.getValue('duration')}
        </span>
      ),
    },
    {
      accessorKey: 'deployedAt',
      header: 'Deployed',
      cell: ({ row }) => (
        <span style={{ fontSize: '12px', color: '#94a3b8' }}>
          {row.getValue('deployedAt')}
        </span>
      ),
    },
  ]

  const statusOptions: Array<{ value: Deployment['status'] | 'all'; label: string }> = [
    { value: 'all', label: 'All' },
    { value: 'ready', label: 'Ready' },
    { value: 'building', label: 'Building' },
    { value: 'error', label: 'Error' },
    { value: 'canceled', label: 'Canceled' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '4px' }}>
        <div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>Deployments</div>
          <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>orbit-ui / main</div>
        </div>
        <div style={{ display: 'flex', gap: '4px' }}>
          {statusOptions.map(({ value, label }) => {
            const active = selectedStatus === value
            const cfg = value !== 'all' ? deployStatusConfig[value] : null
            return (
              <button
                key={value}
                onClick={() => setSelectedStatus(value)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: `1px solid ${active ? (cfg?.color ?? '#6366f1') : '#e2e8f0'}`,
                  background: active ? `${(cfg?.color ?? '#6366f1')}10` : '#fff',
                  color: active ? (cfg?.color ?? '#6366f1') : '#64748b',
                  fontSize: '12px',
                  fontWeight: active ? 600 : 400,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                {cfg && (
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: cfg.color }} />
                )}
                {label}
              </button>
            )
          })}
        </div>
      </div>

      <DataTable
        columns={deploymentColumns as any}
        data={filtered as any}
        enableSorting={true}
      />

      {/* Footer hint */}
      <div style={{ fontSize: '11px', color: '#cbd5e1', textAlign: 'right' }}>
        Vercel Design 패턴: 상태 dot indicator + 모노스페이스 해시 + 컴팩트 밀도
      </div>
    </div>
  )
}

export const Vercel_배포현황: Story = {
  render: () => <DeploymentTableRender />,
}

/* --------------------------------------------------------------------------
   Notion 스타일: 인라인 프로퍼티 뷰 (view → edit 전환 패턴)
   Notion의 데이터베이스 row 상세보기처럼 프로퍼티를 클릭하면 편집 가능한 필드로 전환.
   Inspector panel + property list 조합 패턴.
-------------------------------------------------------------------------- */
type ProjectProperty = {
  id: string
  label: string
  value: string
  type: 'text' | 'status' | 'date' | 'person' | 'number'
}

const NotionPropertyViewRender = () => {
  const [editingId, setEditingId] = React.useState<string | null>(null)
  const [properties, setProperties] = React.useState<ProjectProperty[]>([
    { id: 'name', label: 'Name', value: 'Orbit UI Design System', type: 'text' },
    { id: 'status', label: 'Status', value: 'In Progress', type: 'status' },
    { id: 'assignee', label: 'Assignee', value: 'Kim Jihye', type: 'person' },
    { id: 'due', label: 'Due Date', value: '2026-05-30', type: 'date' },
    { id: 'priority', label: 'Priority', value: 'High', type: 'text' },
    { id: 'points', label: 'Story Points', value: '13', type: 'number' },
  ])

  const statusColors: Record<string, string> = {
    'In Progress': '#6366f1',
    'Done': '#10b981',
    'Backlog': '#94a3b8',
    'Blocked': '#ef4444',
    'Review': '#f59e0b',
  }

  const handleSave = (id: string, newValue: string) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, value: newValue } : p))
    )
    setEditingId(null)
  }

  const PropertyCell = ({ prop }: { prop: ProjectProperty }) => {
    const isEditing = editingId === prop.id
    const [localVal, setLocalVal] = React.useState(prop.value)

    if (isEditing) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: 1 }}>
          <input
            autoFocus
            value={localVal}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocalVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave(prop.id, localVal)
              if (e.key === 'Escape') setEditingId(null)
            }}
            style={{
              flex: 1,
              padding: '4px 8px',
              border: '1.5px solid #6366f1',
              borderRadius: '6px',
              fontSize: '13px',
              color: '#1e293b',
              outline: 'none',
              background: '#fff',
            }}
            aria-label={`${prop.label} 편집`}
          />
          <button
            onClick={() => handleSave(prop.id, localVal)}
            style={{
              padding: '4px 10px',
              borderRadius: '6px',
              border: 'none',
              background: '#6366f1',
              color: '#fff',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            저장
          </button>
          <button
            onClick={() => setEditingId(null)}
            style={{
              padding: '4px 8px',
              borderRadius: '6px',
              border: '1px solid #e2e8f0',
              background: '#fff',
              color: '#64748b',
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            취소
          </button>
        </div>
      )
    }

    if (prop.type === 'status') {
      const color = statusColors[prop.value] ?? '#94a3b8'
      return (
        <button
          onClick={() => setEditingId(prop.id)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            padding: '3px 10px',
            borderRadius: '20px',
            border: 'none',
            background: `${color}14`,
            color,
            fontSize: '12px',
            fontWeight: '700',
            cursor: 'pointer',
          }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: color }} />
          {prop.value}
        </button>
      )
    }

    if (prop.type === 'person') {
      return (
        <button
          onClick={() => setEditingId(prop.id)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'none',
            border: 'none',
            padding: '2px 4px',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          <div
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: '#6366f1',
              color: '#fff',
              fontSize: '8px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {prop.value.split(' ').map((n) => n[0]).join('')}
          </div>
          <span style={{ fontSize: '13px', color: '#1e293b' }}>{prop.value}</span>
        </button>
      )
    }

    return (
      <button
        onClick={() => setEditingId(prop.id)}
        style={{
          background: 'none',
          border: 'none',
          padding: '2px 4px',
          borderRadius: '4px',
          fontSize: '13px',
          color: '#1e293b',
          cursor: 'pointer',
          textAlign: 'left',
          transition: 'background 0.1s',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#f1f5f9' }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'none' }}
      >
        {prop.value}
      </button>
    )
  }

  return (
    <div style={{ maxWidth: '560px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ fontSize: '12px', color: '#94a3b8', padding: '4px 0' }}>
        Notion Database 패턴: 프로퍼티를 클릭하면 인라인 편집 모드로 전환됩니다 (Enter로 저장, Esc로 취소).
      </div>

      {/* 프로퍼티 패널 */}
      <div
        style={{
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          background: '#fff',
          overflow: 'hidden',
        }}
      >
        {/* 페이지 제목 영역 */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #f1f5f9',
            background: '#f8fafc',
          }}
        >
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
            Task
          </div>
          <div style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>
            {properties[0].value}
          </div>
        </div>

        {/* 프로퍼티 목록 */}
        {properties.slice(1).map((prop) => (
          <div
            key={prop.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px 24px',
              borderBottom: '1px solid #f8fafc',
              minHeight: '44px',
            }}
          >
            <div
              style={{
                width: '120px',
                fontSize: '12px',
                fontWeight: '500',
                color: '#94a3b8',
                flexShrink: 0,
              }}
            >
              {prop.label}
            </div>
            <div style={{ flex: 1 }}>
              <PropertyCell prop={prop} />
            </div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: '11px', color: '#cbd5e1', textAlign: 'right' }}>
        Notion Design 패턴: view to edit inline property panel
      </div>
    </div>
  )
}

export const Notion_인라인_프로퍼티: Story = {
  render: () => <NotionPropertyViewRender />,
}

/* --------------------------------------------------------------------------
   Figma Plugin UI: 인스펙터 패널 (Inspector Panel)
   속성명 + 값 + 단위 선택기가 나란히 있는 컴팩트 디자인 도구 패턴.
   선택된 레이어의 속성을 표시하고 편집하는 Figma 우측 패널 스타일.
-------------------------------------------------------------------------- */
type InspectorProp = {
  id: string
  label: string
  value: string
  unit?: string
  units?: string[]
}

const FigmaInspectorRender = () => {
  const [props, setProps] = React.useState<InspectorProp[]>([
    { id: 'x', label: 'X', value: '120', unit: 'px' },
    { id: 'y', label: 'Y', value: '80', unit: 'px' },
    { id: 'w', label: 'W', value: '320', unit: 'px' },
    { id: 'h', label: 'H', value: '48', unit: 'px' },
    { id: 'r', label: 'R', value: '8', unit: 'px', units: ['px', '%'] },
    { id: 'opacity', label: 'Opacity', value: '100', unit: '%' },
  ])

  const [fill, setFill] = React.useState('#6366F1')
  const [editingFill, setEditingFill] = React.useState(false)
  const [localFill, setLocalFill] = React.useState('#6366F1')

  const updateProp = (id: string, newValue: string) => {
    setProps((prev) =>
      prev.map((p) => (p.id === id ? { ...p, value: newValue } : p))
    )
  }

  return (
    <div
      style={{
        width: '220px',
        borderRadius: '10px',
        border: '1px solid #e2e8f0',
        background: '#fff',
        overflow: 'hidden',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        fontFamily: '"JetBrains Mono", "Fira Code", monospace',
        fontSize: '12px',
      }}
    >
      {/* 섹션: Transform */}
      <div style={{ padding: '8px 12px', borderBottom: '1px solid #f1f5f9', background: '#f8fafc' }}>
        <span style={{ fontSize: '10px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Transform
        </span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: '#f1f5f9', borderBottom: '1px solid #f1f5f9' }}>
        {props.slice(0, 4).map((prop) => (
          <div
            key={prop.id}
            style={{ background: '#fff', padding: '6px 10px', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <span style={{ fontSize: '10px', color: '#94a3b8', width: '14px', flexShrink: 0 }}>{prop.label}</span>
            <input
              value={prop.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateProp(prop.id, e.target.value)}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontSize: '12px',
                color: '#1e293b',
                background: 'transparent',
                width: '40px',
                fontFamily: 'inherit',
              }}
              aria-label={prop.label}
            />
            <span style={{ fontSize: '10px', color: '#cbd5e1' }}>{prop.unit}</span>
          </div>
        ))}
      </div>

      {/* 섹션: Appearance */}
      <div style={{ padding: '8px 12px', borderBottom: '1px solid #f1f5f9', background: '#f8fafc' }}>
        <span style={{ fontSize: '10px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Appearance
        </span>
      </div>
      {props.slice(4).map((prop) => (
        <div
          key={prop.id}
          style={{
            padding: '6px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            borderBottom: '1px solid #f8fafc',
          }}
        >
          <span style={{ fontSize: '10px', color: '#94a3b8', width: '52px', flexShrink: 0 }}>{prop.label}</span>
          <input
            value={prop.value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateProp(prop.id, e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '12px',
              color: '#1e293b',
              background: 'transparent',
              fontFamily: 'inherit',
            }}
            aria-label={prop.label}
          />
          <span style={{ fontSize: '10px', color: '#cbd5e1' }}>{prop.unit}</span>
        </div>
      ))}

      {/* 섹션: Fill */}
      <div style={{ padding: '8px 12px', borderBottom: '1px solid #f1f5f9', background: '#f8fafc' }}>
        <span style={{ fontSize: '10px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Fill
        </span>
      </div>
      <div style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          style={{
            width: '20px',
            height: '20px',
            borderRadius: '4px',
            background: fill,
            border: '1px solid rgba(0,0,0,0.12)',
            cursor: 'pointer',
            flexShrink: 0,
          }}
          aria-label="색상 선택"
        />
        {editingFill ? (
          <input
            autoFocus
            value={localFill}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocalFill(e.target.value)}
            onBlur={() => { setFill(localFill); setEditingFill(false) }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') { setFill(localFill); setEditingFill(false) }
              if (e.key === 'Escape') setEditingFill(false)
            }}
            style={{
              flex: 1,
              border: 'none',
              borderBottom: '1px solid #6366f1',
              outline: 'none',
              fontSize: '12px',
              color: '#1e293b',
              background: 'transparent',
              fontFamily: 'inherit',
              textTransform: 'uppercase',
            }}
            aria-label="Fill 색상 입력"
          />
        ) : (
          <button
            onClick={() => { setLocalFill(fill); setEditingFill(true) }}
            style={{
              flex: 1,
              border: 'none',
              background: 'transparent',
              fontSize: '12px',
              color: '#1e293b',
              cursor: 'text',
              textAlign: 'left',
              fontFamily: 'inherit',
              textTransform: 'uppercase',
            }}
          >
            {fill.replace('#', '')}
          </button>
        )}
        <span style={{ fontSize: '10px', color: '#cbd5e1' }}>100%</span>
      </div>

      <div style={{ padding: '6px 12px', borderTop: '1px solid #f1f5f9' }}>
        <span style={{ fontSize: '10px', color: '#cbd5e1' }}>Figma Inspector Panel Pattern</span>
      </div>
    </div>
  )
}

export const Figma_인스펙터_패널: Story = {
  render: () => <FigmaInspectorRender />,
}

/* --------------------------------------------------------------------------
   Ant Design 벤치마크: 배치 액션 테이블
   Ant Design Table 패턴: 다중 선택 후 하단 배치 액션 바가 나타나는 엔터프라이즈 패턴
-------------------------------------------------------------------------- */
type TeamMember = {
  id: string
  name: string
  role: string
  team: string
  status: 'active' | 'inactive' | 'pending'
  joinedAt: string
}

const TEAM_DATA: TeamMember[] = [
  { id: 'u1', name: '김민지', role: 'Frontend Engineer', team: 'Design System', status: 'active', joinedAt: '2024-01' },
  { id: 'u2', name: '이동욱', role: 'Backend Engineer', team: 'Platform', status: 'active', joinedAt: '2023-06' },
  { id: 'u3', name: '박소연', role: 'Product Designer', team: 'Design System', status: 'pending', joinedAt: '2024-03' },
  { id: 'u4', name: '최준호', role: 'DevOps Engineer', team: 'Infra', status: 'active', joinedAt: '2022-11' },
  { id: 'u5', name: '정하은', role: 'Frontend Engineer', team: 'Platform', status: 'inactive', joinedAt: '2023-02' },
  { id: 'u6', name: '황태양', role: 'QA Engineer', team: 'QA', status: 'active', joinedAt: '2024-02' },
]

const memberStatusCfg: Record<TeamMember['status'], { color: string; label: string; bg: string }> = {
  active:   { color: '#10b981', label: '재직', bg: '#f0fdf4' },
  inactive: { color: '#94a3b8', label: '퇴직', bg: '#f8fafc' },
  pending:  { color: '#f59e0b', label: '대기', bg: '#fffbeb' },
}

const BatchActionTableRender = () => {
  const [selected, setSelected] = React.useState<Set<string>>(new Set())
  const [data, setData] = React.useState(TEAM_DATA)

  const toggleAll = () => {
    if (selected.size === data.length) {
      setSelected(new Set())
    } else {
      setSelected(new Set(data.map((m) => m.id)))
    }
  }

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleBulkDeactivate = () => {
    setData((prev) =>
      prev.map((m) => selected.has(m.id) ? { ...m, status: 'inactive' as const } : m)
    )
    setSelected(new Set())
  }

  const handleBulkDelete = () => {
    setData((prev) => prev.filter((m) => !selected.has(m.id)))
    setSelected(new Set())
  }

  const memberColumns: ColumnDef<TeamMember>[] = [
    {
      id: 'select',
      header: () => (
        <Checkbox
          checked={selected.size === data.length && data.length > 0}
          onChange={toggleAll}
          aria-label="전체 선택"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={selected.has(row.original.id)}
          onChange={() => toggle(row.original.id)}
          aria-label={`${row.original.name} 선택`}
        />
      ),
      enableSorting: false,
    },
    {
      accessorKey: 'name',
      header: '이름',
      cell: ({ row }) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{row.original.name}</span>
          <span style={{ fontSize: 11, color: '#94a3b8' }}>{row.original.role}</span>
        </div>
      ),
    },
    { accessorKey: 'team', header: '팀' },
    {
      accessorKey: 'status',
      header: '상태',
      cell: ({ row }) => {
        const cfg = memberStatusCfg[row.original.status]
        return (
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            padding: '2px 8px', borderRadius: 6, fontSize: 11, fontWeight: 600,
            color: cfg.color, background: cfg.bg,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: cfg.color }} />
            {cfg.label}
          </span>
        )
      },
    },
    { accessorKey: 'joinedAt', header: '입사일' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, width: '100%' }}>
      <div style={{ padding: '12px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>팀원 관리</span>
        <span style={{ fontSize: 12, color: '#94a3b8' }}>총 {data.length}명</span>
      </div>
      <DataTable
        columns={memberColumns as any}
        data={data as any}
        enableSorting={true}
      />
      {selected.size > 0 && (
        <div
          style={{
            marginTop: 12,
            padding: '12px 16px',
            borderRadius: 10,
            border: '1.5px solid #6366f1',
            background: '#f5f3ff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 600, color: '#4f46e5' }}>
            {selected.size}명 선택됨
          </span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={handleBulkDeactivate}
              style={{
                padding: '6px 14px', borderRadius: 7, border: '1.5px solid #a5b4fc',
                background: '#fff', color: '#4f46e5', fontSize: 12, fontWeight: 600, cursor: 'pointer',
              }}
            >
              비활성화
            </button>
            <button
              onClick={handleBulkDelete}
              style={{
                padding: '6px 14px', borderRadius: 7, border: 'none',
                background: '#ef4444', color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer',
              }}
            >
              삭제
            </button>
            <button
              onClick={() => setSelected(new Set())}
              style={{
                padding: '6px 14px', borderRadius: 7, border: '1.5px solid #e2e8f0',
                background: '#fff', color: '#64748b', fontSize: 12, fontWeight: 600, cursor: 'pointer',
              }}
            >
              취소
            </button>
          </div>
        </div>
      )}
      <div style={{ marginTop: 12, fontSize: 11, color: '#94a3b8' }}>
        Ant Design 배치 액션 패턴 — 다중 선택 후 배치 액션 바 표시
      </div>
    </div>
  )
}

export const Ant_배치_액션_테이블: Story = {
  name: 'Ant Design - 배치 액션 테이블',
  render: () => <BatchActionTableRender />,
}

/* --------------------------------------------------------------------------
   Tailwind UI 벤치마크: 요약 통계 행 포함 테이블
   Tailwind UI의 stacked list + summary row 패턴 — 집계 통계를 하단에 표시
-------------------------------------------------------------------------- */
type SalesEntry = {
  id: string
  product: string
  category: string
  units: number
  revenue: number
  margin: number
  trend: 'up' | 'down' | 'flat'
}

const SALES_DATA: SalesEntry[] = [
  { id: 's1', product: 'Orbit Pro 라이선스', category: 'SaaS', units: 142, revenue: 4259800, margin: 78, trend: 'up' },
  { id: 's2', product: 'Design Token Pack', category: '에셋', units: 89, revenue: 2661100, margin: 92, trend: 'up' },
  { id: 's3', product: 'Storybook 플러그인', category: '플러그인', units: 54, revenue: 1077300, margin: 85, trend: 'flat' },
  { id: 's4', product: 'Component Library', category: 'SaaS', units: 33, revenue: 2970900, margin: 71, trend: 'down' },
  { id: 's5', product: 'Support 플랜', category: '서비스', units: 21, revenue: 1890000, margin: 62, trend: 'up' },
]

const trendIcon = (trend: SalesEntry['trend']) => {
  if (trend === 'up') return <span style={{ color: '#10b981', fontSize: 12 }}>▲</span>
  if (trend === 'down') return <span style={{ color: '#ef4444', fontSize: 12 }}>▼</span>
  return <span style={{ color: '#94a3b8', fontSize: 12 }}>─</span>
}

const formatKRW = (n: number) =>
  n >= 1000000
    ? `${(n / 1000000).toFixed(1)}M`
    : `${(n / 1000).toFixed(0)}K`

const SalesSummaryTableRender = () => {
  const totals = {
    units: SALES_DATA.reduce((s, r) => s + r.units, 0),
    revenue: SALES_DATA.reduce((s, r) => s + r.revenue, 0),
    margin: Math.round(SALES_DATA.reduce((s, r) => s + r.margin, 0) / SALES_DATA.length),
  }

  const salesColumns: ColumnDef<SalesEntry>[] = [
    {
      accessorKey: 'product',
      header: '제품',
      cell: ({ row }) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{row.original.product}</span>
          <span
            style={{
              fontSize: 10, padding: '1px 6px', borderRadius: 4,
              background: '#f1f5f9', color: '#64748b', display: 'inline-block',
              width: 'fit-content',
            }}
          >
            {row.original.category}
          </span>
        </div>
      ),
    },
    {
      accessorKey: 'units',
      header: () => <div style={{ textAlign: 'right' }}>판매</div>,
      cell: ({ row }) => (
        <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4 }}>
          {trendIcon(row.original.trend)}
          <span style={{ fontSize: 13, fontWeight: 600 }}>{row.original.units}</span>
        </div>
      ),
    },
    {
      accessorKey: 'revenue',
      header: () => <div style={{ textAlign: 'right' }}>매출</div>,
      cell: ({ row }) => (
        <div style={{ textAlign: 'right', fontSize: 13, fontWeight: 700, color: '#0f172a' }}>
          ₩{formatKRW(row.original.revenue)}
        </div>
      ),
    },
    {
      accessorKey: 'margin',
      header: () => <div style={{ textAlign: 'right' }}>마진</div>,
      cell: ({ row }) => {
        const m = row.original.margin
        const color = m >= 80 ? '#10b981' : m >= 65 ? '#6366f1' : '#f59e0b'
        return (
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: 12, fontWeight: 700, color }}>{m}%</span>
          </div>
        )
      },
    },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, width: '100%', maxWidth: 600 }}>
      <div style={{ padding: '12px 0', display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>제품별 매출 현황</span>
        <span style={{ fontSize: 12, color: '#94a3b8' }}>2026 Q1</span>
      </div>
      <DataTable columns={salesColumns as any} data={SALES_DATA as any} enableSorting={true} />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 0,
          borderTop: '2px solid #0f172a',
          padding: '12px 0',
          marginTop: 4,
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 500, marginBottom: 4 }}>총 판매</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#0f172a' }}>{totals.units}</div>
        </div>
        <div style={{ textAlign: 'center', borderLeft: '1px solid #e2e8f0', borderRight: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 500, marginBottom: 4 }}>총 매출</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#0f172a' }}>₩{formatKRW(totals.revenue)}</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 500, marginBottom: 4 }}>평균 마진</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#10b981' }}>{totals.margin}%</div>
        </div>
      </div>
      <div style={{ marginTop: 6, fontSize: 11, color: '#94a3b8' }}>
        Tailwind UI 요약 통계 행 패턴 — 집계 지표를 테이블 하단에 표시
      </div>
    </div>
  )
}

export const Tailwind_매출_요약_테이블: Story = {
  name: 'Tailwind UI - 요약 통계 행 포함 매출 테이블',
  render: () => <SalesSummaryTableRender />,
}

/* --------------------------------------------------------------------------
   Linear Design 벤치마크: 이슈 트래커 테이블
   Linear의 이슈 목록 뷰 — 우선순위 아이콘, 상태 배지, 담당자 아바타 조합 패턴.
-------------------------------------------------------------------------- */
type LinearIssue = {
  id: string
  priority: 'urgent' | 'high' | 'medium' | 'low'
  title: string
  status: 'backlog' | 'todo' | 'in-progress' | 'in-review' | 'done'
  assignee: string
  points: number
}

const LINEAR_ISSUES: LinearIssue[] = [
  { id: 'ORB-421', priority: 'urgent', title: 'DataTable 정렬 오류 수정', status: 'in-progress', assignee: '김민지', points: 3 },
  { id: 'ORB-418', priority: 'high', title: 'Toast 스택 애니메이션 구현', status: 'in-review', assignee: '이동욱', points: 5 },
  { id: 'ORB-415', priority: 'high', title: 'TextArea 자동 높이 조절', status: 'todo', assignee: '박소연', points: 2 },
  { id: 'ORB-412', priority: 'medium', title: 'Chip 컴포넌트 disabled 상태', status: 'backlog', assignee: '최준호', points: 1 },
  { id: 'ORB-409', priority: 'medium', title: 'Modal 포커스 트랩 접근성', status: 'done', assignee: '정하은', points: 3 },
  { id: 'ORB-405', priority: 'low', title: 'Storybook 문서 업데이트', status: 'done', assignee: '황태양', points: 1 },
]

const PRIORITY_CFG = {
  urgent: { color: '#ef4444', label: '긴급', icon: '🔴' },
  high:   { color: '#f59e0b', label: '높음', icon: '🟠' },
  medium: { color: '#6366f1', label: '중간', icon: '🟡' },
  low:    { color: '#94a3b8', label: '낮음', icon: '⚪' },
} as const

const LINEAR_STATUS_CFG = {
  backlog:     { color: '#94a3b8', label: 'Backlog', bg: '#f8fafc' },
  todo:        { color: '#6366f1', label: 'Todo', bg: '#eff6ff' },
  'in-progress': { color: '#f59e0b', label: 'In Progress', bg: '#fffbeb' },
  'in-review': { color: '#8b5cf6', label: 'In Review', bg: '#f5f3ff' },
  done:        { color: '#10b981', label: 'Done', bg: '#f0fdf4' },
} as const

const LinearIssueTableRender = () => {
  const [statusFilter, setStatusFilter] = React.useState<LinearIssue['status'] | 'all'>('all')

  const filtered = statusFilter === 'all'
    ? LINEAR_ISSUES
    : LINEAR_ISSUES.filter((i) => i.status === statusFilter)

  const issueColumns: ColumnDef<LinearIssue>[] = [
    {
      accessorKey: 'priority',
      header: '',
      cell: ({ row }) => {
        const cfg = PRIORITY_CFG[row.original.priority]
        return (
          <span title={cfg.label} style={{ fontSize: '14px', cursor: 'default' }}>
            {cfg.icon}
          </span>
        )
      },
    },
    {
      accessorKey: 'id',
      header: 'ID',
      cell: ({ row }) => (
        <code style={{
          fontFamily: 'monospace',
          fontSize: '11px',
          color: '#94a3b8',
          letterSpacing: '0.04em',
        }}>
          {row.original.id}
        </code>
      ),
    },
    {
      accessorKey: 'title',
      header: '제목',
      cell: ({ row }) => (
        <span style={{
          fontSize: '13px',
          fontWeight: 500,
          color: row.original.status === 'done' ? '#94a3b8' : '#1e293b',
          textDecoration: row.original.status === 'done' ? 'line-through' : 'none',
        }}>
          {row.original.title}
        </span>
      ),
    },
    {
      accessorKey: 'status',
      header: '상태',
      cell: ({ row }) => {
        const cfg = LINEAR_STATUS_CFG[row.original.status]
        return (
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            padding: '3px 8px', borderRadius: 20, fontSize: 11, fontWeight: 600,
            color: cfg.color, background: cfg.bg, whiteSpace: 'nowrap',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: cfg.color, flexShrink: 0 }} />
            {cfg.label}
          </span>
        )
      },
    },
    {
      accessorKey: 'assignee',
      header: '담당자',
      cell: ({ row }) => (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
          <span style={{
            width: 22, height: 22, borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: '#fff', fontSize: '9px', fontWeight: 700,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            {row.original.assignee.charAt(0)}
          </span>
          <span style={{ color: '#475569' }}>{row.original.assignee}</span>
        </span>
      ),
    },
    {
      accessorKey: 'points',
      header: 'Pt',
      cell: ({ row }) => (
        <span style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 22, height: 22, borderRadius: 6,
          background: '#f1f5f9', fontSize: 11, fontWeight: 700, color: '#475569',
        }}>
          {row.original.points}
        </span>
      ),
    },
  ]

  const statuses: Array<LinearIssue['status'] | 'all'> = ['all', 'backlog', 'todo', 'in-progress', 'in-review', 'done']

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 680 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>Issues</div>
          <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>orbit-ui / Design System</div>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {statuses.map((s) => {
            const active = statusFilter === s
            const cfg = s !== 'all' ? LINEAR_STATUS_CFG[s] : null
            return (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                style={{
                  padding: '4px 10px', borderRadius: 6,
                  border: `1px solid ${active ? (cfg?.color ?? '#6366f1') : '#e2e8f0'}`,
                  background: active ? `${(cfg?.color ?? '#6366f1')}12` : '#fff',
                  color: active ? (cfg?.color ?? '#6366f1') : '#64748b',
                  fontSize: 11, fontWeight: active ? 700 : 400, cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                {s === 'all' ? 'All' : LINEAR_STATUS_CFG[s].label}
              </button>
            )
          })}
        </div>
      </div>
      <DataTable columns={issueColumns as any} data={filtered as any} enableSorting={true} />
      <div style={{ fontSize: 11, color: '#94a3b8' }}>
        Linear Design 패턴 — 우선순위 아이콘 + 상태 배지 + 담당자 아바타
      </div>
    </div>
  )
}

export const Linear_이슈_트래커: Story = {
  name: 'Linear Design - 이슈 트래커 테이블',
  render: () => <LinearIssueTableRender />,
}

/* --------------------------------------------------------------------------
   Figma Plugin UI 벤치마크: 레이어 패널 테이블
   Figma의 레이어 목록처럼 계층형 레이어 이름 + 타입 아이콘 + 크기 + 가시성 제어
-------------------------------------------------------------------------- */
type FigmaLayer = {
  id: string
  depth: number
  type: 'frame' | 'component' | 'group' | 'text' | 'rect'
  name: string
  width: number
  height: number
  visible: boolean
  locked: boolean
}

const FIGMA_LAYERS: FigmaLayer[] = [
  { id: 'l1', depth: 0, type: 'frame', name: 'Dashboard / Main', width: 1440, height: 900, visible: true, locked: false },
  { id: 'l2', depth: 1, type: 'component', name: 'AppBar', width: 1440, height: 64, visible: true, locked: true },
  { id: 'l3', depth: 1, type: 'group', name: 'Content Area', width: 1320, height: 780, visible: true, locked: false },
  { id: 'l4', depth: 2, type: 'component', name: 'Sidebar Nav', width: 240, height: 780, visible: true, locked: false },
  { id: 'l5', depth: 2, type: 'frame', name: 'Main Panel', width: 1040, height: 780, visible: true, locked: false },
  { id: 'l6', depth: 3, type: 'text', name: 'Page Title', width: 240, height: 32, visible: true, locked: false },
  { id: 'l7', depth: 3, type: 'rect', name: 'Card Background', width: 980, height: 200, visible: false, locked: false },
]

const LAYER_TYPE_CFG = {
  frame:     { icon: '⬜', color: '#6366f1', label: 'Frame' },
  component: { icon: '◆', color: '#8b5cf6', label: 'Component' },
  group:     { icon: '▣', color: '#f59e0b', label: 'Group' },
  text:      { icon: 'T', color: '#10b981', label: 'Text' },
  rect:      { icon: '▬', color: '#94a3b8', label: 'Rectangle' },
} as const

const FigmaLayerTableRender = () => {
  const [layers, setLayers] = React.useState(FIGMA_LAYERS)
  const [selectedId, setSelectedId] = React.useState<string | null>('l5')

  const toggleVisible = (id: string) => {
    setLayers((prev) => prev.map((l) => l.id === id ? { ...l, visible: !l.visible } : l))
  }

  const toggleLocked = (id: string) => {
    setLayers((prev) => prev.map((l) => l.id === id ? { ...l, locked: !l.locked } : l))
  }

  const layerColumns: ColumnDef<FigmaLayer>[] = [
    {
      accessorKey: 'name',
      header: 'Layer',
      cell: ({ row }) => {
        const layer = row.original
        const cfg = LAYER_TYPE_CFG[layer.type]
        const isSelected = selectedId === layer.id
        return (
          <button
            onClick={() => setSelectedId(layer.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              paddingLeft: `${layer.depth * 16}px`,
              background: 'none', border: 'none', cursor: 'pointer',
              width: '100%', textAlign: 'left',
            }}
          >
            <span style={{ fontSize: 11, color: cfg.color, width: 14, textAlign: 'center', flexShrink: 0 }}>
              {cfg.icon}
            </span>
            <span style={{
              fontSize: 12, fontWeight: isSelected ? 700 : 400,
              color: layer.visible ? (isSelected ? '#6366f1' : '#1e293b') : '#cbd5e1',
              fontStyle: layer.visible ? 'normal' : 'italic',
            }}>
              {layer.name}
            </span>
          </button>
        )
      },
    },
    {
      id: 'size',
      header: 'Size',
      cell: ({ row }) => (
        <span style={{ fontFamily: 'monospace', fontSize: 11, color: '#64748b', whiteSpace: 'nowrap' }}>
          {row.original.width} × {row.original.height}
        </span>
      ),
    },
    {
      id: 'visible',
      header: '',
      cell: ({ row }) => (
        <button
          onClick={() => toggleVisible(row.original.id)}
          title={row.original.visible ? '숨기기' : '표시'}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 13, opacity: row.original.visible ? 1 : 0.4,
          }}
          aria-label={row.original.visible ? '레이어 숨기기' : '레이어 표시'}
        >
          👁
        </button>
      ),
    },
    {
      id: 'locked',
      header: '',
      cell: ({ row }) => (
        <button
          onClick={() => toggleLocked(row.original.id)}
          title={row.original.locked ? '잠금 해제' : '잠금'}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 13, opacity: row.original.locked ? 1 : 0.3,
          }}
          aria-label={row.original.locked ? '레이어 잠금 해제' : '레이어 잠금'}
        >
          🔒
        </button>
      ),
    },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 560 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>Layers</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {Object.entries(LAYER_TYPE_CFG).map(([type, cfg]) => (
            <span key={type} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: '#94a3b8' }}>
              <span style={{ color: cfg.color }}>{cfg.icon}</span>
              {cfg.label}
            </span>
          ))}
        </div>
      </div>
      <DataTable columns={layerColumns as any} data={layers as any} />
      {selectedId && (
        <div style={{
          padding: '10px 14px', borderRadius: 8,
          background: '#f5f3ff', border: '1px solid #c4b5fd',
          fontSize: 12, color: '#4f46e5',
        }}>
          선택됨: <strong>{layers.find((l) => l.id === selectedId)?.name}</strong>
          {' — '}눈 아이콘으로 가시성, 잠금 아이콘으로 잠금을 토글할 수 있습니다.
        </div>
      )}
      <div style={{ fontSize: 11, color: '#94a3b8' }}>
        Figma Plugin UI 패턴 — 레이어 패널: 타입 아이콘 + 깊이 들여쓰기 + 가시성/잠금 제어
      </div>
    </div>
  )
}

export const Figma_레이어_패널: Story = {
  name: 'Figma Plugin UI - 레이어 패널 테이블',
  render: () => <FigmaLayerTableRender />,
}

/* --------------------------------------------------------------------------
   Linear + Figma Plugin UI 벤치마크: 로드맵 마일스톤 테이블
   Linear의 Roadmap 뷰 — 분기별 이니셔티브, 진행률, 상태를 한 눈에 보여주는 패턴
-------------------------------------------------------------------------- */
type Milestone = {
  id: string
  quarter: string
  initiative: string
  owner: string
  completion: number
  status: 'on-track' | 'at-risk' | 'completed' | 'planned'
  features: number
}

const ROADMAP_DATA: Milestone[] = [
  { id: 'm1', quarter: 'Q1 2026', initiative: 'Design Token 시스템 고도화', owner: '김민지', completion: 100, status: 'completed', features: 12 },
  { id: 'm2', quarter: 'Q1 2026', initiative: 'Storybook 8 마이그레이션', owner: '이동욱', completion: 87, status: 'on-track', features: 6 },
  { id: 'm3', quarter: 'Q2 2026', initiative: 'Figma MCP 인테그레이션', owner: '박소연', completion: 42, status: 'at-risk', features: 8 },
  { id: 'm4', quarter: 'Q2 2026', initiative: 'RTL 지원 및 i18n', owner: '최준호', completion: 18, status: 'at-risk', features: 15 },
  { id: 'm5', quarter: 'Q3 2026', initiative: 'React Native 컴포넌트', owner: '정하은', completion: 0, status: 'planned', features: 24 },
  { id: 'm6', quarter: 'Q3 2026', initiative: 'Orbit AI 컴포넌트 생성기', owner: '황태양', completion: 0, status: 'planned', features: 10 },
]

const MILESTONE_STATUS_CFG = {
  'on-track':  { color: '#10b981', label: 'On Track', bg: '#f0fdf4' },
  'at-risk':   { color: '#f59e0b', label: 'At Risk', bg: '#fffbeb' },
  'completed': { color: '#6366f1', label: 'Completed', bg: '#eff6ff' },
  'planned':   { color: '#94a3b8', label: 'Planned', bg: '#f8fafc' },
} as const

const RoadmapTableRender = () => {
  const [quarterFilter, setQuarterFilter] = React.useState<string>('all')
  const quarters = ['all', 'Q1 2026', 'Q2 2026', 'Q3 2026']

  const filtered = quarterFilter === 'all'
    ? ROADMAP_DATA
    : ROADMAP_DATA.filter((m) => m.quarter === quarterFilter)

  const milestoneColumns: ColumnDef<Milestone>[] = [
    {
      accessorKey: 'quarter',
      header: '분기',
      cell: ({ row }) => (
        <span style={{
          fontSize: 11, fontWeight: 700, color: '#6366f1',
          padding: '2px 8px', borderRadius: 4,
          background: '#eff6ff',
        }}>
          {row.original.quarter}
        </span>
      ),
    },
    {
      accessorKey: 'initiative',
      header: '이니셔티브',
      cell: ({ row }) => (
        <span style={{
          fontSize: 13, fontWeight: 600,
          color: row.original.status === 'completed' ? '#94a3b8' : '#1e293b',
          textDecoration: row.original.status === 'completed' ? 'line-through' : 'none',
        }}>
          {row.original.initiative}
        </span>
      ),
    },
    {
      accessorKey: 'owner',
      header: '오너',
      cell: ({ row }) => (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#475569' }}>
          <span style={{
            width: 20, height: 20, borderRadius: '50%',
            background: '#6366f1', color: '#fff',
            fontSize: '8px', fontWeight: 700,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {row.original.owner.charAt(0)}
          </span>
          {row.original.owner}
        </span>
      ),
    },
    {
      accessorKey: 'completion',
      header: '진행률',
      cell: ({ row }) => {
        const pct = row.original.completion
        const color = pct === 100 ? '#10b981' : pct >= 50 ? '#6366f1' : '#f59e0b'
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 120 }}>
            <div style={{ flex: 1, height: 4, borderRadius: 4, background: '#f1f5f9', overflow: 'hidden' }}>
              <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 4, transition: 'width 0.3s ease' }} />
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color, minWidth: 28, textAlign: 'right' }}>
              {pct}%
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: 'status',
      header: '상태',
      cell: ({ row }) => {
        const cfg = MILESTONE_STATUS_CFG[row.original.status]
        return (
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            padding: '3px 8px', borderRadius: 20, fontSize: 11, fontWeight: 700,
            color: cfg.color, background: cfg.bg, whiteSpace: 'nowrap',
          }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: cfg.color }} />
            {cfg.label}
          </span>
        )
      },
    },
    {
      accessorKey: 'features',
      header: 'Features',
      cell: ({ row }) => (
        <span style={{ fontSize: 12, fontWeight: 600, color: '#64748b' }}>
          {row.original.features}개
        </span>
      ),
    },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 800 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>Roadmap</div>
          <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>orbit-ui — 2026 계획</div>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {quarters.map((q) => (
            <button
              key={q}
              onClick={() => setQuarterFilter(q)}
              style={{
                padding: '4px 10px', borderRadius: 6,
                border: `1px solid ${quarterFilter === q ? '#6366f1' : '#e2e8f0'}`,
                background: quarterFilter === q ? '#6366f112' : '#fff',
                color: quarterFilter === q ? '#6366f1' : '#64748b',
                fontSize: 11, fontWeight: quarterFilter === q ? 700 : 400, cursor: 'pointer',
              }}
            >
              {q === 'all' ? 'All' : q}
            </button>
          ))}
        </div>
      </div>
      <DataTable columns={milestoneColumns as any} data={filtered as any} enableSorting={true} />
      <div style={{ fontSize: 11, color: '#94a3b8' }}>
        Linear Roadmap + Figma Plugin UI 패턴 — 분기별 이니셔티브 진행률 테이블
      </div>
    </div>
  )
}

export const Linear_Figma_로드맵_마일스톤: Story = {
  name: 'Linear + Figma Plugin UI - 로드맵 마일스톤 테이블',
  render: () => <RoadmapTableRender />,
}

// ============================================================
// Cycle 135 — shadcn/ui + Ant Design 벤치마크 반영
// ============================================================

// shadcn/ui 스타일 — 사용자 관리 테이블 (역할 필터 + 검색)
type OrgMember = { id: string; name: string; email: string; role: 'admin' | 'editor' | 'viewer'; status: 'active' | 'inactive'; joined: string }

const ORG_MEMBERS: OrgMember[] = [
  { id: 'm1', name: '김희준', email: 'hj@orbit.dev', role: 'admin', status: 'active', joined: '2024-01' },
  { id: 'm2', name: '박지수', email: 'js@orbit.dev', role: 'editor', status: 'active', joined: '2024-03' },
  { id: 'm3', name: '이민준', email: 'mj@orbit.dev', role: 'viewer', status: 'active', joined: '2024-06' },
  { id: 'm4', name: '최수현', email: 'sh@orbit.dev', role: 'editor', status: 'inactive', joined: '2024-08' },
  { id: 'm5', name: '정우진', email: 'wj@orbit.dev', role: 'admin', status: 'active', joined: '2025-01' },
  { id: 'm6', name: '한소희', email: 'so@orbit.dev', role: 'viewer', status: 'inactive', joined: '2025-03' },
]

const ROLE_BADGE: Record<OrgMember['role'], { label: string; color: string; bg: string }> = {
  admin: { label: '관리자', color: '#7c3aed', bg: '#ede9fe' },
  editor: { label: '편집자', color: '#0369a1', bg: '#e0f2fe' },
  viewer: { label: '뷰어', color: '#374151', bg: '#f3f4f6' },
}

function ShadcnOrgMemberTableRender() {
  const [search, setSearch] = useDataTableState('')
  const [roleFilter, setRoleFilter] = useDataTableState<OrgMember['role'] | 'all'>('all')
  const filtered = ORG_MEMBERS.filter((m) =>
    (roleFilter === 'all' || m.role === roleFilter) &&
    (m.name.includes(search) || m.email.includes(search))
  )
  const memberColumns: ColumnDef<OrgMember>[] = [
    {
      accessorKey: 'name',
      header: '이름',
      cell: ({ row }) => (
        <div>
          <div style={{ fontWeight: 600, fontSize: 13, color: '#0f172a' }}>{row.original.name}</div>
          <div style={{ fontSize: 11, color: '#94a3b8' }}>{row.original.email}</div>
        </div>
      ),
    },
    {
      accessorKey: 'role',
      header: '역할',
      cell: ({ row }) => {
        const { label, color, bg } = ROLE_BADGE[row.original.role]
        return (
          <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 99, background: bg, color }}>
            {label}
          </span>
        )
      },
    },
    {
      accessorKey: 'status',
      header: '상태',
      cell: ({ row }) => (
        <span style={{ fontSize: 11, fontWeight: 500, padding: '2px 8px', borderRadius: 99, background: row.original.status === 'active' ? '#dcfce7' : '#f1f5f9', color: row.original.status === 'active' ? '#16a34a' : '#64748b' }}>
          {row.original.status === 'active' ? '활성' : '비활성'}
        </span>
      ),
    },
    { accessorKey: 'joined', header: '가입일', enableSorting: true },
  ]
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', width: 560 }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12, alignItems: 'center' }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="이름 또는 이메일 검색..."
          style={{ flex: 1, padding: '7px 12px', fontSize: 13, borderRadius: 7, border: '1px solid #e2e8f0', outline: 'none' }}
        />
        <div style={{ display: 'flex', gap: 4 }}>
          {(['all', 'admin', 'editor', 'viewer'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              style={{ padding: '6px 10px', fontSize: 11, fontWeight: roleFilter === r ? 700 : 400, borderRadius: 6, border: '1px solid #e2e8f0', background: roleFilter === r ? '#0f172a' : '#fff', color: roleFilter === r ? '#fff' : '#64748b', cursor: 'pointer' }}
            >
              {r === 'all' ? '전체' : ROLE_BADGE[r].label}
            </button>
          ))}
        </div>
      </div>
      <DataTable columns={memberColumns as ColumnDef<OrgMember>[]} data={filtered} enableSorting={true} />
      <div style={{ marginTop: 8, fontSize: 11, color: '#94a3b8' }}>{filtered.length} / {ORG_MEMBERS.length}명</div>
    </div>
  )
}

export const Shadcn_조직_멤버_관리_테이블: Story = {
  name: 'shadcn/ui - 조직 멤버 관리 테이블',
  parameters: {
    docs: {
      description: {
        story:
          'shadcn/ui DataTable 패턴. 검색 + 역할 필터 + 상태 배지 + 가입일 정렬. ' +
          '이름/이메일 복합 셀, 역할별 색상 배지 인라인 렌더링.',
      },
    },
  },
  render: () => <ShadcnOrgMemberTableRender />,
}

// Ant Design 스타일 — API 로그 테이블 (시간순 정렬 + 상태 코드 색상)
type ApiLog = { id: string; method: 'GET' | 'POST' | 'PUT' | 'DELETE'; path: string; status: number; latency: number; time: string }

const API_LOGS: ApiLog[] = [
  { id: 'l1', method: 'GET', path: '/api/users', status: 200, latency: 42, time: '14:32:01' },
  { id: 'l2', method: 'POST', path: '/api/deploy', status: 201, latency: 128, time: '14:32:15' },
  { id: 'l3', method: 'GET', path: '/api/settings', status: 200, latency: 31, time: '14:32:33' },
  { id: 'l4', method: 'DELETE', path: '/api/token/abc', status: 204, latency: 19, time: '14:32:48' },
  { id: 'l5', method: 'PUT', path: '/api/users/1', status: 500, latency: 1240, time: '14:33:02' },
  { id: 'l6', method: 'GET', path: '/api/metrics', status: 403, latency: 8, time: '14:33:21' },
  { id: 'l7', method: 'POST', path: '/api/webhook', status: 200, latency: 67, time: '14:33:44' },
]

const METHOD_COLOR: Record<ApiLog['method'], string> = {
  GET: '#22c55e', POST: '#3b82f6', PUT: '#f59e0b', DELETE: '#ef4444',
}

const statusBg = (s: number) => s < 300 ? '#dcfce7' : s < 400 ? '#fef9c3' : s < 500 ? '#fee2e2' : '#fce7f3'
const statusFg = (s: number) => s < 300 ? '#16a34a' : s < 400 ? '#92400e' : s < 500 ? '#991b1b' : '#9d174d'

export const Ant_API_로그_테이블: Story = {
  name: 'Ant Design - API 로그 테이블',
  parameters: {
    docs: {
      description: {
        story:
          'Ant Design Table 패턴. HTTP 메서드 색상 태그, 상태 코드 배지(2xx/4xx/5xx), ' +
          '응답 시간 컬럼(1000ms 이상 빨간색 강조), 시간 역순 정렬.',
      },
    },
  },
  render: () => (
    <div style={{ fontFamily: 'system-ui, sans-serif', width: 580 }}>
      <div style={{ marginBottom: 8, fontSize: 13, fontWeight: 700, color: '#0f172a' }}>API 요청 로그</div>
      <DataTable
        columns={[
          {
            accessorKey: 'method',
            header: 'Method',
            cell: ({ row }) => (
              <span style={{ fontSize: 11, fontWeight: 700, fontFamily: 'monospace', color: METHOD_COLOR[row.original.method as ApiLog['method']] }}>
                {row.original.method}
              </span>
            ),
          },
          {
            accessorKey: 'path',
            header: 'Path',
            cell: ({ row }) => (
              <span style={{ fontSize: 12, fontFamily: 'monospace', color: '#0f172a' }}>{row.original.path}</span>
            ),
          },
          {
            accessorKey: 'status',
            header: 'Status',
            enableSorting: true,
            cell: ({ row }) => (
              <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 7px', borderRadius: 4, background: statusBg(row.original.status as number), color: statusFg(row.original.status as number), fontFamily: 'monospace' }}>
                {row.original.status}
              </span>
            ),
          },
          {
            accessorKey: 'latency',
            header: 'Latency',
            enableSorting: true,
            cell: ({ row }) => (
              <span style={{ fontSize: 12, fontFamily: 'monospace', color: (row.original.latency as number) > 1000 ? '#ef4444' : '#0f172a', fontWeight: (row.original.latency as number) > 1000 ? 700 : 400 }}>
                {row.original.latency}ms
              </span>
            ),
          },
          { accessorKey: 'time', header: '시간', enableSorting: true },
        ] as ColumnDef<ApiLog>[]}
        data={API_LOGS}
        enableSorting={true}
      />
    </div>
  ),
}

// shadcn/ui + Ant — 재무 보고서 테이블 (계층형 소계 + 컬럼 하이라이트)
type FinanceRow = { dept: string; q1: number; q2: number; q3: number; q4: number; total: number; change: number }

const FINANCE_ROWS: FinanceRow[] = [
  { dept: '엔지니어링', q1: 420, q2: 480, q3: 510, q4: 540, total: 1950, change: 12.4 },
  { dept: '디자인', q1: 180, q2: 190, q3: 210, q4: 220, total: 800, change: 8.2 },
  { dept: '마케팅', q1: 250, q2: 290, q3: 310, q4: 280, total: 1130, change: 6.7 },
  { dept: '운영', q1: 120, q2: 130, q3: 125, q4: 140, total: 515, change: -2.1 },
  { dept: '합계', q1: 970, q2: 1090, q3: 1155, q4: 1180, total: 4395, change: 9.8 },
]

export const Shadcn_Ant_재무_보고서_테이블: Story = {
  name: 'shadcn/ui + Ant Design - 재무 보고서 테이블',
  parameters: {
    docs: {
      description: {
        story:
          'shadcn/ui + Ant Design Table 결합 패턴. 부서별 분기 실적, 합계 행 강조, ' +
          'YoY 변화율 컬럼(양수/음수 색상 구분), 전체 총계 행 굵은 폰트.',
      },
    },
  },
  render: () => (
    <div style={{ fontFamily: 'system-ui, sans-serif', width: 540 }}>
      <div style={{ marginBottom: 8, fontSize: 13, fontWeight: 700, color: '#0f172a' }}>2025 부서별 예산 집행 (단위: 백만원)</div>
      <DataTable
        columns={[
          {
            accessorKey: 'dept',
            header: '부서',
            cell: ({ row }) => (
              <span style={{ fontWeight: row.original.dept === '합계' ? 800 : 500, color: '#0f172a', fontSize: 13 }}>
                {row.original.dept}
              </span>
            ),
          },
          ...(['q1', 'q2', 'q3', 'q4'] as const).map((q) => ({
            accessorKey: q,
            header: q.toUpperCase(),
            cell: ({ row }: any) => (
              <span style={{ fontWeight: row.original.dept === '합계' ? 700 : 400, fontSize: 12, fontFamily: 'monospace' }}>
                {row.original[q].toLocaleString()}
              </span>
            ),
          })),
          {
            accessorKey: 'total',
            header: '연간 합계',
            enableSorting: true,
            cell: ({ row }) => (
              <span style={{ fontWeight: 700, fontSize: 13, fontFamily: 'monospace', color: row.original.dept === '합계' ? '#6366f1' : '#0f172a' }}>
                {row.original.total.toLocaleString()}
              </span>
            ),
          },
          {
            accessorKey: 'change',
            header: 'YoY',
            enableSorting: true,
            cell: ({ row }) => (
              <span style={{ fontSize: 12, fontWeight: 600, color: row.original.change >= 0 ? '#22c55e' : '#ef4444' }}>
                {row.original.change >= 0 ? '+' : ''}{row.original.change}%
              </span>
            ),
          },
        ] as ColumnDef<FinanceRow>[]}
        data={FINANCE_ROWS}
        enableSorting={true}
      />
    </div>
  ),
}
