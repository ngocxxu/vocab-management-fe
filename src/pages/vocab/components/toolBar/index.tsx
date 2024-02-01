import IconFilter from "@/assets/svg/IconFilter";
import Button from "@/components/button";
import { Popover } from "@/components/popover";
import { SearchBar } from "@/components/searchBar";
import { ButtonLib } from "@/components/ui/button";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Filter } from "../filter";

type TToolbar = {
  onAddNew: () => void;
};

export type TFormInputsFilter = {
  status?: string[];
};

export const ToolBar = ({ onAddNew }: TToolbar) => {
  const methods = useForm<TFormInputsFilter>({
    defaultValues: {
      status: [],
    },
  });

  const onSubmit: SubmitHandler<TFormInputsFilter> = (data) => {
    console.log(data);
  };

  return (
    <div className="flex items-center justify-end">
      <Popover
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
              <Filter />
            </form>
          </FormProvider>
        }
        className="w-80"
      />
      <SearchBar />
      <Button
        type="button"
        className="ml-3"
        title="+ Add new"
        onClick={onAddNew}
      />
    </div>
  );
};
