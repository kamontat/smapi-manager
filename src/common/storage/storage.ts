import type { SecretValue } from "./secret/data";
import SecertStore from "./secret/store";
import type { SettingValue } from "./setting/data";
import SettingStore from "./setting/store";
import type { ModValue } from "./mod/data";
import ModStore from "./mod/store";
import type { CachesValue } from "./caches/data";
import CachesStore from "./caches/store";

interface Storage {
  secrets: SecertStore;
  settings: SettingStore;
  mod: ModStore;
  caches: CachesStore;
}

interface StorageType {
  secrets: SecretValue;
  settings: SettingValue;
  mod: ModValue;
  caches: CachesValue;
}

const builder = (): Storage => {
  return {
    secrets: new SecertStore(),
    settings: new SettingStore(),
    mod: new ModStore(),
    caches: new CachesStore(),
  };
};

export default builder;
export type { Storage, StorageType };

// class Storage<K = unknown> {
//   private stores: Map<string, CoreStorage<string, StorageValue>>;
//   constructor() {
//     this.stores = new Map();
//   }

//   add<KK extends string, VV extends StorageValue>(obj: CoreStorage<KK, VV>): Storage<K & { [key in KK]: VV }> {
//     this.stores.set(obj.name, (obj as unknown) as CoreStorage<string, StorageValue>);
//     return (this as unknown) as Storage<K & { [key in KK]: VV }>;
//   }

//   get<KK extends keyof K = keyof K>(key: KK): K[KK] {
//     return (this.stores.get(key as string) as unknown) as K[KK];
//   }
// }

// export default Storage;
