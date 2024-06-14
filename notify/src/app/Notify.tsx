import NotificationDropdown from "./NotificationDropdown";
import io, { Socket } from "socket.io-client";
import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import {
  GET_NOTIFY_WITH_FILTER,
  GET_NOTIFY_UNREAD
} from "@/services/graphql/queries";
import CheckResetToken from "./CheckResetToken";

const Notify = () => {
  const signedInUser = JSON.parse(localStorage.getItem("user") || "{}");
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [notifySocket, setNotifySocket] = useState<Socket | null>(null);
  const [notiyCount, setNotifyCount] = useState(0);
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
      const { data } = await getNotifyUnread();
      const resultData = data.getNumberOfNotifyUnRead.data;
      setNotifyCount(resultData.unRead);
    } catch (error) {
      console.log(error);
    }
  };

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

      const nList: any[] = resultData.listData.map((item: any) => {
        if (item.type === "NEW_POST_REPORT" || item.type === "NEW_POST") {
          return {
            id: item.id,
            commentId: item.commentId,
            content: item.content,
            isRead: item.isRead,
            parentCommentId: item.parentCommentId,
            postId: item.postId,
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
    console.log("Socket connected");

    if (signedInUser.accessToken) {
      const socket: Socket = io(
        process.env.VITE_SOCKET_NOTIFY_URL || "http://localhost:5000/notify",
        {
          transports: ["websocket"]
        }
      );
      setNotifySocket(socket);
      console.log("Socket connected");

      // Register user to Socket Server
      socket.emit("register", signedInUser.id.toString());

      return () => {
        socket.disconnect();
      };
    }
  }, []);

  useEffect(() => {
    if (signedInUser.accessToken) {
      handleGetAllNotifications();
      handleGetNotifyUnread();
    }

    // Listen to new post
    if (notifySocket) {
      notifySocket.on(
        "notifyNewPost",
        async (_payload: NewCommentNotificationSocket) => {
          console.log("New post notification received");
          handleGetNotifyUnread();
          handleGetAllNotifications();
        }
      );

      // Listen to report
      notifySocket.on(
        "notifyNewPostReport",
        async (_payload: ReplyCommentNotificationSocket) => {
          console.log("Reply post report notification received");
          handleGetNotifyUnread();
          handleGetAllNotifications();
        }
      );
    }
  }, [notifySocket]);

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
        />
      </div>
      <CheckResetToken />
    </div>
  );
};

export default Notify;
