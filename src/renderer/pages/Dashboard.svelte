<script lang="ts">
  import pages, { openPage } from "@states/pages";
  import type { PageKey } from "@states/pages";

  export let pageName: string;

  let pageNames: PageKey[] = (Object.keys(pages) as PageKey[]).filter(name => name !== "dashboard");
</script>

<div name={pageName}>
  {#each pageNames as page (page)}
    <button on:click={() => openPage(page)}>{pages[page].props.pageName}</button>
  {/each}
</div>

<!-- h-full p-4
  grid grid-cols-5 grid-rows-3 gap-x-8 gap-y-4 grid-cols-3
  bg-gradient-to-br from-yellow-500 via-green-500 to-blue-500 -->
<style lang="scss">
  @import "../styles/variables.scss";
  @import "../styles/breakdowns.scss";

  $col: 3;
  $row: 3;

  $bg-from: #f59e0b;
  $bg-via: #10b981;
  $bg-to: #3b82f6;

  div {
    height: 100%;
    padding: $md;

    display: grid;
    grid-template-columns: repeat($col, minmax(0, 1fr));
    grid-template-rows: repeat($row, minmax(0, 1fr));
    column-gap: $lg;
    row-gap: $md;

    background-image: linear-gradient(to bottom right, $bg-from, $bg-via, $bg-to);
  }

  @include when-md {
    div {
      $col: 5;
      $row: 3;

      grid-template-columns: repeat($col, minmax(0, 1fr));
      grid-template-rows: repeat($row, minmax(0, 1fr));
    }
  }
</style>
