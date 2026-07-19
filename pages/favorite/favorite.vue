<template>
  <view class="page">
    <template v-if="favoritesStore.items.length > 0">
      <view class="header">
        <text class="header-title">{{ t("favorite.title") }}</text>
        <text class="header-count">{{ countText }}</text>
      </view>

      <scroll-view class="favorite-list" scroll-y>
        <dish-card
          v-for="dish in favoritesStore.items"
          :key="dish.id"
          :dish="dish"
          :selected="isSelected(dish.id)"
          @click="goToDetail"
          @longpress="showQuickMenu"
        >
          <template #leading>
            <view
              class="check-circle"
              :class="{ checked: isSelected(dish.id) }"
              @click.stop="toggleSelect(dish.id)"
            >
              <text v-if="isSelected(dish.id)" class="check-mark">✓</text>
            </view>
          </template>
          <template #actions>
            <view
              class="heart-btn"
              :class="{ animating: animatingId === dish.id }"
              @click.stop="removeFavorite(dish)"
            >
              <text class="heart-icon">♥</text>
            </view>
          </template>
        </dish-card>
        <view class="list-safe-space" />
      </scroll-view>

      <view class="bottom-bar">
        <view class="select-all" @click="toggleSelectAll">
          <view class="check-circle" :class="{ checked: allSelected }">
            <text v-if="allSelected" class="check-mark">✓</text>
          </view>
          <text class="select-all-text">{{ t("common.selectAll") }}</text>
        </view>
        <view class="delete-btn" @click="removeSelected">
          <text class="delete-btn-text">{{ t("favorite.deleteSelected") }}</text>
        </view>
      </view>
    </template>

    <empty-state
      v-else
      icon="🤍"
      :title="t('favorite.empty')"
      :tip="t('favorite.emptyTip')"
      :button-text="t('empty.noDataTip')"
      @action="goToHome"
    />
  </view>
</template>

<script setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { onShow } from "@dcloudio/uni-app";
import { useFavoritesStore } from "@/stores/favorites";
import { useCartStore } from "@/stores/cart";
import { storage } from "@/data";
import { formatMessage } from "@/utils/i18n";
import { syncGlobalI18nUI } from "@/utils/ui";

const { t } = useI18n();
const favoritesStore = useFavoritesStore();
const cartStore = useCartStore();

const selectedIds = ref([]);
const animatingId = ref(null);

const countText = computed(() =>
  selectedIds.value.length > 0
    ? formatMessage(t("favorite.selectedCount"), {
        count: selectedIds.value.length,
      })
    : formatMessage(t("favorite.count"), {
        count: favoritesStore.items.length,
      }),
);

const allSelected = computed(
  () =>
    favoritesStore.items.length > 0 &&
    selectedIds.value.length === favoritesStore.items.length,
);

const isSelected = (id) => selectedIds.value.includes(id);

const toggleSelect = (id) => {
  if (isSelected(id)) {
    selectedIds.value = selectedIds.value.filter((itemId) => itemId !== id);
  } else {
    selectedIds.value = [...selectedIds.value, id];
  }
};

const toggleSelectAll = () => {
  selectedIds.value = allSelected.value
    ? []
    : favoritesStore.items.map((item) => item.id);
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
        favoritesStore.toggle(dish);
        selectedIds.value = selectedIds.value.filter((id) => id !== dish.id);
        uni.showToast({
          title: t("favorite.removedSuccess"),
          icon: "success",
        });
      }
    },
  });
};

const removeSelected = () => {
  if (selectedIds.value.length === 0) {
    uni.showToast({ title: t("cart.select"), icon: "none" });
    return;
  }
  uni.showModal({
    title: t("common.confirm"),
    content: t("favorite.removeSelectedConfirm"),
    confirmText: t("common.confirm"),
    cancelText: t("common.cancel"),
    success: (res) => {
      if (res.confirm) {
        favoritesStore.removeMany(selectedIds.value);
        selectedIds.value = [];
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
        cartStore.add(dish);
        uni.showToast({ title: t("cart.addedSuccess"), icon: "success" });
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

onShow(() => {
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

.header-count {
  font-size: 25rpx;
  color: var(--primary);
  font-weight: 600;
}

.favorite-list {
  flex: 1;
  padding: 8rpx 24rpx 0;
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

.heart-btn {
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
  background-color: #fff0ee;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
}

.heart-btn.animating {
  transform: scale(1.15);
}

.heart-icon {
  font-size: 32rpx;
  color: var(--primary);
}

.list-safe-space {
  height: 40rpx;
}

.bottom-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16rpx;
  padding: 20rpx 24rpx calc(20rpx + env(safe-area-inset-bottom));
  background-color: #fff;
  border-top: 1rpx solid #f0ece6;
}

.select-all {
  display: flex;
  align-items: center;
  gap: 12rpx;
  flex-shrink: 0;
}

.select-all-text {
  font-size: 26rpx;
  color: var(--text-normal);
}

.delete-btn {
  flex-shrink: 0;
  padding: 16rpx 36rpx;
  border-radius: 999rpx;
  background-color: #f7f3ef;
}

.delete-btn-text {
  font-size: 25rpx;
  color: var(--text-weak);
}
</style>
