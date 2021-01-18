import Store from "electron-store";

import defaultConfigValue, { ENCRYPTION_KEY } from "./constants";
import Value, { ValueKey } from "./models";

class ConfigStore {
  private store: Store<Value>;
  constructor() {
    this.store = new Store<Value>({
      name: "config",
      fileExtension: "json",
      clearInvalidConfig: true,
      defaults: defaultConfigValue,
      encryptionKey: ENCRYPTION_KEY,
    });
  }

  get value(): Value {
    return this.store.store;
  }

  has<K extends ValueKey>(key: K): boolean {
    return this.store.has(key);
  }

  get<K extends ValueKey, V extends Value[K]>(key: K): V {
    return this.store.get(key) as V;
  }

  set<K extends ValueKey, V extends Value[K] = Value[K]>(key: K, value: V): void {
    return this.store.set(key, value);
  }
}

export default ConfigStore;
