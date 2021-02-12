import type { IpcMainInvokeEvent } from "electron";
import type { Analytics } from "@common/analytics";
import type { Storage } from "@common/storage";
import type { Logger } from "@common/logger";
import type { Translator } from "@common/i18n";

import type { DataMapper } from "./data-mapper";
import type { DataLoader } from "./data-loader";

interface ExecutorArguments<M extends DataMapper<string>> {
  store: Storage;
  data: DataLoader<M>;
  analytic: Analytics;
  event: IpcMainInvokeEvent;
  logger: Logger;
  i18n: Translator;
}

export type { ExecutorArguments };
