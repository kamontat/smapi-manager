import { IpcMain, IpcMainInvokeEvent } from "electron";

import { EventObject } from "@common/event";
import { Fn3 } from "./func";
import { Logger } from "@common/logger";
import ProcessorType from "@common/constants/processor-type";
import { ConfigStore } from "@common/storage";

type MainHandler<O, I = unknown> = Fn3<ConfigStore, EventObject<I>, IpcMainInvokeEvent, O>;

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

export default Main;
export { MainHandler };
