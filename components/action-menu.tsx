import React from 'react';
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
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { deleteAdRate } from '@/actions/ad-rate';
import { Data, TypeIncludeHeaders } from '@/lib/definetions';
import { EditAdRateForm } from '@/components/form-edit-ad-rate';


interface ActionMenuProps {
  item: Data;
  type: TypeIncludeHeaders;
}

const ActionMenu = ({ item, type }: ActionMenuProps) => {
  const handleDelete = async () => {
    try {
      await deleteAdRate(item);
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
                  <AlertDialogTitle>Delete Ad Rate</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this ad rate?
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
        <EditAdRateForm data={item} type={type} />
      </DialogContent>
    </Dialog>
  );
};

export default ActionMenu;
