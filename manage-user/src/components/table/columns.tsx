import React from "react";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

import { priorities, statuses } from "../data/data";
import { UserInfo } from "../data/schema";
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

export const columns: ColumnDef<UserInfo>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false
  // },
  {
    id: "avatar",
    accessorKey: "avatar",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="min-w-[60px]"
        column={column}
        title="Ảnh đại diện"
      />
    ),
    cell: ({ row }) => {
      const avatar = row.getValue("avatar");

      return (
        <span>
          <img
            className="h-12 w-12 border rounded-full object-cover"
            src={row.getValue("avatar")}
            alt="userAvatar"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null; // Prevents infinite looping in case the fallback image also fails to load
              target.src = manAvatar; // Replace with your fallback image URL
            }}
          />
        </span>
      );
    },
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: "displayName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tên" />
    ),
    cell: ({ row }) => (
      <span className="w-[80px] truncate min-w-20">
        {row.getValue("displayName")}
      </span>
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      // const label = labels.find((label) => label.value === row.original.email);

      return (
        <div className="flex space-x-2">
          {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
          <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
            {row.getValue("email")}
          </span>
        </div>
      );
    }
  },
  {
    accessorKey: "activate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Trạng thái" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("activate")
      );

      const activated = row.getValue("activate") || false;

      // if (!status) {
      //   return null;
      // }

      return (
        <div className="flex w-[100px] items-center">
          {activated ? (
            <Badge variant="outline">{`${activated && `Đã kích hoạt`}`}</Badge>
          ) : (
            <Badge
              variant="outline"
              className=" text-red-700"
            >{`${`Đã vô hiệu`}`}</Badge>
          )}

          {/* <span>{`${activated ? `Đã kích hoạt` : `Chưa kích hoạt`}`}</span> */}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: "lastLogin",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lần đăng nhập cuối" />
    ),
    cell: ({ row }) => {
      // const priority = priorities.find(
      //   (priority) => priority.value === row.getValue("createdDate")
      // );

      // const lastLogin = new Date(row.getValue("lastLogin"));

      // const result = format(lastLogin, "dd/MM/yyyy");
      const result = formatTimeToString(row.getValue("lastLogin"));

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
