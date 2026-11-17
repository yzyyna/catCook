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

export function getDishTips(dish) {
  if (!dish) return "";
  if (dish.i18n?.tips) return resolveLocalizedValue(dish.i18n.tips);
  return dish.tips || "";
}

const DEFAULT_CATEGORY_TAGS = {
  1: { "zh-CN": ["家常风味", "下饭必备"], "en-US": ["Home-style", "Comforting"] },
  2: { "zh-CN": ["经典肉香", "高蛋白"], "en-US": ["Savory Meat", "High Protein"] },
  3: { "zh-CN": ["鲜美海味", "原汁原味"], "en-US": ["Fresh Seafood", "Flavorful"] },
  4: { "zh-CN": ["清爽少油", "健康素食"], "en-US": ["Clean Veggie", "Healthy"] },
  5: { "zh-CN": ["养生煲汤", "温润滋补"], "en-US": ["Warm Soup", "Nourishing"] },
  6: { "zh-CN": ["甜蜜烘焙", "精致点心"], "en-US": ["Sweet Treat", "Dessert"] },
  7: { "zh-CN": ["元气快手", "营养早餐"], "en-US": ["Quick Morning", "Breakfast"] },
  8: { "zh-CN": ["风味特调", "清凉解腻"], "en-US": ["Specialty Drink", "Refreshing"] },
};

export function getDishTags(dish) {
  if (!dish) return [];
  if (dish.i18n?.tags) {
    const localized = resolveLocalizedValue(dish.i18n.tags);
    if (Array.isArray(localized) && localized.length > 0) return localized;
  }
  if (Array.isArray(dish.tags) && dish.tags.length > 0) return dish.tags;
  const catTags = DEFAULT_CATEGORY_TAGS[dish.categoryId];
  if (catTags) {
    return resolveLocalizedValue(catTags) || [];
  }
  return [];
}

export function getIngredientName(ingredient) {
  if (!ingredient) return "";
  if (ingredient.i18n?.name) {
    return resolveLocalizedValue(ingredient.i18n.name);
  }
  return ingredient.name || "";
}

export function getIngredientAmount(ingredient) {
  if (!ingredient) return "";
  if (ingredient.i18n?.amount) {
    const resolved = resolveLocalizedValue(ingredient.i18n.amount);
    if (resolved) return resolved;
  }
  return ingredient.amount || "";
}

export function getDishIngredients(dish) {
  if (!dish?.ingredients) return [];

  return dish.ingredients.map((ingredient) => ({
    ...ingredient,
    key: ingredient.name,
    name: getIngredientName(ingredient),
    amount: getIngredientAmount(ingredient),
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
