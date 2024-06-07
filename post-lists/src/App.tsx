import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from "react-router-dom";
import RootPage from "./pages/RootPage";
import PostResultList from "./pages/PostResultList";
import PostDetails from "./pages/PostDetails";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/api/apollo";
import "./index.css";
import { AuthContext } from "./contexts/authContext";

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
        path: "dashboard/posts",
        element: <PostResultList />
      },
      {
        path: "post-details/:postId",
        element: <PostDetails />
      },
      {
        path: "/dashboard/posts/post-details/:postId",
        element: <PostDetails />
      },
      {
        path: "*",
        element: <Navigate to="/dashboard/posts" />
      }
    ]
  }
]);

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<RootPage />}>
//       <Route path="dashboard" element={<Dashboard />}>
//         <Route index element={<PostResultList />} />
//         <Route path="posts" element={<PostResultList />} />
//         <Route path="post-details/:postId" element={<PostDetails />} />
//       </Route>
//       <Route index path="*" element={<Dashboard />} />
//     </Route>
//   )
// );

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
