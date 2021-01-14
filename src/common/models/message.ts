import { WRITE_CONFIG } from "@common/constants/events";
import ProcessorType from "@common/constants/processor-type";
import StorageType from "@common/constants/storage-type";

import EventObject, { EventProcessorObject, EventValueObject } from "./event";
import Logger from "./logger";

const logger = new Logger("model", "message");
class Message {
  private window: Window;
  private type: ProcessorType;

  private events: ((this: Window, event: MessageEvent<EventProcessorObject<unknown>>) => void)[];

  constructor(window: Window, type: ProcessorType) {
    this.window = window;
    this.type = type;
    this.events = [];
  }

  saveConfig<K extends keyof StorageType = keyof StorageType, V extends StorageType[K] = StorageType[K]>(
    key: K,
    value: V
  ): void {
    this.sent({ type: WRITE_CONFIG, subtype: key, value });
  }

  sent<T>(obj: EventValueObject<T>): void {
    let msg = {};

    if (this.type === ProcessorType.MAIN) msg = EventObject.createMain(obj).toJSON();
    else if (this.type === ProcessorType.PRELOAD) msg = EventObject.createPreload(obj).toJSON();
    else if (this.type === ProcessorType.RENDERER) msg = EventObject.createRenderer(obj).toJSON();

    logger.debug(`sending data ${JSON.stringify(msg)}`);
    this.window.postMessage(msg, "*");
  }

  receive<T>(type: ProcessorType, fn: (msg: EventObject<T>) => void): void {
    const eventHandler = (event: MessageEvent<EventProcessorObject<T>>) => {
      const data = EventObject.load<T>(event.data);
      if (data.isOrigin(type)) {
        fn(data);
      }
    };

    this.events.push(eventHandler);

    this.window.addEventListener("message", eventHandler);
  }

  cleanup(): void {
    logger.debug(`cleanup event handle on window message (${this.events.length} event)`);
    this.events.forEach(event => this.window.removeEventListener("message", event));
    this.events = [];
  }
}

export default Message;
