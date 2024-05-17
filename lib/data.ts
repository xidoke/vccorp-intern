import { Platform, PrismaClient} from '@prisma/client';
import { TypeIncludeHeaders} from "@/lib/definetions";
import { prisma } from '@/lib/prisma';
export async function fetchAdRateTypesCount(): Promise<number> {

  try {
    return await prisma.type.count();
  } catch (e) {
    console.error(e);
    console.log('Failed to fetch ad rate types count');
    return 0;
  }
}

export async function fetchAllType(): Promise<(TypeIncludeHeaders)[]> {

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
  }
}

//fetch type by typeid
export async function fetchTypeById(typeid : string): Promise<TypeIncludeHeaders | null> {

  try {
    return await prisma.type.findUnique({
      where: {
        id: typeid,
      },
      include: {
        headers: true,
      },
    });
  } catch (e) {
    console.error(e);
    console.log('Failed to fetch type by id');
    return null;
  }
}


export async function fetchRowWithTypeId(typeid : string) {

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
  }
}

export async function deleteRowAndCells(rowId : string) {

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
  }
}

export async function addAdRate(data: {
  website: string;
  position: string;
  dimension: string;
  platform: Platform;
  demoList: { display: string; url: string }[];
  [key: string]: any;
}): Promise<void> {

  try {
    // Check if the website already exists, if not, create it
    let website = await prisma.website.findUnique({
      where: { name: data.website },
    });

    if (!website) {
      website = await prisma.website.create({
        data: {
          name: data.website,
          url: data.website,
          description: '',
        },
      });
    }

    // Create a new position
    const position = await prisma.position.create({
      data: {
        websiteId: website.id,
        name: data.position,
        dimension: data.dimension,
        platform: data.platform,
        typeId: data.typeId,
      },
    });

    // Add demos to the position
    const demoPromises = data.demoList.map((demo) =>
        prisma.demo.create({
          data: {
            display: demo.display,
            url: demo.url,
            positionId: position.id,
          },
        })
    );
    await Promise.all(demoPromises);

    // Create a new row
    const row = await prisma.row.create({
      data: {
        websiteId: website.id,
        positionId: position.id,
        typeId: data.typeId,
      },
    });

    // Add cells to the row
    const cellPromises = Object.keys(data)
        .filter((key) => key !== 'website' && key !== 'position' && key !== 'dimension' && key !== 'platform' && key !== 'demoList' && key !== 'typeId')
        .map((key) =>
            prisma.cell.create({
              data: {
                headerId: key,
                value: data[key].toString(),
                rowId: row.id,
              },
            })
        );
    await Promise.all(cellPromises);
  } catch (e) {
    console.error(e);
    console.log('Failed to add ad rate');
  }
}

export async function getUserFromDb(username: string, password: string) {

  try {
    return await prisma.user.findMany({
      where: {
        username: username,
      },

    });
  } catch (e) {
    console.error(e);
    console.log('Failed to get user from db');
    return null;
  }
}

export async function createUserInDb(email: string, username: string, password: string) {
      try {
     return await prisma.user.create({
        data: {
          email: email,
          username: username,
          password: password,
        },
     });
      } catch (e) {
     console.error(e);
     console.log('Failed to create user in db');
     return null;
      }
}

export async function getUserByEmail(email: string) {
  try {
    return await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  } catch (e) {
    console.error(e);
    console.log('Failed to get user by email');
    return null;
  }
}

export async function getUserByUsername(username: string) {
  try {
    return await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
  } catch (e) {
    console.error(e);
    console.log('Failed to get user by username');
    return null;
  }
}