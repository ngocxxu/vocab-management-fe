import {
  TableOptions,
  flexRender,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import { Fragment, ReactNode, memo } from "react";
import { TTextTarget } from "../../pages/vocab";
import CollapseVocab from "../../pages/vocab/components/collapse";
import { TPagination } from "../../utils/types";
import Pagination from "../pagination";
import Button from "../button";

type TTable<T extends TExtend> = {
  data: T[];
  options: TableOptions<T>;
  isLoading: boolean;
  isCollapse?: boolean;
  isPagination?: boolean;
  paginations?: TPagination;
  isMultiSelect?: boolean;
  onConfirmMultiDelete?: () => void;
};

export type TExtend = {
  _id: string;
  textTarget: TTextTarget[];
  sourceLanguage: string;
  targetLanguage: string;
};

const DataTable = <T extends TExtend>({
  data,
  options,
  isLoading,
  isPagination = false,
  isCollapse = false,
  isMultiSelect = false,
  paginations,
  onConfirmMultiDelete,
}: TTable<T>) => {
  const table = useReactTable({
    getFilteredRowModel: getFilteredRowModel(),
    enableRowSelection: true,
    ...options,
  });
  const counts = Object.keys(table.getState().rowSelection).length;

  if (isLoading) {
    return (
      <div className="h-[400px] flex justify-center items-center">
        <div className="loading loading-infinity loading-lg" />
      </div>
    );
  }

  if (data.length <= 0) {
    return (
      <div className="flex justify-center items-center">No data found</div>
    );
  }

  return (
    <>
      {isMultiSelect &&
        Object.keys(table.getState().rowSelection).length > 0 && (
          <div className="flex justify-between items-center mb-2">
            <div className="text-xs">{counts} row(s) selected</div>
            <Button
              className="btn btn-error btn-xs text-white"
              onClick={onConfirmMultiDelete}
            >
              Delete ({counts})
            </Button>
          </div>
        )}
      <table className="table text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, idx) => (
                <th
                  scope="col"
                  className={clsx(
                    "px-6 py-3",
                    isMultiSelect && idx === 0 && "w-2"
                  )}
                  key={header.id}
                >
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
                  <td className="px-6 py-3" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
              {isCollapse && <CollapseVocab row={row} />}
            </Fragment>
          ))}
        </tbody>
      </table>
      {isPagination && <Pagination paginations={paginations!} />}
    </>
  );
};

const Table = memo(DataTable) as <T extends TExtend>(
  props: TTable<T>
) => ReactNode;

export default Table;
