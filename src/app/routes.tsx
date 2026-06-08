import { createBrowserRouter } from "react-router";
import { Root } from "./pages/Root";
import { Home } from "./pages/Home";
import { Blog } from "./pages/Blog";
import { Dashboard } from "./pages/Dashboard";
import { Post } from "./pages/Post";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "blog", Component: Blog },
      { path: "blog/:slug", Component: Post },
    ],
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  }
], {
  basename: import.meta.env.BASE_URL
});