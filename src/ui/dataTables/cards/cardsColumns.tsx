import { ColumnDef } from '@tanstack/react-table';
import { CardResponseDto } from '@/api/response/cards';
import { Button } from '@/components/ui/button';

interface CardsColumnsProps {
  setCurrentCard: (card: CardResponseDto) => void;
  setDialogTitle: (title: string) => void;
  setDialogDescription: (description: string) => void;
  setDialogButtonText: (text: string) => void;
  setDialogOpen: (open: boolean) => void;
}

export const cardsColumns = ({
  setCurrentCard,
  setDialogTitle,
  setDialogDescription,
  setDialogButtonText,
  setDialogOpen,
}: CardsColumnsProps): ColumnDef<CardResponseDto>[] => [
  {
    accessorKey: 'cardNumber',
    header: 'Card Number',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'firstName',
    header: 'First Name',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'cardStatus',
    header: 'Card Status',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const card = row.original;

      const handleBlockUnblock = () => {
        setCurrentCard(card);
        setDialogTitle(
          card.cardStatus === 'Blocked'
            ? 'Confirm Unblocking the Card'
            : 'Confirm Blocking the Card'
        );
        setDialogDescription(
          card.cardStatus === 'Blocked'
            ? 'Are you sure you want to unblock the card'
            : 'Are you sure you want to block the card'
        );
        setDialogButtonText(
          card.cardStatus === 'Blocked' ? 'Unblock' : 'Block'
        );
        setDialogOpen(true);
      };

      const handleDeactivate = () => {
        setCurrentCard(card);
        setDialogTitle('Confirm Deactivating the Card');
        setDialogDescription('Are you sure you want to deactivate the card');
        setDialogButtonText('Deactivate');
        setDialogOpen(true);
      };

      return (
        <div className="flex space-x-2">
          <Button
            variant={card.cardStatus === 'Blocked' ? 'default' : 'destructive'}
            onClick={handleBlockUnblock}
          >
            {card.cardStatus === 'Blocked' ? 'Unblock' : 'Block'}
          </Button>
          <Button
            variant="destructive"
            onClick={handleDeactivate}
            disabled={card.cardStatus === 'Deactivated'}
          >
            Deactivate
          </Button>
        </div>
      );
    },
  },
];
