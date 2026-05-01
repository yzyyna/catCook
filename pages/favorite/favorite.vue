<template>
  <view class="container">
    <view v-if="favorites.length > 0" class="content">
      <view class="header">
        <text class="title">{{ t("favorite.title") }}</text>
        <text class="count">{{
          selectedIds.length > 0 ? selectedCountText : favoriteCountText
        }}</text>
      </view>

      <scroll-view class="favorite-list" scroll-y>
        <view
          v-for="dish in favorites"
          :key="dish.id"
          class="favorite-item"
          :class="{ selected: isSelected(dish.id) }"
          @click="goToDetail(dish)"
          @longpress="showQuickMenu(dish)"
        >
          <view class="select-box" @click.stop="toggleItemSelection(dish.id)">
            <text class="select-box-icon">{{
              isSelected(dish.id) ? "☑️" : "☐"
            }}</text>
          </view>
          <image class="dish-image" :src="dish.image" mode="aspectFill" />
          <view class="dish-info">
            <text class="dish-name">{{ getDishName(dish) }}</text>
            <text class="dish-desc">{{ getDishDescription(dish) }}</text>
            <view class="dish-meta">
              <text class="meta-item">{{ getDifficultyLabel(dish) }}</text>
              <text class="meta-item">{{ getDishTime(dish) }}</text>
            </view>
          </view>
          <view class="favorite-btn" @click.stop="removeFavorite(dish)">
            <text class="favorite-icon">❤️</text>
          </view>
        </view>
      </scroll-view>

      <view class="bottom-bar">
        <view class="select-all" @click="toggleSelectAll">
          <text class="select-icon">{{ allSelected ? "☑️" : "☐" }}</text>
          <text class="select-text">{{ t("common.selectAll") }}</text>
        </view>
        <view class="action-buttons">
          <view class="action-btn delete" @click="removeSelected">
            <text>{{ t("favorite.deleteSelected") }}</text>
          </view>
        </view>
      </view>
    </view>

    <view v-else class="empty">
      <text class="empty-icon">🤍</text>
      <text class="empty-text">{{ t("favorite.empty") }}</text>
      <text class="empty-tip">{{ t("favorite.emptyTip") }}</text>
      <view class="empty-btn" @click="goToHome">
        <text>{{ t("empty.noDataTip") }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { onShow } from "@dcloudio/uni-app";
import { storage } from "@/data";
import {
  formatMessage,
  getDifficultyLabel,
  getDishDescription,
  getDishName,
  getDishTime,
} from "@/utils/i18n";
import { syncGlobalI18nUI } from "@/utils/ui";

const { t } = useI18n();

const favorites = ref([]);
const selectedIds = ref([]);
const favoriteCountText = computed(() => {
  return formatMessage(t("favorite.count"), {
    count: favorites.value.length,
  });
});
const selectedCountText = computed(() => {
  return formatMessage(t("favorite.selectedCount"), {
    count: selectedIds.value.length,
  });
});
const allSelected = computed(() => {
  return (
    favorites.value.length > 0 &&
    selectedIds.value.length === favorites.value.length
  );
});

const loadFavorites = () => {
  favorites.value = storage.getFavorites();
  selectedIds.value = selectedIds.value.filter((id) =>
    favorites.value.some((item) => item.id === id),
  );
};

const goToDetail = (dish) => {
  storage.addToHistory(dish);
  uni.navigateTo({
    url: `/pkg-discover/detail/detail?id=${dish.id}`,
  });
};

const removeFavorite = (dish) => {
  uni.showModal({
    title: t("common.confirm"),
    content: t("favorite.removeConfirm"),
    confirmText: t("common.confirm"),
    cancelText: t("common.cancel"),
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

const isSelected = (id) => {
  return selectedIds.value.includes(id);
};

const toggleItemSelection = (id) => {
  if (isSelected(id)) {
    selectedIds.value = selectedIds.value.filter((itemId) => itemId !== id);
    return;
  }

  selectedIds.value = [...selectedIds.value, id];
};

const toggleSelectAll = () => {
  if (allSelected.value) {
    selectedIds.value = [];
    return;
  }

  selectedIds.value = favorites.value.map((item) => item.id);
};

const removeSelected = () => {
  if (selectedIds.value.length === 0) {
    uni.showToast({
      title: t("cart.select"),
      icon: "none",
    });
    return;
  }

  uni.showModal({
    title: t("common.confirm"),
    content: t("favorite.removeSelectedConfirm"),
    confirmText: t("common.confirm"),
    cancelText: t("common.cancel"),
    success: (res) => {
      if (res.confirm) {
        const nextFavorites = favorites.value.filter(
          (item) => !selectedIds.value.includes(item.id),
        );
        storage.setFavorites(nextFavorites);
        selectedIds.value = [];
        loadFavorites();
        uni.showToast({
          title: t("favorite.removedSelectedSuccess"),
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

onShow(() => {
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
  align-items: flex-start;
  background-color: #fff;
  border-radius: 16rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  overflow: hidden;
}

.favorite-item.selected {
  background-color: #fff5f5;
  box-shadow: 0 6rpx 18rpx rgba(255, 107, 107, 0.12);
}

.select-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48rpx;
  height: 160rpx;
  flex-shrink: 0;
  margin-right: 12rpx;
}

.select-box-icon {
  font-size: 32rpx;
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
  flex-shrink: 0;
  background-color: #ffecec;
  border-radius: 50%;
}

.favorite-icon {
  font-size: 32rpx;
}

.bottom-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20rpx;
  padding: 24rpx 30rpx calc(24rpx + env(safe-area-inset-bottom));
  background-color: #fff;
  border-top: 1rpx solid #eee;
}

.select-all {
  display: flex;
  align-items: center;
  gap: 12rpx;
  flex-shrink: 0;
}

.select-icon {
  font-size: 30rpx;
}

.select-text {
  font-size: 26rpx;
  color: #666;
}

.action-buttons {
  display: flex;
  justify-content: flex-end;
  flex: 1;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 220rpx;
  padding: 18rpx 28rpx;
  border-radius: 999rpx;
  font-size: 26rpx;
  box-sizing: border-box;
}

.action-btn.delete {
  background-color: #ffecec;
  color: #ff4757;
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
