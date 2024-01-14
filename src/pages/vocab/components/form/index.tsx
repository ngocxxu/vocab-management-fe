import { IconPlus, IconX } from "@tabler/icons-react";
import clsx from "clsx";
import { useRef } from "react";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { TTextTarget } from "../..";
import Input from "../../../../components/input";
import { TextTargetsForm } from "./textTargets";
import Select from "../../../../components/select";

type TFormVocab = {
  idModal: string;
  isEditing: boolean;
};

export type TFormInputsVocab = {
  sourceLanguage: string;
  targetLanguage: string;
  textSource: string;
  textTarget: TTextTarget[];
};

const FormVocab = ({ idModal, isEditing }: TFormVocab) => {
  const refBtn = useRef<HTMLButtonElement>(null);
  const { handleSubmit, control } = useForm<TFormInputsVocab>({
    defaultValues: {
      textSource: "",
      ["textTarget"]: [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "textTarget",
  });

  const onSubmit: SubmitHandler<TFormInputsVocab> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 className="font-bold text-lg">{isEditing ? "Edit" : "Create"}</h3>
      <div className="flex justify-center items-center gap-2">
        <Controller
          name="sourceLanguage"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              isMark={true}
              label="Source language"
              options={[
                { label: "Korean", value: "ko" },
                { label: "Vietnamese", value: "vi" },
                { label: "English", value: "en" },
              ]}
              {...field}
            />
          )}
        />
        <Controller
          name="targetLanguage"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              isMark={true}
              label="Target language"
              options={[
                { label: "Korean", value: "ko" },
                { label: "Vietnamese", value: "vi" },
                { label: "English", value: "en" },
              ]}
              {...field}
            />
          )}
        />
      </div>
      <Controller
        name="textSource"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Input
            isMark={true}
            label="Text source"
            placeholder="Type here"
            {...field}
          />
        )}
      />

      {fields.map((field, index) => (
        <fieldset
          className="border border-gray-200 rounded-md mt-4 p-2"
          key={field.id}
        >
          <div className="flex justify-end"></div>
          <div
            className={clsx(
              index !== 0 && "mt-4",
              "flex justify-between items-center"
            )}
          >
            <div className="text-sm">Item {index + 1}</div>
            <IconX
              onClick={() => remove(index)}
              className="btn btn-square btn-xs btn-outline border-white bg-white"
            />
          </div>
          <TextTargetsForm control={control} index={index} />
        </fieldset>
      ))}

      <br />

      <div className="border border-gray-300 rounded-md flex justify-center items-center">
        <IconPlus
          onClick={() => {
            append({
              text: "",
              wordType: "",
              explanationSource: "",
              explanationTarget: "",
              examples: [],
              grammar: "",
              subject: [],
            });
          }}
          className="btn btn-square btn-xs btn-outline border-white bg-white w-full h-8"
        />
      </div>

      <div className="modal-action">
        <div className="flex justify-between items-center">
          <button ref={refBtn} type="submit" />
          <div className="flex justify-center items-center gap-2">
            <label
              htmlFor={idModal}
              className="btn"
              onClick={() => {
                if (!refBtn.current) return;
                refBtn.current.click();
              }}
            >
              {isEditing ? "Update" : "Save"}
            </label>
            <label htmlFor={idModal} className="btn">
              Close
            </label>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormVocab;
