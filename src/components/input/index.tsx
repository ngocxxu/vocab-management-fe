import { LegacyRef, forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

type TInput = {
  isMark?: boolean;
  label: string;
  placeholder: string;
  error?: FieldError | null;
};

const Input = forwardRef(
  ({ label, isMark = false, placeholder, error, ...props }: TInput, ref) => {
    return (
      <label className='form-control w-full'>
        <div className='label'>
          <span className='label-text'>
            {isMark && <span className='text-red-600'>*</span>}
            {label}
          </span>
        </div>
        <input
          ref={ref as LegacyRef<HTMLInputElement>}
          type='text'
          placeholder={placeholder}
          className='input input-bordered input-sm w-full'
          {...props}
        />
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

export default Input;
