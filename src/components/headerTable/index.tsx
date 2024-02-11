import { ReactNode } from 'react';

type THeaderTable = {
  children: ReactNode;
  headText: string;
  bodyText: ReactNode;
};

const HeaderTable = ({ children, headText, bodyText }: THeaderTable) => {
  return (
    <div className='my-10'>
      <div className='container bg-white mx-auto rounded-md p-8 border-t shadow-md'>
        <h4 className='font-semibold'>{headText}</h4>
        <p className='text-sm text-customGray mb-6'>{bodyText}</p>

        {children}
      </div>
    </div>
  );
};

export default HeaderTable;
