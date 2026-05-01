<template>
  <view class="container" v-if="dish">
    <swiper class="dish-swiper" indicator-dots circular>
      <swiper-item>
        <image class="dish-image" :src="dish.image" mode="aspectFill" />
      </swiper-item>
    </swiper>

    <scroll-view class="content" scroll-y>
      <view class="dish-header">
        <text class="dish-name">{{ getDishName(dish) }}</text>
        <text class="dish-desc">{{ getDishDescription(dish) }}</text>
      </view>

      <view class="dish-meta">
        <view class="meta-item">
          <text class="meta-label">{{ t("dish.difficulty") }}:</text>
          <text class="meta-value">{{ getDifficultyLabel(dish) }}</text>
        </view>
        <view class="meta-item">
          <text class="meta-label">{{ t("dish.time") }}:</text>
          <text class="meta-value">{{ getDishTime(dish) }}</text>
        </view>
        <view class="meta-item">
          <text class="meta-label">{{ t("dish.calories") }}:</text>
          <text class="meta-value">{{ getDishCalories(dish) }}</text>
        </view>
      </view>

      <view class="section">
        <view class="section-header" @click="toggleIngredients">
          <text class="section-title">{{ t("dish.ingredients") }}</text>
          <text class="toggle-icon">{{ showIngredients ? "▼" : "▶" }}</text>
        </view>
        <view v-if="showIngredients" class="ingredient-list">
          <view
            v-for="(ingredient, index) in dish.ingredients"
            :key="index"
            class="ingredient-item"
          >
            <text class="ingredient-name">{{ ingredient.name }}</text>
            <text class="ingredient-amount">{{ ingredient.amount }}</text>
          </view>
        </view>
      </view>

      <view class="section">
        <view class="section-header" @click="togglePractice">
          <text class="section-title">{{ t("dish.practice") }}</text>
          <text class="toggle-icon">{{ showPractice ? "▼" : "▶" }}</text>
        </view>
        <view v-if="showPractice" class="practice-content">
          <text class="practice-text">{{ getDishPractice(dish) }}</text>
        </view>
      </view>
    </scroll-view>

    <view class="bottom-bar">
      <view
        class="favorite-btn"
        :class="{ animating: favoriteAnimating }"
        @click="toggleFavorite"
      >
        <text class="favorite-icon">{{ isFavorite ? "❤️" : "🤍" }}</text>
        <text class="favorite-text">{{
          isFavorite ? t("dish.unfavorite") : t("dish.favorite")
        }}</text>
      </view>
      <view class="cart-btn" :class="{ animating: cartAnimating }" @click="addToCart">
        <text class="cart-icon">🛒</text>
        <text class="cart-text">{{ t("dish.addToCart") }}</text>
      </view>
    </view>
  </view>

  <view v-else class="empty">
    <text class="empty-text">{{ t("empty.loadFailed") }}</text>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { onShow } from "@dcloudio/uni-app";
import { dataService, storage } from "@/data";
import {
  getDifficultyLabel,
  getDishCalories,
  getDishDescription,
  getDishName,
  getDishPractice,
  getDishTime,
} from "@/utils/i18n";
import { syncGlobalI18nUI } from "@/utils/ui";

const { t } = useI18n();

const dish = ref(null);
const dishId = ref(0);
const showIngredients = ref(true);
const showPractice = ref(true);
const isFavorite = ref(false);
const favoriteAnimating = ref(false);
const cartAnimating = ref(false);

const toggleIngredients = () => {
  showIngredients.value = !showIngredients.value;
};

const togglePractice = () => {
  showPractice.value = !showPractice.value;
};

const toggleFavorite = () => {
  if (!dish.value) return;
  const nextFavorite = !isFavorite.value;
  storage.toggleFavorite(dish.value);
  isFavorite.value = nextFavorite;
  triggerAnimation("favorite");
  uni.showToast({
    title: nextFavorite ? t("common.success") : t("favorite.removedSuccess"),
    icon: "success",
  });
};

const addToCart = () => {
  if (!dish.value) return;
  storage.addToCart(dish.value);
  triggerAnimation("cart");
  uni.showToast({
    title: t("cart.addedSuccess"),
    icon: "success",
  });
};

const loadDish = () => {
  dish.value = dataService.getDishById(dishId.value);
  syncFavoriteState();
  if (!dish.value) {
    uni.showToast({
      title: t("empty.loadFailed"),
      icon: "none",
    });
  }
};

const syncFavoriteState = () => {
  if (!dish.value) {
    isFavorite.value = false;
    return;
  }

  const favorites = storage.getFavorites();
  isFavorite.value = favorites.some((item) => item.id === dish.value.id);
};

const triggerAnimation = (type) => {
  if (type === "favorite") {
    favoriteAnimating.value = true;
    setTimeout(() => {
      favoriteAnimating.value = false;
    }, 320);
    return;
  }

  cartAnimating.value = true;
  setTimeout(() => {
    cartAnimating.value = false;
  }, 320);
};

onMounted(() => {
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1];
  const options = currentPage.options;
  dishId.value = parseInt(options.id) || 0;
  loadDish();
});

onShow(() => {
  syncFavoriteState();
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

.dish-swiper {
  width: 100%;
  height: 500rpx;
}

.dish-image {
  width: 100%;
  height: 100%;
}

.content {
  flex: 1;
  padding: 30rpx;
}

.dish-header {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
}

.dish-name {
  font-size: 40rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 15rpx;
}

.dish-desc {
  font-size: 28rpx;
  color: #666;
  line-height: 1.6;
}

.dish-meta {
  display: flex;
  justify-content: space-around;
  background-color: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
}

.meta-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.meta-label {
  font-size: 24rpx;
  color: #999;
  margin-bottom: 10rpx;
}

.meta-value {
  font-size: 28rpx;
  color: #ff6b6b;
  font-weight: bold;
}

.section {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.toggle-icon {
  font-size: 24rpx;
  color: #999;
}

.ingredient-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.ingredient-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx;
  background-color: #f9f9f9;
  border-radius: 12rpx;
}

.ingredient-name {
  font-size: 28rpx;
  color: #333;
}

.ingredient-amount {
  font-size: 26rpx;
  color: #ff6b6b;
  font-weight: bold;
}

.practice-content {
  padding: 20rpx;
  background-color: #f9f9f9;
  border-radius: 12rpx;
}

.practice-text {
  font-size: 28rpx;
  color: #333;
  line-height: 1.8;
}

.bottom-bar {
  display: flex;
  gap: 20rpx;
  padding: 20rpx 30rpx;
  background-color: #fff;
  border-top: 1rpx solid #eee;
}

.favorite-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20rpx;
  border: 2rpx solid #ff6b6b;
  border-radius: 12rpx;
  transition:
    transform 0.28s ease,
    box-shadow 0.28s ease,
    background-color 0.28s ease;
}

.favorite-icon {
  font-size: 40rpx;
  margin-bottom: 8rpx;
}

.favorite-text {
  font-size: 24rpx;
  color: #ff6b6b;
}

.cart-btn {
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10rpx;
  padding: 20rpx;
  background-color: #ff6b6b;
  border-radius: 12rpx;
  transition:
    transform 0.28s ease,
    box-shadow 0.28s ease,
    background-color 0.28s ease;
}

.favorite-btn.animating,
.cart-btn.animating {
  transform: scale(1.04);
  box-shadow: 0 12rpx 28rpx rgba(255, 107, 107, 0.22);
}

.cart-icon {
  font-size: 36rpx;
}

.cart-text {
  font-size: 28rpx;
  color: #fff;
  font-weight: bold;
}

.empty {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.empty-text {
  font-size: 28rpx;
  color: #999;
}
</style>
