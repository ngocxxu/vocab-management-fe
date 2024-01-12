import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Fragment, ReactNode, memo, useMemo } from "react";
import { TTextTarget } from "../../pages/vocab";
import CollapseVocab from "../../pages/vocab/components/collapse";

type TTable<T extends TExtend> = {
  data: T[];
  columns: ColumnDef<T>[];
};

export type TExtend = {
  _id: string;
  textTarget: TTextTarget[];
};

const DataTable = <T extends TExtend>({ data, columns }: TTable<T>) => {
  const memoColumn = useMemo<ColumnDef<T>[]>(() => columns, [columns]);

  const table = useReactTable({
    data,
    columns: memoColumn,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  if (data.length <= 0) {
    return (
      <div className="h-36 flex justify-center items-center">
        <div className="loading loading-infinity loading-lg"></div>
      </div>
    );
  }

  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th scope="col" className="px-6 py-3" key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <Fragment key={row.id}>
            <tr className="bg-white border-b">
              {row.getVisibleCells().map((cell) => (
                <td className="px-6 py-4" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
            <CollapseVocab row={row} />
          </Fragment>
        ))}
      </tbody>
    </table>
  );
};

const Table = memo(DataTable) as <T extends TExtend>(
  props: TTable<T>
) => ReactNode;

export default Table;
