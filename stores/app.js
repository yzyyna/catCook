import { defineStore } from "pinia";
import { setLanguage as setI18nLanguage } from "../utils/i18n";

const LANGUAGE_STORAGE_KEY = "catcook_language";

function getStoredLanguage() {
  try {
    const lang = uni.getStorageSync(LANGUAGE_STORAGE_KEY);
    return lang || "zh-CN";
  } catch (e) {
    return "zh-CN";
  }
}

function saveLanguageToStorage(lang) {
  try {
    uni.setStorageSync(LANGUAGE_STORAGE_KEY, lang);
    return true;
  } catch (e) {
    return false;
  }
}

export const useAppStore = defineStore("app", {
  state: () => ({
    appName: "catCook",
    language: getStoredLanguage(),
    supportedLanguages: [
      { code: "zh-CN", name: "简体中文", flag: "🇨🇳" },
      { code: "en-US", name: "English", flag: "🇺🇸" },
    ],
  }),
  getters: {
    getAppName: (state) => state.appName,
    getLanguage: (state) => state.language,
    getSupportedLanguages: (state) => state.supportedLanguages,
    getCurrentLanguageInfo: (state) => {
      return state.supportedLanguages.find(
        (lang) => lang.code === state.language,
      );
    },
  },
  actions: {
    setAppName(name) {
      this.appName = name;
    },
    setLanguage(lang) {
      if (!this.supportedLanguages.find((l) => l.code === lang)) {
        console.warn(`Unsupported language: ${lang}`);
        return false;
      }
      this.language = lang;
      saveLanguageToStorage(lang);
      setI18nLanguage(lang);
      return true;
    },
    toggleLanguage() {
      const currentIndex = this.supportedLanguages.findIndex(
        (lang) => lang.code === this.language,
      );
      const nextIndex = (currentIndex + 1) % this.supportedLanguages.length;
      const nextLang = this.supportedLanguages[nextIndex].code;
      return this.setLanguage(nextLang);
    },
  },
});
