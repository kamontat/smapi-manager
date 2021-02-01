import os from "os";

export const isWindows = (): boolean => {
  return process.platform === "win32";
};

export const isLinux = (): boolean => {
  return process.platform === "linux";
};

export const isMacOS = (): boolean => {
  return process.platform === "darwin";
};

export const hostname = (): string => {
  return os.hostname();
};

export const username = (): string => {
  return os.userInfo({ encoding: "utf-8" }).username;
};
