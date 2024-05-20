'use server';

import {deleteRowAndCells, editAdRate} from '@/lib/data';
import { addAdRate } from '@/lib/data';
import {revalidatePath} from "next/cache";

export const deleteAdRate = async (item: any) => {
  try {
    await deleteRowAndCells(item.id);
    console.log(`Ad rate ${item.id} deleted`);
  } catch (e) {
    console.error(e);
    console.log('Failed to delete ad rate');
  }
};

export const createAdRate = async (data: any) => {
  try {
    await addAdRate(data);
    console.log(`Ad rate id ${data.website} created`);
  } catch (e) {
    console.error(e);
    console.log('Failed to create ad rate');
  }
};

export const updateAdRate = async (data: any) => {
  try {
    await editAdRate(data);
    revalidatePath('/home');
    console.log(`Ad rate id ${data.id} updated`);
    } catch (e) {
    console.error(e);
    console.log('Failed to update ad rate');
  }
}