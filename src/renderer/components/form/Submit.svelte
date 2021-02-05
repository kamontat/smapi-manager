<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let text: string;
  export let disabled: boolean = false;
  export const click = () => {
    if (!disabled) dispatch("click");
  };
</script>

<button {disabled} type="button" on:click={click}>{text}</button>

<style lang="scss">
  @import "../../scss/variables.scss";

  button {
    margin-left: $md;
    margin-right: $md;

    &:hover {
      text-decoration: underline;
    }

    &:disabled {
      text-decoration: line-through;

      &:hover {
        text-decoration: line-through;
      }
    }
  }
</style>
