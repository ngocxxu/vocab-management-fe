import { Badge } from '@/components/badge'
import Table from '@/components/table'
import { colorData } from '@/utils/constants'
import { ColumnDef, getCoreRowModel } from '@tanstack/react-table'
import { useMemo } from 'react'
import { TWordResults } from '../../types'

type TDetailTable = { data: TWordResults[] }

export const DetailTable = ({ data }: TDetailTable) => {
  const columns = useMemo<ColumnDef<TWordResults>[]>(
    () => [
      { id: 'numberColumn', cell: ({ row }) => row.index + 1, size: 0 },
      {
        accessorKey: 'systemSelected',
        header: 'Correct Answer',
        size: 300,
        enableSorting: false
      },
      {
        accessorKey: 'userSelected',
        header: 'Your Answer',
        size: 300,
        enableSorting: false
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }) => {
          const findColor = colorData.find((item) => item.status === getValue())
          return (
            <Badge
              className="w-[4rem]"
              style={{
                backgroundColor: findColor?.background,
                color: findColor?.text
              }}
            >
              {String(getValue())}
            </Badge>
          )
        },
        enableSorting: false
      }
    ],
    []
  )

  return (
    <Table options={{ data, columns, getCoreRowModel: getCoreRowModel() }} />
  )
}
