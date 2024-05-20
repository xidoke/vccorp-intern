'use client';
import React, {useState} from 'react';
import {Column, createColumnHelper} from '@tanstack/table-core';
import {DataTable} from '@/components/data-table';
import {Data, TypeIncludeHeaders} from '@/lib/definetions';
import ActionMenu from '@/components/action-menu';
import {ColumnDef} from '@tanstack/react-table';
import {Demo} from '@prisma/client';

import {Button} from "@nextui-org/react";
import {
    ArrowDownIcon,
    ArrowUpIcon,
    CaretSortIcon,
    EyeNoneIcon,
} from "@radix-ui/react-icons"
import {cn} from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {ArrowUpDown} from "lucide-react";
import {DataTableColumnHeader} from "@/components/column-header";

interface AdRateTableProps {
    data: Data[];
    type: TypeIncludeHeaders;
}

const AdRateTable = ({data, type}: AdRateTableProps) => {
    const columnHelper = createColumnHelper<Data>();
    const defaultColumns: ColumnDef<Data, any>[] = [
        columnHelper.display({
            id: 'actions',
            cell: ({row}) => <ActionMenu item={row.original} type={type}/>,
        }),
        columnHelper.accessor('website.name', {
            id: 'website',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Website" />
            ),
            cell: (props) => <div>{props.getValue()}</div>,
        }),
        columnHelper.accessor('position.name', {
            id: 'position',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Position" />
            ),
            cell: (props) => <div>{props.getValue()}</div>,
        }),
        columnHelper.accessor('position.dimension', {
            id: 'dimension',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Dimension" />
            ),
            cell: (props) => <div>{props.getValue()}</div>,
        }),
        columnHelper.accessor('position.platform', {
            id: 'platform',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Platform" />
            ),
            cell: (props) => <div>{props.getValue()}</div>,
        }),
        columnHelper.accessor('position.demoList', {
            id: 'demoList',
            header: () => <div>Demo</div>,
            cell: (props) =>
                props.getValue().map((demo: Demo) => (
                    <div key={demo.id}>
                        <a href={demo.url} target="_blank" rel="noopener noreferrer" className="underline text-green-400 hover:text-green-700">
                            {demo.display}
                        </a>
                    </div>
                )),
        }),
        ...type.headers.map((header) =>
            columnHelper.accessor('cells', {
                id: header.display,
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} title={header.display} />
                ),
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


