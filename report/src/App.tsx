import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootPage from "./pages/RootPage";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/api/apollo";
import "./index.css";
import ReportPage from "./pages/ReportPage";
import { AuthContext } from "./contexts/authContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      {
        path: "/",
        element: <ReportPage />,
        index: true,
      },
      {
        path: "dashboard/report",
        element: <ReportPage />,
      },
      {
        path: "*",
        element: <ReportPage />,
      },
    ],
  },
]);

export function App() {
  const user: SignedInUser = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={user}>
        <RouterProvider router={router} />
      </AuthContext.Provider>
    </ApolloProvider>
  );
}
