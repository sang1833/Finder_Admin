import React, { useState } from "react";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

import { priorities, statuses } from "../data/data";
import { ItemType, UserInfo } from "../data/schema";
import manAvatar from "@/assets/manAvatar.png";
import {
  format,
  isToday,
  isYesterday,
  differenceInMinutes,
  differenceInHours
} from "date-fns";
import { vi } from "date-fns/locale";

export function formatTimeToString(inputDateTime: string): string {
  const date = new Date(inputDateTime);

  if (date) {
    const now = new Date();

    if (isToday(date)) {
      const minutesDiff = differenceInMinutes(now, date);
      const hoursDiff = differenceInHours(now, date);

      if (minutesDiff < 1) {
        return "vừa xong";
      } else if (minutesDiff < 60) {
        return `${minutesDiff} phút trước`;
      } else if (hoursDiff < 24) {
        return format(date, "h:mm a");
      }
    } else if (isYesterday(date)) {
      return `Hôm qua`;
    } else {
      return format(date, "dd/MM/yyyy");
    }
  }

  return "";
}

export const columns: ColumnDef<ItemType>[] = [
  {
    id: "id",
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Id" />
    ),
    cell: ({ row }) => {
      return <span> {row.getValue("id")}</span>;
    },
    enableHiding: false
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tên" />
    ),
    cell: ({ row }) => {
      // const label = labels.find((label) => label.value === row.original.name);

      return (
        <div className="flex space-x-2">
          {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
          <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
            {row.getValue("name")}
          </span>
        </div>
      );
    }
  },
  {
    accessorKey: "updatedDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lần sửa cuối" />
    ),
    cell: ({ row }) => {
      // const priority = priorities.find(
      //   (priority) => priority.value === row.getValue("createdDate")
      // );

      // const lastLogin = new Date(row.getValue("lastLogin"));

      // const result = format(lastLogin, "dd/MM/yyyy");
      const result = formatTimeToString(row.getValue("updatedDate"));

      // if (!priority) {
      //   return null;
      // }

      return (
        <div className="flex items-center">
          <span>{result}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />
  }
];
