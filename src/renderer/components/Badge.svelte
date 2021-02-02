<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import { onTooltip } from "@states/tooltip";
  import BottomTooltip from "./BottomTooltip.svelte";

  type Color = "red" | "green" | "blue" | "purple" | "yellow" | "gray" | "pink";

  const dispatch = createEventDispatcher();

  export let text: string;
  export let color: Color;
  export let tooltip: string = "";
  export let disabledTooltip: boolean = tooltip === "";
  export let click = () => dispatch("click");
</script>

<span
  class="badge {color}"
  on:click={click}
  use:onTooltip={{
    context: BottomTooltip,
    text: tooltip,
    disabled: disabledTooltip,
    props: { bottom: -32, shift: -50 },
  }}
>
  {text}
</span>

<style lang="scss">
  @import "../scss/variables.scss";

  $red: hsla(0, 55%, 90%, 1);
  $dark-red: hsla(0, 60%, 50%, 1);

  $green: hsla(100, 55%, 90%, 1);
  $dark-green: hsla(100, 60%, 50%, 1);

  $blue: hsla(235, 55%, 90%, 1);
  $dark-blue: hsla(235, 60%, 50%, 1);

  $pink: hsla(311, 55%, 90%, 1);
  $dark-pink: hsla(311, 60%, 50%, 1);

  $purple: hsla(275, 55%, 90%, 1);
  $dark-purple: hsla(275, 60%, 50%, 1);

  $yellow: hsla(62, 55%, 90%, 1);
  $dark-yellow: hsla(62, 60%, 50%, 1);

  $gray: hsla(0, 0%, 75%, 1);
  $dark-gray: hsla(0, 0%, 40%, 1);

  .red {
    background-color: $red;
    color: $dark-red;
  }

  .green {
    background-color: $green;
    color: $dark-green;
  }

  .blue {
    background-color: $blue;
    color: $dark-blue;
  }

  .pink {
    background-color: $pink;
    color: $dark-pink;
  }

  .purple {
    background-color: $purple;
    color: $dark-purple;
  }

  .yellow {
    background-color: $yellow;
    color: $dark-yellow;
  }

  .gray {
    background-color: $gray;
    color: $dark-gray;
  }

  .badge {
    position: relative;

    font-size: $font-sm;
    font-family: var(--font-mono);

    padding-top: $xs;
    padding-bottom: $xs;
    padding-left: $md;
    padding-right: $md;

    border-radius: $md;

    margin-left: $md;
    margin-right: $md;

    cursor: pointer;
  }
</style>
