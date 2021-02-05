<script lang="ts">
  import { currentPage } from "@states/pages";

  export let pageName: string = "";
  let cssVariable: string;

  $: cssVariable = [
    { name: "bg-direction", value: $currentPage.background.direction },
    { name: "bg-color-from", value: $currentPage.background.colorFrom },
    { name: "bg-color-via", value: $currentPage.background.colorVia },
    { name: "bg-color-to", value: $currentPage.background.colorTo },
  ]
    .filter(v => !!v.value)
    .map(v => `--${v.name}: ${v.value};`)
    .join("");
</script>

<div name={pageName} class="container" style={cssVariable}>
  <slot />
</div>

<style lang="scss">
  @import "../scss/variables.scss";

  $from: var(--bg-color-from);
  $via: var(--bg-color-via) !default;
  $to: var(--bg-color-to);

  .container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    padding: $lg;

    @if variable-exists($via) {
      background-image: linear-gradient(to var(--bg-direction), $from, $via, $to);
    } @else {
      background-image: linear-gradient(to var(--bg-direction), $from, $to);
    }
  }
</style>
