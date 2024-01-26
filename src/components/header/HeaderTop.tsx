import { IconBell } from "@tabler/icons-react";
import UserButton from "../button/UserButton";
import DropDownCustom from "../dropdown";
import "./style.scss";

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
    <div className="header-top bg-neutral py-2">
      <div className="container mx-auto">
        <div className="header-top-inner flex justify-between">
          <p className="header-top-inner-title my-auto">VOCAB</p>
          <div className="flex justify-center items-center gap-6">
            <div className="indicator">
              <span className="indicator-item mt-3 mr-3 badge badge-error text-white">
                99+
              </span>
              <DropDownCustom
                label="Announcement"
                head={<IconBell />}
                list={list}
              />
            </div>
            <UserButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
