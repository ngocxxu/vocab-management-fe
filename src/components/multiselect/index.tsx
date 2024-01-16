import { MultiSelect } from "react-multi-select-component";
import { TSelect } from "../select";
import styles from "./style.module.scss";

const Multiselect = ({ label, options, isMark, error, ...props }: TSelect) => {
  return (
    <div className="w-full">
      <div className="label">
        <span className="label-text">
          {isMark && <span className="text-red-600">*</span>}
          {label}
        </span>
      </div>
      <MultiSelect
        className={styles.item}
        value={[]}
        options={options}
        labelledBy="Select"
        {...props}
      />
      {/* Validation */}
      <div className="label">
        {error && (
          <span className="label-text-alt text-red-600">{error.message}</span>
        )}
      </div>
    </div>
  );
};

export default Multiselect;
