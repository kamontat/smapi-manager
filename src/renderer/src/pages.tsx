import Dashboard from "@pages/Dashboard";
import ModManager from "@pages/ModManager";

const pages = {
  dashboard: {
    name: "Dashboard",
    path: "/",
    element: Dashboard,
  },
  modManager: {
    name: "Mod Manager",
    path: "/mod-manager",
    element: ModManager,
  },
  test: {
    name: "Test",
    path: "/test",
    element: "div",
  },
  next: {
    name: "Next",
    path: "/next",
    element: "div",
  },
};

export default pages;
