<template>
  <view v-if="dish" class="page">
    <scroll-view class="page-scroll" scroll-y>
      <view class="hero">
        <image class="hero-image" :src="dish.image" mode="aspectFill" />
      </view>

      <view class="body-card">
        <view class="title-row">
          <text class="dish-name">{{ getDishName(dish) }}</text>
          <text class="dish-desc">{{ getDishDescription(dish) }}</text>
        </view>

        <view class="stat-row">
          <view class="stat-item">
            <text class="stat-icon">🎯</text>
            <text class="stat-value">{{ getDifficultyLabel(dish) }}</text>
            <text class="stat-label">{{ t("dish.difficulty") }}</text>
          </view>
          <view class="stat-divider" />
          <view class="stat-item">
            <text class="stat-icon">⏱️</text>
            <text class="stat-value">{{ getDishTime(dish) }}</text>
            <text class="stat-label">{{ t("dish.time") }}</text>
          </view>
          <view class="stat-divider" />
          <view class="stat-item">
            <text class="stat-icon">🔥</text>
            <text class="stat-value">{{ getDishCalories(dish) }}</text>
            <text class="stat-label">{{ t("dish.calories") }}</text>
          </view>
        </view>

        <view class="section">
          <text class="section-title">{{ t("dish.ingredients") }}</text>
          <view class="ingredient-list">
            <view
              v-for="(ingredient, index) in dish.ingredients"
              :key="index"
              class="ingredient-row"
            >
              <text class="ingredient-name">{{ ingredient.name }}</text>
              <text class="ingredient-amount">{{ ingredient.amount }}</text>
            </view>
          </view>
        </view>

        <view class="section">
          <text class="section-title">{{ t("dish.practice") }}</text>
          <view class="step-list">
            <view
              v-for="(step, index) in practiceSteps"
              :key="index"
              class="step-row"
            >
              <view class="step-number">
                <text class="step-number-text">{{ index + 1 }}</text>
              </view>
              <text class="step-text">{{ step }}</text>
            </view>
          </view>
        </view>

        <view class="bottom-safe-space" />
      </view>
    </scroll-view>

    <view class="bottom-bar">
      <view
        class="favorite-btn"
        :class="{ active: isFavorite }"
        @click="toggleFavorite"
      >
        <text class="favorite-icon">{{ isFavorite ? "♥" : "♡" }}</text>
        <text class="favorite-text">{{
          isFavorite ? t("dish.unfavorite") : t("dish.favorite")
        }}</text>
      </view>
      <view
        v-if="quantityInCart === 0"
        class="cart-btn cart-target"
        @click="addToCart"
      >
        <text class="cart-btn-text">{{ t("dish.addToCart") }}</text>
      </view>
      <view v-else class="cart-stepper cart-target">
        <quantity-stepper
          :quantity="quantityInCart"
          @increase="addToCart"
          @decrease="decreaseFromCart"
        />
      </view>
    </view>

    <fly-ball ref="flyRef" />
  </view>

  <view v-else class="page loading-page">
    <text class="loading-text">{{ t("common.loading") }}</text>
  </view>
</template>

<script setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { onLoad, onShow } from "@dcloudio/uni-app";
import { dataService } from "@/data";
import { useCartStore } from "@/stores/cart";
import { useFavoritesStore } from "@/stores/favorites";
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
const cartStore = useCartStore();
const favoritesStore = useFavoritesStore();

const dish = ref(null);
const flyRef = ref(null);

const quantityInCart = computed(() =>
  dish.value ? cartStore.quantityOf(dish.value.id) : 0,
);

const isFavorite = computed(() =>
  dish.value ? favoritesStore.isFavorite(dish.value.id) : false,
);

const practiceSteps = computed(() => {
  if (!dish.value) return [];
  const practice = getDishPractice(dish.value) || "";
  let steps = practice
    .split(/[。；;]/)
    .map((step) => step.trim())
    .filter(Boolean);
  if (steps.length <= 1) {
    steps = practice
      .split(/[，,]/)
      .map((step) => step.trim())
      .filter(Boolean);
  }
  return steps.length > 0 ? steps : [practice];
});

const toggleFavorite = () => {
  if (!dish.value) return;
  const added = favoritesStore.toggle(dish.value);
  uni.showToast({
    title: added ? t("common.success") : t("favorite.removedSuccess"),
    icon: "success",
  });
};

const addToCart = (event) => {
  if (!dish.value) return;
  cartStore.add(dish.value);
  if (quantityInCart.value === 1) {
    uni.showToast({ title: t("cart.addedSuccess"), icon: "success" });
  }
  flyToCart(event);
};

const flyToCart = (event) => {
  const startX = event?.detail?.x;
  const startY = event?.detail?.y;
  if (typeof startX !== "number" || typeof startY !== "number") return;

  setTimeout(() => {
    uni
      .createSelectorQuery()
      .select(".cart-target")
      .boundingClientRect((rect) => {
        if (rect && typeof rect.left === "number") {
          flyRef.value?.fly(
            startX,
            startY,
            rect.left + rect.width / 2,
            rect.top + rect.height / 2,
          );
        }
      })
      .exec();
  }, 60);
};

const decreaseFromCart = () => {
  if (!dish.value) return;
  cartStore.setQuantity(dish.value.id, quantityInCart.value - 1);
};

onLoad((options) => {
  const dishId = parseInt(options?.id) || 0;
  dish.value = dataService.getDishById(dishId);
  if (!dish.value) {
    uni.showToast({ title: t("empty.loadFailed"), icon: "none" });
  }
});

onShow(() => {
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

.page-scroll {
  flex: 1;
}

.hero {
  width: 100%;
  height: 560rpx;
  background-color: #f0ece6;
}

.hero-image {
  width: 100%;
  height: 100%;
}

.body-card {
  margin-top: -40rpx;
  border-radius: 32rpx 32rpx 0 0;
  background-color: var(--bg);
  padding: 32rpx 24rpx 0;
  position: relative;
}

.title-row {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: var(--radius-card);
  padding: 28rpx;
  box-shadow: var(--shadow-card);
}

.dish-name {
  font-size: 40rpx;
  font-weight: 700;
  color: var(--text-strong);
  word-break: break-word;
}

.dish-desc {
  margin-top: 12rpx;
  font-size: 26rpx;
  color: var(--text-weak);
  line-height: 1.6;
  word-break: break-word;
}

.stat-row {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: var(--radius-card);
  padding: 28rpx 12rpx;
  margin-top: 20rpx;
  box-shadow: var(--shadow-card);
}

.stat-item {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-divider {
  width: 1rpx;
  height: 72rpx;
  background-color: #f0ece6;
  flex-shrink: 0;
}

.stat-icon {
  font-size: 36rpx;
  margin-bottom: 8rpx;
}

.stat-value {
  font-size: 26rpx;
  font-weight: 700;
  color: var(--primary);
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.stat-label {
  margin-top: 6rpx;
  font-size: 22rpx;
  color: var(--text-weak);
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.section {
  background-color: #fff;
  border-radius: var(--radius-card);
  padding: 28rpx;
  margin-top: 20rpx;
  box-shadow: var(--shadow-card);
}

.section-title {
  display: block;
  font-size: 31rpx;
  font-weight: 700;
  color: var(--text-strong);
  margin-bottom: 20rpx;
}

.ingredient-list {
  display: flex;
  flex-direction: column;
}

.ingredient-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20rpx;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f5f1ec;
}

.ingredient-row:last-child {
  border-bottom: none;
}

.ingredient-name {
  flex: 1;
  min-width: 0;
  font-size: 27rpx;
  color: var(--text-strong);
  word-break: break-word;
}

.ingredient-amount {
  flex-shrink: 0;
  font-size: 25rpx;
  font-weight: 600;
  color: var(--primary);
}

.step-list {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.step-row {
  display: flex;
  align-items: flex-start;
  gap: 20rpx;
}

.step-number {
  width: 44rpx;
  height: 44rpx;
  border-radius: 50%;
  background: var(--gradient-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2rpx;
}

.step-number-text {
  font-size: 24rpx;
  font-weight: 700;
  color: #fff;
}

.step-text {
  flex: 1;
  min-width: 0;
  font-size: 27rpx;
  color: var(--text-normal);
  line-height: 1.7;
  word-break: break-word;
}

.bottom-safe-space {
  height: 60rpx;
}

.bottom-bar {
  display: flex;
  align-items: center;
  gap: 20rpx;
  padding: 16rpx 24rpx calc(16rpx + env(safe-area-inset-bottom));
  background-color: #fff;
  border-top: 1rpx solid #f0ece6;
}

.favorite-btn {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 120rpx;
  padding: 10rpx 0;
}

.favorite-icon {
  font-size: 44rpx;
  color: var(--text-faint);
  line-height: 1;
}

.favorite-btn.active .favorite-icon {
  color: var(--primary);
}

.favorite-text {
  margin-top: 4rpx;
  font-size: 20rpx;
  color: var(--text-weak);
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cart-btn {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24rpx 0;
  border-radius: 999rpx;
  background: var(--gradient-primary);
  box-shadow: 0 8rpx 20rpx rgba(255, 107, 107, 0.3);
}

.cart-btn-text {
  font-size: 29rpx;
  font-weight: 700;
  color: #fff;
}

.cart-stepper {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14rpx 0;
}

.loading-page {
  align-items: center;
  justify-content: center;
}

.loading-text {
  font-size: 26rpx;
  color: var(--text-weak);
}
</style>
