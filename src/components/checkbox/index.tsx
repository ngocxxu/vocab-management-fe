import { CheckboxLib } from "@/components/ui/checkbox";
import { ReactNode, useId } from "react";

type TCheckBox = {
  label?: ReactNode;
};

export function Checkbox({ label, ...props }: TCheckBox) {
  const randomId = useId();

  return (
    <div className="flex items-center space-x-2">
      <CheckboxLib {...props} id={randomId} />

      {label && (
        <label
          htmlFor={randomId}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
      )}
    </div>
  );
}
