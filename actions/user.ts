"use server"
import {deleteUser} from "@/lib/data";
import {revalidatePath} from "next/cache";

export const deleteUserByEmail = async (email: string) => {
    try {
        await deleteUser(email);
        revalidatePath('/admin', 'page');
    } catch (e) {
        console.error(e);
        console.log('Failed to delete user');
    }
}