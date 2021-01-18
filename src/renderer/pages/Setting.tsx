import React, { useEffect, useState } from "react";
import tw from "twin.macro";

import Header from "@components/Header";
import { Message, FIND_MODS, READ_CONFIG_ALL, CLIPBOARD_PASTE, OPEN_CONFIG_FILE } from "@common/event";
import ProcessorType from "@common/constants/processor-type";
import StorageType, { defaults } from "@common/constants/storage-type";
import { ModCollection } from "@common/mod";
import {
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
  const [original, setOriginal] = useState(defaults);
  const [configure, _updateConfig] = useState(defaults);

  const updateConfig = <K extends keyof StorageType = keyof StorageType, V extends StorageType[K] = StorageType[K]>(
    name: K,
    value?: V
  ) => {
    if (value !== undefined) {
      _updateConfig(v => {
        return Object.assign({}, v, { [name]: value });
      });
    }
  };

  const onChangeConfig = <K extends keyof StorageType>(name: K) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      updateConfig<K, any>(name, event.target.value); // eslint-disable-line @typescript-eslint/no-explicit-any
    };
  };

  useEffect(() => {
    message.sent({ type: READ_CONFIG_ALL });

    message.receive<StorageType>({
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
          updateConfig(data.subtype as keyof StorageType, data.value);
        }
      },
    });
  }, []);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    (Object.keys(original) as (keyof StorageType)[])
      .filter(originalKey => original[originalKey] !== configure[originalKey])
      .forEach(key => {
        logger.debug(`updating ${key} in config`);
        message.saveConfig(key, configure[key]);
      });
  };

  return (
    <RootContainer>
      <Header name={name} />
      <Container>
        <FormContainer onSubmit={submit}>
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
                  onChange={onChangeConfig("nexusmodsApiKey")}
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
                  onChange={onChangeConfig("recursiveLimit")}
                />
              </div>
              <div tw="col-span-3">
                <FormLabel htmlFor="recursive-limit-input">Recursive limit</FormLabel>
                <FormInput
                  id="recursive-limit-input"
                  type="number"
                  value={configure.recursiveLimit}
                  onChange={onChangeConfig("recursiveLimit")}
                />
              </div>
            </div>
          </FormBodyContainer>
          <FormFooterContainer>
            <FormSubmit type="message" onClick={() => message.sent({ type: OPEN_CONFIG_FILE })}>
              Open
            </FormSubmit>
            <FormSubmit type="info" isSubmit={true}>
              Save
            </FormSubmit>
          </FormFooterContainer>
        </FormContainer>
      </Container>
    </RootContainer>
  );
};

export default SettingPage;
