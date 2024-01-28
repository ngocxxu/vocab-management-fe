import { BadgeLib, BadgeProps } from "../ui/badge";

export const Badge = ({ children, ...props }: BadgeProps) => {
  return <BadgeLib {...props}>{children}</BadgeLib>;
};
