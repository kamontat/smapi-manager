import Store from "electron-store";
import { Logger } from "@common/logger";
import { base64 } from "@common/utils/uuid";

import type { StorageValue } from "./value";
import type { Schema } from "./schema";
import builder from "./default";

const logger = Logger.Common("storage");
class CoreStorage<K extends string, V extends StorageValue = StorageValue> {
  readonly name: K;
  private store: Store<Required<V>>;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(name: K, defaults: V, _schema: Schema<V>) {
    this.name = name;

    // TODO: uncomment and add to store option once PR: https://github.com/electron-userland/electron-forge/pull/2149 got merged
    // const schema = Object.assign(
    //   { version: { type: "string" }, encryptedKey: { type: "string" } },
    //   _schema
    // ) as AjvSchema<Required<V>>;

    const defaultValue = builder<V>(defaults);
    this.store = new Store({
      name: name,
      fileExtension: "json",
      clearInvalidConfig: true,
      defaults: defaultValue,
      encryptionKey: defaultValue.encryptedKey ? base64(defaultValue.encryptedKey) : undefined,
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

  getAny<O, K extends string = string>(key: Exclude<K, keyof V>, def?: O): O {
    return this.store.get(key, def);
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

  setAny<O>(key: string, value: O): void {
    this.store.set(key, value);
  }

  open(): void {
    this.store.openInEditor();
  }

  clear(): void {
    this.store.clear();
  }
}

export default CoreStorage;
