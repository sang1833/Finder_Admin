/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { Bell, BellDotIcon, Dot } from "lucide-react";
import { useMutation } from "@apollo/client";
import { MARK_NOTIFY_AS_READ } from "@/services/graphql/mutations";
import React, { useEffect } from "react";

const EmptyNotificationsList = () => {
  return (
    <div className="w-full h-[100px] flex justify-center items-center">
      <p className="text-center font-semibold text-slate-500">
        Không có thông báo nào
      </p>
    </div>
  );
};

const NotificationDropdownItem = ({
  signedInUser,
  notification
}: NotificationDropdownItemProps) => {
  const [markNotifyAsRead] = useMutation(MARK_NOTIFY_AS_READ, {
    context: {
      headers: {
        Authorization: `Bearer ${signedInUser.accessToken}`
      }
    }
  });

  const handleNavigateToPost = async () => {
    if (!notification.isRead) {
      try {
        console.log("Marking notification as read...");
        await markNotifyAsRead({
          variables: {
            ids: [notification.id]
          }
        });
      } catch (error) {
        console.log(error);
      } finally {
        if (
          notification.type === "NEW_POST_REPORT" ||
          notification.type === "NEW_POST"
        ) {
          // navigate(`/post-details/${notification.postId}`);
          // window.location.href = `/dashboard/post-details/${notification.postId}`;
        } else {
          // navigate(`/my-posts/${notification.postId}`);
          // window.location.href = `/dashboard/my-posts/${notification.postId}`;
        }
      }
    }
  };

  const renderNotificationTitle = () => {
    if (notification.type === "NEW_POST_REPORT") {
      const title1 = "Có bài viết mới bị báo cáo";

      return title1.length > 50 ? title1.slice(0, 50) + "..." : title1;
    }

    if (notification.type === "NEW_POST") {
      const title2 = "Có bài viết mới được đăng";

      return title2.length > 50 ? title2.slice(0, 50) + "..." : title2;
    }

    return "";
  };

  const renderNotificationDescription = () => {
    if (notification.type === "NEW_POST_REPORT") {
      const des1 = `${
        (notification as ReportNotification).senderName
      } đã báo cáo bài viết: "${notification.postTitle}" với nội dung "${
        (notification as ReportNotification).reportContent
      }"`;

      return des1.length > 50 ? des1.slice(0, 50) + "..." : des1;
    }

    if (notification.type === "NEW_POST") {
      const des2 = `${
        (notification as ReportNotification).senderName
      } đã tạo bài viết.`;

      return des2.length > 50 ? des2.slice(0, 50) + "..." : des2;
    }

    return "";
  };

  return (
    <DropdownMenuItem className="cursor-pointer w-full rounded-lg">
      <Alert
        className={`border-none ${
          notification.isRead ? "bg-slate-100" : "bg-slate-300"
        }`}
        onClick={handleNavigateToPost}
      >
        <AlertTitle>{renderNotificationTitle()}</AlertTitle>

        <AlertDescription>{renderNotificationDescription()}</AlertDescription>
      </Alert>
    </DropdownMenuItem>
  );
};

const NotificationDropdown = ({
  isLoading,
  signedInUser,
  notifications,
  handleGetAllNotifications,
  notifySocket
}: NotificationDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="relative flex">
          {notifications.length > 0 &&
          notifications.some((item) => !item.isRead) ? (
            <Dot className="text-red-500 w-10 h-10 absolute left-0 bottom-1" />
          ) : (
            <></>
          )}
          <Bell />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-6 mr-2 w-[500px] max-h-[400px] overflow-y-scroll">
        <DropdownMenuLabel>Thông báo</DropdownMenuLabel>

        {notifications.length > 0 &&
          !isLoading &&
          notifications.map((item: INotification, index: number) => (
            <NotificationDropdownItem
              key={index}
              signedInUser={signedInUser}
              notification={item}
            />
          ))}

        {notifications.length === 0 && !isLoading && <EmptyNotificationsList />}

        {isLoading && (
          <div className="w-full flex flex-col justify-center items-center space-y-3 my-2">
            <div className="w-full flex items-center space-x-4 pl-2">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[400px]" />
                <Skeleton className="h-4 w-[300px]" />
              </div>
            </div>

            <div className="w-full flex items-center space-x-4 pl-2">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[400px]" />
                <Skeleton className="h-4 w-[300px]" />
              </div>
            </div>

            <div className="w-full flex items-center space-x-4 pl-2">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[400px]" />
                <Skeleton className="h-4 w-[300px]" />
              </div>
            </div>
          </div>
        )}

        <DropdownMenuSeparator />

        {/* <div className="cursor-pointer flex justify-end items-center my-2 mr-2">
          <p className="font-semibold text-sm text-blue-500 hover:text-blue-600">
            Xem thêm...
          </p>
        </div> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;
