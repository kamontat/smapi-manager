<script lang="ts">
  import type { Validity } from "@states/validate";
  import type { UseAction } from "@states/models/UseAction";

  export let name: string;
  export let value: string;

  export let placeholder: string = "";
  export let disabled: boolean = false;
  export let hasGroup: boolean = false;

  export let validate: UseAction<string> = () => ({});
  export let validity: Validity = { valid: true };
</script>

<input
  id={name}
  type="text"
  {name}
  bind:value
  use:validate={value.toString()}
  {placeholder}
  {disabled}
  class:invalid={!validity.valid}
  class:hasGroup
/>

<style lang="scss">
  @import "../../scss/variables.scss";

  input {
    display: block;
    flex-grow: 1;
    width: 100%;

    border-width: $xs;
    border-color: var(--border-color);

    padding-left: $sm;
    padding-top: $xs;
    padding-bottom: $xs;

    border-radius: $md;

    &:disabled {
      background-color: var(--light-gray-color);
    }
  }

  .invalid {
    border-color: red;
  }

  .hasGroup {
    border-radius: unset;
    border-top-left-radius: $md;
    border-bottom-left-radius: $md;

    border-right-width: 0;
  }
</style>
