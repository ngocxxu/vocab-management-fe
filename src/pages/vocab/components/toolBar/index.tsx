import IconFilter from "@/assets/svg/IconFilter";
import Button from "@/components/button";
import { Popover } from "@/components/popover";
import { SearchBar } from "@/components/searchBar";
import { ButtonLib } from "@/components/ui/button";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Filter } from "../filter";
import { useState } from "react";
import { statusList } from "../../constants";
import { TOption } from "@/utils/types";
import { Modal } from "@/components/modal/index";
import FormVocab from "../form";
import { UseMutateFunction } from "react-query";
import { AxiosResponse } from "axios";
import { TVocab } from "../../types";
import { TPutVocabs } from "@/services/vocab/usePutVocab";
import { useDispatch } from "react-redux";
import {
  setFilterVocabState,
  setSearchVocabState,
} from "@/redux/reducer/vocab";

type TToolbar = {
  onAddNew: () => void;
  idVocab: string;
  mutatePost: UseMutateFunction<
    AxiosResponse,
    unknown,
    Omit<TVocab, "id">,
    unknown
  >;
  mutatePut: UseMutateFunction<AxiosResponse, unknown, TPutVocabs, unknown>;
  isEditing: boolean;
};

export type TFormInputsFilter = {
  status?: string[];
  subject?: TOption[];
};

export const ToolBar = ({
  onAddNew,
  mutatePost,
  idVocab,
  mutatePut,
  isEditing,
}: TToolbar) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const methods = useForm<TFormInputsFilter>({
    defaultValues: {
      status: [...statusList.map((item) => item.value)],
    },
  });

  const onSubmit: SubmitHandler<TFormInputsFilter> = (data) => {
    dispatch(setFilterVocabState(data));
    setOpen(false);
  };

  return (
    <div className="flex items-center justify-end">
      <Popover
        open={open}
        onOpenChange={setOpen}
        align="end"
        side="bottom"
        head={
          <ButtonLib variant="ghost">
            <IconFilter /> Filters
          </ButtonLib>
        }
        body={
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <Filter onClose={() => setOpen(false)} />
            </form>
          </FormProvider>
        }
        className="w-80"
      />
      <SearchBar onSearch={(input) => dispatch(setSearchVocabState(input))} />

      <Modal
        title={isEditing ? "Edit" : "Create"}
        open={openModal}
        onOpenChange={setOpenModal}
        head={
          <Button
            type="button"
            classNames="ml-3"
            title="+ Add new"
            onClick={onAddNew}
          />
        }
        body={
          <FormVocab
            idVocab={idVocab}
            mutate={mutatePost}
            mutatePut={mutatePut}
            isEditing={isEditing}
            onClose={() => setOpenModal(false)}
          />
        }
        className="w-full h-full max-w-[80vh] !max-h-[85vh] overflow-x-auto"
      />
    </div>
  );
};
