import { PrismaClient, Platform } from '@prisma/client';
import adRates from './adrate/adrates.json';
import { ObjectId } from 'bson';

const prisma = new PrismaClient();

async function main() {}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
