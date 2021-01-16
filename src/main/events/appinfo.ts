import { app, ProcessMetric } from "electron";

import { ElectronInfo } from "@common/models/electron-info";
import { AppInfo } from "@common/models/app-info";

import { buildVersion } from "../../../package.json";

export const getAppInfo = (): AppInfo => {
  return {
    name: app.getName(),
    version: app.getVersion(),
    build: buildVersion,
    path: app.getAppPath(),
    env: process.env.NODE_ENV,
    os: process.platform,
  };
};

export const getAppMetrics = (): ProcessMetric[] => {
  return app.getAppMetrics();
};

export const getElectronInfo = (): ElectronInfo => {
  const electronVersion = process.versions.electron;
  const chromeVersion = process.versions.chrome;
  return {
    version: electronVersion,
    chrome: chromeVersion,
  };
};
