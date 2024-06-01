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
  approved: boolean;
  createdDate: string;
  description: string;
  fileName: string;
  filePath: string;
  location: string;
  locationDetail: string;
  postType: string;
  title: string;
  updatedDate: string;
}

interface PostDetail {
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
}

interface PostImage {
  fileName: string;
  filePath: string;
}

interface ItemType {
  id: number;
  name: string;
}

interface PostCardProps {
  post: PostDetail | null;
}
