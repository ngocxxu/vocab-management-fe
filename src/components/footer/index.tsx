import dayjs from "dayjs";

const Footer = () => {
  return (
    <footer className="footer footer-center p-3 bg-customBlue text-white relative right-0 bottom-0 text-center">
      <aside>
        <p>Copyright © {dayjs().year()} - Dev: Bono - Design: Ranie</p>
      </aside>
    </footer>
  );
};

export default Footer;
