'use client';
import React from 'react';
import {createColumnHelper} from '@tanstack/table-core';
import {DataTable} from '@/components/data-table';
import {ColumnDef} from '@tanstack/react-table';
import {DataTableColumnHeader} from "@/components/column-header";
import AdminActionMenu from "@/components/admin-action-menu";

type User = {
    username: string;
    email: string;
    isSuperAdmin: boolean;
}

interface AdRateTableProps {
    data: User[];
}

const AdminTable = ({data}: AdRateTableProps) => {
    const columnHelper = createColumnHelper<User>();
    const defaultColumns: ColumnDef<User, any>[] = [
        columnHelper.accessor('username', {
            id: 'username',
            header: ({column}) => (
                <DataTableColumnHeader column={column} title="Username"/>
            ),
            cell: (props) => <div>{props.getValue()}</div>,
        }),
        columnHelper.accessor('email', {
            id: 'email',
            header: ({column}) => (
                <DataTableColumnHeader column={column} title="Email"/>
            ),
            cell: (props) => <div>{props.getValue()}</div>,
        }),
        columnHelper.accessor('isSuperAdmin', {
            id: 'isSuperAdmin',
            header: ({column}) => (
                <DataTableColumnHeader column={column} title="Role"/>
            ),
            cell: (props) => <div>{props.getValue() ? 'Super Admin' : 'Admin'}</div>,
        }),
        columnHelper.display({
            id: 'actions',
            cell: ({row}) => <AdminActionMenu email={row.original.email}/>,
        })

    ];
    return (
        <div>
            <DataTable columns={defaultColumns} data={data} search="email"></DataTable>
        </div>
    );
};

export default AdminTable;

