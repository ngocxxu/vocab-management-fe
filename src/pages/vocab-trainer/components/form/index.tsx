import Input from "@/components/input";
import Vocab from "@/pages/vocab";
import { RootState } from "@/redux/store";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, Resolver, SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as yup from "yup";
import GroupButton from "../../../../components/button/GroupButton";
import { TFormInputsVocabTrainer } from "../../types";

type TFormVocabTrainerProps = {
  idVocabTrainer: string;
  onClose: () => void;
  // mutate: UseMutateFunction<
  //   AxiosResponse,
  //   unknown,
  //   Omit<TVocab, 'id'>,
  //   unknown
  // >;
  // mutatePut: UseMutateFunction<AxiosResponse, unknown, TPutVocabs, unknown>;
};

const FormSchema = yup.object().shape({
  nameTest: yup.string().required("Name is required"),
});

const FormVocabTrainer = ({
  // idVocabTrainer,
  onClose,
}: // mutate,
// mutatePut,
TFormVocabTrainerProps) => {
  const { rowSelectionState } = useSelector(
    (state: RootState) => state.vocabTrainerReducer
  );
  const counts = Object.keys(rowSelectionState).length;
  const { handleSubmit, control, watch } = useForm<TFormInputsVocabTrainer>({
    defaultValues: {
      nameTest: "",
    },
    resolver: yupResolver(
      FormSchema
    ) as unknown as Resolver<TFormInputsVocabTrainer>,
  });

  const isDisabled = watch("nameTest").length === 0 || counts < 5;

  const onSubmit: SubmitHandler<TFormInputsVocabTrainer> = (data) => {
    console.log(data);
    // isEditing
    //   ? mutatePut({
    //       data: data as Omit<TVocab, 'id'>,
    //       id: idVocab,
    //     })
    //   : mutate(data as Omit<TVocab, 'id'>);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="nameTest"
        control={control}
        render={({ field }) => (
          <Input
            removeStyle
            isMark={true}
            label={<span className="text-sm font-semibold">Name of test</span>}
            placeholder="Type here"
            {...field}
          />
        )}
      />

      <div className="text-sm font-semibold mt-5">Vocabulary list</div>
      <Vocab />

      <div className="flex justify-center">
        <GroupButton
          variantNo="ghost"
          onClose={onClose}
          disabledYes={isDisabled}
        />
      </div>
    </form>
  );
};

export default FormVocabTrainer;