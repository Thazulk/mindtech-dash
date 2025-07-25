import { createBrowserRouter } from "react-router";
import App from "../App";
import UsersPage from "../pages/UsersPage";
import ErrorPage from "../pages/ErrorPage";
import NotFoundPage from "../pages/notFoundPage";
import { usersLoader } from "./loaders/usersLoader";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <UsersPage />,
        loader: usersLoader,
      },
      {
        path: "/users",
        element: <UsersPage />,
        loader: usersLoader,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
