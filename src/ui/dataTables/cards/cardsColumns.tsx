import { ColumnDef } from '@tanstack/react-table';
import { CardResponseDto } from '@/api/response/cards';

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
    header: 'Position',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'active',
    header: 'Active',
    cell: (info) => (info.getValue() ? 'Yes' : 'No'),
  },
];