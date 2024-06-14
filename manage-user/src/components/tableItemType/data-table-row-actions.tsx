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
import { useMutation } from "@apollo/client";
import { ACTIVE_USER_ACCOUNT } from "@/services/graphql/mutations";
import { LoaderCircle } from "lucide-react";
import { ReloadContext } from "@/contexts/reloadContext";
import Snackbar from "../custom/snackbar";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row
}: DataTableRowActionsProps<TData>) {
  const user: SignedInUser = JSON.parse(localStorage.getItem("user") || "{}");

  const [activeUser, { loading }] = useMutation(ACTIVE_USER_ACCOUNT);
  const [itemTypes, setItemTypes] = useState(
    ItemTypeSchema.parse(row.original)
  );
  const reloadCt = useContext(ReloadContext);
  const { reloadState, handleReload } = reloadCt || {};
  const [isShow, setIsShow] = useState(false);
  const [text, settext] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setItemTypes(ItemTypeSchema.parse(row.original));
  }, [row.original, reloadState]);

  function showSnackbar(text: string) {
    settext(text);
    setIsShow(true);
    setTimeout(function () {
      closeSnackbar();
    }, 3000);
  }

  async function handleActiveUser() {
    if (!itemTypes) return;

    setIsLoading(true);

    try {
      const resultData = await activeUser({
        variables: {
          bodyReq: {
            userId: itemTypes.id
          }
        }
      });

      console.log("🚀 ~ result:", resultData);
      const result = resultData.data;
      if (result?.activateUserAccount.statusCode === 200) {
        setTimeout(() => {
          setIsLoading(false);
          handleReload && handleReload();
        }, 500);
      } else {
        setIsLoading(false);
        showSnackbar("Có lỗi xảy ra, vui lòng thử lại sau!");
      }
    } catch (error) {
      console.log("🚀 ~ error of data table in manage user:", error);
      setIsLoading(false);
    }
  }

  function closeSnackbar() {
    console.log("close snackbar", isShow);
    if (isShow) setIsShow(false);
  }

  return (
    <div className="flex gap-2">
      <Button
        variant="default"
        onClick={handleActiveUser}
        disabled={loading}
        className=" hover:bg-gray-800 bg-black text-white hover:text-white min-w-[101px]"
      >
        {loading || isLoading ? <LoaderCircle className="w-6 h-6" /> : "Sửa"}
      </Button>
      <Button
        variant={"outline"}
        onClick={handleActiveUser}
        disabled={loading}
        className=" min-w-[101px]"
      >
        {loading || isLoading ? <LoaderCircle className="w-6 h-6" /> : "Xoá"}
      </Button>
      <Snackbar
        isShow={isShow}
        text={text}
        setIsShow={setIsShow}
        showSnackbar={showSnackbar}
        closeSnackbar={closeSnackbar}
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
