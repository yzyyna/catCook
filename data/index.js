import { dishes } from "./dishes.js";
import { categories } from "./categories.js";
import { t } from "../utils/i18n.js";

const STORAGE_KEYS = {
  CART: "catcook_cart",
  FAVORITES: "catcook_favorites",
  HISTORY: "catcook_history",
  SEARCH_HISTORY: "catcook_search_history",
};

export const storage = {
  getCart() {
    try {
      const cart = uni.getStorageSync(STORAGE_KEYS.CART);
      return cart ? JSON.parse(cart) : [];
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
      return favorites ? JSON.parse(favorites) : [];
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
      return history ? JSON.parse(history) : [];
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
      return history ? JSON.parse(history) : [];
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
};

export const dataService = {
  getCategories() {
    return categories;
  },

  getDishesByCategory(categoryId) {
    return dishes.filter((dish) => dish.categoryId === categoryId);
  },

  getDishById(dishId) {
    return dishes.find((dish) => dish.id === dishId);
  },

  searchDishes(keyword) {
    const lowerKeyword = keyword.toLowerCase();
    return dishes.filter(
      (dish) =>
        dish.name.toLowerCase().includes(lowerKeyword) ||
        dish.description.toLowerCase().includes(lowerKeyword) ||
        dish.ingredients.some((ing) =>
          ing.name.toLowerCase().includes(lowerKeyword),
        ),
    );
  },

  getIngredientSummary(cartItems) {
    const ingredientMap = new Map();

    cartItems.forEach((item) => {
      item.ingredients.forEach((ingredient) => {
        const key = ingredient.name;
        if (ingredientMap.has(key)) {
          const existing = ingredientMap.get(key);
          existing.amounts.push(ingredient.amount);
          existing.dishes.push(item.name);
        } else {
          ingredientMap.set(key, {
            name: ingredient.name,
            amounts: [ingredient.amount],
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
