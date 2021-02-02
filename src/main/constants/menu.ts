import { app, Menu, MenuItem, MenuItemConstructorOptions, shell } from "electron";

import { getDebug, getNodeEnv } from "@common/utils/env";

import { version, repository } from "../../../package.json";
import { Request } from "@common/request";

const templates: (MenuItem | MenuItemConstructorOptions)[] = [
  {
    label: app.name,
    submenu: [
      {
        label: "Check for updates",
        click: async () => {
          const request = new Request("api.github.com", "/repos/kamontat/smapi-manager/releases/latest");
          const response = await request.request();

          const currentVersion = `v${app.getVersion()}`;

          const latestVersion = response.json["tag_name"];
          const latestUrl = response.json["html_url"];

          if (currentVersion !== latestVersion) {
            await shell.openExternal(latestUrl);
          }
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

if (getNodeEnv().is("development") || getDebug().is(true)) {
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
