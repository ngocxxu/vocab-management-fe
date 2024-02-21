import { AlertDialog } from "@/components/alertDialog";
import Button from "@/components/button";
import HeaderTable from "@/components/headerTable";
import Table from "@/components/table";
import {
  IconCircleFilled,
  IconEye,
  IconTextGrammar,
  IconTrash,
} from "@tabler/icons-react";
import {
  ColumnDef,
  SortingState,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import { IndeterminateCheckbox } from "../vocab/components/checkbox";
import { ToolBar } from "./components/toolBar";
import { TVocabTrainer } from "./types";
import { useLocation, useSearchParams } from "react-router-dom";
import {
  LIMIT_PAGE_10,
  ROUTER_VOCAB_TRAINER,
  colorData,
} from "@/utils/constants";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useGetAllVocabTrainer } from "@/services/vocabTrainer/useGetAllVocabTrainer";
import { convertOrderBy } from "@/utils";
import { format } from "date-fns";
import { Badge } from "@/components/badge";

// const data = [
//   {
//     _id: "1",
//     nameTest: "test1",
//     statusTest: "Passed",
//     duration: "20:35",
//     updatedAt: "23/12/2018",
//     countTime: 1,
//     wordResults: [
//       {
//         numberQuestion: 1,
//         userSelect: "text1",
//         systemSelect: "text2",
//       },
//       {
//         numberQuestion: 2,
//         userSelect: "text3",
//         systemSelect: "text3",
//       },
//     ],
//   },
// ];

const VocabTrainer = () => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isDeleteMulti, setIsDeleteMulti] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const counts = Object.keys(rowSelection).length;
  const { data, isLoading } = useGetAllVocabTrainer({
    page: searchParams.get("page") ?? "1",
    limit: searchParams.get("limit") ?? "10",
    sortBy: sorting[0]?.id ?? undefined,
    orderBy: convertOrderBy(sorting),
    // subjectFilter: filterData.subject?.map((item) => item.value),
    // search: searchVocab || undefined,
  });
  const { isOpenModalState } = useSelector(
    (state: RootState) => state.vocabTrainerReducer
  );
  const isURLVocabTrainer =
    pathname === ROUTER_VOCAB_TRAINER && isOpenModalState;

  const handleOnYes = (id?: string) => {
    console.log(id);

    if (isDeleteMulti) {
      // Loop find value === true and return [ids]
      // const mappedIds: string[] = Object.entries(rowSelection).map(
      //   ([key, value]) => {
      //     return value ? key : '';
      //   }
      // );
      setRowSelection({});
      // return mutateDeleteMulti(mappedIds);
    }
    // return mutate(id ?? '');
  };

  const columns = useMemo<ColumnDef<TVocabTrainer>[]>(
    () => [
      {
        size: 0,
        enableSorting: false,
        id: "select",
        header: ({ table }) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        ),
      },
      {
        accessorKey: "nameTest",
        header: "Name",
      },
      {
        accessorKey: "statusTest",
        header: "Status",
        cell: ({ getValue }) => {
          const findColor = colorData.find(
            (item) => item.status === getValue()
          );
          return (
            <Badge
              style={{
                backgroundColor: findColor?.background,
                color: findColor?.text,
              }}
            >
              <div className="flex items-center gap-2">
                <IconCircleFilled
                  style={{ color: findColor?.dot }}
                  size="0.5rem"
                />
                <div> {String(getValue())}</div>
              </div>
            </Badge>
          );
        },
      },
      {
        accessorKey: "duration",
        header: "Duration",
        cell: ({ getValue }) => (getValue() ? getValue() : "00:00") + "s",
      },
      {
        accessorKey: "countTime",
        header: "Count",
      },
      {
        accessorKey: "updatedAt",
        header: "Updated Date",
        cell: ({ getValue }) =>
          format(new Date(String(getValue())), "dd/MM/yyyy"),
      },
      {
        enableSorting: false,
        id: "action",
        cell: () => (
          <div className="flex gap-3 items-center w-0">
            <Button
              className="h-6 w-6"
              size="icon"
              variant="ghost"
              leftIcon={
                <IconEye className="text-gray-400 hover:text-gray-500" />
              }
            />
            <Button
              className="h-6 w-6"
              size="icon"
              variant="ghost"
              leftIcon={
                <IconTextGrammar className="text-gray-400 hover:text-gray-500" />
              }
            />
            <AlertDialog
              head={
                <Button
                  className="h-6 w-6"
                  size="icon"
                  variant="ghost"
                  leftIcon={
                    <IconTrash className="text-gray-400 hover:text-gray-500" />
                  }
                />
              }
              title="Do you want to delete?"
            />
          </div>
        ),
      },
    ],
    []
  );

  useEffect(() => {
    if (isURLVocabTrainer) return;
    return setSearchParams({
      page: searchParams.get("page") ?? "1",
      limit: LIMIT_PAGE_10,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <HeaderTable
      headText="Vocab Trainer"
      bodyText={
        "These are the results of your tests but it is not final, you can do more."
      }
    >
      <Table
        components={{
          toolbar: (
            <div
              className={clsx(
                "flex justify-end items-center mb-2",
                counts > 0 && "justify-between"
              )}
            >
              {counts > 0 && (
                <div className="text-xs">{counts} row(s) selected</div>
              )}
              <div className="flex justify-center items-center gap-1">
                {counts > 0 && (
                  <AlertDialog
                    head={
                      <Button
                        onClick={() => setIsDeleteMulti(true)}
                        variant="ghost"
                        title={`Delete (${counts})`}
                        leftIcon={<IconTrash className="mr-2 text-customRed" />}
                      />
                    }
                    title="Do you want to delete these?"
                    onYes={handleOnYes}
                  />
                )}
                <ToolBar
                  rowSelection={rowSelection}
                  setRowSelection={setRowSelection}
                  openModal={openModal}
                  setOpenModal={setOpenModal}
                  idVocabTrainer={""}
                  // mutatePost={mutatePost}
                  // mutatePut={mutatePut}
                />
              </div>
            </div>
          ),
        }}
        isLoading={isLoading}
        isPagination
        paginations={{
          currentPage: 1,
          totalItems: 1,
          totalPages: 1,
        }}
        options={{
          // Chua phan trang ben BE
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data: (data as any) ?? [],
          columns: columns,
          state: {
            rowSelection,
            sorting,
          },
          getSortedRowModel: getSortedRowModel(),
          getCoreRowModel: getCoreRowModel(),
          onRowSelectionChange: setRowSelection,
          getRowId: (row) => row._id,
          onSortingChange: setSorting,
        }}
      />
    </HeaderTable>
  );
};

export default VocabTrainer;
