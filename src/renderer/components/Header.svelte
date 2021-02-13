<script lang="ts">
  import { openDashboard } from "@states/pages";
  import i18n from "@states/lang";
  import Icon from "./Icon.svelte";

  export let pageName: string;
</script>

<svelte:head>
  <meta property="og:title" content={pageName} />
  <meta property="lang" content={$i18n} />
</svelte:head>

<div class="container">
  <!-- Remove this line after svelte fix default slot warning message -->
  {#if false}
    <slot />
  {/if}
  <div class="left">
    <slot name="left">
      <Icon on:click={openDashboard} fill="var(--font-color)" size="md">
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      </Icon>
    </slot>
  </div>
  <div class="right">
    <slot name="right" />
  </div>
</div>

<style lang="scss">
  @import "../scss/variables.scss";

  div.container {
    display: flex;
    align-items: center;

    padding-bottom: $lg;
    margin-bottom: $md;
  }

  div.right {
    display: flex;
    flex-grow: 1;

    justify-content: flex-end;
  }
</style>
