'use server';

import {LoginSchema, RegisterSchema} from '@/schemas';

export const login = async (values: any) => {
  const validateFields = LoginSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: 'Invalid fields' };
  }

  return { success: 'success' };
};

export const register = async (values: any) => {
    const validateFields = RegisterSchema.safeParse(values);

    if (!validateFields.success) {
        return { error: 'Invalid fields' };
    }

    return { success: 'success' };
}