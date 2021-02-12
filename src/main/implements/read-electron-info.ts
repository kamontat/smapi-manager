import { electronInformation } from "@common/application";
import { handler, READ_ELECTRON_INFO } from "@main/communication";

export const readElectronInfo = handler(READ_ELECTRON_INFO, async () => {
  return electronInformation({
    version: process.versions.electron,
    chrome: process.versions.chrome,
  });
});
