import type { IpcMain } from "electron";

import { Builder, Storage } from "@common/storage";
import DataLoader, { DataOrigin, Executor } from "@common/communication";
import type { DataMapper } from "@common/communication/models/data-mapper";
import { Logger } from "@common/logger";

const logger = new Logger(DataOrigin.MAIN, "builder");
class MainBuilder {
  private ipc: IpcMain;
  private store: Storage;
  constructor(ipc: IpcMain) {
    this.ipc = ipc;
    this.store = Builder();
  }

  handle<M extends DataMapper<string>>(key: M["type"], executor: Executor<M>): this {
    this.ipc.handle(key, (event, data) => {
      const loader = DataLoader.load<M>(data);
      loader.log(logger);

      return executor(this.store, loader, event);
    });

    return this;
  }
}

export default MainBuilder;
