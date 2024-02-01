import {
  IconHistory,
  IconHome,
  IconMedal2,
  IconVocabulary,
} from "@tabler/icons-react";
import clsx from "clsx";
import { useLocation, useNavigate } from "react-router-dom";

const links = [
  { link: "/dashboard", label: "Dashboard", icon: IconHome },
  {
    link: "/vocab",
    label: "Vocabulary List",
    icon: IconVocabulary,
    // links: [
    //   { link: '/docs', label: 'Documentation' },
    //   { link: '/resources', label: 'Resources' },
    //   { link: '/community', label: 'Community' },
    //   { link: '/blog', label: 'Blog' },
    // ],
  },
  { link: "/vocab-trainer", label: "Vocab Trainer", icon: IconMedal2 },
  { link: "/history", label: "History", icon: IconHistory },
];

export function HeaderMenu() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const transformedPath = pathname.split("/").slice(0, 2).join("/");

  const items = links.map((link) => {
    return (
      <a
        key={link.label}
        href={link.link}
        onClick={(event) => {
          event.preventDefault();
          navigate(`${link.link}`);
        }}
      >
        <div className="flex justify-center items-center gap-2">
          <link.icon className="mb-1" size={18} />
          <p
            className={clsx("pb-1", {
              "border-b-2": transformedPath === link.link,
            })}
          >
            {link.label}
          </p>
        </div>
      </a>
    );
  });

  return (
    <div className="flex">
      <div className="flex justify-start items-center gap-8 sm:visible invisible ">
        {items}
      </div>

      {/* <label className="btn btn-circle swap swap-rotate visible sm:invisible">
          <Checkbox />
          <IconMenu2 className="swap-off fill-current" width="32" height="32" />
          <IconX className="swap-on fill-current" width="32" height="32" />
        </label> */}
    </div>
  );
}
