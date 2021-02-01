<script lang="ts">
  import {
    findModDirectory,
    openStorage,
    readAllStorage,
    readI18nPage,
    writeAllStorage,
    writeStorage,
  } from "@common/communication";
  import type { ReadI18NPage, FindModDirectory } from "@common/communication";

  import FlexContainer from "@layouts/FlexContainer.svelte";
  import Header from "@components/Header.svelte";

  import FormContainer from "@components/form/Container.svelte";
  import FormLabelContainer from "@components/form/LabelContainer.svelte";
  import FormDataContainer from "@components/form/DataContainer.svelte";
  import FormFooterContainer from "@components/form/FooterContainer.svelte";
  import FormLabel from "@components/form/Label.svelte";
  import FormInput from "@components/form/Input.svelte";
  import FormRange from "@components/form/Range.svelte";
  import FormButton from "@components/form/Button.svelte";
  import FormSubmit from "@components/form/Submit.svelte";
  import FormSelect from "@components/form/Select.svelte";

  import i18n from "@states/lang";
  import mode from "@states/mode";
  import type { ModCollection } from "@common/mod";

  export let pageName: string;
  $: baseContent = window.api.send(readI18nPage($i18n, "modSetting"));

  let mod: ModCollection = { path: "", mods: [], lastUpdate: -1 };
  let limit: number = 0;
  let threshold = "";
  let message: string = "";

  window.api.send(readAllStorage("mod")).then(v => {
    mod.path = v.output.directory;
    limit = v.output.recusiveLimit;
    threshold = v.output.updateThreshold.toString();
  });

  const findMods = (searchType: FindModDirectory["subtype"]) => {
    return () => {
      window.api.send(findModDirectory(searchType)).then(v => {
        mod = v.output;
      });
    };
  };

  const onSubmit = (content: ReadI18NPage<"modSetting">["output"]) => {
    return () => {
      window.api
        .send(
          writeAllStorage("mod", {
            directory: mod.path,
            recusiveLimit: limit,
            updateThreshold: isNaN(parseInt(threshold)) ? undefined : parseInt(threshold),
          })
        )
        .then(() => window.api.send(writeStorage("caches", "modDirectories", mod)))
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
          <FormInput name="directory" bind:value={mod.path} hasGroup={true} disabled={true} />
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

      <FormLabelContainer>
        <FormLabel
          on="limit"
          text={content.output.limit}
          tooltip={content.output.limitTooltip}
          disabled={$mode.tutorial !== true}
        />
      </FormLabelContainer>
      <FormDataContainer>
        <FlexContainer column={false} full={false}>
          <FormRange name="limit" bind:value={limit} min={1} max={8} />
          <FormLabel text={limit.toString()} disabled={true} />
        </FlexContainer>
      </FormDataContainer>

      <FormLabelContainer>
        <FormLabel
          on="threshold"
          text={content.output.threshold}
          tooltip={content.output.thresholdTooltip}
          disabled={$mode.tutorial !== true}
        />
      </FormLabelContainer>
      <FormDataContainer>
        <FormSelect
          bind:value={threshold}
          values={[
            { key: "0", value: content.output.timeUnitInstant },
            { key: "60000", value: content.output.timeUnit1Minute },
            { key: "1200000", value: content.output.timeUnit20Minute },
            { key: "3600000", value: content.output.timeUnit1Hour },
            { key: "86400000", value: content.output.timeUnit1Day },
            { key: "604800000", value: content.output.timeUnit1Week },
            { key: "3153600000000", value: content.output.timeUnitForever },
          ]}
        />
      </FormDataContainer>

      <FormFooterContainer>
        <FormSubmit text={content.output.openButton} on:click={onOpen} />
        <FormSubmit text={message ? message : content.output.submitButton} on:click={onSubmit(content.output)} />
      </FormFooterContainer>
    {/await}
  </FormContainer>
</FlexContainer>
