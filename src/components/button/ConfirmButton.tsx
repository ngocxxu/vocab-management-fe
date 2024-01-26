import { ButtonLib } from "../ui/button";

type TConfirmButton = {
  onNo: () => void;
  onYes: () => void;
  title: string;
};

const ConfirmButton = ({ onNo, onYes, title }: TConfirmButton) => {
  return (
    <>
      <div className="whitespace-nowrap mb-2">{title}</div>
      <div className="flex justify-center items-center gap-2">
        <ButtonLib className="btn btn-active btn-sm" onClick={onNo}>
          No
        </ButtonLib>
        <ButtonLib
          className="btn btn-active btn-neutral btn-sm"
          onClick={onYes}
        >
          Yes
        </ButtonLib>
      </div>
    </>
  );
};

export default ConfirmButton;
