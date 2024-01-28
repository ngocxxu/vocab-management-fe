import { AlertDialog } from "@/components/alertDialog";
import Input from "@/components/input";
import { Popover } from "@/components/popover";
import {
  IconArrowBadgeDownFilled,
  IconArrowBadgeUpFilled,
  IconEdit,
  IconFilter,
  IconSearch,
  IconTrash,
} from "@tabler/icons-react";
import { ColumnDef, getCoreRowModel } from "@tanstack/react-table";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Button from "../../components/button";
import Modal from "../../components/modal";
import Table from "../../components/table";
import Voice from "../../components/voice";
import {
  setIdVocabState,
  setItemVocabState,
  toggleState,
} from "../../redux/reducer/vocab";
import { RootState } from "../../redux/store";
import { useDeleteMultiVocab } from "../../services/vocab/useDeleteMultiVocab";
import { useDeleteVocab } from "../../services/vocab/useDeleteVocab";
import { useGetAllVocab } from "../../services/vocab/useGetAllVocab";
import { usePostVocab } from "../../services/vocab/usePostVocab";
import { usePutVocab } from "../../services/vocab/usePutVocab";
import { LIMIT_PAGE_10 } from "../../utils/constants";
import { TOption } from "../../utils/types";
import { IndeterminateCheckbox } from "./components/checkbox";
import FormVocab from "./components/form";
import { Badge } from "@/components/badge";

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
  subject: TOption[];
};

export type TVocab = {
  _id: string;
  sourceLanguage: string;
  targetLanguage: string;
  textSource: string;
  textTarget: TTextTarget[];
};

const customStyleVocabModal = {
  width: "100%",
  maxWidth: "50vw",
  height: "100%",
  maxHeight: "81vh",
};

const Vocab = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { mutate, isLoading: isLoadingDelete } = useDeleteVocab();
  const { mutate: mutateDeleteMulti, isLoading: isLoadingDeleteMulti } =
    useDeleteMultiVocab();
  const { mutate: mutatePost, isLoading: isLoadingPost } = usePostVocab();
  const { mutate: mutatePut, isLoading: isLoadingPut } = usePutVocab();
  const dispatch = useDispatch();
  const { idsState, idVocabState, itemVocab } = useSelector(
    (state: RootState) => state.vocabReducer
  );
  const [isModal, setIsModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [rowSelection, setRowSelection] = useState({});
  const [isDeleteMulti, setIsDeleteMulti] = useState(false);
  const refDiv = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useGetAllVocab({
    page: searchParams.get("page") ?? "1",
    limit: searchParams.get("limit") ?? "10",
  });

  const handleOnYes = () => {
    if (isDeleteMulti) {
      // Loop find value === true and return [ids]
      const mappedIds: string[] = Object.entries(rowSelection).map(
        ([key, value]) => {
          return value ? key : "";
        }
      );
      setRowSelection({});
      return mutateDeleteMulti(mappedIds);
    }
    return mutate(idVocabState);
  };

  useEffect(() => {
    if (data?.data && data?.data.length <= 0 && data.currentPage > 1) {
      setSearchParams({
        page: String(data.currentPage - 1),
        limit: LIMIT_PAGE_10,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    return setSearchParams({
      page: searchParams.get("page") ?? "1",
      limit: LIMIT_PAGE_10,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = useMemo<ColumnDef<TVocab>[]>(
    () => [
      {
        enableResizing: false,
        size: 200,
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
        header: "Text source",
        cell: ({ row, getValue }) => (
          <div
            className="w-full cursor-pointer"
            onClick={() =>
              dispatch(
                toggleState({
                  id: row.original._id,
                })
              )
            }
          >
            <div className="flex items-center">
              <Badge
                variant="outline"
                className="break-all badge bg-emerald-500 gap-2 text-white"
              >
                {String(getValue())}
              </Badge>

              <Voice
                lang={row.original.sourceLanguage}
                text={String(getValue())}
              />
            </div>
          </div>
        ),
      },
      {
        accessorKey: "textTarget",
        header: "Text target",
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
                    <Badge
                      variant="outline"
                      className="bg-sky-500 gap-2 text-white"
                    >
                      {item.text}
                    </Badge>{" "}
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
        cell: ({ row }) => (
          <div className="flex gap-3 items-center w-0">
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                dispatch(setItemVocabState(row.original));
                setIsEditing(true);
                setIsModal(!isModal);
              }}
              leftIcon={<IconEdit />}
            />
            <AlertDialog
              head={
                <Button
                  onClick={() => {
                    dispatch(setIdVocabState(row.original._id));
                  }}
                  size="icon"
                  variant="outline"
                  leftIcon={<IconTrash />}
                />
              }
              title="Do you want to delete?"
              onYes={handleOnYes}
            />
          </div>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [idsState, isModal]
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
        <div className="flex items-center gap-2">
          <Popover head={<IconFilter />} body={<>Hello</>} />
          <div className="flex items-center">
            <Input placeholder="Search here" />
            <Button
              classNames="btn-sm rounded-l-none"
              leftIcon={<IconSearch />}
            />
          </div>
          <Button
            classNames="btn-sm btn-neutral"
            title="Create"
            onClick={() => {
              setIsEditing(false);
              setIsModal(!isModal);
            }}
          />
        </div>
      </div>

      <Table
        isMultiSelect
        isPagination
        isCollapse
        isLoading={
          isLoadingPost ||
          isLoadingPut ||
          isLoading ||
          isLoadingDelete ||
          isLoadingDeleteMulti
        }
        onConfirmMultiDelete={() => {
          setIsDeleteMulti(true);
        }}
        paginations={{
          currentPage: data?.currentPage ?? 1,
          totalItems: data?.totalItems ?? 1,
          totalPages: data?.totalPages ?? 1,
        }}
        data={data?.data ?? []}
        options={{
          data: data?.data ?? [],
          columns: columns,
          state: {
            rowSelection,
          },
          getCoreRowModel: getCoreRowModel(),
          onRowSelectionChange: setRowSelection,
          getRowId: (row) => row._id,
        }}
      />

      <Modal
        custom={customStyleVocabModal}
        isOpen={isModal}
        onClose={() => setIsModal(false)}
        contentLabel={isEditing ? "Edit" : "Create"}
        children={
          <FormVocab
            idVocab={itemVocab._id}
            mutate={mutatePost}
            mutatePut={mutatePut}
            isEditing={isEditing}
            onClose={() => setIsModal(false)}
          />
        }
      />
      {/* <Modal
        isOpen={isNotifyModal}
        onClose={() => {
          setIsDeleteMulti(true);
          setIsNotifyModal(false);
        }}
        children={
          <ConfirmButton
            onNo={() => setIsNotifyModal(false)}
            onYes={handleOnYes}
            title="Do you want to delete?"
          />
        }
      /> */}
    </div>
  );
};

export default Vocab;
