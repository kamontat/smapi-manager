import { MainAPIs, READ_FULL_INFO } from "@common/communication";
import ConditionArray, { KeyValue } from "@common/utils/array";

import readAppInfo from "./read-app-info";
import readElectronInfo from "./read-electron-info";

const readFullInfo: MainAPIs[typeof READ_FULL_INFO] = async ({ store, data, event, analytic }) => {
  const isDebug = store.settings.get("debugMode");
  const appInfo = await readAppInfo({ store, data: data as any, event, analytic }); // eslint-disable-line @typescript-eslint/no-explicit-any
  const electronInfo = await readElectronInfo({ store, data: data as any, event, analytic }); // eslint-disable-line @typescript-eslint/no-explicit-any

  return new ConditionArray<KeyValue<string>>()
    .addIf(isDebug, { key: "Environment", value: appInfo.env })
    .add({ key: "Name", value: appInfo.name })
    .add({ key: "Version", value: `${appInfo.version} (${appInfo.build})` })
    .addIf(isDebug, { key: "Electron version", value: electronInfo.version })
    .addIf(isDebug, { key: "Chrome version", value: electronInfo.chrome })
    .add({ key: "Author", value: appInfo.author.name })
    .addIf(isDebug, { key: "Application", value: appInfo.path.app })
    .addIf(isDebug, { key: "Data", value: appInfo.path.data })
    .addIf(isDebug, { key: "User data", value: appInfo.path.user })
    .addIf(isDebug, { key: "Log", value: appInfo.path.log })
    .addIf(isDebug, { key: "Temp", value: appInfo.path.temp })
    .result();
};

export default readFullInfo;
export { READ_FULL_INFO };
