import { BadgeLib } from "../ui/badge";

type TBadge = {
  variant: "secondary" | "destructive" | "outline";
  title: string;
};

export const Badge = ({ variant, title }: TBadge) => {
  return <BadgeLib variant={variant}>{title}</BadgeLib>;
};
