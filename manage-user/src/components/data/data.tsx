import {
  ArrowDownIcon,
  ArrowUpIcon,
  CircleIcon,
  CrossCircledIcon
} from "@radix-ui/react-icons";

export const statuses = [
  {
    value: true,
    label: "Đang hoạt động",
    icon: CircleIcon
  },
  {
    value: false,
    label: "Đã khoá",
    icon: CrossCircledIcon
  }
];

export const times = [
  {
    value: "today",
    label: "Hôm nay"
  },
  {
    value: "this-week",
    label: "Tuần này"
  },
  {
    value: "this-month",
    label: "Tháng này"
  },
  {
    value: "this-year",
    label: "Năm nay"
  },
  {
    value: "last-year",
    label: "Năm trước"
  }
];

export const priorities = [
  {
    label: "Admin",
    value: "admin",
    icon: ArrowDownIcon
  },
  {
    label: "Người dùng",
    value: "user",
    icon: ArrowUpIcon
  }
];
