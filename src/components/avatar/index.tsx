import { AvatarFallback, AvatarImage, AvatarLib } from "../ui/avatar";

const Avatar = () => {
  return (
    <AvatarLib>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>Ranie</AvatarFallback>
    </AvatarLib>
  );
};

export default Avatar;
