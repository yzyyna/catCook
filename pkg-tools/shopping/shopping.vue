<template>
  <view class="page">
    <template v-if="cartItems.length > 0">
      <view class="overview-card">
        <view class="overview-stats">
          <view class="overview-item">
            <text class="overview-value">{{ dishCount }}</text>
            <text class="overview-label">{{ t("shopping.dishCount") }}</text>
          </view>
          <view class="overview-item">
            <text class="overview-value">{{ ingredientSummary.length }}</text>
            <text class="overview-label">{{
              t("shopping.ingredientCount")
            }}</text>
          </view>
          <view class="overview-item">
            <text class="overview-value accent">{{ checkedCount }}</text>
            <text class="overview-label">{{ t("shopping.purchased") }}</text>
          </view>
        </view>
        <view class="progress-track">
          <view class="progress-fill" :style="{ width: progressPercent }" />
        </view>
        <text class="progress-text">{{ progressText }}</text>
      </view>

      <scroll-view class="group-list" scroll-y>
        <view
          v-for="group in groupedIngredients"
          :key="group.category"
          class="group-card"
        >
          <view class="group-header">
            <text class="group-title">{{
              getIngredientCategoryName(group.category)
            }}</text>
            <text class="group-count">{{ group.items.length }}</text>
          </view>
          <view
            v-for="ingredient in group.items"
            :key="ingredient.key"
            class="ingredient-row"
            :class="{ checked: isChecked(ingredient.key) }"
            @click="toggleChecked(ingredient.key)"
          >
            <view
              class="check-circle"
              :class="{ checked: isChecked(ingredient.key) }"
            >
              <text v-if="isChecked(ingredient.key)" class="check-mark">✓</text>
            </view>
            <view class="ingredient-info">
              <view class="ingredient-main">
                <text class="ingredient-name">{{ ingredient.name }}</text>
                <text class="ingredient-amounts">{{
                  ingredient.amounts.join(" + ")
                }}</text>
              </view>
              <text class="ingredient-dishes"
                >{{ t("shopping.usedIn") }}:
                {{ ingredient.dishes.join(", ") }}</text
              >
            </view>
          </view>
        </view>
        <view class="list-safe-space" />
      </scroll-view>

      <view class="bottom-bar">
        <view class="bar-btn outline" @click="shareToFriend">
          <text class="bar-btn-icon">📤</text>
          <text class="bar-btn-text outline-text">{{
            t("shopping.shareToFriend")
          }}</text>
        </view>
        <view class="bar-btn primary" @click="copyText">
          <text class="bar-btn-icon">📋</text>
          <text class="bar-btn-text">{{ t("shopping.copyText") }}</text>
        </view>
      </view>
    </template>

    <empty-state
      v-else
      icon="📝"
      :title="t('shopping.empty')"
      :tip="t('shopping.emptyTip')"
      :button-text="t('dish.addToCart')"
      @action="goToCart"
    />
  </view>
</template>

<script setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { onShow } from "@dcloudio/uni-app";
import { dataService, storage } from "@/data";
import { useCartStore } from "@/stores/cart";
import { formatMessage, getIngredientCategoryName } from "@/utils/i18n";
import { syncGlobalI18nUI } from "@/utils/ui";

const { t } = useI18n();
const cartStore = useCartStore();

const checkedKeys = ref([]);

const GROUP_ORDER = ["vegetable", "meat", "seasoning", "other"];

const cartItems = computed(() =>
  cartStore.selectedItems.length > 0
    ? cartStore.selectedItems
    : cartStore.items,
);

const dishCount = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.quantity, 0),
);

const ingredientSummary = computed(() =>
  dataService.getIngredientSummary(cartItems.value),
);

const groupedIngredients = computed(() => {
  const groups = GROUP_ORDER.map((category) => ({ category, items: [] }));
  ingredientSummary.value.forEach((ingredient) => {
    const group =
      groups.find((entry) => entry.category === ingredient.category) ||
      groups[groups.length - 1];
    group.items.push(ingredient);
  });
  return groups.filter((group) => group.items.length > 0);
});

const checkedCount = computed(
  () =>
    ingredientSummary.value.filter((ingredient) =>
      checkedKeys.value.includes(ingredient.key),
    ).length,
);

const progressPercent = computed(() => {
  if (ingredientSummary.value.length === 0) return "0%";
  return `${Math.round((checkedCount.value / ingredientSummary.value.length) * 100)}%`;
});

const progressText = computed(() =>
  formatMessage(t("shopping.progress"), {
    done: checkedCount.value,
    total: ingredientSummary.value.length,
  }),
);

const isChecked = (key) => checkedKeys.value.includes(key);

const toggleChecked = (key) => {
  if (isChecked(key)) {
    checkedKeys.value = checkedKeys.value.filter((item) => item !== key);
  } else {
    checkedKeys.value = [...checkedKeys.value, key];
  }
  storage.setShoppingChecked(checkedKeys.value);
};

const pruneChecked = () => {
  const validKeys = ingredientSummary.value.map((ingredient) => ingredient.key);
  const pruned = checkedKeys.value.filter((key) => validKeys.includes(key));
  if (pruned.length !== checkedKeys.value.length) {
    checkedKeys.value = pruned;
    storage.setShoppingChecked(pruned);
  }
};

const shareToFriend = () => {
  const shareData = dataService.generateShareData(cartItems.value);
  uni.share({
    title: shareData.title,
    path: "/pages/index/index",
    success: () => {
      uni.showToast({ title: t("share.success"), icon: "success" });
    },
    fail: () => {
      uni.showToast({ title: t("share.failed"), icon: "none" });
    },
  });
};

const copyText = () => {
  let text = `${t("shopping.shareTitle")}\n\n`;
  text += `${t("shopping.dishCount")}: ${dishCount.value}\n`;
  text += `${t("shopping.ingredientCount")}: ${ingredientSummary.value.length}\n`;
  text += `${progressText.value}\n\n`;

  groupedIngredients.value.forEach((group) => {
    text += `【${getIngredientCategoryName(group.category)}】\n`;
    group.items.forEach((ingredient) => {
      const mark = isChecked(ingredient.key) ? "✓ " : "";
      text += `${mark}${ingredient.name}: ${ingredient.amounts.join(" + ")} (${ingredient.dishes.join(", ")})\n`;
    });
    text += "\n";
  });

  uni.setClipboardData({
    data: text,
    success: () => {
      uni.showToast({ title: t("share.copySuccess"), icon: "success" });
    },
    fail: () => {
      uni.showToast({ title: t("share.copyFailed"), icon: "none" });
    },
  });
};

const goToCart = () => {
  uni.switchTab({
    url: "/pages/cart/cart",
  });
};

onShow(() => {
  cartStore.load();
  checkedKeys.value = storage.getShoppingChecked();
  pruneChecked();
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

.overview-card {
  margin: 24rpx 24rpx 8rpx;
  background-color: #fff;
  border-radius: var(--radius-card);
  padding: 28rpx;
  box-shadow: var(--shadow-card);
}

.overview-stats {
  display: flex;
  justify-content: space-around;
}

.overview-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 0;
}

.overview-value {
  font-size: 44rpx;
  font-weight: 700;
  color: var(--primary);
}

.overview-value.accent {
  color: var(--accent);
}

.overview-label {
  margin-top: 8rpx;
  font-size: 22rpx;
  color: var(--text-weak);
  max-width: 160rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.progress-track {
  margin-top: 24rpx;
  height: 14rpx;
  border-radius: 999rpx;
  background-color: #f0ece6;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 999rpx;
  background: var(--gradient-primary);
  transition: width 0.3s ease;
}

.progress-text {
  display: block;
  margin-top: 12rpx;
  font-size: 23rpx;
  color: var(--text-weak);
  text-align: right;
}

.group-list {
  flex: 1;
  padding: 16rpx 24rpx 0;
}

.group-card {
  background-color: #fff;
  border-radius: var(--radius-card);
  padding: 24rpx;
  margin-bottom: 20rpx;
  box-shadow: var(--shadow-card);
}

.group-header {
  display: flex;
  align-items: center;
  gap: 12rpx;
  margin-bottom: 8rpx;
}

.group-title {
  font-size: 29rpx;
  font-weight: 700;
  color: var(--text-strong);
}

.group-count {
  font-size: 20rpx;
  font-weight: 700;
  color: var(--primary);
  background-color: #fff0ee;
  border-radius: 999rpx;
  padding: 2rpx 14rpx;
}

.ingredient-row {
  display: flex;
  align-items: center;
  gap: 20rpx;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f5f1ec;
}

.ingredient-row:last-child {
  border-bottom: none;
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

.ingredient-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.ingredient-main {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16rpx;
}

.ingredient-name {
  flex: 1;
  min-width: 0;
  font-size: 27rpx;
  font-weight: 600;
  color: var(--text-strong);
  word-break: break-word;
}

.ingredient-amounts {
  flex-shrink: 0;
  font-size: 24rpx;
  font-weight: 600;
  color: var(--primary);
  max-width: 45%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ingredient-dishes {
  margin-top: 6rpx;
  font-size: 22rpx;
  color: var(--text-faint);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ingredient-row.checked .ingredient-name,
.ingredient-row.checked .ingredient-amounts {
  color: var(--text-faint);
  text-decoration: line-through;
}

.list-safe-space {
  height: 40rpx;
}

.bottom-bar {
  display: flex;
  gap: 20rpx;
  padding: 16rpx 24rpx calc(16rpx + env(safe-area-inset-bottom));
  background-color: #fff;
  border-top: 1rpx solid #f0ece6;
}

.bar-btn {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10rpx;
  padding: 22rpx 0;
  border-radius: 999rpx;
}

.bar-btn.outline {
  border: 2rpx solid var(--primary);
}

.bar-btn.primary {
  background: var(--gradient-primary);
  box-shadow: 0 8rpx 20rpx rgba(255, 107, 107, 0.3);
}

.bar-btn-icon {
  font-size: 30rpx;
}

.bar-btn-text {
  font-size: 26rpx;
  font-weight: 700;
  color: #fff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.bar-btn-text.outline-text {
  color: var(--primary);
}
</style>
