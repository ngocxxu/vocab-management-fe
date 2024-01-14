type TInput = {
  isMark?: boolean;
  label: string;
  placeholder: string;
};

const Input = ({ label, isMark = false, placeholder, ...props }: TInput) => {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">
          {isMark && <span className="text-red-600">*</span>}
          {label}
        </span>
      </div>
      <input
        type="text"
        placeholder={placeholder}
        className="input input-bordered input-sm w-full"
        {...props}
      />
      {/* Validation */}
      {/* <div className="label">
      <span className="label-text-alt text-red-600">
        Bottom Left label
      </span>
    </div> */}
    </label>
  );
};

export default Input;
