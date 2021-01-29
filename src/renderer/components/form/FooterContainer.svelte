<div class="footer">
  <slot />
</div>

<style lang="scss">
  @import "../../scss/variables.scss";
  .footer {
    grid-column: 1 / 13;

    display: flex;
    justify-content: flex-end;

    border-top-width: $xs;
    border-top-color: var(--dark-gray);

    margin-top: $md;
    padding-top: $md;
  }
</style>
