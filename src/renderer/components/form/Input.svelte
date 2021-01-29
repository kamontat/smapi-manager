<script lang="ts">
  export let name: string;
  export const type: string = "text";
  export let value: string;

  export let placeholder: string = "";
  export let disabled: boolean = false;
  export let hasGroup: boolean = false;
</script>

<input id={name} {type} {name} {value} {placeholder} {disabled} class:hasGroup />

<style lang="scss">
  @import "../../scss/variables.scss";

  input {
    display: block;
    flex-grow: 1;

    width: 100%;

    border-width: $xs;
    border-color: var(--light-gray);

    padding-left: $sm;
    padding-top: $xs;
    padding-bottom: $xs;

    border-radius: $md;
  }

  .hasGroup {
    border-radius: unset;
    border-top-left-radius: $md;
    border-bottom-left-radius: $md;
  }
</style>
