type TSelect = {
  isMark?: boolean;
  label: string;
  options: { label: string; value: string }[];
};
const Select = ({ label, isMark = false, options, ...props }: TSelect) => {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">
          {isMark && <span className="text-red-600">*</span>}
          {label}
        </span>
      </div>
      <select className="select select-bordered select-sm w-full" {...props}>
        <option disabled selected>
          Pick one
        </option>

        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      {/* Validation */}
      {/* <div className="label">
        <span className="label-text-alt">Alt label</span>
      </div> */}
    </label>
  );
};

export default Select;
