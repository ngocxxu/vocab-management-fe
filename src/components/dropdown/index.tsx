import { ReactNode, useRef } from "react";

type DropdownCustom = {
  head: ReactNode | string;
  list: JSX.Element;
  classNameSummary?: string;
  position?: string;
};

const DropDownCustom = ({
  head,
  list,
  classNameSummary,
  position,
}: DropdownCustom) => {
  const dropdownRef = useRef<HTMLDetailsElement>(null!);

  return (
    <details
      ref={dropdownRef}
      className={`dropdown ${position}`}
      // onBlur={() => {
      //   removeOpenAttribute(dropdownRef);
      // }}
    >
      <summary className={classNameSummary ? classNameSummary : "text-white"}>
        {head}
      </summary>
      {list}
    </details>
  );
};

export default DropDownCustom;
