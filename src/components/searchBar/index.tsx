import { IconSearch } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';
import './style.scss';

type TSearchBar = {
  onSearch: (input: string) => void;
  defaultValue: string;
};

export const SearchBar = ({ onSearch, defaultValue }: TSearchBar) => {
  const [input, setInput] = useState(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === 'Enter') {
      onSearch(input);
    }
  };

  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  useEffect(() => {
    if (defaultValue === '') {
      clearInput();
    }
  }, [defaultValue]);

  return (
    <div className='search-box'>
      <button type='button' className='btn-search'>
        <IconSearch />
      </button>
      <input
        ref={inputRef}
        defaultValue={defaultValue}
        onKeyDown={handleKeyDown}
        onChange={(e) => setInput(e.target.value)}
        type='text'
        className='input-search'
        placeholder='Search...'
      />
    </div>
  );
};
