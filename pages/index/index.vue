<template>
  <view class="page">
    <view class="header">
      <view class="header-top">
        <view class="greeting">
          <text class="greeting-title">{{ t("home.greeting") }}</text>
          <text class="greeting-sub">{{ t("home.subGreeting") }}</text>
        </view>
        <view class="lang-pill" @click="toggleLanguage">
          <text class="lang-icon">🌐</text>
          <text class="lang-label">{{ languageShort }}</text>
        </view>
      </view>
      <view class="search-bar" @click="goToSearch">
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

      <scroll-view
        class="dish-list"
        scroll-y
        :refresher-enabled="true"
        :refresher-triggered="refreshing"
        @refresherrefresh="onRefresh"
      >
        <view v-if="todayPick" class="pick-card" @click="goToDetail(todayPick)">
          <view class="pick-info">
            <text class="pick-badge">{{ t("home.todayPick") }}</text>
            <text class="pick-name">{{ getDishName(todayPick) }}</text>
            <text class="pick-desc">{{ getDishDescription(todayPick) }}</text>
          </view>
          <image
            class="pick-image"
            :src="todayPick.image"
            mode="aspectFill"
          />
        </view>

        <view v-if="recentDishes.length > 0" class="recent-section">
          <view class="section-title-row">
            <text class="section-title">{{ t("home.recentViewed") }}</text>
          </view>
          <scroll-view
            class="recent-scroll"
            scroll-x
            :enhanced="true"
            :show-scrollbar="false"
          >
            <view class="recent-track">
              <view
                v-for="dish in recentDishes"
                :key="dish.id"
                class="recent-item"
                @click="goToDetail(dish)"
              >
                <image
                  class="recent-image"
                  :src="dish.image"
                  mode="aspectFill"
                />
                <text class="recent-name">{{ getDishName(dish) }}</text>
              </view>
            </view>
          </scroll-view>
        </view>

        <dish-card
          v-for="dish in currentDishes"
          :key="dish.id"
          :dish="dish"
          @click="goToDetail"
          @longpress="showQuickMenu"
        >
          <template #actions>
            <quantity-stepper
              :quantity="cartStore.quantityOf(dish.id)"
              @increase="increase(dish)"
              @decrease="decrease(dish)"
            />
          </template>
        </dish-card>

        <view class="list-safe-space" />
      </scroll-view>
    </view>

    <view v-if="cartStore.totalCount > 0" class="checkout-bar">
      <view class="checkout-left" @click="goToCart">
        <view class="checkout-icon-wrap">
          <text class="checkout-icon">🛒</text>
          <view class="checkout-badge">{{ cartStore.totalCount }}</view>
        </view>
        <text class="checkout-count">{{ cartCountText }}</text>
      </view>
      <view class="checkout-btn" @click="goToShoppingList">
        <text class="checkout-btn-text">{{ t("home.checkout") }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { onShow } from "@dcloudio/uni-app";
import { useAppStore } from "@/stores/app";
import { useCartStore } from "@/stores/cart";
import { useFavoritesStore } from "@/stores/favorites";
import { dataService, storage, dishes } from "@/data";
import {
  formatMessage,
  getCategoryName,
  getDishDescription,
  getDishName,
} from "@/utils/i18n";
import { syncGlobalI18nUI } from "@/utils/ui";

const { t } = useI18n();
const appStore = useAppStore();
const cartStore = useCartStore();
const favoritesStore = useFavoritesStore();

const categories = ref([]);
const currentCategoryId = ref(1);
const recentDishes = ref([]);
const refreshing = ref(false);

const currentDishes = computed(() => {
  void appStore.language;
  return dataService.getDishesByCategory(currentCategoryId.value);
});

const todayPick = computed(() => {
  void appStore.language;
  if (dishes.length === 0) return null;
  const dayIndex = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
      86400000,
  );
  return dataService.getDishById(dishes[dayIndex % dishes.length].id);
});

const languageShort = computed(() =>
  appStore.language === "zh-CN" ? "中" : "EN",
);

const cartCountText = computed(() =>
  formatMessage(t("cart.totalCount"), { count: cartStore.totalCount }),
);

const selectCategory = (id) => {
  currentCategoryId.value = id;
};

const toggleLanguage = () => {
  appStore.toggleLanguage();
  syncGlobalI18nUI();
  loadRecent();
};

const increase = (dish) => {
  cartStore.add(dish);
};

const decrease = (dish) => {
  cartStore.setQuantity(dish.id, cartStore.quantityOf(dish.id) - 1);
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

const goToShoppingList = () => {
  uni.navigateTo({
    url: "/pkg-tools/shopping/shopping",
  });
};

const showQuickMenu = (dish) => {
  const favored = favoritesStore.isFavorite(dish.id);
  uni.showActionSheet({
    itemList: [
      t("dish.addToCart"),
      favored ? t("dish.unfavorite") : t("dish.favorite"),
    ],
    success: (res) => {
      if (res.tapIndex === 0) {
        increase(dish);
        uni.showToast({ title: t("cart.addedSuccess"), icon: "success" });
      } else if (res.tapIndex === 1) {
        favoritesStore.toggle(dish);
        uni.showToast({ title: t("common.success"), icon: "success" });
      }
    },
  });
};

const loadRecent = () => {
  recentDishes.value = storage.getHistory().slice(0, 10);
};

const onRefresh = () => {
  refreshing.value = true;
  loadRecent();
  setTimeout(() => {
    refreshing.value = false;
  }, 500);
};

onMounted(() => {
  categories.value = dataService.getCategories();
  loadRecent();
});

onShow(() => {
  loadRecent();
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
  padding: 24rpx 24rpx 20rpx;
  background-color: var(--bg);
}

.header-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20rpx;
}

.greeting {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.greeting-title {
  font-size: 38rpx;
  font-weight: 700;
  color: var(--text-strong);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.greeting-sub {
  margin-top: 6rpx;
  font-size: 24rpx;
  color: var(--text-weak);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.lang-pill {
  flex-shrink: 0;
  width: 104rpx;
  height: 56rpx;
  margin-left: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6rpx;
  background-color: #fff;
  border-radius: 999rpx;
  box-shadow: var(--shadow-card);
}

.lang-icon {
  font-size: 26rpx;
}

.lang-label {
  font-size: 24rpx;
  font-weight: 700;
  color: var(--primary);
}

.search-bar {
  display: flex;
  align-items: center;
  padding: 18rpx 28rpx;
  background-color: #fff;
  border-radius: 999rpx;
  box-shadow: var(--shadow-card);
}

.search-icon {
  font-size: 28rpx;
  margin-right: 14rpx;
}

.search-placeholder {
  flex: 1;
  min-width: 0;
  font-size: 26rpx;
  color: var(--text-faint);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.category-sidebar {
  width: 176rpx;
  flex-shrink: 0;
  background-color: transparent;
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 26rpx 10rpx;
  margin: 8rpx 12rpx;
  border-radius: 16rpx;
  position: relative;
}

.category-item.active {
  background-color: #fff;
  box-shadow: var(--shadow-card);
}

.category-item.active::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 8rpx;
  height: 48rpx;
  border-radius: 8rpx;
  background: var(--gradient-primary);
}

.category-icon {
  font-size: 40rpx;
  margin-bottom: 10rpx;
  flex-shrink: 0;
}

.category-name {
  display: block;
  width: 100%;
  font-size: 23rpx;
  color: var(--text-normal);
  text-align: center;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-word;
}

.category-item.active .category-name {
  color: var(--primary);
  font-weight: 700;
}

.dish-list {
  flex: 1;
  min-width: 0;
  padding: 4rpx 20rpx 0;
}

.pick-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 24rpx;
  padding: 28rpx;
  margin-bottom: 24rpx;
  background: linear-gradient(135deg, #ff6b6b, #ff8e53);
  box-shadow: 0 12rpx 28rpx rgba(255, 107, 107, 0.28);
  overflow: hidden;
}

.pick-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.pick-badge {
  align-self: flex-start;
  font-size: 20rpx;
  font-weight: 700;
  color: #ff6b6b;
  background-color: #fff;
  border-radius: 999rpx;
  padding: 4rpx 16rpx;
  margin-bottom: 14rpx;
}

.pick-name {
  font-size: 34rpx;
  font-weight: 700;
  color: #fff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.pick-desc {
  margin-top: 8rpx;
  font-size: 23rpx;
  color: rgba(255, 255, 255, 0.85);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-word;
}

.pick-image {
  width: 168rpx;
  height: 168rpx;
  flex-shrink: 0;
  margin-left: 20rpx;
  border-radius: 18rpx;
  border: 4rpx solid rgba(255, 255, 255, 0.6);
}

.recent-section {
  margin-bottom: 24rpx;
}

.section-title-row {
  display: flex;
  align-items: center;
  margin-bottom: 16rpx;
}

.section-title {
  font-size: 28rpx;
  font-weight: 700;
  color: var(--text-strong);
}

.recent-scroll {
  width: 100%;
  white-space: nowrap;
}

.recent-track {
  display: inline-flex;
  gap: 16rpx;
}

.recent-item {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  width: 132rpx;
  flex-shrink: 0;
}

.recent-image {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  background-color: #f0ece6;
  border: 4rpx solid #fff;
  box-shadow: var(--shadow-card);
}

.recent-name {
  margin-top: 10rpx;
  width: 100%;
  font-size: 22rpx;
  color: var(--text-normal);
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.list-safe-space {
  height: 160rpx;
}

.checkout-bar {
  position: fixed;
  left: 24rpx;
  right: 24rpx;
  bottom: 24rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16rpx 16rpx 16rpx 28rpx;
  background-color: #2a2a2a;
  border-radius: 999rpx;
  box-shadow: 0 12rpx 32rpx rgba(0, 0, 0, 0.22);
}

.checkout-left {
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
}

.checkout-icon-wrap {
  position: relative;
  flex-shrink: 0;
}

.checkout-icon {
  font-size: 44rpx;
}

.checkout-badge {
  position: absolute;
  top: -10rpx;
  right: -16rpx;
  min-width: 34rpx;
  height: 34rpx;
  padding: 0 8rpx;
  background: var(--gradient-primary);
  border-radius: 999rpx;
  border: 2rpx solid #2a2a2a;
  font-size: 20rpx;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkout-count {
  margin-left: 20rpx;
  font-size: 25rpx;
  color: rgba(255, 255, 255, 0.85);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.checkout-btn {
  flex-shrink: 0;
  margin-left: 16rpx;
  padding: 18rpx 40rpx;
  border-radius: 999rpx;
  background: var(--gradient-primary);
}

.checkout-btn-text {
  font-size: 27rpx;
  font-weight: 700;
  color: #fff;
}
</style>
