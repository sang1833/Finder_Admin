export interface UserAuth {
  accessToken: string;
  accessTokenExpired: string;
  address: string | null;
  avatar: string;
  birthDate: string | null;
  displayName: string;
  email: string;
  gender: boolean;
  lastLogin: string;
  phone: string;
  refreshToken: string;
  refreshTokenExpired: string;
  role: string;
}
