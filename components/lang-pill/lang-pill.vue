<template>
  <view class="lang-pill" hover-class="hv-dim" :hover-stay-time="80" @click="toggle">
    <text class="lang-icon">🌐</text>
    <text class="lang-label">{{ languageShort }}</text>
  </view>
</template>

<script setup>
import { computed } from "vue";
import { useAppStore } from "@/stores/app";
import { useCartStore } from "@/stores/cart";
import { useFavoritesStore } from "@/stores/favorites";
import { syncGlobalI18nUI } from "@/utils/ui";

const appStore = useAppStore();
const cartStore = useCartStore();
const favoritesStore = useFavoritesStore();

const languageShort = computed(() =>
  appStore.language === "zh-CN" ? "中" : "EN",
);

// 切换后同步各 Store、tabBar 与导航栏标题；页面如需额外刷新（如重新读本地列表）监听 change
const emit = defineEmits(["change"]);

const toggle = () => {
  appStore.toggleLanguage();
  cartStore.load();
  favoritesStore.load();
  syncGlobalI18nUI();
  emit("change");
};
</script>

<style scoped>
.lang-pill {
  flex-shrink: 0;
  width: 104rpx;
  height: 56rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6rpx;
  background-color: #fff;
  border-radius: 999rpx;
  box-shadow: var(--shadow-card);
}

.lang-icon {
  font-size: 26rpx;
}

.lang-label {
  font-size: 24rpx;
  font-weight: 700;
  color: var(--primary);
}

/* 小程序组件样式隔离下 App.vue 的全局按压类可能不生效，组件内补一份 */
.hv-dim {
  opacity: 0.72;
}
</style>
