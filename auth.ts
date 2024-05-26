import NextAuth from 'next-auth';
import authConfig from '@/auth.config';
import {PrismaAdapter} from '@auth/prisma-adapter';
import {db} from '@/lib/db';
import Credentials from 'next-auth/providers/credentials';
import {getUserFromDb} from "@/lib/data";
import bcrypt from 'bcryptjs';
import {LoginSchema} from "@/schemas";

export const {
    handlers: {GET, POST},
    signIn,
    signOut,
    auth,
} = NextAuth({
    adapter: PrismaAdapter(db),
    session: {
        strategy: 'jwt',
        updateAge: 24 * 60 * 60,
    },
    // session: {strategy: "jwt"},
    ...authConfig,
    providers: [
        ...authConfig.providers,
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = LoginSchema.safeParse(credentials);
                if (parsedCredentials.success) {
                    const {username, password} = parsedCredentials.data;
                    const user = await getUserFromDb(username);
                    if (!user) return null;
                    const passwordsMatch = await bcrypt.compare(password, user.password!!);

                    if (passwordsMatch) return user;
                }

                console.log('Invalid credentials');
                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                // @ts-ignore
                token.isSuperAdmin = user.isSuperAdmin;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                // @ts-ignore
                session.user.isSuperAdmin = token.isSuperAdmin;
            }
            return session;
        },
    },
});
