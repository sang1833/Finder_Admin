declare module "*.png";

type ReloadContextType = {
  reloadState: boolean;
  handleReload: () => void;
};

interface SnackbarProps {
  isShow: boolean;
  text: string;
  setIsShow: (value: boolean) => void;
  showSnackbar: (value: string) => void;
}

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
