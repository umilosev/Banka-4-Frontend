import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { CardInfo } from '../../types/card';
import { Button } from '@/components/ui/button';
import { CardInfoForm } from './card-info-form';

export type CardInfoDialogProps = {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  item: CardInfo;
};

export const CardInfoDialog = ({
  open,
  onOpenChange,
  item,
}: CardInfoDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className={'text-2xl'}>Card Details</DialogTitle>
        </DialogHeader>
        <CardInfoForm {...item} />
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Close
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
