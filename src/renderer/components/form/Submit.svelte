<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let text: string;
  export const click = () => dispatch("click");
</script>

<button type="button" on:click={click}>{text}</button>

<style lang="scss">
  @import "../../scss/variables.scss";

  button {
    margin-left: $md;
    margin-right: $md;

    &:hover {
      text-decoration: underline;
    }
  }
</style>
