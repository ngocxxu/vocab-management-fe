import { ButtonLib } from "../ui/button";

type TGroupButton = {
  isEditing: boolean;
  onClose: () => void;
};

const GroupButton = ({ isEditing, onClose }: TGroupButton) => {
  return (
    <div className="flex justify-center items-center gap-2">
      <ButtonLib type="button" onClick={onClose} className="btn">
        Close
      </ButtonLib>
      <ButtonLib className="btn btn-neutral" type="submit">
        {isEditing ? "Update" : "Save"}
      </ButtonLib>
    </div>
  );
};

export default GroupButton;
