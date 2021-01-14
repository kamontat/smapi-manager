interface StorageType {
  firstPage: string;
  modDirectory: string;
}

const defaults: StorageType = {
  firstPage: "dashboard",
  modDirectory: "",
};

export default StorageType;
export { defaults };
