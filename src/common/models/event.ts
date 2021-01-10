import ProcessorType from "@common/constants/processor-type";
import Logger from "./logger";

type EventTypeObject = { type: string };
type EventDetailedTypeObject = EventTypeObject & { subtype?: string };

type EventValueObject<T = unknown> = EventDetailedTypeObject & { value?: T };

type EventProcessorObject<T = unknown> = EventValueObject<T> & { origin: ProcessorType };

class EventObject<T> {
  static createRenderer<T>(obj: EventValueObject<T>): EventObject<T> {
    return new EventObject(ProcessorType.RENDERER, obj);
  }

  static createPreload<T>(obj: EventValueObject<T>): EventObject<T> {
    return new EventObject(ProcessorType.PRELOAD, obj);
  }

  static createMain<T>(obj: EventValueObject<T>): EventObject<T> {
    return new EventObject(ProcessorType.MAIN, obj);
  }

  static load<T>(obj: EventProcessorObject<T>): EventObject<T> {
    return new EventObject(obj.origin, obj);
  }

  private obj: EventProcessorObject<T>;
  constructor(origin: ProcessorType, obj: EventValueObject<T>) {
    this.obj = {
      origin,
      ...obj,
    };
  }

  origin(): ProcessorType {
    return this.obj.origin;
  }

  type(): string {
    return this.obj.type;
  }

  subtype(): string | undefined {
    return this.obj.subtype;
  }

  value(): T | undefined {
    return this.obj.value;
  }

  is(origin: ProcessorType, type: string, subtype?: string): boolean {
    return this.isOrigin(origin) && this.isType(type, subtype);
  }

  log(logger: Logger): void {
    logger.event(this.obj.origin, `${this.obj.type} ${this.obj.subtype ? `(${this.obj.subtype})` : ""}`);
  }

  isOrigin(origin: ProcessorType): boolean {
    return this.obj.origin === origin;
  }

  isType(type: string, subtype?: string): boolean {
    const checkerA = this.obj.type === type;
    const checkerB = subtype === undefined || this.obj.subtype === subtype;

    return checkerA && checkerB;
  }

  toJSON(): EventProcessorObject<T> {
    return this.obj;
  }

  clone<V = T>(origin: ProcessorType, value?: V): EventObject<V> {
    return new EventObject(origin, {
      type: this.obj.type,
      subtype: this.obj.subtype,
      value: value ?? ((this.obj.value as unknown) as V),
    });
  }
}

export default EventObject;
export { EventTypeObject, EventProcessorObject };
