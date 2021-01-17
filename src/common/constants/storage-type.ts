interface StorageType {
  modDirectory: string;
  recursiveLimit: number;
  nexusmodsApiKey: string;
}

const defaults: StorageType = {
  modDirectory: "",
  recursiveLimit: 5,
  nexusmodsApiKey: "",
};

export default StorageType;
export { defaults };
