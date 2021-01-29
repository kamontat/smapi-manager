import type Value from "../core/value";

interface SettingValue extends Value {
  language: string;
  tutorialMode: boolean;
  betaMode: boolean;
  debugMode: boolean;
}
type SettingKey = keyof SettingValue;

const defaults: SettingValue = {
  language: "en",
  tutorialMode: true,
  betaMode: false,
  debugMode: false,
};

export default defaults;
export type { SettingValue, SettingKey };
