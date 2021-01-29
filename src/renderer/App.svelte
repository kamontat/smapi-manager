<script lang="ts">
  import EmptyContainer from "@layouts/EmptyContainer.svelte";

  import { currentPage } from "@states/pages";
  import i18n from "@states/lang";

  $: {
    document.title = `${$currentPage.props.pageName} | SMAPI Manager`;
    document.documentElement.setAttribute("lang", $i18n);
    document.documentElement.setAttribute("theme", "light");
  }
</script>

<EmptyContainer pageName={$currentPage.props.pageName}>
  <svelte:component this={$currentPage.component} {...$currentPage.props} />
</EmptyContainer>

<style global lang="scss">
  @import "./css/normalize";
  @import "./css/variables";

  @import "./scss/global.scss";
</style>
