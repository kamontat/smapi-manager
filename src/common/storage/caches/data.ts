import type { ModCollection } from "@common/mod";
import type Value from "../core/value";

interface CachesValue extends Value {
  modDirectories: ModCollection;
}
type CachesKey = keyof CachesValue;

const defaults: CachesValue = {
  encryptedKey: "reAdONlY-CacHE",
  modDirectories: {
    path: "",
    mods: [],
    lastUpdate: -1,
  },
};

export default defaults;
export type { CachesValue, CachesKey };
