import { FieldError } from 'react-hook-form';
import { TOption } from '../../utils/types';
import { LegacyRef, forwardRef } from 'react';

export type TSelect = {
  isMark?: boolean;
  label: string;
  options: TOption[];
  error?: FieldError | null;
};
const Select = forwardRef(
  ({ label, isMark = false, options, error, ...props }: TSelect, ref) => {
    return (
      <label className='form-control w-full'>
        <div className='label'>
          <span className='label-text'>
            {isMark && <span className='text-red-600'>*</span>}
            {label}
          </span>
        </div>
        <select
          ref={ref as LegacyRef<HTMLSelectElement>}
          className='select select-bordered select-sm w-full'
          {...props}
        >
          {options.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        {/* Validation */}
        <div className='label'>
          {error && (
            <span className='label-text-alt text-red-600'>{error.message}</span>
          )}
        </div>
      </label>
    );
  }
);

export default Select;
