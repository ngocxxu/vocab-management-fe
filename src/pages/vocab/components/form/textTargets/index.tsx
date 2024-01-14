import { Control, Controller, useFieldArray } from "react-hook-form";
import { TFormInputsVocab } from "..";
import Input from "../../../../../components/input";
import { IconPlus, IconX } from "@tabler/icons-react";
import clsx from "clsx";
import { ExamplesForm } from "../examples";
import Select from "../../../../../components/select";

type TTextTargetsForm = {
  index: number;
  control: Control<TFormInputsVocab>;
};

export const TextTargetsForm = ({ index, control }: TTextTargetsForm) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `textTarget.${index}.examples`,
  });

  return (
    <>
      <div className="flex justify-center items-center gap-2">
        <Controller
          name={`textTarget.${index}.text`}
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              isMark={true}
              label="Text target"
              placeholder="Type here"
              {...field}
            />
          )}
        />
        <Controller
          name={`textTarget.${index}.wordType`}
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              isMark={true}
              label="Word type"
              placeholder="Type here"
              {...field}
            />
          )}
        />
      </div>
      <div className="flex justify-center items-center gap-2">
        <Controller
          name={`textTarget.${index}.explanationSource`}
          control={control}
          render={({ field }) => (
            <Input
              label="Explanation source"
              placeholder="Type here"
              {...field}
            />
          )}
        />
        <Controller
          name={`textTarget.${index}.explanationTarget`}
          control={control}
          render={({ field }) => (
            <Input
              label="Explanation target"
              placeholder="Type here"
              {...field}
            />
          )}
        />
      </div>
      <div className="flex justify-center items-center gap-2">
        <Controller
          name={`textTarget.${index}.grammar`}
          control={control}
          render={({ field }) => (
            <Input label="Grammar" placeholder="Type here" {...field} />
          )}
        />
        <Controller
          name={`textTarget.${index}.subject`}
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              isMark={true}
              label="Subject"
              options={[
                { label: "Idiom", value: "idiom" },
                { label: "Weather", value: "weather" },
                { label: "Life", value: "life" },
              ]}
              {...field}
            />
          )}
        />
      </div>

      <div className="border border-gray-200 rounded-md mt-4 p-2">
        {fields.map((field, idx) => (
          <fieldset key={field.id}>
            <div
              className={clsx(
                idx !== 0 && "mt-4",
                "flex justify-between items-center"
              )}
            >
              <div className="text-sm">Example {idx + 1}</div>
              <IconX
                onClick={() => remove(idx)}
                className="btn btn-square btn-xs btn-outline border-white bg-white"
              />
            </div>
            <ExamplesForm control={control} idx={idx} idxTextTarget={index} />
          </fieldset>
        ))}
        <button
          className={clsx(fields.length !== 0 && "mt-2", "btn btn-sm w-full")}
          onClick={() => {
            append({
              source: "",
              target: "",
            });
          }}
        >
          <IconPlus />
          Example
        </button>
      </div>
    </>
  );
};
