import type { Response } from "@common/request";
import type Header from "./header";

interface ReleaseAsset {
  id: number;
  node_id: string;

  name: string;
  size: number;
  updated_at: string;

  browser_download_url: string;
}

interface LatestRelease {
  id: number;
  node_id: string;

  html_url: string;

  assets: ReleaseAsset[];

  tag_name: string;
  prerelease: boolean;
}

type SuccessResponse = Response<200, Header, LatestRelease>;
type LatestReleaseResponse = SuccessResponse;

export default LatestReleaseResponse;
