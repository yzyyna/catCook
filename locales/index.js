import { createI18n } from "vue-i18n";
import zhCN from "./zh-CN.js";
import enUS from "./en-US.js";

const messages = {
  "zh-CN": zhCN,
  "en-US": enUS,
};

function getStoredLanguage() {
  try {
    const lang = uni.getStorageSync("catcook_language");
    return lang || "zh-CN";
  } catch (e) {
    return "zh-CN";
  }
}

const i18n = createI18n({
  locale: getStoredLanguage(),
  fallbackLocale: "en-US",
  messages,
});

export default i18n;
