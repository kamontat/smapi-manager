import type { ModCollection } from "@common/mod";
import type { Information } from "@common/nexus";
import type Value from "../core/value";

interface CachesValue extends Value {
  /**
   * key of mod collection is modCollection id generated from directory path
   */
  modCollections: Record<string, ModCollection>;
  nexusInformation: Information | undefined;
}
type CachesKey = keyof CachesValue;

const defaults: CachesValue = {
  encryptedKey: "reAdONlY-CacHE",
  modCollections: {},
  nexusInformation: undefined,
};

export default defaults;
export type { CachesValue, CachesKey };
