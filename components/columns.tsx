"use client"
import {Column, ColumnDef} from "@tanstack/react-table";
import {ArrowUpDown, MoreHorizontal} from "lucide-react"
import { Button } from "@/components/ui/button"
import React from "react";
import { AdRateType } from "@/types/AdRate";

// Define a sortable header component
type SortableHeaderProps = {
    column: Column<AdRateType, any>;
    children: React.ReactNode;
};
const SortableHeader = ({ column, children }: SortableHeaderProps) => (
    <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
        {children}
        <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
);

// Define a function to create sortable header
// @ts-ignore
const sortableHeader = (accessorKey, label) => ({
    accessorKey,
    //@ts-ignore
    header: ({ column }) => <SortableHeader column={column}>{label}</SortableHeader>,
});

// Define columns for your table
const baseColumns: ColumnDef<AdRateType>[] = [
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const handleEdit = () => {
                // Add your logic for editing here
                console.log("Editing row with ID:", row.original._id);

            };

            const handleDelete = async () => {
                // Assuming that your API endpoint for deleting a record is '/ad-rates/:id'
                const response = await fetch(`http://localhost:3001/ad-rates/${row.original._id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                // Refresh the data or remove the row from the local state here
                //remove the row from the local state

            };
            return (
                <div className="flex">
                    <button onClick={handleEdit} className="mr-2 text-blue-600 hover:text-blue-900">
                        Sửa
                    </button>
                    <button onClick={handleDelete} className="text-red-600 hover:text-red-900">
                        Xóa
                    </button>
                </div>
            );
        },
    },
    sortableHeader("stt", "STT"),
    sortableHeader("website", "Website"),
    sortableHeader("position", "Position"),
];
export const columns1: ColumnDef<AdRateType>[] = [
    ...baseColumns,
    { accessorKey: "dimensions", header: "Dimensions" },
    { accessorKey: "platform", header: "Platform" },
    {
        header: "Demo Link",
        cell: (cellData) => {
            const { demo, url } = cellData.row.original;
            return <a href={`https://${url}`}>{demo}</a>;
        },
    },
    { accessorKey: "buying_method", header: "Buying Method" },
    { accessorKey: "homepage", header: "Homepage" },
    { accessorKey: "csr", header: "CSR" },
    { accessorKey: "ctr", header: "CTR" },
    { accessorKey: "est", header: "EST" },
];
export const columns2: ColumnDef<AdRateType>[] = [
    ...baseColumns,
    { accessorKey: "dimensions", header: "Kích thước (px)" },
    { accessorKey: "platform", header: "Nền tảng\nPlatform" },
    {
        header: "Demo Link",
        cell: (cellData) => {
            const { demo, url } = cellData.row.original;
            return <a href={`https://${url}`}>{demo}</a>;
        },
    },
    { accessorKey: "buying_method", header: "Cách tính giá\nBuying Method" },
    { accessorKey: "price", header: "Đơn Giá (VNĐ)" },
    { accessorKey: "ctr", header: "CTR trung bình (%)\nAverage CTR (%)" },
    { accessorKey: "est", header: "Est. Impression" },
    { accessorKey: "note", header: "Note" },
];
export const columns3: ColumnDef<AdRateType>[] = [
    ...baseColumns,
    { accessorKey: "dimensions", header: "Kích thước" },
    { accessorKey: "platform", header: "Nền tảng" },
    {
        header: "Demo Link",
        cell: (cellData) => {
            const { demo, url } = cellData.row.original;
            return <a href={`https://${url}`}>{demo}</a>;
        },
    },
    { accessorKey: "buying_method", header: "Cách tính giá" },
    { accessorKey: "homepage", header: "TRANG CHỦ\n(Đã gồm VAT)" },
    { accessorKey: "week", header: "XUYÊN TRANG\n(Đã gồm VAT)" },
    { accessorKey: "month", header: "CHUYÊN MỤC (*)\n(Đã gồm VAT)" },
    { accessorKey: "est", header: "Est. Traffic" },
];
export const columns4: ColumnDef<AdRateType>[] = [
    ...baseColumns,
    { accessorKey: "dimensions", header: "Dimensions" },
    { accessorKey: "platform", header: "Platform" },
    {
        header: "Demo Link",
        cell: (cellData) => {
            const { demo, url } = cellData.row.original;
            return <a href={`https://${url}`}>{demo}</a>;
        },
    },
    { accessorKey: "buying_method", header: "Cách tính giá" },
    { accessorKey: "homepage", header:
            "Roadblock xuyên site \n" +
            "(Độc quyền ngày)\n" +
            "(chưa bao gồm VAT)" },
    { accessorKey: "csr", header: "CSR" },
    { accessorKey: "ctr", header: "CTR" },
    { accessorKey: "detailed_csr", header: "Detailed CSR" },
    { accessorKey: "est", header: "EST" },
    { accessorKey: "note", header: "Note" },
];
export const columns5: ColumnDef<AdRateType>[] = [
    ...baseColumns,
    { accessorKey: "dimensions", header: "Kích thước" },
    { accessorKey: "platform", header: "Nền tảng" },
    {
        header: "Demo Link",
        cell: (cellData) => {
            const { demo, url } = cellData.row.original;
            return <a href={`https://${url}`}>{demo}</a>;
        },
    },
    { accessorKey: "week", header: "Tuần (Chia sẻ 3)" },
    { accessorKey: "month", header: "Tháng (Chia sẻ 3)" },
    { accessorKey: "quarter_year", header: "Quý (Chia sẻ 3)" },
    { accessorKey: "ctr", header: "Est. CTR (%)" },
    { accessorKey: "est", header: "Est. Traffic" },
];
export const columns7: ColumnDef<AdRateType>[] = [
    ...baseColumns,
    { accessorKey: "dimensions", header: "KÍCH THƯỚC" },
    { accessorKey: "platform", header: "NỀN TẢNG" },
    {
        header: "Demo Link",
        cell: (cellData) => {
            const { demo, url } = cellData.row.original;
            return <a href={`https://${url}`}>{demo}</a>;
        },
    },
    { accessorKey: "buying_method", header: "CÁCH TÍNH GIÁ" },
    { accessorKey: "homepage", header: "TRANG CHỦ" },
    { accessorKey: "detailed_csr", header: "XUYÊN TRANG CHI TIẾT" },
    { accessorKey: "csr", header: "XUYÊN TRANG" },
    { accessorKey: "est", header: "Est Traffic/" },
];




