<script lang="ts">
  export let hidden: boolean = false;
</script>

<div class="data-container" class:hidden>
  <slot />
</div>

<style lang="scss">
  @import "../../scss/variables.scss";
  @import "../../scss/breakdowns.scss";

  .data-container {
    grid-column-end: 13;
    place-self: center stretch;

    @include when-sm {
      grid-column-start: 5;
    }

    @include when-md {
      grid-column-start: 6;
    }
  }

  .hidden {
    display: none;
    opacity: 0;
    visibility: hidden;
  }
</style>
