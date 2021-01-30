import type LanguageType from "@common/language";

const lang: LanguageType = {
  appInfo: {
    title: "Application information",
    description: "This shown all information relate to application",
    columnName: "Name",
    columnVersion: "Version",
    columnAuthor: "Author",
  },
  appSetting: {
    languageSwitch: "Language",
    languageTooltip: "(set display language)",

    mode: "Mode",

    debugMode: "Debug mode",
    debugTooltip: "(enable some extra information to ui)",

    betaMode: "Beta mode",
    betaTooltip: "(enable some feature that not tested yet)",

    tutorialMode: "Tutorial mode",
    tutorialTooltip: "(add extra tooltip to describe information)",

    submitButton: "Submit",
    submitMessage: "Saved !!!",

    openButton: "Open",
  },
  modSetting: {
    directory: "Directory",
    directoryTooltip: "(mod directory path)",

    directoryFetch: "Fetch",
    directoryFetchTooltip: "(auto find current mod directory)",
    directoryCustom: "Custom",
    directoryCustomTooltip: "(manually find mod directory)",

    limit: "Searching limit",
    limitTooltip: "(how many subdirectory to look, increase this might effect performance)",

    threshold: "Update threshold",
    thresholdTooltip: "(application will search mod after this threshold)",

    timeUnitInstant: "Instant",
    timeUnit1Minute: "1 Minute",
    timeUnit20Minute: "20 Minutes",
    timeUnit1Hour: "1 Hour",
    timeUnit1Day: "1 Day",
    timeUnit1Week: "1 Week",
    timeUnitForever: "Forever",

    submitButton: "Submit",
    submitMessage: "Saved !!!",

    openButton: "Open",
  },
};

export default lang;
