import type { IpcMain, App } from "electron";
import type { Analytics } from "@common/analytics";
import type { AppExecutor } from "./app-executor";

import { Builder, Storage } from "@common/storage";
import { DataLoader } from "@common/communication";
import { Logger } from "@common/logger";
import Analytic from "@common/analytics";
import type { Translator } from "@common/i18n";

import type { Mapping, Handler } from "@main/communication";
import { I18nLoader } from "@main/i18n";
import en from "@main/i18n/lang/en";

const mainLogger = Logger.Main();

class MainBuilder {
  private app: App;
  private ipc: IpcMain;
  private store: Storage;
  private analytic: Analytics;
  private i18n: Translator;
  constructor(app: App, ipc: IpcMain) {
    this.app = app;
    this.ipc = ipc;
    this.store = Builder();
    this.analytic = Analytic.build(this.store);
    this.i18n = new I18nLoader("en", en);
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

  handler<K extends keyof Mapping = keyof Mapping, M extends Mapping[K] = Mapping[K]>(obj: Handler<K, M>): this {
    // setup analytics
    this.analytic.eventCounter.setup(obj.type);

    const logger = Logger.Common(obj.type);
    this.ipc.handle(obj.type, async (event, data) => {
      this.analytic.eventCounter.count(obj.type);
      try {
        const loader = DataLoader.load<M>(data);
        const result = await obj.executor({
          store: this.store,
          data: loader,
          analytic: this.analytic,
          event,
          logger,
          i18n: this.i18n,
        });

        return result;
      } catch (e) {
        this.analytic.nucleus.trackError("unknown", e);
        return e;
      }
    });

    return this;
  }
}

export default MainBuilder;
