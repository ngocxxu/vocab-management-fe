import { FieldError } from "react-hook-form";
import { InputLib } from "../ui/input";
import clsx from "clsx";

type TInput = {
  isMark?: boolean;
  label?: string;
  placeholder: string;
  error?: FieldError | null;
};

const Input = ({
  label,
  isMark = false,
  placeholder,
  error,
  ...props
}: TInput) => {
  return (
    <label className="form-control w-full">
      <div className={clsx("text-sm", label && "mt-4")}>
        {isMark && <span className="text-red-600">*</span>}
        {label}
      </div>
      <InputLib
        type="text"
        placeholder={placeholder}
        className="input input-bordered input-sm w-full"
        {...props}
      />

      {/* Validation */}
      {error && <span className="text-xs text-red-600">{error.message}</span>}
    </label>
  );
};
export default Input;
