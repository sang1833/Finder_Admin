/* eslint-disable @typescript-eslint/no-explicit-any */
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import CardMUI from "@mui/joy/Card";
import CardMUIContent from "@mui/joy/CardContent";
import CardMUIOverflow from "@mui/joy/CardOverflow";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import ModeCommentOutlined from "@mui/icons-material/ModeCommentOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import ManageSearchOutlinedIcon from "@mui/icons-material/ManageSearchOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
// import IconButton from "@mui/joy/IconButton";
// import Face from "@mui/icons-material/Face";
// import MoreHoriz from "@mui/icons-material/MoreHoriz";
// import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
// import SendOutlined from "@mui/icons-material/SendOutlined";
// import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import React, { useContext, useEffect, useState } from "react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { formatDistanceToNow, set } from "date-fns";
import { vi } from "date-fns/locale";
import PostComments from "../Comment/PostComments";
import { Button, Stack } from "@mui/material";
import { APPROVED_POST } from "@/services/graphql/mutations";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/contexts/authContext";

export default function ReportCard({ post, setIsReset }: ReportCardProps) {
  const navigate = useNavigate();
  const user = useContext(AuthContext);

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [aprrovedPost, { loading, error }] = useMutation(APPROVED_POST);

  let approvalText = {
    text: "",
    color: "",
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
  }

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  function handleApprovedPost(approved: string) {
    return async () => {
      await aprrovedPost({
        variables: {
          bodyReq: {
            postId: post?.id,
            approved: approved,
          },
        },
      }).then((result) => {
        {
          console.log("result", result);
          if (result.data.adminApprovePost.statusCode === 200) {
            setIsReset(true);
            navigate("/dashboard/posts");
          }
        }
      });
    };
  }

  if (error) alert("Duyệt bài đăng thất bại: " + error);

  return (
    <section className="w-full flex justify-between">
      <CardMUI variant="outlined" className="lg:w-[100%] w-full rounded-xl">
        <CardMUIContent
          orientation="horizontal"
          sx={{ alignItems: "center", gap: 1 }}
        >
          <Box
            sx={{
              position: "relative",
              width: 48,
              height: 48,
              "&::before": {
                content: "''",
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                m: "-2px",
                borderRadius: "50%",
              },
            }}
          >
            <Avatar
              size="sm"
              src={post?.authorAvatar}
              sx={{ width: 48, height: 48 }}
            />
          </Box>
          <Box className="flex flex-col justify-center items-start">
            <Typography fontWeight="lg" fontFamily="Montserrat">
              {post?.authorDisplayName}
            </Typography>
            <Typography fontFamily="Montserrat" fontSize={13}>
              {formatDistanceToNow(
                post?.createdDate ? post.createdDate : new Date(),
                {
                  addSuffix: true,
                  locale: vi,
                }
              )}
            </Typography>
            <Typography>
              <div className="min-[1024px]:px-2 max-[1024px]:px-4 py-2 w-full flex text-center justify-center items-center">
                <span
                  className={`text-xs font-semibold rounded-full p-1 ${approvalText.color}`}
                >
                  {approvalText.text}
                </span>
              </div>
            </Typography>
          </Box>
        </CardMUIContent>

        <CardMUIContent
          orientation="horizontal"
          className="text-pretty"
          sx={{
            display: "flex",
            gap: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "start",
          }}
        >
          <Typography
            fontFamily="Montserrat"
            fontSize={20}
            className="font-bold"
          >
            {post?.title || "Không có tiêu đề"}
          </Typography>

          <Typography
            fontFamily="Montserrat"
            fontSize={15}
            className="font-semibold"
          >
            <ManageSearchOutlinedIcon className="mr-2" />
            {post?.postType === "LOST" ? "Tin cần tìm" : "Tin nhặt được"}
          </Typography>

          <Typography
            fontFamily="Montserrat"
            fontSize={15}
            sx={{ marginBottom: 2 }}
            className="font-semibold"
          >
            <ListOutlinedIcon className="mr-2" />
            {"Tìm " + post?.itemTypes[0]?.name}
          </Typography>

          <Typography fontFamily="Montserrat">
            {post?.description || "Không có mô tả"}
          </Typography>

          <Typography
            fontFamily="Montserrat"
            fontSize={15}
            sx={{ marginTop: 2 }}
            className="font-medium"
          >
            {`Thông tin liên lạc: ${
              post?.contactPhone || "Chưa được cung cấp"
            }`}
          </Typography>

          <Typography
            fontFamily="Montserrat"
            fontSize={15}
            className="font-medium"
          >
            <FmdGoodOutlinedIcon className="mr-2" />
            {post?.locationDetail || "Khu vực chưa được cung cấp"}
          </Typography>
        </CardMUIContent>

        <CardMUIOverflow>
          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {post?.images &&
                post?.images.map((img, index) => (
                  <CarouselItem key={index}>
                    <Card className="border-0 bg-transparent">
                      <CardContent className="flex items-center justify-center object-cover p-0 w-full h-[500px]">
                        <Dialog>
                          <DialogTrigger>
                            <img
                              src={img.filePath}
                              alt={img.fileName}
                              loading="lazy"
                              className="cursor-pointer"
                            />
                          </DialogTrigger>
                          <DialogContent
                            className={cn("border-0 rounded-xl p-0")}
                          >
                            <img
                              src={img.filePath}
                              alt={img.fileName}
                              loading="lazy"
                              className="w-full h-full object-cover rounded-xl"
                            />
                          </DialogContent>
                        </Dialog>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
            </CarouselContent>
          </Carousel>
        </CardMUIOverflow>
        <CardMUIContent
          orientation="horizontal"
          sx={{
            alignItems: "center",
            mx: -1,
            pb: 1,
          }}
          className="border-b border-slate-200"
        >
          <Box
            sx={{ width: 0, display: "flex", gap: 1 }}
            className="sm:flex-row flex-col"
          >
            <Link
              component="button"
              underline="none"
              fontFamily="Montserrat"
              fontSize="sm"
              fontWeight="lg"
              textColor="gray"
              className="text-nowrap"
            >
              <ModeCommentOutlined className="mr-2" />
              {`${post?.totalComments} Bình luận`}
            </Link>

            <Link
              component="button"
              underline="none"
              fontFamily="Montserrat"
              fontSize="sm"
              fontWeight="lg"
              textColor="gray"
              className="text-nowrap"
            >
              <RemoveRedEyeOutlinedIcon className="mr-2" />
              {`${post?.viewCount} Lượt xem`}
            </Link>
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 0.5, mx: "auto" }}
          >
            {count > 0 && (
              <div className="py-2 text-center text-sm text-muted-foreground">
                {current} / {count}
              </div>
            )}
          </Box>
        </CardMUIContent>

        <PostComments />

        <div className="absolute right-2 z-50">
          {
            <Stack spacing={2} direction="row">
              {(post?.approved === null || post?.approved === "REJECT") && (
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "hsl(222.2 47.4% 11.2%)" }}
                  onClick={handleApprovedPost("ACCEPT")}
                  disabled={loading}
                >
                  {"Duyệt bài đăng"}
                </Button>
              )}
              {(post?.approved === null || post?.approved === "ACCEPT") && (
                <Button
                  variant="outlined"
                  sx={{
                    color: "hsl(0 80% 50%)",
                    borderColor: "hsl(0 80% 50%)",
                  }}
                  onClick={handleApprovedPost("REJECT")}
                  disabled={loading}
                >
                  {"Huỷ bài đăng"}
                </Button>
              )}
            </Stack>
          }
        </div>
      </CardMUI>
    </section>
  );
}
