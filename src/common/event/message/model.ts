import StorageType from "@common/constants/storage-type";
import ProcessorType from "@common/constants/processor-type";
import { Logger } from "@common/logger";

import { WRITE_CONFIG } from "@common/event/constants";
import { EventData, EventObject, EventOption } from "@common/event/models";

import Checker from "./checker";
import { RawListener, Listener } from "./listener";
import { getTypeFrom } from "./utils";

const logger = new Logger(ProcessorType.COMMON, "message");
class Message {
  private window: Window;
  private type: ProcessorType;
  private listeners: RawListener<unknown>[];

  constructor(type: ProcessorType, w?: Window) {
    this.window = w ?? window;
    this.type = type;
    this.listeners = [];
  }

  saveConfig<K extends keyof StorageType = keyof StorageType, V extends StorageType[K] = StorageType[K]>(
    key: K,
    value: V
  ): void {
    this.sent({ type: WRITE_CONFIG, subtype: key, value });
  }

  sent<T>(obj: EventOption<T>): void {
    const msg = EventData.load(Object.assign({}, obj, { origin: this.type }));

    logger.debug(`sending data ${JSON.stringify(msg)}`);
    this.window.postMessage(msg.toJSON(), "*");
  }

  receive<T>(checker?: Checker<Listener<T>>): void {
    const origin = checker?.origin ?? getTypeFrom(this.type);
    const type = checker?.type ?? [];
    const subtype = checker?.subtype ?? [];

    const listener = (event: MessageEvent<EventObject<T>>) => {
      const data = EventData.load<T>(event.data);

      if (!data.isOrigin(origin)) return;
      if (type.length > 0 && Array.from(type).every(t => !data.isType(t))) return;
      if (subtype.length > 0 && Array.from(subtype).every(t => !data.isSubtype(t))) return;

      checker.callback(data);
    };

    this.listeners.push(listener);
    this.window.addEventListener("message", listener);
  }

  cleanup() {
    return (): void => {
      logger.debug(`cleanup event handle on window message (${this.listeners.length} event)`);
      this.listeners.forEach(event => this.window.removeEventListener("message", event));
      this.listeners = [];
    };
  }
}

export default Message;