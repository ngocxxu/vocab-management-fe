import { ButtonLib } from "../ui/button";

type TGroupButton = {
  isEditing?: boolean;
  onClose?: () => void;
  variantNo?: "default" | "outline" | "secondary" | "ghost";
  variantYes?: "default" | "outline" | "secondary" | "ghost";
};

const GroupButton = ({
  isEditing,
  onClose,
  variantNo = "default",
  variantYes = "default",
}: TGroupButton) => {
  return (
    <div className="flex justify-center items-center gap-2">
      {onClose && (
        <ButtonLib
          variant={variantNo}
          type="button"
          onClick={onClose}
          className="btn"
        >
          Cancel
        </ButtonLib>
      )}
      <ButtonLib variant={variantYes} className="btn btn-neutral" type="submit">
        {isEditing ? "Update" : "Save"}
      </ButtonLib>
    </div>
  );
};

export default GroupButton;
