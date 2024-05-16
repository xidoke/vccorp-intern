'use client';
import React from 'react';
import { createColumnHelper } from '@tanstack/table-core';
import { DataTable } from '@/components/data-table';
import { Data, TypeIncludeHeaders } from '@/lib/definetions';
import ActionMenu from '@/components/action-menu';
import { ColumnDef } from '@tanstack/react-table';
import { Demo } from '@prisma/client';

interface AdRateTableProps {
  data: Data[];
  type: TypeIncludeHeaders;
}

const AdRateTable = ({ data, type }: AdRateTableProps) => {
  const columnHelper = createColumnHelper<Data>();

  const defaultColumns: ColumnDef<Data, any>[] = [
    columnHelper.display({
      id: 'actions',
      cell: ({ row }) => <ActionMenu item={row.original} />,
    }),
    columnHelper.accessor('website.name', {
      id: 'website',
      header: () => <div>Website</div>,
      cell: (props) => <div>{props.getValue()}</div>,
    }),
    columnHelper.accessor('position.name', {
      id: 'position',
      header: () => <div>Position</div>,
      cell: (props) => <div>{props.getValue()}</div>,
    }),
    columnHelper.accessor('position.dimension', {
      id: 'dimension',
      header: () => <div>Dimension</div>,
      cell: (props) => <div>{props.getValue()}</div>,
    }),
    columnHelper.accessor('position.platform', {
      id: 'platform',
      header: () => <div>Platform</div>,
      cell: (props) => <div>{props.getValue()}</div>,
    }),
    columnHelper.accessor('position.demoList', {
      id: 'demoList',
      header: () => <div>Demo</div>,
      cell: (props) =>
        props.getValue().map((demo: Demo) => (
          <div key={demo.id}>
            <a href={demo.url} target="_blank" rel="noopener noreferrer">
              {demo.display}
            </a>
          </div>
        )),
    }),
    ...type.headers.map((header) =>
      columnHelper.accessor('cells', {
        id: header.id,
        header: () => <div>{header.display}</div>,
        cell: (props) => (
          <div>
            {
              props.getValue().find((value) => value.headerId === header.id)
                ?.value
            }
          </div>
        ),
      }),
    ),
  ];
  return (
    <div>
      <DataTable columns={defaultColumns} data={data}></DataTable>
    </div>
  );
};

export default AdRateTable;
