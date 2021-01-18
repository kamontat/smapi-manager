import Store from "electron-store";

import Value from "./value";
import builder from "./default";

abstract class CoreStorage<V extends Value> {
  private store: Store<Required<V>>;

  constructor(name: string, defaults: V) {
    const defaultValue = builder<V>(defaults);
    this.store = new Store({
      name: name,
      fileExtension: "json",
      clearInvalidConfig: true,
      defaults: defaultValue,
      encryptionKey: defaultValue.encryptedKey,
    });
  }

  get value(): Required<V> {
    return this.store.store;
  }

  get url(): string {
    return this.store.path;
  }

  get size(): number {
    return this.store.size;
  }

  has<K extends keyof V>(key: K): boolean {
    return this.store.has(key);
  }

  get<K extends keyof V, O extends Required<V>[K]>(key: K): O {
    return this.store.get(key) as O;
  }

  set<K extends keyof V, O extends Required<V>[K]>(key: K, value: O): void {
    return this.store.set(key, value);
  }

  open(): void {
    this.store.openInEditor();
  }
}

export default CoreStorage;
