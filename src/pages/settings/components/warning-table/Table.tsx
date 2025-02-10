import { Badge } from '@/components/badge'
import Table from '@/components/table'
import { TVocab } from '@/pages/vocab/types'
import { ColumnDef, getCoreRowModel } from '@tanstack/react-table'
import { Fragment, useMemo } from 'react'

type TTable = {
  data: TVocab[]
}

export const DetailTable = ({ data }: TTable) => {
  const columns = useMemo<ColumnDef<TVocab>[]>(
    () => [
      {
        id: 'numberColumn',
        cell: ({ row }) => row.index + 1,
        size: 0
      },
      {
        size: 1000,
        accessorKey: 'textSource',
        header: 'Text source',
        cell: ({ getValue }) => (
          <button className="w-full cursor-pointer">
            <p className="font-semibold">{String(getValue())}</p>
          </button>
        )
      },
      {
        size: 1000,
        accessorKey: 'textTarget',
        header: 'Text target',
        cell: ({ row }) => (
          <div className="flex cursor-pointer items-center justify-between break-all">
            <div className="flex gap-1">
              {row.original.textTarget.map((item) => {
                return (
                  <Fragment key={item.text}>
                    <Badge variant="outline" className="text-gray-vc-600">
                      {item.text}
                    </Badge>
                  </Fragment>
                )
              })}
            </div>
          </div>
        )
      }
    ],
    []
  )

  return (
    <Table
      options={{
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
      }}
    />
  )
}
