import AppInfo from "@pages/AppInfo";
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
  next: {
    name: "Application",
    path: "/app-info",
    element: AppInfo,
  },
};

export default pages;
