interface ModTransformer {
  shownName: string;
  hiddenName: string;
}

interface ModStatus {
  isHidden: boolean;
}

interface ModManifest {
  key: string;
  name: string;
  version: string;
  description: string;
  updater: string[];
}

interface Mod {
  id: string;
  filename: string;
  dirpath: string;

  transformer: ModTransformer;
  status: ModStatus;
  manifest: ModManifest;
}

export default Mod;
