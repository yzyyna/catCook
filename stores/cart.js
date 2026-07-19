import { defineStore } from "pinia";
import { storage } from "@/data";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
    selectedIds: [],
  }),
  getters: {
    totalCount: (state) =>
      state.items.reduce((sum, item) => sum + item.quantity, 0),
    selectedCount: (state) => state.selectedIds.length,
    selectedItems: (state) =>
      state.items.filter((item) => state.selectedIds.includes(item.id)),
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
      // 清理已不存在的选中项
      this.selectedIds = this.selectedIds.filter((id) =>
        this.items.some((item) => item.id === id),
      );
    },
    add(dish) {
      storage.addToCart(dish);
      this.load();
    },
    remove(dishId) {
      storage.removeFromCart(dishId);
      this.selectedIds = this.selectedIds.filter((id) => id !== dishId);
      this.load();
    },
    removeSelected() {
      this.selectedIds.forEach((id) => storage.removeFromCart(id));
      this.selectedIds = [];
      this.load();
    },
    setQuantity(dishId, quantity) {
      storage.updateCartQuantity(dishId, quantity);
      this.load();
    },
    toggleSelect(id) {
      if (this.selectedIds.includes(id)) {
        this.selectedIds = this.selectedIds.filter((itemId) => itemId !== id);
      } else {
        this.selectedIds = [...this.selectedIds, id];
      }
    },
    toggleSelectAll() {
      if (this.allSelected) {
        this.selectedIds = [];
      } else {
        this.selectedIds = this.items.map((item) => item.id);
      }
    },
  },
});
