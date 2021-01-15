import { INFO, Level } from "./level";

class Global {
  static level: Level = INFO;

  static setLevel(level: Level): void {
    Global.level = level;
  }
}

export default Global;
