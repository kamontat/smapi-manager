<div class="form">
  <slot />
</div>

<style lang="scss">
  @import "../../scss/variables.scss";
  @import "../../scss/breakdowns.scss";

  .form {
    display: grid;
    column-gap: $md;

    padding-top: $md;
    padding-bottom: $md;
    padding-right: $lg;
    padding-left: $lg;

    grid-template-columns: repeat(12, 1fr);

    background-color: var(--bg-color);
    color: var(--font-color);

    border-radius: 1rem;
  }
</style>
