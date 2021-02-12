import type { ElectronInformation } from "@common/application";

import wrapper from "../models/data-mapper";
import type { DataMapper } from "../models/data-mapper";

const READ_ELECTRON_INFO = "read-electron-info";

type ReadElectronInfo = DataMapper<typeof READ_ELECTRON_INFO, void, void, ElectronInformation>;

const readElectronInfo = (): ReadElectronInfo => {
  return wrapper({
    type: READ_ELECTRON_INFO,
  });
};

export { READ_ELECTRON_INFO, readElectronInfo };
export type { ReadElectronInfo };
