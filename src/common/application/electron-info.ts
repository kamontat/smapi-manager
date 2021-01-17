interface ElectronInfo {
  version: string;
  chrome: string;
}

const defaults: ElectronInfo = {
  version: "",
  chrome: "",
};

export type { ElectronInfo };
export { defaults };
