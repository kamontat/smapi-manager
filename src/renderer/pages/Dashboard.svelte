<script lang="ts">
  import { onMount } from "svelte";

  import { readAllStorage, readI18nPage, readStorage } from "@common/communication";

  import CenterContainer from "@layouts/CenterContainer.svelte";

  import { updateMode } from "@states/mode";
  import i18n, { setLang } from "@states/lang";
  import pages, { openPage } from "@states/pages";
  import type { PageKey } from "@states/pages";
  import Header from "@components/Header.svelte";

  export let pageName: string;

  let pageNames: PageKey[] = (Object.keys(pages) as PageKey[]).filter(name => name !== pageName.toLowerCase());

  const baseContent = window.api.send(readI18nPage($i18n, "dashboard"));

  onMount(() => {
    window.api.send(readStorage("settings", "language")).then(l => setLang(l.output));
    window.api.send(readAllStorage("settings")).then(m => {
      updateMode("debug", m.output.debugMode);
      updateMode("beta", m.output.betaMode);
      updateMode("tutorial", m.output.tutorialMode);
    });
  });

  const prefix = "<|";
  const suffix = "|>";
</script>

<Header {pageName}>
  <div slot="left" />
  <div slot="right" />
</Header>

<div class="container">
  {#await baseContent then content}
    {#each pageNames as page (page)}
      <div class="card bounce" on:click={() => openPage(page)}>
        <CenterContainer>
          <span class="left">{prefix}</span>
          <span>
            {content.output[page] ? content.output[page] : pages[page].props.pageName}
          </span>
          <span class="right">{suffix}</span>
        </CenterContainer>
      </div>
    {/each}
  {/await}
</div>

<style lang="scss">
  @import "../scss/variables.scss";
  @import "../scss/breakdowns.scss";

  div.container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));

    column-gap: $lg;
    row-gap: $xl;
  }

  div.card {
    min-height: 180px;
    max-height: 250px;

    color: var(--font-color);
    background-color: var(--bg-color);

    border-radius: $md;

    box-shadow: $shadow-sm;

    cursor: pointer;

    transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;

    &:hover {
      box-shadow: $shadow-lg;
      transform: translateY(-$xs) scaleX(1.05) scaleY(1.05);
    }

    span {
      font-size: $font-lg;
      font-weight: bold;
      font-family: var(--font-mono);
    }
  }

  .bounce {
    &:hover {
      .left {
        animation: bounce-left 1s infinite;
        @keyframes bounce-left {
          0%,
          100% {
            transform: translateX(-25%);
            animationtimingfunction: cubic-bezier(0.8, 0, 1, 1);
          }
          50% {
            transform: translateX(0);
            animationtimingfunction: cubic-bezier(0, 0, 0.2, 1);
          }
        }
      }

      .right {
        animation: bounce-right 1s infinite;
        @keyframes bounce-right {
          0%,
          100% {
            transform: translateX(25%);
            animationtimingfunction: cubic-bezier(0.8, 0, 1, 1);
          }
          50% {
            transform: translateX(0);
            animationtimingfunction: cubic-bezier(0, 0, 0.2, 1);
          }
        }
      }
    }
  }
</style>
