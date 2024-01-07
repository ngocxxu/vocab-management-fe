import dayjs from 'dayjs';

const Footer = () => {
  return (
    <footer className='footer footer-center p-4 bg-base-300 text-base-content'>
      <aside>
        <p>Copyright © {dayjs().year()} - Ngoc Quach</p>
      </aside>
    </footer>
  );
};

export default Footer;
