// V1 (deprecated)

import type ModData from "./models/model";
import type ModCollectionV1 from "./models/collection";
import type ManifestData from "./models/manifest";

export type { ModData, ManifestData, ModCollectionV1 };
export { createModData, createModCollection } from "./builder";

// V2

export { emptyCollectionBuilder } from "./v2/models/collection";
export { createCollection, updateCollection, createMod, updateMod } from "./v2/builder/collection";

export type { ModCollection } from "./v2/models/collection";
export type { Mod } from "./v2/models/mod";
export type { Manifest } from "./v2/models/manifest";

export * from "./directory";
export * from "./constants";
