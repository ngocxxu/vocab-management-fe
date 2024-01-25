import { FieldError } from "react-hook-form";
import ReactSelect from "react-select";
import { TOption } from "../../utils/types";

export type TSelect = {
  isMark?: boolean;
  label: string;
  options: TOption[];
  error?: FieldError | null;
  onChange: (e: TOption) => void;
  value: string;
};
const Select = ({
  label,
  isMark = false,
  options,
  error,
  onChange,
  value,
  ...props
}: TSelect) => {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">
          {isMark && <span className="text-red-600">*</span>}
          {label}
        </span>
      </div>
      <ReactSelect
        classNames={{
          control: () => "!rounded-lg text-sm",
          option: () => "!text-sm",
        }}
        value={options.find((item) => item.value === value)}
        options={options}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange={(e) => onChange((e as any).value)}
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

export default Select;
