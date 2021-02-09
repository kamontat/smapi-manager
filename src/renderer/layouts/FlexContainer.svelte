<script lang="ts">
  export let column: boolean = true;
  export let full: boolean = true;
</script>

<div class:column class:full>
  <slot />
</div>

<style lang="scss">
  div {
    display: flex;
  }

  .column {
    flex-direction: column;
  }

  .full {
    align-items: stretch;
  }
</style>
