import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootPage from "./pages/RootPage";
import PostResultList from "./pages/PostResultList";
import "./index.css";
import PostDetails from "./pages/PostDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      {
        path: "/",
        element: <PostResultList />,
        index: true
      },
      {
        path: "/post-details/:postId",
        element: <PostDetails />
      }
    ]
  }
]);

export function App() {
  return <RouterProvider router={router} />;
}
