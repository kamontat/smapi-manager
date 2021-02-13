import wrapper from "../models/data-mapper";
import type { DataMapper } from "../models/data-mapper";
import type { Status } from "@common/application";

interface Option {
  force: boolean;
}

const FETCH_APP_STATUS = "fetch-app-status";

type FetchAppStatus = DataMapper<typeof FETCH_APP_STATUS, Option, void, Status>;
const fetchAppStatus = (force = false): FetchAppStatus => {
  return wrapper({
    type: FETCH_APP_STATUS,
    subtype: {
      force,
    },
  });
};

export { FETCH_APP_STATUS, fetchAppStatus };
export type { FetchAppStatus };
