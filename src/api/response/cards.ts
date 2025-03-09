import { Pageable } from '@/types/pageable';

export interface CardResponseDto {
    id:string;
    type:string;
    cardName:string;
    creationDate:string;
    expirationDate:string;
    accountNumber:string;
    cvvCode:string;
    limit:number;
    status:string;
}

export type EmployeeOverviewResponseDto = Pageable<CardResponseDto>;
