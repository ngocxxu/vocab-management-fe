import { forwardRef } from "react";
import { FieldError } from "react-hook-form";
import ReactSelect from "react-select";
import { TOption } from "../../utils/types";

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
        <div className="label">
          <span className="label-text">
            {isMark && <span className="text-red-600">*</span>}
            {label}
          </span>
        </div>
        <ReactSelect
          isMulti
          name="colors"
          options={options}
          className="basic-multi-select"
          classNamePrefix="select"
          {...props}
        />
        {/* Validation */}
        <div className="label">
          {error && (
            <span className="label-text-alt text-red-600">
              This field must have at least 1 items
            </span>
          )}
        </div>
      </div>
    );
  }
);

export default MultiSelect;
