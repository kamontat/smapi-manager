import { handler, READ_FULL_INFO } from "@main/communication";

import ConditionArray, { KeyValue } from "@common/utils/array";

import { readAppInfo, readElectronInfo } from ".";
import ExecutorHelper from "../models/executor-helper";

export const readFullInfo = handler(READ_FULL_INFO, async args => {
  const isDebug = args.store.settings.get("debugMode");

  const appInfo = await ExecutorHelper.wrapper(readAppInfo).exec(args);
  const electronInfo = await ExecutorHelper.wrapper(readElectronInfo).exec(args);

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
});

export default readFullInfo;
export { READ_FULL_INFO };
