import { defineStore } from "pinia";
import { storage } from "@/data";

export const useFavoritesStore = defineStore("favorites", {
  state: () => ({
    items: [],
    loaded: false,
  }),
  getters: {
    ids: (state) => state.items.map((item) => item.id),
    isFavorite: (state) => (dishId) =>
      state.items.some((item) => item.id === dishId),
  },
  actions: {
    load() {
      this.items = storage.getFavorites();
      this.loaded = true;
    },
    persist() {
      storage.setFavorites(this.items);
    },
    toggle(dish) {
      const index = this.items.findIndex((item) => item.id === dish.id);
      let added;
      if (index !== -1) {
        this.items.splice(index, 1);
        added = false;
      } else {
        this.items.push({ ...dish, addTime: new Date().getTime() });
        added = true;
      }
      this.persist();
      return added;
    },
    removeMany(dishIds) {
      this.items = this.items.filter((item) => !dishIds.includes(item.id));
      this.persist();
    },
  },
});
