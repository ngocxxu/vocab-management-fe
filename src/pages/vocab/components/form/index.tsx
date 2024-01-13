import { useRef } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type TFormVocab = {
  idModal: string;
  isEditing: boolean;
};

export type TFormInputs = {
  TextField: string;
  MyCheckbox: string;
};

const FormVocab = ({ idModal, isEditing }: TFormVocab) => {
  const refBtn = useRef<HTMLButtonElement>(null);
  const { handleSubmit, control } = useForm<TFormInputs>({
    defaultValues: {
      MyCheckbox: "false",
    },
  });

  const onSubmit: SubmitHandler<TFormInputs> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 className="font-bold text-lg">{isEditing ? "Edit" : "Create"}</h3>
      <Controller
        name="MyCheckbox"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">
                <span className="text-red-600">*</span>Text source
              </span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-sm w-full"
              {...field}
            />
            {/* Validation */}
            {/* <div className="label">
              <span className="label-text-alt text-red-600">
                Bottom Left label
              </span>
            </div> */}
          </label>
        )}
      />

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
