import { ipcRenderer, clipboard } from "electron";

import ProcessorType from "@common/constants/processor-type";
import { Logger, DEBUG, ERROR, Global } from "@common/logger";
import { CLIPBOARD_COPY, CLIPBOARD_PASTE, Message } from "@common/event";
import { isDevelopment } from "@common/utils/env";

process.once("loaded", () => {
  Global.setLevel(isDevelopment() ? DEBUG : ERROR);

  const logger = new Logger(ProcessorType.PRELOAD);
  const message = new Message(ProcessorType.PRELOAD);

  message.receive({
    callback: data => {
      data.log(logger);

      if (data.isType(CLIPBOARD_COPY)) {
        if (data.value) {
          clipboard.writeText(data.value as string);
          window.postMessage(data.clone(ProcessorType.PRELOAD).toJSON(), "*");
        }
      } else if (data.isType(CLIPBOARD_PASTE)) {
        const content = clipboard.readText();
        logger.debug(`return '${content}'`);
        window.postMessage(data.clone(ProcessorType.PRELOAD, content).toJSON(), "*");
      } else {
        ipcRenderer.invoke(data.type, data.toJSON()).then(args => {
          logger.event(ProcessorType.MAIN, `receiving data from ${data.type}`);
          window.postMessage(data.clone(ProcessorType.PRELOAD, args).toJSON(), "*");
        });
      }
    },
  });
});
