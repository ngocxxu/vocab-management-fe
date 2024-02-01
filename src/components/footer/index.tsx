import dayjs from "dayjs";

const Footer = () => {
  return (
    <footer className="text-sm p-3 bg-customBlue text-white relative right-0 bottom-0 text-center">
      <aside>
        <p>Copyright © {dayjs().year()} - Developer: Bono - Design: Ranie</p>
      </aside>
    </footer>
  );
};

export default Footer;
