import React from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

const PostItemCard = ({ post }: PostItemCardProps) => {
  const navigate = useNavigate();

  let approvalText = {
    text: "",
    color: ""
  };
  switch (post?.approved) {
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
    case "HIDDEN":
      approvalText.text = "Đã ẩn";
      approvalText.color = "text-black border border-black";
      break;
  }

  return (
    <Card
      className={cn(
        "w-full h-max rounded-xl flex flex-row max-w-[640px]:flex-col shadow-md"
      )}
    >
      <div className="md:w-2/12 w-[640px]:w-4/12 flex justify-center items-center overflow-hidden cursor-pointer rounded-tl-xl w-[640px]:rounded-bl-xl w-[640px]:rounded-tr-none rounded-bl-none rounded-tr-xl">
        <img
          src={
            post.filePath
              ? post.filePath
              : "https://cdn.vectorstock.com/i/preview-1x/39/63/no-photo-camera-sign-vector-3213963.jpg"
          }
          alt={post.fileName ? post.fileName : "no-image"}
          loading="lazy"
          className="object-cover w-full h-[200px] hover:scale-125 duration-300"
          onClick={() => navigate("post-details/" + post.id)}
        />
      </div>
      <div className="md:w-10/12 w-[640px]:w-8/12 justify-center items-center">
        <CardHeader>
          <CardTitle
            onClick={() => navigate("post-details/" + post.id)}
            className={cn(
              "cursor-pointer hover:text-slate-600 lg:text-xl text-base"
            )}
          >
            {post.title ? post.title : "Không có tiêu đề"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="lg:text-base text-sm">
            {post.description ? (
              <>
                {post.description.length > 150
                  ? post.description.substring(0, 150) + "..."
                  : post.description}
              </>
            ) : (
              "Không có mô tả"
            )}
          </p>
        </CardContent>
        <CardFooter
          className={cn(
            "flex justify-between w-[640px]:items-center items-end w-[640px]:flex-row flex-col"
          )}
        >
          <div className="flex justify-center items-center">
            <LocationOnOutlinedIcon />
            <p className="font-medium lg:text-base text-sm">
              {post.locationDetail
                ? post.locationDetail
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
                {post.postType ? (
                  <>
                    {post.postType === "COLLECT"
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

export default PostItemCard;
