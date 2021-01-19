interface ModTransformer {
  shownName: string;
  hiddenName: string;
}

interface ModStatus {
  isHidden: boolean;
  isLatest: boolean;
}

interface ModUpdater {
  key: string;
  id: string;

  url: string;
}

type ModCategory = "Mod" | "Portrait";

interface ModManifest {
  key: string;
  name: string;
  version: string;
  description: string;
  updater: ModUpdater[];
  category: ModCategory;
}

interface ModServerInfo {
  version: string;
}

interface Mod {
  id: string;
  filename: string;
  dirpath: string;

  transformer: ModTransformer;
  status: ModStatus;
  manifest: ModManifest;

  server?: ModServerInfo;
}

export default Mod;
