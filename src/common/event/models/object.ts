import ProcessorType from "@common/constants/processor-type";
import type { Logger } from "@common/logger";

import type { EventOption, EventObject } from "./option";

class EventData<T> {
  static createRenderer<T>(obj: EventOption<T>): EventData<T> {
    return new EventData(Object.assign({}, obj, { origin: ProcessorType.RENDERER }));
  }

  static createPreload<T>(obj: EventOption<T>): EventData<T> {
    return new EventData(Object.assign({}, obj, { origin: ProcessorType.PRELOAD }));
  }

  static createMain<T>(obj: EventOption<T>): EventData<T> {
    return new EventData(Object.assign({}, obj, { origin: ProcessorType.MAIN }));
  }

  static load<T>(obj: EventObject<T>): EventData<T> {
    return new EventData(obj);
  }

  readonly origin: ProcessorType;
  readonly type: string;
  readonly subtype?: string;
  readonly value?: T;
  constructor(obj: EventObject<T>) {
    this.origin = obj.origin;
    this.type = obj.type;
    this.subtype = obj.subtype;
    this.value = obj.value;
  }

  isOrigin(origin: ProcessorType): boolean {
    return this.origin === origin;
  }

  isType(type: string): boolean {
    return this.type === type;
  }

  isSubtype(subtype: string): boolean {
    return this.subtype === undefined || subtype === undefined || this.subtype === subtype;
  }

  log(logger: Logger): void {
    logger.event(this.origin, `${this.type}${this.subtype ? ` (${this.subtype})` : ""}`);
  }

  toJSON(): EventObject<T> {
    return {
      origin: this.origin,
      type: this.type,
      subtype: this.subtype,
      value: this.value,
    };
  }

  clone<V = T>(origin: ProcessorType, value?: V): EventData<V> {
    return new EventData({
      origin: origin,
      type: this.type,
      subtype: this.subtype,
      value: value ?? ((this.value as unknown) as V),
    });
  }
}

export default EventData;
