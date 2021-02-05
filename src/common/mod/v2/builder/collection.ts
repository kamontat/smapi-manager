import { join } from "path";
import { Directory, listDirectories, readJsonFile } from "@common/file-system";
import { Logger } from "@common/logger";
import { base64 } from "@common/utils/uuid";

import { MANIFEST_JSON } from "../../constants";
import { emptyCollectionBuilder } from "../models/collection";
import modBuilder from "../models/mod";
import type { ModCollection } from "../models/collection";
import type { Mod } from "../models/mod";
import type { Manifest } from "../models/manifest";

const logger = Logger.Common("mod", "collection-builder");

export const createMod = async (directory: Directory): Promise<Mod> => {
  const manifest = await readJsonFile<Manifest>(join(directory.fullpath, MANIFEST_JSON));
  return modBuilder(directory, manifest);
};

export const updateMod = async (mods: Record<string, Mod>, directory: Directory): Promise<Mod> => {
  const manifest = await readJsonFile<Manifest>(join(directory.fullpath, MANIFEST_JSON));

  return modBuilder(directory, manifest, mods[manifest.UniqueID]);
};

export const createCollection = async (
  rootpath?: string,
  limit = 5,
  lastUpdated = +new Date()
): Promise<ModCollection> => {
  if (rootpath === undefined || rootpath === "") return emptyCollectionBuilder();

  const uuid = base64(rootpath);
  logger.debug(`create new collection object at '${rootpath}' (${uuid})`);

  const subdirectories = await listDirectories(rootpath, limit);
  const modDirectories = subdirectories.filter(d => d.files.find(f => f.basename === MANIFEST_JSON));
  const mods = await Promise.all(modDirectories.map(createMod));

  return {
    uuid,
    path: rootpath,
    mods: mods.reduce((p, c) => {
      return Object.assign(p, {
        [c.id]: c,
      });
    }, {} as Record<string, Mod>),
    lastUpdated,
  };
};

export const updateCollection = async (collection: ModCollection, limit: number): Promise<ModCollection> => {
  const rootpath = collection.path;

  logger.debug(`updating collection object at '${rootpath}'`);

  const subDirectories = await listDirectories(rootpath, limit);
  const modDirectories = subDirectories.filter(d => d.files.find(f => f.basename === MANIFEST_JSON));
  const mods = await Promise.all(modDirectories.map(dir => updateMod(collection.mods, dir)));

  return {
    uuid: collection.uuid,
    path: rootpath,
    mods: mods.reduce((p, c) => {
      return Object.assign(p, {
        [c.id]: c,
      });
    }, {} as Record<string, Mod>),
    lastUpdated: +new Date(),
  };
};
