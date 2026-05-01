<template>
  <view class="container">
    <view class="header">
      <text class="title">{{ t("history.title") }}</text>
      <view class="clear-btn" @click="clearHistory">
        <text>{{ t("history.clearHistory") }}</text>
      </view>
    </view>

    <scroll-view v-if="history.length > 0" class="history-list" scroll-y>
      <view
        v-for="dish in history"
        :key="dish.id"
        class="history-item"
        @click="goToDetail(dish)"
        @longpress="showQuickMenu(dish)"
      >
        <image class="dish-image" :src="dish.image" mode="aspectFill" />
        <view class="dish-info">
          <text class="dish-name">{{ getDishName(dish) }}</text>
          <text class="dish-desc">{{ getDishDescription(dish) }}</text>
          <text class="view-time">{{ formatViewTime(dish.viewTime) }}</text>
        </view>
        <view class="actions">
          <view class="action-btn" @click.stop="addToCart(dish)">
            <text class="action-icon">🛒</text>
          </view>
          <view class="action-btn" @click.stop="toggleFavorite(dish)">
            <text class="action-icon">{{
              isFavorite(dish) ? "❤️" : "🤍"
            }}</text>
          </view>
        </view>
      </view>
    </scroll-view>

    <view v-else class="empty">
      <text class="empty-icon">🕐</text>
      <text class="empty-text">{{ t("history.empty") }}</text>
      <text class="empty-tip">{{ t("history.emptyTip") }}</text>
      <view class="empty-btn" @click="goToHome">
        <text>{{ t("dish.addToCart") }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { onShow } from "@dcloudio/uni-app";
import { storage } from "@/data";
import { getDishDescription, getDishName } from "@/utils/i18n";
import { syncGlobalI18nUI } from "@/utils/ui";

const { t } = useI18n();

const history = ref([]);
const favoriteIds = ref([]);

const loadHistory = () => {
  history.value = storage.getHistory();
};

const loadFavorites = () => {
  favoriteIds.value = storage.getFavorites().map((item) => item.id);
};

const formatViewTime = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now - date;

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) {
    return t("history.viewTime") + ": " + t("common.justNow");
  } else if (minutes < 60) {
    return t("history.viewTime") + ": " + minutes + t("common.minutesAgo");
  } else if (hours < 24) {
    return t("history.viewTime") + ": " + hours + t("common.hoursAgo");
  } else if (days < 7) {
    return t("history.viewTime") + ": " + days + t("common.daysAgo");
  } else {
    return t("history.viewTime") + ": " + date.toLocaleDateString();
  }
};

const goToDetail = (dish) => {
  storage.addToHistory(dish);
  uni.navigateTo({
    url: `/pkg-discover/detail/detail?id=${dish.id}`,
  });
};

const addToCart = (dish) => {
  storage.addToCart(dish);
  uni.showToast({
    title: t("cart.addedSuccess"),
    icon: "success",
  });
};

const toggleFavorite = (dish) => {
  storage.toggleFavorite(dish);
  loadFavorites();
  uni.showToast({
    title: t("common.success"),
    icon: "success",
  });
};

const isFavorite = (dish) => {
  return favoriteIds.value.includes(dish.id);
};

const showQuickMenu = (dish) => {
  uni.showActionSheet({
    itemList: [t("dish.addToCart"), t("dish.favorite"), t("common.delete")],
    success: (res) => {
      if (res.tapIndex === 0) {
        addToCart(dish);
      } else if (res.tapIndex === 1) {
        toggleFavorite(dish);
      } else if (res.tapIndex === 2) {
        history.value = history.value.filter((item) => item.id !== dish.id);
        storage.setHistory(history.value);
        uni.showToast({
          title: t("common.success"),
          icon: "success",
        });
      }
    },
  });
};

const clearHistory = () => {
  uni.showModal({
    title: t("common.confirm"),
    content: t("history.clearConfirm"),
    success: (res) => {
      if (res.confirm) {
        storage.clearHistory();
        loadHistory();
        uni.showToast({
          title: t("history.clearedSuccess"),
          icon: "success",
        });
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
  loadHistory();
  loadFavorites();
});

onShow(() => {
  loadHistory();
  loadFavorites();
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

.clear-btn {
  padding: 10rpx 20rpx;
  background-color: #ffecec;
  border-radius: 8rpx;
  font-size: 26rpx;
  color: #ff4757;
}

.history-list {
  flex: 1;
  padding: 20rpx;
}

.history-item {
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

.view-time {
  font-size: 22rpx;
  color: #999;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 15rpx;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60rpx;
  height: 60rpx;
  background-color: #f5f5f5;
  border-radius: 50%;
}

.action-icon {
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
