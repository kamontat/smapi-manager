<div class="footer">
  <!-- https://github.com/sveltejs/svelte/issues/4546 -->
  {#if false}
    <slot />
  {/if}

  <div class="left">
    <slot name="left" />
  </div>
  <div class="right">
    <slot name="right" />
  </div>
</div>

<style lang="scss">
  @import "../../scss/variables.scss";
  .footer {
    grid-column: 1 / 13;

    display: flex;
    align-items: center;

    border-top-width: $xs;
    border-top-color: var(--line-color);

    margin-top: $md;
    padding-top: $md;

    .left {
      display: flex;
    }

    .right {
      display: flex;
      flex-grow: 1;
      justify-content: flex-end;
    }
  }
</style>
