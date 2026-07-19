<template>
  <view class="page">
    <template v-if="cartStore.items.length > 0">
      <view class="header">
        <text class="header-title">{{ t("cart.title") }}</text>
        <text class="header-count">{{ countText }}</text>
      </view>

      <scroll-view class="cart-list" scroll-y>
        <dish-card
          v-for="item in cartStore.items"
          :key="item.id"
          :dish="item"
          :selected="isSelected(item.id)"
          @click="goToDetail"
        >
          <template #leading>
            <view
              class="check-circle"
              :class="{ checked: isSelected(item.id) }"
              @click.stop="cartStore.toggleSelect(item.id)"
            >
              <text v-if="isSelected(item.id)" class="check-mark">✓</text>
            </view>
          </template>
          <template #actions>
            <quantity-stepper
              :quantity="item.quantity"
              @increase="cartStore.setQuantity(item.id, item.quantity + 1)"
              @decrease="onDecrease(item)"
            />
            <text class="delete-link" @click.stop="removeItem(item)">{{
              t("common.delete")
            }}</text>
          </template>
        </dish-card>
        <view class="list-safe-space" />
      </scroll-view>

      <view class="bottom-bar">
        <view class="select-all" @click="cartStore.toggleSelectAll()">
          <view class="check-circle" :class="{ checked: cartStore.allSelected }">
            <text v-if="cartStore.allSelected" class="check-mark">✓</text>
          </view>
          <text class="select-all-text">{{ t("common.selectAll") }}</text>
        </view>
        <view class="bottom-actions">
          <view class="delete-btn" @click="deleteSelected">
            <text class="delete-btn-text">{{ t("cart.deleteSelected") }}</text>
          </view>
          <view class="primary-btn" @click="generateShoppingList">
            <text class="primary-btn-text">{{ generateText }}</text>
          </view>
        </view>
      </view>
    </template>

    <empty-state
      v-else
      icon="🛒"
      :title="t('cart.empty')"
      :tip="t('cart.emptyTip')"
      :button-text="t('empty.noDataTip')"
      @action="goToHome"
    />
  </view>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { onShow } from "@dcloudio/uni-app";
import { useCartStore } from "@/stores/cart";
import { storage } from "@/data";
import { formatMessage } from "@/utils/i18n";
import { syncGlobalI18nUI } from "@/utils/ui";

const { t } = useI18n();
const cartStore = useCartStore();

const countText = computed(() =>
  cartStore.selectedCount > 0
    ? formatMessage(t("cart.selectedCount"), {
        count: cartStore.selectedCount,
      })
    : formatMessage(t("cart.totalCount"), { count: cartStore.totalCount }),
);

const generateText = computed(
  () => `${t("cart.generateList")} (${cartStore.selectedCount})`,
);

const isSelected = (id) => cartStore.selectedIds.includes(id);

const onDecrease = (item) => {
  if (item.quantity <= 1) {
    removeItem(item);
    return;
  }
  cartStore.setQuantity(item.id, item.quantity - 1);
};

const removeItem = (item) => {
  uni.showModal({
    title: t("common.confirm"),
    content: t("cart.deleteConfirm"),
    confirmText: t("common.confirm"),
    cancelText: t("common.cancel"),
    success: (res) => {
      if (res.confirm) {
        cartStore.remove(item.id);
        uni.showToast({ title: t("cart.removedSuccess"), icon: "success" });
      }
    },
  });
};

const deleteSelected = () => {
  if (cartStore.selectedCount === 0) {
    uni.showToast({ title: t("cart.select"), icon: "none" });
    return;
  }
  uni.showModal({
    title: t("common.confirm"),
    content: t("cart.deleteSelectedConfirm"),
    confirmText: t("common.confirm"),
    cancelText: t("common.cancel"),
    success: (res) => {
      if (res.confirm) {
        cartStore.removeSelected();
        uni.showToast({
          title: t("cart.deletedSelectedSuccess"),
          icon: "success",
        });
      }
    },
  });
};

const generateShoppingList = () => {
  if (cartStore.selectedCount === 0) {
    uni.showToast({ title: t("cart.select"), icon: "none" });
    return;
  }
  uni.navigateTo({
    url: "/pkg-tools/shopping/shopping",
  });
};

const goToDetail = (dish) => {
  storage.addToHistory(dish);
  uni.navigateTo({
    url: `/pkg-discover/detail/detail?id=${dish.id}`,
  });
};

const goToHome = () => {
  uni.switchTab({
    url: "/pages/index/index",
  });
};

onShow(() => {
  cartStore.load();
  syncGlobalI18nUI();
});
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: var(--bg);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 28rpx 28rpx 16rpx;
}

.header-title {
  font-size: 36rpx;
  font-weight: 700;
  color: var(--text-strong);
}

.header-count {
  font-size: 25rpx;
  color: var(--primary);
  font-weight: 600;
}

.cart-list {
  flex: 1;
  padding: 8rpx 24rpx 0;
}

.check-circle {
  width: 42rpx;
  height: 42rpx;
  border-radius: 50%;
  border: 3rpx solid #d8d2cc;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.check-circle.checked {
  border-color: transparent;
  background: var(--gradient-primary);
}

.check-mark {
  font-size: 26rpx;
  color: #fff;
  font-weight: 700;
  line-height: 1;
}

.delete-link {
  margin-top: 14rpx;
  font-size: 23rpx;
  color: var(--text-faint);
  padding: 4rpx 8rpx;
}

.list-safe-space {
  height: 40rpx;
}

.bottom-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16rpx;
  padding: 20rpx 24rpx calc(20rpx + env(safe-area-inset-bottom));
  background-color: #fff;
  border-top: 1rpx solid #f0ece6;
}

.select-all {
  display: flex;
  align-items: center;
  gap: 12rpx;
  flex-shrink: 0;
}

.select-all-text {
  font-size: 26rpx;
  color: var(--text-normal);
}

.bottom-actions {
  display: flex;
  align-items: center;
  gap: 16rpx;
  flex: 1;
  min-width: 0;
  justify-content: flex-end;
}

.delete-btn {
  flex-shrink: 0;
  padding: 16rpx 28rpx;
  border-radius: 999rpx;
  background-color: #f7f3ef;
}

.delete-btn-text {
  font-size: 25rpx;
  color: var(--text-weak);
}

.primary-btn {
  flex-shrink: 0;
  max-width: 100%;
  padding: 16rpx 32rpx;
  border-radius: 999rpx;
  background: var(--gradient-primary);
  box-shadow: 0 8rpx 20rpx rgba(255, 107, 107, 0.3);
}

.primary-btn-text {
  font-size: 26rpx;
  font-weight: 700;
  color: #fff;
  white-space: nowrap;
}
</style>
