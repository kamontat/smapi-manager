import { StatusName } from "../models/status";
import type { Status } from "../models/status";

export const status = (status?: Partial<Status>, update = false): Status => {
  return {
    state: status?.state ?? StatusName.UNKNOWN,
    data: {
      version: status?.data?.version,
      download: status?.data?.download,
    },
    string: status?.string ?? "",
    lastUpdated: update ? +new Date() : status?.lastUpdated ?? +new Date(),
  };
};

export const statusLatest = (): Status => {
  return status({
    state: StatusName.LATEST,
  });
};

export const statusNeedUpdate = (version: string, downloadUrl: string): Status => {
  return status({
    state: StatusName.NEED_UPDATE,
    data: {
      version,
      download: downloadUrl,
    },
  });
};
