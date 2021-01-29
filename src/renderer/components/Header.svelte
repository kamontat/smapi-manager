<script lang="ts">
  import { openDashboard } from "@states/pages";
  import i18n from "@states/lang";

  export let pageName: string;
</script>

<svelte:head>
  <meta property="og:title" content={pageName} />
  <meta property="lang" content={$i18n} />
</svelte:head>

<div name={pageName} class="container">
  <div class="left">
    <slot name="left">
      <button class="back" on:click={openDashboard}>Back</button>
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
  }

  div.right {
    display: flex;
    flex-grow: 1;

    justify-content: flex-end;
  }

  button.back {
    font-size: $font-base;
  }
</style>
