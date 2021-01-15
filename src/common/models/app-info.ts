interface AppInfo {
  name: string;
  version: string;
  build: string;
  path: string;
  os: string;
  env: string;
}

const defaults: AppInfo = {
  name: "",
  version: "x.x.x",
  build: "",
  path: "",
  os: "",
  env: "",
};

export type { AppInfo };
export { defaults };
