import { forwardRef } from "react";
import { FieldError } from "react-hook-form";
import ReactSelect from "react-select";
import { TOption } from "../../utils/types";
import clsx from "clsx";

type TMultiSelect = {
  isMark?: boolean;
  label: string;
  options: TOption[];
  error?: FieldError | null;
};

const MultiSelect = forwardRef(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ label, options, isMark, error, ...props }: TMultiSelect, _ref) => {
    return (
      <div className="w-full">
        <div className={clsx("text-sm", label && "mt-4")}>
          {isMark && <span className="text-red-600">*</span>}
          {label}
        </div>
        <ReactSelect
          classNames={{
            control: () => "!rounded-lg text-sm",
            option: () => "!text-sm",
            multiValue: () => "!bg-customBlue text-white !rounded",
            multiValueLabel: () => "!text-white",
          }}
          isMulti
          name="colors"
          options={options}
          {...props}
        />

        {/* Validation */}
        {error && <span className="text-xs text-red-600">{error.message}</span>}
      </div>
    );
  }
);

export default MultiSelect;
