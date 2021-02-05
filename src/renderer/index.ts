// import { readAppInfo } from "@common/communication";
// import { Global } from "@common/logger";

import App from "./App.svelte";

// window.api.send(readAppInfo()).then(v => Global.byEnvironment(v.output.env));

const app = new App({
  target: document.getElementById("root"),
});

export default app;
