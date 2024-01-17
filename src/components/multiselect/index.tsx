import { forwardRef } from 'react';
import { MultiSelect } from 'react-multi-select-component';
import { TSelect } from '../select';
import styles from './style.module.scss';

const Multiselect = forwardRef(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ label, options, isMark, error, ...props }: TSelect, _ref) => {
    return (
      <div className='w-full'>
        <div className='label'>
          <span className='label-text'>
            {isMark && <span className='text-red-600'>*</span>}
            {label}
          </span>
        </div>
        <MultiSelect
          className={styles.item}
          value={[]}
          options={options}
          labelledBy='Select'
          {...props}
        />
        {/* Validation */}
        <div className='label'>
          {error && (
            <span className='label-text-alt text-red-600'>
              This field must have at least 1 items
            </span>
          )}
        </div>
      </div>
    );
  }
);

export default Multiselect;
