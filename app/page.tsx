import React from 'react';
import { Type } from '@prisma/client';
import {fetchAllType, fetchRowWithTypeId} from '@/lib/data';
import AdRateTable from "@/app/ui/ad-rate/ad-rate-table";

const Page = async () => {
  const types = await fetchAllType();
    const promiseList =  types.map( async (type) => {
        return await fetchRowWithTypeId(type.id);
    });
   const dataList = await Promise.all(promiseList);

  return (
    <>
      <div>
          {dataList.map((data, index) => {
                return (
                    <AdRateTable key={index} type={types[index]} data={data} />
                )
            })}
      </div>
    </>
  );
};

export default Page;
