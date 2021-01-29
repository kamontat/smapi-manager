import type SvelteComponentDev from "svelte/internal";
import { writable, Writable } from "svelte/store";

import Dashboard from "@pages/Dashboard.svelte";
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
      colorFrom: "#f59e0b",
      colorVia: "#10b981",
      colorTo: "#3b82f6",
    },
    component: Dashboard,
  },
  modManager: {
    props: {
      pageName: "Mod Manager",
    },
    background: {
      direction: "top right",
      colorFrom: "#ad8fdf",
      colorVia: "#b95ad6",
      colorTo: "#e44a8a",
    },
    component: ModManager,
  },
  modSetting: {
    props: {
      pageName: "Mod Settings",
    },
    background: {
      direction: "bottom left",
      colorFrom: "#f59e0b",
      colorVia: "#10b981",
      colorTo: "#3b82f6",
    },
    component: ModSetting,
  },
  appSetting: {
    props: {
      pageName: "App Settings",
    },
    background: {
      direction: "bottom right",
      colorFrom: "#f59e0b",
      colorVia: "#10b981",
      colorTo: "#3b82f6",
    },
    component: AppSetting,
  },
  appInfo: {
    props: {
      pageName: "App Info",
    },
    background: {
      direction: "top left",
      colorFrom: "#f59e0b",
      colorVia: "#10b981",
      colorTo: "#3b82f6",
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
