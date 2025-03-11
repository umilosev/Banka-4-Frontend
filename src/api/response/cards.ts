import { Pageable } from '@/types/pageable';

export interface CardResponseDto {
    cardNumber:string;
    cvv:string;
    cardName:string;
    creationDate:string;
    expirationDate:string;
    cardType:string;
    limit:number;
    cardStatus:string;
    accountNumber:string;
}

export type EmployeeCardResponseDto = Pageable<CardResponseDto>;
