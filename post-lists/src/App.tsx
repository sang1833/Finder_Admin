import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route
} from "react-router-dom";
import RootPage from "./pages/RootPage";
import PostResultList from "./pages/PostResultList";
import PostDetails from "./pages/PostDetails";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/api/apollo";
import Dashboard from "./pages/Dashboard";
import "./index.css";

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
  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
}
