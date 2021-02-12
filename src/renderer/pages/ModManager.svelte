<script lang="ts">
  import type { LanguageType } from "@common/i18n";

  import { readable, writable } from "svelte/store";

  import { fetchModData, openMod, readI18nPage, readModCollectionV2, toggleModDirectory } from "@common/communication";
  import { emptyCollectionBuilder, isModServerExtender } from "@common/mod/renderer";

  import Badge from "@components/Badge.svelte";
  import BadgeContainer from "@components/BadgeContainer.svelte";
  import Header from "@components/Header.svelte";

  import mode from "@states/mode";
  import Icon from "@components/Icon.svelte";
  import i18n from "@states/lang";
  import { showError } from "@states/notification";

  export let pageName: string;

  const collection = writable(emptyCollectionBuilder(), set => {
    window.api.send(readModCollectionV2()).then(v => set(v.output));
  });

  const content = readable<Partial<LanguageType["modManager"]>>({}, set => {
    window.api.send(readI18nPage($i18n, "modManager")).then(v => set(v.output));
  });

  const onToggleModStatus = (id: string) => {
    return () => {
      window.api.send(toggleModDirectory(id)).then(result => {
        collection.update(mods => {
          mods.mods[result.output.id] = result.output;
          return mods;
        });
      });
    };
  };

  const onOpenModDirectory = (id: string) => {
    return () => {
      window.api.send(openMod("directory", id));
    };
  };

  const onOpenModUpdater = (id: string) => {
    return () => {
      window.api.send(openMod("updater", id));
    };
  };

  const onFetchModData = (id: string) => {
    return () => {
      window.api.send(fetchModData(id)).then(data => {
        if (data.error) {
          showError(data.error, { showTime: 4000 });
        } else {
          collection.update(mods => {
            mods.mods[data.output.id] = data.output;
            return mods;
          });
        }
      });
    };
  };
</script>

<Header {pageName}>
  <small class:hidden={!$mode.debug} slot="right">Debug = {$mode.debug}, Beta = {$mode.beta}</small>
</Header>
<div class="container">
  {#each Object.entries($collection.mods) as [id, each]}
    <div class="row" name={id}>
      <div class="header">
        <small class:hidden={!$mode.debug}>{each.id}</small>

        <div class="header-right">
          <Icon
            tooltip={$content.directory}
            disabledTooltip={$mode.tutorial !== true}
            size="sm"
            on:click={onOpenModDirectory(each.id)}
          >
            <path
              d="M1.979 8l-.979-6h6.972c1.265 1.583 1.327 2 3.306 2h11.722l-.96 4h-2.04l.469-2h-9.191c-2.326 0-3.166-.612-4.278-2h-3.694l.694 4h-2.021zm22.021 2l-2 12h-20l-2-12h6.278l2.308-3 3.9 3h1.97l-1.429-1.097 1.465-1.903 3.9 3h5.608zm-2.331 2h-19.338l1.385 8h16.568l1.385-8z"
            />
          </Icon>
          {#if each.updater.provider !== "none"}
            <Icon
              tooltip={each.updater.provider}
              disabledTooltip={$mode.tutorial !== true}
              size="sm"
              on:click={onOpenModUpdater(each.id)}
            >
              <path
                d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"
              />
            </Icon>
          {/if}
        </div>
      </div>
      <div class="body">
        <h1>{each.name} <span class:hidden={!$mode.debug}>({each.version})</span></h1>
        <p>{each.description}</p>
        <BadgeContainer center={true}>
          {#if isModServerExtender(each)}
            <Badge text={each.external.category} color="purple" />
          {/if}
          <Badge
            text={each.status.visibility ? $content.shown : $content.hidden}
            color={each.status.visibility ? "green" : "red"}
            on:click={onToggleModStatus(each.id)}
          />
        </BadgeContainer>
      </div>
      <div class="footer">
        <div class="footer-right" class:hidden={!$mode.beta}>
          <button on:click={onFetchModData(each.id)}>Fetch</button>
        </div>
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

    max-height: 92%;

    overflow-x: hidden;
    overflow-y: auto;

    transition: all 1s;

    border-radius: $md;

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
        align-items: center;

        margin: $sm;

        small {
          font-size: $font-sm;
          color: var(--gray-color);
        }

        .header-right {
          display: flex;
          flex-grow: 1;
          justify-content: flex-end;
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

      .footer {
        display: flex;
        align-items: center;
        margin: $sm;

        .footer-right {
          display: flex;
          flex-grow: 1;
          justify-content: flex-end;
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
