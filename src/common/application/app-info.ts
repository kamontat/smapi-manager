interface AppInfoPath {
  app: string;
  user: string;
  data: string;
  log: string;
  temp: string;
}

interface AppInfoAuthor {
  name: string;
  email: string;
  url: string;
}

interface AppInfo {
  name: string;
  version: string;
  author: AppInfoAuthor;
  build: string;
  path: AppInfoPath;
  os: string;
  env: string;
}

const defaults: AppInfo = {
  name: "",
  version: "x.x.x",
  build: "",
  path: {
    app: "",
    data: "",
    log: "",
    temp: "",
    user: "",
  },
  author: {
    name: "",
    email: "",
    url: "",
  },
  os: "",
  env: "",
};

export type { AppInfo };
export { defaults };
