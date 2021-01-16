import { readdirSync, readdir as readdirCB, Dirent } from "fs";
import { promisify } from "util";

const readDirSync = (dirpath: string): Dirent[] => {
  return readdirSync(dirpath, { withFileTypes: true, encoding: "utf-8" });
};

const _readDir = promisify(readdirCB);
const readDir = (dirpath: string): Promise<Dirent[]> => {
  return _readDir(dirpath, { withFileTypes: true, encoding: "utf-8" });
};

export { readDir, readDirSync };
