import { ReactNode } from "react";

type TTooltip = {
  children: ReactNode;
};

const Tooltip = ({ children }: TTooltip) => {
  return (
    <div className="relative">
      <div className="absolute top-0 left-0 -translate-x-8 translate-y-4">
        {children}
      </div>
    </div>
  );
};

export default Tooltip;
