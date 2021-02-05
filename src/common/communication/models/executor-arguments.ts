import type { IpcMainInvokeEvent } from "electron";
import type { Analytics } from "@common/analytics";
import type { Storage } from "@common/storage";

import type { DataMapper } from "..";
import type DataLoader from "../models/data-loader";

interface ExecutorArguments<M extends DataMapper<string>> {
  store: Storage;
  data: DataLoader<M>;
  analytic: Analytics;
  event: IpcMainInvokeEvent;
}

export type { ExecutorArguments };
