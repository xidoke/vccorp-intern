import {Platform} from '@prisma/client';
import {TypeIncludeHeaders} from '@/lib/definetions';
import {db} from '@/lib/db';

export async function fetchAllType(): Promise<TypeIncludeHeaders[]> {
    try {
        return await db.type.findMany({
            include: {
                headers: true,
            },
        });
    } catch (e) {
        console.error(e);
        console.log('Failed to fetch type');
        return [];
    }
}

//fetch type by typeid
export async function fetchTypeById(
    typeid: string,
): Promise<TypeIncludeHeaders | null> {
    try {
        return await db.type.findUnique({
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

export async function fetchRowWithTypeId(typeid: string) {
    try {
        return await db.row.findMany({
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
                    },
                },
            },
        });
    } catch (e) {
        console.error(e);
        console.log('Failed to fetch ad rate with type');
        return [];
    }
}

export async function fetchRowWithTypeIdAndSearch(typeid: string, search: string) {
    try {
        return await db.row.findMany({
            where: {
                typeId: typeid,
                OR: [
                    {
                        website: {
                            name: {
                                contains: search,
                            },
                        },
                    },
                    {
                        position: {
                            name: {
                                contains: search,
                            },
                        },
                    },
                    {
                        position: {
                            dimension: {
                                contains: search,
                            },
                        },
                    },
                    {
                        cells: {
                            some: {
                                value: {
                                    contains: search,
                                },
                            },
                        },
                    },
                ],
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
                    },
                },
            },
        });
    } catch (e) {
        console.error(e);
        console.log('Failed to fetch ad rate with type');
        return [];
    }
}

export async function deleteRowAndCells(rowId: string) {
    try {
        // Delete cells that belong to the row
        await db.cell.deleteMany({
            where: {
                rowId: rowId,
            },
        });

        // Delete the row
        return await db.row.delete({
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
        let website = await db.website.findUnique({
            where: {name: data.website},
        });

        if (!website) {
            website = await db.website.create({
                data: {
                    name: data.website,
                    url: data.website,
                    description: '',
                },
            });
        }

        // Create a new position
        const position = await db.position.create({
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
            db.demo.create({
                data: {
                    display: demo.display,
                    url: demo.url,
                    positionId: position.id,
                },
            }),
        );
        await Promise.all(demoPromises);

        // Create a new row
        const row = await db.row.create({
            data: {
                websiteId: website.id,
                positionId: position.id,
                typeId: data.typeId,
            },
        });

        // Add cells to the row
        const cellPromises = Object.keys(data)
            .filter(
                (key) =>
                    key !== 'website' &&
                    key !== 'position' &&
                    key !== 'dimension' &&
                    key !== 'platform' &&
                    key !== 'demoList' &&
                    key !== 'typeId',
            )
            .map((key) =>
                db.cell.create({
                    data: {
                        headerId: key,
                        value: data[key].toString(),
                        rowId: row.id,
                    },
                }),
            );
        await Promise.all(cellPromises);
    } catch (e) {
        console.error(e);
        console.log('Failed to add ad rate');
    }
}

export async function editAdRate(data: {
    id: string;
    website: string;
    position: string;
    dimension: string;
    platform: Platform;
    demoList: { display: string; url: string }[];
    [key: string]: any;
}) {
    const row = await db.row.findUnique({
        where: {
            id: data.id,
        }
    })

    if (!row) {
        console.log('Row not found');
        return;
    }

    await db.website.update({
        where: {
            id: row.websiteId
        },
        data: {
            name: data.website,
            url: data.website,
        }
    })

    const position = await db.position.update({
            where: {
                id: row.positionId
            },
            data: {
                name: data.position,
                dimension: data.dimension,
                platform: data.platform,
            }
        }
    )
    await db.demo.deleteMany({
        where: {
            positionId: row.positionId
        }
    })
    console.log("demoList:")
    console.dir(data.demoList)
    if (data.demoList.length > 0) {
        await db.demo.createMany({
                data: data.demoList.map(demo => ({
                    display: demo.display,
                    url: demo.url,
                    positionId: position.id
                }))
            }
        )
    }

    const cellPromises = Object.keys(data)
        .filter(
            (key) =>
                key !== 'id' &&
                key !== 'website' &&
                key !== 'position' &&
                key !== 'dimension' &&
                key !== 'platform' &&
                key !== 'demoList' &&
                key !== 'typeId',
        )
        .map(async (key) => {
            try {
                await db.cell.update({
                    where: {
                        headerId_rowId: {
                            headerId: key,
                            rowId: row.id
                        }
                    },
                    data: {
                        value: data[key].toString(),
                    }
                })
            } catch (e) {
                await db.cell.create({
                    data: {
                        headerId: key,
                        value: data[key].toString(),
                        rowId: row.id,
                    },
                });
            }
        });
    await Promise.all(cellPromises);
}

export async function getUserFromDb(username: string) {
    try {
        return await db.user.findFirst({
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

export async function createUserInDb(
    email: string,
    username: string,
    password: string,
) {
    try {
        return await db.user.create({
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

export async function updateUsernameAndPassword(
    email: string,
    username: string,
    password: string,
) {
    try {
        return await db.user.update({
            where: {
                email: email,
            },
            data: {
                username: username,
                password: password,
            },
        });
    } catch (e) {
        console.error(e);
        console.log('Failed to update username and password');
        return null;
    }
}

export async function getUserByEmail(email: string) {
    try {
        return await db.user.findUnique({
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
        return await db.user.findFirst({
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

export async function getAllUsers() {
    try {
        return await db.user.findMany();
    } catch (e) {
        console.error(e);
        console.log('Failed to get all users');
        return [];
    }
}

export async function deleteUser(email: string) {
    try {
        return await db.user.delete({
            where: {
                email: email,
            },
        });
    } catch (e) {
        console.error(e);
        console.log('Failed to delete user');
        return null;
    }
}