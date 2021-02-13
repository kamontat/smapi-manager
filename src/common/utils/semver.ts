const getString = (array: string[], index: number) => {
  if (array.length > index) return array[index];
  else return undefined;
};

const getNumber = (array: string[], index: number, defaults: number) => {
  if (array.length > index) {
    const number = parseInt(array[index]);
    if (isNaN(number)) return defaults;
    return number;
  }
  return defaults;
};

export class Semver {
  private valid: boolean;
  readonly raw: string;

  readonly major: number;
  readonly minor: number;
  readonly patch: number;
  private identifiers?: string;
  private prerelease: number;

  constructor(version: string) {
    this.raw = version;
    this.valid = version.startsWith("v");

    const arr = version.substr(1).split("-");
    if (arr.length > 0) {
      const versions = arr[0].split(".");

      this.major = getNumber(versions, 0, 0);
      this.minor = getNumber(versions, 1, 0);
      this.patch = getNumber(versions, 2, 0);
    }

    if (arr.length > 1) {
      const preReleases = arr[1].split(".");

      this.identifiers = getString(preReleases, 0);
      this.prerelease = getNumber(preReleases, 1, -1);
    }
  }

  get isValid(): boolean {
    return this.valid;
  }

  get isPreRelease(): boolean {
    return this.identifiers !== undefined;
  }

  isEquals(v: Semver): boolean {
    const major = this.major === v.major;
    const minor = this.minor === v.minor;
    const patch = this.patch === v.patch;

    const preRelease = this.prerelease === v.prerelease;

    return major && minor && patch && preRelease;
  }

  isAfter(v: Semver): boolean {
    if (this.major > v.major) return true;
    else if (this.major < v.major) return false;
    else if (this.minor > this.minor) return true;
    else if (this.minor < v.minor) return false;
    else if (this.patch > v.patch) return true;
    else if (this.patch < v.patch) return false;

    // 1.0.0 > 1.0.0-beta.1
    if (!this.isPreRelease && v.isPreRelease) return true;

    // 1.0.0-beta.1 > 1.0.0-beta.2
    if (this.isPreRelease && v.isPreRelease) return this.prerelease > v.prerelease;

    return false;
  }
}
