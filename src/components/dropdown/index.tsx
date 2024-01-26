import { Fragment, ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type DropdownCustom = {
  head: ReactNode;
  label: string;
  list: {
    icon?: ReactNode;
    body: ReactNode;
    separator?: boolean;
  }[];
};

const DropDownCustom = ({ head, list, label }: DropdownCustom) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{head}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {list.map(({ body, separator }) => (
          <Fragment key={body?.toString()}>
            <DropdownMenuItem>{body}</DropdownMenuItem>
            {separator && <DropdownMenuSeparator />}
          </Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDownCustom;
