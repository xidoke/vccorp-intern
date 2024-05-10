

import { EditAdRateForm } from '@/components/form-edit-ad-rate';
import {fetchAllType} from "@/lib/data";
// Dữ liệu mẫu để test form



const Page = async () => {
    const types = await fetchAllType();
    const initData = {
        website: 'https://example.com',
        position: 'Header',
        dimension: '728x90',
        platform: 'Desktop',
        demoList: [
            {
                id: '1',
                url: 'https://example.com',
                display: 'Example',
            },
            {
                id: '2',
                url: 'https://example.com',
                display: 'Example',
            },
        ],
    }
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Edit Ad Rate</h1>
            <EditAdRateForm types={types} initType={types[0]} initData={initData} />
        </div>
    );
};

export default Page;
