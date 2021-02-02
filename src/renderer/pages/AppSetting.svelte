<script lang="ts">
  import { openStorage, readI18nPage, readStorage, writeAllStorage, updateUniqueId } from "@common/communication";
  import type { ReadI18NPage } from "@common/communication";

  import FlexContainer from "@layouts/FlexContainer.svelte";
  import Header from "@components/Header.svelte";

  import FormContainer from "@components/form/Container.svelte";
  import FormLabelContainer from "@components/form/LabelContainer.svelte";
  import FormDataContainer from "@components/form/DataContainer.svelte";
  import FormFooterContainer from "@components/form/FooterContainer.svelte";
  import FormLabel from "@components/form/Label.svelte";
  import FormInput from "@components/form/Input.svelte";
  import FormButton from "@components/form/Button.svelte";
  import FormSelect from "@components/form/Select.svelte";
  import FormSubmit from "@components/form/Submit.svelte";

  import mode from "@states/mode";
  import i18n from "@states/lang";
  import Switch from "@components/Switch.svelte";

  export let pageName: string;

  $: baseContent = window.api.send(readI18nPage($i18n, "appSetting"));

  let message: string = "";
  let uid: string = "";

  window.api.send(readStorage("settings", "uniqueid")).then(v => (uid = v.output));

  const onSubmit = (content: ReadI18NPage<"appSetting">["output"]) => {
    return () => {
      window.api
        .send(
          writeAllStorage("settings", {
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
  <FormContainer>
    {#await baseContent then content}
      <FormLabelContainer>
        <FormLabel
          on="languages"
          text={content.output.languageSwitch}
          tooltip={content.output.languageTooltip}
          disabled={$mode.tutorial !== true}
        />
      </FormLabelContainer>
      <FormDataContainer>
        <FormSelect
          bind:value={$i18n}
          values={[
            { key: "en", value: "English" },
            { key: "th", value: "Thai" },
          ]}
        />
      </FormDataContainer>

      <FormLabelContainer>
        <FormLabel
          on="uniqueid"
          text={content.output.uniqueID}
          tooltip={content.output.uniqueIDTooltip}
          disabled={$mode.tutorial !== true}
        />
      </FormLabelContainer>
      <FormDataContainer>
        <FlexContainer full={false} column={false}>
          <FormInput name="uniqueid" bind:value={uid} hasGroup={true} disabled={true} />
          <FormButton
            text={content.output.uniqueIDRandom}
            tooltip={content.output.uniqueIDRandomTooltip}
            disabled={$mode.tutorial !== true}
            hasGroup={true}
            isEnded={true}
            on:click={() => window.api.send(updateUniqueId()).then(v => (uid = v.output))}
          />
        </FlexContainer>
      </FormDataContainer>

      <FormLabelContainer>
        <FormLabel text={content.output.mode} />
      </FormLabelContainer>
      <FormDataContainer>
        <Switch name="debug-mode" bind:checked={$mode.debug} rounded={true} />
        <FormLabel
          on="debug-mode"
          text={content.output.debugMode}
          tooltip={content.output.debugTooltip}
          disabled={$mode.tutorial !== true}
        />
      </FormDataContainer>
      <FormLabelContainer />
      <FormDataContainer>
        <Switch name="beta-mode" bind:checked={$mode.beta} rounded={true} />
        <FormLabel
          on="beta-mode"
          text={content.output.betaMode}
          tooltip={content.output.betaTooltip}
          disabled={$mode.tutorial !== true}
        />
      </FormDataContainer>
      <FormLabelContainer />
      <FormDataContainer>
        <Switch name="tutorial-mode" bind:checked={$mode.tutorial} rounded={true} />
        <FormLabel
          on="tutorial-mode"
          text={content.output.tutorialMode}
          tooltip={content.output.tutorialTooltip}
          disabled={$mode.tutorial !== true}
        />
      </FormDataContainer>

      <FormFooterContainer>
        <FormSubmit text={content.output.openButton} on:click={onOpen} />
        <FormSubmit text={message ? message : content.output.submitButton} on:click={onSubmit(content.output)} />
      </FormFooterContainer>
    {/await}
  </FormContainer>
</FlexContainer>
