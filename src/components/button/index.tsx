import { ButtonHTMLAttributes, ReactNode } from 'react';

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
    <button className={`btn ${classNames}`} {...props}>
      {leftIcon && leftIcon}
      {title}
      {rightIcon && rightIcon}
    </button>
  );
};

export default Button;
