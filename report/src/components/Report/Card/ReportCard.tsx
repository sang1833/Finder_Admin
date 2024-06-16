/* eslint-disable @typescript-eslint/no-explicit-any */
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import CardMUI from "@mui/joy/Card";
import CardMUIContent from "@mui/joy/CardContent";
import CardMUIOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import ManageSearchOutlinedIcon from "@mui/icons-material/ManageSearchOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import { Card, CardContent } from "@/components/ui/card";
import LargeSpinner from "@/components/LargeSpinner";
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
import { Button, Stack } from "@mui/material";
import { HANDLED_REPORT } from "@/services/graphql/mutations";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/contexts/authContext";
import { GET_POST_BY_ID, GET_USER_BY_ID } from "@/services/graphql/queries";

export default function ReportCard({
  report,
  isReset,
  setIsReset,
}: ReportCardProps) {
  const navigate = useNavigate();
  const user = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [handledReport, { loading, error }] = useMutation(HANDLED_REPORT, {
    context: {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    },
  });
  const [getPostDetails] = useLazyQuery(GET_POST_BY_ID);
  const [getUserDetails] = useLazyQuery(GET_USER_BY_ID, {
    context: {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    },
  });
  const [post, setPost] = useState<PostDetail | null>(null);
  const [sender, setSender] = useState<UserDetail | null>(null);

  const fetchPost = async () => {
    await getPostDetails({
      variables: {
        id: Number(report?.postId),
      },
      fetchPolicy: "network-only",
    })
      .then((result) => {
        const resultData = result.data.getPostById.data;

        const pData: PostDetail = {
          id: resultData.id,
          title: resultData.title,
          location: resultData.location,
          postType: resultData.postType,
          description: resultData.description,
          contactPhone: resultData.contactPhone,
          locationDetail: resultData.locationDetail,
          authorId: resultData.authorId,
          authorAvatar: resultData.authorAvatar,
          authorDisplayName: resultData.authorDisplayName,
          images:
            resultData.images.length > 0
              ? resultData.images
              : [
                  {
                    fileName: "Ảnh mặc định",
                    filePath:
                      "https://0711.vn/assets/images/illustration_11.jpg",
                  },
                ],
          itemTypes: resultData.itemTypes,
          createdDate: new Date(resultData.createdDate),
          updatedDate: new Date(resultData.updatedDate),
          viewCount: resultData.viewCount,
          totalComments: resultData.totalComments,
          approved: resultData.approved,
        };

        setPost(pData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchUser = async () => {
    await getUserDetails({
      variables: {
        id: Number(report?.senderId),
      },
      fetchPolicy: "network-only",
    })
      .then((result) => {
        const resultData = result.data.getUserProfileById.data;

        const uData: UserDetail = {
          id: resultData.id,
          email: resultData.email,
          phone: resultData.phone,
          displayName: resultData.displayName,
          address: resultData.address,
          gender: resultData.gender,
          activate: resultData.activate,
          avatar: resultData.avatar,
          createdDate: new Date(resultData.createdDate),
          updatedDate: new Date(resultData.updatedDate),
        };

        setSender(uData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    fetchPost();
    fetchUser();
    setIsLoading(false);
  }, [report]);

  function handleReport(hidden: boolean) {
    return async () => {
      await handledReport({
        variables: {
          bodyReq: {
            id: report?.id,
            hiddenPost: hidden,
          },
        },
      }).then((result) => {
        {
          if (result.data.handlePostReport.statusCode === 200) {
            setIsReset(true);
            navigate("/dashboard/report");
          }
        }
      });
    };
  }

  if (error) alert("Duyệt báo cáo thất bại: " + error);

  return (
    <section className="w-full flex-col justify-between">
      {isLoading ? (
        <div className="w-full flex justify-center items-center">
          <LargeSpinner />
        </div>
      ) : (
        <CardMUI
          variant="outlined"
          className="lg:w-[100%] w-full rounded-xl mb-6"
        >
          <CardMUIContent
            orientation="horizontal"
            sx={{
              alignItems: "center",
              gap: 1,
            }}
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
                src={sender?.avatar}
                sx={{ width: 48, height: 48 }}
              />
            </Box>

            <Box className="flex flex-col justify-center items-start">
              <Typography fontWeight="lg" fontFamily="Montserrat">
                {sender?.displayName}
              </Typography>
              <Typography fontFamily="Montserrat" fontSize={13}>
                {formatDistanceToNow(
                  report?.createdDate ? report.createdDate : new Date(),
                  {
                    addSuffix: true,
                    locale: vi,
                  }
                )}
              </Typography>

              <div className="min-[1024px]:px-0 max-[1024px]:px-0 py-2 w-full flex text-center justify-start items-center">
                <span
                  className={`text-xs font-semibold rounded-full px-4 py-1 ${
                    report?.handled === true
                      ? "text-green-700 border border-green-700"
                      : "text-yellow-500 border border-yellow-500"
                  }`}
                >
                  {report?.handled === true ? "Đã xử lý" : "Chưa xử lý"}
                </span>
              </div>
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
              {report?.reportContent || "Không có lý do"}
            </Typography>
          </CardMUIContent>

          {report?.handled === false ? (
            <div className="absolute right-2 z-50">
              {
                <Stack spacing={2} direction="row">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "hsl(222.2 47.4% 11.2%)",
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "#fff",
                        color: "hsl(222.2 47.4% 11.2%)",
                      },
                      fontWeight: "bold",
                    }}
                    onClick={handleReport(true)}
                    disabled={loading}
                  >
                    {"Ẩn bài đăng"}
                  </Button>

                  <Button
                    variant="outlined"
                    sx={{
                      color: "hsl(134, 100%, 66%)",
                      borderColor: "hsl(134, 100%, 66%)",
                      "&:hover": {
                        borderColor: "hsl(134, 100%, 66%)",
                      },
                      fontWeight: "bold",
                    }}
                    onClick={handleReport(false)}
                    disabled={loading}
                  >
                    {"Hợp lệ"}
                  </Button>
                </Stack>
              }
            </div>
          ) : post?.approved === "ACCEPT" ? (
            <div className="absolute right-2 z-50">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "hsl(222.2 47.4% 11.2%)",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#fff",
                    color: "hsl(222.2 47.4% 11.2%)",
                  },
                  fontWeight: "bold",
                }}
                onClick={handleReport(true)}
                disabled={loading}
              >
                {"Ẩn bài đăng"}
              </Button>
            </div>
          ) : (
            <div className="absolute right-2 z-50">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "hsl(139, 96%, 36%)",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#fff",
                    color: "hsl(139, 96%, 36%)",
                  },
                  fontWeight: "bold",
                }}
                onClick={handleReport(true)}
                disabled={loading}
              >
                {"Hiện bài đăng"}
              </Button>
            </div>
          )}
        </CardMUI>
      )}

      {isLoading ? (
        <div className="w-full flex justify-center items-center">
          <LargeSpinner />
        </div>
      ) : (
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
              <div className="min-[1024px]:px-0 max-[1024px]:px-0 py-2 w-full flex text-center justify-start items-center">
                <span
                  className={`text-xs font-semibold rounded-full px-4 py-1 ${
                    post?.approved === "ACCEPT"
                      ? "text-green-700 border border-green-700"
                      : "text-gray-500 border border-gray-500"
                  }`}
                >
                  {post?.approved === "ACCEPT" ? "Đã duyệt" : "Đã ẩn"}
                </span>
              </div>
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
        </CardMUI>
      )}
    </section>
  );
}
