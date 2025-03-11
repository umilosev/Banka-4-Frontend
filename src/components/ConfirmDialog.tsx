import { MaybePromise } from '@/types/MaybePromise';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

export type ConfirmDialogProps = {
  open: boolean;
  onConfirm: () => MaybePromise<unknown>;
  onCancel?: () => MaybePromise<unknown>;
  title: string;
  description: string;
  buttonText: string;
  itemName?: string;
};

export const ConfirmDialog = ({
  open,
  onConfirm,
  onCancel,
  title,
  description,
  buttonText,
  itemName,
}: ConfirmDialogProps) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description} {itemName ? `"${itemName}"` : 'this item'}? This
            action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button type="button" variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={onConfirm} variant="destructive">
              {buttonText}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
