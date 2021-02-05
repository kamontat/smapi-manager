import type Mod from "./model";

interface ModCollection {
  path: string;
  mods: Mod[];
  lastUpdate: number;
}

export default ModCollection;
