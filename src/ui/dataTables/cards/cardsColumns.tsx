import { ColumnDef } from '@tanstack/react-table';
import { CardResponseDto } from '@/api/response/cards';
import { Button } from '@/components/ui/button';

interface CardsColumnsProps {
  handleBlockUnblock: (card: CardResponseDto) => void;
  handleDeactivate: (card: CardResponseDto) => void;
}

export const cardsColumns = ({
  handleBlockUnblock,
  handleDeactivate,
}: CardsColumnsProps): ColumnDef<CardResponseDto>[] => [
  {
    accessorKey: 'cardNumber',
    header: 'Card Number',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'client.firstName',
    header: 'First Name',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'client.lastName',
    header: 'Last Name',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'client.email',
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

      return (
        <div className="flex space-x-2">
          <Button
            variant={card.cardStatus === 'Blocked' ? 'default' : 'destructive'}
            onClick={() => handleBlockUnblock(card)}
          >
            {card.cardStatus === 'Blocked' ? 'Unblock' : 'Block'}
          </Button>
          <Button
            variant="destructive"
            onClick={() => handleDeactivate(card)}
            disabled={card.cardStatus === 'Deactivated'}
          >
            Deactivate
          </Button>
        </div>
      );
    },
  },
];
