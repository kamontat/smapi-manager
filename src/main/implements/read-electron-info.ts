import { MainAPIs, READ_ELECTRON_INFO } from "@common/communication";

const readElectronInfo: MainAPIs[typeof READ_ELECTRON_INFO] = async () => {
  const electronVersion = process.versions.electron;
  const chromeVersion = process.versions.chrome;

  return {
    version: electronVersion,
    chrome: chromeVersion,
  };
};

export default readElectronInfo;
export { READ_ELECTRON_INFO };
