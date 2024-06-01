import React, { useReducer } from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import PostsList from "@/components/Post/PostsList";
import { level1s } from "dvhcvn";
import { Button } from "@/components/ui/button";
import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const categories = [
  "Ví/Giấy tờ",
  "Thú cưng (Chó/Mèo)",
  "Tìm người",
  "Điện thoại/Tablet/Laptop",
  "Xe máy/Ô tô",
  "Đồ vật khác"
];

enum EnumApprove {
  ACCEPT = "ACCEPT",
  REJECT = "REJECT",
  NOT_YET = "NOT_YET"
}

function reducer(state: any, action: any) {
  if (action.type === "CHANGE_SEARCH_INFOR") {
    return {
      searchString: action.searchString,
      postType: action.postType,
      category: action.category,
      city: action.city
    };
  } else if (action.type === "RESET") {
    return {
      searchString: "",
      postType: "",
      category: "",
      city: "all"
    };
  }
  throw Error("Error in reducer");
}

const PostResultList = () => {
  const [approvedState, setApprovedState] = useState(EnumApprove.NOT_YET);
  const [searchString, setSearchString] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [city, setCity] = useState<string>("all");
  const [state, dispatch] = useReducer(reducer, {
    searchString: "",
    postType: "",
    category: "",
    city: "all"
  });

  const resetFilters = () => {
    setSearchString("");
    setType("");
    setCategory("");
    setCity("all");
    dispatch({
      type: "RESET"
    });
  };

  const handleSearch = () => {
    dispatch({
      type: "CHANGE_SEARCH_INFOR",
      searchString: searchString,
      postType: type,
      category: category,
      city: city
    });
  };

  return (
    <section className="flex flex-col justify-center items-center gap-4">
      <div className="w-full flex justify-start">
        <h1 className="py-4 font-bold text-2xl">Danh sách bài đăng</h1>
      </div>
      <div>
        <Separator className={cn("w-full bg-slate-200 my-2")} />
        <div className="w-full h-full flex md:flex-row flex-col items-center gap-8">
          <Label htmlFor="search" className="font-semibold text-lg ">
            Trạng thái
          </Label>
          <ToggleGroup
            value={approvedState}
            type="single"
            className="border rounded-lg"
            onValueChange={(value) =>
              setApprovedState(EnumApprove[value as keyof typeof EnumApprove])
            }
          >
            <ToggleGroupItem
              value={EnumApprove.ACCEPT}
              aria-label={`Toggle ${EnumApprove.ACCEPT}`}
              className={
                approvedState === EnumApprove.ACCEPT
                  ? "data-[state=on]:bg-black data-[state=on]:text-white"
                  : ""
              }
            >
              <p>Đã duyệt</p>
            </ToggleGroupItem>
            <ToggleGroupItem
              value={EnumApprove.NOT_YET}
              aria-label={`Toggle ${EnumApprove.NOT_YET}`}
              className={
                approvedState === EnumApprove.NOT_YET
                  ? "data-[state=on]:bg-black data-[state=on]:text-white"
                  : ""
              }
            >
              <p>Chưa duyệt</p>
            </ToggleGroupItem>
            <ToggleGroupItem
              value={EnumApprove.REJECT}
              aria-label={`Toggle ${EnumApprove.REJECT}`}
              className={
                approvedState === EnumApprove.REJECT
                  ? "data-[state=on]:bg-black data-[state=on]:text-white"
                  : ""
              }
            >
              <p>Đã huỷ</p>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
      <div className="w-full bg-white shadow-sm flex flex-col justify-center items-center border-2 border-slate-200 rounded-xl p-4 gap-4">
        <div className="w-full flex justify-between items-center">
          <Button
            onClick={resetFilters}
            className="rounded-xl text-lg gap-2 bg-red-600 hover:bg-red-500"
          >
            <ChangeCircleOutlinedIcon />
            Xóa bộ lọc
          </Button>
        </div>

        <Separator className={cn("w-full bg-slate-200 my-2")} />

        <div className="w-full h-full flex md:flex-row flex-col gap-8">
          <div className="lg:w-2/5 md:w-1/4 flex flex-col gap-2">
            <Label htmlFor="search" className="font-semibold text-lg">
              Từ khóa
            </Label>
            <Input
              type="text"
              id="search"
              placeholder="Nhập từ khóa cần tìm"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
              className="border-2 border-slate-200 rounded-xl"
            />
          </div>

          <RadioGroup
            value={type}
            onValueChange={(value: string) => setType(value)}
            className="lg:w-1/5 md:w-1/4"
          >
            <p className="font-semibold text-lg">Loại tin</p>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="LOST" id="tin-can-tim" />
              <Label htmlFor="tin-can-tim">Tin cần tìm</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="COLLECT" id="tin-nhat-duoc" />
              <Label htmlFor="tin-nhat-duoc">Tin nhặt được</Label>
            </div>
          </RadioGroup>

          <div className="lg:w-1/5 md:w-1/4 flex flex-col gap-2">
            <p className="font-semibold text-lg">Chọn khu vực</p>
            <Select
              value={city}
              onValueChange={(value: string) => setCity(value)}
            >
              <SelectTrigger className="border-2 border-slate-200 rounded-xl">
                <SelectValue placeholder="Toàn quốc" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem key={-1} value="all">
                  Toàn quốc
                </SelectItem>
                {level1s.map((item, index) => (
                  <SelectItem key={index} value={item.name}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="lg:w-1/5 md:w-1/4 flex flex-col gap-2">
            <p className="font-semibold text-lg">Danh mục</p>
            <Select
              value={category}
              onValueChange={(value: string) => setCategory(value)}
            >
              <SelectTrigger className="border-2 border-slate-200 rounded-xl">
                <SelectValue placeholder="Tất cả" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem key={-1} value="all">
                  Tất cả
                </SelectItem>
                {categories.map((item: string, index: number) => (
                  <SelectItem key={index} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="w-full flex md:justify-end justify-center items-center">
          <Button onClick={handleSearch} className="rounded-xl gap-2">
            <SearchOutlinedIcon />
            Tìm kiếm
          </Button>
        </div>
      </div>

      <PostsList
        approvedState={approvedState}
        searchString={state.searchString}
        type={state.postType}
        category={state.category}
        city={state.city}
      />
    </section>
  );
};

export default PostResultList;
