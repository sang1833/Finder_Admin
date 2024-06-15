import React from "react";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/custom/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

import { times, statuses } from "../data/data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import DialogPage from "../custom/dialog";
import AddCategoryForm from "../itemtypes/AddItemType";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table
}: DataTableToolbarProps<TData>) {
  const [open, setOpen] = React.useState(false);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }
  const isFiltered = table.getState().columnFilters.length > 0;
  const buttonTitle = "Thêm danh mục";
  const title = "Thêm danh mục";
  const children = <AddCategoryForm closeDialog={handleClose} />;

  return (
    <section className="flex flex-col">
      <div className="flex items-center justify-between">
        <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
          <Input
            placeholder="Tìm kiếm..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />

          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <Cross2Icon className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>

        <DataTableViewOptions table={table} />
      </div>
      <div className="flex justify-end py-2">
        <Button
          variant="default"
          onClick={handleOpen}
          className=" hover:bg-gray-800 bg-black text-white hover:text-white min-w-[101px]"
        >
          {buttonTitle}
        </Button>
        <DialogPage
          buttonTitle={buttonTitle}
          title={title}
          children={children}
          open={open}
          setOpen={setOpen}
        />
      </div>
    </section>
  );
}
