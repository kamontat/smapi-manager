import type { SecretValue } from "./secret/data";
import SecertStore from "./secret/store";
import type { SettingValue } from "./setting/data";
import SettingStore from "./setting/store";
import type { ModValue } from "./mod/data";
import ModStore from "./mod/store";
import type { CachesValue } from "./caches/data";
import CachesStore from "./caches/store";
import type { SMAPIValue } from "./smapi/data";
import SMAPIStore from "./smapi/store";

interface Storage {
  secrets: SecertStore;
  settings: SettingStore;
  smapi: SMAPIStore;
  mod: ModStore;
  caches: CachesStore;
}

interface StorageType {
  secrets: SecretValue;
  settings: SettingValue;
  smapi: SMAPIValue;
  mod: ModValue;
  caches: CachesValue;
}

const builder = (): Storage => {
  return {
    secrets: new SecertStore(),
    settings: new SettingStore(),
    smapi: new SMAPIStore(),
    mod: new ModStore(),
    caches: new CachesStore(),
  };
};

export default builder;
export type { Storage, StorageType };
