import { EmployeeCardResponseDto } from './response/cards';
import { Axios } from 'axios';

export const searchCards = async (
  client: Axios,
  filters: {
    cardNumber: string;
    firstName: string;
    lastName: string;
    email: string;
    cardStatus: string;
  },
  rowsPerPage: number,
  currentPage: number
) => {
  return client.get<EmployeeCardResponseDto>('/cards/employee/search', {
    params: { ...filters, size: rowsPerPage, page: currentPage },
  });
};

export const blockCard = async (client: Axios, cardNumber: string) =>
  client.put<void>(`cards/block/${cardNumber}`);

export const unblockCard = async (client: Axios, cardNumber: string) =>
  client.put<void>(`cards/unblock/${cardNumber}`);

export const deactivateCard = async (client: Axios, cardNumber: string) =>
  client.put<void>(`cards/deactivate/${cardNumber}`);

export interface CardFilter {
  cardNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  cardStatus: string;
}
