import { Fragment, ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";

type DropdownCustom = {
  head: ReactNode;
  label: string;
  list: {
    icon?: ReactNode;
    body: ReactNode;
    separator?: boolean;
  }[];
};

const DropDownCustom = ({
  head,
  list,
  label,
  ...props
}: DropdownCustom &
  DropdownMenuProps &
  DropdownMenuPrimitive.DropdownMenuContentProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{head}</DropdownMenuTrigger>
      <DropdownMenuContent {...props}>
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
