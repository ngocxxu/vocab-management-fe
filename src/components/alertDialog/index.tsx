import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogLib,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { AlertDialogProps } from '@radix-ui/react-alert-dialog';
import { ReactNode } from 'react';

type TAlertDialog = {
  head?: ReactNode;
  title?: string;
  onYes?: () => void;
  onNo?: () => void;
  content?: string;
  titleBtn?: string;
};

export function AlertDialog({
  head,
  title = 'Do you want to delete?',
  content = 'This action cannot be undone. This will permanently delete and remove your data from our servers.',
  onYes,
  onNo,
  open,
  onOpenChange,
  titleBtn = 'Delete',
}: TAlertDialog & AlertDialogProps) {
  return (
    <AlertDialogLib open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>{head}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{content}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onNo}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onYes}>{titleBtn}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogLib>
  );
}
