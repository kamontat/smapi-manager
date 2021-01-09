export const isWindows = (): boolean => {
  return process.platform === "win32";
};

export const isLinux = (): boolean => {
  return process.platform === "linux";
};

export const isMacOS = (): boolean => {
  return process.platform === "darwin";
};
