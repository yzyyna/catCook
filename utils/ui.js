import { t } from "./i18n";

const PAGE_TITLE_MAP = {
  "pages/index/index": "nav.home",
  "pkg-discover/detail/detail": "nav.detail",
  "pages/cart/cart": "nav.cart",
  "pkg-tools/shopping/shopping": "nav.shopping",
  "pkg-discover/search/search": "nav.search",
  "pages/favorite/favorite": "nav.favorite",
  "pkg-tools/history/history": "nav.history",
};

const TAB_BAR_ITEMS = [
  { index: 0, key: "tab.menu" },
  { index: 1, key: "tab.cart" },
  { index: 2, key: "tab.favorite" },
];

export function syncTabBarI18n() {
  TAB_BAR_ITEMS.forEach(({ index, key }) => {
    try {
      uni.setTabBarItem({
        index,
        text: t(key),
      });
    } catch (error) {
      console.warn("Failed to sync tab bar item", index, error);
    }
  });
}

export function syncCurrentPageTitle() {
  try {
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    const route = currentPage?.route;
    const titleKey = PAGE_TITLE_MAP[route];

    if (!titleKey) return;

    uni.setNavigationBarTitle({
      title: t(titleKey),
    });
  } catch (error) {
    console.warn("Failed to sync page title", error);
  }
}

export function syncGlobalI18nUI() {
  syncTabBarI18n();
  syncCurrentPageTitle();
}
