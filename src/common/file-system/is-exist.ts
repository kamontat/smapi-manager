import { access as accessCB, accessSync } from "fs";
import { promisify } from "util";

const access = promisify(accessCB);

const isExistSync = (filepath: string): boolean => {
  try {
    accessSync(filepath);
    return true;
  } catch (e) {
    return false;
  }
};

const isExist = async (filepath: string): Promise<boolean> => {
  try {
    await access(filepath);
    return true;
  } catch (e) {
    return false;
  }
};

export { isExist, isExistSync };
