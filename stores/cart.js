import { defineStore } from "pinia";
import { storage } from "@/data";

// 购物车 tabBar 角标（index 1）：数量 0 时移除，超过 99 显示 99+。
// App 启动时 tabBar 可能尚未挂载导致首次调用失败，失败后短延迟重试；
// badgeSeq 保证旧的重试不会覆盖新一次的同步结果。
let badgeSeq = 0;

function syncCartBadge(count) {
  const seq = ++badgeSeq;
  const attempt = (left) => {
    if (seq !== badgeSeq) return;
    try {
      if (count > 0) {
        uni.setTabBarBadge({
          index: 1,
          text: count > 99 ? "99+" : String(count),
          fail: () => {
            if (left > 0 && seq === badgeSeq) setTimeout(() => attempt(left - 1), 300);
          },
        });
      } else {
        uni.removeTabBarBadge({
          index: 1,
          fail: () => {
            if (left > 0 && seq === badgeSeq) setTimeout(() => attempt(left - 1), 300);
          },
        });
      }
    } catch (e) {
      if (left > 0 && seq === badgeSeq) setTimeout(() => attempt(left - 1), 300);
    }
  };
  attempt(2);
}

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
      syncCartBadge(this.totalCount);
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
