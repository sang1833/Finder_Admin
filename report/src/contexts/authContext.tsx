import { createContext } from "react";

/* 
interface SignedInUser {
  accessToken: string;
  accessTokenExpired: string;
  address: string | null;
  avatar: string;
  birthDate: string | null;
  displayName: string;
  email: string;
  gender: boolean;
  id: number;
  lastLogin: string;
  phone: string;
  refreshToken: string;
  refreshTokenExpired: string;
  role: string;
}
*/

export const AuthContext = createContext<SignedInUser>({
  accessToken: "",
  accessTokenExpired: "",
  address: "",
  avatar: "",
  birthDate: "",
  displayName: "",
  email: "",
  gender: false,
  id: 0,
  lastLogin: "",
  phone: "",
  refreshToken: "",
  refreshTokenExpired: "",
  role: ""
});
