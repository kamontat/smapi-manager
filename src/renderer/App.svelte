<script lang="ts">
  import ErrorContainer from "@components/ErrorContainer.svelte";
  import ComponentSwitch from "@components/ComponentSwitch.svelte";

  import { currentPage } from "@states/pages";
  import i18n from "@states/lang";

  $: {
    document.documentElement.setAttribute("lang", $i18n);
    document.documentElement.setAttribute("theme", "light");
  }
</script>

<ErrorContainer />
<ComponentSwitch bind:page={$currentPage} />

<style global lang="scss">
  @import "./css/normalize";
  @import "./css/variables";

  @import "./scss/global.scss";
</style>
