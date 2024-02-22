import { RootState } from "@/redux/store";
import { ColumnDef, getCoreRowModel } from "@tanstack/react-table";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { TWordResults } from "../../types";
import Table from "@/components/table";
import { colorData } from "@/utils/constants";
import { Badge } from "@/components/badge";
import { IconCircleFilled } from "@tabler/icons-react";

export const DetailTable = () => {
  const { itemVocabTrainer } = useSelector(
    (state: RootState) => state.vocabTrainerReducer
  );

  const columns = useMemo<ColumnDef<TWordResults>[]>(
    () => [
      {
        id: "numberColumn",
        cell: ({ row }) => row.index + 1,
        size: 0,
      },
      {
        accessorKey: "userSelect",
        header: "Your Answer",
        size: 300,
        enableSorting: false,
      },
      {
        accessorKey: "systemSelect",
        header: "Correct Answer",
        size: 300,
        enableSorting: false,
      },
      {
        accessorKey: "status",
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
        enableSorting: false,
      },
    ],
    []
  );

  return (
    <Table
      options={{
        data: itemVocabTrainer.wordResults,
        columns,
        getCoreRowModel: getCoreRowModel(),
      }}
    />
  );
};
