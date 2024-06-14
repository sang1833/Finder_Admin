import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useLazyQuery } from "@apollo/client";
import ReportsList from "@/components/Report/ReportsList";
import { GET_REPORT_WITH_FILTER_ADMIN } from "@/services/graphql/queries";

enum EnumApprove {
  HANDLED = "HANDLED",
  UNHANDLED = "UNHANDLED",
}

const ReportPage = () => {
  const template: ReportWithFilter[] = [
    {
      id: 1,
      reportContent: "Thông tin sai lệch",
      handled: false,
      postId: 2,
      postTitle: "Thẻ sinh viên UIT mang tên Nguyễn Văn B",
      postType: "COLLECT",
      postLocation: "Thủ đô Hà Nội",
      postImage: "",
      postApproved: "ACCEPT",
      senderId: 9,
      senderName: "Sang Nguyễn Thanh",
      senderAvatar:
        "https://lh3.googleusercontent.com/a/ACg8ocJJkKHhW-Zci8HBW2Ehm7uKWGseBW32CthYEjja5E2bITwt0lw=s96-c",
      senderEmail: "20521833@gm.uit.edu.vn",
      createdDate: new Date("2024-06-10"),
      updatedDate: new Date("2024-06-11"),
    },
  ];

  const [handleState, setHandleState] = useState(EnumApprove.UNHANDLED);

  const [isLoading, setIsLoading] = useState(false);
  const [searchString, setSearchString] = useState<string>("");
  const [postType, setPostType] = useState<string>("all");
  const [postStatus, setPostStatus] = useState<string>("all");

  const [reports, setReports] = useState<ReportWithFilter[]>([]);
  const [getReportWithFilter] = useLazyQuery(GET_REPORT_WITH_FILTER_ADMIN);

  const resetFilters = () => {
    setSearchString("");
    setPostType("all");
    setPostStatus("all");
  };

  const handleSearch = async () => {
    const fetchData = async (
      filters: any,
      callback: (data: ReportWithFilter[]) => void
    ) => {
      try {
        const result = await getReportWithFilter({
          variables: {
            filters: filters,
          },
          fetchPolicy: "network-only",
        });

        const resultData = result.data.adminGetPostReportWithFilter.data;

        const rList: ReportWithFilter[] = resultData.listData.map(
          (report: ReportWithFilter) => ({
            id: report.id,
            reportContent: report.reportContent,
            handled: report.handled,
            postId: report.postId,
            postTitle: report.postTitle,
            postType: report.postType,
            postLocation: report.postLocation,
            postImage:
              report.postImage ||
              "https://0711.vn/assets/images/illustration_11.jpg",
            postApproved: report.postApproved,
            senderId: report.senderId,
            senderName: report.senderName,
            senderAvatar: report.senderAvatar,
            senderEmail: report.senderEmail,
            createdDate: new Date(report.createdDate),
            updatedDate: new Date(report.updatedDate),
          })
        );

        callback(rList);
      } catch (error) {
        console.log(error);
      }
    };

    const filters: any = {
      page: 1,
      pageSize: 10000,
      handled: handleState === EnumApprove.HANDLED ? true : false,
      searchKey: searchString,
      approved: handleState === EnumApprove.HANDLED ? postStatus : "ACCEPT",
    };

    if (postType !== "all") {
      filters["postType"] = postType;
    }

    if (postStatus === "all") {
      setIsLoading(true);

      filters["approved"] = "ACCEPT";
      await fetchData(filters, (data) => {
        setReports(data);
      });

      filters["approved"] = "HIDDEN";
      await fetchData(filters, (data) => {
        setReports((prev) =>
          [...prev, ...data].sort(
            (a, b) => b.createdDate.getTime() - a.createdDate.getTime()
          )
        );
      });

      setIsLoading(false);
    } else {
      setIsLoading(true);

      await fetchData(filters, (data) => {
        setReports(data);
      });

      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [handleState]);

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div className="w-full flex justify-start">
        <h1 className="py-4 font-bold text-2xl">Báo cáo</h1>
      </div>

      <div>
        <Separator className={cn("w-full bg-slate-200 my-2")} />
        <div className="w-full h-full flex md:flex-row flex-col items-center gap-8">
          <Label htmlFor="search" className="font-semibold text-lg ">
            Tình trạng
          </Label>
          <ToggleGroup
            value={handleState}
            type="single"
            className="border rounded-lg"
            onValueChange={(value) =>
              setHandleState(EnumApprove[value as keyof typeof EnumApprove])
            }
          >
            <ToggleGroupItem
              value={EnumApprove.UNHANDLED}
              aria-label={`Toggle ${EnumApprove.UNHANDLED}`}
              className={
                handleState === EnumApprove.UNHANDLED
                  ? "data-[state=on]:bg-yellow-700 data-[state=on]:text-white"
                  : ""
              }
            >
              <p>Chưa xử lý</p>
            </ToggleGroupItem>
            <ToggleGroupItem
              value={EnumApprove.HANDLED}
              aria-label={`Toggle ${EnumApprove.HANDLED}`}
              className={
                handleState === EnumApprove.HANDLED
                  ? "data-[state=on]:bg-green-700 data-[state=on]:text-white"
                  : ""
              }
            >
              <p>Đã xử lý</p>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      <div className="w-full bg-white shadow-sm flex flex-col justify-center items-center border-2 border-slate-200 rounded-xl p-4 gap-4">
        <div className="w-full flex justify-between items-center">
          <p className="font-semibold text-xl">Bộ lọc</p>

          <Button
            onClick={resetFilters}
            className="rounded-xl text-lg gap-2 bg-red-600 hover:bg-red-500"
          >
            <ChangeCircleOutlinedIcon />
            Xóa bộ lọc
          </Button>
        </div>

        <Separator className={cn("w-full bg-slate-200 my-2")} />

        <div className="w-full h-full flex lg:flex-row flex-col gap-28">
          <div className="xl:w-2/5 lg:w-1/4 flex flex-col gap-2">
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
            value={postType}
            onValueChange={(value: string) => setPostType(value)}
            className="xl:w-1/5 lg:w-1/4"
          >
            <p className="font-semibold text-lg">Loại tin</p>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="type-all" />
              <Label htmlFor="type-all">Tất cả</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="LOST" id="type-lost" />
              <Label htmlFor="type-lost">Tin cần tìm</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="COLLECT" id="type-collect" />
              <Label htmlFor="type-collect">Tin nhặt được</Label>
            </div>
          </RadioGroup>

          {handleState === EnumApprove.HANDLED ? (
            <RadioGroup
              value={postStatus}
              onValueChange={(value: string) => setPostStatus(value)}
              className="xl:w-1/5 lg:w-1/4"
            >
              <p className="font-semibold text-lg">Trạng thái tin</p>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="status-all" />
                <Label htmlFor="status-all">Tất cả</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ACCEPT" id="status-accept" />
                <Label htmlFor="status-accept">Tin đã duyệt</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="HIDDEN" id="status-hidden" />
                <Label htmlFor="status-hidden">Tin đã ẩn</Label>
              </div>
            </RadioGroup>
          ) : (
            <></>
          )}
        </div>

        <div className="w-full flex xl:justify-end justify-center items-center">
          <Button onClick={handleSearch} className="rounded-xl gap-2">
            <SearchOutlinedIcon />
            Tìm kiếm
          </Button>
        </div>
      </div>

      <ReportsList isLoading={isLoading} reports={reports} />
    </div>
  );
};

export default ReportPage;
