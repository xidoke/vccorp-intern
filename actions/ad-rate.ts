"use server"

import {deleteRowAndCells} from "@/lib/data";

export const deleteAdRate = async (item: any) => {
    try {
        await deleteRowAndCells(item.id)
    } catch (e) {
        console.error(e);
        console.log('Failed to delete ad rate');
    }
}