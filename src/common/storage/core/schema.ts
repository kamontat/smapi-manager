import type { Schema as AjvSchema } from "electron-store";
import type { StorageValue } from "./value";

type Schema<V extends StorageValue> = AjvSchema<Required<Omit<V, "version" | "encryptedKey">>>;

export type { Schema, AjvSchema };
