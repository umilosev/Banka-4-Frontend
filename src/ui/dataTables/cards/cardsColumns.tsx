import { ColumnDef } from '@tanstack/react-table';
import { CardResponseDto } from '@/api/response/cards';
import { Button } from '@/components/ui/button';

export const cardsColumns: ColumnDef<CardResponseDto>[] = [
  {
    accessorKey: 'cardNumber',
    header: 'Card Name',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'firstName',
    header: 'Last Name',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'lastName',
    header: 'Email',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'email',
    header: 'Phone Number',
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
    cell: ({ row }) => (
      <div className="flex space-x-2">
          <Button
            variant="default"
            onClick={() => {}}
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              // Handle delete action
            }}
          >
            Deactivate
          </Button>
      </div>
    ),
  },
];