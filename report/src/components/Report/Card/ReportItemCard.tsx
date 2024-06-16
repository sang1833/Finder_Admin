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
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { format } from "date-fns";

const ReportItemCard = ({ report }: ReportItemCardProps) => {
  const navigate = useNavigate();

  let approvalText = {
    text: "",
    color: "",
  };
  switch (report?.handled) {
    case false:
      approvalText.text = "Chưa xử lý";
      approvalText.color = "text-yellow-500 border border-yellow-500";
      break;
    case true:
      approvalText.text = "Đã xử lý";
      approvalText.color = "text-green-700 border border-green-700";
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
            report.postImage
              ? report.postImage
              : "https://cdn.vectorstock.com/i/preview-1x/39/63/no-photo-camera-sign-vector-3213963.jpg"
          }
          loading="lazy"
          className="object-cover w-full h-[200px] hover:scale-125 duration-300"
          onClick={() => navigate("report-details/" + report.id)}
        />
      </div>

      <div className="md:w-10/12 sm:w-8/12 justify-center items-center">
        <CardHeader>
          <CardTitle
            onClick={() => navigate("report-details/" + report.id)}
            className={cn(
              "cursor-pointer hover:text-slate-600 lg:text-xl text-base"
            )}
          >
            {report.reportContent ? (
              <>
                {report.reportContent.length > 150
                  ? report.reportContent.substring(0, 150) + "..."
                  : report.reportContent}
              </>
            ) : (
              "Không có lý do"
            )}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex items-center gap-4">
          <img
            className="w-[40px] h-[40px] rounded-full overflow-auto object-cover"
            src={report.senderAvatar}
            alt="Avatar"
          />
          <div>
            <p className="lg:text-base text-sm font-semibold">
              {report.senderName ? report.senderName : "Không có tên"}
            </p>
            <p className="lg:text-base text-sm">
              {report.senderEmail ? report.senderEmail : "Không có email"}
            </p>
          </div>
        </CardContent>

        <CardFooter
          className={cn(
            "flex justify-between sm:items-center items-end sm:flex-row flex-col"
          )}
        >
          <div className="flex justify-center items-center gap-2">
            <AccessTimeIcon />
            <p className="font-medium lg:text-base text-sm">
              {report.createdDate.toString()
                ? format(report.createdDate, "dd/MM/yyyy")
                : "Không có thời điểm tạo"}
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
          </div>
        </CardFooter>
      </div>
    </Card>
  );
};

export default ReportItemCard;
