/// <reference types="vite/client" />

declare module "*.png";

type Action = {
  type: string;
  payload?: any;
};

interface Position {
  latitude: number | null;
  longitude: number | null;
}

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

// Other Interfaces
interface SignedInUser {
  accessToken?: string;
  accessTokenExpired?: string;
  address?: string | null;
  avatar?: string;
  birthDate?: string | null;
  displayName?: string;
  email?: string;
  gender?: boolean;
  id?: number;
  lastLogin?: string;
  phone?: string;
  refreshToken?: string;
  refreshTokenExpired?: string;
  role?: string;
}

interface Post {
  id: number;
  approved: string;
  createdDate: string;
  description: string;
  fileName: string;
  filePath: string;
  location: string;
  locationDetail: string;
  postType: string;
  title: string;
  updatedDate: string;
  viewCount: number;
  totalComments: number;
}

interface ReportWithFilter {
  id: number;
  title: string;
  postType: string;
  location: string;
  locationDetail: string;
  description: string;
  approved: string;
  viewCount: number;
  totalComments: number;
  fileName: string;
  filePath: string;
  createdDate: Date;
  updatedDate: Date;
}

interface ReportListProps {
  isLoading: boolean;
  reports: ReportWithFilter[];
}

interface ReportItemCardProps {
  report: ReportWithFilter;
}

interface ResultOFPostI {
  listData: Post[];
  totalCount: number;
}

/*
query Data($getPostByIdId: Int!) {
  getPostById(id: $getPostByIdId) {
    data {
      viewCount
      updatedDate
      totalComments
      title
      location
      postType
      locationDetail
      itemTypes {
        id
        name
      }
      images {
        filePath
        fileName
      }
      id
      description
      createdDate
      contactPhone
      authorId
      authorAvatar
      approved
      authorDisplayName
    }
  }
}
*/

interface ReportDetail {
  id: number;
  title: string;
  location: string;
  postType: string;
  description: string;
  contactPhone: string;
  locationDetail: string;
  authorId: number;
  authorAvatar: string;
  authorDisplayName: string;
  images: PostImage[];
  itemTypes: ItemType[];
  createdDate: Date;
  updatedDate: Date;
  viewCount: number;
  totalComments: number;
  approved: string;
}

interface PostImage {
  fileName: string;
  filePath: string;
}

interface ItemType {
  id: number;
  name: string;
}

interface ReportCardProps {
  post: ReportDetail | null;
  isReset?: boolean;
  setIsReset: (value: boolean) => void;
}

interface CommentItemProps {
  postId: number;
  comment: Comment;
  level: number;
}

interface Comment {
  id: number;
  parentCommentId: number;
  postId: number;
  senderId: number;
  displayName: string;
  avatar: string;
  isEdited: boolean;
  content: string;
  createdDate: string;
  updatedDate: string;
  subComments: Comment[];
}
