import type { IpcMain, IpcMainInvokeEvent } from "electron";

import type { EventObject } from "@common/event";
import type { Fn3 } from "./func";
import { Logger } from "@common/logger";
import ProcessorType from "@common/constants/processor-type";
import type { ConfigStore, Storage } from "@common/storage";

type MainHandler<O, I = unknown> = Fn3<ConfigStore, EventObject<I>, IpcMainInvokeEvent, O>;
type MainHandlerV2<O, I = unknown> = Fn3<Storage, EventObject<I>, IpcMainInvokeEvent, O>;

const logger = new Logger(ProcessorType.MAIN, "model");
class Main {
  private ipc: IpcMain;
  private store: ConfigStore;
  constructor(ipc: IpcMain, store: ConfigStore) {
    this.ipc = ipc;
    this.store = store;
  }

  handle<I, O>(name: string, fn: MainHandler<O, I>): this {
    this.ipc.handle(name, (event, obj) => {
      logger.debug(`received ${name} with ${JSON.stringify(obj)}`);
      return fn(this.store, obj, event);
    });

    return this;
  }
}

class MainV2 {
  private ipc: IpcMain;
  private store: Storage;
  constructor(ipc: IpcMain, store: Storage) {
    this.ipc = ipc;
    this.store = store;
  }

  handle<I, O>(name: string, fn: MainHandlerV2<O, I>): this {
    this.ipc.handle(name, (event, obj) => {
      logger.debug(`[v2] received ${name} with ${JSON.stringify(obj)}`);
      return fn(this.store, obj, event);
    });

    return this;
  }
}

export default Main;
export { MainV2 };
export type { MainHandler, MainHandlerV2 };
