import React from 'react';
import { fetchAdRateTypesCount, fetchAllType, fetchRowWithTypeId } from '@/lib/data';
import { TypeIncludeHeaders } from '@/lib/definetions';
import AdRateTable from '@/app/ui/ad-rate/ad-rate-table';

const Page = async () => {
  const types = await fetchAllType();
  const promiseList = types.map(async (type) => {
    return await fetchRowWithTypeId(type.id);
  });
  const dataList = await Promise.all(promiseList);

  return (
    <>
      <div>
        {dataList.map((data, index) => {
          return (
            <>
                <div className="my-10"><h1 className="font-semibold text-blue-400">type name: {types[index].name}</h1>
                    <AdRateTable key={index} type={types[index]} data={data}/></div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Page;
