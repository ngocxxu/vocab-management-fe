import { IconBell } from "@tabler/icons-react";
import UserButton from "../button/UserButton";
import DropDownCustom from "../dropdown";
import "./style.scss";
import IconVocab from "@/assets/svg/IconVocab";

const list = [
  {
    body: "Item 1",
  },
  {
    body: "Item 2",
  },
];

const HeaderTop = () => {
  return (
    <div className="header-top bg-customBlue  text-white">
      <div className="container mx-auto">
        <div className="header-top-inner flex justify-between">
          <p className="header-top-inner-title my-auto">
            <IconVocab />
          </p>
          <div className="flex justify-center items-center gap-6">
            <DropDownCustom
              label="Announcement"
              head={<IconBell />}
              list={list}
            />
            <UserButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
