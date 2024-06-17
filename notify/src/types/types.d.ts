declare module "*.png";

// Props Interfaces
interface ImageCardProps {
  post: Post;
}

interface PaginationProps {
  currentPage: number;
  pageSize: number;
  totalPosts: number;
  onPageChange: (page: number) => void;
}

interface NotificationDropdownProps {
  isLoading: boolean;
  signedInUser: SignedInUser;
  notifications: INotification[];
  handleGetAllNotifications: () => Promise<void>;
  handleGetNotifyUnread: () => Promise<void>;
  notifySocket: Socket | null;
}
interface NotificationDropdownItemProps {
  signedInUser: SignedInUser;
  notification: INotification;
}

// Other Interfaces
interface SignedInUser {
  id: number;
  accessToken: string;
  accessTokenExpired: Date;
  refreshToken: string;
  refreshTokenExpired: Date;
  expired: Date;
  avatar: string;
  displayName: string;
  email: string;
  gender: boolean;
  phone: string;
  birthDate: Date;
  address: string;
}

interface Post {
  id: number;
  title: string;
  postType: string;
  location: string;
  locationDetail: string;
  description: string;
  approved: boolean;
  viewCount: number;
  totalComments: number;
  fileName: string;
  filePath: string;
  createdDate: Date;
  updatedDate: Date;
}

interface CommentNotification {
  id: number;
  commentId: number;
  content: string;
  isRead: boolean;
  parentCommentId: number;
  postId: number;
  postTitle: string;
  senderAvatar: string;
  senderId: number;
  senderName: string;
  timestamp: Date;
  type: string;
}
interface NotifyNewPostResDto {
  postId: number;
  postTitle: string;
  senderId: number;
  senderName: string;
  senderAvatar: string;
}
interface NotifyPostReportResDto {
  postId: number;
  postTitle: string;
  senderId: number;
  senderName: string;
  senderAvatar: string;
  reportContent: string;
}
interface PostNotification {
  id: number;
  isRead: boolean;
  postId: number;
  postTitle: string;
  timestamp: Date;
  type: string;
}

interface ReportNotification {
  id: number;
  postId: number;
  postTitle: string;
  type: string;
  senderId: number;
  senderName: string;
  senderAvatar: string;
  reportContent: string;
  timestamp: string;
  isRead: boolean;
}

type INotification = ReportNotification | PostNotification;

// Socket Interface
interface NewCommentNotificationSocket {
  postId: number;
  postTitle: string;
  senderId: number;
  commentId: number;
  senderName: string;
  senderAvatar: string;
  content: string;
  type: string;
  isRead: boolean;
  timestamp: Date;
}
interface ReplyCommentNotificationSocket {
  postId: number;
  postTitle: string;
  senderId: number;
  parentCommentId: number;
  commentId: number;
  senderName: string;
  senderAvatar: string;
  content: string;
  type: string;
  isRead: boolean;
  timestamp: Date;
}
interface ApprovePostNotificationSocket {
  postId: number;
  postTitle: string;
  approved: string;
  type: string;
  isRead: boolean;
  timestamp: Date;
}
