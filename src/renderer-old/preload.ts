import { ipcRenderer } from "electron";

import ProcessorType from "@common/constants/processor-type";
import Logger from "@common/models/logger";
import EventObject from "@common/models/event";

const logger = new Logger("renderer", "preload");
process.once("loaded", () => {
  window.addEventListener("message", event => {
    const data = EventObject.load(event.data);

    if (data.isOrigin(ProcessorType.RENDERER)) {
      data.log(logger);

      ipcRenderer.invoke(data.type(), data.toJSON()).then(args => {
        logger.event(ProcessorType.MAIN, `received data`);
        window.postMessage(data.clone(ProcessorType.PRELOAD, args).toJSON(), "*");
      });
    }
  });
});
