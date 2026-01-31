<template>
  <view class="container">
    <view v-if="cart.length > 0" class="content">
      <view class="cart-header">
        <text class="cart-title">{{ t("cart.title") }}</text>
        <text class="cart-count">{{
          t("cart.totalCount", { count: totalCount })
        }}</text>
      </view>

      <scroll-view class="cart-list" scroll-y>
        <view v-for="item in cart" :key="item.id" class="cart-item">
          <image class="item-image" :src="item.image" mode="aspectFill" />
          <view class="item-info">
            <text class="item-name">{{ item.name }}</text>
            <text class="item-desc">{{ item.description }}</text>
          </view>
          <view class="item-actions">
            <view class="quantity-control">
              <view class="quantity-btn" @click="decreaseQuantity(item)">
                <text>-</text>
              </view>
              <text class="quantity-text">{{ item.quantity }}</text>
              <view class="quantity-btn" @click="increaseQuantity(item)">
                <text>+</text>
              </view>
            </view>
            <view class="delete-btn" @click="removeFromCart(item)">
              <text>{{ t("common.delete") }}</text>
            </view>
          </view>
        </view>
      </scroll-view>

      <view class="bottom-bar">
        <view class="select-all" @click="toggleSelectAll">
          <text class="select-icon">{{ allSelected ? "☑️" : "☐" }}</text>
          <text class="select-text">{{ t("common.selectAll") }}</text>
        </view>
        <view class="action-buttons">
          <view class="action-btn delete" @click="deleteSelected">
            <text>{{ t("cart.deleteSelected") }}</text>
          </view>
          <view class="action-btn primary" @click="generateShoppingList">
            <text>{{ t("cart.generateList") }}</text>
          </view>
        </view>
      </view>
    </view>

    <view v-else class="empty">
      <text class="empty-icon">🛒</text>
      <text class="empty-text">{{ t("cart.empty") }}</text>
      <text class="empty-tip">{{ t("cart.emptyTip") }}</text>
      <view class="empty-btn" @click="goToHome">
        <text>{{ t("dish.addToCart") }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useAppStore } from "@/stores/app";
import { dataService, storage } from "@/data";

const { t } = useI18n();
const appStore = useAppStore();

const cart = ref([]);
const allSelected = ref(false);

const totalCount = computed(() => {
  return cart.value.reduce((sum, item) => sum + item.quantity, 0);
});

const loadCart = () => {
  cart.value = storage.getCart();
};

const increaseQuantity = (item) => {
  storage.updateCartQuantity(item.id, item.quantity + 1);
  loadCart();
};

const decreaseQuantity = (item) => {
  if (item.quantity > 1) {
    storage.updateCartQuantity(item.id, item.quantity - 1);
  } else {
    removeFromCart(item);
    return;
  }
  loadCart();
};

const removeFromCart = (item) => {
  uni.showModal({
    title: t("common.confirm"),
    content: t("cart.deleteConfirm"),
    success: (res) => {
      if (res.confirm) {
        storage.removeFromCart(item.id);
        loadCart();
        uni.showToast({
          title: t("cart.removedSuccess"),
          icon: "success",
        });
      }
    },
  });
};

const toggleSelectAll = () => {
  allSelected.value = !allSelected.value;
};

const deleteSelected = () => {
  if (!allSelected.value) {
    uni.showToast({
      title: t("cart.select"),
      icon: "none",
    });
    return;
  }
  uni.showModal({
    title: t("common.confirm"),
    content: t("cart.clearConfirm"),
    success: (res) => {
      if (res.confirm) {
        storage.clearCart();
        loadCart();
        uni.showToast({
          title: t("cart.clearedSuccess"),
          icon: "success",
        });
      }
    },
  });
};

const generateShoppingList = () => {
  if (cart.value.length === 0) {
    uni.showToast({
      title: t("cart.empty"),
      icon: "none",
    });
    return;
  }
  uni.navigateTo({
    url: "/pages/shopping/shopping",
  });
};

const goToHome = () => {
  uni.switchTab({
    url: "/pages/index/index",
  });
};

onMounted(() => {
  loadCart();
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
}

.content {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx;
  background-color: #fff;
  border-bottom: 1rpx solid #eee;
}

.cart-title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
}

.cart-count {
  font-size: 26rpx;
  color: #ff6b6b;
}

.cart-list {
  flex: 1;
  padding: 20rpx;
}

.cart-item {
  display: flex;
  background-color: #fff;
  border-radius: 16rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.item-image {
  width: 160rpx;
  height: 160rpx;
  border-radius: 12rpx;
  margin-right: 20rpx;
}

.item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.item-name {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 10rpx;
}

.item-desc {
  font-size: 24rpx;
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 20rpx;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.quantity-btn {
  width: 60rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  border-radius: 8rpx;
  font-size: 32rpx;
  color: #333;
}

.quantity-text {
  font-size: 28rpx;
  color: #333;
  min-width: 60rpx;
  text-align: center;
}

.delete-btn {
  padding: 10rpx 20rpx;
  background-color: #ffecec;
  border-radius: 8rpx;
  font-size: 24rpx;
  color: #ff4757;
}

.bottom-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 30rpx;
  background-color: #fff;
  border-top: 1rpx solid #eee;
}

.select-all {
  display: flex;
  align-items: center;
  gap: 10rpx;
}

.select-icon {
  font-size: 36rpx;
}

.select-text {
  font-size: 28rpx;
  color: #333;
}

.action-buttons {
  display: flex;
  gap: 20rpx;
}

.action-btn {
  padding: 20rpx 40rpx;
  border-radius: 12rpx;
  font-size: 28rpx;
  font-weight: bold;
}

.action-btn.delete {
  background-color: #ffecec;
  color: #ff4757;
}

.action-btn.primary {
  background-color: #ff6b6b;
  color: #fff;
}

.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 0 60rpx;
}

.empty-icon {
  font-size: 120rpx;
  margin-bottom: 40rpx;
}

.empty-text {
  font-size: 32rpx;
  color: #333;
  margin-bottom: 20rpx;
}

.empty-tip {
  font-size: 26rpx;
  color: #999;
  margin-bottom: 60rpx;
}

.empty-btn {
  padding: 20rpx 60rpx;
  background-color: #ff6b6b;
  border-radius: 12rpx;
  font-size: 28rpx;
  color: #fff;
  font-weight: bold;
}
</style>
