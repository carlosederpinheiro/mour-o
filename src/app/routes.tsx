import { createBrowserRouter } from "react-router";
import { Root } from "./pages/Root";
import { Home } from "./pages/Home";
import { Blog } from "./pages/Blog";
import { Portal } from "./pages/Portal";
import { Dashboard } from "./pages/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "blog", Component: Blog },
      { path: "portal", Component: Portal },
    ],
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  }
], {
  basename: import.meta.env.BASE_URL
});