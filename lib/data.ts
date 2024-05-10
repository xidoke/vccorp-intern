import {Header, PrismaClient, Type} from '@prisma/client';
import {RowIncludeAll, TypeIncludeHeaders} from "@/lib/definetions";

export async function fetchAdRateTypesCount(): Promise<number> {
  const prisma = new PrismaClient();
  try {
    return await prisma.type.count();
  } catch (e) {
    console.error(e);
    console.log('Failed to fetch ad rate types count');
    return 0;
  } finally {
    await prisma.$disconnect();
  }
}

export async function fetchAllType(): Promise<(TypeIncludeHeaders)[]> {
  const prisma = new PrismaClient();
  try {
    return await prisma.type.findMany(
        {
            include: {
              headers: true,
            }
        }
    );
  } catch (e) {
    console.error(e);
    console.log('Failed to fetch type');
    return [];
  } finally {
    await prisma.$disconnect();
  }
}


export async function fetchRowWithTypeId(typeid : string) {
  const prisma = new PrismaClient();
  try {
    return await prisma.row.findMany({
      where: {
        typeId: typeid,
      },
      include: {
        website: true,
        position: {
          include: {
            demoList: true,
          },
        },
        cells: {
          include: {
            // header: true,
          }
        },
      },
    });
  } catch (e) {
    console.error(e);
    console.log('Failed to fetch ad rate with type');
    return [];
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteRowAndCells(rowId : string) {
  const prisma = new PrismaClient();
  try {
    // Delete cells that belong to the row
    await prisma.cell.deleteMany({
      where: {
        rowId: rowId,
      },
    });

    // Delete the row
    return await prisma.row.delete({
      where: {
        id: rowId,
      },
    });
  } catch (e) {
    console.error(e);
    console.log('Failed to delete row and cells');
    return null;
  } finally {
    await prisma.$disconnect();
  }
}