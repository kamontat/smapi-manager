import { app, ProcessMetric } from "electron";

import { buildVersion } from "../../../package.json";
import { AppInfo, ElectronInfo } from "@common/models/info";

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
    electron: electronVersion,
    chrome: chromeVersion,
  };
};
