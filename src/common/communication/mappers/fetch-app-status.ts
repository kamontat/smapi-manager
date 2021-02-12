import wrapper from "../models/data-mapper";
import type { DataMapper } from "../models/data-mapper";
import type { VersionObject } from "@common/application/version";

const FETCH_APP_STATUS = "fetch-app-status";

type FetchAppStatus = DataMapper<typeof FETCH_APP_STATUS, void, void, VersionObject>;
const fetchAppStatus = (): FetchAppStatus => {
  return wrapper({
    type: FETCH_APP_STATUS,
  });
};

export { FETCH_APP_STATUS, fetchAppStatus };
export type { FetchAppStatus };