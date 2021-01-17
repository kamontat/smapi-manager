import { app, ProcessMetric } from "electron";

import { AppInfo, ElectronInfo } from "@common/application";

import { MainHandler } from "../models/main";
import { buildVersion } from "../../../package.json";

export const getAppInfo: MainHandler<AppInfo> = () => {
  return {
    name: app.getName(),
    version: app.getVersion(),
    build: buildVersion,
    path: app.getAppPath(),
    env: process.env.NODE_ENV,
    os: process.platform,
  };
};

export const getAppMetrics: MainHandler<ProcessMetric[]> = () => {
  return app.getAppMetrics();
};

export const getElectronInfo: MainHandler<ElectronInfo> = () => {
  const electronVersion = process.versions.electron;
  const chromeVersion = process.versions.chrome;

  return {
    version: electronVersion,
    chrome: chromeVersion,
  };
};
