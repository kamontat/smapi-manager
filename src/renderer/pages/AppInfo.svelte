<script lang="ts">
  import { readFullInfo, readI18nPage } from "@common/communication";

  import Header from "@components/Header.svelte";

  import i18n from "@states/lang";

  export let pageName: string;

  const content = window.api.send(readI18nPage($i18n, "appInfo"));
  const info = window.api.send(readFullInfo());
</script>

<Header {pageName} />
<div class="container">
  <div class="header">
    {#await content then data}
      <h1 class="title">{data.output.title}</h1>
      <h2 class="subtitle">{data.output.description}</h2>
    {/await}
  </div>
  <div class="body">
    <dl>
      {#await info then data}
        {#each data.output as output (output.key)}
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

    height: 90%; /* reduce 10% for margin and header */

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
      color: var(--primary-color);
    }

    .subtitle {
      font-size: $font-base;
      line-height: 1.5rem;
      color: var(--secondary-color);
    }
  }

  .body {
    .element {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: $lg;

      padding-left: $sm;
      padding-right: $sm;

      padding-top: $md;
      padding-bottom: $md;

      &:nth-child(odd) {
        background-color: var(--bg-color-2);
      }

      .title {
        color: var(--font-color);

        margin-left: $md;
      }

      .description {
        color: var(--font-color-2);
        grid-column: span 2 / span 2;
      }
    }
  }
</style>
