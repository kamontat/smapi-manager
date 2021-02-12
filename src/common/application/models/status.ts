enum StatusName {
  LATEST = "latest",
  NEED_UPDATE = "need-update",
}

interface StatusData {
  version: string;
  download: string;
}

interface Status {
  state: StatusName;
  data?: StatusData;
}

export { StatusName };
export type { Status, StatusData };
