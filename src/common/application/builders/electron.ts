import { withDefault } from "@common/utils/checker";

import type { ElectronInformation } from "../models/electron";

const defaults = "unknown";

export const electronInformation = (obj?: Partial<ElectronInformation>): ElectronInformation => {
  return {
    version: withDefault(obj?.version, defaults),
    chrome: withDefault(obj?.chrome, defaults),
  };
};
