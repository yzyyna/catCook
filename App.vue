<script>
import { syncGlobalI18nUI } from "./utils/ui";
import { useCartStore } from "./stores/cart";
import { useFavoritesStore } from "./stores/favorites";

export default {
  onLaunch: function () {
    const cartStore = useCartStore();
    const favoritesStore = useFavoritesStore();
    cartStore.load();
    favoritesStore.load();
    syncGlobalI18nUI();
  },
  onShow: function () {
    syncGlobalI18nUI();
  },
  onHide: function () {},
};
</script>

<style>
/* 全局设计令牌：色板 / 圆角 / 阴影 / 排版 */
page {
  --primary: #ff6b6b;
  --primary-light: #ff8e53;
  --accent: #4ecdc4;
  --bg: #f7f6f3;
  --card: #ffffff;
  --text-strong: #2a2a2a;
  --text-normal: #5a5a5a;
  --text-weak: #8a8a8a;
  --text-faint: #bfbfbf;
  --radius-card: 20rpx;
  --shadow-card: 0 4rpx 16rpx rgba(0, 0, 0, 0.04);
  --gradient-primary: linear-gradient(135deg, #ff6b6b, #ff8e53);
  background-color: #f7f6f3;
  color: #2a2a2a;
  font-family:
    -apple-system, "PingFang SC", "Helvetica Neue", "Microsoft YaHei", Arial,
    sans-serif;
}

view,
text,
scroll-view,
image,
input {
  box-sizing: border-box;
}
</style>
