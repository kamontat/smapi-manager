<script lang="ts">
  import Tooltip from "@components/InlineTooltip.svelte";
  import { onTooltip } from "@states/tooltip";

  export let on: string;
  export let text: string;

  export let tooltip: string = "";
  export let disabled: boolean = tooltip !== undefined || tooltip !== "";
</script>

<label for={on} use:onTooltip={{ context: Tooltip, disabled, text: tooltip }}>{text}</label>

<style lang="scss">
  @import "../../scss/variables.scss";

  label {
    position: relative;

    padding-top: $md;
    padding-bottom: $md;
  }
</style>
