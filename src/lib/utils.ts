import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? '/undefined/api';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
