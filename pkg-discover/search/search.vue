<template>
  <view class="container">
    <view class="search-header">
      <view class="search-input-wrapper">
        <text class="search-icon">🔍</text>
        <input
          class="search-input"
          v-model="keyword"
          :placeholder="t('search.placeholder')"
          @confirm="onSearch"
          confirm-type="search"
        />
        <text v-if="keyword" class="clear-icon" @click="clearKeyword">✕</text>
      </view>
      <view class="cancel-btn" @click="goBack">
        <text>{{ t("common.cancel") }}</text>
      </view>
    </view>

    <scroll-view v-if="hasSearched" class="search-results" scroll-y>
      <view v-if="searchResults.length > 0" class="results-list">
        <view
          v-for="dish in searchResults"
          :key="dish.id"
          class="result-item"
          @click="goToDetail(dish)"
        >
          <image class="result-image" :src="dish.image" mode="aspectFill" />
          <view class="result-info">
            <text class="result-name">{{ getDishName(dish) }}</text>
            <text class="result-desc">{{ getDishDescription(dish) }}</text>
            <view class="result-meta">
              <text class="meta-item">{{ getDifficultyLabel(dish) }}</text>
              <text class="meta-item">{{ getDishTime(dish) }}</text>
            </view>
          </view>
        </view>
      </view>
      <view v-else class="no-result">
        <text class="no-result-icon">🔍</text>
        <text class="no-result-text">{{ t("search.noResult") }}</text>
        <text class="no-result-tip">{{ t("search.noResultTip") }}</text>
      </view>
    </scroll-view>

    <scroll-view v-else class="search-history" scroll-y>
      <view v-if="searchHistory.length > 0" class="history-section">
        <view class="history-header">
          <text class="history-title">{{ t("search.history") }}</text>
          <text class="clear-history" @click="clearHistory">{{
            t("search.clearHistory")
          }}</text>
        </view>
        <view class="history-list">
          <view
            v-for="(item, index) in searchHistory"
            :key="index"
            class="history-item"
            @click="searchHistoryItem(item)"
          >
            <text class="history-text">{{ item }}</text>
            <text class="history-icon">🕐</text>
          </view>
        </view>
      </view>

      <view v-else class="no-history">
        <text class="no-history-icon">🔍</text>
        <text class="no-history-text">{{ t("search.searchTip") }}</text>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { dataService, storage } from "@/data";
import { onShow } from "@dcloudio/uni-app";
import {
  getDifficultyLabel,
  getDishDescription,
  getDishName,
  getDishTime,
} from "@/utils/i18n";
import { syncGlobalI18nUI } from "@/utils/ui";

const { t } = useI18n();

const keyword = ref("");
const hasSearched = ref(false);
const searchResults = ref([]);
const searchHistory = ref([]);

const onSearch = () => {
  if (!keyword.value.trim()) {
    return;
  }

  hasSearched.value = true;
  searchResults.value = dataService.searchDishes(keyword.value);

  saveToHistory(keyword.value);
};

const clearKeyword = () => {
  keyword.value = "";
  hasSearched.value = false;
  searchResults.value = [];
};

const goBack = () => {
  uni.navigateBack();
};

const goToDetail = (dish) => {
  storage.addToHistory(dish);
  uni.navigateTo({
    url: `/pkg-discover/detail/detail?id=${dish.id}`,
  });
};

const searchHistoryItem = (item) => {
  keyword.value = item;
  onSearch();
};

const saveToHistory = (keyword) => {
  const history = storage.getSearchHistory();
  const index = history.indexOf(keyword);

  if (index !== -1) {
    history.splice(index, 1);
  }

  history.unshift(keyword);

  if (history.length > 10) {
    history.pop();
  }

  storage.setSearchHistory(history);
  searchHistory.value = history;
};

const clearHistory = () => {
  uni.showModal({
    title: t("common.confirm"),
    content: t("search.clearHistory"),
    success: (res) => {
      if (res.confirm) {
        storage.clearSearchHistory();
        searchHistory.value = [];
        uni.showToast({
          title: t("common.success"),
          icon: "success",
        });
      }
    },
  });
};

onMounted(() => {
  searchHistory.value = storage.getSearchHistory();
});

onShow(() => {
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

.search-header {
  display: flex;
  align-items: center;
  padding: 20rpx;
  background-color: #fff;
  border-bottom: 1rpx solid #eee;
}

.search-input-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 15rpx 25rpx;
  background-color: #f5f5f5;
  border-radius: 40rpx;
}

.search-icon {
  font-size: 32rpx;
  margin-right: 15rpx;
}

.search-input {
  flex: 1;
  font-size: 28rpx;
  color: #333;
}

.clear-icon {
  font-size: 28rpx;
  color: #999;
  padding: 5rpx;
}

.cancel-btn {
  margin-left: 20rpx;
  padding: 10rpx 20rpx;
  font-size: 28rpx;
  color: #ff6b6b;
}

.search-results {
  flex: 1;
  padding: 20rpx;
}

.results-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.result-item {
  display: flex;
  align-items: flex-start;
  background-color: #fff;
  border-radius: 16rpx;
  padding: 20rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  overflow: hidden;
}

.result-image {
  width: 160rpx;
  height: 160rpx;
  flex-shrink: 0;
  border-radius: 12rpx;
  margin-right: 20rpx;
}

.result-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.result-name {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 10rpx;
}

.result-desc {
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

.result-meta {
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

.no-result {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100rpx 0;
}

.no-result-icon {
  font-size: 120rpx;
  margin-bottom: 40rpx;
}

.no-result-text {
  font-size: 32rpx;
  color: #333;
  margin-bottom: 20rpx;
}

.no-result-tip {
  font-size: 26rpx;
  color: #999;
}

.search-history {
  flex: 1;
  padding: 20rpx;
}

.history-section {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
  padding-bottom: 15rpx;
  border-bottom: 1rpx solid #eee;
}

.history-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.clear-history {
  font-size: 26rpx;
  color: #ff6b6b;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 15rpx;
}

.history-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx;
  background-color: #f9f9f9;
  border-radius: 12rpx;
}

.history-text {
  font-size: 28rpx;
  color: #333;
}

.history-icon {
  font-size: 24rpx;
  color: #999;
}

.no-history {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100rpx 0;
}

.no-history-icon {
  font-size: 120rpx;
  margin-bottom: 40rpx;
}

.no-history-text {
  font-size: 28rpx;
  color: #999;
}
</style>
