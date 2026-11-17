<template>
  <view v-if="dish" class="page">
    <scroll-view class="page-scroll" scroll-y>
      <view class="hero" hover-class="hero-hover" :hover-stay-time="80" @click="previewHero">
        <dish-cover class="hero-cover" :dish="dish" />
        <view class="hero-lang" @click.stop>
          <lang-pill />
        </view>
      </view>

      <view class="body-card">
        <view class="title-row">
          <text class="dish-name">{{ getDishName(dish) }}</text>
          <view v-if="dishTags.length > 0" class="tag-flow">
            <view
              v-for="(tag, tagIndex) in dishTags"
              :key="tagIndex"
              class="detail-tag"
            >
              <text class="detail-tag-text">{{ tag }}</text>
            </view>
          </view>
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
          <view class="section-header-row">
            <text class="section-title">{{ t("dish.ingredients") }}</text>
            <view class="servings-selector">
              <text class="servings-label">{{ t("dish.servings") }}</text>
              <view class="servings-group">
                <view
                  v-for="s in [1, 2, 4]"
                  :key="s"
                  class="servings-chip"
                  :class="{ active: currentServings === s }"
                  hover-class="hv-dim"
                  :hover-stay-time="80"
                  @click="setServings(s)"
                >
                  <text class="servings-chip-text">{{ s }}{{ t("dish.servingsUnit") }}</text>
                </view>
              </view>
            </view>
          </view>
          <view class="ingredient-list">
            <view
              v-for="(ingredient, index) in scaledIngredients"
              :key="index"
              class="ingredient-row"
            >
              <text class="ingredient-name">{{ ingredient.name }}</text>
              <text class="ingredient-amount">{{ ingredient.scaledAmount }}</text>
            </view>
          </view>
        </view>

        <view v-if="dishTips" class="chef-tips-card">
          <view class="tips-header">
            <text class="tips-icon">💡</text>
            <text class="tips-title">{{ t("dish.chefTips") }}</text>
          </view>
          <text class="tips-content">{{ dishTips }}</text>
        </view>

        <view class="section">
          <view class="section-header-row">
            <text class="section-title">{{ t("dish.practice") }}</text>
            <view v-if="completedStepIndices.length > 0" class="steps-progress-row">
              <text class="steps-progress-text">
                {{ completedStepIndices.length }}/{{ practiceSteps.length }} {{ t("dish.stepDone") }}
              </text>
              <text
                class="steps-reset-btn"
                hover-class="hv-dim"
                :hover-stay-time="80"
                @click="resetSteps"
              >
                {{ t("dish.resetSteps") }}
              </text>
            </view>
          </view>
          <view class="step-list">
            <view
              v-for="(step, index) in practiceSteps"
              :key="index"
              class="step-row"
              :class="{ completed: isStepDone(index) }"
              hover-class="hv-dim"
              :hover-stay-time="80"
              @click="toggleStep(index)"
            >
              <view class="step-number" :class="{ done: isStepDone(index) }">
                <text class="step-number-text">{{ isStepDone(index) ? "✓" : index + 1 }}</text>
              </view>
              <text class="step-text" :class="{ done: isStepDone(index) }">{{ step }}</text>
            </view>
          </view>
          <view
            v-if="practiceSteps.length > 0 && completedStepIndices.length === practiceSteps.length"
            class="all-done-banner"
          >
            <text class="all-done-text">🎉 {{ t("dish.allStepsDone") }}</text>
          </view>
        </view>

        <view class="section" v-if="relatedDishes.length > 0">
          <text class="section-title">{{ t("dish.related") }}</text>
          <scroll-view
            class="related-scroll"
            scroll-x
            :enhanced="true"
            :show-scrollbar="false"
          >
            <view class="related-track">
              <view
                v-for="item in relatedDishes"
                :key="item.id"
                class="related-item"
                hover-class="hv-dim"
                :hover-stay-time="80"
                @click="goToDish(item)"
              >
                <view class="related-cover">
                  <dish-cover :dish="item" />
                </view>
                <text class="related-name">{{ getDishName(item) }}</text>
                <text class="related-meta">{{
                  getDifficultyLabel(item)
                }}</text>
              </view>
            </view>
          </scroll-view>
        </view>

        <view class="bottom-safe-space" />
      </view>
    </scroll-view>

    <view class="bottom-bar">
      <view
        class="favorite-btn"
        :class="{ active: isFavorite }"
        hover-class="hv-dim"
        :hover-stay-time="80"
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
        hover-class="hv-dim"
        :hover-stay-time="80"
        @click="addToCart"
      >
        <text class="cart-btn-text">{{ addToCartText }}</text>
      </view>
      <view v-else class="cart-stepper cart-target">
        <quantity-stepper
          :quantity="quantityInCart"
          @increase="increaseServings"
          @decrease="decreaseFromCart"
        />
      </view>
    </view>

    <fly-ball ref="flyRef" />
  </view>

  <view v-else class="page loading-page">
    <empty-state
      icon="🍽️"
      :title="t('empty.loadFailed')"
      :tip="t('empty.loadFailedTip')"
      :button-text="t('common.back')"
      @action="goBack"
    />
  </view>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useI18n } from "vue-i18n";
import { onLoad, onShow, onShareAppMessage } from "@dcloudio/uni-app";
import { dataService, storage, scaleAmount } from "@/data";
import { useAppStore } from "@/stores/app";
import { useCartStore } from "@/stores/cart";
import { useFavoritesStore } from "@/stores/favorites";
import {
  getDifficultyLabel,
  getDishCalories,
  getDishDescription,
  getDishName,
  getDishPractice,
  getDishTags,
  getDishTime,
  getDishTips,
} from "@/utils/i18n";
import { syncGlobalI18nUI } from "@/utils/ui";
import { extractTouchPoint, measureViewportAnchor } from "@/utils/event";

const { t } = useI18n();
const appStore = useAppStore();
const cartStore = useCartStore();
const favoritesStore = useFavoritesStore();

const routeDishId = ref(0);
const flyRef = ref(null);
const currentServings = ref(1);
const completedStepIndices = ref([]);

// 语言切换时立即按新语言重新本地化，无需离开页面
const dish = computed(() => {
  void appStore.language;
  return dataService.getDishById(routeDishId.value);
});

const dishTags = computed(() => {
  void appStore.language;
  return dish.value ? getDishTags(dish.value) : [];
});

const dishTips = computed(() => {
  void appStore.language;
  return dish.value ? getDishTips(dish.value) : "";
});

const scaledIngredients = computed(() => {
  if (!dish.value?.ingredients) return [];
  return dish.value.ingredients.map((ing) => ({
    ...ing,
    scaledAmount: scaleAmount(ing.amount, currentServings.value),
  }));
});

const setServings = (s) => {
  currentServings.value = s;
};

const isStepDone = (index) => completedStepIndices.value.includes(index);

const toggleStep = (index) => {
  try {
    uni.vibrateShort({ type: "light" });
  } catch (e) {}
  if (completedStepIndices.value.includes(index)) {
    completedStepIndices.value = completedStepIndices.value.filter(
      (i) => i !== index,
    );
  } else {
    completedStepIndices.value = [...completedStepIndices.value, index];
  }
};

const resetSteps = () => {
  completedStepIndices.value = [];
};

const relatedDishes = computed(() => {
  void appStore.language;
  const current = dish.value;
  if (!current) return [];
  return dataService
    .getDishesByCategory(current.categoryId)
    .filter((item) => item.id !== current.id)
    .slice(0, 6);
});

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

// 按钮文案跟随所选份数，让"加购几份"在点击前就明确
const addToCartText = computed(() => {
  if (currentServings.value > 1) {
    return `${t("dish.addToCart")} (${currentServings.value}${t("dish.servingsUnit")})`;
  }
  return t("dish.addToCart");
});

// 首次加购：按当前所选人份加入购物车，所见用量与购物车/采购清单口径一致
const addToCart = (event) => {
  if (!dish.value) return;
  cartStore.add(dish.value, currentServings.value);
  uni.showToast({ title: t("cart.addedSuccess"), icon: "success" });
  flyToCart(event);
};

// 已在购物车中：步进器每次只加 1 份
const increaseServings = (event) => {
  if (!dish.value) return;
  cartStore.add(dish.value, 1);
  flyToCart(event);
};

const flyToCart = (event) => {
  const start = extractTouchPoint(event);
  if (!start) return;

  // 详情页底栏常驻，锚点就绪立即起飞；未就绪时短间隔重试
  const launch = (left) => {
    measureViewportAnchor(".cart-target").then((anchor) => {
      if (anchor) {
        flyRef.value?.fly(start.x, start.y, anchor.x, anchor.y);
      } else if (left > 0) {
        setTimeout(() => launch(left - 1), 32);
      }
    });
  };
  launch(4);
};

const decreaseFromCart = () => {
  if (!dish.value) return;
  cartStore.setQuantity(dish.value.id, quantityInCart.value - 1);
};

const previewHero = () => {
  if (dish.value?.image) {
    uni.previewImage({ urls: [dish.value.image] });
  } else {
    uni.showToast({ title: t("dish.noImage"), icon: "none" });
  }
};

const goBack = () => {
  uni.navigateBack({
    fail: () => {
      uni.switchTab({ url: "/pages/index/index" });
    },
  });
};

const goToDish = (item) => {
  storage.addToHistory(item);
  uni.redirectTo({
    url: `/pkg-discover/detail/detail?id=${item.id}`,
  });
};

onLoad((options) => {
  routeDishId.value = parseInt(options?.id) || 0;
  currentServings.value = 1;
  completedStepIndices.value = [];
  if (!dataService.getDishById(routeDishId.value)) {
    uni.showToast({ title: t("empty.loadFailed"), icon: "none" });
  }
});

const syncDetailTitle = () => {
  // 详情页标题唯一出口：有菜名显示菜名，无数据回退语言包标题
  uni.setNavigationBarTitle({
    title: dish.value ? getDishName(dish.value) : t("nav.detail"),
  });
};

onShow(() => {
  syncGlobalI18nUI();
  syncDetailTitle();
});

// 在详情页内点击语言药丸时，即时刷新顶部导航栏标题为新语言菜名
watch(
  () => appStore.language,
  () => {
    syncDetailTitle();
  },
);

onShareAppMessage(() => {
  const current = dish.value;
  return {
    title: current ? getDishName(current) : t("nav.home"),
    path: `/pkg-discover/detail/detail?id=${routeDishId.value}`,
    imageUrl: current?.image || undefined,
  };
});
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  height: calc(100vh - var(--window-top, 0px) - var(--window-bottom, 0px));
  background-color: var(--bg);
}

.page-scroll {
  flex: 1;
}

.hero {
  position: relative;
  width: 100%;
  height: 560rpx;
  background-color: #f0ece6;
}

.hero-lang {
  position: absolute;
  top: 24rpx;
  right: 24rpx;
  z-index: 10;
}

.hero-hover {
  opacity: 0.92;
}

.hero-cover {
  --cover-emoji-size: 200rpx;
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
  width: 144rpx;
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
  line-height: 1.2;
  color: var(--text-weak);
  text-align: center;
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

.related-scroll {
  width: 100%;
  white-space: nowrap;
}

.related-track {
  display: inline-flex;
  gap: 16rpx;
  padding-bottom: 8rpx;
}

.related-item {
  display: inline-flex;
  flex-direction: column;
  width: 176rpx;
  flex-shrink: 0;
}

.related-cover {
  width: 176rpx;
  height: 176rpx;
  border-radius: 14rpx;
  overflow: hidden;
  background-color: #f0ece6;
  --cover-emoji-size: 80rpx;
}

.related-name {
  margin-top: 12rpx;
  width: 100%;
  font-size: 24rpx;
  font-weight: 600;
  color: var(--text-strong);
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.related-meta {
  margin-top: 4rpx;
  font-size: 20rpx;
  color: var(--text-weak);
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 特色标签流 */
.tag-flow {
  display: flex;
  flex-wrap: wrap;
  gap: 12rpx;
  margin-top: 16rpx;
}

.detail-tag {
  padding: 6rpx 18rpx;
  border-radius: 999rpx;
  background-color: #fff0ee;
}

.detail-tag-text {
  font-size: 21rpx;
  font-weight: 600;
  color: var(--primary);
}

/* 区块标题行（标题 + 右侧操作） */
.section-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16rpx;
  margin-bottom: 20rpx;
}

.section-header-row .section-title {
  margin-bottom: 0;
}

/* 份数选择器 */
.servings-selector {
  display: flex;
  align-items: center;
  gap: 14rpx;
}

.servings-label {
  font-size: 23rpx;
  color: var(--text-weak);
}

.servings-group {
  display: flex;
  gap: 10rpx;
}

.servings-chip {
  min-width: 76rpx;
  height: 48rpx;
  padding: 0 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 999rpx;
  border: 2rpx solid #ece7e1;
  background-color: #fff;
}

.servings-chip.active {
  border-color: transparent;
  background: var(--gradient-primary);
  box-shadow: 0 6rpx 14rpx rgba(255, 107, 107, 0.28);
}

.servings-chip-text {
  font-size: 23rpx;
  font-weight: 600;
  color: var(--text-normal);
}

.servings-chip.active .servings-chip-text {
  color: #fff;
}

/* 大厨秘诀卡片 */
.chef-tips-card {
  margin-top: 20rpx;
  padding: 26rpx 28rpx;
  border-radius: var(--radius-card);
  background-color: #fff8ec;
  border-left: 8rpx solid #f0a93b;
  box-shadow: var(--shadow-card);
}

.tips-header {
  display: flex;
  align-items: center;
  gap: 10rpx;
  margin-bottom: 12rpx;
}

.tips-icon {
  font-size: 30rpx;
}

.tips-title {
  font-size: 27rpx;
  font-weight: 700;
  color: #d98a12;
}

.tips-content {
  font-size: 25rpx;
  color: var(--text-normal);
  line-height: 1.7;
  word-break: break-word;
}

/* 步骤打卡进度 */
.steps-progress-row {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.steps-progress-text {
  font-size: 23rpx;
  font-weight: 600;
  color: var(--primary);
}

.steps-reset-btn {
  font-size: 23rpx;
  color: var(--text-weak);
  padding: 4rpx 10rpx;
  border-radius: 999rpx;
  background-color: #f7f3ef;
}

.step-text.done {
  color: var(--text-faint);
  text-decoration: line-through;
}

.step-number.done {
  background: linear-gradient(135deg, #7ac97a, #4fb36a);
  box-shadow: 0 4rpx 12rpx rgba(79, 179, 106, 0.3);
}

.all-done-banner {
  margin-top: 20rpx;
  padding: 18rpx 20rpx;
  border-radius: 16rpx;
  background-color: #edf7ef;
  text-align: center;
}

.all-done-text {
  font-size: 26rpx;
  font-weight: 600;
  color: #3f9c5f;
}
</style>
