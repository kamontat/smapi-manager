import Value from "./models";

const defaultValue: Value = {
  modDirectory: "",
  recursiveLimit: 5,
  nexusmodsApiKey: "",
};

const ENCRYPTION_KEY = "secret-key";

export default defaultValue;
export { ENCRYPTION_KEY };
