import { app, ProcessMetric } from "electron";

import { AppInfo, ElectronInfo } from "@common/application";

import { MainHandler, MainHandlerV2 } from "../models/main";
import { buildVersion, author } from "../../../package.json";

export const getAppInfo: MainHandler<AppInfo> = () => {
  return {
    name: app.getName(),
    version: app.getVersion(),
    build: buildVersion,
    path: {
      app: app.getAppPath(),
      user: app.getPath("userData"),
      data: app.getPath("appData"),
      log: app.getPath("logs"),
      temp: app.getPath("temp"),
    },
    env: process.env.NODE_ENV,
    os: process.platform,
    author: {
      name: author.name,
      email: author.email,
      url: author.url,
    },
  };
};

export const getAppInfoV2: MainHandlerV2<AppInfo> = () => {
  return {
    name: app.getName(),
    version: app.getVersion(),
    build: buildVersion,
    path: {
      app: app.getAppPath(),
      user: app.getPath("userData"),
      data: app.getPath("appData"),
      log: app.getPath("logs"),
      temp: app.getPath("temp"),
    },
    env: process.env.NODE_ENV,
    os: process.platform,
    author: {
      name: author.name,
      email: author.email,
      url: author.url,
    },
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
