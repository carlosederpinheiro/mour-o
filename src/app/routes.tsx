import { createBrowserRouter } from "react-router";
import { Root } from "./pages/Root";
import { Home } from "./pages/Home";
import { Blog } from "./pages/Blog";
import { Dashboard } from "./pages/Dashboard";
import { Post } from "./pages/Post";
import { PortalCadastro } from "./pages/PortalCadastro";
import { PortalLogin } from "./pages/PortalLogin";
import { PortalDashboard } from "./pages/PortalDashboard";
import { AdminDashboard } from "./pages/AdminDashboard";

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
  },
  {
    path: "/cadastro",
    Component: PortalCadastro,
  },
  {
    path: "/portal/login",
    Component: PortalLogin,
  },
  {
    path: "/portal",
    Component: PortalDashboard,
  },
  {
    path: "/admin",
    Component: AdminDashboard,
  }
], {
  basename: import.meta.env.BASE_URL
});