import { defineStore } from "pinia";
import { storage } from "@/data";

const CART_TAB_INDEX = 1;

function syncTabBarBadge(count) {
  try {
    if (count > 0) {
      uni.setTabBarBadge({ index: CART_TAB_INDEX, text: String(count) });
    } else {
      uni.removeTabBarBadge({ index: CART_TAB_INDEX });
    }
  } catch (e) {}
}

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
    selectedIds: [],
    loaded: false,
  }),
  getters: {
    totalCount: (state) =>
      state.items.reduce((sum, item) => sum + item.quantity, 0),
    selectedItems: (state) =>
      state.items.filter((item) => state.selectedIds.includes(item.id)),
    selectedCount: (state) => state.selectedIds.length,
    allSelected: (state) =>
      state.items.length > 0 &&
      state.selectedIds.length === state.items.length,
    quantityOf: (state) => (dishId) => {
      const item = state.items.find((entry) => entry.id === dishId);
      return item ? item.quantity : 0;
    },
  },
  actions: {
    load() {
      this.items = storage.getCart();
      const validIds = this.items.map((item) => item.id);
      this.selectedIds = this.loaded
        ? this.selectedIds.filter((id) => validIds.includes(id))
        : validIds;
      this.loaded = true;
      syncTabBarBadge(this.totalCount);
    },
    persist() {
      storage.setCart(this.items);
      syncTabBarBadge(this.totalCount);
    },
    add(dish, quantity = 1) {
      const existing = this.items.find((item) => item.id === dish.id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        this.items.push({
          ...dish,
          quantity,
          addTime: new Date().getTime(),
        });
      }
      if (!this.selectedIds.includes(dish.id)) {
        this.selectedIds.push(dish.id);
      }
      this.persist();
    },
    setQuantity(dishId, quantity) {
      const index = this.items.findIndex((item) => item.id === dishId);
      if (index === -1) return;
      if (quantity <= 0) {
        this.items.splice(index, 1);
        this.selectedIds = this.selectedIds.filter((id) => id !== dishId);
      } else {
        this.items[index].quantity = quantity;
      }
      this.persist();
    },
    remove(dishId) {
      this.items = this.items.filter((item) => item.id !== dishId);
      this.selectedIds = this.selectedIds.filter((id) => id !== dishId);
      this.persist();
    },
    removeSelected() {
      this.items = this.items.filter(
        (item) => !this.selectedIds.includes(item.id),
      );
      this.selectedIds = [];
      this.persist();
    },
    toggleSelect(dishId) {
      if (this.selectedIds.includes(dishId)) {
        this.selectedIds = this.selectedIds.filter((id) => id !== dishId);
      } else {
        this.selectedIds = [...this.selectedIds, dishId];
      }
    },
    toggleSelectAll() {
      this.selectedIds = this.allSelected
        ? []
        : this.items.map((item) => item.id);
    },
  },
});
