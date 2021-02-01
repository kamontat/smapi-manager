import type LanguageType from "@common/language";

const lang: LanguageType = {
  dashboard: {
    modManager: "การจัดการมอด",
    modSetting: "การตั้งค่ามอด",
    appSetting: "การตั้งค่าโปรแกรม",
    appInfo: "ข้อมูลโปรแกรม",
  },
  appInfo: {
    title: "",
    description: "",
    columnName: "",
    columnVersion: "",
    columnAuthor: "",
  },
  appSetting: {
    languageSwitch: "ภาษา",
    languageTooltip: "(เปลื่ยนภาษาของโปรแกรม)",

    debugMode: "ดีบักโหมด",
    debugTooltip: "(แสดงข้อมูลบางอย่างเพิ่มเติม)",

    uniqueID: "",
    uniqueIDTooltip: "",
    uniqueIDRandom: "",
    uniqueIDRandomTooltip: "",

    mode: "",

    betaMode: "เบต้าโหมด",
    betaTooltip: "(เปิดบางความสามารถที่อาจจะทำให้โปรแกรมทำงานไม่ถูกต้อง)",

    tutorialMode: "โหมดฝึกหัด",
    tutorialTooltip: "",

    submitButton: "บันทึก",
    submitMessage: "เสร็จสิ้น",

    openButton: "เปิด",
  },
  modSetting: {
    directory: "",
    directoryTooltip: "",

    directoryFetch: "",
    directoryFetchTooltip: "",
    directoryCustom: "",
    directoryCustomTooltip: "",

    limit: "",
    limitTooltip: "",

    threshold: "",
    thresholdTooltip: "",

    timeUnitInstant: "",
    timeUnit1Minute: "",
    timeUnit20Minute: "",
    timeUnit1Hour: "",
    timeUnit1Day: "",
    timeUnit1Week: "",
    timeUnitForever: "",

    submitButton: "",
    submitMessage: "",

    openButton: "",
  },
};

export default lang;
