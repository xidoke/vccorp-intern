'use server';

import {LoginSchema} from '@/schemas';
import {signIn} from '@/auth';
import {AuthError} from "next-auth";
import {z} from "zod";

export const authenticate = async (formData:  z.infer<typeof LoginSchema>) => {
    try {
        await signIn('credentials', formData);
        console.log('Successfully signed in.')
        return {success: 'Successfully signed in.'};
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return {error: 'Invalid credentials.'};
                default:
                    return {error: 'Invalid fields'};
            }
        } else
            throw error;
    }
};

export const actionSignIn = async (provider: string) => {
    await signIn(provider).then(() => {
    });
};
