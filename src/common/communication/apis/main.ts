import type { StorageType } from "@common/storage";
import type LanguageType from "@common/language";
import type { Executor } from "../models/executor";

import type {
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
  FIND_MOD_DIRECTORY_V2,
  FindModDirectoryV2,
  READ_ALL_EVENT_COUNTER_ANALYTIC,
  ReadAllEventCounterAnalytic,
  UPDATE_UNIQUE_ID,
  UpdateUniqueId,
  VALIDATE_NEXUS_APIKEY,
  ValidateNexusApikey,
  TOGGLE_MOD_DIRECTORY,
  ToggleModDirectory,
  READ_MOD_COLLECTION_V2,
  ReadModCollectionV2,
  CLEAR_STORAGE,
  ClearStorage,
  OPEN_MOD,
  OpenMod,
  FETCH_MOD_DATA,
  FetchModData,
} from "..";

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
  [OPEN_MOD]: Executor<OpenMod>;

  [READ_XML_FILE]: Executor<ReadXmlFile>;
  [READ_I18N]: Executor<ReadI18N<keyof LanguageType, keyof LanguageType[keyof LanguageType]>>;
  [READ_I18N_PAGE]: Executor<ReadI18NPage<keyof LanguageType>>;

  [FIND_MOD_DIRECTORY_V2]: Executor<FindModDirectoryV2>;
  [READ_MOD_COLLECTION_V2]: Executor<ReadModCollectionV2>;
  [TOGGLE_MOD_DIRECTORY]: Executor<ToggleModDirectory>;
  [FETCH_MOD_DATA]: Executor<FetchModData>;

  [READ_ALL_EVENT_COUNTER_ANALYTIC]: Executor<ReadAllEventCounterAnalytic>;

  [UPDATE_UNIQUE_ID]: Executor<UpdateUniqueId>;

  [VALIDATE_NEXUS_APIKEY]: Executor<ValidateNexusApikey>;

  [CLEAR_STORAGE]: Executor<ClearStorage>;
}

export type { MainAPIs, Executor };
