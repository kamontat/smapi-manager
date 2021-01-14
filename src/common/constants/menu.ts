import { app, Menu } from "electron";
import { isDevelopment } from "@common/utils/env";

const menu = Menu.buildFromTemplate([
  {
    label: app.name,
    submenu: [
      { role: "about" },
      { type: "separator" },
      { role: "services" },
      { type: "separator" },
      { role: "hide" },
      { role: "unhide" },
      { type: "separator" },
      { role: "quit" },
    ],
  },
  isDevelopment()
    ? {
        label: "Debug",
        submenu: [{ role: "reload" }, { role: "forceReload" }, { role: "toggleDevTools" }],
      }
    : {},
]);

export default menu;
