interface LanguageType {
  dashboard: {
    modManager: string;
    modSetting: string;
    appSetting: string;
    appInfo: string;
  };
  modManager: {
    shown: string;
    hidden: string;
    directory: string;
  };
  appSetting: {
    languageSwitch: string;
    languageTooltip: string;

    uniqueID: string;
    uniqueIDTooltip: string;
    uniqueIDRandom: string;
    uniqueIDRandomTooltip: string;

    mode: string;

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

    threshold: string;
    thresholdTooltip: string;

    nexusApikey: string;
    nexusApikeyTooltip: string;
    nexusApikeyValidate: string;
    nexusApikeyValidateTooltip: string;
    nexusUpdateThreshold: string;
    nexusUpdateThresholdTooltip: string;

    timeUnitInstant: string;
    timeUnit1Minute: string;
    timeUnit20Minute: string;
    timeUnit1Hour: string;
    timeUnit1Day: string;
    timeUnit1Week: string;
    timeUnitForever: string;

    submitButton: string;
    submitMessage: string;

    openButton: string;
  };
  appInfo: {
    title: string;
    description: string;
    columnName: string;
    columnVersion: string;
    columnAuthor: string;
  };
}

export default LanguageType;
