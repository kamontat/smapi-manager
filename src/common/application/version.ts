interface LatestVersion {
  latest: true;
}

interface NextVersion {
  latest: false;
  version: string;
  download: string;
}

export type VersionObject = LatestVersion | NextVersion;
export type { LatestVersion, NextVersion };
