<template>
  <view class="container">
    <view class="search-bar" @click="goToSearch">
      <view class="search-input">
        <text class="search-icon">🔍</text>
        <text class="search-placeholder">{{ t("search.placeholder") }}</text>
      </view>
    </view>

    <view class="content">
      <scroll-view class="category-sidebar" scroll-y>
        <view
          v-for="category in categories"
          :key="category.id"
          class="category-item"
          :class="{ active: currentCategoryId === category.id }"
          @click="selectCategory(category.id)"
        >
          <text class="category-icon">{{ category.icon }}</text>
          <text class="category-name">{{ getCategoryName(category) }}</text>
        </view>
      </scroll-view>

      <scroll-view class="dish-list" scroll-y @scrolltolower="loadMore">
        <view
          v-for="dish in currentDishes"
          :key="dish.id"
          class="dish-card"
          @click="goToDetail(dish)"
          @longpress="showQuickMenu(dish)"
        >
          <image class="dish-image" :src="dish.image" mode="aspectFill" />
          <view class="dish-info">
            <text class="dish-name">{{ dish.name }}</text>
            <text class="dish-desc">{{ dish.description }}</text>
            <view class="dish-meta">
              <text class="meta-item">{{ getDifficultyLabel(dish) }}</text>
              <text class="meta-item">{{ dish.time }}</text>
              <text class="meta-item">{{ dish.calories }}</text>
            </view>
          </view>
          <view class="dish-actions" @click.stop="addToCart(dish)">
            <text class="add-icon">+</text>
          </view>
        </view>
      </scroll-view>
    </view>

    <view class="cart-float" @click="goToCart">
      <text class="cart-icon">🛒</text>
      <view v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useAppStore } from "@/stores/app";
import { dataService, storage } from "@/data";
import { getCategoryName, getDifficultyLabel } from "@/utils/i18n";

const { t } = useI18n();
const appStore = useAppStore();

const categories = ref([]);
const currentCategoryId = ref(1);
const cartCount = ref(0);

const currentDishes = computed(() => {
  return dataService.getDishesByCategory(currentCategoryId.value);
});

const selectCategory = (id) => {
  currentCategoryId.value = id;
};

const goToDetail = (dish) => {
  storage.addToHistory(dish);
  uni.navigateTo({
    url: `/pages/detail/detail?id=${dish.id}`,
  });
};

const goToSearch = () => {
  uni.navigateTo({
    url: "/pages/search/search",
  });
};

const goToCart = () => {
  uni.switchTab({
    url: "/pages/cart/cart",
  });
};

const addToCart = (dish) => {
  storage.addToCart(dish);
  updateCartCount();
  uni.showToast({
    title: t("cart.addedSuccess"),
    icon: "success",
  });
};

const showQuickMenu = (dish) => {
  uni.showActionSheet({
    itemList: [t("dish.addToCart"), t("dish.favorite")],
    success: (res) => {
      if (res.tapIndex === 0) {
        addToCart(dish);
      } else if (res.tapIndex === 1) {
        storage.toggleFavorite(dish);
        uni.showToast({
          title: t("common.success"),
          icon: "success",
        });
      }
    },
  });
};

const updateCartCount = () => {
  const cart = storage.getCart();
  cartCount.value = cart.reduce((sum, item) => sum + item.quantity, 0);
};

const loadMore = () => {
  console.log("load more");
};

onMounted(() => {
  categories.value = dataService.getCategories();
  updateCartCount();
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
}

.search-bar {
  padding: 20rpx;
  background-color: #fff;
}

.search-input {
  display: flex;
  align-items: center;
  padding: 20rpx 30rpx;
  background-color: #f5f5f5;
  border-radius: 40rpx;
}

.search-icon {
  font-size: 32rpx;
  margin-right: 10rpx;
}

.search-placeholder {
  font-size: 28rpx;
  color: #999;
}

.content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.category-sidebar {
  width: 180rpx;
  background-color: #fff;
  border-right: 1rpx solid #eee;
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30rpx 20rpx;
  border-bottom: 1rpx solid #f5f5f5;
}

.category-item.active {
  background-color: #fff5f5;
  border-left: 6rpx solid #ff6b6b;
}

.category-icon {
  font-size: 48rpx;
  margin-bottom: 10rpx;
}

.category-name {
  font-size: 24rpx;
  color: #333;
}

.category-item.active .category-name {
  color: #ff6b6b;
  font-weight: bold;
}

.dish-list {
  flex: 1;
  padding: 20rpx;
}

.dish-card {
  display: flex;
  background-color: #fff;
  border-radius: 16rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.dish-image {
  width: 160rpx;
  height: 160rpx;
  border-radius: 12rpx;
  margin-right: 20rpx;
}

.dish-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.dish-name {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 10rpx;
}

.dish-desc {
  font-size: 24rpx;
  color: #666;
  margin-bottom: 10rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dish-meta {
  display: flex;
  gap: 20rpx;
}

.meta-item {
  font-size: 22rpx;
  color: #999;
  padding: 4rpx 12rpx;
  background-color: #f5f5f5;
  border-radius: 8rpx;
}

.dish-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60rpx;
  height: 60rpx;
  background-color: #ff6b6b;
  border-radius: 50%;
}

.add-icon {
  font-size: 40rpx;
  color: #fff;
  font-weight: bold;
}

.cart-float {
  position: fixed;
  right: 40rpx;
  bottom: 200rpx;
  width: 100rpx;
  height: 100rpx;
  background-color: #ff6b6b;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 20rpx rgba(255, 107, 107, 0.4);
}

.cart-icon {
  font-size: 48rpx;
}

.cart-badge {
  position: absolute;
  top: 0;
  right: 0;
  min-width: 36rpx;
  height: 36rpx;
  padding: 0 10rpx;
  background-color: #ff4757;
  border-radius: 18rpx;
  font-size: 20rpx;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2rpx solid #fff;
}
</style>
