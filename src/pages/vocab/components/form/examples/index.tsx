import { Control, Controller } from "react-hook-form";
import { TFormInputsVocab } from "..";
import Input from "../../../../../components/input";

type TExamplesForm = {
  idxTextTarget: number;
  idx: number;
  control: Control<TFormInputsVocab>;
};

export const ExamplesForm = ({
  idxTextTarget,
  control,
  idx,
}: TExamplesForm) => {
  return (
    <div className="flex justify-center items-center gap-2">
      <Controller
        name={`textTarget.${idxTextTarget}.examples.${idx}.source`}
        control={control}
        render={({ field }) => (
          <Input label="Source" placeholder="Type here" {...field} />
        )}
      />
      <Controller
        name={`textTarget.${idxTextTarget}.examples.${idx}.target`}
        control={control}
        render={({ field }) => (
          <Input label="Target" placeholder="Type here" {...field} />
        )}
      />
    </div>
  );
};
