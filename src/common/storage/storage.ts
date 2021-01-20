import SecertStore from "./secret/store";
import SettingStore from "./setting/store";

interface Storage {
  secrets: SecertStore;
  settings: SettingStore;
}

const builder = (): Storage => {
  return {
    secrets: new SecertStore(),
    settings: new SettingStore(),
  };
};

export default builder;
export { Storage };

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
