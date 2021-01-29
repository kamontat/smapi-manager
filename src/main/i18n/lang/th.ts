import type LanguageType from "@common/language";

const lang: LanguageType = {
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

    submitButton: "",
    submitMessage: "",

    openButton: "",
  },
};

export default lang;
