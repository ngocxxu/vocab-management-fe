import { IconBell } from "@tabler/icons-react";
import UserButton from "../button/UserButton";
import DropDownCustom from "../dropdown";
import "./style.scss";

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
                position="dropdown-end"
                classNameSummary="m-1 btn btn-outline border-neutral bg-neutral rounded-full"
                head={<IconBell className="text-white" />}
                list={
                  <ul className="shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                    <li>
                      <a>Item 1</a>
                    </li>
                    <li>
                      <a>Item 2</a>
                    </li>
                  </ul>
                }
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
