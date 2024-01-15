import {
  IconArrowBadgeDownFilled,
  IconArrowBadgeUpFilled,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";
import { ColumnDef, getCoreRowModel } from "@tanstack/react-table";
import {
  Fragment,
  HTMLProps,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import DropDownCustom from "../../components/dropdown";
import Modal from "../../components/modal";
import Pagination from "../../components/pagination";
import Table from "../../components/table";
import { toggleState } from "../../redux/reducer/vocab";
import { RootState } from "../../redux/store";
import { useGetAllVocab } from "../../services/vocab/useGetAllVocab";
import FormVocab from "./components/form";

export type TExamples = {
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
  const [idModal] = useState("general-vocab");
  const [isEditing, setIsEditing] = useState(false);
  const [rowSelection, setRowSelection] = useState({});
  const refDiv = useRef<HTMLDivElement>(null);

  const columns = useMemo<ColumnDef<TVocab>[]>(
    () => [
      {
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
        accessorKey: "textSource",
        header: "textSource",
        cell: ({ getValue }) => (
          <div
            className="w-full cursor-pointer"
            onClick={() => {
              if (!refDiv.current) return;
              refDiv.current.click();
            }}
          >
            <div className="break-all badge bg-emerald-500 gap-2 text-white">
              {getValue() as ReactNode}
            </div>
          </div>
        ),
      },
      {
        accessorKey: "textTarget",
        header: "textTarget",
        cell: ({ row }) => (
          <div
            ref={refDiv}
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
                    <div className="badge bg-sky-500 gap-2 text-white">
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
            <label
              htmlFor={idModal}
              className="btn btn-square btn-xs btn-outline border-white bg-white"
              onClick={() => setIsEditing(true)}
            >
              <IconEdit />
            </label>

            <DropDownCustom
              classNameSummary="m-1 btn btn-outline hover:border-white hover:bg-white border-white rounded-full"
              head={
                <IconTrash className="btn btn-square btn-xs btn-outline border-white bg-white" />
              }
              list={
                <div className="flex justify-center items-center shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-fit">
                  <div className="text-xs whitespace-nowrap">
                    Do you want to delete?
                  </div>
                  <div className="flex justify-center items-center">
                    <button className="btn btn-square btn-xs btn-outline border-white bg-white ">
                      Yes
                    </button>
                    <button className="btn btn-square btn-xs btn-outline border-white bg-white ">
                      No
                    </button>
                  </div>
                </div>
              }
            />
          </div>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [idsState]
  );

  return (
    <div className="container mx-auto -mt-20 bg-white rounded-md p-5 shadow-md mb-10">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium">Vocabulary list</h4>
          <p className="text-sm mb-6">
            Let your second world be opened up thanks to the vocabulary list
            below. <br />
            Let's run, don't hesitate!
          </p>
        </div>
        <div>
          <label
            htmlFor={idModal}
            className="btn"
            onClick={() => setIsEditing(false)}
          >
            Create
          </label>

          <Modal
            idModal={idModal}
            children={<FormVocab isEditing={isEditing} idModal={idModal} />}
          />
        </div>
      </div>

      <Table
        data={data ?? []}
        options={{
          data,
          columns: columns,
          getCoreRowModel: getCoreRowModel(),
          state: {
            rowSelection,
          },
          onRowSelectionChange: setRowSelection,
        }}
      />
      <Pagination />
    </div>
  );
};

function IndeterminateCheckbox({
  indeterminate,
  className = "",
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, indeterminate]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + " cursor-pointer"}
      {...rest}
    />
  );
}

export default Vocab;
