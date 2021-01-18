import { readFileSync as coreReadFileSync, readFile as readFileCB } from "fs";
import { promisify } from "util";

import jsonrepair from "jsonrepair";

const parseJson = <T>(json: string): T => {
  try {
    return JSON.parse(json);
  } catch (e) {
    return JSON.parse(jsonrepair(json));
  }
};

const readFileSync = (filepath: string): string => {
  return coreReadFileSync(filepath, { encoding: "utf-8" });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const readJsonFileSync = async <T extends Record<string, any>>(filepath: string): Promise<T> => {
  const content = await readFileSync(filepath);
  return parseJson<T>(content);
};

const coreReadFile = promisify(readFileCB);

const readFile = (filepath: string): Promise<string> => {
  return coreReadFile(filepath, { encoding: "utf-8" });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const readJsonFile = async <T extends Record<string, any>>(filepath: string): Promise<T> => {
  const content = await readFile(filepath);
  return parseJson<T>(content);
};

export { readFile, readJsonFile, readFileSync, readJsonFileSync };
