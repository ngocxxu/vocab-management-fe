import { ButtonHTMLAttributes, ReactNode } from "react";
import { ButtonLib } from "@/components/ui/button";

type TButton = {
  title?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  classNames?: string;
};

const Button = ({
  title,
  leftIcon,
  rightIcon,
  classNames,
  ...props
}: TButton & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <ButtonLib className={`btn ${classNames}`} {...props}>
      {leftIcon && leftIcon}
      {title}
      {rightIcon && rightIcon}
    </ButtonLib>
  );
};

export default Button;
