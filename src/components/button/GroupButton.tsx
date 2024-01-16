type TGroupButton = {
  isEditing: boolean;
  onClose: () => void;
};

const GroupButton = ({ isEditing, onClose }: TGroupButton) => {
  return (
    <div className="flex justify-center items-center gap-2">
      <button className="btn" type="submit">
        {isEditing ? "Update" : "Save"}
      </button>

      <button type="button" onClick={onClose} className="btn">
        Close
      </button>
    </div>
  );
};

export default GroupButton;
