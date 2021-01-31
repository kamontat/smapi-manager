<script lang="ts">
  import { readModCollection } from "@common/communication";

  import Header from "@components/Header.svelte";
  export let pageName: string;

  const mods = window.api.send(readModCollection(true));
</script>

<Header {pageName} />
<div class="container">
  {#await mods}
    <!-- promise is pending -->
    <div />
  {:then mod}
    <!-- promise was fulfilled -->
    <div class="row">
      <p>The value is {mod.output.path}</p>
    </div>
  {:catch error}
    <!-- promise was rejected -->
    <p>Something went wrong: {error.message}</p>
  {/await}
</div>

<style lang="scss">
  @import "../scss/variables.scss";

  .container {
    display: flex;
    flex-direction: column;
    align-items: stretch;

    overflow-x: hidden;
    overflow-y: auto;

    .row {
      background-color: var(--bg-color);
      color: var(--font-color);

      border-radius: $md;
      box-shadow: $shadow-sm;

      transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 300ms;

      &:hover {
        box-shadow: $shadow-lg;
        transform: translateY(-$xs);
      }

      margin-top: $sm;
      margin-bottom: $sm;

      padding-right: $md;
      padding-left: $md;
      padding-top: $sm;
      padding-bottom: $sm;
    }
  }
</style>
