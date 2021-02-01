import Store from "electron-store";
import { Logger } from "@common/logger";

import type Value from "./value";
import builder from "./default";

const logger = Logger.Common("storage");
class CoreStorage<K extends string, V extends Value = Value> {
  readonly name: K;
  private store: Store<Required<V>>;

  constructor(name: K, defaults: V) {
    this.name = name;
    const defaultValue = builder<V>(defaults);
    this.store = new Store({
      name: name,
      fileExtension: "json",
      clearInvalidConfig: true,
      defaults: defaultValue,
      encryptionKey: defaultValue.encryptedKey,
    });

    this.store.onDidAnyChange(() => {
      logger.debug(`[change] data has been updated on '${name}' storage`);
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

  update<K extends keyof V, O extends Required<V>[K]>(key: K, fn: (old: O) => O): void {
    const old = this.get<K, O>(key);
    const _new = fn(old);

    this.store.set(key, _new);
  }

  setAll(k: Partial<V>): void {
    this.store.set(k);
  }

  set<K extends keyof V, O extends Required<V>[K]>(key: K, value: O): void {
    try {
      this.update(key, old => {
        if (old === value) {
          throw new Error("duplicated value");
        }
        return value;
      });
    } catch (e) {
      // silent ignore
    }
  }

  open(): void {
    this.store.openInEditor();
  }
}

export default CoreStorage;
