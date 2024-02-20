import IconFilterRemove from "@/assets/svg/IconFilterRemove";
import Button from "@/components/button";
import { Modal } from "@/components/modal/index";
import { SearchBar } from "@/components/searchBar";
import { ButtonLib } from "@/components/ui/button";
import { resetFilterState, setSearchVocabState } from "@/redux/reducer/vocab";
import { RootState } from "@/redux/store";
import { defaultStatus } from "@/utils/constants";
import { TOption } from "@/utils/types";
import { RowSelectionState } from "@tanstack/react-table";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import FormVocabTrainer from "../form";
import { setOpenModalState } from "@/redux/reducer/vocabTrainer";

type TToolbar = {
  idVocabTrainer: string;
  // mutatePost: UseMutateFunction<
  //   AxiosResponse,
  //   unknown,
  //   Omit<TVocabTrainer, 'id'>,
  //   unknown
  // >;
  // mutatePut: UseMutateFunction<AxiosResponse, unknown, TPutVocabs, unknown>;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  rowSelection: RowSelectionState;
  setRowSelection: React.Dispatch<React.SetStateAction<Record<string, never>>>;
};

export type TFormInputsFilter = {
  status?: string[];
  subject?: TOption[];
};

export const ToolBar = ({
  // mutatePost,
  idVocabTrainer,
  // mutatePut,
  openModal,
  setOpenModal,
  rowSelection,
  setRowSelection,
}: TToolbar) => {
  const counts = Object.keys(rowSelection).length;
  const { filterData, searchVocab } = useSelector(
    (state: RootState) => state.vocabReducer
  );

  const isClear =
    searchVocab ||
    counts > 0 ||
    // (filterData.status && filterData.status?.length > 0) ||
    (filterData.subject && filterData.subject?.length > 0);
  const dispatch = useDispatch();
  // const [open, setOpen] = useState(false);

  const methods = useForm<TFormInputsFilter>({
    defaultValues: {
      subject: filterData.subject,
      status: filterData.status,
    },
  });

  // const onSubmit: SubmitHandler<TFormInputsFilter> = (data) => {
  //   dispatch(setFilterVocabState(data));
  //   setOpen(false);
  // };

  return (
    <div className="flex items-center justify-end">
      <FormProvider {...methods}>
        {isClear && (
          <ButtonLib
            className="mr-1"
            variant="outline"
            onClick={() => {
              setRowSelection({});
              dispatch(resetFilterState());
              methods.setValue("subject", []);
              methods.setValue("status", defaultStatus);
            }}
          >
            <IconFilterRemove /> Clear all
          </ButtonLib>
        )}
      </FormProvider>
      <SearchBar
        defaultValue={searchVocab}
        onSearch={(input) => dispatch(setSearchVocabState(input))}
      />

      <Modal
        title="Create your test"
        description=" You can create your test by entering the required fields below."
        open={openModal}
        onOpenChange={setOpenModal}
        head={
          <Button
            type="button"
            onClick={() => dispatch(setOpenModalState(true))}
            classNames="ml-3"
            title="+ Add test"
          />
        }
        body={
          <FormVocabTrainer
            idVocabTrainer={idVocabTrainer}
            // mutate={mutatePost}
            // mutatePut={mutatePut}
            onClose={() => {
              dispatch(setOpenModalState(true));
              setOpenModal(false);
            }}
          />
        }
        className="w-full h-full max-w-[150vh] !max-h-[85vh] overflow-x-auto"
      />
    </div>
  );
};
