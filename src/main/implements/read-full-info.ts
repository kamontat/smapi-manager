import { handler, READ_FULL_INFO, ExecutorHelper } from "@main/communication";

import ConditionArray, { KeyValue } from "@common/utils/array";

import { readAppInfo, readElectronInfo } from ".";

export const readFullInfo = handler(READ_FULL_INFO, async args => {
  const isDebug = args.store.settings.get("debugMode");

  const appInfo = await ExecutorHelper.wrapper(readAppInfo).exec(args);
  const electronInfo = await ExecutorHelper.wrapper(readElectronInfo).exec(args);

  const content = args.i18n.queryPage(args.store.settings.get("language"), "appInfo");

  return new ConditionArray<KeyValue<string>>()
    .addIf(isDebug, { key: content.columnEnv, value: appInfo.env })
    .add({ key: content.columnName, value: appInfo.name })
    .add({ key: content.columnVersion, value: `${appInfo.version} (${appInfo.build})` })
    .addIf(isDebug, { key: content.columnElectronVersion, value: electronInfo.version })
    .addIf(isDebug, { key: content.columnChromeVersion, value: electronInfo.chrome })
    .add({ key: content.columnLicense, value: appInfo.license })
    .add({ key: content.columnAuthor, value: appInfo.author.name })
    .addIf(isDebug, { key: content.columnApplicationPath, value: appInfo.path.app })
    .addIf(isDebug, { key: content.columnDataPath, value: appInfo.path.data })
    .addIf(isDebug, { key: content.columnUserDataPath, value: appInfo.path.user })
    .addIf(isDebug, { key: content.columnLogPath, value: appInfo.path.log })
    .addIf(isDebug, { key: content.columnTempPath, value: appInfo.path.temp })
    .result();
});

export default readFullInfo;
export { READ_FULL_INFO };
