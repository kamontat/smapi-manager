<script lang="ts">
  export let name: string;
  export let value: number;

  export let placeholder: string = "";
  export let disabled: boolean = false;

  export let min: number = 0;
  export let max: number = 100;
  export let step: number = 1;
</script>

<input id={name} type="range" {name} bind:value {min} {max} {step} {placeholder} {disabled} />

<style lang="scss">
  @import "../../scss/variables.scss";

  input {
    display: block;
    flex-grow: 1;
    width: 100%;

    margin-right: $md;
  }
</style>
