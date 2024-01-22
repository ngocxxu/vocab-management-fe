type TGroupButton = {
  isEditing: boolean;
  onClose: () => void;
};

const GroupButton = ({ isEditing, onClose }: TGroupButton) => {
  return (
    <div className="flex justify-center items-center gap-2">
      <button type="button" onClick={onClose} className="btn">
        Close
      </button>
      <button className="btn btn-neutral" type="submit">
        {isEditing ? "Update" : "Save"}
      </button>
    </div>
  );
};

export default GroupButton;
