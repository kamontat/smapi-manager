import { uuid } from "@common/utils/uuid";
import type Value from "../core/value";

interface SettingValue extends Value {
  uniqueid: string;
  language: string;
  tutorialMode: boolean;
  betaMode: boolean;
  debugMode: boolean;
}
type SettingKey = keyof SettingValue;

const defaults: SettingValue = {
  uniqueid: uuid(18),
  language: "en",
  tutorialMode: true,
  betaMode: false,
  debugMode: false,
};

export default defaults;
export type { SettingValue, SettingKey };
