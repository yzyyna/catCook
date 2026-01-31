import { useI18n } from "vue-i18n";

let i18nInstance = null;

export function setI18nInstance(instance) {
  i18nInstance = instance;
}

export function getI18nInstance() {
  return i18nInstance;
}

export function t(key, params = {}) {
  if (!i18nInstance) {
    console.warn("i18n instance not initialized");
    return key;
  }
  return i18nInstance.global.t(key, params);
}

export function getCategoryName(category) {
  if (!category) return "";
  if (category.name) return category.name;
  if (category.nameKey) return t(category.nameKey);
  return "";
}

export function getDifficultyLabel(dish) {
  if (!dish) return "";
  if (dish.difficulty) return dish.difficulty;
  if (dish.difficultyKey) return t(dish.difficultyKey);
  return "";
}

export function getIngredientCategoryName(category) {
  const categoryMap = {
    vegetables: "shopping.vegetables",
    meat: "shopping.meat",
    seasonings: "shopping.seasonings",
    others: "shopping.others",
  };
  const key = categoryMap[category];
  return key ? t(key) : category;
}

export function formatMessage(template, params) {
  let message = template;
  Object.keys(params).forEach((key) => {
    message = message.replace(`{${key}}`, params[key]);
  });
  return message;
}

export function getCurrentLanguage() {
  if (!i18nInstance) return "zh-CN";
  return i18nInstance.global.locale.value || i18nInstance.global.locale;
}

export function setLanguage(locale) {
  if (!i18nInstance) {
    console.warn("i18n instance not initialized");
    return false;
  }
  if (i18nInstance.global.locale.value !== undefined) {
    i18nInstance.global.locale.value = locale;
  } else {
    i18nInstance.global.locale = locale;
  }
  return true;
}

export function useAppI18n() {
  const { t: i18nT, locale } = useI18n();

  return {
    t: i18nT,
    locale,
    getCategoryName,
    getDifficultyLabel,
    getIngredientCategoryName,
    formatMessage,
    setLanguage,
    getCurrentLanguage,
  };
}
