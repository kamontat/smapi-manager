<script lang="ts">
  import Container from "@layouts/Container.svelte";
  import { currentPage } from "@states/pages";
  import type { Page } from "@states/pages";

  let page: Page;

  $: {
    document.title = `${page.props.pageName} | SMAPI Manager`;
  }

  currentPage.subscribe(p => {
    page = p;
  });
</script>

<Container>
  <svelte:component this={page.component} {...page.props} />
</Container>

<style global lang="scss">
  @import "./styles/normalize";
  @import "./styles/variables";

  @import "./styles/global.scss";
</style>
