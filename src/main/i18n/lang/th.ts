import type { LanguageType } from "@common/i18n";

const lang: LanguageType = {
  dashboard: {
    modManager: "การจัดการมอด",
    modSetting: "การตั้งค่ามอด",
    appSetting: "การตั้งค่าโปรแกรม",
    appInfo: "ข้อมูลโปรแกรม",
  },
  modManager: {
    shown: "แสดงอยู่",
    hidden: "ซ่อนอยู่",
    directory: "เปิดไฟล์",
  },
  appInfo: {
    title: "ข้อมูลทั่วไป",
    description: "หน้านี้จะแสดงงเกี่ยวกับข้อมูลทั่วไปของแอพพลิเคชั่น",
    columnName: "ชื่อ",
    columnVersion: "เวอร์ชั่น",
    columnAuthor: "ผู้สร้าง",
  },
  appSetting: {
    languageSwitch: "ภาษา",
    languageTooltip: "(เปลื่ยนภาษาของโปรแกรม)",

    debugMode: "ดีบักโหมด",
    debugTooltip: "(แสดงข้อมูลบางอย่างเพิ่มเติม เพื่อช่วยในการหาปัญหา)",

    uniqueID: "ไอดี",
    uniqueIDTooltip: "(ใช้สำหรับเก็บข้อมูลทั่วไปของแอพพลิเคชั่น)",
    uniqueIDRandom: "สุ่ม",
    uniqueIDRandomTooltip: "(สุ่มเลือกไอดีใหม่)",

    mode: "โหมด",

    betaMode: "เบต้าโหมด",
    betaTooltip: "(เปิดบางความสามารถที่อาจจะทำให้โปรแกรมทำงานไม่ถูกต้อง)",

    tutorialMode: "โหมดฝึกหัด",
    tutorialTooltip: "(เพิ่มคำอธิบายในบางแห่ง)",

    submitButton: "บันทึก",
    submitMessage: "เสร็จสิ้น",

    openButton: "เปิด",
  },
  modSetting: {
    directory: "ไดเรกทอรี",
    directoryTooltip: "(โฟลเดอร์ที่มีมอดอยู่)",

    directoryFetch: "อัพเดต",
    directoryFetchTooltip: "(ค้นหาอัตโนมัติ)",
    directoryCustom: "เลือกเอง",
    directoryCustomTooltip: "(ค้นหาด้วยตัวเอง)",

    limit: "ลิมิตการค้นหา",
    limitTooltip: "(จำนวนชั้นของโฟลเดอร์ที่จะค้นหา)",

    threshold: "อัพเดตการค้นหา",
    thresholdTooltip: "(จะเริ่มค้นหาใหม่เมื่อเกินเวลาที่ระบุ)",

    nexusApikey: "",
    nexusApikeyTooltip: "(apikey ที่จะให้ดึงข้อมูลบางส่วนจาก nexus-mod ได้)",
    nexusApikeyValidate: "ตรวจสอบ",
    nexusApikeyValidateTooltip: "(ตรวจสอบตัว apikey นี้ ต้องการอินเตอร์เน็ต)",
    nexusUpdateThreshold: "อัพเดตข้อมูลจาก nexus-mod",
    nexusUpdateThresholdTooltip: "(จะอัพเดตข้อมูลเมื่อเกินเวลาที่ระบุ)",

    timeUnitInstant: "ตลอดเวลา",
    timeUnit1Minute: "1 นาที",
    timeUnit20Minute: "20 นาที",
    timeUnit1Hour: "1 ชั่วโมง",
    timeUnit1Day: "1 วัน",
    timeUnit1Week: "1 สัปดาห์",
    timeUnitForever: "ไม่อัพเดตเลย",

    submitButton: "บันทึก",
    submitMessage: "เสร็จสิ้น",

    openButton: "เปิด",
  },
};

export default lang;
