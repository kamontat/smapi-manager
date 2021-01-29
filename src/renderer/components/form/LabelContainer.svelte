<div class="label-container">
  <slot>
    <span name="empty" />
  </slot>
</div>

<style lang="scss">
  @import "../../scss/variables.scss";
  @import "../../scss/breakdowns.scss";

  .label-container {
    grid-column-start: 1;
    place-self: center stretch;

    display: flex;
    justify-content: flex-start;

    @include when-sm {
      grid-column-end: span 4;
    }

    @include when-md {
      grid-column-end: span 5;
    }
  }
</style>
