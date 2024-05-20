'use server';

import { LoginSchema } from '@/schemas';
import { signIn } from '@/auth';
import { redirect } from 'next/navigation';

export const login = async (values: any) => {
  const validateFields = LoginSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: 'Invalid fields' };
  }
  return { success: 'success' };
};

export const actionSignIn = async (provider: string) => {
  await signIn(provider).then(() => {
    redirect('/test');
  });
};
