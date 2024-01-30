import { FieldError } from "react-hook-form";
import ReactSelect from "react-select";
import { TOption } from "../../utils/types";
import clsx from "clsx";

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
      <div className={clsx("text-sm", label && "mt-4")}>
        {isMark && <span className="text-red-600">*</span>}
        {label}
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
      {error && <span className="text-sm text-red-600">{error.message}</span>}
    </label>
  );
};

export default Select;
