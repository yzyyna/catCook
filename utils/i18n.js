import { useI18n } from "vue-i18n";

let i18nInstance = null;

function resolveLocalizedValue(value, locale = getCurrentLanguage()) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return value;
  }

  if (value[locale] !== undefined) return value[locale];
  if (value["zh-CN"] !== undefined) return value["zh-CN"];

  const fallbackValue = Object.values(value).find(
    (item) => item !== undefined && item !== null,
  );
  return fallbackValue ?? "";
}

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

export function getDishName(dish) {
  if (!dish) return "";
  if (dish.i18n?.name) return resolveLocalizedValue(dish.i18n.name);
  return dish.name || "";
}

export function getDishDescription(dish) {
  if (!dish) return "";
  if (dish.i18n?.description) {
    return resolveLocalizedValue(dish.i18n.description);
  }
  return dish.description || "";
}

export function getDishPractice(dish) {
  if (!dish) return "";
  if (dish.i18n?.practice) return resolveLocalizedValue(dish.i18n.practice);
  return dish.practice || "";
}

export function getDishTime(dish) {
  if (!dish) return "";
  if (dish.i18n?.time) return resolveLocalizedValue(dish.i18n.time);
  return dish.time || "";
}

export function getDishCalories(dish) {
  if (!dish) return "";
  if (dish.i18n?.calories) return resolveLocalizedValue(dish.i18n.calories);
  return dish.calories || "";
}

export function getIngredientName(ingredient) {
  if (!ingredient) return "";
  if (ingredient.i18n?.name) {
    return resolveLocalizedValue(ingredient.i18n.name);
  }
  return ingredient.name || "";
}

export function getDishIngredients(dish) {
  if (!dish?.ingredients) return [];

  return dish.ingredients.map((ingredient) => ({
    ...ingredient,
    key: ingredient.name,
    name: getIngredientName(ingredient),
  }));
}

export function getIngredientCategoryName(category) {
  const categoryMap = {
    vegetable: "shopping.vegetables",
    meat: "shopping.meat",
    seasoning: "shopping.seasonings",
    other: "shopping.others",
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
    getDishName,
    getDishDescription,
    getDishPractice,
    getDishTime,
    getDishCalories,
    getIngredientName,
    getDishIngredients,
    getIngredientCategoryName,
    formatMessage,
    setLanguage,
    getCurrentLanguage,
  };
}
