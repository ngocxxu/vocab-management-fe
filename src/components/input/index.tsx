import { FieldError } from "react-hook-form";
import { InputLib } from "../ui/input";

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
      <div className="label">
        <span className="label-text">
          {isMark && <span className="text-red-600">*</span>}
          {label}
        </span>
      </div>
      <InputLib
        type="text"
        placeholder={placeholder}
        className="input input-bordered input-sm w-full"
        {...props}
      />
      {/* Validation */}
      <div className="label">
        {error && (
          <span className="label-text-alt text-red-600">{error.message}</span>
        )}
      </div>
    </label>
  );
};
export default Input;
