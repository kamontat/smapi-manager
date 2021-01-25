import { DEBUG, Global, WARN } from "@common/logger";
import { isDevelopment } from "@common/utils/env";

import App from "./App.svelte";

Global.setLevel(isDevelopment() ? DEBUG : WARN);

const app = new App({
  target: document.getElementById("root"),
});

export default app;
