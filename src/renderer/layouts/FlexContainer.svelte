<script lang="ts">
  export let column: boolean = true;
  export let full: boolean = true;
</script>

<div class="flex" class:column class:full>
  <slot />
</div>

<style lang="scss">
  .flex {
    display: flex;
  }

  .column {
    flex-direction: column;
  }

  .full {
    align-items: stretch;
  }
</style>
