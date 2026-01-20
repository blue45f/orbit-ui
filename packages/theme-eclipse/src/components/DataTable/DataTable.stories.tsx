import 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ColumnDef } from '@tanstack/react-table'

import { DataTable } from './DataTable'
import { LabelBadge as Badge } from '../LabelBadge'

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
  {
    id: 'm5gr84i9',
    amount: 316,
    status: 'success',
    email: 'ken99@yahoo.com',
  },
  {
    id: '3u1reuv4',
    amount: 242,
    status: 'success',
    email: 'Abe45@gmail.com',
  },
  {
    id: 'derv1ws0',
    amount: 837,
    status: 'processing',
    email: 'Monserrat44@gmail.com',
  },
  {
    id: '5kma53ae',
    amount: 874,
    status: 'success',
    email: 'Silas22@gmail.com',
  },
  {
    id: 'bhqecj4p',
    amount: 721,
    status: 'failed',
    email: 'carmella@hotmail.com',
  },
]

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'status',
    header: '상태',
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      return (
        <Badge color={status === 'success' ? 'benefit' : 'gray'}>
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
  },
  render: (args) => <DataTable {...args} />,
}
