import Button from '.';

type TGroupButton = {
  isEditing?: boolean;
  onClose?: () => void;
  variantNo?: 'default' | 'outline' | 'secondary' | 'ghost';
  variantYes?: 'default' | 'outline' | 'secondary' | 'ghost';
  disabledYes?: boolean;
};

const GroupButton = ({
  isEditing,
  onClose,
  variantNo = 'default',
  variantYes = 'default',
  disabledYes,
}: TGroupButton) => {
  return (
    <div className='flex justify-center items-center gap-2'>
      {onClose && (
        <Button
          variant={variantNo}
          type='button'
          onClick={onClose}
          title='Cancel'
        />
      )}
      <Button
        disabled={disabledYes}
        variant={variantYes}
        type='submit'
        title={isEditing ? 'Update' : 'Save'}
      />
    </div>
  );
};

export default GroupButton;
