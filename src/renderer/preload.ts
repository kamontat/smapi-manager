import { ipcRenderer } from "electron";

import Logger, { color } from "@common/models/logger";
import EventObject, { Origin } from "@common/models/event";
import { RENDERER, MAIN } from "@common/constants/process-type";
import { createPreloadEvent } from "@common/utils/event";

const logger = new Logger(color.lightRed, "renderer", "preload");
process.once("loaded", () => {
  window.addEventListener("message", event => {
    const data: EventObject = event.data;

    if (data.origin === Origin.RENDERER) {
      logger.event(RENDERER, `${data.type} (${data.subtype})`);
      ipcRenderer.invoke(data.type, data).then(args => {
        logger.event(MAIN, `received data`);
        window.postMessage(createPreloadEvent({ type: data.type, subtype: data.subtype, value: args }), "*");
      });
    }
  });
});
