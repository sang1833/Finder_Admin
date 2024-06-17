import NotificationDropdown from "./NotificationDropdown";
import io, { Socket } from "socket.io-client";
import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import {
  GET_NOTIFY_WITH_FILTER,
  GET_NOTIFY_UNREAD
} from "@/services/graphql/queries";
import useIsTabActive from "./IsTabActive";

const Notify = () => {
  const signedInUser = JSON.parse(localStorage.getItem("user") || "{}");
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [notifySocket, setNotifySocket] = useState<Socket | null>(null);
  const [notiyCount, setNotifyCount] = useState(0);
  const isTabActive = useIsTabActive();
  const [getNotifyUnread] = useLazyQuery(GET_NOTIFY_UNREAD, {
    context: {
      fetchPolicy: "network-only"
    }
  });

  const [getAllNotifications] = useLazyQuery(GET_NOTIFY_WITH_FILTER, {
    context: {
      headers: {
        // Authorization:
        //   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxNzUyOTc2MywiZXhwIjoxNzE3NTMzMzYzfQ.IEnmwWqJLFV1J-1sfxjOQgNE910DUek8_Jxtq6tfu5A"
        Authorization: `Bearer ${signedInUser.accessToken}`
      }
    }
  });

  const handleGetNotifyUnread = async () => {
    try {
      const { data } = await getNotifyUnread({
        fetchPolicy: "network-only"
      });
      const resultData = data.getNumberOfNotifyUnRead.data;
      console.log("resultData", resultData.unRead);
      setNotifyCount(resultData.unRead);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   console.log("notify count", notiyCount);
  // }, [notiyCount]);

  const handleGetAllNotifications = async () => {
    setIsLoading(true);

    try {
      const { data } = await getAllNotifications({
        variables: {
          filters: {
            page: 1,
            pageSize: 10
          }
        },
        fetchPolicy: "network-only"
      });
      const resultData = data.getNotifyWithFilter.data;

      console.log("resultData notify", resultData);

      const nList: any[] = resultData.listData.map((item: any) => {
        if (item.type === "NEW_POST_REPORT" || item.type === "NEW_POST") {
          return {
            id: item.id,
            postId: item.postId,
            content: item.content,
            isRead: item.isRead,
            postTitle: item.postTitle,
            senderAvatar: item.senderAvatar,
            senderId: item.senderId,
            senderName: item.senderName,
            timestamp: new Date(item.timestamp),
            type: item.type
          };
        } else {
          return {
            id: item.id,
            approved: item.approved,
            isRead: item.isRead,
            postId: item.postId,
            postTitle: item.postTitle,
            timestamp: new Date(item.timestamp),
            type: item.type
          };
        }
      });

      setNotifications(nList);
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (signedInUser.accessToken) {
      const socket: Socket = io("http://localhost:5000/notify", {
        transports: ["websocket"]
      });
      setNotifySocket(socket);
      console.log("Socket connected");

      // Register user to Socket Server
      socket.emit("register", signedInUser.id.toString());

      socket.on("notifyNewPost", async (payload: NotifyNewPostResDto) => {
        console.log("New post notification received", payload);
        handleGetNotifyUnread();
        handleGetAllNotifications();
      });

      // Listen to report
      socket.on(
        "notifyNewPostReport",
        async (payload: NotifyPostReportResDto) => {
          console.log("Reply post report notification received", payload);
          handleGetNotifyUnread();
          handleGetAllNotifications();
        }
      );
      return () => {
        socket.disconnect();
      };
    }
  }, []);

  useEffect(() => {
    if (isTabActive) {
      handleGetNotifyUnread();
      handleGetAllNotifications();
    }
  }, [isTabActive]);

  return (
    <div className="w-full h-full flex justify-center items-center gap-2">
      <p className="">Bạn có {notiyCount} thông báo mới</p>
      <div
        className={`${
          signedInUser ? "flex" : "hidden"
        } justify-center items-center mr-6`}
      >
        <NotificationDropdown
          isLoading={isLoading}
          signedInUser={signedInUser}
          notifications={notifications}
          handleGetAllNotifications={handleGetAllNotifications}
          notifySocket={notifySocket}
          handleGetNotifyUnread={handleGetNotifyUnread}
        />
      </div>
    </div>
  );
};

export default Notify;
