import type { ModCollection } from "@common/mod";
import type { Information } from "@common/nexus";
import type { StorageValue } from "../core/value";
import type { Schema } from "../core/schema";

interface CachesValue extends StorageValue {
  /**
   * key of mod collection is modCollection id generated from directory path
   */
  modCollections: Record<string, ModCollection>;

  /**
   * general information fetch when user validate apikey
   */
  nexusInformation: Information | undefined;
}
type CachesKey = keyof CachesValue;

const defaults: CachesValue = {
  encryptedKey: "reAdONlY-CacHE",
  modCollections: {},
  nexusInformation: undefined,
};

const schema: Schema<CachesValue> = {
  modCollections: {
    type: "object",
  },
  nexusInformation: {
    type: "object",
  },
};

export { defaults, schema };
export type { CachesValue, CachesKey };
