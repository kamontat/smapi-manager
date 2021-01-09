import { readdirSync } from "fs";
import { join, basename, dirname } from "path";

import { MANIFEST_JSON, RECUSIVE_LIMIT } from "@common/constants/directory";
import { uuid } from "@common/utils/uuid";

interface DirectoryObjectName {
  original: string;
  shown: string;
  hidden: string;
}

interface DirectoryObject {
  id: string;
  path: string;
  name: DirectoryObjectName;

  isHidden: boolean;
}

interface Directory {
  id: string;
  name: string;
  subdirectories: DirectoryObject[];
}

const listSubDirectories = (dir: string, limit: number): string[] => {
  const ls = readdirSync(dir, { withFileTypes: true, encoding: "utf-8" });

  const files = ls.filter(v => v.isFile());
  const dirs = ls.filter(v => v.isDirectory());

  const isManifest = files.findIndex(v => v.name === MANIFEST_JSON) !== -1;
  const result = isManifest ? [dir] : [];

  if (dirs.length < 1 || limit < 1) {
    return result;
  }

  for (const l of dirs) {
    result.push(...listSubDirectories(join(dir, l.name), limit - 1));
  }

  return result;
};

const createDirectoryObject = (fullpath: string, customId?: string): DirectoryObject => {
  const id = customId ?? uuid();

  const dirpath = dirname(fullpath);
  const fname = basename(fullpath);
  const name = fname.trim();
  const hasDot = name.charAt(0) === ".";

  const realName = name.replace(/^\./, "").replace(/\.$/, "");
  const hidden = `.${realName}.`;
  const shown = realName;

  return {
    id,
    path: dirpath,
    name: {
      original: fname,
      hidden,
      shown,
    },
    isHidden: hasDot,
  };
};

const createDirectory = (dir?: string): Directory => {
  const id = uuid();
  if (!dir) return { id, name: "unknown", subdirectories: [] };

  const ls = listSubDirectories(dir, RECUSIVE_LIMIT);
  return {
    id,
    name: dir,
    subdirectories: ls.map(l => createDirectoryObject(l)),
  };
};

export default createDirectory;
export { createDirectoryObject, Directory, DirectoryObject, DirectoryObjectName };
