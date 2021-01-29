<script lang="ts">
  import { findModDirectory, openStorage, readAllStorage, readI18nPage, writeAllStorage } from "@common/communication";
  import type { ReadI18NPage, FindModDirectory } from "@common/communication";

  import FlexContainer from "@layouts/FlexContainer.svelte";
  import Header from "@components/Header.svelte";

  import FormContainer from "@components/form/Container.svelte";
  import FormLabelContainer from "@components/form/LabelContainer.svelte";
  import FormDataContainer from "@components/form/DataContainer.svelte";
  import FormFooterContainer from "@components/form/FooterContainer.svelte";
  import FormLabel from "@components/form/Label.svelte";
  import FormInput from "@components/form/Input.svelte";
  import FormButton from "@components/form/Button.svelte";

  import i18n from "@states/lang";
  import mode from "@states/mode";

  export let pageName: string;
  $: baseContent = window.api.send(readI18nPage($i18n, "modSetting"));

  let directory: string = "";
  let limit: number = 0;
  let message: string = "";

  window.api.send(readAllStorage("mod")).then(v => {
    directory = v.output.directory;
    limit = v.output.recusiveLimit;
  });

  const findMods = (searchType: FindModDirectory["subtype"]) => {
    return () => {
      window.api.send(findModDirectory(searchType)).then(v => {
        directory = v.output.path;
      });
    };
  };

  const onSubmit = (content: ReadI18NPage<"modSetting">["output"]) => {
    return () => {
      window.api
        .send(
          writeAllStorage("mod", {
            directory,
            recusiveLimit: limit,
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
    window.api.send(openStorage("mod"));
  };
</script>

<Header {pageName} />

<FlexContainer>
  <FormContainer>
    {#await baseContent then content}
      <FormLabelContainer>
        <FormLabel
          on="directory"
          text={content.output.directory}
          tooltip={content.output.directoryTooltip}
          disabled={$mode.tutorial !== true}
        />
      </FormLabelContainer>
      <FormDataContainer>
        <FlexContainer full={false} column={false}>
          <FormInput name="directory" bind:value={directory} hasGroup={true} disabled={true} />
          <FormButton
            text={content.output.directoryFetch}
            tooltip={content.output.directoryFetchTooltip}
            disabled={$mode.tutorial !== true}
            hasGroup={true}
            isEnded={false}
            on:click={findMods("auto")}
          />
          <FormButton
            text={content.output.directoryCustom}
            tooltip={content.output.directoryCustomTooltip}
            disabled={$mode.tutorial !== true}
            hasGroup={true}
            isEnded={true}
            on:click={findMods("custom")}
          />
        </FlexContainer>
      </FormDataContainer>
    {/await}

    <FormFooterContainer>
      {#await baseContent then content}
        <button on:click={onOpen}>Open</button>
        <button on:click={onSubmit(content.output)}>Submit</button>
      {/await}
    </FormFooterContainer>
  </FormContainer>
  <!-- <div class="form">
    <div class="body">
      {#await baseContent then content}
        <div class="element">
          <div class="label input">
            <label
              for="directory"
              use:onTooltip={{
                context: InlineTooltip,
                disabled: $mode.tutorial !== true,
                text: content.output.directoryTooltip,
              }}>{content.output.directory}</label
            >
          </div>
          <div class="input-container">
            <input name="directory" type="text" disabled={true} bind:value={directory} />
            <button
              class="middle relative"
              use:onTooltip={{
                context: TopTooltip,
                text: content.output.directoryFetchTooltip,
                props: { top: -30, left: -50, right: -50 },
                disabled: $mode.tutorial !== true,
              }}>{content.output.directoryFetch}</button
            >
            <button
              class="end"
              use:onTooltip={{
                context: TopTooltip,
                text: content.output.directoryCustomTooltip,
                props: { top: -30, left: -50, right: -50 },
                disabled: $mode.tutorial !== true,
              }}>{content.output.directoryCustom}</button
            >
          </div>
        </div>
        <div class="element">
          <div class="label input">
            <label
              for="limit"
              use:onTooltip={{
                context: InlineTooltip,
                disabled: $mode.tutorial !== true,
                text: content.output.limitTooltip,
              }}>{content.output.limit}</label
            >
          </div>
          <input name="limit" type="number" bind:value={limit} />
        </div>
      {/await}
    </div>
    <div class="footer">
      {#await baseContent then content}
        <button name="open" type="button" on:click={onOpen}>
          {content.output.openButton}
        </button>

        <button name="submit" type="button" on:click={onSubmit(content.output)}>
          {message ? message : content.output.submitButton}
        </button>
      {/await}
    </div>
  </div> -->
</FlexContainer>
