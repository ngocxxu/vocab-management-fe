import { ButtonHTMLAttributes, ReactNode } from "react";
import { ButtonLib, ButtonProps } from "@/components/ui/button";

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
}: TButton & ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps) => {
  return (
    <ButtonLib className={classNames} {...props}>
      {leftIcon && leftIcon}
      {title}
      {rightIcon && rightIcon}
    </ButtonLib>
  );
};

export default Button;
