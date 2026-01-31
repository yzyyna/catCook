<template>
  <view class="container">
    <view v-if="favorites.length > 0" class="content">
      <view class="header">
        <text class="title">{{ t("favorite.title") }}</text>
        <text class="count">{{
          t("favorite.count", { count: favorites.length })
        }}</text>
      </view>

      <scroll-view class="favorite-list" scroll-y>
        <view
          v-for="dish in favorites"
          :key="dish.id"
          class="favorite-item"
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
            </view>
          </view>
          <view class="favorite-btn" @click.stop="removeFavorite(dish)">
            <text class="favorite-icon">❤️</text>
          </view>
        </view>
      </scroll-view>
    </view>

    <view v-else class="empty">
      <text class="empty-icon">🤍</text>
      <text class="empty-text">{{ t("favorite.empty") }}</text>
      <text class="empty-tip">{{ t("favorite.emptyTip") }}</text>
      <view class="empty-btn" @click="goToHome">
        <text>{{ t("dish.addToCart") }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useAppStore } from "@/stores/app";
import { dataService, storage } from "@/data";
import { getDifficultyLabel } from "@/utils/i18n";

const { t } = useI18n();
const appStore = useAppStore();

const favorites = ref([]);

const loadFavorites = () => {
  favorites.value = storage.getFavorites();
};

const goToDetail = (dish) => {
  storage.addToHistory(dish);
  uni.navigateTo({
    url: `/pages/detail/detail?id=${dish.id}`,
  });
};

const removeFavorite = (dish) => {
  uni.showModal({
    title: t("common.confirm"),
    content: t("favorite.removeConfirm"),
    success: (res) => {
      if (res.confirm) {
        storage.toggleFavorite(dish);
        loadFavorites();
        uni.showToast({
          title: t("favorite.removedSuccess"),
          icon: "success",
        });
      }
    },
  });
};

const showQuickMenu = (dish) => {
  uni.showActionSheet({
    itemList: [t("dish.addToCart"), t("dish.unfavorite")],
    success: (res) => {
      if (res.tapIndex === 0) {
        storage.addToCart(dish);
        uni.showToast({
          title: t("cart.addedSuccess"),
          icon: "success",
        });
      } else if (res.tapIndex === 1) {
        removeFavorite(dish);
      }
    },
  });
};

const goToHome = () => {
  uni.switchTab({
    url: "/pages/index/index",
  });
};

onMounted(() => {
  loadFavorites();
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

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx;
  background-color: #fff;
  border-bottom: 1rpx solid #eee;
}

.title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
}

.count {
  font-size: 26rpx;
  color: #ff6b6b;
}

.favorite-list {
  flex: 1;
  padding: 20rpx;
}

.favorite-item {
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
  gap: 15rpx;
}

.meta-item {
  font-size: 22rpx;
  color: #999;
  padding: 4rpx 12rpx;
  background-color: #f5f5f5;
  border-radius: 8rpx;
}

.favorite-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60rpx;
  height: 60rpx;
  background-color: #ffecec;
  border-radius: 50%;
}

.favorite-icon {
  font-size: 32rpx;
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
