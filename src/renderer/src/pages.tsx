import Dashboard from "@pages/Dashboard";
import ModManager from "@pages/ModManager";

const pages = [
  {
    key: "dashboard",
    name: "Dashboard",
    path: "/",
    element: Dashboard,
  },
  {
    key: "mod-manager",
    name: "Mod Manager",
    path: "/mod-manager",
    element: ModManager,
  },
  {
    key: "test",
    name: "Test",
    path: "/test",
    element: "div",
  },
  {
    key: "next",
    name: "Next",
    path: "/next",
    element: "div",
  },
];

export default pages;
