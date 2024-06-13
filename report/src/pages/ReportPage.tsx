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
import { GET_POST_WITH_FILTER_ADMIN } from "@/services/graphql/queries";

enum EnumApprove {
  HANDLED = "HANDLED",
  UNHANDLED = "UNHANDLED",
}

const ReportPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [handleState, setHandleState] = useState(EnumApprove.UNHANDLED);

  const [isLoading, setIsLoading] = useState(false);
  const [searchString, setSearchString] = useState<string>("");
  const [postType, setPostType] = useState<string>("all");
  const [postStatus, setPostStatus] = useState<string>("all");

  const [reports, setReports] = useState<ReportWithFilter[]>([]);
  const [getReportWithFilter] = useLazyQuery(GET_POST_WITH_FILTER_ADMIN);

  const resetFilters = () => {
    setSearchString("");
    setPostType("all");
    setPostStatus("all");

    if (searchParams.size > 0) {
      searchParams.delete("search");
      searchParams.delete("filter");

      setSearchParams(searchParams);
    }
  };

  const handleSearch = async () => {
    const filters: any = {
      page: 1,
      pageSize: 10000,
      handled: handleState,
      searchKey: searchString,
      approved: postStatus === "all" ? "" : postStatus,
    };
    if (postType !== "all") {
      filters["postType"] = postType;
    }

    setIsLoading(true);

    await getReportWithFilter({
      variables: {
        filters: filters,
      },
      fetchPolicy: "network-only",
    })
      .then((result) => {
        const resultData = result.data.adminGetPostWithFilter.data;

        const rList: ReportWithFilter[] = resultData.listData.map(
          (report: ReportWithFilter) => {
            return {
              id: report.id,
              title: report.title,
              postType: report.postType,
              location: report.location,
              locationDetail: report.locationDetail,
              description: report.description,
              approved: report.approved,
              viewCount: report.viewCount,
              totalComments: report.totalComments,
              fileName: report.fileName ? report.fileName : "",
              filePath: report.filePath ? report.filePath : "",
              createdDate: new Date(report.createdDate),
              updatedDate: new Date(report.updatedDate),
            };
          }
        );

        setReports(rList);
      })
      .catch((error) => {
        console.log(error);
      });

    setIsLoading(false);
  };

  const queryPostWithFilters = async (filters: any) => {
    setIsLoading(true);

    await getReportWithFilter({
      variables: {
        filters: filters,
      },
      fetchPolicy: "network-only",
    })
      .then((result) => {
        console.log("result: ", result);
        // const returnedData = result.data.adminGetPostWithFilter.data;
        const returnedData = result.data.adminGetPostWithFilter.data;

        const rList: ReportWithFilter[] = returnedData?.listData.map(
          (report: ReportWithFilter) => {
            return {
              id: report.id,
              title: report.title,
              postType: report.postType,
              location: report.location,
              locationDetail: report.locationDetail,
              description: report.description,
              approved: report.approved,
              viewCount: report.viewCount,
              totalComments: report.totalComments,
              fileName: report.fileName ? report.fileName : "",
              filePath: report.filePath ? report.filePath : "",
              createdDate: new Date(report.createdDate),
              updatedDate: new Date(report.updatedDate),
            };
          }
        );

        setReports(rList);
      })
      .catch((error) => {
        console.log(error);
      });

    setIsLoading(false);
  };

  useEffect(() => {
    if (searchParams.size > 0) {
      const filters: any = {
        page: 1,
        pageSize: 10000,
        handled: handleState ? handleState : "NOT_YET",
      };

      if (searchParams.get("search")) {
        setSearchString(searchParams.get("search") as string);
        filters["searchKey"] = searchParams.get("search");
      }

      if (searchParams.get("filter")) {
        switch (searchParams.get("filter")) {
          case "lost":
            setPostType("LOST");
            filters["postType"] = "LOST";
            break;
          case "collect":
            setPostType("COLLECT");
            filters["postType"] = "COLLECT";
            break;
        }
      }

      queryPostWithFilters(filters);
    } else {
      handleSearch();
    }
  }, [searchParams, handleState]);

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
              <RadioGroupItem value="REJECT" id="status-reject" />
              <Label htmlFor="status-reject">Tin đã hủy</Label>
            </div>
          </RadioGroup>
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
