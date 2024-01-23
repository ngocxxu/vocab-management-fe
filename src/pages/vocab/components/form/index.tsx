import { yupResolver } from "@hookform/resolvers/yup";
import { IconPlus, IconX } from "@tabler/icons-react";
import { AxiosResponse } from "axios";
import clsx from "clsx";
import {
  Controller,
  Resolver,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { UseMutateFunction } from "react-query";
import * as yup from "yup";
import { TTextTarget, TVocab } from "../..";
import GroupButton from "../../../../components/button/GroupButton";
import Input from "../../../../components/input";
import Select from "../../../../components/select";
import { defaultValue, languageList } from "../../constants";
import { TextTargetsForm } from "./textTargets";
import { TPutVocabs } from "../../../../services/vocab/usePutVocab";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";

type TFormVocabProps = {
  idVocab: string;
  isEditing: boolean;
  onClose: () => void;
  mutate: UseMutateFunction<
    AxiosResponse,
    unknown,
    Omit<TVocab, "id">,
    unknown
  >;
  mutatePut: UseMutateFunction<AxiosResponse, unknown, TPutVocabs, unknown>;
};

export type TFormInputsVocab = {
  sourceLanguage: string;
  targetLanguage: string;
  textSource: string;
  textTarget: TTextTarget[];
};

const FormSchema = yup.object().shape({
  sourceLanguage: yup.string().required("Source language is required"),
  targetLanguage: yup.string().required("Target language is required"),
  textSource: yup.string().required("Text source is required"),
  textTarget: yup.array().of(
    yup.object().shape({
      text: yup.string().required("Text is required"),
      wordType: yup.string().required("Word type is required"),
      subject: yup.array().min(1),
    })
  ),
});

const FormVocab = ({
  idVocab,
  isEditing,
  onClose,
  mutate,
  mutatePut,
}: TFormVocabProps) => {
  const { itemVocab } = useSelector((state: RootState) => state.vocabReducer);
  const {
    setValue,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TFormInputsVocab>({
    defaultValues: {
      sourceLanguage: "ko",
      targetLanguage: "vi",
      ["textTarget"]:
        itemVocab && isEditing
          ? Array.from(itemVocab.textTarget, () => defaultValue)
          : [defaultValue],
    },
    resolver: yupResolver(FormSchema) as unknown as Resolver<TFormInputsVocab>,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "textTarget",
  });

  const onSubmit: SubmitHandler<TFormInputsVocab> = (data) => {
    isEditing
      ? mutatePut({
          data: data as Omit<TVocab, "id">,
          id: idVocab,
        })
      : mutate(data as Omit<TVocab, "id">);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
              options={languageList}
              onChange={field.onChange}
              value={field.value}
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
              options={languageList}
              onChange={field.onChange}
              value={field.value}
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
          <div
            className={clsx(
              index !== 0 && "mt-4",
              "flex justify-between items-center"
            )}
          >
            <div className="text-sm">Item {index + 1}</div>
            {index > 0 && (
              <IconX
                onClick={() => remove(index)}
                className="btn btn-square btn-xs btn-outline border-white bg-white"
              />
            )}
          </div>
          <TextTargetsForm
            fieldsLengthItem={fields.length}
            isEditing={isEditing}
            setValue={setValue}
            reset={reset}
            errors={errors}
            control={control}
            index={index}
          />
        </fieldset>
      ))}
      <br />
      <div className="border border-gray-300 rounded-md flex justify-center items-center">
        <IconPlus
          onClick={() => {
            append({
              ...defaultValue,
              examples: [],
            });
          }}
          className="btn btn-square btn-xs btn-outline border-white bg-white w-full h-8"
        />
      </div>
      <div className="flex justify-end mt-4">
        <GroupButton isEditing={isEditing} onClose={onClose} />
      </div>
    </form>
  );
};

export default FormVocab;
