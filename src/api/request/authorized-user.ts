import { Gender } from '@/types/gender';

export interface AuthorizedUserDto {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: Gender;
  email: string;
  phoneNumber: string;
  address: string;
}
