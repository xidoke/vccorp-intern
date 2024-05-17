'use server';

import {LoginSchema, RegisterSchema} from '@/schemas';
import bcrypt from "bcryptjs";
import {createUserInDb, getUserByEmail, getUserByUsername} from "@/lib/data";
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
    const { username, password, email} = validateFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
        return { error: 'Email already in use!' };
    }
    const existingUsername = await getUserByUsername(username)
    if (existingUsername) {
        return { error: 'Username already in use!' };
    }
    await createUserInDb(email, username, hashedPassword)

    // TODO: Send email verification

    return { success: 'User created' };
}