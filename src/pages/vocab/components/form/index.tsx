import { yupResolver } from "@hookform/resolvers/yup";
import { IconPlus, IconX } from "@tabler/icons-react";
import clsx from "clsx";
import { useRef } from "react";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import * as yup from "yup";
import { TExamples } from "../..";
import Input from "../../../../components/input";
import Select from "../../../../components/select";
import { TOption } from "../../../../utils/types";
import { TextTargetsForm } from "./textTargets";

type TFormVocab = {
  idModal: string;
  isEditing: boolean;
};

export type TFormInputsVocab = {
  sourceLanguage: string;
  targetLanguage: string;
  textSource: string;
  textTarget: {
    text: string;
    wordType: string;
    explanationSource: string;
    explanationTarget: string;
    examples: TExamples[];
    grammar: string;
    subject: TOption[];
  }[];
};

const FormSchema = yup.object().shape({
  sourceLanguage: yup.string().required(),
  targetLanguage: yup.string().required(),
  textSource: yup.string().required(),
  textTarget: yup.array().required(),
});

const FormVocab = ({ idModal, isEditing }: TFormVocab) => {
  const refBtn = useRef<HTMLLabelElement>(null);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TFormInputsVocab>({
    defaultValues: {
      textSource: "",
      ["textTarget"]: [],
    },
    resolver: yupResolver(FormSchema),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "textTarget",
  });

  const onSubmit: SubmitHandler<TFormInputsVocab> = (data) => console.log(data);

  // Toggle close modal if no errors
  // useEffect(() => {
  //   if (Object.keys(errors).length > 0) return;
  //   if (!refBtn.current) return;
  //   refBtn.current.click();
  // }, [errors]);

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
              error={errors.sourceLanguage}
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
              error={errors.targetLanguage}
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
            error={errors.textSource}
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
          <TextTargetsForm errors={errors} control={control} index={index} />
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
          <label ref={refBtn} htmlFor={idModal} />
          <div className="flex justify-center items-center gap-2">
            <button className="btn" type="submit">
              {isEditing ? "Update" : "Save"}
            </button>

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
