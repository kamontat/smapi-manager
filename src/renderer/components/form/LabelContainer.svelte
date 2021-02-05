<script lang="ts">
  export let hidden: boolean = false;
</script>

<div class="label-container" class:hidden>
  <slot>
    <span class="empty" />
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

    padding-top: $md;
    padding-bottom: $md;

    @include when-sm {
      grid-column-end: span 4;
    }

    @include when-md {
      grid-column-end: span 5;
    }

    .empty {
      padding-top: $sm;
      padding-bottom: $md;
    }
  }

  .hidden {
    display: none;
    opacity: 0;
    visibility: hidden;
  }
</style>
