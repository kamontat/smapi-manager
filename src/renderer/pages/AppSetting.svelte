<script lang="ts">
  import { openStorage, readI18nPage, updateSettings } from "@common/communication";
  import type { ReadI18NPage } from "@common/communication";

  import FlexContainer from "@layouts/FlexContainer.svelte";
  import Header from "@components/Header.svelte";
  import Switch from "@components/Switch.svelte";
  import InlineTooltip from "@components/InlineTooltip.svelte";

  import mode from "@states/mode";
  import i18n from "@states/lang";
  import { onTooltip } from "@states/tooltip";

  export let pageName: string;

  $: baseContent = window.api.send(readI18nPage($i18n, "appSetting"));

  let message: string = "";

  const onSubmit = (content: ReadI18NPage<"appSetting">["output"]) => {
    return () => {
      window.api
        .send(
          updateSettings({
            tutorialMode: $mode.tutorial,
            debugMode: $mode.debug,
            betaMode: $mode.beta,
            language: $i18n,
          })
        )
        .then(() => {
          message = content.submitMessage;
          setTimeout(() => {
            message = content.submitButton;
          }, 400);
        });
    };
  };

  const onOpen = () => {
    window.api.send(openStorage("settings"));
  };
</script>

<Header {pageName} />

<FlexContainer>
  <div class="form">
    <div class="input-container">
      {#await baseContent then content}
        <div class="element">
          <div class="label toggle">
            <label
              for="languages"
              use:onTooltip={{
                context: InlineTooltip,
                text: content.output.languageTooltip,
                disabled: $mode.tutorial !== true,
              }}>{content.output.languageSwitch}</label
            >
          </div>
          <select bind:value={$i18n}>
            <option value="en">English</option>
            <option value="th">Thai</option>
          </select>
        </div>
        <div class="element">
          <div class="label toggle">
            <label
              for="debug-mode"
              use:onTooltip={{
                context: InlineTooltip,
                text: content.output.debugTooltip,
                disabled: $mode.tutorial !== true,
              }}>{content.output.debugMode}</label
            >
          </div>
          <Switch name="debug-mode" bind:checked={$mode.debug} rounded={true} />
        </div>
        <div class="element">
          <div class="label toggle">
            <label
              for="beta-mode"
              use:onTooltip={{
                context: InlineTooltip,
                text: content.output.betaTooltip,
                disabled: $mode.tutorial !== true,
              }}>{content.output.betaMode}</label
            >
          </div>
          <Switch name="beta-mode" bind:checked={$mode.beta} rounded={true} />
        </div>
        <div class="element">
          <div class="label toggle">
            <label
              for="tutorial-mode"
              use:onTooltip={{
                context: InlineTooltip,
                text: content.output.tutorialTooltip,
                disabled: $mode.tutorial !== true,
              }}>{content.output.tutorialMode}</label
            >
          </div>
          <Switch name="tutorial-mode" bind:checked={$mode.tutorial} rounded={true} />
        </div>
      {/await}
    </div>
    <div class="submit-container">
      {#await baseContent then content}
        <button name="open" type="button" on:click={onOpen}>
          {content.output.openButton}
        </button>

        <button name="submit" type="button" on:click={onSubmit(content.output)}>
          {message ? message : content.output.submitButton}
        </button>
      {/await}
    </div>
  </div>
</FlexContainer>

<style lang="scss">
  @import "../scss/variables.scss";

  .form {
    color: var(--font-color);
  }

  .input-container {
    border-top-left-radius: $md;
    border-top-right-radius: $md;
    background-color: var(--bg-color);

    padding: $md;

    .element {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      gap: $sm;

      padding-bottom: $md;
      padding-left: $md;
      &:nth-child(1) {
        padding-top: $md;
      }

      .label {
        grid-column-start: 1;
      }

      .toggle {
        grid-column-end: 11;
      }
    }
  }

  .submit-container {
    border-bottom-right-radius: $md;
    border-bottom-left-radius: $md;

    /* border-color: var(--bg-color); */
    background-color: var(--lighter-gray);
    text-align: right;

    button[type="button"] {
      padding: $md;
      padding-right: $lg;
    }
  }
</style>
