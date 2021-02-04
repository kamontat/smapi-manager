<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import BottomTooltip from "@components/BottomTooltip.svelte";
  import { onTooltip } from "@states/tooltip";

  export let size: "sm" | "md" | "lg";
  export let tooltip: string = "";
  export let disabledTooltip: boolean = tooltip === "";

  let width: number = 24;
  let height: number = 24;

  const dispatch = createEventDispatcher();
  let click = () => dispatch("click");
</script>

<div
  class={size}
  on:click={click}
  use:onTooltip={{
    context: BottomTooltip,
    text: tooltip,
    disabled: disabledTooltip,
    props: { bottom: -36, shift: -30 },
  }}
>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}">
    <slot />
  </svg>
</div>

<style lang="scss">
  @import "../scss/variables.scss";

  svg {
    width: 100%;
    height: 100%;
  }

  div {
    position: relative;

    height: var(--dynamic-size);
    width: var(--dynamic-size);

    cursor: pointer;

    margin: $sm;
  }

  .sm {
    --dynamic-size: 18px;
  }

  .md {
    --dynamic-size: 24px;
  }

  .lg {
    --dynamic-size: 28px;
  }
</style>
