<script lang="ts">
  import { readStorage, writeStorage, readI18n } from "@common/communication";

  import Header from "@components/Header.svelte";
  export let pageName: string;

  let lang: string = "en";
  let key: string = "mode.debug";

  const debug = window.api.send(readStorage("settings", "version"));
</script>

<Header {pageName}>
  <div slot="right">test</div>
</Header>

<input bind:value={lang} />
<input bind:value={key} />
<button on:click={() => window.api.send(readI18n(lang, key)).then(v => console.log(v))}>Submit</button>

{#await debug then obj}
  <p>the value is {obj.input} = {obj.output} ({JSON.stringify(obj)})</p>
{/await}
