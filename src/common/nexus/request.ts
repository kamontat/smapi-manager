import { Request } from "@common/request";
import type { Response } from "@common/request/model";

import type ValidatedResponse from "./models/validate";
import type MetadataResponse from "./models/metadata";
import type InformationResponse from "./models/information";

const NEXUS_MOD_API_URL = "api.nexusmods.com";
const apis = {
  validate: () => "/v1/users/validate.json",
  metadata: (id: string) => `/v1/games/stardewvalley/mods/${id}.json`,
  information: () => "/v1/games/stardewvalley.json",
};

class NexusRequester {
  private baseUrl: string;
  private apikey: string;

  constructor(apikey: string) {
    this.baseUrl = NEXUS_MOD_API_URL;
    this.apikey = apikey;
  }

  request<R extends Response<number>>(path: string): Promise<R> {
    return new Request(this.baseUrl, path).setHeader("apikey", this.apikey).request<R>();
  }

  verifyUser(): Promise<ValidatedResponse> {
    return this.request(apis.validate());
  }

  getModMetadata(id: string): Promise<MetadataResponse> {
    return this.request(apis.metadata(id));
  }

  getInformation(): Promise<InformationResponse> {
    return this.request(apis.information());
  }
}

export default NexusRequester;
