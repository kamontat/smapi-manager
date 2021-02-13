// This is a key of i18n in app info page
enum StatusName {
  UNKNOWN = "stateUnknown",
  LATEST = "stateLatest",
  NEED_UPDATE = "stateNeedUpdate",
}

interface StatusData {
  version: string;
  download: string;
}

interface Status {
  state: StatusName;
  data?: StatusData;

  /**
   * The string represent current status
   */
  string: string;

  lastUpdated: number;
}

export { StatusName };
export type { Status, StatusData };
