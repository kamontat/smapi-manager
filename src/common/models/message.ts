import ProcessorType from "@common/constants/processor-type";

import EventObject, { EventValueObject } from "./event";
import Logger from "./logger";

const logger = new Logger("model", "message");
class Message {
  private window: Window;
  private type: ProcessorType;

  constructor(window: Window, type: ProcessorType) {
    this.window = window;
    this.type = type;
  }

  sent(obj: EventValueObject): void {
    let msg = {};

    if (this.type === ProcessorType.MAIN) msg = EventObject.createMain(obj).toJSON();
    else if (this.type === ProcessorType.PRELOAD) msg = EventObject.createPreload(obj).toJSON();
    else if (this.type === ProcessorType.RENDERER) msg = EventObject.createRenderer(obj).toJSON();

    logger.debug(`sending data ${JSON.stringify(msg)}`);
    this.window.postMessage(msg, "*");
  }

  receive<T>(type: ProcessorType, fn: (msg: EventObject<T>, logger: Logger) => void): void {
    this.window.addEventListener("message", event => {
      const data = EventObject.load<T>(event.data);
      if (data.isOrigin(type)) {
        data.log(logger);
        fn(data, logger);
      }
    });
  }
}

export default Message;
