import React from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

const ReportItemCard = ({ report }: ReportItemCardProps) => {
  const navigate = useNavigate();

  let approvalText = {
    text: "",
    color: "",
  };
  switch (report?.approved) {
    case null:
      approvalText.text = "Chưa duyệt";
      approvalText.color = "text-yellow-500 border border-yellow-500";
      break;
    case "ACCEPT":
      approvalText.text = "Đã duyệt";
      approvalText.color = "text-green-700 border border-green-700";
      break;
    case "REJECT":
      approvalText.text = "Từ chối";
      approvalText.color = "text-red-500 border border-red-500";
      break;
  }

  return (
    <Card
      className={cn(
        "w-full h-max rounded-xl flex sm:flex-row flex-col shadow-md"
      )}
    >
      <div className="md:w-2/12 sm:w-4/12 flex justify-center items-center overflow-hidden cursor-pointer rounded-tl-xl sm:rounded-bl-xl sm:rounded-tr-none rounded-bl-none rounded-tr-xl">
        <img
          src={
            report.filePath
              ? report.filePath
              : "https://cdn.vectorstock.com/i/preview-1x/39/63/no-photo-camera-sign-vector-3213963.jpg"
          }
          alt={report.fileName ? report.fileName : "no-image"}
          loading="lazy"
          className="object-cover w-full h-[200px] hover:scale-125 duration-300"
          onClick={() => navigate("post-details/" + report.id)}
        />
      </div>
      <div className="md:w-10/12 sm:w-8/12 justify-center items-center">
        <CardHeader>
          <CardTitle
            onClick={() => navigate("post-details/" + report.id)}
            className={cn(
              "cursor-pointer hover:text-slate-600 lg:text-xl text-base"
            )}
          >
            {report.title ? report.title : "Không có tiêu đề"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="lg:text-base text-sm">
            {report.description ? (
              <>
                {report.description.length > 150
                  ? report.description.substring(0, 150) + "..."
                  : report.description}
              </>
            ) : (
              "Không có mô tả"
            )}
          </p>
        </CardContent>
        <CardFooter
          className={cn(
            "flex justify-between sm:items-center items-end sm:flex-row flex-col"
          )}
        >
          <div className="flex justify-center items-center">
            <LocationOnOutlinedIcon />
            <p className="font-medium lg:text-base text-sm">
              {report.locationDetail
                ? report.locationDetail
                : "Khu vực chưa được cung cấp"}
            </p>
          </div>

          <div className="flex flex-col justify-end">
            <div className="min-[1024px]:px-2 max-[1024px]:px-4 py-2 flex text-center justify-end items-center">
              <span
                className={`text-xs font-semibold rounded-full p-1 ${approvalText.color}`}
              >
                {approvalText.text}
              </span>
            </div>
            <div className="flex justify-center items-center">
              <p className="font-semibold lg:text-base text-sm">
                {report.postType ? (
                  <>
                    {report.postType === "COLLECT"
                      ? "Tin nhặt được"
                      : "Tin cần tìm"}
                  </>
                ) : (
                  "Loại tin không xác định"
                )}
              </p>
            </div>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
};

export default ReportItemCard;
