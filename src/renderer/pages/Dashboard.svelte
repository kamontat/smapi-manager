<script lang="ts">
  import { onMount } from "svelte";
  import { readAllStorage, readI18nPage, readStorage } from "@common/communication";

  import CenterContainer from "@layouts/CenterContainer.svelte";
  import { updateMode } from "@states/mode";
  import i18n, { setLang } from "@states/lang";
  import pages, { openPage } from "@states/pages";
  import type { PageKey } from "@states/pages";

  export let pageName: string;

  let pageNames: PageKey[] = (Object.keys(pages) as PageKey[]).filter(name => name !== "dashboard");

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

<div class="container" name={pageName}>
  {#await baseContent then content}
    {#each pageNames as page (page)}
      <div class="card bounce" on:click={() => openPage(page)}>
        <CenterContainer>
          <span class="left">{prefix}</span>
          <span>
            {content.output[page]}
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
    --grid-col: 2;
    --grid-row: 4;

    height: 100%;

    display: grid;
    grid-template-columns: repeat(var(--grid-col), minmax(0, 1fr));
    grid-template-rows: repeat(var(--grid-row), minmax(0, 1fr));
    column-gap: $lg;
    row-gap: $xl;

    @include when-md {
      --grid-col: 3;
      --grid-row: 3;
    }

    @include when-lg {
      --grid-col: 5;
      --grid-row: 2;
    }
  }

  div.card {
    width: 100%;
    height: 100%;
    max-height: 25vw;

    color: var(--font-color);
    background-color: var(--bg-color);

    // border: $xs solid;
    // border-color: rgba(229, 231, 235, 0.75);
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
