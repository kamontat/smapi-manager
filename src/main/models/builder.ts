import type { IpcMain } from "electron";

import { Builder, Storage } from "@common/storage";
import DataLoader, { DataOrigin, Executor } from "@common/communication";
import type { DataMapper } from "@common/communication/models/data-mapper";
import { Logger } from "@common/logger";
import Analytic from "@common/analytics";
import type { Analytics } from "@common/analytics";

const logger = new Logger(DataOrigin.MAIN, "builder");
class MainBuilder {
  private ipc: IpcMain;
  private store: Storage;
  private analytic: Analytics;
  constructor(ipc: IpcMain) {
    this.ipc = ipc;
    this.store = Builder();
    this.analytic = Analytic.build();
  }

  handle<M extends DataMapper<string>>(key: M["type"], executor: Executor<M>): this {
    this.analytic.eventCounter.setup(key);
    this.ipc.handle(key, (event, data) => {
      this.analytic.eventCounter.count(key);

      const loader = DataLoader.load<M>(data);
      loader.log(logger);

      return executor({
        store: this.store,
        data: loader,
        analytic: this.analytic,
        event,
      });
    });

    return this;
  }
}

export default MainBuilder;
