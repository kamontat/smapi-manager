import DataOrigin from "./constants/data-origin";
import DataLoader from "./models/data-loader";
import type { DataMapper } from "./models/data-mapper";

import readStorage, { READ_STORAGE, ReadStorage } from "./mappers/read-storage";
import readAllStorage, { READ_ALL_STORAGE, ReadAllStorage } from "./mappers/read-all-storage";
import writeStorage, { WRITE_STORAGE, WriteStorage } from "./mappers/write-storage";
import writeAllStorage, { WRITE_ALL_STORAGE, WriteAllStorage } from "./mappers/write-all-storage";
import readAppInfo, { READ_APP_INFO, ReadAppInfo } from "./mappers/read-app-info";
import readAppMetric, { READ_APP_METRIC, ReadAppMetric } from "./mappers/read-app-metric";
import readElectronInfo, { READ_ELECTRON_INFO, ReadElectronInfo } from "./mappers/read-electron-info";
import openFile, { OPEN_FILE, OpenFile } from "./mappers/open-file";
import openStorage, { OPEN_STORAGE, OpenStorage } from "./mappers/open-storage";
import openExternalLink, { OPEN_EXTERNAL_LINK, OpenExternalLink } from "./mappers/open-external-link";
import readFullInfo, { READ_FULL_INFO, ReadFullInfo } from "./mappers/read-full-info";
import readXmlFile, { READ_XML_FILE, ReadXmlFile } from "./mappers/read-xml-file";
import updateSettings, { UPDATE_SETTINGS, UpdateSettings } from "./mappers/update-settings";
import readI18n, { READ_I18N, ReadI18N } from "./mappers/read-i18n";
import readI18nPage, { READ_I18N_PAGE, ReadI18NPage } from "./mappers/read-i18n-page";
import findModDirectory, { FIND_MOD_DIRECTORY, FindModDirectory } from "./mappers/find-mod-directory";
import readModCollection, { READ_MOD_COLLECTION, ReadModCollection } from "./mappers/read-mod-collection";
import readAllEventCounterAnalytic, {
  READ_ALL_EVENT_COUNTER_ANALYTIC,
  ReadAllEventCounterAnalytic,
} from "./mappers/read-all-event-counter-analytic";

export default DataLoader;
export { DataOrigin };

export {
  readStorage,
  READ_STORAGE,
  readAllStorage,
  READ_ALL_STORAGE,
  writeStorage,
  WRITE_STORAGE,
  writeAllStorage,
  WRITE_ALL_STORAGE,
  readAppInfo,
  READ_APP_INFO,
  readAppMetric,
  READ_APP_METRIC,
  readFullInfo,
  READ_FULL_INFO,
  readElectronInfo,
  READ_ELECTRON_INFO,
  openFile,
  OPEN_FILE,
  openStorage,
  OPEN_STORAGE,
  openExternalLink,
  OPEN_EXTERNAL_LINK,
  readXmlFile,
  READ_XML_FILE,
  /**
   * @deprecated - use writeAllStorage() instead
   */
  updateSettings,
  /**
   * @deprecated - use WRITE_ALL_STORAGE instead
   */
  UPDATE_SETTINGS,
  readI18n,
  READ_I18N,
  readI18nPage,
  READ_I18N_PAGE,
  findModDirectory,
  FIND_MOD_DIRECTORY,
  readAllEventCounterAnalytic,
  READ_ALL_EVENT_COUNTER_ANALYTIC,
  readModCollection,
  READ_MOD_COLLECTION,
};

export type {
  DataMapper,
  ReadStorage,
  ReadAllStorage,
  WriteStorage,
  ReadAppInfo,
  ReadAppMetric,
  ReadFullInfo,
  ReadElectronInfo,
  OpenFile,
  OpenStorage,
  OpenExternalLink,
  ReadXmlFile,
  /**
   * @deprecated - use WriteAllStorage instead
   */
  UpdateSettings,
  WriteAllStorage,
  ReadI18N,
  ReadI18NPage,
  FindModDirectory,
  ReadAllEventCounterAnalytic,
  ReadModCollection,
};

export { apiName } from "./apis/renderer";
export type { RendererAPIs } from "./apis/renderer";

export type { MainAPIs, Executor } from "./apis/main";

// const data = DataLoader.builder(readStorage("mod", "directory"));
// data.sendToPreload().withOutput("hello").toJSON();
