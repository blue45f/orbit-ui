import type { Meta, StoryObj } from '@storybook/react'
import type { ColumnDef } from '@tanstack/react-table'

import { DataTable } from './DataTable'

type User = {
  id: number
  name: string
  email: string
  role: string
}

const data: User[] = [
  { id: 1, name: '김하준', email: 'hajun@example.com', role: '관리자' },
  { id: 2, name: '이서연', email: 'seoyeon@example.com', role: '편집자' },
  { id: 3, name: '박지호', email: 'jiho@example.com', role: '뷰어' },
  { id: 4, name: '최유진', email: 'yujin@example.com', role: '편집자' },
]

const columns: ColumnDef<User, unknown>[] = [
  { id: 'name', accessorKey: 'name', header: '이름', enableSorting: true },
  { id: 'email', accessorKey: 'email', header: '이메일', enableSorting: false },
  { id: 'role', accessorKey: 'role', header: '역할', enableSorting: true },
]

// DataTable 은 제네릭 함수 컴포넌트라 User 로 고정한 별칭으로 메타를 구성한다.
const UserTable = (props: React.ComponentProps<typeof DataTable<User, unknown>>) => (
  <DataTable {...props} />
)

const meta = {
  title: 'core/Data Display/DataTable',
  component: UserTable,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof UserTable>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    columns,
    data,
    enableSorting: true,
    'aria-label': '사용자 목록',
  },
}

export const Loading: Story = {
  args: {
    columns,
    data: [],
    loading: true,
    skeletonCount: 4,
    'aria-label': '사용자 목록 로딩 중',
  },
}

export const Empty: Story = {
  args: {
    columns,
    data: [],
    emptyMessage: '표시할 사용자가 없습니다.',
    'aria-label': '빈 사용자 목록',
  },
}

export const WithPagination: Story = {
  args: {
    columns,
    data,
    enablePagination: true,
    pageSize: 2,
    'aria-label': '페이지네이션 사용자 목록',
  },
}
