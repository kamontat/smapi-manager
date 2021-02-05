import { uuid } from "@common/utils/uuid";
import { toShownName } from "@common/file-system/utils";
import type { Directory } from "@common/file-system";

import type { Manifest } from "./manifest";
import type { ModStatus } from "./status";
import type { ModUpdater } from "./updater";
import type { ModLocation } from "./location";

import statusBuilder from "./status";
import updaterBuilder from "./updater";
import locationBuilder from "./location";

interface Mod {
  /**
   * unique id from manifest file, or random generate uuid
   */
  id: string;

  /**
   * readable mod name from manifest file, or folder name (without dot)
   */
  name: string;

  /**
   * readable mod description from manifest file, or empty string
   */
  description: string;

  /**
   * mod version from manifest file, or v0.0.0 if loading failed
   */
  version: string;

  /**
   * mod status base on local data
   */
  status: ModStatus;

  /**
   * mod provider, usually it should be only one.
   * But on some case it might more that one, that case
   * I will select only first one as primary updater
   */
  updater: ModUpdater;

  location: ModLocation;
}

const builder = (dir: Directory, manifest?: Manifest, old?: Mod): Mod => {
  const shownFileName = toShownName(dir.basename);

  const id = manifest?.UniqueID ?? old?.id ?? uuid();
  const name = manifest?.Name ?? old?.name ?? shownFileName;
  const description = manifest?.Description ?? old?.description ?? "";
  const version = manifest?.Version ?? old?.version ?? "0.0.0";
  const status = statusBuilder(dir);
  const updater = updaterBuilder(manifest.UpdateKeys ?? []);

  const location = locationBuilder(dir.dirpath, shownFileName);

  return {
    id,
    name,
    description,
    version,
    status,
    updater,
    location,
  };
};

export default builder;
export type { Mod };
