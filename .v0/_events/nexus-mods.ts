import ProcessorType from "@common/constants/processor-type";
import { Logger } from "@common/logger";
import type { ModData } from "@common/mod";
import { Request } from "@common/request";
import type { Header, Metadata } from "@common/nuxus";

import type { MainHandlerV2 } from "../models/main";

const NEXUS_MOD_API_URL = "api.nexusmods.com";
const NEXUS_MOD_METADATA_PATH = (id: string) => `/v1/games/stardewvalley/mods/${id}.json`;

const logger = new Logger(ProcessorType.MAIN, "nexus-mod");
const queryNexusMetadata: MainHandlerV2<Promise<ModData[]>, ModData[]> = (store, data) => {
  const apikey = store.secrets.get("nexusModsApiKey");
  if (!apikey) {
    logger.warn(`cannot query because missing apikey`);
    return undefined;
  }

  if (!data.value) {
    logger.warn(`cannot query because event data is missing`);
    return undefined;
  }

  const promises = data.value.map(async mod => {
    const key = mod.manifest.updater.find(u => u.key.toLowerCase() === "nexus");
    if (!key) return mod;

    const request = new Request(NEXUS_MOD_API_URL, NEXUS_MOD_METADATA_PATH(key.id));
    const response = await request.setHeader("apikey", apikey).request<Header, Metadata>();
    const newMod = Object.assign({}, mod);

    newMod.status.isLatest = mod.manifest.version === response.json.version;
    newMod.server = {
      version: response.json.version,
    };

    return newMod;
  });

  return Promise.all(promises);
};

export { queryNexusMetadata };
