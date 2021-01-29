import { app, BrowserWindow, Menu, MenuItem, MenuItemConstructorOptions, shell } from "electron";

import { isDevelopment } from "@common/utils/env";

import { version, repository } from "../../../package.json";

const templates: (MenuItem | MenuItemConstructorOptions)[] = [
  {
    label: app.name,
    submenu: [
      {
        label: "Process manager",
        click: async () => {
          const psm = new BrowserWindow({
            width: 800,
            height: 300,
            webPreferences: {
              contextIsolation: true,
              devTools: false,
            },
          });

          psm.loadURL("https://google.com");
          psm.on("ready-to-show", () => {
            psm.show();
            psm.focus();
          });
        },
      },
      { type: "separator" },
      { role: "quit" },
    ],
  },
  {
    label: "Edit",
    submenu: [
      { role: "undo" },
      { role: "redo" },
      { type: "separator" },
      { role: "cut" },
      { role: "copy" },
      { role: "paste" },
    ],
  },
];

if (isDevelopment()) {
  templates.push({
    label: "Debug",
    submenu: [{ role: "reload" }, { role: "forceReload" }, { role: "toggleDevTools" }],
  });
}

templates.push({
  label: "Help",
  submenu: [
    {
      label: "Repository",
      click: async () => {
        await shell.openExternal(repository.url);
      },
    },
    {
      label: "Issues report",
      click: async () => {
        const url = new URL(`${repository.url}/issues/new`);
        url.searchParams.set("template", "bug_report.md");
        url.searchParams.set("labels", "bug");
        url.searchParams.set("title", "[BUG]");

        await shell.openExternal(url.toString());
      },
    },
    {
      label: "Changelog",
      click: async () => {
        await shell.openExternal(`${repository.url}/blob/v${version}/CHANGELOG.md`);
      },
    },
  ],
});

const menu = Menu.buildFromTemplate(templates);
export default menu;
