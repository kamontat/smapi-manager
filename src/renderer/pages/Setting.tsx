import React, { useEffect, useState } from "react";
import tw from "twin.macro";

import Header from "@components/Header";
import { Message, FIND_MODS, READ_CONFIG_ALL, CLIPBOARD_PASTE, OPEN_CONFIG_FILE } from "@common/event";
import ProcessorType from "@common/constants/processor-type";
import ConfigValue, { defaults as defaultConfig, ConfigKey } from "@common/storage/config/data";
import { ModCollection } from "@common/mod";
import {
  Checkbox,
  CheckboxContainer,
  FormBodyContainer,
  FormButton,
  FormContainer,
  FormElement,
  FormFooterContainer,
  FormInput,
  FormLabel,
  FormSubmit,
} from "@components/form";
import { Logger } from "@common/logger";

interface SettingProperty {
  name: string;
}

const RootContainer = tw.div`
  flex flex-col h-full min-h-full
  bg-gradient-to-tl from-yellow-300 to-green-800
`;

const Container = tw.div`
  mx-4 my-2 align-middle inline-block bg-white 
  shadow overflow-auto border-b border-gray-200 sm:rounded-lg
`;

const message = new Message(ProcessorType.RENDERER);
const logger = new Logger(ProcessorType.RENDERER, "setting");
const SettingPage = ({ name }: SettingProperty): JSX.Element => {
  const [saved, setSaved] = useState(-1);
  const [original, setOriginal] = useState(defaultConfig);
  const [configure, _updateConfig] = useState(defaultConfig);

  const updateConfig = <K extends ConfigKey = ConfigKey, V extends ConfigValue[K] = ConfigValue[K]>(
    name: K,
    value?: V
  ) => {
    if (value !== undefined) {
      _updateConfig(v => {
        return Object.assign({}, v, { [name]: value });
      });
    }
  };

  const onTextChangeConfig = <K extends ConfigKey>(name: K) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      logger.debug(`receiving ${event.target.value} (${typeof event.target.value})`);
      updateConfig<K, any>(name, event.target.value); // eslint-disable-line @typescript-eslint/no-explicit-any
    };
  };

  const onCheckboxChangeConfig = <K extends ConfigKey>(name: K) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      logger.debug(`receiving ${event.target.checked} from ${name}`);
      updateConfig<K, any>(name, event.target.checked); // eslint-disable-line @typescript-eslint/no-explicit-any
    };
  };

  const onSubmit = () => {
    const keys = Object.keys(configure) as ConfigKey[];
    const modifiedKeys = keys.filter(originalKey => original[originalKey] !== configure[originalKey]);

    for (const key of modifiedKeys) {
      logger.debug(`updating ${key} in config`);
      message.saveConfig(key, configure[key]);
    }

    if (modifiedKeys.length > 0) {
      setSaved(modifiedKeys.length);
      setTimeout(() => setSaved(-1), 800);
    }
  };

  useEffect(() => {
    message.sent({ type: READ_CONFIG_ALL });

    message.receive<ConfigValue>({
      type: [READ_CONFIG_ALL],
      callback: data => {
        setOriginal(data.value);
        _updateConfig(data.value);
      },
    });

    message.receive<ModCollection>({
      type: [FIND_MODS],
      callback: data => {
        if (data.value.path !== configure.modDirectory) {
          updateConfig("modDirectory", data.value.path);
        }
      },
    });

    message.receive<string>({
      type: [CLIPBOARD_PASTE],
      callback: data => {
        if (data.value) {
          updateConfig(data.subtype as ConfigKey, data.value);
        }
      },
    });

    return message.cleanup();
  }, []);

  return (
    <RootContainer>
      <Header name={name} />
      <Container>
        <FormContainer>
          <FormBodyContainer>
            <div>
              <FormLabel>Mod location</FormLabel>
              <FormElement>
                <FormInput tw="rounded-none rounded-l-md" type="text" value={configure.modDirectory} readOnly={true} />
                <FormButton
                  type="button"
                  tw="rounded-none border border-l-0"
                  onClick={() => message.sent({ type: FIND_MODS, subtype: "auto" })}
                >
                  Update
                </FormButton>
                <FormButton
                  type="button"
                  tw="rounded-r-md border border-l-0"
                  onClick={() => message.sent({ type: FIND_MODS, subtype: "custom" })}
                >
                  Custom
                </FormButton>
              </FormElement>
            </div>

            <div>
              <FormLabel>Nexusmods API Key</FormLabel>
              <FormElement>
                <FormInput
                  tw="rounded-none rounded-l-md"
                  type="password"
                  value={configure.nexusmodsApiKey}
                  onChange={onTextChangeConfig("nexusmodsApiKey")}
                />
                <FormButton
                  type="button"
                  tw="rounded-r-md border border-l-0"
                  onClick={() => message.sent({ type: CLIPBOARD_PASTE, subtype: "nexusmodsApiKey" })}
                >
                  Paste
                </FormButton>
              </FormElement>
            </div>

            <div tw="grid grid-cols-6 gap-6">
              <div tw="col-span-2">
                <FormLabel htmlFor="recursive-limit-input">Recursive limit</FormLabel>
                <FormInput
                  id="recursive-limit-input"
                  type="number"
                  value={configure.recursiveLimit}
                  onChange={onTextChangeConfig("recursiveLimit")}
                />
              </div>
            </div>

            <div tw="flex flex-col space-y-3">
              <CheckboxContainer>
                <Checkbox
                  name="tutorial-mode"
                  type="checkbox"
                  checked={configure.tutorialMode}
                  onChange={onCheckboxChangeConfig("tutorialMode")}
                />
                <FormLabel htmlFor="tutorial-mode">Tutorial mode</FormLabel>
              </CheckboxContainer>
              <CheckboxContainer>
                <Checkbox
                  name="debug-mode"
                  type="checkbox"
                  checked={configure.debugMode}
                  onChange={onCheckboxChangeConfig("debugMode")}
                />
                <FormLabel htmlFor="debug-mode">Debug mode</FormLabel>
              </CheckboxContainer>
            </div>
          </FormBodyContainer>
          <FormFooterContainer>
            <FormSubmit type="message" onClick={() => message.sent({ type: OPEN_CONFIG_FILE })}>
              Open
            </FormSubmit>
            <FormSubmit type="info" onClick={onSubmit}>
              <div
                tw="absolute bottom-full mb-4 transition duration-300 ease-in-out animate-bounce"
                style={{ opacity: saved > 0 ? 1 : 0, display: saved > 0 ? "block" : "none" }}
              >
                saving..
              </div>
              Save
            </FormSubmit>
          </FormFooterContainer>
        </FormContainer>
      </Container>
    </RootContainer>
  );
};

export default SettingPage;
