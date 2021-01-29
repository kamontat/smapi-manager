import type LanguageType from "@common/language";

const lang: LanguageType = {
  appSetting: {
    languageSwitch: "Language",
    languageTooltip: "(set display language)",

    debugMode: "Debug mode",
    debugTooltip: "(enable some extra information to ui)",

    betaMode: "Beta mode",
    betaTooltip: "(enable some feature that not tested yet)",

    tutorialMode: "Tutorial mode",
    tutorialTooltip: "(add extra tooltip to describe information)",

    submitButton: "Submit",
    submitMessage: "Saved",

    openButton: "Open",
  },
  modSetting: {
    directory: "",
    directoryTooltip: "",

    directoryFetch: "Fetch",
    directoryFetchTooltip: "(auto find current mod directory)",
    directoryCustom: "Custom",
    directoryCustomTooltip: "(manually find mod directory)",

    limit: "",
    limitTooltip: "",

    submitButton: "Submit",
    submitMessage: "Saved",

    openButton: "Open",
  },
};

export default lang;
