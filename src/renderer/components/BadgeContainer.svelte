<script lang="ts">
  export let center: boolean = false;
</script>

<div class:center>
  <slot />
</div>

<style lang="scss">
  @import "../scss/variables.scss";

  div {
    display: flex;
    margin-top: $sm;
    margin-bottom: $sm;
  }

  .center {
    justify-content: center;
  }
</style>
