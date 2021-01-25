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

type Page = {
  props: PageProps;
  component: typeof SvelteComponentDev.SvelteComponentDev;
};

const pages = {
  dashboard: {
    props: {
      pageName: "Dashboard",
    },
    component: Dashboard,
  },
  modManager: {
    props: {
      pageName: "Mod Manager",
    },
    component: ModManager,
  },
  modSetting: {
    props: {
      pageName: "Mod Settings",
    },
    component: ModSetting,
  },
  appSetting: {
    props: {
      pageName: "App Settings",
    },
    component: AppSetting,
  },
  appInfo: {
    props: {
      pageName: "App Info",
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
