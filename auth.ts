import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import Credentials from "@auth/core/providers/credentials";
import {ZodError} from "zod";
import {LoginSchema, RegisterSchema} from "@/schemas";


const prisma = new PrismaClient()

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Credentials({
            credentials: {
                type: {}, // 'login' or 'register'
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                try {
                    let user = null

                    // Check the type of the request
                    if (credentials.type === 'login') {
                        const { username, password } = await LoginSchema.parseAsync(credentials)
                        // logic to salt and hash password
                        const pwHash = saltAndHashPassword(password)
                        // logic to verify if user exists
                        user = await getUserFromDb(email, pwHash)
                    } else if (credentials.type === 'register') {
                        const { email, username, password } = await RegisterSchema.parseAsync(credentials)
                        // logic to salt and hash password
                        const pwHash = saltAndHashPassword(password)
                        // logic to create a new user
                        user = await createUserInDb(email, username, pwHash)
                    }

                    if (!user) {
                        throw new Error("User not found.")
                    }

                    // return json object with the user data
                    return user
                } catch (error) {
                    if (error instanceof ZodError) {
                        // Return `null` to indicate that the credentials are invalid
                        return null
                    }
                }
            },
        }),
    ],
})