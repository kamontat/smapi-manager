export const withDefault = <T>(t: T | undefined | null, defaults: T): T => {
  if (t === undefined || t === null) return defaults;
  if (typeof t === "string" && t === "") return defaults;

  return t;
};
