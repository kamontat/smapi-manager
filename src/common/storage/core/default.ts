import StorageValue from "./value";

const buildDefault = <T extends StorageValue>(t: T): Readonly<Required<T>> => {
  return {
    ...t,
    version: "v1.0.0",
  } as Required<T>;
};

export default buildDefault;
