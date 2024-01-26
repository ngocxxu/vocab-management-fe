import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogLib,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode } from "react";

type TDialog = {
  head: ReactNode;
  body: ReactNode;
  foot: ReactNode;
  label: string;
};

export function Dialog({ head, foot, label, body }: TDialog) {
  return (
    <DialogLib>
      <DialogTrigger asChild>{head}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{label}</DialogTitle>
          <DialogDescription>{body}</DialogDescription>
        </DialogHeader>
        <DialogFooter>{foot}</DialogFooter>
      </DialogContent>
    </DialogLib>
  );
}
