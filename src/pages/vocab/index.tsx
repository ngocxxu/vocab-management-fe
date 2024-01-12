import {
  IconArrowBadgeDownFilled,
  IconArrowBadgeUpFilled,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import { Fragment, ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/table";
import { toggleState } from "../../redux/reducer/vocab";
import { RootState } from "../../redux/store";
import { useGetAllVocab } from "../../services/vocab/useGetAllVocab";

type TExamples = {
  source: string;
  target: string;
};

export type TTextTarget = {
  text: string;
  wordType: string;
  explanationSource: string;
  explanationTarget: string;
  examples: TExamples[];
  grammar: string;
  subject: string[];
};

type TVocab = {
  _id: string;
  sourceLanguage: string;
  targetLanguage: string;
  textSource: string;
  textTarget: TTextTarget[];
};

const Vocab = () => {
  const dispatch = useDispatch();
  const { idsState } = useSelector((state: RootState) => state.vocabReducer);
  const { data } = useGetAllVocab();

  const columns: ColumnDef<TVocab>[] = [
    {
      accessorKey: "textSource",
      header: "textSource",
      cell: ({ getValue }) => (
        <div className="break-all badge badge-success gap-2 text-white">
          {getValue() as ReactNode}
        </div>
      ),
    },
    {
      accessorKey: "textTarget",
      header: "textTarget",
      cell: ({ row }) => (
        <div
          className="break-all cursor-pointer flex justify-between items-center"
          onClick={() =>
            dispatch(
              toggleState({
                id: row.original._id,
              })
            )
          }
        >
          <div>
            {row.original.textTarget.map((item) => {
              return (
                <Fragment key={item.text}>
                  <div className="badge badge-info gap-2 text-white">
                    {item.text}
                  </div>{" "}
                </Fragment>
              );
            })}
          </div>

          {idsState.includes(row.original._id) ? (
            <IconArrowBadgeUpFilled />
          ) : (
            <IconArrowBadgeDownFilled />
          )}
        </div>
      ),
    },
    {
      id: "action",
      cell: () => (
        <div className="flex gap-3 items-center w-0">
          <button className="btn btn-square btn-xs btn-outline border-white bg-white ">
            <IconEdit />
          </button>
          <button className="btn btn-square btn-xs btn-outline border-white bg-white ">
            <IconTrash />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto -mt-20 bg-white rounded-md p-5 shadow-md mb-10">
      <h4 className="font-medium">Datatable</h4>
      <p className="text-sm mb-6">
        Table Edits is a lightweight 해서 plugin for making table rows editable.
      </p>
      <Table data={data ?? []} columns={columns} />
      <div className="join mt-6 flex justify-end">
        <button className="join-item btn btn-sm">«</button>
        <button className="join-item btn btn-sm">‹</button>
        <button className="join-item btn btn-sm bg-gray-700 text-white">
          1
        </button>
        <button className="join-item btn btn-sm">2</button>
        <button className="join-item btn btn-sm">3</button>
        <button className="join-item btn btn-sm">4</button>
        <button className="join-item btn btn-sm">5</button>
        <button className="join-item btn btn-sm btn-disabled">...</button>
        <button className="join-item btn btn-sm">100</button>
        <button className="join-item btn btn-sm">›</button>
        <button className="join-item btn btn-sm">»</button>
      </div>
    </div>
  );
};

export default Vocab;
