import type SvelteComponentDev from "svelte/internal";
import { writable, Writable } from "svelte/store";

import Dashboard from "@pages/Dashboard.svelte";
import SMAPIInfo from "@pages/SMAPIInfo.svelte";
import ModManager from "@pages/ModManager.svelte";
import ModSetting from "@pages/ModSetting.svelte";
import AppSetting from "@pages/AppSetting.svelte";
import AppInfo from "@pages/AppInfo.svelte";

type PageProps = {
  pageName: string;
};

type PageBackground = {
  direction: string;
  colorFrom: string;
  colorVia: string;
  colorTo: string;
};

type Page = {
  props: PageProps;
  background: PageBackground;
  component: typeof SvelteComponentDev.SvelteComponentDev;
};

const pages = {
  dashboard: {
    props: {
      pageName: "Dashboard",
    },
    background: {
      direction: "top left",
      colorFrom: "#1CB5E0",
      colorVia: "",
      colorTo: "#000851",
    },
    component: Dashboard,
  },
  SMAPIInfo: {
    props: {
      pageName: "SMAPI Info",
    },
    background: {
      direction: "top left",
      colorFrom: "#fd5c63",
      colorVia: "",
      colorTo: "#9ebd13",
    },
    component: SMAPIInfo,
  },
  modManager: {
    props: {
      pageName: "Mod Manager",
    },
    background: {
      direction: "top right",
      colorFrom: "#FC466B",
      colorVia: "",
      colorTo: "#3F5EFB",
    },
    component: ModManager,
  },
  modSetting: {
    props: {
      pageName: "Mod Settings",
    },
    background: {
      direction: "bottom left",
      colorFrom: "#FFD700",
      colorVia: "",
      colorTo: "#fd5c63",
    },
    component: ModSetting,
  },
  appSetting: {
    props: {
      pageName: "App Settings",
    },
    background: {
      direction: "bottom right",
      colorFrom: "#9ebd13",
      colorVia: "",
      colorTo: "#008552",
    },
    component: AppSetting,
  },
  appInfo: {
    props: {
      pageName: "App Info",
    },
    background: {
      direction: "top left",
      colorFrom: "#efd5ff",
      colorVia: "",
      colorTo: "#515ada",
    },
    component: AppInfo,
  },
};

type PageKey = keyof typeof pages;
const currentPage: Writable<Page> = writable(pages.dashboard);

const openPage = (pageKey: PageKey): void => {
  return currentPage.set(pages[pageKey]);
};

const openDashboard = (): void => {
  return openPage("dashboard");
};

export default pages;
export {
  /**
   * @deprecated use openPage or openDashboard instead
   */
  currentPage,
  openPage,
  openDashboard,
};
export type { Page, PageKey };
