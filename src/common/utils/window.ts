import { DEFAULT_NAME } from "@common/constants/windows";

export const getWindowName = (name: string): string => {
  return `${name} | ${DEFAULT_NAME}`;
};
