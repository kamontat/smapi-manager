<script lang="ts">
  import type { Status } from "@common/application";

  import { readable } from "svelte/store";
  import { status } from "@common/application";
  import { fetchAppStatus, openExternalLink, readFullInfo, readI18nPage } from "@common/communication";

  import Header from "@components/Header.svelte";

  import i18n from "@states/lang";
  import { showError } from "@states/notification";

  export let pageName: string;

  const appStatus = readable<Status>(status(), set => {
    window.api.send(fetchAppStatus(true)).then(v => {
      if (v.error) showError(v.error, { showTime: -1 });
      else set(v.output);
    });
  });

  const content = window.api.send(readI18nPage($i18n, "appInfo"));
  const info = window.api.send(readFullInfo());

  const onOpenDownload = () => {
    if ($appStatus?.data?.download) window.api.send(openExternalLink($appStatus?.data?.download));
  };
</script>

<Header {pageName} />

<div class="container">
  <div class="header">
    {#await content then data}
      <div>
        <h1 class="title">{data.output.title}</h1>
        <h2 class="subtitle">{data.output.description}</h2>
      </div>
      <div class="right">
        <button class:clickable={$appStatus.data.version !== undefined} on:click={onOpenDownload}
          >{$appStatus.string}</button
        >
      </div>
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

    max-height: 90%; /* reduce 10% for margin and header */

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
    display: grid;
    grid-template-columns: auto 25%;

    padding-left: $lg;
    padding-right: $lg;

    padding-top: $lg;
    padding-bottom: $md;

    .right {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

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

  button {
    cursor: default;

    &.clickable {
      cursor: pointer;
    }
  }
</style>
