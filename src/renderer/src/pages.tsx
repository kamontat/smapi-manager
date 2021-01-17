import AppInfo from "@pages/AppInfo";
import Dashboard from "@pages/Dashboard";
import ModManager from "@pages/ModManager";
import Setting from "@pages/Setting";

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
  setting: {
    name: "Settings",
    path: "/settings",
    element: Setting,
  },
  next: {
    name: "Application",
    path: "/app-info",
    element: AppInfo,
  },
};

export default pages;
