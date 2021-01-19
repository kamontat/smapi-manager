import Value from "../core/value";

interface ConfigValue extends Value {
  debugMode: boolean;
  tutorialMode: boolean;
  modDirectory: string;
  recursiveLimit: number;
  nexusmodsApiKey: string;
}

const defaults: ConfigValue = {
  debugMode: false,
  tutorialMode: false,
  modDirectory: "",
  recursiveLimit: 5,
  nexusmodsApiKey: "",
};

type ConfigKey = keyof ConfigValue;

export default ConfigValue;
export { defaults, ConfigKey };
