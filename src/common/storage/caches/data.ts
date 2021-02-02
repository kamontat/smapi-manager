import type { ModCollection } from "@common/mod";
import type { Information } from "@common/nexus";
import type Value from "../core/value";

interface CachesValue extends Value {
  modDirectories: ModCollection;
  nexusInformation: Information | undefined;
}
type CachesKey = keyof CachesValue;

const defaults: CachesValue = {
  encryptedKey: "reAdONlY-CacHE",
  modDirectories: {
    path: "",
    mods: [],
    lastUpdate: -1,
  },
  nexusInformation: undefined,
};

export default defaults;
export type { CachesValue, CachesKey };
