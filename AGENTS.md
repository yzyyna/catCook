# AGENTS.md

本文件为 AI 编码助手提供 catCook 项目的完整上下文与协作指南。

## 项目概述

catCook（家庭菜单）是一个面向家庭协作的**微信小程序**，基于 **uni-app + Vue 3** 开发。核心价值：帮助家庭成员协同选菜、管理购物车、自动汇总食材生成采购清单、分享给家人采购。

**核心功能：**
- 菜品浏览（左侧分类导航 + 右侧菜品列表）
- 菜品详情（图片、做法、食材、难度/时间/热量）
- 购物车管理（增删改、批量选择）
- 智能采购清单（食材自动合并、按类别分组、微信分享/复制文本）
- 搜索（菜品名/食材/做法关键词，含搜索历史）
- 收藏与浏览历史（本地存储）
- 中/英双语切换

## 技术栈

| 项 | 技术/版本 |
|---|---|
| 框架 | uni-app + Vue 3.5（Composition API + `<script setup>`） |
| 状态管理 | Pinia 3.0 |
| 国际化 | vue-i18n 11.2 |
| 持久化 | 小程序本地存储（`uni.getStorageSync` / `uni.setStorageSync`） |
| 目标平台 | 微信小程序为主（manifest 中保留 App/支付宝/百度/头条配置） |
| 开发工具 | HBuilderX（uni-app 项目，无 CLI 构建脚本） |
| 路径别名 | `@/*` → 项目根目录（见 jsconfig.json） |

**注意：** `package.json` 中无 build/dev/test 脚本。项目通过 **HBuilderX IDE** 运行到微信开发者工具或浏览器（H5 devServer 端口 10000）。不要尝试 `npm run build` 之类的命令；不要引入需要 Vite/Webpack 配置的依赖。

## 目录结构

```
├── pages/                  # 主包页面
│   ├── index/              #   首页（菜单，tabBar）
│   ├── cart/               #   购物车（tabBar）
│   └── favorite/           #   收藏（tabBar）
├── pkg-discover/           # 分包：发现
│   ├── detail/detail.vue   #   菜品详情
│   └── search/search.vue   #   搜索
├── pkg-tools/              # 分包：工具
│   ├── shopping/shopping.vue  # 采购清单
│   └── history/history.vue    # 浏览历史
├── data/                   # 数据层（无后端，纯本地）
│   ├── dishes.js           #   菜品静态数据（含内嵌 i18n）
│   ├── categories.js       #   分类静态数据（nameKey 走语言包）
│   └── index.js            #   storage（本地存储服务）+ dataService（数据服务）
├── stores/                 # Pinia
│   ├── index.js            #   createPinia 实例
│   └── app.js              #   useAppStore：应用名、当前语言、语言切换
├── locales/                # vue-i18n 语言包
│   ├── index.js            #   createI18n（默认读存储中的语言，fallback en-US）
│   ├── zh-CN.js / en-US.js
├── utils/
│   ├── i18n.js             #   t()、菜品/分类/难度字段的本地化 getter、setLanguage
│   └── ui.js               #   syncGlobalI18nUI()：同步 tabBar 与导航栏标题的多语言
├── static/                 # 仅放必须打进小程序包的运行时资源（菜品图、tabBar 图标）
├── design-assets/          # 设计期资源（不打入包体，勿放运行时引用）
├── pages.json              # 路由、tabBar、分包、分包预加载 preloadRule
├── manifest.json           # uni-app 应用配置（微信 appid: wx5065003a28ec3848）
├── App.vue                 # onLaunch/onShow 时调用 syncGlobalI18nUI()
├── main.js                 # createSSRApp，注册 pinia 与 i18n
├── DESIGN.md               # 完整产品设计文档（页面、数据流、分享格式）
└── README.md               # 问题记录清单
```

## 架构与数据流

### 分层职责

- **页面（pages/\*/pkg-\*/\*）**：只做展示与交互，通过 `dataService`/`storage` 读写数据，不直接操作 `uni.*Storage*`。
- **dataService（data/index.js）**：静态数据查询——`getCategories()`、`getDishesByCategory(id)`、`getDishById(id)`、`searchDishes(keyword)`、`getIngredientSummary(cartItems)`（食材汇总核心算法）、`generateShareData(cartItems)`。返回的菜品经 `localizeDish()` 按当前语言本地化。
- **storage（data/index.js）**：本地存储 CRUD——购物车/收藏/浏览历史/搜索历史。读取时经 `normalizeDishRecord()` 用 `dishes.js` 源数据回填并本地化，保证存储数据与静态数据同步。
- **stores/app.js（Pinia）**：仅管理全局应用状态（语言）。购物车/收藏等**不走 Pinia**，直接走 storage + 页面 `onShow` 刷新。

### 本地存储 Key（统一 `catcook_` 前缀）

| Key | 内容 |
|---|---|
| `catcook_cart` | 购物车 `[{...dish, quantity, addTime}]` |
| `catcook_favorites` | 收藏 `[{...dish, addTime}]` |
| `catcook_history` | 浏览历史 `[{...dish, viewTime}]`，最多保留 20 条 |
| `catcook_search_history` | 搜索历史关键词数组 |
| `catcook_language` | 当前语言 `zh-CN` / `en-US` |

### 食材汇总算法（采购清单核心）

遍历购物车菜品 → 按食材 `name` 合并 → 累积各菜品用量 `amounts[]` 与来源菜品 `dishes[]` → 页面按类别（蔬菜/肉类/调料/其他）分组展示。实现见 `dataService.getIngredientSummary()`。

## 国际化约定（重要）

i18n 采用**三种机制并存**，修改数据或文案时必须分清：

1. **界面文案** → 语言包 `locales/zh-CN.js` / `en-US.js`，页面用 `t("xxx.yyy")`。
2. **分类名、难度** → 数据里存 key（`nameKey: "category.meat"`、`difficultyKey: "dish.simple"`），渲染用 `getCategoryName()` / `getDifficultyLabel()`。
3. **菜品/食材字段**（名称、描述、做法、时间、热量）→ 数据内嵌 `i18n` 对象：`i18n: { name: { "zh-CN": "...", "en-US": "..." } }`，经 `utils/i18n.js` 的 `getDishName()` 等 getter 解析，缺当前语言时回退 zh-CN。

新增文案/菜品时：
- 语言包两个文件必须**同步新增相同 key**。
- 新菜品按现有格式补齐 `i18n` 块与 `difficultyKey`。
- 语言切换后需调用 `syncGlobalI18nUI()`（utils/ui.js）刷新 tabBar 与导航栏标题；页面路由到标题 key 的映射维护在 `PAGE_TITLE_MAP` 中，**新增页面要同步补映射**。

## 编码规范

- 页面统一 Vue 3 `<script setup>`；生命周期用 `@dcloudio/uni-app` 的 `onShow`/`onLoad` 等组合式 API（数据在 `onShow` 中刷新，因为 tabBar 页面不会销毁重建）。
- 跨文件引用一律用 `@/` 别名（如 `@/data`、`@/utils/i18n`、`@/stores/app`）。
- 存储操作必须 try/catch 并返回布尔/空数组兜底（参考 data/index.js 现有写法），小程序环境存储可能失败。
- UI 主色 `#FF6B6B`（tabBar 选中色），辅色 `#4ECDC4`，背景 `#F5F5F5`；图标优先用 emoji + `static/tabbar/` 图标，不引入重型 UI 组件库。
- 样式用 rpx 适配多端屏幕。

## 分包与路由

- 主包 3 个 tabBar 页面；详情/搜索在 `pkg-discover`，采购清单/历史在 `pkg-tools`。
- `preloadRule` 已配置分包预加载，新增分包页面时需评估是否补预加载规则。
- 跳转路径示例：`/pkg-discover/detail/detail?id=xxx`、`/pkg-tools/shopping/shopping`。

## 资源管理规则

- `static/` 只放必须随包分发的资源（菜品图、tabBar 图标），小程序包体有限制。
- 大图原稿、营销素材放 `design-assets/`，禁止放入 `static/`（见 design-assets/README.md）。
- 菜品图片命名用拼音小写（如 `hongshaorou.jpg`），路径 `/static/images/dishes/`。

## 已知问题与注意事项

- README.md 记录了待办：图片资源方案（本地 vs 服务器）、部分翻译完整性——改动相关代码前先核对现状。
- `pages/index/index.js` 是空文件（遗留），逻辑全在 `index.vue`。
- 项目无单元测试、无 lint 配置；验证方式为在微信开发者工具/H5 中手动回归：选菜 → 加购 → 生成清单 → 分享/复制，以及切换语言后全页面文案刷新。
- 微信分享通过 `onShareAppMessage` 实现；采购清单还支持"复制文本"兜底。

## 协作指南

1. 改功能前先读 [DESIGN.md](DESIGN.md) 对应章节，保持与设计文档一致；设计变更需同步更新 DESIGN.md。
2. 数据相关改动集中在 `data/`，不要在页面里散落存储逻辑。
3. 提交前自查：中英文案是否成对、`PAGE_TITLE_MAP`/tabBar 映射是否同步、新页面是否注册进 pages.json。
