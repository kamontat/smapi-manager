<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import TopTooltip from "@components/TopTooltip.svelte";

  import { onTooltip } from "@states/tooltip";

  const dispatch = createEventDispatcher();

  export let text: string;
  export let hasGroup: boolean = false;
  export let isEnded: boolean = false;
  export let tooltip: string = "";
  export let disabled: boolean = tooltip === "";

  const click = () => dispatch("click");
</script>

<button
  type="button"
  class:hasGroup
  class:isEnded
  on:click={click}
  use:onTooltip={{ context: TopTooltip, text: tooltip, disabled, props: { top: -35, right: -100, left: -100 } }}
  >{text}</button
>

<style lang="scss">
  @import "../../scss/variables.scss";

  button {
    position: relative;
    padding-left: $md;
    padding-right: $md;

    border-width: $xs;
    border-color: var(--light-gray);
    border-radius: $md;

    &:hover {
      background-color: var(--lighter-gray);
    }
  }

  .hasGroup {
    border-radius: unset;
    border-left-width: 0;
    border-right-width: 0;
  }

  .isEnded {
    border-top-right-radius: $md;
    border-bottom-right-radius: $md;

    border-left-width: $xs;
    border-right-width: $xs;
  }
</style>
