import { app } from "electron";
import { MainAPIs, READ_APP_INFO } from "@common/communication";
import { buildVersion, author } from "../../../package.json";

const readAppInfo: MainAPIs[typeof READ_APP_INFO] = async () => {
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

export default readAppInfo;
export { READ_APP_INFO };
