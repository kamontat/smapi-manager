import type Value from "../core/value";

interface SettingValue extends Value {
  tutorialMode: boolean;
  betaMode: boolean;
  debugMode: boolean;
}
type SettingKey = keyof SettingValue;

const defaults: SettingValue = {
  tutorialMode: false,
  betaMode: false,
  debugMode: false,
};

export default defaults;
export type { SettingValue, SettingKey };
