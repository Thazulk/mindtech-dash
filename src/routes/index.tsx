import { createBrowserRouter, Navigate } from "react-router";
import App from "../App";
import UsersListPage from "../pages/UsersListPage";
import ErrorPage from "../pages/ErrorPage";
import NotFoundPage from "../pages/notFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/users" replace />,
      },
      {
        path: "/users",
        element: <UsersListPage />,
      },
      {
        path: "/users/:id",
        element: <UsersListPage />,
      },

      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
