<script lang="ts">
  import { readFullInfo, readStorage } from "@common/communication";
  import type { KeyValue } from "@common/utils/array";

  import Header from "@components/Header.svelte";

  export let pageName: string;

  const promise = window.api.send(readFullInfo());
</script>

<Header {pageName} />
<div class="container">
  <div class="header">
    <h1 class="title">Application information</h1>
    <h2 class="subtitle">This shown all information relate to application</h2>
  </div>
  <div class="body">
    <dl>
      {#await promise then info}
        {#each info.output as output (output.key)}
          <div class="element">
            <span class="title">{output.key}</span>
            <span class="description">{output.value}</span>
          </div>
        {/each}
      {/await}
    </dl>
  </div>
</div>

<style lang="scss">
  @import "../scss/variables.scss";
  @import "../scss/breakdowns.scss";

  .container {
    display: flex;
    flex-direction: column;

    margin-top: $sm;
    margin-bottom: $sm;
    margin-left: $xs;
    margin-right: $xs;

    background-color: var(--bg-color);

    overflow-x: hidden;
    overflow-y: auto;

    border-radius: $md;
    box-shadow: $shadow-sm;
  }

  .header {
    padding-left: $lg;
    padding-right: $lg;

    padding-top: $lg;
    padding-bottom: $md;

    .title {
      font-size: $font-lg;
      line-height: 1rem;
      color: var(--dark-gray);
    }

    .subtitle {
      font-size: $font-base;
      line-height: 1.5rem;
      color: var(--light-gray);
    }
  }

  .body {
    color: var(--font-color);

    .element {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: $lg;

      padding-left: $sm;
      padding-right: $sm;

      padding-top: $md;
      padding-bottom: $md;

      &:nth-child(odd) {
        background-color: var(--lighter-gray);
      }

      .title {
        color: var(--dark-gray);

        margin-left: $md;
      }

      .description {
        color: var(--darker-gray);
        grid-column: span 2 / span 2;
      }
    }
  }
</style>
