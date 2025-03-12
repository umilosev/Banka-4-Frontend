'use client';

import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import { useHttpClient } from '@/context/HttpClientContext';
import { useBreadcrumb } from '@/context/BreadcrumbContext';
import GuardBlock from '@/components/GuardBlock';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  searchCards,
  blockCard,
  unblockCard,
  deactivateCard,
  CardFilter,
} from '@/api/cards';
import { DataTable } from '@/components/dataTable/DataTable';
import { cardsColumns } from '@/ui/dataTables/cards/cardsColumns';
import useTablePageParams from '@/hooks/useTablePageParams';
import { FilterBar, FilterDefinition } from '@/components/filters/FilterBar';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { CardResponseDto } from '@/api/response/cards';
import {} from '@/api/cards';
import { toastRequestError } from '@/api/errors';
import { toast } from 'sonner';

const EmployeeManageCardsPage: React.FC = () => {
  const { page, pageSize, setPage, setPageSize } = useTablePageParams('cards', {
    pageSize: 8,
    page: 0,
  });

  const [cardFilter, setCardFilter] = useState<CardFilter>({
    cardNumber: '',
    firstName: '',
    lastName: '',
    email: '',
    cardStatus: '',
  });
  const cardFilterColumns: Record<keyof CardFilter, FilterDefinition> = {
    cardNumber: {
      filterType: 'string',
      placeholder: 'Enter card number',
    },
    firstName: {
      filterType: 'string',
      placeholder: 'Enter first name',
    },
    lastName: {
      filterType: 'string',
      placeholder: 'Enter last name',
    },
    email: {
      filterType: 'string',
      placeholder: 'Enter email',
    },
    cardStatus: {
      filterType: 'string',
      placeholder: 'Enter card status',
    },
  };

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogDescription, setDialogDescription] = useState('');
  const [dialogButtonText, setDialogButtonText] = useState('');
  const [currentCard, setCurrentCard] = useState<CardResponseDto | null>(null);
  const [undoable, setUndoable] = useState(false);

  const { mutate: doBlock } = useMutation({
    mutationKey: ['card', currentCard?.cardNumber],
    mutationFn: async (cardNumber: string) => blockCard(client, cardNumber),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['card'],
        exact: false,
      });
      toast('Card blocked successfully');
    },
    onError: (error) => toastRequestError(error),
  });

  const { mutate: doUnblock } = useMutation({
    mutationKey: ['card', currentCard?.cardNumber],
    mutationFn: async (cardNumber: string) => unblockCard(client, cardNumber),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['card'],
        exact: false,
      });
      toast('Card blocked successfully');
    },
    onError: (error) => toastRequestError(error),
  });

  const handleBlockUnblock = (card: CardResponseDto) => {
    setCurrentCard(card);
    setUndoable(false);
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
    setDialogButtonText(card.cardStatus === 'Blocked' ? 'Unblock' : 'Block');
    setDialogOpen(true);
  };

  const handleDeactivate = (card: CardResponseDto) => {
    setUndoable(true);
    setCurrentCard(card);
    setDialogTitle('Confirm Deactivating the Card');
    setDialogDescription('Are you sure you want to deactivate the card');
    setDialogButtonText('Deactivate');
    setDialogOpen(true);
  };

  const { mutate: doDeactivate } = useMutation({
    mutationKey: ['card', currentCard?.cardNumber],
    mutationFn: async (cardNumber: string) =>
      deactivateCard(client, cardNumber),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['card'],
        exact: false,
      });
      toast('Card blocked successfully');
    },
    onError: (error) => toastRequestError(error),
  });

  const client = useHttpClient();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['card', page, pageSize, cardFilter],
    queryFn: async () => {
      const response = await searchCards(client, cardFilter, pageSize, page);
      return response.data;
    },
  });

  const { dispatch } = useBreadcrumb();
  useEffect(() => {
    dispatch({
      type: 'SET_BREADCRUMB',
      items: [
        { title: 'Home', url: '/e' },
        { title: 'Cards', url: '/e/cards' },
      ],
    });
  }, [dispatch]);

  const handleConfirm = async () => {
    if (currentCard) {
      try {
        console.log(
          `Performing action: ${dialogButtonText} on card: ${currentCard.cardNumber}`
        );
        if (dialogButtonText === 'Block') {
          doBlock(currentCard.cardNumber);
        } else if (dialogButtonText === 'Unblock') {
          doUnblock(currentCard.cardNumber);
        } else if (dialogButtonText === 'Deactivate') {
          doDeactivate(currentCard.cardNumber);
        }
      } catch (error) {
        toastRequestError(error);
      } finally {
        setCurrentCard(null);
        setDialogOpen(false);
      }
    }
  };

  const handleCancel = () => {
    setCurrentCard(null);
    setDialogOpen(false);
  };

  return (
    <GuardBlock requiredUserType={'employee'}>
      <div className="p-8">
        <Card className="max-w-[900px] mx-auto">
          <CardHeader>
            <h1 className="text-2xl font-bold">Cards Overview</h1>
            <CardDescription>
              This table provides a clear and organized overview of all cards in
              the bank and key details about them.
            </CardDescription>
            <FilterBar<CardFilter, typeof cardFilterColumns>
              onSubmit={(filter) => {
                setPage(0);
                setCardFilter(filter);
              }}
              filter={cardFilter}
              columns={cardFilterColumns}
            />
          </CardHeader>
          <CardContent className="rounded-lg overflow-hidden">
            <DataTable
              columns={cardsColumns({
                handleBlockUnblock,
                handleDeactivate,
              })}
              data={data?.content ?? []}
              isLoading={isLoading}
              pageCount={data?.page.totalPages ?? 0}
              pagination={{ page: page, pageSize }}
              onPaginationChange={(newPagination) => {
                setPage(newPagination.page);
                setPageSize(newPagination.pageSize);
              }}
            />
          </CardContent>
        </Card>
      </div>
      <ConfirmDialog
        open={dialogOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        title={dialogTitle}
        description={dialogDescription}
        buttonText={dialogButtonText}
        itemName={currentCard?.cardNumber}
        undoable={undoable}
      />
    </GuardBlock>
  );
};

export default EmployeeManageCardsPage;
