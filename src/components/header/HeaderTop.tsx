import { IconBell } from "@tabler/icons-react";
import UserButton from "../button/UserButton";
import DropDownCustom from "../dropdown";
import "./style.scss";
import IconVocab from "@/assets/svg/IconVocab";
import { HeaderMenu } from "./HeaderMenu";

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
    <div className="header-top bg-customBlue text-white">
      <div className="container mx-auto">
        <div className="header-top-inner flex justify-between">
          <div className="flex justify-between gap-10">
            <p className="header-top-inner-title my-auto">
              <IconVocab />
            </p>
            <HeaderMenu />
          </div>
          <div className="flex justify-center items-center gap-6">
            <DropDownCustom
              align="end"
              side="bottom"
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
