import { IconPlus, IconX } from "@tabler/icons-react";
import clsx from "clsx";
import { useEffect } from "react";
import {
  Control,
  Controller,
  FieldError,
  FieldErrors,
  UseFormReset,
  UseFormSetValue,
  useFieldArray,
} from "react-hook-form";
import { useSelector } from "react-redux";
import { TFormInputsVocab } from "..";
import Input from "../../../../../components/input";
import MultiSelect from "../../../../../components/multiselect";
import Select from "../../../../../components/select";
import { RootState } from "../../../../../redux/store";
import { subjectList, wordTypeList } from "../../../constants";
import { ExamplesForm } from "../examples";
import Button from "@/components/button";

type TTextTargetsForm = {
  fieldsLengthItem: number;
  isEditing: boolean;
  index: number;
  control: Control<TFormInputsVocab>;
  errors: FieldErrors<TFormInputsVocab>;
  setValue: UseFormSetValue<TFormInputsVocab>;
  reset: UseFormReset<TFormInputsVocab>;
};

export const TextTargetsForm = ({
  isEditing,
  index,
  control,
  errors,
  reset,
  setValue,
  fieldsLengthItem,
}: TTextTargetsForm) => {
  const { itemVocab } = useSelector((state: RootState) => state.vocabReducer);
  const { fields, append, remove } = useFieldArray({
    control,
    name: `textTarget.${index}.examples`,
  });
  const checkErrors = Object.keys(errors).length > 0;

  //Editing
  useEffect(() => {
    if (
      itemVocab &&
      isEditing &&
      // Set intial value from backend when re-render times
      fieldsLengthItem === itemVocab.textTarget.length
    ) {
      reset((prev) => ({ ...prev, ...itemVocab }));
      setValue(
        `textTarget.${index}.wordType`,
        itemVocab.textTarget[index].wordType
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing, itemVocab]);

  return (
    <>
      <div className="flex justify-center items-center gap-2">
        <Controller
          name={`textTarget.${index}.text`}
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              error={checkErrors ? errors.textTarget![index]?.text : null}
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
            <Select
              error={errors.targetLanguage}
              isMark={true}
              label="Word type"
              options={wordTypeList}
              onChange={field.onChange}
              value={field.value}
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
      <Controller
        name={`textTarget.${index}.grammar`}
        control={control}
        render={({ field }) => (
          <Input label="Grammar" placeholder="Type here" {...field} />
        )}
      />
      <Controller
        name={`textTarget.${index}.subject`}
        rules={{ required: true }}
        control={control}
        render={({ field }) => (
          <MultiSelect
            error={
              checkErrors
                ? (errors.textTarget![index]?.subject as FieldError)
                : null
            }
            isMark={true}
            label="Subject"
            options={subjectList}
            {...field}
          />
        )}
      />

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
        <Button
          type="button"
          className={clsx(fields.length !== 0 && "mt-2", "w-full")}
          onClick={() => {
            append({
              source: "",
              target: "",
            });
          }}
        >
          <IconPlus />
          Example
        </Button>
      </div>
    </>
  );
};
