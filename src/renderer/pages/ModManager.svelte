<script lang="ts">
  import { writable } from "svelte/store";

  import { openExternalLink, readModCollection, toggleModDirectory } from "@common/communication";
  import type { ModCollection, ModData } from "@common/mod";

  import Badge from "@components/Badge.svelte";
  import BadgeContainer from "@components/BadgeContainer.svelte";
  import Header from "@components/Header.svelte";

  import mode from "@states/mode";
  import Icon from "@components/Icon.svelte";

  export let pageName: string;

  const collection = writable({ path: "", mods: [], lastUpdate: -1 } as ModCollection, set => {
    window.api.send(readModCollection(true)).then(v => set(v.output));
  });

  const onToggleModStatus = (mod: ModData) => {
    return () => {
      window.api.send(toggleModDirectory(mod)).then(result => {
        collection.update(mods => {
          const newCollection = Object.assign({}, mods);
          const index = newCollection.mods.findIndex(mod => mod.id === result.output.id);
          newCollection.mods[index] = result.output;

          return newCollection;
        });
      });
    };
  };

  const onOpenExternalLink = (updater: ModData["manifest"]["updater"][0]) => {
    return () => {
      window.api.send(openExternalLink(updater.url));
    };
  };
</script>

<Header {pageName}>
  <small class:hidden={!$mode.debug} slot="right">Debug = {$mode.debug}, Beta = {$mode.beta}</small>
</Header>
<div class="container">
  {#each $collection.mods as each}
    <div class="row">
      <div class="header">
        <small class:hidden={!$mode.debug}>{each.id}</small>
        {#if each.manifest.updater.find(u => u.url !== "")}
          <Icon
            tooltip={each.manifest.updater.find(u => u.url !== "").key}
            disabledTooltip={$mode.tutorial !== true}
            size="sm"
            on:click={onOpenExternalLink(each.manifest.updater.find(u => u.url !== ""))}
          >
            <path
              d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"
            />
          </Icon>
        {/if}
      </div>
      <div class="body">
        <h1>{each.manifest.name} <span class:hidden={!$mode.debug}>({each.manifest.version})</span></h1>
        <p>{each.manifest.description}</p>
        <BadgeContainer center={true}>
          <Badge
            text={each.status.isHidden ? "Hidden" : "Shown"}
            color={each.status.isHidden ? "red" : "green"}
            on:click={onToggleModStatus(each)}
          />
        </BadgeContainer>
      </div>
      <div class="footer">
        <p>footer</p>
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
  @import "../scss/variables.scss";
  @import "../scss/breakdowns.scss";

  .container {
    display: grid;
    gap: $md;

    height: 100%;

    overflow-x: hidden;
    overflow-y: auto;

    transition: all 1s;

    padding-top: $md;

    @include when-sm {
      grid-template-columns: repeat(1, minmax(200px, 1fr));
      grid-auto-rows: 200px;
    }
    @include when-md {
      grid-template-columns: repeat(2, minmax(200px, 1fr));
      grid-auto-rows: 220px;
    }
    @include when-lg {
      grid-template-columns: repeat(3, minmax(200px, 1fr));
      grid-auto-rows: 240px;
    }

    .row {
      display: grid;
      grid-template-rows: 15% auto 15%;
      grid-row-gap: $sm;

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

      padding-right: $md;
      padding-left: $md;
      padding-top: $sm;
      padding-bottom: $sm;

      .header {
        display: flex;
        justify-content: space-between;

        margin: $sm;

        small {
          font-size: $font-sm;
          color: var(--light-gray);
        }
      }

      .body {
        display: flex;
        flex-direction: column;

        h1 {
          text-align: center;
          font-size: $font-lg;
          font-weight: bold;
          font-family: var(--font-mono);
        }

        p {
          text-align: center;
          font-size: $font-base;
        }
      }
    }
  }

  .hidden {
    display: none;
    opacity: 0;
    visibility: hidden;
  }
</style>
