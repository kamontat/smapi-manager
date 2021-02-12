import type { LanguageType } from "@common/i18n";
import type { StorageType } from "@common/storage";

import type {
  CLEAR_STORAGE,
  ClearStorage,
  FETCH_APP_STATUS,
  FetchAppStatus,
  FETCH_MOD_DATA,
  FetchModData,
  FIND_MOD_DIRECTORY_V2,
  FindModDirectoryV2,
  OPEN_EXTERNAL_LINK,
  OpenExternalLink,
  OPEN_FILE,
  OpenFile,
  OPEN_MOD,
  OpenMod,
  OPEN_STORAGE,
  OpenStorage,
  READ_ALL_EVENT_COUNTER_ANALYTIC,
  ReadAllEventCounterAnalytic,
  READ_ALL_STORAGE,
  ReadAllStorage,
  READ_APP_INFO,
  ReadAppInfo,
  READ_APP_METRIC,
  ReadAppMetric,
  READ_ELECTRON_INFO,
  ReadElectronInfo,
  READ_FULL_INFO,
  ReadFullInfo,
  READ_I18N,
  ReadI18N,
  READ_I18N_PAGE,
  ReadI18nPage,
  READ_MOD_COLLECTION_V2,
  ReadModCollectionV2,
  READ_STORAGE,
  ReadStorage,
  READ_XML_FILE,
  ReadXmlFile,
  TOGGLE_MOD_DIRECTORY,
  ToggleModDirectory,
  UPDATE_SETTINGS,
  UpdateSettings,
  UPDATE_UNIQUE_ID,
  UpdateUniqueId,
  VALIDATE_NEXUS_APIKEY,
  ValidateNexusApikey,
  WRITE_ALL_STORAGE,
  WriteAllStorage,
  WRITE_STORAGE,
  WriteStorage,
} from "@common/communication";

export interface Mapping {
  [CLEAR_STORAGE]: ClearStorage;

  [FETCH_APP_STATUS]: FetchAppStatus;
  [FETCH_MOD_DATA]: FetchModData;

  [FIND_MOD_DIRECTORY_V2]: FindModDirectoryV2;

  [OPEN_EXTERNAL_LINK]: OpenExternalLink;
  [OPEN_FILE]: OpenFile;
  [OPEN_MOD]: OpenMod;
  [OPEN_STORAGE]: OpenStorage;

  [READ_ALL_EVENT_COUNTER_ANALYTIC]: ReadAllEventCounterAnalytic;
  [READ_ALL_STORAGE]: ReadAllStorage<keyof StorageType>;

  [READ_APP_INFO]: ReadAppInfo;
  [READ_APP_METRIC]: ReadAppMetric;
  [READ_ELECTRON_INFO]: ReadElectronInfo;
  [READ_FULL_INFO]: ReadFullInfo;
  [READ_I18N]: ReadI18N<keyof LanguageType, keyof LanguageType[keyof LanguageType]>;
  [READ_I18N_PAGE]: ReadI18nPage<keyof LanguageType>;
  [READ_MOD_COLLECTION_V2]: ReadModCollectionV2;
  [READ_STORAGE]: ReadStorage<
    keyof StorageType,
    keyof StorageType[keyof StorageType],
    StorageType[keyof StorageType][keyof StorageType[keyof StorageType]]
  >;
  [READ_XML_FILE]: ReadXmlFile;

  [TOGGLE_MOD_DIRECTORY]: ToggleModDirectory;

  [UPDATE_SETTINGS]: UpdateSettings;
  [UPDATE_UNIQUE_ID]: UpdateUniqueId;

  [VALIDATE_NEXUS_APIKEY]: ValidateNexusApikey;

  [WRITE_ALL_STORAGE]: WriteAllStorage<keyof StorageType>;
  [WRITE_STORAGE]: WriteStorage<
    keyof StorageType,
    keyof StorageType[keyof StorageType],
    StorageType[keyof StorageType][keyof StorageType[keyof StorageType]]
  >;
}
