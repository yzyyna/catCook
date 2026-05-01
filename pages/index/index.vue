<template>
  <view class="container">
    <view class="header-bar">
      <view class="search-bar" @click="goToSearch">
        <text class="search-icon">🔍</text>
        <text class="search-placeholder">{{ t("search.placeholder") }}</text>
      </view>
      <view class="language-switch" @click="toggleLanguage">
        <text class="lang-icon">{{ currentLanguageIcon }}</text>
        <text class="lang-text">{{ currentLanguageName }}</text>
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
            <text class="dish-name">{{ getDishName(dish) }}</text>
            <text class="dish-desc">{{ getDishDescription(dish) }}</text>
            <view class="dish-meta">
              <text class="meta-item">{{ getDifficultyLabel(dish) }}</text>
              <text class="meta-item">{{ getDishTime(dish) }}</text>
              <text class="meta-item">{{ getDishCalories(dish) }}</text>
            </view>
          </view>
          <view
            class="dish-actions"
            :class="{ animating: animatingCartDishId === dish.id }"
            @click.stop="addToCart(dish)"
          >
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
import { onShow } from "@dcloudio/uni-app";
import { useAppStore } from "@/stores/app";
import { dataService, storage } from "@/data";
import {
  getCategoryName,
  getDifficultyLabel,
  getDishCalories,
  getDishDescription,
  getDishName,
  getDishTime,
} from "@/utils/i18n";
import { syncGlobalI18nUI } from "@/utils/ui";

const { t } = useI18n();
const appStore = useAppStore();

const categories = ref([]);
const currentCategoryId = ref(1);
const cartCount = ref(0);
const animatingCartDishId = ref(null);

const currentDishes = computed(() => {
  return dataService.getDishesByCategory(currentCategoryId.value);
});

const currentLanguageInfo = computed(() => {
  return appStore.getCurrentLanguageInfo;
});

const currentLanguageIcon = computed(() => {
  return currentLanguageInfo.value?.flag || "🌐";
});

const currentLanguageName = computed(() => {
  return currentLanguageInfo.value?.name || "中文";
});

const selectCategory = (id) => {
  currentCategoryId.value = id;
};

const toggleLanguage = () => {
  appStore.toggleLanguage();
  syncGlobalI18nUI();
};

const goToDetail = (dish) => {
  storage.addToHistory(dish);
  uni.navigateTo({
    url: `/pkg-discover/detail/detail?id=${dish.id}`,
  });
};

const goToSearch = () => {
  uni.navigateTo({
    url: "/pkg-discover/search/search",
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
  animateCartButton(dish.id);
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

const animateCartButton = (dishId) => {
  animatingCartDishId.value = dishId;
  setTimeout(() => {
    if (animatingCartDishId.value === dishId) {
      animatingCartDishId.value = null;
    }
  }, 320);
};

onMounted(() => {
  categories.value = dataService.getCategories();
  updateCartCount();
});

onShow(() => {
  updateCartCount();
  syncGlobalI18nUI();
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
}

.header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx;
  background-color: #fff;
  border-bottom: 1rpx solid #eee;
}

.search-bar {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 15rpx 25rpx;
  background-color: #f5f5f5;
  border-radius: 40rpx;
  margin-right: 20rpx;
}

.search-icon {
  font-size: 32rpx;
}

.search-placeholder {
  font-size: 28rpx;
  color: #999;
}

.language-switch {
  display: flex;
  align-items: center;
  gap: 10rpx;
  padding: 15rpx 25rpx;
  background-color: #f5f5f5;
  border-radius: 40rpx;
}

.lang-icon {
  font-size: 32rpx;
}

.lang-text {
  font-size: 26rpx;
  color: #ff6b6b;
  font-weight: bold;
}

.content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.category-sidebar {
  width: 230rpx;
  flex-shrink: 0;
  background-color: #fff;
  border-right: 1rpx solid #eee;
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 164rpx;
  padding: 28rpx 16rpx;
  border-bottom: 1rpx solid #f5f5f5;
  box-sizing: border-box;
}

.category-item.active {
  background-color: #fff5f5;
  border-left: 6rpx solid #ff6b6b;
}

.category-icon {
  font-size: 48rpx;
  margin-bottom: 12rpx;
  flex-shrink: 0;
}

.category-name {
  display: block;
  width: 100%;
  max-width: 180rpx;
  min-height: 68rpx;
  font-size: 24rpx;
  color: #333;
  text-align: center;
  line-height: 1.4;
  word-break: break-word;
  overflow-wrap: anywhere;
}

.category-item.active .category-name {
  color: #ff6b6b;
  font-weight: bold;
}

.dish-list {
  flex: 1;
  min-width: 0;
  padding: 20rpx;
}

.dish-card {
  display: flex;
  align-items: flex-start;
  background-color: #fff;
  border-radius: 16rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  overflow: hidden;
}

.dish-image {
  width: 160rpx;
  height: 160rpx;
  flex-shrink: 0;
  border-radius: 12rpx;
  margin-right: 20rpx;
}

.dish-info {
  flex: 1;
  min-width: 0;
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
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-word;
}

.dish-meta {
  display: flex;
  flex-wrap: wrap;
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
  flex-shrink: 0;
  margin-left: 16rpx;
  background-color: #ff6b6b;
  border-radius: 50%;
  transition:
    transform 0.28s ease,
    box-shadow 0.28s ease,
    background-color 0.28s ease;
  transform: scale(1);
  box-shadow: 0 8rpx 20rpx rgba(255, 107, 107, 0.22);
}

.dish-actions.animating {
  transform: scale(1.16);
  box-shadow: 0 12rpx 28rpx rgba(255, 107, 107, 0.36);
  background-color: #ff8787;
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
