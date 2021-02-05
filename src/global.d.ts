import type { apiName, RendererAPIs } from "@common/communication";

declare global {
  interface Window {
    [apiName]: RendererAPIs;
  }
}
