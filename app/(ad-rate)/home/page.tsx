import React from 'react';
import {fetchAllType, fetchRowWithTypeId} from '@/lib/data';
import AdRateTable from '@/app/ui/ad-rate/ad-rate-table';
import {Button} from '@/components/ui/button';
import Link from 'next/link';

const PageComponent = async () => {
    try {

        // Fetch all types and related rows
        const types = await fetchAllType();
        const dataList = await Promise.all(
            types.map(async (type) => ({
                type,
                rows: await fetchRowWithTypeId(type.id),
            })),
        );

        // Render the component
        return (
            <div>
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

                        <AdRateTable type={type} data={rows}/>
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

export default PageComponent;
