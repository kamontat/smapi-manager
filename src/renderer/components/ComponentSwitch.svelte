<script lang="ts">
  import type { SvelteComponent } from "svelte";
  import type { Page } from "@states/pages";

  import { backInOut } from "svelte/easing";
  import { fade, fly } from "svelte/transition";

  import EmptyContainer from "@layouts/EmptyContainer.svelte";

  export let page: Page;
  let currentViewport: typeof SvelteComponent;

  const updateCurrentViewport = () => {
    currentViewport = page.component;
    document.title = `${page.props.pageName} | SMAPI Manager`;
  };

  updateCurrentViewport();
</script>

{#if currentViewport == page.component}
  <EmptyContainer pageName={page.props.pageName}>
    <div
      class="transition"
      on:outroend={updateCurrentViewport}
      in:fade={{ duration: 250, easing: backInOut }}
      out:fly={{ duration: 700, y: -500, easing: backInOut }}
    >
      <svelte:component this={currentViewport} {...page.props} />
    </div>
  </EmptyContainer>
{/if}

<style lang="scss">
  .transition {
    width: 100%;
    height: 100%;
  }
</style>
