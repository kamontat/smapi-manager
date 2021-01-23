import { DEBUG, Global, WARN } from "@common/logger";
import { isDevelopment } from "@common/utils/env";

import App from "../renderer/sveltes/App.svelte";

Global.setLevel(isDevelopment() ? DEBUG : WARN);

const app = new App({
  target: document.body,
  props: {
    name: "world",
  },
});

export default app;
