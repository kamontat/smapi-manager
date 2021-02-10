<script lang="ts">
  import {
    clearStorage,
    findModDirectoryV2,
    openStorage,
    readAllStorage,
    readI18nPage,
    readStorage,
    validateNexusApikey,
    writeAllStorage,
    writeStorage,
  } from "@common/communication";
  import type { ReadI18NPage, FindModDirectoryV2 } from "@common/communication";

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
  import notification, { isError, reset, showError } from "@states/notification";

  export let pageName: string;
  $: baseContent = window.api.send(readI18nPage($i18n, "modSetting"));

  let directory: string = "";
  let limit: number = 0;
  let threshold = "";
  let apikey: string = "";
  let message: string = "";

  const setupModSettings = () => {
    window.api.send(readAllStorage("mod")).then(v => {
      directory = v.output.directory;
      limit = v.output.recusiveLimit;
      threshold = v.output.updateThreshold.toString();
    });
  };

  setupModSettings();
  window.api.send(readStorage("secrets", "nexusModsApiKey")).then(v => {
    apikey = v.output;
  });

  const findMods = (searchType: FindModDirectoryV2["subtype"]) => {
    return () => {
      window.api.send(findModDirectoryV2(searchType)).then(v => {
        directory = v.output;
      });
    };
  };

  const onValidate = () => {
    window.api.send(validateNexusApikey(apikey)).then(data => {
      if (data.output.code === 401) {
        showError(data.output.json.message, { showTime: -1 });
        apikey = "";
      } else if (data.output.code === 200) {
        reset();
      }
    });
  };

  const onSubmit = (content: ReadI18NPage<"modSetting">["output"]) => {
    return () => {
      window.api
        .send(
          writeAllStorage("mod", {
            directory,
            recusiveLimit: limit,
            updateThreshold: isNaN(parseInt(threshold)) ? undefined : parseInt(threshold),
          })
        )
        .then(() => window.api.send(writeStorage("secrets", "nexusModsApiKey", apikey)))
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

  const onClearCaches = () => {
    window.api.send(clearStorage("mod", "caches")).then(setupModSettings);
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
      </FormLabelContainer><FormDataContainer>
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
      </FormDataContainer><FormLabelContainer hidden={!$mode.beta}>
        <FormLabel
          on="nexus-mod-api-key"
          text={content.output.nexusApikey}
          tooltip={content.output.nexusApikeyTooltip}
          disabled={$mode.tutorial !== true}
        />
      </FormLabelContainer><FormDataContainer hidden={!$mode.beta}>
        <FlexContainer column={false} full={false}>
          <FormInput name="nexus-mod-api-key" bind:value={apikey} hasGroup={true} />
          <FormButton
            text="Validate"
            tooltip="example"
            disabled={$mode.tutorial !== true}
            hasGroup={true}
            isEnded={true}
            on:click={onValidate}
          />
        </FlexContainer>
      </FormDataContainer><FormLabelContainer>
        <FormLabel
          on="limit"
          text={content.output.limit}
          tooltip={content.output.limitTooltip}
          disabled={$mode.tutorial !== true}
        />
      </FormLabelContainer><FormDataContainer>
        <FlexContainer column={false} full={false}>
          <FormRange name="limit" bind:value={limit} min={1} max={8} />
          <FormLabel text={limit.toString()} disabled={true} />
        </FlexContainer>
      </FormDataContainer><FormLabelContainer>
        <FormLabel
          on="threshold"
          text={content.output.threshold}
          tooltip={content.output.thresholdTooltip}
          disabled={$mode.tutorial !== true}
        />
      </FormLabelContainer><FormDataContainer>
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
      </FormDataContainer><FormFooterContainer>
        <div slot="left" class:hidden={!$mode.beta}>
          <FormSubmit text="Clear" on:click={onClearCaches} />
        </div>
        <div slot="right">
          <FormSubmit text={content.output.openButton} on:click={onOpen} />
          <FormSubmit
            disabled={isError($notification)}
            text={message ? message : content.output.submitButton}
            on:click={onSubmit(content.output)}
          />
        </div>
      </FormFooterContainer>
    {/await}
  </FormContainer>
</FlexContainer>

<style lang="scss">
  .hidden {
    display: none;
    opacity: 0;
    visibility: hidden;
  }
</style>
