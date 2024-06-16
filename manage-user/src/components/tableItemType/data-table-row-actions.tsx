import React, { useContext, useEffect, useState } from "react";

// import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/custom/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuRadioGroup,
//   DropdownMenuRadioItem,
//   DropdownMenuSeparator,
//   DropdownMenuShortcut,
//   DropdownMenuSub,
//   DropdownMenuSubContent,
//   DropdownMenuSubTrigger,
//   DropdownMenuTrigger
// } from "@/components/ui/dropdown-menu";

// import { labels } from "../data/data";
import { ItemTypeSchema } from "../data/schema";
import { LoaderCircle } from "lucide-react";
import { ReloadContext } from "@/contexts/reloadContext";
import DialogPage from "../custom/dialog";
import DeleteCategoryForm from "../itemtypes/DeleteItemType";
import ChangeCategoryForm from "../itemtypes/ChangeIyemtypes";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row
}: DataTableRowActionsProps<TData>) {
  const [itemTypes, setItemTypes] = useState(
    ItemTypeSchema.parse(row.original)
  );
  const reloadCt = useContext(ReloadContext);
  const { reloadState, handleReload } = reloadCt || {};

  useEffect(() => {
    setItemTypes(ItemTypeSchema.parse(row.original));
  }, [row.original, reloadState]);

  const [open, setOpen] = React.useState(false);
  const [buttonTitle, setButtonTitle] = useState("");
  const [title, setTitle] = useState("");
  const [children, setChildren] = useState<React.ReactNode>(<></>);
  const [isLoading, setIsLoading] = useState(false);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }
  // const buttonTitle = "Xoá danh mục";
  // const title = "Xoá danh mục";

  function handleDeleteUser() {
    setChildren(
      <DeleteCategoryForm
        closeDialog={handleClose}
        id={itemTypes.id}
        name={itemTypes.name}
      />
    );
    setButtonTitle("Xoá danh mục");
    setTitle("Xoá danh mục");

    handleOpen();
  }

  function handleChangeUser() {
    setChildren(
      <ChangeCategoryForm
        closeDialog={handleClose}
        id={itemTypes.id}
        name={itemTypes.name}
      />
    );
    setButtonTitle("Sửa danh mục id " + itemTypes.id + " - " + itemTypes.name);
    setTitle("Sửa danh mục");

    handleOpen();
  }

  return (
    <div className="flex gap-2">
      <Button
        variant="default"
        onClick={handleChangeUser}
        className=" hover:bg-gray-800 bg-black text-white hover:text-white min-w-[101px]"
      >
        {isLoading ? <LoaderCircle className="w-6 h-6" /> : "Sửa"}
      </Button>
      <Button
        variant={"outline"}
        onClick={handleDeleteUser}
        className=" min-w-[101px]"
      >
        {isLoading ? <LoaderCircle className="w-6 h-6" /> : "Xoá"}
      </Button>
      <DialogPage
        buttonTitle={buttonTitle}
        title={title}
        children={children}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
}

/* 
<DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Make a copy</DropdownMenuItem>
        <DropdownMenuItem>Favorite</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={task.displayName}>
              {labels.map((label) => (
                <DropdownMenuRadioItem key={label.value} value={label.value}>
                  {label.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
*/
