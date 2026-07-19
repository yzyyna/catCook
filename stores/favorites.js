import { defineStore } from "pinia";
import { storage } from "@/data";

export const useFavoritesStore = defineStore("favorites", {
  state: () => ({
    items: [],
  }),
  getters: {
    isFavorite: (state) => (dishId) =>
      state.items.some((item) => item.id === dishId),
  },
  actions: {
    load() {
      this.items = storage.getFavorites();
    },
    toggle(dish) {
      storage.toggleFavorite(dish);
      this.load();
      // 返回是否为收藏状态（toggle 后）
      return this.isFavorite(dish.id);
    },
    removeMany(ids) {
      ids.forEach((id) => {
        const dish = this.items.find((item) => item.id === id);
        if (dish) {
          storage.toggleFavorite(dish);
        }
      });
      this.load();
    },
  },
});
