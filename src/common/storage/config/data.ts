import Value from "../core/value";

interface ConfigValue extends Value {
  modDirectory: string;
  recursiveLimit: number;
  nexusmodsApiKey: string;
}

const defaults: ConfigValue = {
  modDirectory: "",
  recursiveLimit: 5,
  nexusmodsApiKey: "",
};

export default ConfigValue;
export { defaults };
