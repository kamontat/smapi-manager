import type { Mod } from "../v2/models/mod";

export const buildUpdaterUrl = (mod: Mod): string => {
  const { provider, id } = mod.updater;
  switch (provider.toLowerCase()) {
    case "nexus":
      return `https://www.nexusmods.com/stardewvalley/mods/${id}`;
    case "none":
      return `https://www.google.com/search?q=Stardew+valley+${mod.name}`;
    default:
      return `https://www.google.com/search?q=Stardew+valley+${mod.name}+${provider}`;
  }
};
