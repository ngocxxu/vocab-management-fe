import { ButtonHTMLAttributes, ReactNode } from "react";
import { ButtonLib, ButtonProps } from "@/components/ui/button";
import clsx from "clsx";

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
  variant = "default",
  ...props
}: TButton & ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps) => {
  return (
    <ButtonLib
      variant={variant}
      className={clsx(
        classNames,
        variant === "default" &&
          "bg-customBlue text-white hover:bg-customBlue2 hover:text-white"
      )}
      {...props}
    >
      {leftIcon && leftIcon}
      {title}
      {rightIcon && rightIcon}
    </ButtonLib>
  );
};

export default Button;
