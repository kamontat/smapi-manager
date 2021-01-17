import { join } from "path";

import {
  listDirectories,
  Directory,
  toShownName,
  toHiddenName,
  isHidden,
  readJsonFile,
  isExist,
} from "@common/file-system";
import { uuid } from "@common/utils/uuid";

import ModCollection from "./models/collection";
import Mod from "./models/model";
import ManifestData from "./models/manifest";
import { CONTENT_JSON, MANIFEST_JSON } from "./constants";

const createModData = async (modDirectory: Directory, customId?: string): Promise<Mod> => {
  const id = customId ?? uuid();
  const manifest = await readJsonFile<ManifestData>(join(modDirectory.fullpath, MANIFEST_JSON));
  const isContentExist = await isExist(join(modDirectory.fullpath, CONTENT_JSON));

  return {
    id,
    dirpath: modDirectory.dirpath,
    filename: modDirectory.basename,
    status: {
      isHidden: isHidden(modDirectory),
    },
    transformer: {
      shownName: toShownName(modDirectory),
      hiddenName: toHiddenName(modDirectory),
    },
    manifest: {
      key: manifest.UniqueID,
      name: manifest.Name,
      version: manifest.Version,
      description: manifest.Description,
      updater: manifest.UpdateKeys,
      category: isContentExist ? "Portrait" : "Mod",
    },
  };
};

const createModCollection = async (dirpath?: string, limit = 5): Promise<ModCollection> => {
  if (dirpath === undefined) return { path: "", mods: [] };

  const subdirectories = await listDirectories(dirpath, limit);
  const mods = subdirectories.filter(d => d.files.find(f => f.basename === MANIFEST_JSON));
  const modData = await Promise.all(mods.map(d => createModData(d)));

  return {
    path: dirpath,
    mods: modData,
  };
};

export { createModCollection, createModData };
