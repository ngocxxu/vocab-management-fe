import dayjs from "dayjs";

const Footer = () => {
  return (
    <footer className="footer footer-center p-4 bg-gray-300 text-base-content relative right-0 bottom-0 text-center">
      <aside>
        <p>Copyright © {dayjs().year()} - Ngoc Quach</p>
      </aside>
    </footer>
  );
};

export default Footer;
