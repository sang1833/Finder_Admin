import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootPage from "./pages/RootPage";
import ManageUserPage from "./pages/ManageUserPage";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/api/apollo";
import "./index.css";
import { ReloadContext } from "./contexts/reloadContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      {
        path: "/",
        element: <ManageUserPage />,
        index: true
      },
      {
        path: "dashboard/manage-user",
        element: <ManageUserPage />,
        index: true
      },
      {
        path: "*",
        element: <ManageUserPage />
      }
    ]
  }
]);

export function App() {
  const [reloadState, setReloadState] = useState(false);

  function handleReload() {
    setReloadState((prev) => !prev);
  }

  return (
    <ApolloProvider client={client}>
      <ReloadContext.Provider value={{ reloadState, handleReload }}>
        <RouterProvider router={router} />
      </ReloadContext.Provider>
    </ApolloProvider>
  );
}
