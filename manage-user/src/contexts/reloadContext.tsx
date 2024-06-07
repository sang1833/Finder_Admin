import { createContext } from "react";
import React from "react";

export const ReloadContext = createContext<ReloadContextType>({
  reloadState: false,
  handleReload: () => {}
});
