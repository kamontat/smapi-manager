import { Request, Response } from "@common/request";
import { GH_API_HOSTNAME, GH_API_LATEST_RELEASE } from "../constants/url";

import type LatestReleaseResponse from "../models/latest-release";

class GHRequester {
  private baseUrl: string;

  constructor() {
    this.baseUrl = GH_API_HOSTNAME;
  }

  private request<R extends Response<number>>(path: string): Promise<R> {
    return new Request(this.baseUrl, path).request<R>();
  }

  getLatestRelease(): Promise<LatestReleaseResponse> {
    return this.request(GH_API_LATEST_RELEASE);
  }
}

export default GHRequester;
