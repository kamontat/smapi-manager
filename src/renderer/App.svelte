<script lang="ts">
  import Notification from "@components/Notification.svelte";
  import ComponentSwitch from "@components/ComponentSwitch.svelte";

  import { currentPage } from "@states/pages";
  import i18n from "@states/lang";

  $: {
    document.cookie = `pageName=${$currentPage.props.pageName}`;
    document.documentElement.setAttribute("lang", $i18n);
    document.documentElement.setAttribute("theme", "light");
  }
</script>

<Notification />
<ComponentSwitch bind:page={$currentPage} />

<style global lang="scss">
  @import "./css/normalize";
  @import "./css/variables";

  @import "./scss/global.scss";
</style>
