import type { IpcMainInvokeEvent } from "electron";

import type { Storage, StorageType } from "@common/storage";
import type LanguageType from "@common/language";
import type { Analytics } from "@common/analytics";

import type DataLoader from "../models/data-loader";
import type {
  DataMapper,
  ReadStorage,
  READ_STORAGE,
  WriteStorage,
  WRITE_STORAGE,
  ReadAppInfo,
  READ_APP_INFO,
  ReadAppMetric,
  READ_APP_METRIC,
  READ_ELECTRON_INFO,
  ReadElectronInfo,
  OPEN_FILE,
  OpenFile,
  READ_FULL_INFO,
  ReadFullInfo,
  READ_XML_FILE,
  ReadXmlFile,
  OPEN_STORAGE,
  OpenStorage,
  OpenExternalLink,
  OPEN_EXTERNAL_LINK,
  READ_I18N,
  ReadI18N,
  READ_I18N_PAGE,
  ReadI18NPage,
  READ_ALL_STORAGE,
  ReadAllStorage,
  WRITE_ALL_STORAGE,
  WriteAllStorage,
  FIND_MOD_DIRECTORY,
  FindModDirectory,
  READ_ALL_EVENT_COUNTER_ANALYTIC,
  ReadAllEventCounterAnalytic,
  READ_MOD_COLLECTION,
  ReadModCollection,
  UPDATE_UNIQUE_ID,
  UpdateUniqueId,
  VALIDATE_NEXUS_APIKEY,
  ValidateNexusApikey,
  TOGGLE_MOD_DIRECTORY,
  ToggleModDirectory,
} from "..";

interface ExecutorArguments<M extends DataMapper<string>> {
  store: Storage;
  data: DataLoader<M>;
  analytic: Analytics;
  event: IpcMainInvokeEvent;
}

type Executor<M extends DataMapper<string>> = (args: ExecutorArguments<M>) => Promise<M["output"]>;

interface MainAPIs {
  [READ_STORAGE]: Executor<
    ReadStorage<
      keyof StorageType,
      keyof StorageType[keyof StorageType],
      StorageType[keyof StorageType][keyof StorageType[keyof StorageType]]
    >
  >;
  [READ_ALL_STORAGE]: Executor<ReadAllStorage<keyof StorageType>>;
  [WRITE_STORAGE]: Executor<
    WriteStorage<
      keyof StorageType,
      keyof StorageType[keyof StorageType],
      StorageType[keyof StorageType][keyof StorageType[keyof StorageType]]
    >
  >;
  [WRITE_ALL_STORAGE]: Executor<WriteAllStorage<keyof StorageType>>;

  [READ_APP_INFO]: Executor<ReadAppInfo>;
  [READ_APP_METRIC]: Executor<ReadAppMetric>;
  [READ_ELECTRON_INFO]: Executor<ReadElectronInfo>;
  [READ_FULL_INFO]: Executor<ReadFullInfo>;

  [OPEN_FILE]: Executor<OpenFile>;
  [OPEN_STORAGE]: Executor<OpenStorage>;
  [OPEN_EXTERNAL_LINK]: Executor<OpenExternalLink>;

  [READ_XML_FILE]: Executor<ReadXmlFile>;
  [READ_I18N]: Executor<ReadI18N<keyof LanguageType, keyof LanguageType[keyof LanguageType]>>;
  [READ_I18N_PAGE]: Executor<ReadI18NPage<keyof LanguageType>>;

  [FIND_MOD_DIRECTORY]: Executor<FindModDirectory>;
  [READ_MOD_COLLECTION]: Executor<ReadModCollection>;
  [TOGGLE_MOD_DIRECTORY]: Executor<ToggleModDirectory>;

  [READ_ALL_EVENT_COUNTER_ANALYTIC]: Executor<ReadAllEventCounterAnalytic>;

  [UPDATE_UNIQUE_ID]: Executor<UpdateUniqueId>;

  [VALIDATE_NEXUS_APIKEY]: Executor<ValidateNexusApikey>;
}

export type { MainAPIs, Executor };
