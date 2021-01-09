import { randomBytes } from "crypto";

export const uuid = (): string => {
  const digit = 9;

  return randomBytes(digit).toString("base64");
};
