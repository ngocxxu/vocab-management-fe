// import { Checkbox } from "@/comp/checkbox";
import { HTMLProps, useEffect, useRef } from "react";

export const IndeterminateCheckbox = ({
  indeterminate,
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) => {
  const ref = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, indeterminate]);

  return (
    <input
      className="accent-customBlack w-4 h-4"
      type="checkbox"
      ref={ref}
      {...rest}
    />
  );
};
