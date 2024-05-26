import React from 'react';
import {fetchAllType, fetchRowWithTypeIdAndSearch} from '@/lib/data';
import AdRateTable from '@/app/ui/ad-rate/ad-rate-table';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import {Input} from '@/components/ui/input';
import {auth} from "@/auth";

const PageComponent = async ({searchParams} : { searchParams: { [key: string]: string | string[] | undefined }}) => {
    try {

        // Fetch all types and related rows
        const session = await auth();
        // @ts-ignore
        const isSuperAdmin = session?.user?.isSuperAdmin;
        const types = await fetchAllType();
        const search = searchParams.search as string ?? '';
        const dataList = await Promise.all(
            types.map(async (type) => ({
                type,
                rows: await fetchRowWithTypeIdAndSearch(type.id, search),
            })),
        );

        // Render the component
        return (
            <div>
                <Search/>
                <h1 className="text-2xl font-semibold">Ad Rates</h1>
                {dataList.map(({type, rows}) => (
                    <div key={type.id} className="my-10 space-y-2">
                        <div className="flex flex-row items-center justify-between">
                            <h1 className="font-semibold text-blue-400">
                                Type Name: {type.name}
                            </h1>
                            <Link href={`/form/type/${type.id}`}>
                                <Button>Add row</Button>
                            </Link>
                        </div>

                        <AdRateTable type={type} data={rows} isSuperAdmin={isSuperAdmin}/>
                    </div>
                ))}
            </div>
        );
    } catch (error: any) {
        // Handle error by showing a user-friendly message
        console.error('Error loading data:', error);
        return <div>Error loading data: {error.message}</div>;
    }
};

function Search() {
    return (
        <div>
            <form action="">
                <div className="flex flex-row">
                    <Input type="text" placeholder="Search..." name='search'/>
                    <Button type="submit">Search</Button>
                </div>

            </form>
        </div>
    );
}


export default PageComponent;
