import { defaultAppInfo, defaultElectronInfo } from ".";
import type { AppInfo } from "./app-info";
import type { ElectronInfo } from "./electron-info";

interface Information {
  app: AppInfo;
  electron: ElectronInfo;
}

const defaults: Information = {
  app: defaultAppInfo,
  electron: defaultElectronInfo,
};

export type { Information };
export { defaults };
