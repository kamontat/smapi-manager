import { handler, READ_ELECTRON_INFO } from "@main/communication";

export const readElectronInfo = handler(READ_ELECTRON_INFO, async () => {
  const electronVersion = process.versions.electron;
  const chromeVersion = process.versions.chrome;

  return {
    version: electronVersion,
    chrome: chromeVersion,
  };
});
