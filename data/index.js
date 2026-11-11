import { dishes } from "./dishes.js";
import { categories } from "./categories.js";
import { t } from "../utils/i18n.js";
import {
  getDishCalories,
  getDishDescription,
  getDishIngredients,
  getDishName,
  getDishPractice,
  getDishTime,
} from "../utils/i18n.js";

const STORAGE_KEYS = {
  CART: "catcook_cart",
  FAVORITES: "catcook_favorites",
  HISTORY: "catcook_history",
  SEARCH_HISTORY: "catcook_search_history",
  SHOPPING_CHECKED: "catcook_shopping_checked",
};

export const storage = {
  getCart() {
    try {
      const cart = uni.getStorageSync(STORAGE_KEYS.CART);
      return cart ? JSON.parse(cart).map(normalizeDishRecord) : [];
    } catch (e) {
      return [];
    }
  },

  setCart(cart) {
    try {
      uni.setStorageSync(STORAGE_KEYS.CART, JSON.stringify(cart));
      return true;
    } catch (e) {
      return false;
    }
  },

  addToCart(dish) {
    const cart = this.getCart();
    const existingIndex = cart.findIndex((item) => item.id === dish.id);

    if (existingIndex !== -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({
        ...dish,
        quantity: 1,
        addTime: new Date().getTime(),
      });
    }

    return this.setCart(cart);
  },

  removeFromCart(dishId) {
    const cart = this.getCart();
    const newCart = cart.filter((item) => item.id !== dishId);
    return this.setCart(newCart);
  },

  updateCartQuantity(dishId, quantity) {
    const cart = this.getCart();
    const index = cart.findIndex((item) => item.id === dishId);

    if (index !== -1) {
      if (quantity <= 0) {
        cart.splice(index, 1);
      } else {
        cart[index].quantity = quantity;
      }
      return this.setCart(cart);
    }
    return false;
  },

  clearCart() {
    return this.setCart([]);
  },

  getFavorites() {
    try {
      const favorites = uni.getStorageSync(STORAGE_KEYS.FAVORITES);
      return favorites ? JSON.parse(favorites).map(normalizeDishRecord) : [];
    } catch (e) {
      return [];
    }
  },

  setFavorites(favorites) {
    try {
      uni.setStorageSync(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
      return true;
    } catch (e) {
      return false;
    }
  },

  toggleFavorite(dish) {
    const favorites = this.getFavorites();
    const index = favorites.findIndex((item) => item.id === dish.id);

    if (index !== -1) {
      favorites.splice(index, 1);
    } else {
      favorites.push({
        ...dish,
        addTime: new Date().getTime(),
      });
    }

    return this.setFavorites(favorites);
  },

  getHistory() {
    try {
      const history = uni.getStorageSync(STORAGE_KEYS.HISTORY);
      return history ? JSON.parse(history).map(normalizeDishRecord) : [];
    } catch (e) {
      return [];
    }
  },

  addToHistory(dish) {
    const history = this.getHistory();
    const existingIndex = history.findIndex((item) => item.id === dish.id);

    if (existingIndex !== -1) {
      history.splice(existingIndex, 1);
    }

    history.unshift({
      ...dish,
      viewTime: new Date().getTime(),
    });

    if (history.length > 20) {
      history.pop();
    }

    try {
      uni.setStorageSync(STORAGE_KEYS.HISTORY, JSON.stringify(history));
      return true;
    } catch (e) {
      return false;
    }
  },

  clearHistory() {
    try {
      uni.setStorageSync(STORAGE_KEYS.HISTORY, JSON.stringify([]));
      return true;
    } catch (e) {
      return false;
    }
  },

  setHistory(history) {
    try {
      uni.setStorageSync(STORAGE_KEYS.HISTORY, JSON.stringify(history));
      return true;
    } catch (e) {
      return false;
    }
  },

  getSearchHistory() {
    try {
      const history = uni.getStorageSync(STORAGE_KEYS.SEARCH_HISTORY);
      const parsed = history ? JSON.parse(history) : [];
      // 防御脏数据：非数组时按空历史处理
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  },

  setSearchHistory(history) {
    try {
      uni.setStorageSync(STORAGE_KEYS.SEARCH_HISTORY, JSON.stringify(history));
      return true;
    } catch (e) {
      return false;
    }
  },

  clearSearchHistory() {
    try {
      uni.setStorageSync(STORAGE_KEYS.SEARCH_HISTORY, JSON.stringify([]));
      return true;
    } catch (e) {
      return false;
    }
  },

  getShoppingChecked() {
    try {
      const checked = uni.getStorageSync(STORAGE_KEYS.SHOPPING_CHECKED);
      const parsed = checked ? JSON.parse(checked) : [];
      // 防御脏数据：非数组时按未勾选处理
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  },

  setShoppingChecked(checkedKeys) {
    try {
      uni.setStorageSync(
        STORAGE_KEYS.SHOPPING_CHECKED,
        JSON.stringify(checkedKeys),
      );
      return true;
    } catch (e) {
      return false;
    }
  },
};

export const dataService = {
  getCategories() {
    return categories;
  },

  getAllDishes() {
    return dishes.map(localizeDish);
  },

  getCategoryCounts() {
    return dishes.reduce((counts, dish) => {
      counts[dish.categoryId] = (counts[dish.categoryId] || 0) + 1;
      return counts;
    }, {});
  },

  getTotalCount() {
    return dishes.length;
  },

  getDishesByCategory(categoryId) {
    return dishes
      .filter((dish) => dish.categoryId === categoryId)
      .map(localizeDish);
  },

  getDishById(dishId) {
    const dish = dishes.find((item) => item.id === dishId);
    return dish ? localizeDish(dish) : null;
  },

  searchDishes(keyword) {
    const lowerKeyword = keyword.toLowerCase();
    return dishes
      .filter((dish) => {
        // 双语全域检索：无论当前处于何种语言，搜中文或英文名/食材/做法均能命中
        const pool = [
          dish.name,
          dish.description,
          dish.practice,
          dish.i18n?.name?.["zh-CN"],
          dish.i18n?.name?.["en-US"],
          dish.i18n?.description?.["zh-CN"],
          dish.i18n?.description?.["en-US"],
          dish.i18n?.practice?.["zh-CN"],
          dish.i18n?.practice?.["en-US"],
          ...dish.ingredients.flatMap((ing) => [
            ing.name,
            ing.i18n?.name?.["zh-CN"],
            ing.i18n?.name?.["en-US"],
          ]),
        ];
        return pool
          .filter(Boolean)
          .some((text) => String(text).toLowerCase().includes(lowerKeyword));
      })
      .map(localizeDish);
  },

  getIngredientSummary(cartItems) {
    const ingredientMap = new Map();

    cartItems.forEach((item) => {
      const quantity = item.quantity > 0 ? item.quantity : 1;
      item.ingredients.forEach((ingredient) => {
        const key = ingredient.key || ingredient.name;
        // 用量按份数放大：2 份红烧肉需要 1000g 五花肉，而不是单份的 500g
        const amount = scaleAmount(ingredient.amount, quantity);
        if (ingredientMap.has(key)) {
          const existing = ingredientMap.get(key);
          existing.amounts.push(amount);
          existing.dishes.push(item.name);
        } else {
          ingredientMap.set(key, {
            key,
            name: ingredient.name,
            category: ingredient.category || "other",
            amounts: [amount],
            dishes: [item.name],
          });
        }
      });
    });

    return Array.from(ingredientMap.values());
  },

  generateShareData(cartItems) {
    const ingredientSummary = this.getIngredientSummary(cartItems);
    const shareData = {
      title: t("shopping.shareTitle"),
      dishes: cartItems.map((item) => ({
        name: item.name,
        quantity: item.quantity,
      })),
      ingredients: ingredientSummary,
      totalCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
      generateTime: new Date().toLocaleString(),
    };

    return shareData;
  },
};

export { dishes, categories };

// 用量按份数放大：只处理「数字 + 单位」（如 500g、2勺、110ml），
// 「适量 / 少许」等模糊用量原样返回，无法解析时也原样返回避免丢信息
// 英文计数单位需变复数：1 box → 2 boxes、1 handful → 2 handfuls；
// tbsp / tsp / whole 等保持原形
const EN_UNIT_PLURALS = {
  whole: "whole",
  box: "boxes",
  tbsp: "tbsp",
  tsp: "tsp",
};

function scaleAmount(amount, quantity) {
  if (!amount || quantity === 1) return amount;
  const matched = String(amount).trim().match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!matched) return amount;
  const scaled = Number(matched[1]) * quantity;
  // 去掉浮点误差尾数（如 0.30000000000000004）
  const value = Math.round(scaled * 100) / 100;
  let unit = matched[2];
  const enUnit = unit.match(/^(\s+)([A-Za-z]+)$/);
  if (enUnit) {
    const word = enUnit[2];
    const plural =
      EN_UNIT_PLURALS[word] || (/s$/.test(word) ? word : `${word}s`);
    unit = enUnit[1] + plural;
  }
  return `${value}${unit}`;
}

function localizeDish(dish) {
  return {
    ...dish,
    name: getDishName(dish),
    description: getDishDescription(dish),
    practice: getDishPractice(dish),
    ingredients: getDishIngredients(dish),
    time: getDishTime(dish),
    calories: getDishCalories(dish),
  };
}

function normalizeDishRecord(record) {
  const sourceDish = dishes.find((dish) => dish.id === record.id) || record;
  return {
    ...sourceDish,
    ...record,
    ...localizeDish(sourceDish),
  };
}
