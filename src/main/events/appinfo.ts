import { app, ProcessMetric } from "electron";

interface AppInfo {
  name: string;
  version: string;
}
export const getAppInfo = (): AppInfo => {
  return {
    name: app.getName(),
    version: app.getVersion(),
  };
};

export const getAppMetrics = (): ProcessMetric[] => {
  return app.getAppMetrics();
};

interface ElectronInfo {
  electron: string;
  chrome: string;
}
export const getElectronInfo = (): ElectronInfo => {
  const electronVersion = process.versions.electron;
  const chromeVersion = process.versions.chrome;
  return {
    electron: electronVersion,
    chrome: chromeVersion,
  };
};
