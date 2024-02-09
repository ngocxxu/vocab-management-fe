import { ReactNode } from 'react';
import { AvatarFallback, AvatarLib } from '../ui/avatar';
import { AvatarProps } from '@radix-ui/react-avatar';
import clsx from 'clsx';

type TAvatar = {
  children: ReactNode;
  classNameContent?: string;
};

const Avatar = ({
  children,
  classNameContent,
  ...props
}: TAvatar & AvatarProps) => {
  return (
    <AvatarLib {...props}>
      <AvatarFallback className={clsx(classNameContent)}>
        {children}
      </AvatarFallback>
    </AvatarLib>
  );
};

export default Avatar;
