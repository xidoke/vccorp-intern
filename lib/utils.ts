import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// salt and hash password by bcrypt
export function saltAndHashPassword(password: string) {
  // use bcrypt to salt and hash password
}