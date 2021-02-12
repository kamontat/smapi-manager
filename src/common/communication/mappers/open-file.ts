import wrapper from "../models/data-mapper";
import type { DataMapper } from "../models/data-mapper";

const OPEN_FILE = "open-file";

type OpenFile = DataMapper<typeof OPEN_FILE, void, string, void>;
const openFile = (filepath: string): OpenFile => {
  return wrapper({
    type: OPEN_FILE,
    input: filepath,
  });
};

export { OPEN_FILE, openFile };
export type { OpenFile };
