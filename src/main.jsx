import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Topic from "./pages/Topic";
import Content from "./pages/Content";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <React.Suspense fallback={<div>Loading...</div>}>
          <Home />
        </React.Suspense>,
      },
      {
        path: "/signup",
        element: <React.Suspense fallback={<div>Loading...</div>}>
          <Signup/>
        </React.Suspense>,
      },
      {
        path: "/login",
        element: <React.Suspense fallback={<div>Loading...</div>}>
          <Login/>
        </React.Suspense>,
      },
      {
        path: "/topic/:id",
        element: <React.Suspense fallback={<div>Loading...</div>}>
          <Topic/>
        </React.Suspense>,
      },{
        path: "/content/:id",
        element: <React.Suspense fallback={<div>Loading...</div>}>
          <Content/>
        </React.Suspense>,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);