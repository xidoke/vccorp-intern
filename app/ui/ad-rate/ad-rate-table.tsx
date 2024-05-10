'use client';
import React from 'react';
import {
  Cell,
  Demo,
  Header,
  Position,
  Prisma,
  Type,
  Website,
} from '@prisma/client';
import { createColumnHelper } from '@tanstack/table-core';
import { DataTable } from '@/components/data-table';
import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {deleteAdRate} from "@/actions/ad-rate";

type Data = {
  id: string;
  website: Website;
  position: Position & { demoList: Demo[] };
  cells: Cell[];
};
const AdRateTable = ({
  data,
  type,
}: {
  data: Data[];
  type: Type & { headers: Header[] };
}) => {
  const columnHelper = createColumnHelper<Data>();

  const defaultColumns = [
    columnHelper.display({
      id: 'actions',
      cell: ({ row }) => {
        const item = row.original;

        return (
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <span
                        className="text-red-600 w-full"
                        onClick={(event) => {
                          event.stopPropagation()
                        }}
                      >
                        Delete
                      </span>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Ad Rate</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to Delete this ad rate?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteAdRate(item)}>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>View item details</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    }),
    columnHelper.accessor('website.name', {
      id: 'website',
      header: (props) => <div>Website</div>,
      cell: (props) => <div>{props.getValue()}</div>,
    }),
    columnHelper.accessor('position.name', {
      id: 'position',
      header: (props) => <div>Position</div>,
      cell: (props) => <div>{props.getValue()}</div>,
    }),
    columnHelper.accessor('position.dimension', {
      id: 'dimension',
      header: (props) => <div>Dimension</div>,
      cell: (props) => <div>{props.getValue()}</div>,
    }),
    columnHelper.accessor('position.platform', {
      id: 'platform',
      header: (props) => <div>Platform</div>,
      cell: (props) => <div>{props.getValue()}</div>,
    }),
    columnHelper.accessor('position.demoList', {
      id: 'demoList',
      header: (props) => <div>Demo</div>,
      cell: (props) =>
        props.getValue().map((demo: Demo) => (
          <div key={demo.id}>
            <a href={demo.url} target="_blank">
              {demo.display}
            </a>
          </div>
        )),
    }),
    ...type.headers.map((header, index) =>
      columnHelper.accessor('cells', {
        id: header.id,
        header: (props) => <div>{header.display}</div>,
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
  // @ts-ignore
  return (
    <div>
      {/*@ts-ignore*/}
      <DataTable columns={defaultColumns} data={data}></DataTable>
    </div>
  );
};

export default AdRateTable;
