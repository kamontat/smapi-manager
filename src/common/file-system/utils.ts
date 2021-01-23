import type { File } from "./models";

const isHidden = (file: File | string): boolean => {
  const basename = typeof file === "string" ? file : file.basename;
  return basename.charAt(0) === ".";
};

const toHiddenName = (file: File | string): string => {
  const shownName = toShownName(file);
  return `.${shownName}.`;
};

const toShownName = (file: File | string): string => {
  const basename = typeof file === "string" ? file : file.basename;
  if (isHidden(basename)) return basename.replace(/^\./, "").replace(/\.$/, "");
  return basename;
};

export { isHidden, toHiddenName, toShownName };
