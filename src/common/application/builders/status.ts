import { StatusName } from "../models/status";
import type { Status } from "../models/status";

export const statusLatest = (): Status => {
  return {
    state: StatusName.LATEST,
  };
};

export const statusNeedUpdate = (version: string, downloadUrl: string): Status => {
  return {
    state: StatusName.NEED_UPDATE,
    data: {
      version,
      download: downloadUrl,
    },
  };
};
