import type { IpcMain, App } from "electron";
import type { DataMapper } from "@common/communication/models/data-mapper";
import type { Analytics } from "@common/analytics";
import type { AppExecutor } from "./app-executor";

import { Builder, Storage } from "@common/storage";
import DataLoader, { Executor } from "@common/communication";
import { Logger } from "@common/logger";
import Analytic from "@common/analytics";

const mainLogger = Logger.Main();
const logger = Logger.Main("builder");
class MainBuilder {
  private app: App;
  private ipc: IpcMain;
  private store: Storage;
  private analytic: Analytics;
  constructor(app: App, ipc: IpcMain) {
    this.app = app;
    this.ipc = ipc;
    this.store = Builder();
    this.analytic = Analytic.build(this.store);
  }

  onReady(executor: AppExecutor): this {
    this.app.on("ready", () => {
      executor({
        event: "ready",
        store: this.store,
        analytic: this.analytic,
        logger: mainLogger,
      });
    });

    return this;
  }

  onQuit(executor: AppExecutor): this {
    this.app.on("window-all-closed", () => {
      executor({ event: "window-all-closed", store: this.store, analytic: this.analytic, logger: mainLogger });
    });

    return this;
  }

  onReactivate(executor: AppExecutor): this {
    this.app.on("activate", () => {
      executor({
        event: "activate",
        store: this.store,
        analytic: this.analytic,
        logger: mainLogger,
      });
    });

    return this;
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
