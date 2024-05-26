import React from 'react';
import {auth} from "@/auth";
import {getAllUsers} from "@/lib/data";
import AdminTable from "@/app/(ad-rate)/admin/admin-table";

const AdminPage = async () => {
    try {
        const users = await getAllUsers();
        return (
            <div>
                <h1>Admin Page</h1>
                {/*// @ts-ignore*/}
                <AdminTable data={users}/>
            </div>
        );
    } catch (e: any) {
        return <div>{e.message}</div>;
    }
};

export default AdminPage;