import type { Mod } from "./mod";

export interface ModExternal {
  version: string;
  category: string;
  lastUpdated: number;
}

export interface ModServerExtender extends Mod {
  external: ModExternal;
}

export const modServerExtenderBuilder = (mod: Mod, external?: Partial<ModExternal>): ModServerExtender => {
  const extendMod = {
    external: {
      version: external?.version ?? mod.version,
      category: external?.category ?? "Unknown",
      lastUpdated: external?.lastUpdated ?? +new Date(),
    } as ModExternal,
  };

  return Object.assign(extendMod, mod);
};

export const isModServerExtender = (mod: Mod): mod is ModServerExtender => {
  const maybe = (mod as unknown) as ModServerExtender;
  return maybe.external !== undefined;
};
