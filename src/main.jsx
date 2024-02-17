import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Root from "./routes/root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children: [
      {
        path: "/",
        element: <React.Suspense fallback={<div>Loading...</div>}/>,
        Component: React.lazy(() => import("./pages/Home")),
      },
      {
        path: "/signup",
        element: <React.Suspense fallback={<div>Loading...</div>}/>,
        Component: React.lazy(() => import("./pages/Signup")),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);