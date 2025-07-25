import { createBrowserRouter } from "react-router";
import App from "../App";
import UsersListPage from "../pages/UsersListPage";
import ErrorPage from "../pages/ErrorPage";
import NotFoundPage from "../pages/notFoundPage";
// import UserDetailsPage from "../pages/UserDetailsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <UsersListPage />,
      },
      //   {
      //     path: "/users/:id",
      //     element: <UserDetailsPage />,
      //   },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
