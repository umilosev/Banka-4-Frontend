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
import { useQuery } from '@tanstack/react-query';
import { searchCards } from '@/api/employee';
import { DataTable } from '@/components/dataTable/DataTable';
import { cardsColumns } from '@/ui/dataTables/cards/cardsColumns';
import useTablePageParams from '@/hooks/useTablePageParams';
import FilterBar from '@/components/filters/FilterBar';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { CardResponseDto } from '@/api/response/cards';


interface CardFilter {
  cardNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  cardStatus: string;
}

const cardFilterKeyToName = (key: keyof CardFilter): string => {
  switch (key) {
    case 'cardNumber':
      return 'Card Number';
    case 'firstName':
      return 'First Name';
    case 'lastName':
      return 'Last Name';
    case 'email':
      return 'Email';
    case 'cardStatus':
      return 'Card Status';
  }
};

const EmployeeManageCardsPage: React.FC = () => {
  const { page, pageSize, setPage, setPageSize } = useTablePageParams(
    'cards',
    { pageSize: 8, page: 0 }
  );

  const [searchFilter, setSearchFilter] = useState<CardFilter>({
    cardNumber: '',
    firstName: '',
    lastName: '',
    email: '',
    cardStatus: '',
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogDescription, setDialogDescription] = useState('');
  const [dialogButtonText, setDialogButtonText] = useState('');
  const [currentCard, setCurrentCard] = useState<CardResponseDto | null>(null);

  const router = useRouter();
  const client = useHttpClient();

  const { data, isLoading } = useQuery({
    queryKey: ['card', page, pageSize, searchFilter],
    queryFn: async () => {
      const response = await searchCards(
        client,
        searchFilter,
        pageSize,
        page
      );
      return response.data;
    },
  });

  const { dispatch } = useBreadcrumb();
  useEffect(() => {
    dispatch({
      type: 'SET_BREADCRUMB',
      items: [
        { title: 'Home', url: '/e' },
        { title: 'Cards', url: '/e/employee/cards' },
      ],
    });
  }, [dispatch]);

  const handleConfirm = async () => {
    if (currentCard) {
      
      if (dialogButtonText === 'Block') {
        // Block poziv
      } else if (dialogButtonText === 'Unblock') {
        // Unblock poziv
      } else if (dialogButtonText === 'Deactivate') {
        // Deactivate poziv
      }
      setDialogOpen(false);
    }
  };

  const handleCancel = () => {
    setDialogOpen(false);
  };

  return (
    <GuardBlock requiredUserType={'employee'}>
      <div className="p-8">
        <Card className="max-w-[900px] mx-auto">
          <CardHeader>
            <h1 className="text-2xl font-bold">Cards Overview</h1>
            <CardDescription>
              This table provides a clear and organized overview of all cards in the bank
              and key details about them.
            </CardDescription>
            <FilterBar<CardFilter>
              filterKeyToName={cardFilterKeyToName}
              onSearch={(filter) => {
                setPage(0);
                setSearchFilter(filter);
              }}
              filter={searchFilter}
            />
          </CardHeader>
          <CardContent className="rounded-lg overflow-hidden">
            <DataTable
              onRowClick={(row) => {
                // router.push(`/e/employee/${row.original.id}/edit`)
              }}
              columns={cardsColumns({
                setCurrentCard,
                setDialogTitle,
                setDialogDescription,
                setDialogButtonText,
                setDialogOpen,
              })}
              data={data?.content ?? [] }
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
      />
    </GuardBlock>
  );
};

export default EmployeeManageCardsPage;