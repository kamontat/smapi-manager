interface LanguageType {
  appSetting: {
    languageSwitch: string;
    languageTooltip: string;

    debugMode: string;
    debugTooltip: string;

    betaMode: string;
    betaTooltip: string;

    tutorialMode: string;
    tutorialTooltip: string;

    submitButton: string;
    submitMessage: string;

    openButton: string;
  };
  modSetting: {
    directory: string;
    directoryTooltip: string;
    directoryFetch: string;
    directoryFetchTooltip: string;
    directoryCustom: string;
    directoryCustomTooltip: string;

    limit: string;
    limitTooltip: string;

    submitButton: string;
    submitMessage: string;

    openButton: string;
  };
}

export default LanguageType;
