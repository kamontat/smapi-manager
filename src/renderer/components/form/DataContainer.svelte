<div class="data-container">
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
</style>
