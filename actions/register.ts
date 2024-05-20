'use server';
import { RegisterSchema } from '@/schemas';
import bcrypt from 'bcryptjs';
import {
  createUserInDb,
  getUserByEmail,
  getUserByUsername,
  updateUsernameAndPassword,
} from '@/lib/data';

export const register = async (values: any) => {
  const validateFields = RegisterSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: 'Invalid fields' };
  }
  const { username, password, email } = validateFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    if (existingUser.username || existingUser.password)
      return { error: 'Email already in use!' };
    else {
      await updateUsernameAndPassword(email, username, hashedPassword);
      return { success: 'User created (updated existing user)' };
    }
  }
  const existingUsername = await getUserByUsername(username);
  if (existingUsername) {
    return { error: 'Username already in use!' };
  }
  await createUserInDb(email, username, hashedPassword);

  // TODO: Send email verification
  return { success: 'User created' };
};
