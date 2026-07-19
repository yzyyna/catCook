<template>
  <view class="page">
    <view class="search-header">
      <view class="search-input-wrapper">
        <text class="search-icon">🔍</text>
        <input
          class="search-input"
          v-model="keyword"
          :placeholder="t('search.placeholder')"
          confirm-type="search"
          focus
          @confirm="onConfirm"
        />
        <text v-if="keyword" class="clear-icon" @click="clearKeyword">✕</text>
      </view>
      <view class="cancel-btn" @click="goBack">
        <text class="cancel-text">{{ t("common.cancel") }}</text>
      </view>
    </view>

    <scroll-view v-if="hasSearched" class="search-results" scroll-y>
      <template v-if="searchResults.length > 0">
        <dish-card
          v-for="dish in searchResults"
          :key="dish.id"
          :dish="dish"
          @click="goToDetail"
        >
          <template #actions>
            <quantity-stepper
              :quantity="cartStore.quantityOf(dish.id)"
              @increase="cartStore.add(dish)"
              @decrease="cartStore.setQuantity(dish.id, cartStore.quantityOf(dish.id) - 1)"
            />
          </template>
        </dish-card>
      </template>
      <empty-state
        v-else
        icon="🔍"
        :title="t('search.noResult')"
        :tip="t('search.noResultTip')"
      />
    </scroll-view>

    <scroll-view v-else class="discover" scroll-y>
      <view v-if="searchHistory.length > 0" class="discover-card">
        <view class="discover-header">
          <text class="discover-title">{{ t("search.history") }}</text>
          <text class="discover-clear" @click="clearHistory">{{
            t("search.clearHistory")
          }}</text>
        </view>
        <view class="chip-flow">
          <view
            v-for="(item, index) in searchHistory"
            :key="index"
            class="chip"
            @click="applyKeyword(item)"
          >
            <text class="chip-text">{{ item }}</text>
          </view>
        </view>
      </view>

      <view class="discover-card">
        <view class="discover-header">
          <text class="discover-title">{{ t("search.hotSearch") }}</text>
        </view>
        <view class="chip-flow">
          <view
            v-for="dish in hotDishes"
            :key="dish.id"
            class="chip hot"
            @click="applyKeyword(getDishName(dish))"
          >
            <text class="chip-text hot-text">{{ getDishName(dish) }}</text>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { onShow } from "@dcloudio/uni-app";
import { dataService, storage, dishes } from "@/data";
import { useCartStore } from "@/stores/cart";
import { getDishName } from "@/utils/i18n";
import { syncGlobalI18nUI } from "@/utils/ui";

const { t } = useI18n();
const cartStore = useCartStore();

const keyword = ref("");
const hasSearched = ref(false);
const searchResults = ref([]);
const searchHistory = ref([]);
const hotDishes = ref([]);

let debounceTimer = null;

const runSearch = (value) => {
  const trimmed = value.trim();
  if (!trimmed) {
    hasSearched.value = false;
    searchResults.value = [];
    return;
  }
  hasSearched.value = true;
  searchResults.value = dataService.searchDishes(trimmed);
};

watch(keyword, (value) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => runSearch(value), 200);
});

const onConfirm = () => {
  runSearch(keyword.value);
  if (keyword.value.trim()) {
    saveToHistory(keyword.value.trim());
  }
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

const applyKeyword = (value) => {
  keyword.value = value;
  runSearch(value);
  saveToHistory(value);
};

const saveToHistory = (value) => {
  const history = storage.getSearchHistory();
  const index = history.indexOf(value);
  if (index !== -1) {
    history.splice(index, 1);
  }
  history.unshift(value);
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
        uni.showToast({ title: t("common.success"), icon: "success" });
      }
    },
  });
};

const loadHotDishes = () => {
  const seen = new Set();
  hotDishes.value = dishes
    .filter((dish) => {
      if (seen.has(dish.categoryId)) return false;
      seen.add(dish.categoryId);
      return true;
    })
    .slice(0, 8);
};

onShow(() => {
  searchHistory.value = storage.getSearchHistory();
  loadHotDishes();
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

.search-header {
  display: flex;
  align-items: center;
  padding: 20rpx 24rpx;
  background-color: #fff;
  border-bottom: 1rpx solid #f0ece6;
}

.search-input-wrapper {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  padding: 14rpx 24rpx;
  background-color: #f7f3ef;
  border-radius: 999rpx;
}

.search-icon {
  font-size: 28rpx;
  margin-right: 12rpx;
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  min-width: 0;
  font-size: 27rpx;
  color: var(--text-strong);
}

.clear-icon {
  flex-shrink: 0;
  font-size: 26rpx;
  color: var(--text-faint);
  padding: 4rpx 8rpx;
}

.cancel-btn {
  flex-shrink: 0;
  margin-left: 20rpx;
  padding: 8rpx 4rpx;
}

.cancel-text {
  font-size: 27rpx;
  color: var(--primary);
  font-weight: 600;
}

.search-results {
  flex: 1;
  padding: 24rpx 24rpx 0;
}

.discover {
  flex: 1;
  padding: 24rpx 24rpx 0;
}

.discover-card {
  background-color: #fff;
  border-radius: var(--radius-card);
  padding: 24rpx;
  margin-bottom: 20rpx;
  box-shadow: var(--shadow-card);
}

.discover-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.discover-title {
  font-size: 29rpx;
  font-weight: 700;
  color: var(--text-strong);
}

.discover-clear {
  font-size: 24rpx;
  color: var(--text-faint);
  padding: 4rpx 8rpx;
}

.chip-flow {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}

.chip {
  max-width: 100%;
  padding: 12rpx 26rpx;
  background-color: #f7f3ef;
  border-radius: 999rpx;
}

.chip.hot {
  background-color: #fff0ee;
}

.chip-text {
  font-size: 25rpx;
  color: var(--text-normal);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.chip-text.hot-text {
  color: var(--primary);
}
</style>
