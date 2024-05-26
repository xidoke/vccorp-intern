import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {MoreHorizontal} from "lucide-react";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import React from "react";
import {deleteUserByEmail} from "@/actions/user";


const AdminActionMenu = ({email} : {email:string}) => {
    const handleDelete = async () => {
        try {
            await deleteUserByEmail(email);
        } catch (e) {
            console.error(e);
            console.log('Failed to delete ad rate');
        }
    };
    return (
        <Dialog>
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
                    className="w-full text-red-600"
                    onClick={(event) => {
                        event.stopPropagation();
                    }}
                >
                  Delete
                </span>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Delete the user</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Are you sure you want to delete this user?
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleDelete}>
                                        Continue
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DialogTrigger className="w-full">
                        <DropdownMenuItem>
                            <span className="text-green-600">Edit</span>
                        </DropdownMenuItem>
                    </DialogTrigger>
                </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent className="max-h-screen overflow-x-scroll">
                {/*<EditAdRateForm data={item} type={type} />*/}
            </DialogContent>
        </Dialog>
    );
};

export default AdminActionMenu;