<template>
  <view class="page">
    <view v-if="history.length > 0" class="header">
      <text class="header-title">{{ t("history.title") }}</text>
      <view class="clear-btn" @click="clearHistory">
        <text class="clear-btn-text">{{ t("history.clearHistory") }}</text>
      </view>
    </view>

    <scroll-view v-if="history.length > 0" class="history-list" scroll-y>
      <dish-card
        v-for="dish in history"
        :key="dish.id"
        :dish="dish"
        @click="goToDetail"
        @longpress="showQuickMenu"
      >
        <template #footer>
          <text class="view-time">{{ formatViewTime(dish.viewTime) }}</text>
        </template>
        <template #actions>
          <view
            class="heart-btn"
            :class="{ active: isFavorite(dish.id) }"
            @click.stop="toggleFavorite(dish)"
          >
            <text class="heart-icon">{{ isFavorite(dish.id) ? "♥" : "♡" }}</text>
          </view>
          <quantity-stepper
            :quantity="cartStore.quantityOf(dish.id)"
            @increase="cartStore.add(dish)"
            @decrease="cartStore.setQuantity(dish.id, cartStore.quantityOf(dish.id) - 1)"
          />
        </template>
      </dish-card>
      <view class="list-safe-space" />
    </scroll-view>

    <empty-state
      v-else
      icon="🕐"
      :title="t('history.empty')"
      :tip="t('history.emptyTip')"
      :button-text="t('empty.noDataTip')"
      @action="goToHome"
    />
  </view>
</template>

<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { onShow } from "@dcloudio/uni-app";
import { storage } from "@/data";
import { useCartStore } from "@/stores/cart";
import { useFavoritesStore } from "@/stores/favorites";
import { syncGlobalI18nUI } from "@/utils/ui";

const { t } = useI18n();
const cartStore = useCartStore();
const favoritesStore = useFavoritesStore();

const history = ref([]);

const loadHistory = () => {
  history.value = storage.getHistory();
};

const formatViewTime = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now - date;

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) {
    return t("common.justNow");
  } else if (minutes < 60) {
    return minutes + t("common.minutesAgo");
  } else if (hours < 24) {
    return hours + t("common.hoursAgo");
  } else if (days < 7) {
    return days + t("common.daysAgo");
  }
  return date.toLocaleDateString();
};

const isFavorite = (dishId) => favoritesStore.isFavorite(dishId);

const goToDetail = (dish) => {
  storage.addToHistory(dish);
  uni.navigateTo({
    url: `/pkg-discover/detail/detail?id=${dish.id}`,
  });
};

const toggleFavorite = (dish) => {
  const added = favoritesStore.toggle(dish);
  uni.showToast({
    title: added ? t("common.success") : t("favorite.removedSuccess"),
    icon: "success",
  });
};

const showQuickMenu = (dish) => {
  uni.showActionSheet({
    itemList: [t("dish.addToCart"), t("common.delete")],
    success: (res) => {
      if (res.tapIndex === 0) {
        cartStore.add(dish);
        uni.showToast({ title: t("cart.addedSuccess"), icon: "success" });
      } else if (res.tapIndex === 1) {
        const next = history.value.filter((item) => item.id !== dish.id);
        storage.setHistory(next);
        history.value = next;
        uni.showToast({ title: t("common.success"), icon: "success" });
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
        uni.showToast({ title: t("history.clearedSuccess"), icon: "success" });
      }
    },
  });
};

const goToHome = () => {
  uni.switchTab({
    url: "/pages/index/index",
  });
};

onShow(() => {
  loadHistory();
  favoritesStore.load();
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

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 28rpx 28rpx 16rpx;
}

.header-title {
  font-size: 36rpx;
  font-weight: 700;
  color: var(--text-strong);
}

.clear-btn {
  padding: 10rpx 24rpx;
  background-color: #fff;
  border-radius: 999rpx;
  box-shadow: var(--shadow-card);
}

.clear-btn-text {
  font-size: 24rpx;
  color: var(--text-weak);
}

.history-list {
  flex: 1;
  padding: 8rpx 24rpx 0;
}

.view-time {
  margin-top: 10rpx;
  font-size: 21rpx;
  color: var(--text-faint);
}

.heart-btn {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  background-color: #f7f3ef;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 14rpx;
}

.heart-btn.active {
  background-color: #fff0ee;
}

.heart-icon {
  font-size: 32rpx;
  color: var(--text-faint);
  line-height: 1;
}

.heart-btn.active .heart-icon {
  color: var(--primary);
}

.list-safe-space {
  height: 40rpx;
}
</style>
