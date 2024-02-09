import { format } from 'date-fns';

const Footer = () => {
  return (
    <footer className='text-sm p-3 bg-customBlue text-white relative right-0 bottom-0 text-center'>
      <aside>
        <p>
          Copyright © {format(new Date(), 'yyyy')} - Developer: Bono - Design:
          Ranie
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
