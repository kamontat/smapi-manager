export interface AppInfo {
  name: string;
  version: string;
  build: string;
  path: string;
  os: string;
  env: string;
}

export const defaultAppInfo: AppInfo = {
  name: "",
  version: "x.x.x",
  build: "",
  path: "",
  os: "",
  env: "",
};

export interface ElectronInfo {
  electron: string;
  chrome: string;
}

export const defaultElectronInfo: ElectronInfo = {
  electron: "",
  chrome: "",
};
