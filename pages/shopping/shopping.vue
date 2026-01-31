<template>
  <view class="container">
    <view v-if="cart.length > 0" class="content">
      <view class="overview">
        <view class="overview-item">
          <text class="overview-label">{{ t("shopping.dishCount") }}</text>
          <text class="overview-value">{{ dishCount }}</text>
        </view>
        <view class="overview-item">
          <text class="overview-label">{{
            t("shopping.ingredientCount")
          }}</text>
          <text class="overview-value">{{ ingredientSummary.length }}</text>
        </view>
      </view>

      <scroll-view class="ingredient-list" scroll-y>
        <view
          v-for="(category, categoryName) in groupedIngredients"
          :key="categoryName"
          class="category-group"
        >
          <view class="category-header">
            <text class="category-title">{{
              getIngredientCategoryName(categoryName)
            }}</text>
          </view>
          <view
            v-for="(ingredient, index) in category"
            :key="index"
            class="ingredient-item"
          >
            <view class="ingredient-info">
              <text class="ingredient-name">{{ ingredient.name }}</text>
              <text class="ingredient-amounts">{{
                ingredient.amounts.join(", ")
              }}</text>
            </view>
            <view class="ingredient-dishes">
              <text class="dishes-label">{{ t("shopping.usedIn") }}:</text>
              <text class="dishes-text">{{
                ingredient.dishes.join(", ")
              }}</text>
            </view>
          </view>
        </view>
      </scroll-view>

      <view class="bottom-bar">
        <view class="share-btn" @click="shareToFriend">
          <text class="share-icon">📤</text>
          <text class="share-text">{{ t("shopping.shareToFriend") }}</text>
        </view>
        <view class="share-btn primary" @click="copyText">
          <text class="share-icon">📋</text>
          <text class="share-text">{{ t("shopping.copyText") }}</text>
        </view>
      </view>
    </view>

    <view v-else class="empty">
      <text class="empty-icon">📝</text>
      <text class="empty-text">{{ t("shopping.empty") }}</text>
      <text class="empty-tip">{{ t("shopping.emptyTip") }}</text>
      <view class="empty-btn" @click="goToCart">
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
import { getIngredientCategoryName } from "@/utils/i18n";

const { t } = useI18n();
const appStore = useAppStore();

const cart = ref([]);

const dishCount = computed(() => {
  return cart.value.reduce((sum, item) => sum + item.quantity, 0);
});

const ingredientSummary = computed(() => {
  return dataService.getIngredientSummary(cart.value);
});

const groupedIngredients = computed(() => {
  const groups = {
    vegetables: [],
    meat: [],
    seasonings: [],
    others: [],
  };

  ingredientSummary.value.forEach((ingredient) => {
    const name = ingredient.name.toLowerCase();
    if (
      ["番茄", "冬瓜", "豆腐", "生菜", "芒果", "生姜", "葱"].some((v) =>
        name.includes(v),
      )
    ) {
      groups.vegetables.push(ingredient);
    } else if (
      ["五花肉", "排骨", "猪肉末", "鲈鱼", "鸡蛋"].some((v) => name.includes(v))
    ) {
      groups.meat.push(ingredient);
    } else if (
      [
        "冰糖",
        "生抽",
        "老抽",
        "料酒",
        "白糖",
        "醋",
        "豆瓣酱",
        "花椒粉",
        "盐",
        "糖",
        "沙拉酱",
        "蒸鱼豉油",
      ].some((v) => name.includes(v))
    ) {
      groups.seasonings.push(ingredient);
    } else {
      groups.others.push(ingredient);
    }
  });

  return groups;
});

const shareToFriend = () => {
  const shareData = dataService.generateShareData(cart.value);
  uni.share({
    title: shareData.title,
    path: "/pages/index/index",
    success: () => {
      uni.showToast({
        title: t("share.success"),
        icon: "success",
      });
    },
    fail: () => {
      uni.showToast({
        title: t("share.failed"),
        icon: "none",
      });
    },
  });
};

const copyText = () => {
  const shareData = dataService.generateShareData(cart.value);
  let text = `${shareData.title}\n\n`;
  text += `${t("shopping.dishCount")}: ${shareData.totalCount}\n`;
  text += `${t("shopping.ingredientCount")}: ${shareData.ingredients.length}\n\n`;
  text += `${t("shopping.ingredientList")}:\n`;

  shareData.ingredients.forEach((ing) => {
    text += `- ${ing.name}: ${ing.amounts.join(", ")}\n`;
    text += `  ${t("shopping.usedIn")}: ${ing.dishes.join(", ")}\n`;
  });

  uni.setClipboardData({
    data: text,
    success: () => {
      uni.showToast({
        title: t("share.copySuccess"),
        icon: "success",
      });
    },
    fail: () => {
      uni.showToast({
        title: t("share.copyFailed"),
        icon: "none",
      });
    },
  });
};

const goToCart = () => {
  uni.switchTab({
    url: "/pages/cart/cart",
  });
};

const loadCart = () => {
  cart.value = storage.getCart();
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

.overview {
  display: flex;
  justify-content: space-around;
  padding: 30rpx;
  background-color: #fff;
  border-bottom: 1rpx solid #eee;
}

.overview-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.overview-label {
  font-size: 24rpx;
  color: #999;
  margin-bottom: 10rpx;
}

.overview-value {
  font-size: 48rpx;
  font-weight: bold;
  color: #ff6b6b;
}

.ingredient-list {
  flex: 1;
  padding: 20rpx;
}

.category-group {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
}

.category-header {
  margin-bottom: 20rpx;
  padding-bottom: 15rpx;
  border-bottom: 2rpx solid #ff6b6b;
}

.category-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.ingredient-item {
  padding: 20rpx;
  background-color: #f9f9f9;
  border-radius: 12rpx;
  margin-bottom: 15rpx;
}

.ingredient-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10rpx;
}

.ingredient-name {
  font-size: 28rpx;
  color: #333;
  font-weight: bold;
}

.ingredient-amounts {
  font-size: 26rpx;
  color: #ff6b6b;
}

.ingredient-dishes {
  display: flex;
  gap: 10rpx;
}

.dishes-label {
  font-size: 24rpx;
  color: #999;
}

.dishes-text {
  font-size: 24rpx;
  color: #666;
}

.bottom-bar {
  display: flex;
  gap: 20rpx;
  padding: 20rpx 30rpx;
  background-color: #fff;
  border-top: 1rpx solid #eee;
}

.share-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10rpx;
  padding: 20rpx;
  border: 2rpx solid #ff6b6b;
  border-radius: 12rpx;
}

.share-btn.primary {
  background-color: #ff6b6b;
}

.share-icon {
  font-size: 36rpx;
}

.share-text {
  font-size: 28rpx;
  color: #ff6b6b;
  font-weight: bold;
}

.share-btn.primary .share-text {
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
