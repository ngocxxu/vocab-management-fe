type TConfirmButton = {
  onNo: () => void;
  onYes: () => void;
  title: string;
};

const ConfirmButton = ({ onNo, onYes, title }: TConfirmButton) => {
  return (
    <>
      <div className='whitespace-nowrap mb-2'>{title}</div>
      <div className='flex justify-center items-center gap-2'>
        <button className='btn btn-active btn-sm' onClick={onNo}>
          No
        </button>
        <button className='btn btn-active btn-neutral btn-sm' onClick={onYes}>
          Yes
        </button>
      </div>
    </>
  );
};

export default ConfirmButton;
